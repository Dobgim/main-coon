import { useEffect, useState } from 'react';
import {
  fetchAllInvoices,
  markInvoicePaid,
  markInvoicePending,
  deleteInvoice,
  invoiceUrl,
  invoiceMailtoLink,
  invoiceWhatsAppLink,
  fmtMoney,
  fmtDateTime,
  type Invoice,
} from '@/lib/invoice';
import { WhatsAppIcon, CheckIcon } from '@/components/Icons';

type Filter = 'all' | 'Pending' | 'Paid';

export default function Invoices() {
  const [invoices, setInvoices] = useState<Invoice[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [filter, setFilter] = useState<Filter>('all');
  const [actionLoading, setActionLoading] = useState<string | null>(null);

  const load = async () => {
    setLoading(true);
    try {
      const data = await fetchAllInvoices();
      setInvoices(data);
      setError('');
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Failed to load invoices');
    }
    setLoading(false);
  };

  useEffect(() => {
    load();
  }, []);

  const filtered =
    filter === 'all' ? invoices : invoices.filter((inv) => inv.status === filter);

  const counts = {
    all: invoices.length,
    Pending: invoices.filter((i) => i.status === 'Pending').length,
    Paid: invoices.filter((i) => i.status === 'Paid').length,
  };

  const totalRevenue = invoices.reduce((sum, i) => sum + i.total, 0);
  const totalPaid = invoices
    .filter((i) => i.status === 'Paid')
    .reduce((sum, i) => sum + i.total, 0);
  const totalPending = invoices
    .filter((i) => i.status === 'Pending')
    .reduce((sum, i) => sum + i.total, 0);

  const handleMarkPaid = async (inv: Invoice) => {
    setActionLoading(inv.id);
    try {
      await markInvoicePaid(inv.id);
      await load();
    } catch {
      alert('Failed to update invoice');
    }
    setActionLoading(null);
  };

  const handleMarkPending = async (inv: Invoice) => {
    setActionLoading(inv.id);
    try {
      await markInvoicePending(inv.id);
      await load();
    } catch {
      alert('Failed to update invoice');
    }
    setActionLoading(null);
  };

  const handleDelete = async (inv: Invoice) => {
    if (!window.confirm(`Delete invoice ${inv.invoiceNumber}? This cannot be undone.`)) return;
    setActionLoading(inv.id);
    try {
      await deleteInvoice(inv.id);
      await load();
    } catch {
      alert('Failed to delete invoice');
    }
    setActionLoading(null);
  };

  const copyInvoiceLink = async (inv: Invoice) => {
    try {
      await navigator.clipboard.writeText(invoiceUrl(inv.id));
      alert('Invoice link copied to clipboard!');
    } catch {
      prompt('Copy this link:', invoiceUrl(inv.id));
    }
  };

  return (
    <div>
      <h1 className="text-3xl font-extrabold text-forest-800">Invoices</h1>
      <p className="mt-1 text-muted">
        Manage client invoices — mark as paid, send, or view.
      </p>

      {/* Stats cards */}
      <div className="mt-6 grid gap-4 sm:grid-cols-3">
        <StatCard label="Total Revenue" value={fmtMoney(totalRevenue)} color="forest" />
        <StatCard
          label="Pending"
          value={fmtMoney(totalPending)}
          sub={`${counts.Pending} invoice${counts.Pending !== 1 ? 's' : ''}`}
          color="amber"
        />
        <StatCard
          label="Paid"
          value={fmtMoney(totalPaid)}
          sub={`${counts.Paid} invoice${counts.Paid !== 1 ? 's' : ''}`}
          color="emerald"
        />
      </div>

      {/* Filter tabs */}
      <div className="mt-6 flex flex-wrap gap-2">
        {(['all', 'Pending', 'Paid'] as Filter[]).map((f) => (
          <button
            key={f}
            type="button"
            onClick={() => setFilter(f)}
            className={`rounded-full px-4 py-2 text-sm font-semibold transition ${
              filter === f
                ? 'bg-forest text-white shadow-soft'
                : 'bg-white text-forest-700 ring-1 ring-black/5 hover:bg-forest-50'
            }`}
          >
            {f === 'all' ? 'All' : f}{' '}
            <span className="ml-1 opacity-70">({counts[f]})</span>
          </button>
        ))}
      </div>

      {/* Error */}
      {error && (
        <p className="mt-4 rounded-xl bg-red-50 px-4 py-3 text-sm font-medium text-red-700">
          {error}
        </p>
      )}

      {/* Loading */}
      {loading ? (
        <div className="mt-6 space-y-3">
          {Array.from({ length: 3 }).map((_, i) => (
            <div key={i} className="h-32 animate-pulse rounded-2xl bg-sand/50" />
          ))}
        </div>
      ) : filtered.length === 0 ? (
        <p className="card mt-6 px-6 py-12 text-center text-muted">
          {filter === 'all' ? 'No invoices yet.' : `No ${filter.toLowerCase()} invoices.`}
        </p>
      ) : (
        <div className="mt-6 space-y-3">
          {filtered.map((inv) => {
            const isPending = inv.status === 'Pending';
            const isLoading = actionLoading === inv.id;

            return (
              <div key={inv.id} className={`card p-5 transition ${isLoading ? 'opacity-60' : ''}`}>
                <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                  {/* Left info */}
                  <div className="min-w-0 flex-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="font-mono text-sm font-bold text-forest-800">
                        {inv.invoiceNumber}
                      </span>
                      <span
                        className={`inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-xs font-bold ${
                          isPending
                            ? 'bg-amber-100 text-amber-700'
                            : 'bg-emerald-100 text-emerald-700'
                        }`}
                      >
                        {isPending ? 'Pending' : (
                          <><CheckIcon className="h-3 w-3" /> Paid</>
                        )}
                      </span>
                    </div>

                    <p className="mt-1 font-bold text-forest-800">
                      {inv.customerName}{' '}
                      <span className="font-extrabold text-ember">{fmtMoney(inv.total)}</span>
                    </p>
                    <p className="mt-0.5 text-sm text-muted">
                      {inv.email} · {inv.phone}
                    </p>

                    {/* Items summary */}
                    <ul className="mt-2 space-y-0.5 text-sm text-ink/80">
                      {inv.items.map((item, idx) => (
                        <li key={idx}>
                          • {item.name} — {item.optionLabel} ({fmtMoney(item.price)})
                        </li>
                      ))}
                    </ul>

                    {inv.notes && (
                      <p className="mt-1.5 text-sm text-ink/60">Notes: {inv.notes}</p>
                    )}

                    <p className="mt-2 text-xs text-muted">{fmtDateTime(inv.createdAt)}</p>
                    {inv.paidAt && (
                      <p className="text-xs text-emerald-600">Paid on {fmtDateTime(inv.paidAt)}</p>
                    )}
                  </div>

                  {/* Right actions */}
                  <div className="flex shrink-0 flex-wrap items-start gap-2">
                    {/* Mark Paid / Mark Pending */}
                    {isPending ? (
                      <button
                        type="button"
                        onClick={() => handleMarkPaid(inv)}
                        disabled={isLoading}
                        className="rounded-full bg-emerald-600 px-4 py-2 text-xs font-bold text-white transition hover:bg-emerald-700 disabled:opacity-50"
                      >
                        ✓ Mark Paid
                      </button>
                    ) : (
                      <button
                        type="button"
                        onClick={() => handleMarkPending(inv)}
                        disabled={isLoading}
                        className="rounded-full bg-amber-500 px-4 py-2 text-xs font-bold text-white transition hover:bg-amber-600 disabled:opacity-50"
                      >
                        ↩ Mark Pending
                      </button>
                    )}

                    {/* Send via email */}
                    <a
                      href={invoiceMailtoLink(inv)}
                      className="rounded-full bg-white px-3 py-2 text-xs font-semibold text-forest-700 ring-1 ring-black/10 transition hover:bg-forest-50"
                      title="Send invoice to client via email"
                    >
                      ✉ Email
                    </a>

                    {/* Send via WhatsApp */}
                    <a
                      href={invoiceWhatsAppLink(inv)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 rounded-full bg-[#25D366] px-3 py-2 text-xs font-bold text-white transition hover:brightness-95"
                      title="Send invoice to client via WhatsApp"
                    >
                      <WhatsAppIcon className="h-3.5 w-3.5" /> Send
                    </a>

                    {/* Copy link */}
                    <button
                      type="button"
                      onClick={() => copyInvoiceLink(inv)}
                      className="rounded-full bg-white px-3 py-2 text-xs font-semibold text-forest-700 ring-1 ring-black/10 transition hover:bg-forest-50"
                      title="Copy invoice link"
                    >
                      🔗 Copy
                    </button>

                    {/* View */}
                    <a
                      href={invoiceUrl(inv.id)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="rounded-full bg-white px-3 py-2 text-xs font-semibold text-forest-700 ring-1 ring-black/10 transition hover:bg-forest-50"
                    >
                      View ↗
                    </a>

                    {/* Delete */}
                    <button
                      type="button"
                      onClick={() => handleDelete(inv)}
                      disabled={isLoading}
                      className="rounded-full px-3 py-2 text-xs font-semibold text-red-600 transition hover:bg-red-50 disabled:opacity-50"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

// ---------------------------------------------------------------------------
// Stat card sub-component
// ---------------------------------------------------------------------------

function StatCard({
  label,
  value,
  sub,
  color,
}: {
  label: string;
  value: string;
  sub?: string;
  color: 'forest' | 'amber' | 'emerald';
}) {
  const bg = {
    forest: 'bg-forest-50',
    amber: 'bg-amber-50',
    emerald: 'bg-emerald-50',
  }[color];
  const text = {
    forest: 'text-forest-800',
    amber: 'text-amber-700',
    emerald: 'text-emerald-700',
  }[color];

  return (
    <div className={`card ${bg} p-5`}>
      <p className="text-xs font-semibold uppercase tracking-wide text-muted">{label}</p>
      <p className={`mt-1 text-2xl font-extrabold ${text}`}>{value}</p>
      {sub && <p className="mt-0.5 text-xs text-muted">{sub}</p>}
    </div>
  );
}
