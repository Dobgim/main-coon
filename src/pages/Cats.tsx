import { useMemo, useState } from 'react';
import PageHero from '@/components/PageHero';
import CatGrid from '@/components/CatGrid';
import FilterSidebar, { defaultFilters, type CatFilters } from '@/components/FilterSidebar';
import { useCats } from '@/hooks/useCats';

const PAGE_SIZE = 6;
const heroImg =
  'https://images.unsplash.com/photo-1573865526739-10659fec78a5?auto=format&fit=crop&w=1400&q=70';

export default function Cats() {
  const { cats, loading } = useCats();
  const [filters, setFilters] = useState<CatFilters>(defaultFilters);
  const [page, setPage] = useState(1);

  const regions = useMemo(
    () => Array.from(new Set(cats.map((c) => c.region).filter(Boolean))).sort(),
    [cats],
  );

  const filtered = useMemo(
    () =>
      cats.filter(
        (c) =>
          (filters.age === 'all' || c.ageGroup === filters.age) &&
          (filters.gender === 'all' || c.gender === filters.gender) &&
          (filters.region === 'all' || c.region === filters.region) &&
          (filters.status === 'all' || c.status === filters.status),
      ),
    [cats, filters],
  );

  const pageCount = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const current = Math.min(page, pageCount);
  const pageItems = filtered.slice((current - 1) * PAGE_SIZE, current * PAGE_SIZE);

  const applyFilters = (f: CatFilters) => {
    setFilters(f);
    setPage(1);
  };

  return (
    <>
      <PageHero
        title="Cats Available for Adoption"
        subtitle="Meet the Maine Coons currently looking for their forever homes across the US."
        image={heroImg}
      />

      <section className="container-page py-12 md:py-16">
        <div className="grid gap-8 lg:grid-cols-[300px_1fr]">
          <aside>
            <FilterSidebar
              regions={regions}
              onApply={applyFilters}
              resultCount={filtered.length}
            />
          </aside>

          <div>
            {loading ? (
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {Array.from({ length: 6 }).map((_, i) => (
                  <div key={i} className="card h-80 animate-pulse bg-sand/50" />
                ))}
              </div>
            ) : (
              <CatGrid cats={pageItems} />
            )}

            {pageCount > 1 && (
              <nav className="mt-10 flex items-center justify-center gap-2" aria-label="Pagination">
                <button
                  type="button"
                  onClick={() => setPage((p) => Math.max(1, p - 1))}
                  disabled={current === 1}
                  className="btn-ghost px-4 py-2 text-sm disabled:opacity-40"
                >
                  Prev
                </button>
                {Array.from({ length: pageCount }).map((_, i) => (
                  <button
                    key={i}
                    type="button"
                    onClick={() => setPage(i + 1)}
                    aria-current={current === i + 1}
                    className={`h-10 w-10 rounded-full text-sm font-semibold transition ${
                      current === i + 1
                        ? 'bg-forest text-white shadow-soft'
                        : 'bg-white text-forest-700 ring-1 ring-black/5 hover:bg-forest-50'
                    }`}
                  >
                    {i + 1}
                  </button>
                ))}
                <button
                  type="button"
                  onClick={() => setPage((p) => Math.min(pageCount, p + 1))}
                  disabled={current === pageCount}
                  className="btn-ghost px-4 py-2 text-sm disabled:opacity-40"
                >
                  Next
                </button>
              </nav>
            )}
          </div>
        </div>
      </section>
    </>
  );
}
