interface LogoProps {
  className?: string;
  /** When false, only the cat-badge mark is rendered (no wordmark). */
  withText?: boolean;
  /** Use light colours for placement on dark backgrounds (e.g. the footer). */
  variant?: 'dark' | 'light';
}

/**
 * Original, custom-drawn Maine Coon badge + wordmark. Inline SVG so it stays
 * crisp at any size and can recolour for light/dark backgrounds.
 */
export default function Logo({ className, withText = true, variant = 'dark' }: LogoProps) {
  const titleColor = variant === 'light' ? '#ffffff' : '#235c35';
  return (
    <span className={`inline-flex items-center gap-3 ${className ?? ''}`}>
      <svg
        viewBox="0 0 64 64"
        className="h-10 w-10 shrink-0"
        aria-hidden="true"
        focusable="false"
      >
        <defs>
          <linearGradient id="logo-badge" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="#5aae6a" />
            <stop offset="1" stopColor="#2a7440" />
          </linearGradient>
        </defs>
        <rect width="64" height="64" rx="16" fill="url(#logo-badge)" />
        <g fill="#faf7f1">
          <path d="M16 20l3-7 7 5z" />
          <path d="M48 20l-3-7-7 5z" />
          <path d="M32 18c-9 0-15 6-15 15 0 9 6 16 15 16s15-7 15-16c0-9-6-15-15-15z" />
        </g>
        <g fill="#2a7440">
          <ellipse cx="26" cy="31" rx="2.6" ry="3.4" />
          <ellipse cx="38" cy="31" rx="2.6" ry="3.4" />
        </g>
        <path d="M32 36l-2.4 2.4h4.8z" fill="#f25c0a" />
        <path
          d="M32 39c-2 2-4 1.5-5 0M32 39c2 2 4 1.5 5 0"
          fill="none"
          stroke="#2a7440"
          strokeWidth="1.4"
          strokeLinecap="round"
        />
      </svg>
      {withText && (
        <span className="flex flex-col leading-none">
          <span
            className="font-heading text-lg font-extrabold tracking-tight"
            style={{ color: titleColor }}
          >
            Royal Maine Coon
          </span>
          <span className="font-heading text-xs font-semibold tracking-[0.25em] text-ember">
            KITEN
          </span>
        </span>
      )}
    </span>
  );
}
