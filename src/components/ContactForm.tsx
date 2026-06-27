import { useState } from 'react';
import { motion } from 'framer-motion';
import FormField from './FormField';
import Modal from './Modal';
import { appendSubmission } from '@/lib/localStorage-utils';
import { sendEmail } from '@/lib/emailjs-config';

interface ContactData {
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
}

const empty: ContactData = { name: '', email: '', phone: '', subject: 'Adoption Inquiry', message: '' };
const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const phonePattern = /^[+\d][\d\s()-]{6,}$/;

export default function ContactForm() {
  const [data, setData] = useState<ContactData>(empty);
  const [errors, setErrors] = useState<Partial<Record<keyof ContactData, string>>>({});
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);

  const update = (key: keyof ContactData, value: string) => {
    setData((d) => ({ ...d, [key]: value }));
    setErrors((e) => ({ ...e, [key]: undefined }));
  };

  const validate = (): boolean => {
    const next: typeof errors = {};
    if (!data.name.trim()) next.name = 'Please tell us your name.';
    if (!data.email.trim()) next.email = 'An email address is required.';
    else if (!emailPattern.test(data.email)) next.email = 'Please enter a valid email.';
    if (data.phone && !phonePattern.test(data.phone)) next.phone = 'Please enter a valid phone number.';
    if (!data.message.trim()) next.message = 'Please add a short message.';
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    setSubmitting(true);
    await sendEmail({ form: 'contact', ...data });
    appendSubmission('mcin:contact', data);
    setSubmitting(false);
    setSuccess(true);
    setData(empty);
  };

  const inputCls = (field: keyof ContactData) =>
    `input ${errors[field] ? 'input-error' : ''}`;

  return (
    <>
      <form onSubmit={onSubmit} noValidate className="card p-6 sm:p-8">
        <div className="grid gap-5 sm:grid-cols-2">
          <FormField label="Name" htmlFor="c-name" required error={errors.name}>
            <input
              id="c-name"
              className={inputCls('name')}
              value={data.name}
              onChange={(e) => update('name', e.target.value)}
              autoComplete="name"
            />
          </FormField>

          <FormField label="Email" htmlFor="c-email" required error={errors.email}>
            <input
              id="c-email"
              type="email"
              className={inputCls('email')}
              value={data.email}
              onChange={(e) => update('email', e.target.value)}
              autoComplete="email"
            />
          </FormField>

          <FormField label="Phone" htmlFor="c-phone" error={errors.phone} hint="Optional">
            <input
              id="c-phone"
              type="tel"
              className={inputCls('phone')}
              value={data.phone}
              onChange={(e) => update('phone', e.target.value)}
              autoComplete="tel"
            />
          </FormField>

          <FormField label="Subject" htmlFor="c-subject">
            <select
              id="c-subject"
              className="input"
              value={data.subject}
              onChange={(e) => update('subject', e.target.value)}
            >
              <option>Adoption Inquiry</option>
              <option>General Question</option>
              <option>Volunteer / Foster</option>
              <option>Donation / Fundraising</option>
              <option>Other</option>
            </select>
          </FormField>
        </div>

        <FormField
          label="Message"
          htmlFor="c-message"
          required
          error={errors.message}
          className="mt-5"
        >
          <textarea
            id="c-message"
            rows={5}
            className={inputCls('message')}
            value={data.message}
            onChange={(e) => update('message', e.target.value)}
            placeholder="How can we help?"
          />
        </FormField>

        <motion.button
          type="submit"
          whileTap={{ scale: 0.98 }}
          disabled={submitting}
          className="btn-accent mt-6 w-full text-base disabled:cursor-not-allowed disabled:opacity-70"
        >
          {submitting ? (
            <>
              <span className="h-5 w-5 animate-spin rounded-full border-2 border-white/40 border-t-white" />
              Sending…
            </>
          ) : (
            'Send Message'
          )}
        </motion.button>
      </form>

      <Modal open={success} onClose={() => setSuccess(false)} title="Message sent!">
        Thank you for getting in touch. We&apos;ll reply within 24 hours.
      </Modal>
    </>
  );
}
