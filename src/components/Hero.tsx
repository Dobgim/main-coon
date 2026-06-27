import { useLayoutEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { gsap, prefersReducedMotion } from '@/lib/gsap-config';
import { PawIcon, ArrowRightIcon } from './Icons';

const heroImg =
  'https://images.unsplash.com/photo-1606214174585-fe31582dc6ee?auto=format&fit=crop&w=1400&q=70';

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  show: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: 0.12 * i, duration: 0.6, ease: 'easeOut' },
  }),
};

export default function Hero() {
  const imgRef = useRef<HTMLImageElement>(null);

  // Subtle parallax: the hero image drifts as the user scrolls.
  useLayoutEffect(() => {
    if (!imgRef.current || prefersReducedMotion()) return;
    const ctx = gsap.context(() => {
      gsap.to(imgRef.current, {
        yPercent: 14,
        ease: 'none',
        scrollTrigger: {
          trigger: imgRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: true,
        },
      });
    });
    return () => ctx.revert();
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
            className="badge bg-ember-100 text-ember-700"
          >
            <PawIcon className="h-4 w-4" /> UK Maine Coon Cat Rescue
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
            We rescue, rehabilitate and rehome gentle giants across the UK. Every cat
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
              <Link to="/donate" className="btn-accent text-base shadow-glow">
                ❤️ Donate Now
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

        {/* Image */}
        <motion.div
          initial={{ opacity: 0, scale: 0.96, y: 24 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          className="relative"
        >
          <div className="relative overflow-hidden rounded-[2.5rem] shadow-lift ring-1 ring-black/5">
            <img
              ref={imgRef}
              src={heroImg}
              alt="A fluffy Maine Coon cat resting peacefully"
              className="h-[460px] w-full scale-110 object-cover"
              fetchPriority="high"
            />
          </div>
          <motion.div
            className="absolute -bottom-5 -left-5 hidden rounded-2xl bg-white p-4 shadow-lift ring-1 ring-black/5 sm:block"
            animate={{ y: [0, -8, 0] }}
            transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
          >
            <p className="text-sm font-bold text-forest-800">🐾 Adopt, don't shop</p>
            <p className="text-xs text-muted">Gentle giants need you</p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
