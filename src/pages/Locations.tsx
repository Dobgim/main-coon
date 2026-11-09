import { Link } from 'react-router-dom';
import Seo from '@/components/Seo';
import PageHero from '@/components/PageHero';
import { ArrowRightIcon, PinIcon } from '@/components/Icons';
import { site } from '@/data/site';
import pageMeta from '@/data/pageMeta.json';
import locations from '@/data/locations.json';

const heroImg =
  'https://images.unsplash.com/photo-1574158622682-e40e69881006?auto=format&fit=crop&w=1600&q=70';

export default function Locations() {
  const jsonLd = [
    {
      '@context': 'https://schema.org',
      '@type': 'ItemList',
      name: 'Areas served by Royal Maine Coon Kittens',
      itemListElement: locations.map((l, i) => ({
        '@type': 'ListItem',
        position: i + 1,
        name: l.place,
        url: `${site.url}/maine-coon-kittens/${l.slug}`,
      })),
    },
    {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: site.url },
        { '@type': 'ListItem', position: 2, name: 'Areas We Serve', item: `${site.url}/maine-coon-kittens` },
      ],
    },
  ];

  return (
    <>
      <Seo title={pageMeta.areas.title} description={pageMeta.areas.description} jsonLd={jsonLd} />
      <PageHero
        title="Maine Coon Kittens in Indiana & Kentucky"
        subtitle="Our cattery is at 219 S Grand Ave, Evansville, IN 47713. Choose your area to see drive times, pickup and delivery options, and local answers."
        image={heroImg}
        breadcrumb="Areas We Serve"
      />
      <section className="container-page py-14 md:py-20">
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {locations.map((l) => (
            <Link
              key={l.slug}
              to={`/maine-coon-kittens/${l.slug}`}
              className="card flex flex-col p-6 transition hover:-translate-y-1 hover:shadow-lift"
            >
              <span className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-ember-600">
                <PinIcon className="h-3.5 w-3.5" /> {l.type === 'State' ? 'Statewide' : l.state}
              </span>
              <h2 className="mt-2 text-lg font-extrabold text-forest-800">{l.h1}</h2>
              <p className="mt-2 flex-1 text-sm leading-relaxed text-ink/80">{l.distance}</p>
              <span className="mt-4 inline-flex items-center gap-1 text-sm font-bold text-forest">
                Learn more <ArrowRightIcon className="h-4 w-4" />
              </span>
            </Link>
          ))}
        </div>
        <p className="mx-auto mt-12 max-w-2xl text-center text-ink/80">
          Live somewhere else in the US? We deliver nationwide by certified pet courier or in-cabin flight nanny.{' '}
          <Link to="/contact" className="font-bold text-forest hover:text-ember-600">
            Ask about delivery to your area
          </Link>
          .
        </p>
      </section>
    </>
  );
}
