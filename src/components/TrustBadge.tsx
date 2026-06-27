import type { ReactNode } from 'react';

interface Props {
  icon: ReactNode;
  title: string;
  subtitle?: string;
}

/** Compact trust signal used on the donate / about pages. */
export default function TrustBadge({ icon, title, subtitle }: Props) {
  return (
    <div className="flex items-center gap-3 rounded-2xl bg-white px-4 py-3 shadow-soft ring-1 ring-black/5">
      <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-forest-50 text-forest-600">
        {icon}
      </span>
      <span>
        <span className="block text-sm font-bold text-forest-800">{title}</span>
        {subtitle && <span className="block text-xs text-muted">{subtitle}</span>}
      </span>
    </div>
  );
}
