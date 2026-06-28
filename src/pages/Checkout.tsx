import { useState, type FormEvent } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useCart, formatPrice } from '@/lib/cart';
import { createOrder } from '@/lib/db';
import { sendWeb3Form } from '@/lib/web3forms';
import { getPaymentMethods, paymentInstructions, paymentMethodsText } from '@/lib/payment';
import PaymentBadges from '@/components/PaymentBadges';
import { CartIcon, CheckIcon, WhatsAppIcon, ArrowRightIcon } from '@/components/Icons';
import { site } from '@/data/site';

const makeRef = () => `RMK-${Date.now().toString().slice(-6)}`;

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

interface Buyer {
  name: string;
  email: string;
  phone: string;
  address: string;
  notes: string;
}

const empty: Buyer = { name: '', email: '', phone: '', address: '', notes: '' };

export default function Checkout() {
  const { items, total, count, clear } = useCart();
  const [data, setData] = useState<Buyer>(empty);
  const [errors, setErrors] = useState<Partial<Record<keyof Buyer, string>>>({});
  const [submitting, setSubmitting] = useState(false);
  const [done, setDone] = useState(false);
  const [ref, setRef] = useState('');
  const [placedTotal, setPlacedTotal] = useState(0);

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

    await createOrder({
      customerName: data.name,
      email: data.email,
      phone: data.phone,
      address: data.address,
      notes: `Ref ${orderRef}${data.notes ? ` — ${data.notes}` : ''}`,
      items: orderItems,
      total,
    }).catch(() => {});

    await sendWeb3Form({
      subject: `New kitten order ${orderRef} — ${formatPrice(total)} from ${data.name}`,
      from_name: data.name,
      order_reference: orderRef,
      name: data.name,
      email: data.email,
      phone: data.phone,
      delivery_address: data.address || 'Not provided',
      order: itemsSummary,
      total: formatPrice(total),
      notes: data.notes || 'None',
      payment_details_for_buyer: paymentMethodsText(),
    });

    setRef(orderRef);
    setPlacedTotal(total);
    setSubmitting(false);
    setDone(true);
    clear();
  };

  // Confirmation + payment screen
  if (done) {
    const methods = getPaymentMethods();
    const waHref = site.whatsapp
      ? `https://wa.me/${site.whatsapp}?text=${encodeURIComponent(
          `Hi! I placed order ${ref} (${data.name}). Total ${formatPrice(placedTotal)}. I'd like to pay.`,
        )}`
      : '/contact';
    return (
      <div className="container-page max-w-2xl py-12 md:py-16">
        <div className="flex flex-col items-center text-center">
          <span className="flex h-16 w-16 items-center justify-center rounded-full bg-forest-100 text-forest-700">
            <CheckIcon className="h-8 w-8" />
          </span>
          <h1 className="mt-4 text-3xl font-extrabold text-forest-800">Order received!</h1>
          <p className="mt-2 max-w-lg text-muted">
            Thank you, {data.name}. Your reservation has been sent to us and a copy emailed to our team.
            Complete payment below to secure your kitten.
          </p>
        </div>

        <div className="card mt-8 p-6 sm:p-8">
          <div className="flex items-center justify-between border-b border-sand pb-4">
            <div>
              <p className="text-xs font-semibold uppercase tracking-wide text-muted">Order reference</p>
              <p className="text-lg font-extrabold text-forest-800">{ref}</p>
            </div>
            <div className="text-right">
              <p className="text-xs font-semibold uppercase tracking-wide text-muted">Amount due</p>
              <p className="text-2xl font-extrabold text-ember">{formatPrice(placedTotal)}</p>
            </div>
          </div>

          <h2 className="mt-6 text-lg font-extrabold text-forest-800">How to pay</h2>
          {methods.length > 0 ? (
            <ul className="mt-4 space-y-3">
              {methods.map((m) => (
                <li key={m.label} className="rounded-2xl bg-sand/40 p-4">
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
              Our team will email you the payment details shortly. You can also reach us on WhatsApp below.
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
              className="inline-flex items-center gap-2 rounded-full bg-[#25D366] px-6 py-3 text-sm font-bold text-white transition hover:brightness-95"
            >
              <WhatsAppIcon className="h-5 w-5" /> Send payment proof on WhatsApp
            </a>
            <Link to="/cats" className="btn-ghost">Browse more kittens</Link>
          </div>
        </div>
      </div>
    );
  }

  if (count === 0) {
    return (
      <div className="container-page flex min-h-[60vh] flex-col items-center justify-center gap-4 py-16 text-center">
        <CartIcon className="h-14 w-14 text-forest-300" />
        <h1 className="text-3xl font-extrabold text-forest-800">Your cart is empty</h1>
        <Link to="/cats" className="btn-primary">Browse kittens</Link>
      </div>
    );
  }

  const inputCls = (f: keyof Buyer) => `input ${errors[f] ? 'input-error' : ''}`;

  return (
    <div className="container-page py-12 md:py-16">
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
          <Field label="Notes" hint="Optional — pickup/delivery preferences, questions">
            <textarea rows={3} className="input" value={data.notes} onChange={(e) => update('notes', e.target.value)} />
          </Field>
          <p className="rounded-2xl bg-forest-50 px-4 py-3 text-xs text-ink/75">
            No payment is taken on this page. After you place the order we&apos;ll contact you to
            confirm availability and arrange secure payment (card, bank transfer or PayPal).
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

function CopyButton({ text }: { text: string }) {
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
      {copied ? 'Copied!' : 'Copy'}
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
