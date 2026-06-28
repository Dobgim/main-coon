import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';

type Tab = 'applications' | 'messages' | 'donations' | 'subscribers' | 'stories';

const tabs: Array<{ key: Tab; label: string; table: string }> = [
  { key: 'applications', label: 'Applications', table: 'adoption_applications' },
  { key: 'messages', label: 'Messages', table: 'contact_messages' },
  { key: 'donations', label: 'Donations', table: 'donations' },
  { key: 'subscribers', label: 'Subscribers', table: 'newsletter_subscribers' },
  { key: 'stories', label: 'Stories', table: 'stories' },
];

/* eslint-disable @typescript-eslint/no-explicit-any */
type Row = Record<string, any>;

const fmtDate = (iso: string) =>
  new Date(iso).toLocaleString(undefined, { dateStyle: 'medium', timeStyle: 'short' });

export default function Submissions() {
  const [tab, setTab] = useState<Tab>('applications');
  const [rows, setRows] = useState<Row[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const table = tabs.find((t) => t.key === tab)!.table;

  const load = async () => {
    setLoading(true);
    const { data, error: err } = await supabase
      .from(table)
      .select('*')
      .order('created_at', { ascending: false });
    if (err) setError(err.message);
    else {
      setError('');
      setRows(data ?? []);
    }
    setLoading(false);
  };

  useEffect(() => {
    load();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tab]);

  const remove = async (id: string) => {
    if (!window.confirm('Delete this entry?')) return;
    await supabase.from(table).delete().eq('id', id);
    load();
  };

  const toggleApproved = async (row: Row) => {
    await supabase.from('stories').update({ approved: !row.approved }).eq('id', row.id);
    load();
  };

  return (
    <div>
      <h1 className="text-3xl font-extrabold text-forest-800">Submissions</h1>
      <p className="mt-1 text-muted">Everything customers send through the website.</p>

      <div className="mt-6 flex flex-wrap gap-2">
        {tabs.map((t) => (
          <button
            key={t.key}
            type="button"
            onClick={() => setTab(t.key)}
            className={`rounded-full px-4 py-2 text-sm font-semibold transition ${
              tab === t.key ? 'bg-forest text-white shadow-soft' : 'bg-white text-forest-700 ring-1 ring-black/5 hover:bg-forest-50'
            }`}
          >
            {t.label}
          </button>
        ))}
      </div>

      {error && (
        <p className="mt-4 rounded-xl bg-red-50 px-4 py-3 text-sm font-medium text-red-700">{error}</p>
      )}

      {loading ? (
        <div className="mt-6 space-y-3">
          {Array.from({ length: 3 }).map((_, i) => (
            <div key={i} className="h-24 animate-pulse rounded-2xl bg-sand/50" />
          ))}
        </div>
      ) : rows.length === 0 ? (
        <p className="card mt-6 px-6 py-12 text-center text-muted">No entries yet.</p>
      ) : (
        <div className="mt-6 space-y-3">
          {rows.map((row) => (
            <div key={row.id} className="card p-5">
              <div className="flex items-start justify-between gap-4">
                <div className="min-w-0">
                  {tab === 'applications' && (
                    <>
                      <p className="font-bold text-forest-800">{row.name} — wants to adopt {row.cat_name || '—'}</p>
                      <p className="mt-1 text-sm text-muted">{row.email} · {row.phone}</p>
                      <p className="mt-2 text-sm text-ink/80">
                        {row.address} · {row.home_type} · Children: {row.has_children} · Pets: {row.has_pets}
                      </p>
                      {row.experience && <p className="mt-1 text-sm text-ink/70">Experience: {row.experience}</p>}
                    </>
                  )}
                  {tab === 'messages' && (
                    <>
                      <p className="font-bold text-forest-800">{row.name} · {row.subject}</p>
                      <p className="mt-1 text-sm text-muted">{row.email} · {row.phone}</p>
                      <p className="mt-2 text-sm text-ink/80">{row.message}</p>
                    </>
                  )}
                  {tab === 'donations' && (
                    <p className="font-bold text-forest-800">
                      ${row.amount} · {row.frequency} · via {row.method}
                    </p>
                  )}
                  {tab === 'subscribers' && (
                    <p className="font-bold text-forest-800">{row.email}</p>
                  )}
                  {tab === 'stories' && (
                    <>
                      <p className="font-bold text-forest-800">{row.name} — about {row.cat_name || '—'}</p>
                      <p className="mt-2 text-sm text-ink/80">{row.message}</p>
                    </>
                  )}
                  <p className="mt-2 text-xs text-muted">{fmtDate(row.created_at)}</p>
                </div>

                <div className="flex shrink-0 flex-col items-end gap-2">
                  {tab === 'stories' && (
                    <button
                      type="button"
                      onClick={() => toggleApproved(row)}
                      className={`rounded-full px-3 py-1.5 text-xs font-semibold ${
                        row.approved ? 'bg-emerald-100 text-emerald-700' : 'bg-sand text-muted'
                      }`}
                    >
                      {row.approved ? 'Approved' : 'Approve'}
                    </button>
                  )}
                  {tab === 'messages' && row.email && (
                    <a href={`mailto:${row.email}`} className="btn-ghost px-3 py-1.5 text-xs">Reply</a>
                  )}
                  <button
                    type="button"
                    onClick={() => remove(row.id)}
                    className="rounded-full px-3 py-1.5 text-xs font-semibold text-red-600 transition hover:bg-red-50"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
