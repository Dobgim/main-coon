import { useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import type { ReactNode } from 'react';

interface Props {
  open: boolean;
  onClose: () => void;
  title?: string;
  children: ReactNode;
}

/** Accessible, animated dialog (scale-up + fade). Closes on Esc / backdrop. */
export default function Modal({ open, onClose, title, children }: Props) {
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && onClose();
    document.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [open, onClose]);

  return (
    <AnimatePresence>
      {open && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
          <motion.div
            className="absolute inset-0 bg-ink/50 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label={title}
            className="card relative z-10 w-full max-w-md p-7 text-center"
            initial={{ opacity: 0, scale: 0.9, y: 16 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 8 }}
            transition={{ type: 'spring', stiffness: 280, damping: 26 }}
          >
            {title && <h3 className="text-2xl font-extrabold text-forest-800">{title}</h3>}
            <div className="mt-3 text-muted">{children}</div>
            <button type="button" onClick={onClose} className="btn-primary mt-6 w-full">
              Close
            </button>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
