
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
    'Purebred, home-raised Maine Coon kittens for sale in Evansville, Indiana. Located at 219 S Grand Ave, Evansville, IN 47713. DNA health-tested, vet-checked gentle giants with in-person pickup and safe delivery to Newburgh, Henderson KY, Owensboro KY, and nationwide.',
  keywords:
    'Maine Coon kittens for sale Evansville IN, Maine Coon breeders Evansville Indiana, Maine Coon kittens 219 S Grand Ave Evansville, Maine Coon kittens near me, Maine Coon kittens Indiana, Maine Coon kittens Kentucky, Maine Coon kittens Newburgh IN, Maine Coon kittens Henderson KY, Maine Coon kittens Owensboro KY, European Maine Coon kittens Evansville, Maine Coon adoption Evansville IN, Tri-State Maine Coon breeder, registered Maine Coon cattery Indiana',

  // --- Physical contact details ---
  email: 'royalmainecoonkitten159@gmail.com',
  phone: '(317) 225-7139',
  // WhatsApp number in international format, digits only (e.g. 18125551234).
  // Leave blank to fall back to the contact page.
  whatsapp: '13172257139',
  address: '219 S Grand Ave, Evansville, IN 47713, United States',
  location: {
    street: '219 S Grand Ave',
    city: 'Evansville',
    state: 'IN',
    postalCode: '47713',
    country: 'United States',
    county: 'Vanderburgh County',
    latitude: 37.9698,
    longitude: -87.5615,
  },
  serviceAreas: [
    'Evansville, IN (47713, 47708, 47714, 47715)',
    'Newburgh, IN',
    'Henderson, KY',
    'Owensboro, KY',
    'Jasper, IN',
    'Mount Vernon, IN',
    'Boonville, IN',
    'Princeton, IN',
    'Vincennes, IN',
    'Vanderburgh County, IN',
    'Warrick County, IN',
    'Henderson County, KY',
    'Daviess County, KY',
    'Southwestern Indiana',
    'Western Kentucky',
    'Tri-State Area',
  ],
  services: [
    'Purebred Maine Coon Kittens for Sale',
    'DNA Health-Tested Maine Coon Bloodlines (HCM, SMA, PKDef, FIV/FeLV clear)',
    'European & American Gentle Giant Maine Coons',
    'In-Person Kitten Pickup at 219 S Grand Ave, Evansville, IN',
    'Safe Pet Courier & Flight Nanny Delivery across the Tri-State & Nationwide',
    'Retired King & Queen Maine Coon Rehoming & Adoption',
    'Written 100% Health Guarantee & Lifetime Breeder Support',
    'Maine Coon Diet, Grooming & Breed Care Consultation',
  ],
  hours: 'Monday – Saturday: 9:00 AM – 6:00 PM (Visits by Appointment)',
  responseTime: 'We aim to reply within 24 hours.',

  // --- Placeholder registration / trust info ---
  charityNumber: '', // blank = the registration line is hidden

  // --- Placeholder social links ---
  social: {
    facebook: 'https://www.facebook.com/share/1BbohnNhPm/?mibextid=wwXIfr',
    instagram: '', // add your real profile URL to show the Instagram link
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
      // Leave blank to hide the bank-transfer panel entirely. Never ship
      // stand-in account numbers on a live site — they read as fraudulent.
      accountName: '',
      bankName: '',
      routingNumber: '',
      accountNumber: '',
      reference: 'Your name',
    },
  },
} as const;

export const localBusinessSchema = {
  '@context': 'https://schema.org',
  '@type': ['PetStore', 'AnimalShelter'],
  name: site.name,
  description: site.seoDescription,
  url: site.url,
  telephone: site.phone,
  email: site.email,
  image: 'https://images.unsplash.com/photo-1606214174585-fe31582dc6ee?auto=format&fit=crop&w=1200&q=70',
  priceRange: '$$$',
  address: {
    '@type': 'PostalAddress',
    streetAddress: '219 S Grand Ave',
    addressLocality: 'Evansville',
    addressRegion: 'IN',
    postalCode: '47713',
    addressCountry: 'US',
  },
  geo: {
    '@type': 'GeoCoordinates',
    latitude: 37.9698,
    longitude: -87.5615,
  },
  openingHoursSpecification: [
    {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
      opens: '09:00',
      closes: '18:00',
    },
  ],
  hasOfferCatalog: {
    '@type': 'OfferCatalog',
    name: 'Maine Coon Services in Evansville, IN & Tri-State',
    itemListElement: [
      {
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name: 'Maine Coon Kittens for Sale',
          description: 'Healthy, vet-checked, and DNA-tested Maine Coon kittens raised underfoot in Evansville, IN.',
        },
      },
      {
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name: 'Local Cattery Pickup at 219 S Grand Ave',
          description: 'Scheduled in-person meetups and kitten pickup at our Evansville, IN home cattery.',
        },
      },
      {
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name: 'Tri-State & Nationwide Kitten Courier Delivery',
          description: 'Safe temperature-controlled delivery to Newburgh, Henderson KY, Owensboro KY, and across the US.',
        },
      },
      {
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name: 'Retired Adult Maine Coon Rehoming',
          description: 'Occasional adoption and loving rehoming of retired Maine Coon breeding cats in Indiana & Kentucky.',
        },
      },
    ],
  },
  sameAs: [
    site.social.facebook,
    site.social.instagram,
    site.social.tiktok,
  ].filter((u) => Boolean(u && u.trim())),
  areaServed: [
    { '@type': 'PostalAddress', postalCode: '47713', addressLocality: 'Evansville', addressRegion: 'IN' },
    { '@type': 'City', name: 'Evansville' },
    { '@type': 'City', name: 'Newburgh' },
    { '@type': 'City', name: 'Henderson', addressRegion: 'KY' },
    { '@type': 'City', name: 'Owensboro', addressRegion: 'KY' },
    { '@type': 'City', name: 'Jasper' },
    { '@type': 'City', name: 'Mount Vernon' },
    { '@type': 'AdministrativeArea', name: 'Vanderburgh County' },
    { '@type': 'State', name: 'Indiana' },
    { '@type': 'State', name: 'Kentucky' },
    { '@type': 'Country', name: 'United States' },
  ],
};


export const navLinks = [
  { label: 'Home', to: '/' },
  { label: 'About Us', to: '/about' },
  { label: 'Available Kittens', to: '/cats' },
  { label: 'Happy Families', to: '/rehomed' },
  { label: 'Blog', to: '/blog' },
  { label: 'Contact', to: '/contact' },
] as const;
