import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { PawIcon, ArrowRightIcon, HeartIcon } from './Icons';

const heroImages = [
  {
    src: 'https://images.unsplash.com/photo-1606214174585-fe31582dc6ee?auto=format&fit=crop&w=1400&q=70',
    alt: 'A fluffy white Maine Coon cat resting peacefully',
  },
  {
    src: 'https://images.unsplash.com/photo-1574158622682-e40e69881006?auto=format&fit=crop&w=1400&q=70',
    alt: 'A majestic brown Maine Coon gazing into the distance',
  },
  {
    src: 'https://images.unsplash.com/photo-1596854407944-bf87f6fdd49e?auto=format&fit=crop&w=1400&q=70',
    alt: 'A gentle Maine Coon curled up in a cosy home',
  },
];

const SLIDE_INTERVAL = 3000;

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  show: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: 0.12 * i, duration: 0.6, ease: 'easeOut' },
  }),
};

export default function Hero() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const id = setInterval(
      () => setIndex((i) => (i + 1) % heroImages.length),
      SLIDE_INTERVAL,
    );
    return () => clearInterval(id);
  }, []);

  return (
    <section className="relative overflow-hidden bg-cream">
      <div className="absolute inset-0 bg-paw-pattern opacity-70" aria-hidden />
      <div className="container-page relative grid items-center gap-10 py-16 md:py-24 lg:grid-cols-2 lg:gap-12">
        {/* Copy */}
        <div>
          <motion.span
            custom={0}
            initial="hidden"
            animate="show"
            variants={fadeUp}
            className="badge inline-flex items-center gap-1.5 bg-ember-100 text-ember-700"
          >
            <PawIcon className="h-4 w-4" /> US Maine Coon Cat Rescue
          </motion.span>

          <motion.h1
            custom={1}
            initial="hidden"
            animate="show"
            variants={fadeUp}
            className="mt-4 text-4xl font-extrabold leading-[1.1] tracking-tight sm:text-5xl lg:text-6xl"
          >
            Helping Maine Coons{' '}
            <span className="text-forest">find their forever homes</span>
          </motion.h1>

          <motion.p
            custom={2}
            initial="hidden"
            animate="show"
            variants={fadeUp}
            className="mt-5 max-w-xl text-lg leading-relaxed text-muted"
          >
            We rescue, rehabilitate and rehome gentle giants across the US. Every cat
            deserves warmth, safety and a family to call their own — help us give them one.
          </motion.p>

          <motion.div
            custom={3}
            initial="hidden"
            animate="show"
            variants={fadeUp}
            className="mt-8 flex flex-wrap gap-3"
          >
            <Link to="/cats" className="btn-primary text-base">
              View Cats for Adoption <ArrowRightIcon className="h-5 w-5" />
            </Link>
            <motion.div
              animate={{ scale: [1, 1.04, 1] }}
              transition={{ duration: 2.4, repeat: Infinity, ease: 'easeInOut' }}
            >
              <Link to="/donate" className="btn-accent inline-flex items-center gap-2 text-base shadow-glow">
                <HeartIcon className="h-5 w-5" filled /> Donate Now
              </Link>
            </motion.div>
          </motion.div>

          <motion.dl
            custom={4}
            initial="hidden"
            animate="show"
            variants={fadeUp}
            className="mt-10 grid max-w-md grid-cols-3 gap-4"
          >
            {[
              { n: '500+', l: 'Cats rehomed' },
              { n: '14', l: 'Years rescuing' },
              { n: '100%', l: 'To cat care' },
            ].map((s) => (
              <div key={s.l}>
                <dt className="text-2xl font-extrabold text-forest">{s.n}</dt>
                <dd className="text-sm text-muted">{s.l}</dd>
              </div>
            ))}
          </motion.dl>
        </div>

        {/* Image slideshow */}
        <motion.div
          initial={{ opacity: 0, scale: 0.96, y: 24 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          className="relative"
        >
          <div className="relative h-[460px] overflow-hidden rounded-[2.5rem] shadow-lift ring-1 ring-black/5">
            <AnimatePresence>
              <motion.img
                key={index}
                src={heroImages[index].src}
                alt={heroImages[index].alt}
                className="absolute inset-0 h-full w-full object-cover"
                initial={{ opacity: 0, scale: 1.12 }}
                animate={{ opacity: 1, scale: 1.04 }}
                exit={{ opacity: 0, scale: 1.04 }}
                transition={{
                  opacity: { duration: 0.7, ease: 'easeInOut' },
                  scale: { duration: SLIDE_INTERVAL / 1000 + 0.7, ease: 'easeOut' },
                }}
                fetchPriority="high"
              />
            </AnimatePresence>

            {/* Slide indicators */}
            <div className="absolute bottom-4 left-1/2 z-10 flex -translate-x-1/2 gap-2">
              {heroImages.map((img, i) => (
                <button
                  key={img.src}
                  type="button"
                  onClick={() => setIndex(i)}
                  aria-label={`Show cat photo ${i + 1}`}
                  className={`h-2 rounded-full transition-all duration-300 ${
                    i === index ? 'w-7 bg-white' : 'w-2 bg-white/60 hover:bg-white/80'
                  }`}
                />
              ))}
            </div>
          </div>

          <motion.div
            className="absolute -bottom-5 -left-5 z-10 hidden rounded-2xl bg-white p-4 shadow-lift ring-1 ring-black/5 sm:block"
            animate={{ y: [0, -8, 0] }}
            transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
          >
            <p className="flex items-center gap-1.5 text-sm font-bold text-forest-800">
              <PawIcon className="h-4 w-4 text-forest-600" /> Adopt, don&apos;t shop
            </p>
            <p className="text-xs text-muted">Gentle giants need you</p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
