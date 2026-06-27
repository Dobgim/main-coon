import { useState, useEffect, useCallback } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRightIcon } from './Icons';

const slides = [
  {
    id: 0,
    image:
      'https://images.unsplash.com/photo-1606214174585-fe31582dc6ee?auto=format&fit=crop&w=1600&q=75',
    eyebrow: 'Meet Oliver',
    heading: 'Every cat deserves a place to call home',
    sub: 'A 4-year-old gentle giant waiting patiently for his forever family.',
    location: 'Manchester',
    catId: 'oliver',
  },
  {
    id: 1,
    image:
      'https://images.unsplash.com/photo-1574158622682-e40e69881006?auto=format&fit=crop&w=1600&q=75',
    eyebrow: 'Meet Luna',
    heading: 'Fill your home with love and purrs',
    sub: 'Playful, affectionate and utterly charming — Luna is ready to steal your heart.',
    location: 'London',
    catId: 'luna',
  },
  {
    id: 2,
    image:
      'https://images.unsplash.com/photo-1596854407944-bf87f6fdd49e?auto=format&fit=crop&w=1600&q=75',
    eyebrow: 'Meet Finn',
    heading: 'Gentle giants need gentle hearts',
    sub: 'Rescued from difficult circumstances, Finn is now ready to shower you with love.',
    location: 'Edinburgh',
    catId: 'finn',
  },
];

const INTERVAL = 5500;

export default function CatSlideshow() {
  const [current, setCurrent] = useState(0);
  const [paused, setPaused] = useState(false);

  const next = useCallback(() => {
    setCurrent((prev) => (prev + 1) % slides.length);
  }, []);

  const prev = useCallback(() => {
    setCurrent((prev) => (prev - 1 + slides.length) % slides.length);
  }, []);

  useEffect(() => {
    if (paused) return;
    const id = setInterval(next, INTERVAL);
    return () => clearInterval(id);
  }, [next, paused]);

  return (
    <section
      className="relative h-[580px] overflow-hidden md:h-[640px]"
      aria-label="Featured cats slideshow"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <AnimatePresence mode="sync">
        <motion.div
          key={current}
          className="absolute inset-0"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.0, ease: 'easeInOut' }}
        >
          {/* Background image with Ken Burns zoom */}
          <motion.img
            src={slides[current].image}
            alt={slides[current].eyebrow}
            className="h-full w-full object-cover"
            initial={{ scale: 1.08 }}
            animate={{ scale: 1 }}
            transition={{ duration: 7, ease: 'easeOut' }}
          />

          {/* Gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-r from-ink/85 via-ink/50 to-transparent" />

          {/* Content */}
          <div className="absolute inset-0 flex items-center">
            <div className="container-page max-w-2xl">
              <motion.span
                className="badge bg-ember text-white"
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.6 }}
              >
                {slides[current].eyebrow} &bull; {slides[current].location}
              </motion.span>

              <motion.h2
                className="mt-4 text-3xl font-extrabold leading-tight text-white sm:text-4xl lg:text-5xl"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.35, duration: 0.7 }}
              >
                {slides[current].heading}
              </motion.h2>

              <motion.p
                className="mt-3 max-w-lg text-base leading-relaxed text-cream/90 sm:text-lg"
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 0.6 }}
              >
                {slides[current].sub}
              </motion.p>

              <motion.div
                className="mt-6 flex flex-wrap gap-3"
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.65, duration: 0.6 }}
              >
                <Link to={`/cats/${slides[current].catId}`} className="btn-primary">
                  View {slides[current].eyebrow.replace('Meet ', '')} <ArrowRightIcon className="h-5 w-5" />
                </Link>
                <Link to="/cats" className="btn-outline-white">
                  All cats
                </Link>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Previous / Next arrows */}
      <button
        type="button"
        onClick={prev}
        aria-label="Previous slide"
        className="absolute left-4 top-1/2 -translate-y-1/2 rounded-full bg-white/20 p-2.5 text-white backdrop-blur-sm transition hover:bg-white/35 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
      >
        <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
        </svg>
      </button>
      <button
        type="button"
        onClick={next}
        aria-label="Next slide"
        className="absolute right-4 top-1/2 -translate-y-1/2 rounded-full bg-white/20 p-2.5 text-white backdrop-blur-sm transition hover:bg-white/35 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
      >
        <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
        </svg>
      </button>

      {/* Navigation dots */}
      <div className="absolute bottom-6 left-1/2 flex -translate-x-1/2 items-center gap-2.5">
        {slides.map((_, i) => (
          <button
            key={i}
            type="button"
            onClick={() => setCurrent(i)}
            aria-label={`Go to slide ${i + 1}`}
            className={`h-2 rounded-full transition-all duration-400 ${
              i === current ? 'w-8 bg-white' : 'w-2 bg-white/50 hover:bg-white/75'
            }`}
          />
        ))}
      </div>

      {/* Progress bar */}
      {!paused && (
        <motion.div
          key={current}
          className="absolute bottom-0 left-0 h-0.5 bg-ember"
          initial={{ width: '0%' }}
          animate={{ width: '100%' }}
          transition={{ duration: INTERVAL / 1000, ease: 'linear' }}
        />
      )}
    </section>
  );
}
