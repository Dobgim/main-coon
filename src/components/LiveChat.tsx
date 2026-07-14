import { useEffect, useRef, useState } from 'react';
import { WhatsAppIcon, MailIcon, PhoneIcon } from './Icons';
import { site } from '@/data/site';

/**
 * Floating live-chat launcher.
 *
 * Small businesses rarely staff a real-time chat desk, so this connects
 * visitors straight to the channels we already answer on — WhatsApp first,
 * with phone and email as fallbacks. The bubble sits fixed bottom-right on
 * every public page.
 */

const GREETING = `Hi! 👋 Thanks for visiting ${site.name}. How can we help you find your Maine Coon kitten today?`;

const QUICK_REPLIES = [
  'Which kittens are available?',
  'How does delivery work?',
  'I have a question about pricing',
];

function whatsappUrl(message: string) {
  const text = encodeURIComponent(message);
  return `https://wa.me/${site.whatsapp}?text=${text}`;
}

export default function LiveChat() {
  const [open, setOpen] = useState(false);
  const panelRef = useRef<HTMLDivElement>(null);

  // Close on Escape for keyboard users.
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open]);

  return (
    <div className="fixed bottom-5 right-5 z-50 flex flex-col items-end print:hidden">
      {/* Chat panel */}
      {open && (
        <div
          ref={panelRef}
          role="dialog"
          aria-label="Live chat"
          className="mb-3 w-[min(22rem,calc(100vw-2.5rem))] overflow-hidden rounded-2xl bg-white shadow-2xl ring-1 ring-black/5 animate-fade-up"
        >
          {/* Header */}
          <div className="flex items-center gap-3 bg-forest-800 px-4 py-3 text-cream">
            <span className="flex h-10 w-10 items-center justify-center rounded-full bg-white/10">
              <WhatsAppIcon className="h-6 w-6 text-ember-200" />
            </span>
            <div className="min-w-0 flex-1">
              <p className="text-sm font-bold text-white">Chat with us</p>
              <p className="flex items-center gap-1.5 text-xs text-cream/70">
                <span className="inline-block h-2 w-2 rounded-full bg-green-400" />
                Typically replies within minutes
              </p>
            </div>
            <button
              type="button"
              onClick={() => setOpen(false)}
              aria-label="Close chat"
              className="rounded-full p-1 text-cream/70 transition hover:bg-white/10 hover:text-white"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
                <path d="M18 6 6 18M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* Body */}
          <div className="space-y-3 px-4 py-4">
            <p className="rounded-2xl rounded-tl-sm bg-cream px-3 py-2 text-sm text-forest-800">
              {GREETING}
            </p>

            <div className="flex flex-col gap-2">
              {QUICK_REPLIES.map((q) => (
                <a
                  key={q}
                  href={whatsappUrl(q)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-full border border-forest-800/15 px-3 py-2 text-left text-sm text-forest-800 transition hover:border-ember hover:bg-ember/5"
                >
                  {q}
                </a>
              ))}
            </div>
          </div>

          {/* Actions */}
          <div className="space-y-2 border-t border-black/5 px-4 py-3">
            <a
              href={whatsappUrl(`Hi ${site.name}, I'd like to ask about your Maine Coon kittens.`)}
              target="_blank"
              rel="noopener noreferrer"
              className="flex w-full items-center justify-center gap-2 rounded-full bg-[#25D366] px-4 py-2.5 text-sm font-semibold text-white transition hover:brightness-95"
            >
              <WhatsAppIcon className="h-5 w-5" /> Start WhatsApp chat
            </a>
            <div className="flex gap-2">
              <a
                href={`tel:${site.phone.replace(/\s/g, '')}`}
                className="flex flex-1 items-center justify-center gap-1.5 rounded-full border border-forest-800/15 px-3 py-2 text-sm font-medium text-forest-800 transition hover:border-ember hover:bg-ember/5"
              >
                <PhoneIcon className="h-4 w-4" /> Call
              </a>
              <a
                href={`mailto:${site.email}`}
                className="flex flex-1 items-center justify-center gap-1.5 rounded-full border border-forest-800/15 px-3 py-2 text-sm font-medium text-forest-800 transition hover:border-ember hover:bg-ember/5"
              >
                <MailIcon className="h-4 w-4" /> Email
              </a>
            </div>
          </div>
        </div>
      )}

      {/* Launcher bubble */}
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        aria-label={open ? 'Close chat' : 'Open live chat'}
        className="flex h-14 w-14 items-center justify-center rounded-full bg-ember text-white shadow-lg ring-1 ring-black/5 transition hover:-translate-y-0.5 hover:brightness-105 focus:outline-none focus-visible:ring-2 focus-visible:ring-ember/50"
      >
        {open ? (
          <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
            <path d="M18 6 6 18M6 6l12 12" />
          </svg>
        ) : (
          <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
          </svg>
        )}
      </button>
    </div>
  );
}
