import { Link, Navigate, useParams } from 'react-router-dom';
import Seo from '@/components/Seo';
import PageHero from '@/components/PageHero';
import CatGrid from '@/components/CatGrid';
import SectionHeading from '@/components/SectionHeading';
import { ArrowRightIcon, CheckIcon, PinIcon } from '@/components/Icons';
import { site, BUSINESS_ID } from '@/data/site';
import locations from '@/data/locations.json';
import { useCats } from '@/hooks/useCats';

const heroImg =
  'https://images.unsplash.com/photo-1606214174585-fe31582dc6ee?auto=format&fit=crop&w=1600&q=70';

const included = [
  'Vet-checked & age-appropriate vaccinations',
  'Dewormed, microchipped & litter-trained',
  "Parents DNA tested clear for HCM, SMA & PKDef",
  'Written health guarantee & lifetime support',
];

export default function LocationPage() {
  const { slug } = useParams<{ slug: string }>();
  const loc = locations.find((l) => l.slug === slug);
  const { cats } = useCats();

  if (!loc) return <Navigate to="/404" replace />;

  const url = `${site.url}/maine-coon-kittens/${loc.slug}`;
  const available = cats.filter((c) => c.status === 'Available').slice(0, 6);
  const others = locations.filter((l) => l.slug !== loc.slug);

  const jsonLd = [
    {
      '@context': 'https://schema.org',
      '@type': 'Service',
      '@id': `${url}#service`,
      name: loc.h1,
      serviceType: 'Maine Coon kittens for sale',
      description: loc.description,
      url,
      provider: { '@id': BUSINESS_ID },
      areaServed: { '@type': loc.type, name: loc.place },
    },
    {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: loc.faqs.map((f) => ({
        '@type': 'Question',
        name: f.question,
        acceptedAnswer: { '@type': 'Answer', text: f.answer },
      })),
    },
    {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: site.url },
        { '@type': 'ListItem', position: 2, name: 'Areas We Serve', item: `${site.url}/maine-coon-kittens` },
        { '@type': 'ListItem', position: 3, name: loc.place, item: url },
      ],
    },
  ];

  return (
    <>
      <Seo title={loc.title} description={loc.description} jsonLd={jsonLd} />
      <PageHero title={loc.h1} subtitle={loc.intro} image={heroImg} breadcrumb={loc.place} />

      <section className="container-page grid gap-8 py-14 md:py-20 lg:grid-cols-3">
        <div className="space-y-8 lg:col-span-2">
          <div>
            <h2 className="text-2xl font-extrabold text-forest-800">How far is the cattery from {loc.place}?</h2>
            <p className="mt-3 leading-relaxed text-ink/85">{loc.distance}</p>
          </div>
          <div>
            <h2 className="text-2xl font-extrabold text-forest-800">Pickup and delivery for {loc.place}</h2>
            <p className="mt-3 leading-relaxed text-ink/85">{loc.getting}</p>
          </div>
          <div>
            <h2 className="text-2xl font-extrabold text-forest-800">Good to know</h2>
            <p className="mt-3 leading-relaxed text-ink/85">{loc.local}</p>
          </div>
        </div>

        <aside className="card h-fit p-7">
          <h2 className="text-lg font-extrabold text-forest-800">Every kitten comes with</h2>
          <ul className="mt-4 space-y-2 text-sm text-ink/85">
            {included.map((i) => (
              <li key={i} className="flex items-start gap-2">
                <CheckIcon className="mt-0.5 h-4 w-4 shrink-0 text-forest-600" /> {i}
              </li>
            ))}
          </ul>
          <p className="mt-5 text-sm text-muted">
            {site.location.street}, {site.location.city}, {site.location.state} {site.location.postalCode}
            <br />
            {site.hours}
          </p>
          <div className="mt-5 flex flex-col gap-2">
            <Link to="/cats" className="btn-primary justify-center">
              See available kittens <ArrowRightIcon className="h-4 w-4" />
            </Link>
            <a href={`tel:${site.phone.replace(/[^\d+]/g, '')}`} className="btn-ghost justify-center">
              Call {site.phone}
            </a>
          </div>
        </aside>
      </section>

      {available.length > 0 && (
        <section className="bg-sand/40 py-14 md:py-20">
          <div className="container-page">
            <SectionHeading
              eyebrow="Available now"
              title={`Maine Coon kittens ready for ${loc.place} homes`}
            />
            <div className="mt-10">
              <CatGrid cats={available} />
            </div>
          </div>
        </section>
      )}

      <section className="container-page py-14 md:py-20">
        <SectionHeading eyebrow="Questions & answers" title={`Maine Coon kittens in ${loc.place}: FAQs`} />
        <div className="mx-auto mt-10 max-w-3xl divide-y divide-forest-100 rounded-3xl border border-forest-100 bg-white">
          {loc.faqs.map((f) => (
            <div key={f.question} className="p-6">
              <h3 className="text-base font-extrabold text-forest-800 sm:text-lg">{f.question}</h3>
              <p className="mt-2 leading-relaxed text-ink/85">{f.answer}</p>
            </div>
          ))}
        </div>

        <div className="mx-auto mt-12 max-w-3xl">
          <h2 className="text-lg font-extrabold text-forest-800">We also serve</h2>
          <div className="mt-4 flex flex-wrap gap-2.5">
            {others.map((o) => (
              <Link
                key={o.slug}
                to={`/maine-coon-kittens/${o.slug}`}
                className="inline-flex items-center gap-1.5 rounded-full border border-forest-100 bg-white px-3.5 py-1.5 text-xs font-semibold text-forest-800 shadow-soft hover:text-ember-600"
              >
                <PinIcon className="h-3.5 w-3.5 text-ember-600" /> {o.place}
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
