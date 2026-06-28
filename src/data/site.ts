/**
 * Central site configuration.
 *
 * NOTE: Every contact detail, bank detail and charity number below is a
 * PLACEHOLDER for this demo template. Replace them with the real,
 * verified details before this site is ever deployed for a live charity.
 */
export const site = {
  name: 'Maine Coons in Need',
  tagline: 'US Maine Coon Cat Rescue',
  shortPitch: 'Gentle giants deserve gentle homes.',
  foundedYear: 2010,
  rehomedCount: '500+',

  // --- Placeholder contact details ---
  email: 'info@example-rescue.org',
  phone: '+1 (000) 000-0000',
  // WhatsApp number in international format, digits only (e.g. 18125551234).
  // Leave blank to fall back to the contact page.
  whatsapp: '',
  address: '219 S Grand Ave, Evansville, Indiana 47713',
  responseTime: "We aim to reply within 24 hours.",

  // --- Placeholder registration / trust info ---
  charityNumber: '0000000 (placeholder)',

  // --- Placeholder social links ---
  social: {
    facebook: 'https://facebook.com/',
    instagram: 'https://instagram.com/',
    tiktok: 'https://www.tiktok.com/@royalcoonkittens?_r=1&_t=ZT-97aIEINMEaT',
  },

  // --- Placeholder donation details (NOT real) ---
  donation: {
    paypalUrl: 'https://www.paypal.com/donate', // replace with real hosted button URL
    amazonWishlist: 'https://www.amazon.com/',
    bank: {
      accountName: 'Maine Coons in Need (placeholder)',
      bankName: 'Example Bank',
      routingNumber: '000000000',
      accountNumber: '000000000',
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
