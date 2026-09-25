import { useState } from 'react';
import { site } from '@/data/site';
import { PawIcon } from './Icons';
import { fmtMoney, fmtDate } from '@/lib/invoice';
import ContractSeal from './ContractSeal';
import SignaturePad, { type SignatureResult } from './SignaturePad';

export interface AdoptionContractProps {
  contractNumber: string;
  customerName: string;
  email: string;
  phone?: string;
  address?: string;
  items: Array<{
    name: string;
    optionLabel: string;
    price: number;
  }>;
  total: number;
  date?: string;
  notes?: string;
  /** Called once the buyer signs, so the order record can note it. */
  onSigned?: (result: SignatureResult) => void;
}

/** Display host for the contract, derived from config so it can never drift. */
const siteHost = site.url.replace(/^https?:\/\//, '').replace(/\/$/, '');

export default function AdoptionContract({
  contractNumber,
  customerName,
  email,
  phone,
  address,
  items,
  total,
  date = new Date().toISOString(),
  notes,
  onSigned,
}: AdoptionContractProps) {
  const [copied, setCopied] = useState(false);
  const [signature, setSignature] = useState<SignatureResult | null>(null);
  const formattedDate = fmtDate(date);

  const handleSign = (result: SignatureResult) => {
    setSignature(result);
    onSigned?.(result);
  };

  const handlePrint = () => {
    window.print();
  };

  const handleCopy = () => {
    const text = `Royal Maine Coon Kittens - Adoption Contract #${contractNumber} for ${customerName}\nTotal: ${fmtMoney(total)}\nWebsite: ${site.url}`;
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="contract-wrapper my-8 overflow-hidden rounded-3xl border-2 border-forest-200 bg-amber-50/30 p-6 shadow-xl sm:p-10 print:m-0 print:border-none print:bg-white print:p-0 print:shadow-none">
      {/* Top Banner with Action Buttons */}
      <div className="mb-6 flex flex-wrap items-center justify-between gap-3 border-b border-forest-100 pb-4 print:hidden">
        <div className="flex items-center gap-2 text-forest-800">
          <span className="flex h-8 w-8 items-center justify-center rounded-full bg-forest-100 text-forest-700">
            📜
          </span>
          <div>
            <h3 className="text-sm font-bold uppercase tracking-wider text-forest-800">
              Official Reservation Contract
            </h3>
            <p className="text-xs text-muted">Ready for print, download, or record keeping</p>
          </div>
        </div>
        <div className="flex gap-2">
          <button
            type="button"
            onClick={handleCopy}
            className="rounded-full bg-white px-3.5 py-1.5 text-xs font-semibold text-forest-700 ring-1 ring-black/10 transition hover:bg-forest-50"
          >
            {copied ? '✓ Copied' : 'Copy Summary'}
          </button>
          <button
            type="button"
            onClick={handlePrint}
            className="inline-flex items-center gap-1.5 rounded-full bg-forest-800 px-4 py-1.5 text-xs font-bold text-white transition hover:bg-forest-700 shadow-sm"
          >
            <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6.72 13.829c-.24.03-.48.062-.72.096m.72-.096a42.415 42.415 0 0110.56 0m-10.56 0L6.34 18m10.94-4.171c.24.03.48.062.72.096m-.72-.096L17.66 18m0 0l.229 2.523a1.125 1.125 0 01-1.12 1.227H7.231c-.662 0-1.18-.568-1.12-1.227L6.34 18m11.32 0h-11.32m12.39-11.25V4.125C17.71 3.504 17.206 3 16.585 3H7.415C6.794 3 6.29 3.504 6.29 4.125V6.75m11.42 0a2.25 2.25 0 012.25 2.25v5.25a2.25 2.25 0 01-2.25 2.25H6.29A2.25 2.25 0 014.04 14.25V9a2.25 2.25 0 012.25-2.25h11.42z" />
            </svg>
            Print / Save PDF
          </button>
        </div>
      </div>

      {/* Contract Parchment Body */}
      <div className="relative rounded-2xl border border-sand bg-white p-6 sm:p-10 shadow-sm print:border-none print:p-0 print:shadow-none">
        {/* Watermark Logo Background */}
        <div className="pointer-events-none absolute inset-0 flex items-center justify-center opacity-[0.03] select-none">
          <PawIcon className="h-80 w-80 text-forest-900" />
        </div>

        {/* Contract Header */}
        <div className="text-center border-b-2 border-forest-800/20 pb-6">
          <div className="flex items-center justify-center gap-2">
            <PawIcon className="h-7 w-7 text-forest-700" />
            <h2 className="text-2xl font-black uppercase tracking-wider text-forest-900 sm:text-3xl">
              {site.name}
            </h2>
          </div>
          <p className="mt-1 text-xs font-semibold uppercase tracking-widest text-ember">
            Home-Raised Maine Coon Cattery · Evansville, Indiana
          </p>
          <p className="mt-0.5 text-xs text-muted">
            Website: <span className="font-semibold text-forest-700">{siteHost}</span> · Email: {site.email}
          </p>

          <div className="mt-4 inline-block rounded-full bg-forest-50 px-5 py-1.5 border border-forest-200">
            <span className="text-xs font-extrabold uppercase tracking-wider text-forest-800">
              KITTEN RESERVATION & ADOPTION AGREEMENT
            </span>
          </div>

          <div className="mt-3 flex flex-wrap justify-center gap-4 text-xs text-muted">
            <span>Agreement Ref: <strong className="text-forest-900 font-mono">{contractNumber}</strong></span>
            <span>•</span>
            <span>Date: <strong className="text-forest-900">{formattedDate}</strong></span>
            <span>•</span>
            <span>Status: <strong className="text-emerald-700 uppercase">Confirmed Reservation</strong></span>
          </div>
        </div>

        {/* Parties Grid */}
        <div className="mt-6 grid gap-6 sm:grid-cols-2 rounded-xl bg-forest-50/40 p-5 border border-forest-100">
          <div>
            <p className="text-[11px] font-bold uppercase tracking-wider text-forest-700">1. Breeder / Cattery (Party A)</p>
            <p className="mt-1 text-sm font-extrabold text-forest-900">{site.name}</p>
            <p className="text-xs text-muted mt-0.5">Home-raised Maine Coon cattery</p>
            <p className="text-xs text-muted">Email: {site.email}</p>
            {site.phone && <p className="text-xs text-muted">Phone: {site.phone}</p>}
          </div>
          <div>
            <p className="text-[11px] font-bold uppercase tracking-wider text-forest-700">2. Adopter / Buyer (Party B)</p>
            <p className="mt-1 text-sm font-extrabold text-forest-900">{customerName}</p>
            <p className="text-xs text-muted mt-0.5">Email: {email}</p>
            {phone && <p className="text-xs text-muted">Phone: {phone}</p>}
            {address && <p className="text-xs text-muted">Delivery City/ZIP: {address}</p>}
          </div>
        </div>

        {/* Kitten Details Table */}
        <div className="mt-6">
          <p className="text-xs font-bold uppercase tracking-wider text-forest-800 mb-2">
            3. Reserved Kitten & Financial Terms
          </p>
          <div className="overflow-x-auto rounded-xl border border-sand">
            <table className="w-full text-left text-xs">
              <thead className="bg-forest-800 text-white">
                <tr>
                  <th className="p-3 font-bold">Kitten / Selection</th>
                  <th className="p-3 font-bold">Reservation Type</th>
                  <th className="p-3 text-right font-bold">Agreed Amount</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-sand/60 bg-white">
                {items.map((item, i) => (
                  <tr key={i} className="hover:bg-sand/10">
                    <td className="p-3 font-semibold text-forest-900">{item.name}</td>
                    <td className="p-3 text-muted">{item.optionLabel}</td>
                    <td className="p-3 text-right font-bold text-forest-800">{fmtMoney(item.price)}</td>
                  </tr>
                ))}
              </tbody>
              <tfoot className="bg-forest-50/70 border-t border-forest-200">
                <tr>
                  <td colSpan={2} className="p-3 text-right font-bold text-forest-900">Total Agreed Balance:</td>
                  <td className="p-3 text-right text-sm font-black text-ember">{fmtMoney(total)}</td>
                </tr>
              </tfoot>
            </table>
          </div>
        </div>

        {/* Terms and Conditions Clauses */}
        <div className="mt-6 space-y-3.5 text-xs text-ink/85">
          <p className="font-bold uppercase tracking-wider text-forest-800">4. Binding Cattery Terms & Guarantee Clauses</p>
          
          <div className="rounded-lg bg-sand/30 p-3.5 space-y-2 border border-sand/50">
            <p>
              <strong className="text-forest-900">Clause 1 — 48-Hour Temporary Reservation Hold:</strong> Party A places an exclusive hold on the specified Maine Coon kitten in favour of Party B for forty-eight (48) hours following order submission to allow completion of payment via verified channels (Zelle, Cash App, Chime, Apple Pay).
            </p>
            <p>
              <strong className="text-forest-900">Clause 2 — 1-Year Comprehensive Health Guarantee:</strong> Party A guarantees the kitten is free of life-threatening congenital defects, hypertrophic cardiomyopathy (HCM), polycystic kidney disease (PKD), and feline leukemia virus (FeLV/FIV) for twelve (12) months from the date of handover.
            </p>
            <p>
              <strong className="text-forest-900">Clause 3 — Complete Veterinary & Immunization Record:</strong> The kitten is delivered with full age-appropriate vaccinations (FVRCP), complete deworming protocol, microchip identification, pedigree lineage paperwork, and a licensed Veterinarian Health Certificate.
            </p>
            <p>
              <strong className="text-forest-900">Clause 4 — Safe Climate-Controlled Transport / Delivery:</strong> If pet courier delivery is requested, Party A will coordinate with certified climate-controlled pet transport services to ensure direct, stress-free door-to-door or airport arrival.
            </p>
            <p>
              <strong className="text-forest-900">Clause 5 — Companion Pet Welfare Commitment:</strong> Party B agrees to provide clean indoor living quarters, high-protein feline nutrition, annual veterinary wellness examinations, and lifelong loving care.
            </p>
          </div>
        </div>

        {notes && (
          <div className="mt-4 rounded-xl bg-amber-50/60 p-3 text-xs text-amber-900 border border-amber-200">
            <strong>Order Notes & Specifications:</strong> {notes}
          </div>
        )}

        {/* Signature capture — shown until the buyer signs, then replaced by the mark. */}
        {!signature && (
          <div className="mt-8">
            <SignaturePad name={customerName} onSign={handleSign} />
          </div>
        )}

        {/* Seal & Signatures */}
        <div className="mt-8 border-t-2 border-forest-100 pt-6">
          <div className="grid grid-cols-1 items-end gap-8 sm:grid-cols-3">
            {/* Breeder */}
            <div className="text-center sm:text-left">
              <div className="flex h-[70px] items-end justify-center sm:justify-start">
                <span className="pb-1 font-serif text-2xl italic text-[#1b2f4b]">
                  {site.name}
                </span>
              </div>
              <div className="border-b border-forest-300" />
              <p className="mt-2 text-[10px] font-bold uppercase tracking-wider text-muted">
                Party A — For the cattery
              </p>
              <p className="text-[11px] font-semibold text-forest-700">Authorised signatory</p>
              <p className="text-[10px] text-muted">{formattedDate}</p>
            </div>

            {/* Seal */}
            <div className="flex flex-col items-center justify-center">
              <ContractSeal
                reference={contractNumber}
                date={formattedDate}
                className="h-32 w-32 sm:h-36 sm:w-36"
              />
            </div>

            {/* Buyer */}
            <div className="text-center sm:text-right">
              <div className="flex h-[70px] items-end justify-center sm:justify-end">
                {signature ? (
                  <img
                    src={signature.dataUrl}
                    alt={`Signature of ${customerName}`}
                    className="max-h-[70px] w-auto max-w-full object-contain"
                  />
                ) : (
                  <span className="pb-2 text-xs italic text-muted">Awaiting signature</span>
                )}
              </div>
              <div className="border-b border-forest-300" />
              <p className="mt-2 text-[10px] font-bold uppercase tracking-wider text-muted">
                Party B — Buyer
              </p>
              <p className="text-[11px] font-semibold text-forest-700">{customerName}</p>
              {signature ? (
                <p className="text-[10px] text-muted">
                  Signed electronically ({signature.method}) ·{' '}
                  {new Date(signature.signedAt).toLocaleString('en-US', {
                    dateStyle: 'medium',
                    timeStyle: 'short',
                  })}
                </p>
              ) : (
                <p className="text-[10px] text-muted">Not yet signed</p>
              )}
            </div>
          </div>

          {signature && (
            <p className="mt-6 rounded-xl bg-forest-50/60 px-4 py-2.5 text-center text-[10px] leading-relaxed text-forest-800">
              Electronically signed by <strong>{customerName}</strong> on{' '}
              {new Date(signature.signedAt).toLocaleString('en-US', {
                dateStyle: 'long',
                timeStyle: 'short',
              })}
              , against agreement reference <strong>{contractNumber}</strong>.
            </p>
          )}
        </div>

        {/* Footer Note */}
        <div className="mt-6 border-t border-sand/60 pt-4 text-center text-[10px] text-muted">
          <p>
            {site.name} · Official Website:{' '}
            <a href={site.url} className="text-forest-700 underline">
              {siteHost}
            </a>{' '}
            · Support: {site.email}
          </p>
          <p className="mt-0.5">
            This agreement is generated in good faith upon checkout reservation and binds both parties to ethical cattery adoption standards.
          </p>
        </div>
      </div>
    </div>
  );
}
