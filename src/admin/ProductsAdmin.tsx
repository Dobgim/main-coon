import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { fetchAllCats, deleteCat, importSeedCats, setCatPublished, type AdminCat } from '@/lib/db';
import { ArrowRightIcon, PawIcon } from '@/components/Icons';

const statusStyles: Record<string, string> = {
  Available: 'bg-emerald-100 text-emerald-700',
  Pending: 'bg-amber-100 text-amber-700',
  Adopted: 'bg-sky-100 text-sky-700',
};

export default function ProductsAdmin() {
  const [cats, setCats] = useState<AdminCat[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [busy, setBusy] = useState(false);

  const load = async () => {
    setLoading(true);
    try {
      setCats(await fetchAllCats());
      setError('');
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Failed to load cats.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
  }, []);

  const onDelete = async (cat: AdminCat) => {
    if (!window.confirm(`Delete "${cat.name}"? This cannot be undone.`)) return;
    setBusy(true);
    try {
      await deleteCat(cat.rowId);
      await load();
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Delete failed.');
    } finally {
      setBusy(false);
    }
  };

  const togglePublish = async (cat: AdminCat) => {
    setBusy(true);
    try {
      await setCatPublished(cat.rowId, !cat.published);
      await load();
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Could not change visibility.');
    } finally {
      setBusy(false);
    }
  };

  const onImport = async () => {
    setBusy(true);
    try {
      await importSeedCats();
      await load();
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Import failed.');
    } finally {
      setBusy(false);
    }
  };

  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="text-3xl font-extrabold text-forest-800">Cats / Products</h1>
          <p className="mt-1 text-muted">
            {loading ? 'Loading…' : `${cats.length} listing${cats.length === 1 ? '' : 's'}`} — published cats appear on the live site.
          </p>
        </div>
        <Link to="/admin/products/new" className="btn-primary">
          Add a cat <ArrowRightIcon className="h-5 w-5" />
        </Link>
      </div>

      {error && (
        <p className="mt-4 rounded-xl bg-red-50 px-4 py-3 text-sm font-medium text-red-700">{error}</p>
      )}

      {loading ? (
        <div className="mt-8 space-y-3">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="h-20 animate-pulse rounded-2xl bg-sand/50" />
          ))}
        </div>
      ) : cats.length === 0 ? (
        <div className="card mt-8 flex flex-col items-center gap-4 px-6 py-16 text-center">
          <PawIcon className="h-12 w-12 text-forest-300" />
          <p className="text-lg font-semibold text-forest-800">No cats yet</p>
          <p className="max-w-md text-sm text-muted">
            Add your first cat, or import the sample cats to get started quickly. You can edit or
            delete them afterwards.
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            <Link to="/admin/products/new" className="btn-primary">Add a cat</Link>
            <button type="button" onClick={onImport} disabled={busy} className="btn-ghost disabled:opacity-60">
              {busy ? 'Importing…' : 'Import sample cats'}
            </button>
          </div>
        </div>
      ) : (
        <div className="mt-8 overflow-hidden rounded-2xl border border-sand bg-white">
          <table className="w-full text-left text-sm">
            <thead className="bg-sand/50 text-xs uppercase tracking-wide text-muted">
              <tr>
                <th className="px-4 py-3">Cat</th>
                <th className="hidden px-4 py-3 sm:table-cell">Status</th>
                <th className="px-4 py-3">Live</th>
                <th className="px-4 py-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-sand">
              {cats.map((cat) => (
                <tr key={cat.rowId} className="hover:bg-cream/40">
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-3">
                      <img
                        src={cat.images[0] || 'https://placehold.co/80x80?text=Cat'}
                        alt={cat.name}
                        className="h-12 w-12 rounded-xl object-cover"
                      />
                      <div>
                        <p className="font-bold text-forest-800">{cat.name}</p>
                        <p className="text-xs text-muted">{cat.ageLabel} · {cat.gender}</p>
                      </div>
                    </div>
                  </td>
                  <td className="hidden px-4 py-3 sm:table-cell">
                    <span className={`badge ${statusStyles[cat.status] ?? 'bg-sand text-muted'}`}>
                      {cat.status}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <button
                      type="button"
                      onClick={() => togglePublish(cat)}
                      disabled={busy}
                      title={cat.published ? 'Tap to hide from the website' : 'Tap to publish to the website'}
                      className={`rounded-full px-3 py-1.5 text-xs font-bold transition disabled:opacity-60 ${
                        cat.published
                          ? 'bg-emerald-100 text-emerald-700 hover:bg-emerald-200'
                          : 'bg-ember text-white hover:bg-ember-600'
                      }`}
                    >
                      {cat.published ? 'Live ✓' : 'Publish'}
                    </button>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex flex-wrap justify-end gap-2">
                      <Link to={`/admin/products/${cat.rowId}`} className="btn-ghost px-3 py-1.5 text-xs">
                        Edit
                      </Link>
                      <button
                        type="button"
                        onClick={() => onDelete(cat)}
                        disabled={busy}
                        className="rounded-full px-3 py-1.5 text-xs font-semibold text-red-600 transition hover:bg-red-50 disabled:opacity-60"
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
