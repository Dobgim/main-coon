import type { ReactNode } from 'react';
import { PawIcon } from './Icons';

interface Props {
  eyebrow?: string;
  title: ReactNode;
  description?: ReactNode;
  align?: 'left' | 'center';
  className?: string;
}

export default function SectionHeading({
  eyebrow,
  title,
  description,
  align = 'center',
  className,
}: Props) {
  return (
    <div
      className={[
        align === 'center' ? 'mx-auto text-center' : 'text-left',
        'max-w-2xl',
        className ?? '',
      ].join(' ')}
    >
      {eyebrow && (
        <span className="badge inline-flex items-center gap-1.5 bg-forest-50 text-forest-700">
          <PawIcon className="h-3.5 w-3.5" /> {eyebrow}
        </span>
      )}
      <h2 className="mt-3 text-3xl font-extrabold tracking-tight sm:text-4xl">{title}</h2>
      {description && (
        <p className="mt-4 text-base leading-relaxed text-muted">{description}</p>
      )}
    </div>
  );
}
