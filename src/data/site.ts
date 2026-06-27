/**
 * Central site configuration.
 *
 * NOTE: Every contact detail, bank detail and charity number below is a
 * PLACEHOLDER for this demo template. Replace them with the real,
 * verified details before this site is ever deployed for a live charity.
 */
export const site = {
  name: 'Maine Coons in Need',
  tagline: 'UK Maine Coon Cat Rescue',
  shortPitch: 'Gentle giants deserve gentle homes.',
  foundedYear: 2010,
  rehomedCount: '500+',

  // --- Placeholder contact details ---
  email: 'info@example-rescue.org',
  phone: '+44 0000 000000',
  address: 'Demo Lane, Yorkshire, United Kingdom',
  responseTime: "We aim to reply within 24 hours.",

  // --- Placeholder registration / trust info ---
  charityNumber: '0000000 (placeholder)',

  // --- Placeholder social links ---
  social: {
    facebook: 'https://facebook.com/',
    instagram: 'https://instagram.com/',
    twitter: 'https://twitter.com/',
  },

  // --- Placeholder donation details (NOT real) ---
  donation: {
    paypalUrl: 'https://www.paypal.com/donate', // replace with real hosted button URL
    amazonWishlist: 'https://www.amazon.co.uk/',
    bank: {
      accountName: 'Maine Coons in Need (placeholder)',
      bankName: 'Example Bank',
      sortCode: '00-00-00',
      accountNumber: '00000000',
      reference: 'Your name',
    },
  },
} as const;

export const navLinks = [
  { label: 'Home', to: '/' },
  { label: 'About Us', to: '/about' },
  { label: 'Cats for Adoption', to: '/cats' },
  { label: 'Rehomed Cats', to: '/rehomed' },
  { label: 'How to Help', to: '/help' },
  { label: 'Contact', to: '/contact' },
] as const;
