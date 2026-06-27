import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import type { HelpWay } from '@/types';
import { ArrowRightIcon } from './Icons';

export default function HelpCard({ way }: { way: HelpWay }) {
  const cta = way.external ? (
    <a
      href={way.to}
      target="_blank"
      rel="noopener noreferrer"
      className="btn-ghost mt-5 text-sm"
    >
      {way.ctaLabel} <ArrowRightIcon className="h-4 w-4" />
    </a>
  ) : (
    <Link to={way.to} className="btn-ghost mt-5 text-sm">
      {way.ctaLabel} <ArrowRightIcon className="h-4 w-4" />
    </Link>
  );

  return (
    <motion.div
      whileHover={{ y: -8 }}
      transition={{ type: 'spring', stiffness: 300, damping: 22 }}
      className="card group flex h-full flex-col p-7 text-center hover:shadow-lift"
    >
      <span className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-forest-50 text-3xl transition-colors group-hover:bg-ember-100">
        {way.icon}
      </span>
      <h3 className="mt-5 text-xl font-extrabold text-forest-800">{way.title}</h3>
      <p className="mt-2 flex-1 text-sm leading-relaxed text-muted">{way.description}</p>
      <div className="mt-auto flex justify-center">{cta}</div>
    </motion.div>
  );
}
