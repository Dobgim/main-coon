/**
 * Central site configuration.
 *
 * NOTE: Every contact detail, bank detail and charity number below is a
 * PLACEHOLDER for this demo template. Replace them with the real,
 * verified details before this site is ever deployed for a live charity.
 */
export const site = {
  name: 'Royal Maine Coon Kiten',
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

  // --- Payment details shown to buyers at checkout so they can pay you. ---
  // Fill in the methods you use; any left blank are hidden automatically.
  payment: {
    paypal: '' as string, // paypal.me link or PayPal email
    zelle: '' as string, // Zelle email or phone number
    cashApp: '' as string, // $cashtag (with or without the $)
    venmo: '' as string, // @handle
    bank: {
      accountName: '' as string,
      bankName: '' as string,
      routingNumber: '' as string,
      accountNumber: '' as string,
    },
    instructions:
      'Please include your order reference in the payment note. Once paid, reply to your confirmation email or message us on WhatsApp with a screenshot and we will confirm your kitten. Kittens are held for 48 hours.' as string,
  },

  // --- Placeholder donation details (NOT real) ---
  donation: {
    paypalUrl: 'https://www.paypal.com/donate', // replace with real hosted button URL
    amazonWishlist: 'https://www.amazon.com/',
    bank: {
      accountName: 'Royal Maine Coon Kiten (placeholder)',
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
