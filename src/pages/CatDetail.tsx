import { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import AdoptionForm from '@/components/AdoptionForm';
import Modal from '@/components/Modal';
import {
  CheckIcon,
  FemaleIcon,
  MaleIcon,
  PinIcon,
  ShareIcon,
  MailIcon,
  PhoneIcon,
  PawIcon,
} from '@/components/Icons';
import PurchasePanel from '@/components/PurchasePanel';
import { useCat } from '@/hooks/useCats';

export default function CatDetail() {
  const { id } = useParams();
  const { cat, loading } = useCat(id);
  const [active, setActive] = useState(0);
  const [shareOpen, setShareOpen] = useState(false);

  if (loading) {
    return (
      <div className="container-page flex min-h-[60vh] flex-col items-center justify-center gap-4 text-center">
        <PawIcon className="h-12 w-12 animate-pulse text-forest-300" />
        <p className="text-muted">Loading…</p>
      </div>
    );
  }

  if (!cat) {
    return (
      <div className="container-page flex min-h-[60vh] flex-col items-center justify-center gap-4 text-center">
        <PawIcon className="h-16 w-16 text-forest-200" />
        <h1 className="text-3xl font-extrabold">We couldn&apos;t find that cat</h1>
        <p className="text-muted">They may already have found their forever home.</p>
        <Link to="/cats" className="btn-primary">
          Back to all cats
        </Link>
      </div>
    );
  }

  const facts: Array<[string, string]> = [
    ['Age', cat.ageLabel],
    ['Gender', cat.gender],
    ['Colour', cat.color],
    ['Location', cat.location],
    ['Adoption fee', `$${cat.adoptionFee}`],
    ['Status', cat.status],
  ];

  const health = [
    ['Vet-checked', cat.vetChecked],
    ['Vaccinated', cat.vaccinated],
    ['Neutered', cat.neutered],
    ['Microchipped', cat.microchipped],
  ] as const;

  const livesWith = [
    ['Children', cat.goodWithChildren],
    ['Other cats', cat.goodWithCats],
    ['Dogs', cat.goodWithDogs],
    ['Indoor only', cat.indoorOnly],
  ] as const;

  const share = async () => {
    const url = window.location.href;
    if (navigator.share) {
      try {
        await navigator.share({ title: `Adopt ${cat.name}`, url });
        return;
      } catch {
        /* user cancelled — fall through to modal */
      }
    }
    setShareOpen(true);
  };

  return (
    <div className="container-page py-10 md:py-14">
      <nav className="mb-6 text-sm text-muted" aria-label="Breadcrumb">
        <Link to="/" className="link-quiet">Home</Link> /{' '}
        <Link to="/cats" className="link-quiet">Cats</Link> /{' '}
        <span className="font-semibold text-forest-800">{cat.name}</span>
      </nav>

      <div className="grid gap-10 lg:grid-cols-2">
        {/* Gallery */}
        <div>
          <motion.div
            key={active}
            initial={{ opacity: 0.4, scale: 0.99 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden rounded-3xl shadow-soft ring-1 ring-black/5"
          >
            <img
              src={cat.images[active]}
              alt={`${cat.name}, a ${cat.color} Maine Coon`}
              className="aspect-[4/3] w-full object-cover"
            />
          </motion.div>
          {cat.images.length > 1 && (
            <div className="mt-3 flex gap-3">
              {cat.images.map((src, i) => (
                <button
                  key={src}
                  type="button"
                  onClick={() => setActive(i)}
                  className={`overflow-hidden rounded-2xl ring-2 transition ${
                    active === i ? 'ring-forest' : 'ring-transparent opacity-70 hover:opacity-100'
                  }`}
                  aria-label={`View photo ${i + 1}`}
                >
                  <img src={src} alt="" className="h-20 w-24 object-cover" />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Summary */}
        <div>
          <div className="flex flex-wrap items-center gap-3">
            <h1 className="text-4xl font-extrabold text-forest-800">{cat.name}</h1>
            <span className="inline-flex items-center gap-1 text-muted">
              {cat.gender === 'Male' ? (
                <MaleIcon className="h-5 w-5 text-sky" />
              ) : (
                <FemaleIcon className="h-5 w-5 text-ember" />
              )}
              {cat.gender}
            </span>
          </div>
          <p className="mt-2 inline-flex items-center gap-1 text-muted">
            <PinIcon className="h-4 w-4 text-forest-500" /> {cat.location}
          </p>

          <div className="mt-4 flex flex-wrap gap-2">
            {cat.personality.map((p) => (
              <span key={p} className="badge bg-forest-50 text-forest-700">
                {p}
              </span>
            ))}
          </div>

          <p className="mt-5 leading-relaxed text-ink/85">{cat.story}</p>

          <dl className="mt-6 grid grid-cols-2 gap-3">
            {facts.map(([k, v]) => (
              <div key={k} className="rounded-2xl bg-sand/60 px-4 py-3">
                <dt className="text-xs font-semibold uppercase tracking-wide text-muted">{k}</dt>
                <dd className="font-bold text-forest-800">{v}</dd>
              </div>
            ))}
          </dl>

          <div className="mt-6">
            <PurchasePanel cat={cat} />
          </div>

          <div className="mt-4 flex flex-wrap gap-3">
            <a
              href="#adopt"
              className="btn-ghost text-sm"
            >
              Prefer to apply to adopt?
            </a>
            <button type="button" onClick={share} className="btn-ghost text-sm">
              <ShareIcon className="h-5 w-5" /> Share
            </button>
          </div>
        </div>
      </div>

      {/* Health + compatibility */}
      <div className="mt-12 grid gap-6 md:grid-cols-2">
        <div className="card p-6">
          <h2 className="text-lg font-extrabold text-forest-800">Health & care</h2>
          <ul className="mt-4 grid grid-cols-2 gap-3 text-sm">
            {health.map(([label, ok]) => (
              <li key={label} className="flex items-center gap-2">
                <span className={`flex h-6 w-6 items-center justify-center rounded-full ${ok ? 'bg-forest-100 text-forest-700' : 'bg-sand text-muted'}`}>
                  {ok ? <CheckIcon className="h-4 w-4" /> : '–'}
                </span>
                {label}
              </li>
            ))}
          </ul>
        </div>
        <div className="card p-6">
          <h2 className="text-lg font-extrabold text-forest-800">Lives happily with</h2>
          <ul className="mt-4 grid grid-cols-2 gap-3 text-sm">
            {livesWith.map(([label, ok]) => (
              <li key={label} className="flex items-center gap-2">
                <span className={`flex h-6 w-6 items-center justify-center rounded-full ${ok ? 'bg-forest-100 text-forest-700' : 'bg-sand text-muted'}`}>
                  {ok ? <CheckIcon className="h-4 w-4" /> : '–'}
                </span>
                {label}
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Requirements + coordinator */}
      <div className="mt-6 grid gap-6 md:grid-cols-3">
        <div className="card p-6 md:col-span-2">
          <h2 className="text-lg font-extrabold text-forest-800">Adoption requirements</h2>
          <ul className="mt-4 space-y-2 text-sm text-ink/85">
            <li className="flex items-start gap-2"><CheckIcon className="mt-0.5 h-4 w-4 text-forest" /> A friendly home visit before adoption</li>
            <li className="flex items-start gap-2"><CheckIcon className="mt-0.5 h-4 w-4 text-forest" /> A reference check (vet or personal)</li>
            <li className="flex items-start gap-2"><CheckIcon className="mt-0.5 h-4 w-4 text-forest" /> An adoption fee of ${cat.adoptionFee} towards care costs</li>
            <li className="flex items-start gap-2"><CheckIcon className="mt-0.5 h-4 w-4 text-forest" /> A commitment to {cat.name}&apos;s wellbeing for life</li>
          </ul>
        </div>
        <div className="card p-6">
          <h2 className="text-lg font-extrabold text-forest-800">{cat.name}&apos;s coordinator</h2>
          <p className="mt-3 font-semibold text-forest-700">{cat.coordinator.name}</p>
          <a href={`mailto:${cat.coordinator.email}`} className="mt-2 flex items-center gap-2 text-sm link-quiet">
            <MailIcon className="h-4 w-4" /> {cat.coordinator.email}
          </a>
          <a href={`tel:${cat.coordinator.phone.replace(/\s/g, '')}`} className="mt-1 flex items-center gap-2 text-sm link-quiet">
            <PhoneIcon className="h-4 w-4" /> {cat.coordinator.phone}
          </a>
        </div>
      </div>

      {/* Adoption form */}
      <div id="adopt" className="mt-14 scroll-mt-24">
        <h2 className="text-2xl font-extrabold text-forest-800">Apply to adopt {cat.name}</h2>
        <p className="mt-2 max-w-2xl text-muted">
          Fill in the short form below and our rehoming team will be in touch within 24 hours.
        </p>
        <div className="mt-6 max-w-3xl">
          <AdoptionForm catId={cat.id} catName={cat.name} />
        </div>
      </div>

      <Modal open={shareOpen} onClose={() => setShareOpen(false)} title={`Share ${cat.name}`}>
        Copy the link from your browser&apos;s address bar to share {cat.name}&apos;s profile and
        help them find a home.
      </Modal>
    </div>
  );
}
