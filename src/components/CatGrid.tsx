import type { Cat } from '@/types';
import CatCard from './CatCard';
import Reveal from './Reveal';

interface Props {
  cats: Cat[];
  /** Optional message shown when the list is empty. */
  emptyMessage?: string;
}

export default function CatGrid({ cats, emptyMessage }: Props) {
  if (cats.length === 0) {
    return (
      <div className="card flex flex-col items-center gap-3 px-6 py-16 text-center">
        <span className="text-5xl">🐾</span>
        <p className="text-lg font-semibold text-forest-800">
          {emptyMessage ?? 'No cats currently available — check back soon!'}
        </p>
        <p className="max-w-md text-sm text-muted">
          New cats arrive regularly. Follow us on social media or subscribe to our
          newsletter to be the first to know.
        </p>
      </div>
    );
  }

  return (
    <Reveal
      stagger={0.08}
      className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3"
    >
      {cats.map((cat) => (
        <CatCard key={cat.id} cat={cat} />
      ))}
    </Reveal>
  );
}
