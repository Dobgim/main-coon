import { useState } from 'react';
import { motion } from 'framer-motion';
import FormField from './FormField';
import Modal from './Modal';
import TrustBadge from './TrustBadge';
import { ShieldIcon, CheckIcon, PawIcon, StarIcon } from './Icons';
import { appendSubmission } from '@/lib/localStorage-utils';
import { site } from '@/data/site';

const presets = [10, 25, 50, 100];

export default function DonationForm() {
  const [amount, setAmount] = useState<number>(25);
  const [custom, setCustom] = useState('');
  const [frequency, setFrequency] = useState<'one-time' | 'monthly'>('one-time');
  const [success, setSuccess] = useState(false);
  const [copied, setCopied] = useState(false);

  const effectiveAmount = custom ? Number(custom) || 0 : amount;

  const copyBank = async () => {
    const { bank } = site.donation;
    const text = `${bank.accountName} | Routing ${bank.routingNumber} | Acc ${bank.accountNumber}`;
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      /* clipboard unavailable */
    }
  };

  const recordAndThank = (method: string) => {
    appendSubmission('mcin:donations', { amount: effectiveAmount, frequency, method });
    setSuccess(true);
  };

  return (
    <div className="grid gap-8 lg:grid-cols-5">
      {/* Amount + payment */}
      <div className="card p-6 sm:p-8 lg:col-span-3">
        <h2 className="text-2xl font-extrabold text-forest-800">Choose your gift</h2>

        {/* Frequency */}
        <div className="mt-5 inline-flex rounded-full bg-sand p-1">
          {(['one-time', 'monthly'] as const).map((f) => (
            <button
              key={f}
              type="button"
              onClick={() => setFrequency(f)}
              className={`rounded-full px-5 py-2 text-sm font-semibold capitalize transition ${
                frequency === f ? 'bg-white text-forest-800 shadow-sm' : 'text-muted'
              }`}
            >
              {f === 'one-time' ? 'One-time' : 'Monthly'}
            </button>
          ))}
        </div>

        {/* Amount buttons */}
        <div className="mt-5 grid grid-cols-2 gap-3 sm:grid-cols-4">
          {presets.map((p) => (
            <button
              key={p}
              type="button"
              onClick={() => {
                setAmount(p);
                setCustom('');
              }}
              className={`rounded-2xl border-2 py-4 text-lg font-bold transition ${
                !custom && amount === p
                  ? 'border-forest bg-forest-50 text-forest-800'
                  : 'border-sand text-muted hover:border-forest/40'
              }`}
            >
              ${p}
            </button>
          ))}
        </div>

        <FormField label="Other amount ($)" htmlFor="d-custom" className="mt-4">
          <input
            id="d-custom"
            type="number"
            min={1}
            className="input"
            value={custom}
            onChange={(e) => setCustom(e.target.value)}
            placeholder="Enter a custom amount"
          />
        </FormField>

        <p className="mt-4 rounded-2xl bg-forest-50 px-4 py-3 text-sm font-semibold text-forest-800">
          You&apos;re giving{' '}
          <span className="text-ember">${effectiveAmount || 0}</span>{' '}
          {frequency === 'monthly' ? 'every month' : 'today'}. Thank you!
        </p>

        {/* PayPal */}
        <a
          href={site.donation.paypalUrl}
          target="_blank"
          rel="noopener noreferrer"
          onClick={() => recordAndThank('PayPal')}
          className="btn mt-5 w-full bg-[#0070ba] text-base text-white hover:bg-[#005ea6]"
        >
          Donate ${effectiveAmount || 0} with PayPal
        </a>

        {/* Demo card form */}
        <details className="mt-4 rounded-2xl border border-sand p-4">
          <summary className="cursor-pointer text-sm font-semibold text-forest-800">
            Or pay by card (demo)
          </summary>
          <div className="mt-4 grid gap-4 sm:grid-cols-2">
            <FormField label="Card number" htmlFor="d-card" className="sm:col-span-2">
              <input id="d-card" inputMode="numeric" className="input" placeholder="4242 4242 4242 4242" />
            </FormField>
            <FormField label="Expiry" htmlFor="d-exp">
              <input id="d-exp" className="input" placeholder="MM/YY" />
            </FormField>
            <FormField label="CVV" htmlFor="d-cvv">
              <input id="d-cvv" inputMode="numeric" className="input" placeholder="123" />
            </FormField>
            <FormField label="Name on card" htmlFor="d-cardname" className="sm:col-span-2">
              <input id="d-cardname" className="input" autoComplete="cc-name" />
            </FormField>
          </div>
          <motion.button
            type="button"
            whileTap={{ scale: 0.98 }}
            onClick={() => recordAndThank('Card (demo)')}
            className="btn-primary mt-4 w-full"
          >
            Donate ${effectiveAmount || 0} Now
          </motion.button>
          <p className="mt-2 text-xs text-muted">
            Demo only — no card data is processed or stored. Connect Stripe/PayPal for live payments.
          </p>
        </details>
      </div>

      {/* Bank + trust */}
      <div className="space-y-4 lg:col-span-2">
        <div className="card p-6">
          <h3 className="text-lg font-extrabold text-forest-800">Bank transfer</h3>
          <dl className="mt-3 space-y-2 text-sm">
            <Row label="Account name" value={site.donation.bank.accountName} />
            <Row label="Bank" value={site.donation.bank.bankName} />
            <Row label="Routing number" value={site.donation.bank.routingNumber} />
            <Row label="Account no." value={site.donation.bank.accountNumber} />
            <Row label="Reference" value={site.donation.bank.reference} />
          </dl>
          <button type="button" onClick={copyBank} className="btn-ghost mt-4 w-full text-sm">
            {copied ? (
              <>
                <CheckIcon className="h-4 w-4" /> Copied!
              </>
            ) : (
              'Copy bank details'
            )}
          </button>
          <p className="mt-2 text-xs text-muted">Placeholder details — replace before going live.</p>
        </div>

        <TrustBadge
          icon={<ShieldIcon />}
          title="Secure payment"
          subtitle="Encrypted & PCI-compliant providers"
        />
        <TrustBadge icon={<PawIcon />} title="100% to cat care"
          subtitle="Vet bills, food, shelter & transport" />
        <TrustBadge icon={<StarIcon />} title="Verified charity"
          subtitle={`Registered no. ${site.charityNumber}`} />
      </div>

      <Modal open={success} onClose={() => setSuccess(false)} title="Thank you!">
        Your generosity helps us rescue more Maine Coons. A confirmation will follow by email once
        your {frequency === 'monthly' ? 'monthly gift' : 'donation'} of ${effectiveAmount || 0} is
        processed.
      </Modal>
    </div>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between gap-3 border-b border-sand/70 pb-2 last:border-0">
      <dt className="text-muted">{label}</dt>
      <dd className="font-semibold text-forest-800">{value}</dd>
    </div>
  );
}
