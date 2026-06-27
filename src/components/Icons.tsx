import type { SVGProps } from 'react';

/** Minimal inline icon set — keeps the bundle free of an icon library. */
type IconProps = SVGProps<SVGSVGElement>;

const base = (props: IconProps): IconProps => ({
  width: 20,
  height: 20,
  viewBox: '0 0 24 24',
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 2,
  strokeLinecap: 'round',
  strokeLinejoin: 'round',
  'aria-hidden': true,
  focusable: false,
  ...props,
});

export const HeartIcon = ({ filled, ...p }: IconProps & { filled?: boolean }) => (
  <svg {...base(p)} fill={filled ? 'currentColor' : 'none'}>
    <path d="M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.6l-1-1a5.5 5.5 0 1 0-7.8 7.8l1 1L12 21l7.8-7.6 1-1a5.5 5.5 0 0 0 0-7.8z" />
  </svg>
);

export const PawIcon = (p: IconProps) => (
  <svg {...base(p)} fill="currentColor" stroke="none">
    <circle cx="5.5" cy="11" r="2" />
    <circle cx="9.5" cy="6.5" r="2" />
    <circle cx="14.5" cy="6.5" r="2" />
    <circle cx="18.5" cy="11" r="2" />
    <path d="M12 11c-2.6 0-5 2.2-5 4.8 0 1.7 1.3 2.7 3 2.7.9 0 1.4-.3 2-.3s1.1.3 2 .3c1.7 0 3-1 3-2.7 0-2.6-2.4-4.8-5-4.8z" />
  </svg>
);

export const MailIcon = (p: IconProps) => (
  <svg {...base(p)}>
    <rect x="3" y="5" width="18" height="14" rx="2" />
    <path d="m3 7 9 6 9-6" />
  </svg>
);

export const PhoneIcon = (p: IconProps) => (
  <svg {...base(p)}>
    <path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6 19.8 19.8 0 0 1-3.1-8.7A2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1.9.3 1.8.6 2.6a2 2 0 0 1-.5 2.1L8 9.6a16 16 0 0 0 6 6l1.2-1.2a2 2 0 0 1 2.1-.5c.8.3 1.7.5 2.6.6a2 2 0 0 1 1.7 2z" />
  </svg>
);

export const PinIcon = (p: IconProps) => (
  <svg {...base(p)}>
    <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0z" />
    <circle cx="12" cy="10" r="3" />
  </svg>
);

export const CheckIcon = (p: IconProps) => (
  <svg {...base(p)}>
    <path d="M20 6 9 17l-5-5" />
  </svg>
);

export const ArrowRightIcon = (p: IconProps) => (
  <svg {...base(p)}>
    <path d="M5 12h14M13 6l6 6-6 6" />
  </svg>
);

export const ShareIcon = (p: IconProps) => (
  <svg {...base(p)}>
    <circle cx="18" cy="5" r="3" />
    <circle cx="6" cy="12" r="3" />
    <circle cx="18" cy="19" r="3" />
    <path d="m8.6 13.5 6.8 4M15.4 6.5 8.6 10.5" />
  </svg>
);

export const ShieldIcon = (p: IconProps) => (
  <svg {...base(p)}>
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
    <path d="m9 12 2 2 4-4" />
  </svg>
);

export const MaleIcon = (p: IconProps) => (
  <svg {...base(p)}>
    <circle cx="10" cy="14" r="5" />
    <path d="M15 9l5-5M15 4h5v5" />
  </svg>
);

export const FemaleIcon = (p: IconProps) => (
  <svg {...base(p)}>
    <circle cx="12" cy="9" r="5" />
    <path d="M12 14v7M9 18h6" />
  </svg>
);

export const FacebookIcon = (p: IconProps) => (
  <svg {...base(p)} fill="currentColor" stroke="none">
    <path d="M22 12a10 10 0 1 0-11.6 9.9v-7H7.9V12h2.5V9.8c0-2.5 1.5-3.9 3.8-3.9 1.1 0 2.2.2 2.2.2v2.5h-1.3c-1.2 0-1.6.8-1.6 1.6V12h2.8l-.4 2.9h-2.4v7A10 10 0 0 0 22 12z" />
  </svg>
);

export const InstagramIcon = (p: IconProps) => (
  <svg {...base(p)}>
    <rect x="3" y="3" width="18" height="18" rx="5" />
    <circle cx="12" cy="12" r="4" />
    <circle cx="17.5" cy="6.5" r="0.6" fill="currentColor" />
  </svg>
);

export const TwitterIcon = (p: IconProps) => (
  <svg {...base(p)} fill="currentColor" stroke="none">
    <path d="M18.2 2H21l-6.5 7.4L22 22h-6.8l-4.7-6.2L5 22H2.2l7-8L2 2h6.9l4.3 5.7L18.2 2zm-2.4 18h1.5L8.3 3.8H6.7L15.8 20z" />
  </svg>
);
