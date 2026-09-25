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

const SLIDE_INTERVAL = 4500;

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: 0.1 * i, duration: 0.55, ease: 'easeOut' },
  }),
};

const stats = [
  { n: '500+', l: 'Kittens placed' },
  { n: '14', l: 'Years breeding' },
  { n: '100%', l: 'Health guaranteed' },
];

export default function Hero() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const id = setInterval(() => setIndex((i) => (i + 1) % heroImages.length), SLIDE_INTERVAL);
    return () => clearInterval(id);
  }, []);

  return (
    <section className="relative overflow-hidden bg-cream">
      <div className="absolute inset-0 bg-paw-pattern opacity-70" aria-hidden />

      {/*
        On mobile the photo comes first: a buyer should see a kitten before they
        read anything. On desktop it returns to the right-hand column.
      */}
      <div className="container-page relative grid items-center gap-8 py-10 sm:py-14 lg:grid-cols-2 lg:gap-12 lg:py-24">
        {/* Photo */}
        <motion.div
          initial={{ opacity: 0, scale: 0.97 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, ease: 'easeOut' }}
          className="relative order-1 lg:order-2"
        >
          <div className="relative aspect-[5/4] overflow-hidden rounded-3xl shadow-lift ring-1 ring-black/5 sm:aspect-[4/3] lg:aspect-auto lg:h-[460px] lg:rounded-[2.5rem]">
            <AnimatePresence>
              <motion.img
                key={index}
                src={heroImages[index].src}
                alt={heroImages[index].alt}
                className="absolute inset-0 h-full w-full object-cover"
                initial={{ opacity: 0, scale: 1.1 }}
                animate={{ opacity: 1, scale: 1.03 }}
                exit={{ opacity: 0, scale: 1.03 }}
                transition={{
                  opacity: { duration: 0.7, ease: 'easeInOut' },
                  scale: { duration: SLIDE_INTERVAL / 1000 + 0.7, ease: 'easeOut' },
                }}
                fetchPriority="high"
              />
            </AnimatePresence>

            {/* Trust strip — readable on mobile, where the floating card is hidden. */}
            <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/65 to-transparent px-4 pb-4 pt-10 sm:hidden">
              <p className="flex items-center gap-1.5 text-sm font-bold text-white">
                <PawIcon className="h-4 w-4" /> Home-raised · Vet-checked · Vaccinated
              </p>
            </div>

            <div className="absolute bottom-4 left-1/2 z-10 flex -translate-x-1/2 gap-2 sm:bottom-4">
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
              <PawIcon className="h-4 w-4 text-forest-600" /> Home-raised with love
            </p>
            <p className="text-xs text-muted">Vet-checked &amp; vaccinated</p>
          </motion.div>
        </motion.div>

        {/* Copy */}
        <div className="order-2 lg:order-1">
          <motion.span
            custom={0}
            initial="hidden"
            animate="show"
            variants={fadeUp}
            className="badge inline-flex items-center gap-1.5 bg-ember-100 text-ember-700"
          >
            <PawIcon className="h-4 w-4" /> Home-raised Maine Coon Kittens
          </motion.span>

          <motion.h1
            custom={1}
            initial="hidden"
            animate="show"
            variants={fadeUp}
            className="mt-3 text-[2rem] font-extrabold leading-[1.12] tracking-tight sm:text-5xl lg:text-6xl"
          >
            Healthy Maine Coon kittens <span className="text-forest">raised with love</span>
          </motion.h1>

          <motion.p
            custom={2}
            initial="hidden"
            animate="show"
            variants={fadeUp}
            className="mt-4 max-w-xl text-base leading-relaxed text-muted sm:text-lg"
          >
            Vet-checked, vaccinated and well-socialised — ready to join your family, with
            nationwide delivery available.
          </motion.p>

          {/*
            One clear next step. The previous pair of equally-weighted buttons at
            different widths, with the orange one pulsing forever, read as noise.
          */}
          <motion.div
            custom={3}
            initial="hidden"
            animate="show"
            variants={fadeUp}
            className="mt-6 flex flex-col gap-3 sm:flex-row sm:flex-wrap"
          >
            <Link
              to="/cats"
              className="btn-accent w-full text-base shadow-glow sm:w-auto sm:px-8"
            >
              <HeartIcon className="h-5 w-5" filled /> Reserve a Kitten
            </Link>
            <Link to="/cats" className="btn-ghost w-full text-base sm:w-auto">
              View Available Kittens <ArrowRightIcon className="h-5 w-5" />
            </Link>
          </motion.div>

          <motion.dl
            custom={4}
            initial="hidden"
            animate="show"
            variants={fadeUp}
            className="mt-8 grid grid-cols-3 gap-3 rounded-2xl border border-forest-100 bg-white/70 p-4 sm:max-w-md sm:gap-4"
          >
            {stats.map((s) => (
              <div key={s.l} className="text-center sm:text-left">
                <dt className="text-xl font-extrabold text-forest sm:text-2xl">{s.n}</dt>
                <dd className="mt-0.5 text-[11px] leading-tight text-muted sm:text-sm">{s.l}</dd>
              </div>
            ))}
          </motion.dl>
        </div>
      </div>
    </section>
  );
}
