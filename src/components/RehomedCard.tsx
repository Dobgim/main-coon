import { useState } from 'react';
import { motion } from 'framer-motion';
import type { RehomedStory } from '@/types';

/** Success-story card with a before → after image toggle and testimonial. */
export default function RehomedCard({ story }: { story: RehomedStory }) {
  const [showAfter, setShowAfter] = useState(true);

  return (
    <motion.article
      whileHover={{ y: -6 }}
      transition={{ type: 'spring', stiffness: 300, damping: 22 }}
      className="card flex h-full flex-col overflow-hidden hover:shadow-lift"
    >
      <div className="relative aspect-[4/3] overflow-hidden">
        <img
          src={showAfter ? story.afterImage : story.beforeImage}
          alt={`${story.catName} ${showAfter ? 'in their new home' : 'when first rescued'}`}
          loading="lazy"
          className="h-full w-full object-cover transition-opacity duration-300"
        />
        <div className="absolute left-3 top-3 inline-flex overflow-hidden rounded-full bg-white/90 p-1 text-xs font-semibold shadow-sm backdrop-blur">
          <button
            type="button"
            onClick={() => setShowAfter(false)}
            className={`rounded-full px-3 py-1 transition ${
              !showAfter ? 'bg-forest text-white' : 'text-forest-700'
            }`}
          >
            Before
          </button>
          <button
            type="button"
            onClick={() => setShowAfter(true)}
            className={`rounded-full px-3 py-1 transition ${
              showAfter ? 'bg-forest text-white' : 'text-forest-700'
            }`}
          >
            After
          </button>
        </div>
        <span className="absolute right-3 top-3 badge bg-ember text-white shadow-sm">
          Rehomed {story.year}
        </span>
      </div>

      <div className="flex flex-1 flex-col p-6">
        <div className="mb-1 flex items-center gap-1 text-ember" aria-label={`${story.rating} out of 5`}>
          {Array.from({ length: story.rating }).map((_, i) => (
            <span key={i}>★</span>
          ))}
        </div>
        <h3 className="text-xl font-extrabold text-forest-800">{story.title}</h3>
        <p className="mt-1 text-sm font-medium text-muted">
          {story.catName} • adopted by {story.adopter}, {story.location}
        </p>
        <blockquote className="mt-3 flex-1 text-sm italic leading-relaxed text-ink/80">
          “{story.quote}”
        </blockquote>
      </div>
    </motion.article>
  );
}
