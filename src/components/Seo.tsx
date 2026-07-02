import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { site } from '@/data/site';

interface SeoProps {
  /** Page title (without the brand suffix). Omit on the home page. */
  title?: string;
  description?: string;
  image?: string;
  /** Set true on pages that should not be indexed (privacy, terms, admin). */
  noindex?: boolean;
  /** Optional schema.org structured data for this page. */
  jsonLd?: Record<string, unknown> | Record<string, unknown>[] | null;
}

const DEFAULT_IMAGE = `${site.url}/logo.svg`;

function upsertMeta(key: string, value: string, attr: 'name' | 'property' = 'name') {
  let el = document.head.querySelector<HTMLMetaElement>(`meta[${attr}="${key}"]`);
  if (!el) {
    el = document.createElement('meta');
    el.setAttribute(attr, key);
    document.head.appendChild(el);
  }
  el.setAttribute('content', value);
}

function upsertLink(rel: string, href: string) {
  let el = document.head.querySelector<HTMLLinkElement>(`link[rel="${rel}"]`);
  if (!el) {
    el = document.createElement('link');
    el.setAttribute('rel', rel);
    document.head.appendChild(el);
  }
  el.setAttribute('href', href);
}

export default function Seo({ title, description, image, noindex, jsonLd }: SeoProps) {
  const { pathname } = useLocation();

  useEffect(() => {
    const fullTitle = title ? `${title} | ${site.name}` : `${site.name} — Maine Coon Kittens`;
    const desc = description ?? site.seoDescription;
    const url = `${site.url}${pathname}`;
    const img = image ?? DEFAULT_IMAGE;

    document.title = fullTitle;
    upsertMeta('description', desc);
    upsertMeta('keywords', site.keywords);
    upsertMeta('robots', noindex ? 'noindex,nofollow' : 'index,follow');

    upsertMeta('og:title', fullTitle, 'property');
    upsertMeta('og:description', desc, 'property');
    upsertMeta('og:url', url, 'property');
    upsertMeta('og:image', img, 'property');
    upsertMeta('og:type', 'website', 'property');

    upsertMeta('twitter:card', 'summary_large_image');
    upsertMeta('twitter:title', fullTitle);
    upsertMeta('twitter:description', desc);
    upsertMeta('twitter:image', img);

    upsertLink('canonical', url);

    // Per-page structured data
    const existing = document.getElementById('page-jsonld');
    if (existing) existing.remove();
    if (jsonLd) {
      const script = document.createElement('script');
      script.type = 'application/ld+json';
      script.id = 'page-jsonld';
      script.text = JSON.stringify(jsonLd);
      document.head.appendChild(script);
    }
  }, [title, description, image, noindex, jsonLd, pathname]);

  return null;
}
