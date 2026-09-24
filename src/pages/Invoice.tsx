import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  fetchInvoiceById,
  fmtMoney,
  fmtDate,
  invoiceUrl,
  type Invoice as InvoiceType,
} from '@/lib/invoice';
import { getPaymentMethods, paymentInstructions } from '@/lib/payment';
import { site } from '@/data/site';
import { PawIcon, CheckIcon, WhatsAppIcon } from '@/components/Icons';
import AdoptionContract from '@/components/AdoptionContract';
import Seo from '@/components/Seo';

export default function Invoice() {
  const { id } = useParams<{ id: string }>();
  const [invoice, setInvoice] = useState<InvoiceType | null>(null);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);
  const [linkCopied, setLinkCopied] = useState(false);

  useEffect(() => {
    if (!id) {
      setNotFound(true);
      setLoading(false);
      return;
    }
    (async () => {
      const inv = await fetchInvoiceById(id);
      if (!inv) setNotFound(true);
      else setInvoice(inv);
      setLoading(false);
    })();
  }, [id]);

  const copyLink = async () => {
    try {
      await navigator.clipboard.writeText(invoiceUrl(id!));
      setLinkCopied(true);
      setTimeout(() => setLinkCopied(false), 2000);
    } catch {
      /* clipboard unavailable */
    }
  };

  // Loading
  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-cream">
        <Seo title="Loading Invoice…" noindex />
        <PawIcon className="h-10 w-10 animate-pulse text-forest-400" />
      </div>
    );
  }

  // Not found
  if (notFound || !invoice) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center gap-4 bg-cream px-4 text-center">
        <Seo title="Invoice Not Found" noindex />
        <div className="flex h-16 w-16 items-center justify-center rounded-full bg-red-100 text-red-600">
          <svg className="h-8 w-8" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z" />
          </svg>
        </div>
        <h1 className="text-2xl font-extrabold text-forest-800">Invoice not found</h1>
        <p className="max-w-sm text-muted">
          This invoice may have been removed or the link is incorrect.
        </p>
        <Link to="/" className="btn-primary">Go to homepage</Link>
      </div>
    );
  }

  const isPaid = invoice.status === 'Paid';
  const methods = getPaymentMethods();

  return (
    <div className="min-h-screen bg-gradient-to-br from-cream via-white to-forest-50/30 py-8 md:py-14">
      <Seo title={`Invoice ${invoice.invoiceNumber}`} noindex />

      {/* Action bar — hidden when printing */}
      <div className="container-page mb-6 flex flex-wrap items-center justify-between gap-3 print:hidden">
        <Link to="/" className="flex items-center gap-2 text-sm font-semibold text-forest-700 hover:text-forest-900 transition">
          <PawIcon className="h-5 w-5" /> {site.name}
        </Link>
        <div className="flex gap-2">
          <button
            type="button"
            onClick={copyLink}
            className="rounded-full bg-white px-4 py-2 text-sm font-semibold text-forest-700 ring-1 ring-black/10 transition hover:bg-forest-50"
          >
            {linkCopied ? '✓ Copied!' : 'Copy link'}
          </button>
          <button
            type="button"
            onClick={() => window.print()}
            className="rounded-full bg-forest px-4 py-2 text-sm font-semibold text-white transition hover:bg-forest-700"
          >
            Print / Save PDF
          </button>
        </div>
      </div>

      {/* Invoice card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="container-page max-w-3xl"
      >
        <div className="overflow-hidden rounded-3xl bg-white shadow-xl ring-1 ring-black/5 print:shadow-none print:ring-0 print:rounded-none">
          {/* Header band */}
          <div className="bg-gradient-to-r from-forest-800 to-forest-700 px-8 py-8 text-white print:bg-forest-800 sm:px-10">
            <div className="flex items-start justify-between gap-4">
              <div>
                <div className="flex items-center gap-2.5">
                  <PawIcon className="h-7 w-7 text-white/90" />
                  <span className="text-lg font-extrabold tracking-tight">{site.name}</span>
                </div>
                <p className="mt-1 text-sm text-white/70">{site.email} · {site.phone}</p>
              </div>
              <div className="text-right">
                <h1 className="text-2xl font-black tracking-tight sm:text-3xl">INVOICE</h1>
              </div>
            </div>
          </div>

          {/* Invoice meta */}
          <div className="grid gap-6 px-8 pt-8 sm:grid-cols-2 sm:px-10">
            <div className="space-y-4">
              <div>
                <p className="text-[11px] font-bold uppercase tracking-widest text-muted">Invoice Number</p>
                <p className="text-lg font-extrabold text-forest-800">{invoice.invoiceNumber}</p>
              </div>
              <div>
                <p className="text-[11px] font-bold uppercase tracking-widest text-muted">Date Issued</p>
                <p className="font-semibold text-ink">{fmtDate(invoice.createdAt)}</p>
              </div>
              {isPaid && invoice.paidAt && (
                <div>
                  <p className="text-[11px] font-bold uppercase tracking-widest text-muted">Date Paid</p>
                  <p className="font-semibold text-ink">{fmtDate(invoice.paidAt)}</p>
                </div>
              )}
            </div>
            <div>
              <p className="text-[11px] font-bold uppercase tracking-widest text-muted">Bill To</p>
              <p className="mt-1 text-lg font-extrabold text-forest-800">{invoice.customerName}</p>
              <p className="text-sm text-ink/80">{invoice.email}</p>
              {invoice.phone && <p className="text-sm text-ink/80">{invoice.phone}</p>}
              {invoice.address && <p className="mt-1 text-sm text-ink/70">{invoice.address}</p>}
            </div>
          </div>

          {/* Status badge */}
          <div className="px-8 pt-6 sm:px-10">
            <span
              className={`inline-flex items-center gap-1.5 rounded-full px-4 py-1.5 text-sm font-bold ${
                isPaid
                  ? 'bg-emerald-100 text-emerald-700'
                  : 'bg-amber-100 text-amber-700'
              }`}
            >
              {isPaid ? (
                <>
                  <CheckIcon className="h-4 w-4" /> PAID
                </>
              ) : (
                <>
                  <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  PENDING
                </>
              )}
            </span>
          </div>

          {/* Items table */}
          <div className="px-8 pt-6 sm:px-10">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b-2 border-forest-100 text-left">
                  <th className="pb-3 font-bold text-forest-800">Description</th>
                  <th className="pb-3 font-bold text-forest-800">Type</th>
                  <th className="pb-3 text-right font-bold text-forest-800">Amount</th>
                </tr>
              </thead>
              <tbody>
                {invoice.items.map((item, idx) => (
                  <tr key={idx} className="border-b border-sand/60">
                    <td className="py-4 font-semibold text-ink">{item.name}</td>
                    <td className="py-4 text-muted">{item.optionLabel}</td>
                    <td className="py-4 text-right font-bold text-forest-800">{fmtMoney(item.price)}</td>
                  </tr>
                ))}
              </tbody>
              <tfoot>
                <tr>
                  <td colSpan={2} className="pt-5 text-right text-base font-extrabold text-forest-800">
                    Total Due
                  </td>
                  <td className="pt-5 text-right text-2xl font-black text-ember">
                    {fmtMoney(invoice.total)}
                  </td>
                </tr>
              </tfoot>
            </table>
          </div>

          {/* Notes */}
          {invoice.notes && (
            <div className="mx-8 mt-6 rounded-2xl bg-sand/40 px-5 py-4 sm:mx-10">
              <p className="text-[11px] font-bold uppercase tracking-widest text-muted">Notes</p>
              <p className="mt-1 text-sm text-ink/80">{invoice.notes}</p>
            </div>
          )}

          {/* Payment instructions — only when unpaid */}
          {!isPaid && (
            <div className="px-8 pt-8 sm:px-10 print:break-inside-avoid">
              <h2 className="text-base font-extrabold text-forest-800">How to Pay</h2>

              {methods.length > 0 ? (
                <ul className="mt-4 space-y-3">
                  {methods.map((m) => (
                    <li key={m.label} className="flex items-center justify-between gap-3 rounded-2xl bg-forest-50/60 p-4">
                      <div>
                        <p className="text-sm font-bold text-forest-800">{m.label}</p>
                        <p className="text-sm text-ink/80">{m.value}</p>
                      </div>
                      {m.href && (
                        <a
                          href={m.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="shrink-0 rounded-full bg-forest px-3 py-1.5 text-xs font-semibold text-white hover:bg-forest-700 print:hidden"
                        >
                          Open
                        </a>
                      )}
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="mt-3 rounded-2xl bg-amber-50 px-4 py-3 text-sm text-amber-800">
                  Our team will share payment details with you shortly.
                </p>
              )}

              <p className="mt-4 rounded-2xl bg-forest-50 px-4 py-3 text-sm text-ink/75">
                {paymentInstructions()}
              </p>

              {/* Quick action buttons */}
              <div className="mt-5 flex flex-wrap gap-3 print:hidden">
                {site.whatsapp && (
                  <a
                    href={`https://wa.me/${site.whatsapp}?text=${encodeURIComponent(
                      `Hi! I have invoice ${invoice.invoiceNumber} (${invoice.customerName}). Total ${fmtMoney(invoice.total)}. I'd like to pay.`,
                    )}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 rounded-full bg-[#25D366] px-5 py-2.5 text-sm font-bold text-white transition hover:brightness-95"
                  >
                    <WhatsAppIcon className="h-5 w-5" /> Send payment proof
                  </a>
                )}
                <a
                  href={`mailto:${site.email}?subject=${encodeURIComponent(
                    `Payment for ${invoice.invoiceNumber}`,
                  )}`}
                  className="inline-flex items-center gap-2 rounded-full bg-white px-5 py-2.5 text-sm font-bold text-forest-700 ring-1 ring-black/10 transition hover:bg-forest-50"
                >
                  Email us
                </a>
              </div>
            </div>
          )}

          {/* Paid banner */}
          {isPaid && (
            <div className="mx-8 mt-6 rounded-2xl bg-emerald-50 p-6 text-center sm:mx-10">
              <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-emerald-100">
                <CheckIcon className="h-6 w-6 text-emerald-600" />
              </div>
              <p className="mt-3 text-lg font-extrabold text-emerald-800">Payment Received</p>
              <p className="mt-1 text-sm text-emerald-700/80">
                Thank you for your payment! Your kitten reservation is confirmed.
              </p>
            </div>
          )}

          {/* Footer */}
          <div className="mt-8 border-t border-sand/60 bg-sand/20 px-8 py-6 sm:px-10">
            <div className="flex flex-col items-center gap-2 text-center text-xs text-muted sm:flex-row sm:justify-between sm:text-left">
              <div className="flex items-center gap-2">
                <PawIcon className="h-4 w-4 text-forest-400" />
                <span className="font-semibold text-forest-700">{site.name}</span>
              </div>
              <div>
                {site.email} · {site.phone}
              </div>
            </div>
            <p className="mt-3 text-center text-[10px] text-muted/70">
              This invoice was generated automatically. If you have questions, please contact us.
            </p>
          </div>
        </div>

        {/* Formal Adoption & Reservation Agreement */}
        <AdoptionContract
          contractNumber={invoice.invoiceNumber}
          customerName={invoice.customerName}
          email={invoice.email}
          phone={invoice.phone}
          address={invoice.address}
          items={invoice.items}
          total={invoice.total}
          date={invoice.createdAt}
          notes={invoice.notes}
        />
      </motion.div>

      {/* Bottom nav — hidden when printing */}
      <div className="container-page mt-8 flex justify-center print:hidden">
        <Link to="/cats" className="btn-ghost text-sm">
          ← Browse more kittens
        </Link>
      </div>

      {/* Print styles */}
      <style>{`
        @media print {
          body { background: white !important; }
          .print\\:hidden { display: none !important; }
          .print\\:shadow-none { box-shadow: none !important; }
          .print\\:ring-0 { --tw-ring-shadow: none !important; }
          .print\\:rounded-none { border-radius: 0 !important; }
          .print\\:bg-forest-800 { background-color: #1b4332 !important; -webkit-print-color-adjust: exact; print-color-adjust: exact; }
          .print\\:break-inside-avoid { break-inside: avoid; }
        }
      `}</style>
    </div>
  );
}
