import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import type { Cat } from '@/types';
import {
  HeartIcon,
  MaleIcon,
  FemaleIcon,
  PinIcon,
  ArrowRightIcon,
} from './Icons';
import { getFavourites, toggleFavourite } from '@/lib/localStorage-utils';

const statusStyles: Record<Cat['status'], string> = {
  Available: 'bg-forest-100 text-forest-700',
  Pending: 'bg-amber-100 text-amber-700',
  Adopted: 'bg-sky-100 text-sky-700',
};

export default function CatCard({ cat }: { cat: Cat }) {
  const [fav, setFav] = useState(() => getFavourites().includes(cat.id));

  const onFav = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setFav(toggleFavourite(cat.id).includes(cat.id));
  };

  return (
    <motion.article
      whileHover={{ y: -8 }}
      transition={{ type: 'spring', stiffness: 300, damping: 22 }}
      className="card group flex h-full flex-col overflow-hidden hover:shadow-lift"
    >
      <div className="relative aspect-[4/3] overflow-hidden">
        <Link to={`/cats/${cat.id}`} aria-label={`View ${cat.name}`}>
          <img
            src={cat.images[0]}
            alt={`${cat.name}, a ${cat.color} Maine Coon`}
            loading="lazy"
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
          />
        </Link>
        <span
          className={`badge absolute left-3 top-3 ${statusStyles[cat.status]} shadow-sm`}
        >
          {cat.status}
        </span>
        <button
          type="button"
          onClick={onFav}
          aria-pressed={fav}
          aria-label={fav ? `Remove ${cat.name} from favourites` : `Add ${cat.name} to favourites`}
          className="absolute right-3 top-3 inline-flex h-10 w-10 items-center justify-center rounded-full bg-white/90 text-ember shadow-sm backdrop-blur transition hover:scale-110"
        >
          <HeartIcon filled={fav} className="h-5 w-5" />
        </button>
      </div>

      <div className="flex flex-1 flex-col p-5">
        <div className="flex items-center justify-between gap-2">
          <h3 className="text-xl font-extrabold text-forest-800">{cat.name}</h3>
          <span className="inline-flex items-center gap-1 text-sm font-semibold text-muted">
            {cat.gender === 'Male' ? (
              <MaleIcon className="h-4 w-4 text-sky" />
            ) : (
              <FemaleIcon className="h-4 w-4 text-ember" />
            )}
            {cat.gender}
          </span>
        </div>

        <p className="mt-1 text-sm font-medium text-muted">{cat.ageLabel}</p>
        <p className="mt-1 inline-flex items-center gap-1 text-sm text-muted">
          <PinIcon className="h-4 w-4 text-forest-500" /> {cat.location}
        </p>

        <p className="mt-3 line-clamp-2 text-sm leading-relaxed text-ink/80">
          {cat.shortDescription}
        </p>

        <div className="mt-auto flex gap-2 pt-5">
          <Link to={`/cats/${cat.id}`} className="btn-ghost flex-1 px-4 py-2.5 text-sm">
            View Details
          </Link>
          <Link
            to={`/cats/${cat.id}`}
            className={`btn-accent flex-1 px-4 py-2.5 text-sm ${
              cat.status === 'Adopted' ? 'pointer-events-none opacity-50' : ''
            }`}
            aria-disabled={cat.status === 'Adopted'}
          >
            Reserve <ArrowRightIcon className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </motion.article>
  );
}
