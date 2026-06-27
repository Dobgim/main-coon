import { useState } from 'react';
import { motion } from 'framer-motion';
import { appendSubmission } from '@/lib/localStorage-utils';
import { ArrowRightIcon, CheckIcon } from './Icons';

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/** Footer newsletter capture — persists to localStorage in this template. */
export default function NewsletterSignup() {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'done' | 'error'>('idle');

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!emailPattern.test(email)) {
      setStatus('error');
      return;
    }
    appendSubmission('mcin:newsletter', { email });
    setStatus('done');
    setEmail('');
  };

  if (status === 'done') {
    return (
      <p className="inline-flex items-center gap-2 rounded-2xl bg-white/15 px-4 py-3 text-sm font-medium text-white">
        <CheckIcon className="h-5 w-5" /> Thanks for subscribing!
      </p>
    );
  }

  return (
    <form onSubmit={submit} className="w-full" noValidate>
      <label htmlFor="newsletter-email" className="mb-2 block text-sm font-semibold text-white/90">
        Subscribe for updates
      </label>
      <div className="flex gap-2">
        <input
          id="newsletter-email"
          type="email"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
            if (status === 'error') setStatus('idle');
          }}
          placeholder="you@example.com"
          className={`min-w-0 flex-1 rounded-full border-0 bg-white/95 px-4 py-2.5 text-sm text-ink placeholder:text-muted/70 focus:ring-2 focus:ring-ember ${
            status === 'error' ? 'ring-2 ring-red-400' : ''
          }`}
          aria-invalid={status === 'error'}
        />
        <motion.button
          type="submit"
          whileTap={{ scale: 0.95 }}
          className="inline-flex items-center gap-1 rounded-full bg-ember px-4 py-2.5 text-sm font-semibold text-white hover:bg-ember-600"
        >
          Sign Up <ArrowRightIcon className="h-4 w-4" />
        </motion.button>
      </div>
      {status === 'error' && (
        <p className="mt-1.5 text-sm text-ember-200">Please enter a valid email address.</p>
      )}
    </form>
  );
}
