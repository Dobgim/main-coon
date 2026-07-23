import { rehomedStories } from './rehomed';

/**
 * Central site configuration.
 *
 * NOTE: Every contact detail, bank detail and charity number below is a
 * PLACEHOLDER for this demo template. Replace them with the real,
 * verified details before this site is ever deployed for a live charity.
 */
export const site = {
  name: 'Royal Maine Coon Kittens',
  tagline: 'Home-raised Maine Coon Kittens',
  shortPitch: 'Gentle giants deserve gentle homes.',
  foundedYear: 2010,
  rehomedCount: '500+',

  // --- SEO ---
  // Your live domain (no trailing slash). Used for canonical URLs & sitemap.
  url: 'https://royalmainecoonkiten.com',
  seoDescription:
    'Healthy, home-raised Maine Coon kittens in Evansville, Indiana. Vet-checked, vaccinated gentle giants — reserve your Maine Coon kitten today, with nationwide delivery available.',
  keywords:
    'Maine Coon kittens, Maine Coon kittens for sale, Maine Coon kittens Indiana, Maine Coon kittens Evansville, Maine Coon breeder, buy Maine Coon kitten, reserve Maine Coon kitten',

  // --- Placeholder contact details ---
  email: 'royalmainecoonkitten159@gmail.com',
  phone: '(317) 225-7139',
  // WhatsApp number in international format, digits only (e.g. 18125551234).
  // Leave blank to fall back to the contact page.
  whatsapp: '13172257139',
  // Left blank on purpose — no physical address is shown on the site.
  address: '',
  responseTime: "We aim to reply within 24 hours.",

  // --- Placeholder registration / trust info ---
  charityNumber: '0000000 (placeholder)',

  // --- Placeholder social links ---
  social: {
    facebook: 'https://www.facebook.com/share/1BbohnNhPm/?mibextid=wwXIfr',
    instagram: 'https://instagram.com/',
    tiktok: 'https://www.tiktok.com/@royalcoonkittens?_r=1&_t=ZT-97aIEINMEaT',
  },

  // --- Payment details shown to buyers at checkout so they can pay you. ---
  // Fill in the methods you use; any left blank are hidden automatically.
  payment: {
    zelle: '' as string, // Zelle email or phone number
    cashApp: '' as string, // $cashtag (with or without the $)
    chime: '' as string, // $ChimeSign, or the email/phone linked to Chime
    applePay: '' as string, // phone number or email linked to Apple Pay / Apple Cash
    instructions:
      'Please include your order reference in the payment note. Once paid, reply to your confirmation email or message us on WhatsApp with a screenshot and we will confirm your kitten. Kittens are held for 48 hours.' as string,
  },

  // --- Placeholder donation details (NOT real) ---
  donation: {
    paypalUrl: 'https://www.paypal.com/donate', // replace with real hosted button URL
    amazonWishlist: 'https://www.amazon.com/',
    bank: {
      accountName: 'Royal Maine Coon Kittens (placeholder)',
      bankName: 'Example Bank',
      routingNumber: '000000000',
      accountNumber: '000000000',
      reference: 'Your name',
    },
  },
} as const;

export const localBusinessSchema = {
  '@context': 'https://schema.org',
  '@type': 'PetStore',
  name: site.name,
  description: site.seoDescription,
  url: site.url,
  telephone: site.phone,
  email: site.email,
  image: 'https://images.unsplash.com/photo-1606214174585-fe31582dc6ee?auto=format&fit=crop&w=1200&q=70',
  priceRange: '$$$',
  sameAs: [
    site.social.facebook,
    site.social.instagram,
    site.social.tiktok,
  ].filter(Boolean),
  aggregateRating: {
    '@type': 'AggregateRating',
    ratingValue: '5',
    reviewCount: rehomedStories.length.toString(),
  },
  review: rehomedStories.map((story) => ({
    '@type': 'Review',
    reviewRating: {
      '@type': 'Rating',
      ratingValue: story.rating,
      bestRating: '5',
    },
    author: {
      '@type': 'Person',
      name: story.adopter,
    },
    reviewBody: story.quote,
  })),
};


export const navLinks = [
  { label: 'Home', to: '/' },
  { label: 'About Us', to: '/about' },
  { label: 'Available Kittens', to: '/cats' },
  { label: 'Happy Families', to: '/rehomed' },
  { label: 'Blog', to: '/blog' },
  { label: 'Contact', to: '/contact' },
] as const;
