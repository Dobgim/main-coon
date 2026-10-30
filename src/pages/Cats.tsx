import { useMemo, useState } from 'react';
import { site } from '@/data/site';
import Seo from '@/components/Seo';
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

  const itemListSchema = useMemo(() => {
    if (!filtered || filtered.length === 0) return null;
    return {
      '@context': 'https://schema.org',
      '@type': 'ItemList',
      itemListElement: filtered.map((cat, index) => ({
        '@type': 'ListItem',
        position: index + 1,
        url: `${site.url}/cats/${cat.id}`,
        name: cat.name,
        image: cat.images?.[0] || '',
      })),
    };
  }, [filtered]);

  const breadcrumbJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Home',
        item: site.url,
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: 'Available Kittens',
        item: `${site.url}/cats`,
      },
    ],
  };

  return (
    <>
      <Seo
        title="Available Maine Coon Kittens for Sale in Evansville, IN | 219 S Grand Ave"
        description="Browse purebred Maine Coon kittens for sale in Evansville, Indiana. Raised at 219 S Grand Ave, Evansville, IN 47713. Vet-checked, vaccinated, DNA health-tested gentle giants. In-person pickup & safe delivery."
        jsonLd={itemListSchema ? [itemListSchema, breadcrumbJsonLd] : breadcrumbJsonLd}
      />
      <PageHero
        title="Available Maine Coon Kittens"
        subtitle="Raised cage-free at 219 S Grand Ave, Evansville, IN 47713. Vet-checked, vaccinated, and DNA health-tested. Local cattery pickup and safe delivery to Newburgh, Henderson KY, Owensboro KY, and nationwide."
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
            {/* Local Evansville Pickup & Delivery Notice */}
            <div className="mb-6 rounded-2xl bg-forest-50 border border-forest-100 p-4 sm:p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs sm:text-sm">
              <div className="flex items-center gap-2.5 text-forest-800">
                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-forest text-white font-bold">
                  📍
                </span>
                <div>
                  <p className="font-bold text-forest-900">
                    Cattery Location: 219 S Grand Ave, Evansville, IN 47713
                  </p>
                  <p className="text-muted">
                    Schedule an in-person visit or reserve with door-to-door delivery across the Tri-State &amp; nationwide.
                  </p>
                </div>
              </div>
            </div>

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
