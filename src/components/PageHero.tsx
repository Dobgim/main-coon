import type { ReactNode } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

interface Props {
  title: string;
  subtitle?: string;
  image?: string;
  children?: ReactNode;
  breadcrumb?: string;
}

/** Reusable inner-page banner with a soft overlay and animated heading. */
export default function PageHero({ title, subtitle, image, children, breadcrumb }: Props) {
  return (
    <section className="relative overflow-hidden bg-forest-800 text-white">
      {image && (
        <img
          src={image}
          alt=""
          aria-hidden="true"
          loading="lazy"
          className="absolute inset-0 h-full w-full object-cover opacity-30"
        />
      )}
      <div className="absolute inset-0 bg-gradient-to-b from-forest-800/70 via-forest-800/80 to-forest-900/90" />
      <div className="container-page relative py-16 sm:py-20 md:py-24">
        <motion.nav
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-3 text-sm text-cream/70"
          aria-label="Breadcrumb"
        >
          <Link to="/" className="hover:text-ember-200">
            Home
          </Link>{' '}
          / <span className="text-white">{breadcrumb ?? title}</span>
        </motion.nav>
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.05 }}
          className="max-w-3xl text-4xl font-extrabold tracking-tight text-white sm:text-5xl"
        >
          {title}
        </motion.h1>
        {subtitle && (
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.12 }}
            className="mt-4 max-w-2xl text-lg text-cream/80"
          >
            {subtitle}
          </motion.p>
        )}
        {children && <div className="mt-6">{children}</div>}
      </div>
    </section>
  );
}
