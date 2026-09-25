import { useState, type FormEvent } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useCart, formatPrice } from '@/lib/cart';
import { createOrder } from '@/lib/db';
import { createInvoice, invoiceUrl as buildInvoiceUrl } from '@/lib/invoice';
import { sendWeb3Form } from '@/lib/web3forms';
import {
  getPaymentMethod,
  getPaymentMethods,
  paymentInstructions,
  paymentMethodsText,
  SELECTABLE_PAYMENT_METHODS,
} from '@/lib/payment';
import PaymentBadges from '@/components/PaymentBadges';
import { CartIcon, CheckIcon, WhatsAppIcon, ArrowRightIcon } from '@/components/Icons';
import AdoptionContract from '@/components/AdoptionContract';
import { site } from '@/data/site';
import Seo from '@/components/Seo';

const makeRef = () => `RMK-${Date.now().toString().slice(-6)}`;

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

interface Buyer {
  name: string;
  email: string;
  phone: string;
  address: string;
  /** Which method the buyer intends to pay with — required before ordering. */
  paymentMethod: string;
  notes: string;
}

const empty: Buyer = {
  name: '',
  email: '',
  phone: '',
  address: '',
  paymentMethod: '',
  notes: '',
};

export default function Checkout() {
  const { items, total, count, clear } = useCart();
  const [data, setData] = useState<Buyer>(empty);
  const [errors, setErrors] = useState<Partial<Record<keyof Buyer, string>>>({});
  const [submitting, setSubmitting] = useState(false);
  const [done, setDone] = useState(false);
  const [ref, setRef] = useState('');
  const [placedTotal, setPlacedTotal] = useState(0);
  const [placedItems, setPlacedItems] = useState<typeof items>([]);
  const [invoiceId, setInvoiceId] = useState<string | null>(null);
  const [invoiceNumber, setInvoiceNumber] = useState<string | null>(null);

  const update = (key: keyof Buyer, value: string) => {
    setData((d) => ({ ...d, [key]: value }));
    setErrors((e) => ({ ...e, [key]: undefined }));
  };

  const validate = () => {
    const next: typeof errors = {};
    if (!data.name.trim()) next.name = 'Please enter your name.';
    if (!data.email.trim()) next.email = 'An email is required.';
    else if (!emailPattern.test(data.email)) next.email = 'Enter a valid email.';
    if (!data.phone.trim()) next.phone = 'A phone number is required.';
    if (!data.paymentMethod) next.paymentMethod = 'Please choose how you want to pay.';
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const itemsSummary = items
    .map((i) => `${i.name} (${i.optionLabel}) — ${formatPrice(i.price)}`)
    .join('\n');

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    setSubmitting(true);

    const orderRef = makeRef();
    const orderItems = items.map((i) => ({
      catSlug: i.catSlug,
      name: i.name,
      optionId: i.optionId,
      optionLabel: i.optionLabel,
      price: i.price,
    }));

    // Keep items for on-screen contract display
    setPlacedItems([...items]);

    // 1. Create the order in Supabase
    const orderId = await createOrder({
      customerName: data.name,
      email: data.email,
      phone: data.phone,
      address: data.address,
      notes: `Ref ${orderRef} — Paying by ${data.paymentMethod}${
        data.notes ? ` — ${data.notes}` : ''
      }`,
      items: orderItems,
      total,
    }).catch(() => null as string | null);

    // 2. Create the invoice in Supabase
    let invId = '';
    let invNum = `INV-${orderRef.replace('RMK-', '')}`;
    try {
      const invoice = await createInvoice({
        orderId,
        customerName: data.name,
        email: data.email,
        phone: data.phone,
        address: data.address,
        items: orderItems,
        total,
        notes: `Ref ${orderRef} — Paying by ${data.paymentMethod}${
          data.notes ? ` — ${data.notes}` : ''
        }`,
      });
      if (invoice) {
        invId = invoice.id;
        invNum = invoice.invoiceNumber;
      }
    } catch {
      // Graceful fallback
    }

    // 3. Build invoice URL
    const invUrl = invId ? buildInvoiceUrl(invId) : '';

    // 4. Email the owner & trigger Web3Forms submission with full customer and invoice details
    await sendWeb3Form({
      subject: `New Kitten Order ${orderRef} — ${formatPrice(total)} via ${data.paymentMethod} from ${data.name}`,
      from_name: data.name,
      replyto: data.email,
      order_reference: orderRef,
      name: data.name,
      email: data.email,
      phone: data.phone,
      delivery_address: data.address || 'Not provided',
      order: itemsSummary,
      total: formatPrice(total),
      payment_method: data.paymentMethod,
      notes: data.notes || 'None',
      payment_details_for_buyer: paymentMethodsText(),
      invoice_number: invNum,
      invoice_link: invUrl || `Generated on checkout for ref: ${orderRef}`,
      contract_status: 'Official Reservation & Health Agreement Issued',
      action_required:
        `➡ Client chose to pay by ${data.paymentMethod}. Contact them at ` +
        data.email +
        ' / ' +
        data.phone +
        ` with your ${data.paymentMethod} details.`,
    });

    // 5. Save state and show confirmation
    setRef(orderRef);
    setPlacedTotal(total);
    setInvoiceId(invId || null);
    setInvoiceNumber(invNum);
    setSubmitting(false);
    setDone(true);
    clear();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Confirmation + Payment + Official Contract Screen
  if (done) {
    const methods = getPaymentMethods();
    // Show the method the buyer actually picked, when we have its handle on file.
    const chosen = getPaymentMethod(data.paymentMethod);
    const invoiceLink = invoiceId ? `/invoice/${invoiceId}` : null;
    const invoiceFullUrl = invoiceId ? buildInvoiceUrl(invoiceId) : '';

    const waText = [
      `Hi! I placed order ${ref} (${data.name}).`,
      `Total ${formatPrice(placedTotal)}.`,
      invoiceFullUrl ? `Invoice: ${invoiceFullUrl}` : '',
      `I would like to pay by ${data.paymentMethod} and confirm my kitten reservation.`,
    ]
      .filter(Boolean)
      .join(' ');

    const waHref = site.whatsapp
      ? `https://wa.me/${site.whatsapp}?text=${encodeURIComponent(waText)}`
      : '/contact';

    return (
      <div className="container-page max-w-4xl py-10 md:py-16">
        <Seo title="Order Confirmation & Contract" noindex />
        
        {/* Header confirmation */}
        <div className="flex flex-col items-center text-center print:hidden">
          <span className="flex h-16 w-16 items-center justify-center rounded-full bg-forest-100 text-forest-700 shadow-inner">
            <CheckIcon className="h-8 w-8" />
          </span>
          <h1 className="mt-4 text-3xl font-black text-forest-800 tracking-tight sm:text-4xl">
            Order & Reservation Received!
          </h1>
          <p className="mt-2 max-w-xl text-muted text-sm sm:text-base">
            Thank you, <strong className="text-forest-900">{data.name}</strong>. Your reservation has been recorded and an official invoice & agreement has been prepared.
          </p>
        </div>

        {/* Invoice banner */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15 }}
          className="mt-8 overflow-hidden rounded-3xl bg-gradient-to-r from-forest-900 via-forest-800 to-forest-700 p-6 text-white shadow-xl sm:p-8 print:hidden"
        >
          <div className="flex flex-col items-center gap-5 sm:flex-row sm:justify-between text-center sm:text-left">
            <div>
              <span className="inline-block rounded-full bg-forest-600/80 px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-forest-100">
                Official Digital Invoice
              </span>
              <p className="mt-1 text-2xl font-black">{invoiceNumber || `INV-${ref}`}</p>
              <p className="mt-0.5 text-xs text-forest-200">
                Amount Due: <strong className="text-amber-300 font-extrabold text-sm">{formatPrice(placedTotal)}</strong> · Status: <span className="text-amber-300 font-bold">Pending Payment</span>
              </p>
            </div>
            <div className="flex flex-wrap gap-2.5 justify-center">
              {invoiceLink && (
                <Link
                  to={invoiceLink}
                  className="rounded-full bg-white px-5 py-2.5 text-sm font-bold text-forest-900 transition hover:bg-forest-50 shadow"
                >
                  View Full Invoice →
                </Link>
              )}
              {invoiceFullUrl && (
                <CopyButton text={invoiceFullUrl} label="Copy Invoice Link" copiedLabel="✓ Copied Link!" />
              )}
              <button
                type="button"
                onClick={() => window.print()}
                className="rounded-full bg-forest-700/80 px-4 py-2.5 text-sm font-semibold text-white ring-1 ring-white/20 transition hover:bg-forest-600"
              >
                Print / Save
              </button>
            </div>
          </div>
        </motion.div>

        {/* Payment details card */}
        <div className="card mt-8 p-6 sm:p-8 print:hidden">
          <div className="flex items-center justify-between border-b border-sand pb-4">
            <div>
              <p className="text-xs font-bold uppercase tracking-wider text-muted">Order Reference</p>
              <p className="text-xl font-black text-forest-900">{ref}</p>
            </div>
            <div className="text-right">
              <p className="text-xs font-bold uppercase tracking-wider text-muted">Total Due</p>
              <p className="text-2xl font-black text-ember">{formatPrice(placedTotal)}</p>
            </div>
          </div>

          <div className="mt-6 flex items-center justify-between gap-3 rounded-2xl border-2 border-ember/30 bg-ember/5 px-4 py-3">
            <div>
              <p className="text-xs font-bold uppercase tracking-wider text-muted">
                Your chosen payment method
              </p>
              <p className="text-lg font-black text-forest-900">{data.paymentMethod}</p>
            </div>
          </div>

          <h2 className="mt-6 text-lg font-extrabold text-forest-800">How to Complete Payment</h2>
          {chosen ? (
            <div className="mt-4 rounded-2xl border border-sand/60 bg-sand/40 p-4">
              <div className="flex items-start justify-between gap-3">
                <div className="min-w-0">
                  <p className="text-sm font-bold text-forest-800">{chosen.label}</p>
                  <p className="break-words text-sm text-ink/80">{chosen.value}</p>
                </div>
                <div className="flex shrink-0 gap-2">
                  <CopyButton text={chosen.value} />
                  {chosen.href && (
                    <a
                      href={chosen.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="rounded-full bg-forest px-3 py-1.5 text-xs font-semibold text-white hover:bg-forest-700"
                    >
                      Open
                    </a>
                  )}
                </div>
              </div>
            </div>
          ) : methods.length > 0 ? (
            <ul className="mt-4 space-y-3">
              {methods.map((m) => (
                <li key={m.label} className="rounded-2xl bg-sand/40 p-4 border border-sand/60">
                  <div className="flex items-start justify-between gap-3">
                    <div className="min-w-0">
                      <p className="text-sm font-bold text-forest-800">{m.label}</p>
                      <p className="break-words text-sm text-ink/80">{m.value}</p>
                    </div>
                    <div className="flex shrink-0 gap-2">
                      <CopyButton text={m.value} />
                      {m.href && (
                        <a
                          href={m.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="rounded-full bg-forest px-3 py-1.5 text-xs font-semibold text-white hover:bg-forest-700"
                        >
                          Open
                        </a>
                      )}
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          ) : (
            <p className="mt-3 rounded-2xl bg-amber-50 px-4 py-3 text-sm text-amber-800">
              We&apos;ll email your {data.paymentMethod} payment details shortly. You can also reach
              us on WhatsApp below.
            </p>
          )}

          <p className="mt-5 rounded-2xl bg-forest-50 px-4 py-3 text-sm text-ink/80">
            {paymentInstructions()}
          </p>

          <div className="mt-6 flex flex-wrap gap-3">
            <a
              href={waHref}
              target={site.whatsapp ? '_blank' : undefined}
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full bg-[#25D366] px-6 py-3 text-sm font-bold text-white transition hover:brightness-95 shadow"
            >
              <WhatsAppIcon className="h-5 w-5" /> Send payment proof on WhatsApp
            </a>
            <Link to="/cats" className="btn-ghost">Browse more kittens</Link>
          </div>
        </div>

        {/* OFFICIAL RESERVATION & ADOPTION CONTRACT */}
        <AdoptionContract
          contractNumber={invoiceNumber || ref}
          customerName={data.name}
          email={data.email}
          phone={data.phone}
          address={data.address}
          items={placedItems.map((i) => ({
            name: i.name,
            optionLabel: i.optionLabel,
            price: i.price,
          }))}
          total={placedTotal}
          notes={data.notes}
        />
      </div>
    );
  }

  if (count === 0) {
    return (
      <div className="container-page flex min-h-[60vh] flex-col items-center justify-center gap-4 py-16 text-center">
        <Seo title="Checkout" noindex />
        <CartIcon className="h-14 w-14 text-forest-300" />
        <h1 className="text-3xl font-extrabold text-forest-800">Your cart is empty</h1>
        <Link to="/cats" className="btn-primary">Browse kittens</Link>
      </div>
    );
  }

  const inputCls = (f: keyof Buyer) => `input ${errors[f] ? 'input-error' : ''}`;

  return (
    <div className="container-page py-12 md:py-16">
      <Seo title="Checkout" noindex />
      <h1 className="text-3xl font-extrabold text-forest-800">Checkout</h1>
      <p className="mt-1 text-muted">Reserve your kitten — we&apos;ll confirm and arrange secure payment.</p>

      <form onSubmit={onSubmit} className="mt-8 grid gap-8 lg:grid-cols-[1fr_360px]">
        {/* Details */}
        <div className="card space-y-5 p-6 sm:p-8">
          <h2 className="text-lg font-extrabold text-forest-800">Your details</h2>
          <div className="grid gap-5 sm:grid-cols-2">
            <Field label="Full name" required error={errors.name}>
              <input className={inputCls('name')} value={data.name} onChange={(e) => update('name', e.target.value)} autoComplete="name" />
            </Field>
            <Field label="Email" required error={errors.email}>
              <input type="email" className={inputCls('email')} value={data.email} onChange={(e) => update('email', e.target.value)} autoComplete="email" />
            </Field>
            <Field label="Phone" required error={errors.phone}>
              <input type="tel" className={inputCls('phone')} value={data.phone} onChange={(e) => update('phone', e.target.value)} autoComplete="tel" />
            </Field>
            <Field label="Delivery city & ZIP" hint="Optional">
              <input className="input" value={data.address} onChange={(e) => update('address', e.target.value)} placeholder="e.g. Evansville, IN 47713" />
            </Field>
          </div>

          {/* Payment method — required, and passed straight through to the order email. */}
          <fieldset className="mt-2">
            <legend className="text-sm font-bold text-forest-800">
              How would you like to pay? <span className="text-ember">*</span>
            </legend>
            <p className="mt-1 text-xs text-muted">
              Pick one and we&apos;ll send you those details to complete the payment.
            </p>
            <div className="mt-3 grid gap-3 sm:grid-cols-2">
              {SELECTABLE_PAYMENT_METHODS.map((method) => {
                const selected = data.paymentMethod === method;
                return (
                  <label
                    key={method}
                    className={[
                      'flex cursor-pointer items-center gap-3 rounded-2xl border-2 px-4 py-3 transition',
                      selected
                        ? 'border-ember bg-ember/5'
                        : 'border-sand bg-white hover:border-forest-200',
                    ].join(' ')}
                  >
                    <input
                      type="radio"
                      name="paymentMethod"
                      value={method}
                      checked={selected}
                      onChange={() => update('paymentMethod', method)}
                      className="h-4 w-4 accent-[#e2620f]"
                    />
                    <span className="text-sm font-bold text-forest-900">{method}</span>
                  </label>
                );
              })}
            </div>
            {errors.paymentMethod && (
              <p className="mt-2 text-sm font-semibold text-ember">{errors.paymentMethod}</p>
            )}
          </fieldset>

          <Field label="Notes" hint="Optional — pickup/delivery preferences, questions">
            <textarea rows={3} className="input" value={data.notes} onChange={(e) => update('notes', e.target.value)} />
          </Field>
          <p className="rounded-2xl bg-forest-50 px-4 py-3 text-xs text-ink/75">
            No payment is taken on this page. After you place the order we&apos;ll contact you to
            confirm availability and arrange secure payment.
          </p>
        </div>

        {/* Summary */}
        <aside className="lg:sticky lg:top-24 lg:self-start">
          <div className="card p-6">
            <h2 className="text-lg font-extrabold text-forest-800">Order summary</h2>
            <dl className="mt-4 space-y-2 text-sm">
              {items.map((item) => (
                <div key={item.id} className="flex justify-between gap-3">
                  <dt className="text-muted">{item.name} — {item.optionLabel}</dt>
                  <dd className="font-semibold text-forest-800">{formatPrice(item.price)}</dd>
                </div>
              ))}
            </dl>
            <div className="mt-4 flex items-center justify-between border-t border-sand pt-4">
              <span className="font-bold text-forest-800">Total</span>
              <span className="text-xl font-extrabold text-ember">{formatPrice(total)}</span>
            </div>
            <motion.button
              type="submit"
              whileTap={{ scale: 0.98 }}
              disabled={submitting}
              className="btn-accent mt-5 w-full text-base disabled:opacity-70"
            >
              {submitting ? 'Placing order…' : <>Continue to Payment <ArrowRightIcon className="h-5 w-5" /></>}
            </motion.button>
            <PaymentBadges className="mt-4 justify-center" />
          </div>
        </aside>
      </form>
    </div>
  );
}

function CopyButton({
  text,
  label = 'Copy',
  copiedLabel = 'Copied!',
}: {
  text: string;
  label?: string;
  copiedLabel?: string;
}) {
  const [copied, setCopied] = useState(false);
  const copy = async () => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {
      /* clipboard unavailable */
    }
  };
  return (
    <button
      type="button"
      onClick={copy}
      className="rounded-full bg-white px-3 py-1.5 text-xs font-semibold text-forest-700 ring-1 ring-black/10 transition hover:bg-forest-50"
    >
      {copied ? copiedLabel : label}
    </button>
  );
}

function Field({
  label,
  hint,
  required,
  error,
  children,
}: {
  label: string;
  hint?: string;
  required?: boolean;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <label className="block">
      <span className="label">
        {label} {required && <span className="text-ember">*</span>}
        {hint && <span className="ml-1 font-normal text-muted">— {hint}</span>}
      </span>
      {children}
      {error && <span className="mt-1 block text-sm font-medium text-red-600">{error}</span>}
    </label>
  );
}
