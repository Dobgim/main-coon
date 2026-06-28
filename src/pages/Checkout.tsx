import { useState, type FormEvent } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useCart, formatPrice } from '@/lib/cart';
import { createOrder } from '@/lib/db';
import { sendWeb3Form } from '@/lib/web3forms';
import PaymentBadges from '@/components/PaymentBadges';
import { CartIcon, CheckIcon, WhatsAppIcon, ArrowRightIcon } from '@/components/Icons';
import { site } from '@/data/site';

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
      notes: data.notes,
      items: orderItems,
      total,
    }).catch(() => {});

    await sendWeb3Form({
      subject: `New kitten order — ${formatPrice(total)} from ${data.name}`,
      from_name: data.name,
      name: data.name,
      email: data.email,
      phone: data.phone,
      delivery_address: data.address || 'Not provided',
      order: itemsSummary,
      total: formatPrice(total),
      notes: data.notes || 'None',
    });

    setSubmitting(false);
    setDone(true);
    clear();
  };

  // Confirmation screen
  if (done) {
    const waHref = site.whatsapp
      ? `https://wa.me/${site.whatsapp}?text=${encodeURIComponent(
          `Hi! I just placed an order (${data.name}, ${data.email}). I'd like to arrange payment.`,
        )}`
      : '/contact';
    return (
      <div className="container-page flex min-h-[60vh] flex-col items-center justify-center gap-4 py-16 text-center">
        <span className="flex h-16 w-16 items-center justify-center rounded-full bg-forest-100 text-forest-700">
          <CheckIcon className="h-8 w-8" />
        </span>
        <h1 className="text-3xl font-extrabold text-forest-800">Order received!</h1>
        <p className="max-w-lg text-muted">
          Thank you, {data.name}. We&apos;ve received your reservation and emailed our team. We&apos;ll
          contact you at <strong>{data.email}</strong> within 24 hours to confirm and arrange secure payment.
        </p>
        <div className="mt-2 flex flex-wrap justify-center gap-3">
          <a
            href={waHref}
            target={site.whatsapp ? '_blank' : undefined}
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-full bg-[#25D366] px-6 py-3 text-sm font-bold text-white transition hover:brightness-95"
          >
            <WhatsAppIcon className="h-5 w-5" /> Arrange payment on WhatsApp
          </a>
          <Link to="/cats" className="btn-ghost">Browse more kittens</Link>
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
              {submitting ? 'Placing order…' : <>Place Order <ArrowRightIcon className="h-5 w-5" /></>}
            </motion.button>
            <PaymentBadges className="mt-4 justify-center" />
          </div>
        </aside>
      </form>
    </div>
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
