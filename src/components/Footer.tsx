import { Link } from 'react-router-dom';
import Logo from './Logo';
import NewsletterSignup from './NewsletterSignup';
import {
  FacebookIcon,
  InstagramIcon,
  TikTokIcon,
  MailIcon,
  PhoneIcon,
  PinIcon,
  ShieldIcon,
  StarIcon,
  LockIcon,
} from './Icons';
import { site } from '@/data/site';

const quickLinks = [
  { label: 'Home', to: '/' },
  { label: 'About Us', to: '/about' },
  { label: 'Available Kittens', to: '/cats' },
  { label: 'Happy Families', to: '/rehomed' },
  { label: 'Contact', to: '/contact' },
];

export default function Footer() {
  return (
    <footer className="mt-20 bg-forest-800 text-cream/90">
      <div className="container-page grid gap-10 py-14 md:grid-cols-2 lg:grid-cols-4">
        {/* Brand + social */}
        <div>
          <Logo variant="light" />
          <p className="mt-4 max-w-xs text-sm text-cream/70">
            {site.name} — {site.tagline}. Healthy, home-raised gentle giants,
            raised with love and delivered across the US.
          </p>
          <div className="mt-5 flex gap-3">
            <SocialLink href={site.social.facebook} label="Facebook">
              <FacebookIcon />
            </SocialLink>
            <SocialLink href={site.social.instagram} label="Instagram">
              <InstagramIcon />
            </SocialLink>
            <SocialLink href={site.social.tiktok} label="TikTok">
              <TikTokIcon />
            </SocialLink>
          </div>
        </div>

        {/* Quick links */}
        <nav aria-label="Footer">
          <h3 className="text-sm font-bold uppercase tracking-wider text-white">Explore</h3>
          <ul className="mt-4 space-y-2 text-sm">
            {quickLinks.map((l) => (
              <li key={l.to}>
                <Link to={l.to} className="text-cream/70 transition hover:text-ember-200">
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        {/* Contact */}
        <div>
          <h3 className="text-sm font-bold uppercase tracking-wider text-white">Get in touch</h3>
          <ul className="mt-4 space-y-3 text-sm text-cream/70">
            <li className="flex items-center gap-2">
              <PhoneIcon className="h-4 w-4 text-ember-200" />
              <a href={`tel:${site.phone.replace(/\s/g, '')}`} className="hover:text-ember-200">
                {site.phone}
              </a>
            </li>
            <li className="flex items-center gap-2">
              <MailIcon className="h-4 w-4 text-ember-200" />
              <a href={`mailto:${site.email}`} className="hover:text-ember-200">
                {site.email}
              </a>
            </li>
            <li className="flex items-start gap-2">
              <PinIcon className="mt-0.5 h-4 w-4 shrink-0 text-ember-200" />
              <span>{site.address}</span>
            </li>
          </ul>
        </div>

        {/* Newsletter + trust */}
        <div>
          <NewsletterSignup />
          <div className="mt-6 flex flex-wrap gap-2">
            <span className="inline-flex items-center gap-1 rounded-full bg-white/10 px-3 py-1 text-xs font-medium">
              <ShieldIcon className="h-4 w-4 text-ember-200" /> Health Guarantee
            </span>
            <span className="inline-flex items-center gap-1 rounded-full bg-white/10 px-3 py-1 text-xs font-medium">
              <StarIcon className="h-3.5 w-3.5 text-ember-200" /> 5-Star Breeder
            </span>
            <span className="inline-flex items-center gap-1 rounded-full bg-white/10 px-3 py-1 text-xs font-medium">
              <LockIcon className="h-3.5 w-3.5 text-ember-200" /> Secure Checkout
            </span>
          </div>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="container-page flex flex-col items-center justify-between gap-3 py-6 text-xs text-cream/60 sm:flex-row">
          <p>© {new Date().getFullYear()} {site.name}. All rights reserved.</p>
          <div className="flex items-center gap-4">
            <Link to="/privacy" className="hover:text-ember-200">
              Privacy Policy
            </Link>
            <Link to="/terms" className="hover:text-ember-200">
              Terms &amp; Conditions
            </Link>
          </div>
        </div>
        <p className="container-page pb-6 text-center text-[11px] leading-relaxed text-cream/40">
          This is an independent, original demonstration website template. All names, contact
          details, charity numbers and payment details shown are placeholders.
        </p>
      </div>
    </footer>
  );
}

function SocialLink({
  href,
  label,
  children,
}: {
  href: string;
  label: string;
  children: React.ReactNode;
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={label}
      className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white transition hover:-translate-y-0.5 hover:bg-ember"
    >
      {children}
    </a>
  );
}
