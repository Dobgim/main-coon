import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import FormField from './FormField';
import Modal from './Modal';
import { appendSubmission } from '@/lib/localStorage-utils';
import { sendEmail } from '@/lib/emailjs-config';
import { submitAdoption } from '@/lib/db';
import { CheckIcon } from './Icons';

interface AdoptionData {
  catId: string;
  catName: string;
  name: string;
  email: string;
  phone: string;
  address: string;
  homeType: string;
  hasChildren: string;
  hasPets: string;
  experience: string;
  agree: boolean;
}

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const phonePattern = /^[+\d][\d\s()-]{6,}$/;
const steps = ['About you', 'Your home', 'Confirm'];

export default function AdoptionForm({ catId, catName }: { catId: string; catName: string }) {
  const [step, setStep] = useState(0);
  const [data, setData] = useState<AdoptionData>({
    catId,
    catName,
    name: '',
    email: '',
    phone: '',
    address: '',
    homeType: 'House with garden',
    hasChildren: 'No',
    hasPets: 'No',
    experience: '',
    agree: false,
  });
  const [errors, setErrors] = useState<Partial<Record<keyof AdoptionData, string>>>({});
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);

  const update = (key: keyof AdoptionData, value: string | boolean) => {
    setData((d) => ({ ...d, [key]: value }));
    setErrors((e) => ({ ...e, [key]: undefined }));
  };

  const validateStep = (current: number): boolean => {
    const next: typeof errors = {};
    if (current === 0) {
      if (!data.name.trim()) next.name = 'Please enter your name.';
      if (!data.email.trim()) next.email = 'An email is required.';
      else if (!emailPattern.test(data.email)) next.email = 'Enter a valid email.';
      if (!data.phone.trim()) next.phone = 'A phone number is required.';
      else if (!phonePattern.test(data.phone)) next.phone = 'Enter a valid phone number.';
    }
    if (current === 1) {
      if (!data.address.trim()) next.address = 'Please add your city and ZIP code area.';
    }
    if (current === 2 && !data.agree) {
      next.agree = 'Please confirm you accept the adoption process.';
    }
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const goNext = () => validateStep(step) && setStep((s) => Math.min(s + 1, steps.length - 1));
  const goBack = () => setStep((s) => Math.max(s - 1, 0));

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateStep(2)) return;
    setSubmitting(true);
    await submitAdoption(data).catch(() => {});
    await sendEmail({ form: 'adoption', ...data });
    appendSubmission('mcin:adoptions', data);
    setSubmitting(false);
    setSuccess(true);
  };

  const inputCls = (field: keyof AdoptionData) => `input ${errors[field] ? 'input-error' : ''}`;

  return (
    <>
      <form onSubmit={onSubmit} noValidate className="card p-6 sm:p-8">
        {/* Step indicator */}
        <ol className="mb-6 flex items-center gap-2">
          {steps.map((label, i) => (
            <li key={label} className="flex flex-1 items-center gap-2">
              <span
                className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-sm font-bold transition ${
                  i <= step ? 'bg-forest text-white' : 'bg-sand text-muted'
                }`}
              >
                {i < step ? <CheckIcon className="h-4 w-4" /> : i + 1}
              </span>
              <span
                className={`hidden text-xs font-semibold sm:block ${
                  i <= step ? 'text-forest-800' : 'text-muted'
                }`}
              >
                {label}
              </span>
              {i < steps.length - 1 && (
                <span className="mx-1 hidden h-0.5 flex-1 rounded bg-sand sm:block" />
              )}
            </li>
          ))}
        </ol>

        <AnimatePresence mode="wait">
          <motion.div
            key={step}
            initial={{ opacity: 0, x: 24 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -24 }}
            transition={{ duration: 0.25 }}
          >
            {step === 0 && (
              <div className="grid gap-5 sm:grid-cols-2">
                <FormField label="Full name" htmlFor="a-name" required error={errors.name}>
                  <input id="a-name" className={inputCls('name')} value={data.name}
                    onChange={(e) => update('name', e.target.value)} autoComplete="name" />
                </FormField>
                <FormField label="Email" htmlFor="a-email" required error={errors.email}>
                  <input id="a-email" type="email" className={inputCls('email')} value={data.email}
                    onChange={(e) => update('email', e.target.value)} autoComplete="email" />
                </FormField>
                <FormField label="Phone" htmlFor="a-phone" required error={errors.phone}>
                  <input id="a-phone" type="tel" className={inputCls('phone')} value={data.phone}
                    onChange={(e) => update('phone', e.target.value)} autoComplete="tel" />
                </FormField>
                <FormField label="Previous cat experience" htmlFor="a-exp" hint="Optional">
                  <input id="a-exp" className="input" value={data.experience}
                    onChange={(e) => update('experience', e.target.value)} />
                </FormField>
              </div>
            )}

            {step === 1 && (
              <div className="grid gap-5 sm:grid-cols-2">
                <FormField label="City & ZIP code area" htmlFor="a-addr" required
                  error={errors.address} className="sm:col-span-2">
                  <input id="a-addr" className={inputCls('address')} value={data.address}
                    onChange={(e) => update('address', e.target.value)} placeholder="e.g. Denver, CO 80202" />
                </FormField>
                <FormField label="Home type" htmlFor="a-home">
                  <select id="a-home" className="input" value={data.homeType}
                    onChange={(e) => update('homeType', e.target.value)}>
                    <option>House with garden</option>
                    <option>House without garden</option>
                    <option>Flat / apartment</option>
                    <option>Bungalow</option>
                  </select>
                </FormField>
                <FormField label="Children at home?" htmlFor="a-children">
                  <select id="a-children" className="input" value={data.hasChildren}
                    onChange={(e) => update('hasChildren', e.target.value)}>
                    <option>No</option>
                    <option>Yes — under 5</option>
                    <option>Yes — 5 to 12</option>
                    <option>Yes — teenagers</option>
                  </select>
                </FormField>
                <FormField label="Other pets?" htmlFor="a-pets" className="sm:col-span-2">
                  <select id="a-pets" className="input" value={data.hasPets}
                    onChange={(e) => update('hasPets', e.target.value)}>
                    <option>No</option>
                    <option>Yes — cats</option>
                    <option>Yes — dogs</option>
                    <option>Yes — cats and dogs</option>
                  </select>
                </FormField>
              </div>
            )}

            {step === 2 && (
              <div>
                <div className="rounded-2xl bg-forest-50 p-5 text-sm">
                  <p className="font-bold text-forest-800">You&apos;re applying to adopt {catName}.</p>
                  <ul className="mt-3 space-y-1.5 text-ink/80">
                    <li><strong>Name:</strong> {data.name || '—'}</li>
                    <li><strong>Email:</strong> {data.email || '—'}</li>
                    <li><strong>Phone:</strong> {data.phone || '—'}</li>
                    <li><strong>Location:</strong> {data.address || '—'}</li>
                    <li><strong>Home:</strong> {data.homeType}</li>
                  </ul>
                </div>
                <p className="mt-4 text-xs text-muted">
                  Our process includes a friendly chat, a home visit and a reference check to make
                  sure {catName} is the right match for your family.
                </p>
                <label className="mt-4 flex items-start gap-3 text-sm">
                  <input type="checkbox" checked={data.agree}
                    onChange={(e) => update('agree', e.target.checked)}
                    className="mt-1 h-5 w-5 rounded border-sand text-forest focus:ring-forest" />
                  <span>I understand and accept the adoption process described above.</span>
                </label>
                {errors.agree && (
                  <p className="mt-1 text-sm font-medium text-red-600" role="alert">{errors.agree}</p>
                )}
              </div>
            )}
          </motion.div>
        </AnimatePresence>

        <div className="mt-7 flex items-center justify-between gap-3">
          <button type="button" onClick={goBack} disabled={step === 0}
            className="btn-ghost disabled:invisible">
            Back
          </button>
          {step < steps.length - 1 ? (
            <button type="button" onClick={goNext} className="btn-primary">
              Continue
            </button>
          ) : (
            <motion.button type="submit" whileTap={{ scale: 0.98 }} disabled={submitting}
              className="btn-accent disabled:opacity-70">
              {submitting ? 'Submitting…' : 'Submit Application'}
            </motion.button>
          )}
        </div>
      </form>

      <Modal open={success} onClose={() => setSuccess(false)} title="Application received!">
        Thank you for applying to adopt {catName}. Our rehoming team will be in touch within 24
        hours to talk through the next steps.
      </Modal>
    </>
  );
}
