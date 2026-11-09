import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const projectRoot = path.resolve(__dirname, '..');

// Helper to load environment variables from .env
function loadEnv() {
  let supabaseUrl = process.env.VITE_SUPABASE_URL;
  let supabaseAnonKey = process.env.VITE_SUPABASE_ANON_KEY;

  if (!supabaseUrl || !supabaseAnonKey) {
    try {
      const envPath = path.resolve(projectRoot, '.env');
      if (fs.existsSync(envPath)) {
        const envText = fs.readFileSync(envPath, 'utf8');
        const lines = envText.split('\n');
        for (const line of lines) {
          const trimmed = line.trim();
          if (!trimmed || trimmed.startsWith('#')) continue;
          const parts = trimmed.split('=');
          if (parts.length >= 2) {
            const key = parts[0].trim();
            const value = parts.slice(1).join('=').trim();
            if (key === 'VITE_SUPABASE_URL') {
              supabaseUrl = value;
            } else if (key === 'VITE_SUPABASE_ANON_KEY') {
              supabaseAnonKey = value;
            }
          }
        }
      }
    } catch (err) {
      console.warn('[prerender] Error reading .env file:', err.message);
    }
  }

  return { supabaseUrl, supabaseAnonKey };
}

// Simple parser for src/data/catFaqs.ts
function parseCatFaqs() {
  try {
    const faqsPath = path.resolve(projectRoot, 'src/data/catFaqs.ts');
    if (!fs.existsSync(faqsPath)) return {};
    const text = fs.readFileSync(faqsPath, 'utf8');
    const faqs = {};
    const blockRegex = /(\w+):\s*\[([\s\S]*?)\]/g;
    let blockMatch;
    while ((blockMatch = blockRegex.exec(text)) !== null) {
      const slug = blockMatch[1];
      const blockContent = blockMatch[2];
      const items = [];
      const itemRegex = /\{\s*question:\s*(['"`])([\s\S]*?)\1,\s*answer:\s*(['"`])([\s\S]*?)\3\s*\}/g;
      let itemMatch;
      while ((itemMatch = itemRegex.exec(blockContent)) !== null) {
        const q = itemMatch[2].replace(/\\'/g, "'").replace(/\\"/g, '"');
        const a = itemMatch[4].replace(/\\'/g, "'").replace(/\\"/g, '"');
        items.push({ question: q, answer: a });
      }
      faqs[slug] = items;
    }
    return faqs;
  } catch (err) {
    console.error('[prerender] Error parsing FAQs:', err.message);
    return {};
  }
}

// Simple parser for src/data/cats.ts
function parseSeedCats() {
  try {
    const catsPath = path.resolve(projectRoot, 'src/data/cats.ts');
    if (!fs.existsSync(catsPath)) return [];
    const text = fs.readFileSync(catsPath, 'utf8');
    const cats = [];
    const catRegex = /\{\s*id:\s*'([\w-]+)'[\s\S]*?name:\s*'([\s\S]*?)'[\s\S]*?color:\s*'([\s\S]*?)'[\s\S]*?location:\s*'([\s\S]*?)'[\s\S]*?adoptionFee:\s*(\d+)[\s\S]*?shortDescription:\s*(['"`])([\s\S]*?)\5[\s\S]*?story:\s*(['"`])([\s\S]*?)\7[\s\S]*?images:\s*\[([\s\S]*?)\]/g;
    let match;
    while ((match = catRegex.exec(text)) !== null) {
      const imagesText = match[10];
      const imageIds = [];
      const imgRegex = /img\('([\w-]+)'\)/g;
      let imgMatch;
      while ((imgMatch = imgRegex.exec(imagesText)) !== null) {
        imageIds.push(`https://images.unsplash.com/photo-${imgMatch[1]}?auto=format&fit=crop&w=900&q=70`);
      }
      cats.push({
        slug: match[1],
        name: match[2],
        color: match[3],
        location: match[4],
        adoption_fee: Number(match[5]),
        short_description: match[6],
        story: match[8],
        images: imageIds,
        published: true,
        status: 'Available'
      });
    }
    return cats;
  } catch (err) {
    console.error('[prerender] Error parsing seed cats:', err.message);
    return [];
  }
}

// Simple parser for src/data/blog.ts
function parseBlogPosts() {
  try {
    const blogPath = path.resolve(projectRoot, 'src/data/blog.ts');
    if (!fs.existsSync(blogPath)) return [];
    const text = fs.readFileSync(blogPath, 'utf8');
    const posts = [];
    const postRegex = /slug:\s*['"`]([^'"`]+)['"`][\s\S]*?title:\s*['"`]([^'"`]+)['"`][\s\S]*?date:\s*['"`]([^'"`]+)['"`][\s\S]*?author:\s*['"`]([^'"`]+)['"`][\s\S]*?excerpt:\s*['"`]([^'"`]+)['"`][\s\S]*?content:\s*`([\s\S]*?)`[\s\S]*?image:\s*['"`]([^'"`]+)['"`]/g;
    let match;
    while ((match = postRegex.exec(text)) !== null) {
      posts.push({
        slug: match[1],
        title: match[2],
        date: match[3],
        author: match[4],
        excerpt: match[5],
        content: match[6].trim(),
        image: match[7]
      });
    }
    return posts;
  } catch (err) {
    console.error('[prerender] Error parsing blog posts:', err.message);
    return [];
  }
}

// Fetch cats from Supabase, fallback to seed cats
async function getCats(env) {
  const { supabaseUrl, supabaseAnonKey } = env;
  if (!supabaseUrl || !supabaseAnonKey) {
    console.warn('[prerender] Supabase credentials not found in env/dotenv. Falling back to local seed data.');
    return parseSeedCats();
  }

  try {
    const url = `${supabaseUrl}/rest/v1/cats?select=*&published=eq.true&order=created_at.desc`;
    const res = await fetch(url, {
      headers: {
        'apikey': supabaseAnonKey,
        'Authorization': `Bearer ${supabaseAnonKey}`
      }
    });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const rows = await res.json();
    console.log(`[prerender] Successfully fetched ${rows.length} published cats from Supabase.`);
    return rows.map(r => ({
      slug: r.slug,
      name: r.name,
      color: r.color,
      location: r.location,
      adoption_fee: Number(r.adoption_fee),
      short_description: r.short_description,
      story: r.story,
      images: r.images || [],
      published: r.published,
      status: r.status,
      age_label: r.age_label || '',
      gender: r.gender || '',
      personality: r.personality || [],
      vet_checked: r.vet_checked,
      vaccinated: r.vaccinated,
      neutered: r.neutered,
      microchipped: r.microchipped,
      good_with_children: r.good_with_children,
      good_with_cats: r.good_with_cats,
      good_with_dogs: r.good_with_dogs,
      created_at: r.created_at || ''
    }));
  } catch (err) {
    console.warn(`[prerender] Failed to fetch live cats from Supabase (${err.message}). Falling back to local seed data.`);
    return parseSeedCats();
  }
}

// ---------------------------------------------------------------------------
// Answer-engine helpers
// ---------------------------------------------------------------------------

const SITE_URL = 'https://royalmainecoonkiten.com';
const BUSINESS_ID = `${SITE_URL}/#business`;
const WEBSITE_ID = `${SITE_URL}/#website`;

/** Single source of business facts used in schema, static HTML and llms.txt. */
const business = {
  name: 'Royal Maine Coon Kittens',
  summary:
    'Royal Maine Coon Kittens is a family home cattery at 219 S Grand Ave, Evansville, Indiana 47713 that has raised purebred Maine Coon kittens since 2010. Kittens are raised cage-free in the home, come from parents DNA tested clear for HCM, SMA and PKDef, and leave vet-checked, vaccinated, dewormed and microchipped with a written health guarantee. Kittens can be collected in person in Evansville or delivered across the Tri-State area (Indiana and Kentucky) and nationwide.',
  street: '219 S Grand Ave',
  city: 'Evansville',
  region: 'IN',
  regionName: 'Indiana',
  postalCode: '47713',
  county: 'Vanderburgh County',
  country: 'US',
  phone: '(317) 225-7139',
  phoneE164: '+1-317-225-7139',
  email: 'royalmainecoonkitten159@gmail.com',
  hours: 'Monday to Saturday, 9:00 AM to 6:00 PM (visits by appointment)',
  foundedYear: 2010,
  placed: '500+',
  latitude: 37.9698,
  longitude: -87.5615,
  image: 'https://images.unsplash.com/photo-1606214174585-fe31582dc6ee?auto=format&fit=crop&w=1200&q=70',
  sameAs: [
    'https://www.facebook.com/share/1BbohnNhPm/?mibextid=wwXIfr',
    'https://www.tiktok.com/@royalcoonkittens?_r=1&_t=ZT-97aIEINMEaT',
  ],
  serviceAreas: [
    'Evansville, IN', 'Newburgh, IN', 'Boonville, IN', 'Mount Vernon, IN', 'Princeton, IN',
    'Jasper, IN', 'Vincennes, IN', 'Henderson, KY', 'Owensboro, KY', 'Indianapolis, IN',
    'Louisville, KY', 'Nationwide (United States)',
  ],
  services: [
    'Purebred Maine Coon kittens for sale',
    'Parent cats DNA tested clear for HCM, SMA and PKDef',
    'In-person kitten pickup at 219 S Grand Ave, Evansville, IN (by appointment)',
    'Tri-State and nationwide delivery by certified pet courier or in-cabin flight nanny',
    'Occasional rehoming of retired adult Maine Coons',
    'Written health guarantee and lifetime breeder support',
  ],
  included: [
    'Veterinary check', 'Age-appropriate vaccinations', 'Deworming', 'Microchip',
    'Litter training', 'Veterinary records', "Parents' DNA health results",
    'Written health guarantee', 'Lifetime breeder support',
  ],
};

const addressSchema = {
  '@type': 'PostalAddress',
  streetAddress: business.street,
  addressLocality: business.city,
  addressRegion: business.region,
  postalCode: business.postalCode,
  addressCountry: business.country,
};

const businessSchema = {
  '@context': 'https://schema.org',
  '@type': 'PetStore',
  '@id': BUSINESS_ID,
  name: business.name,
  alternateName: 'Royal Maine Coon Kittens Cattery',
  description: business.summary,
  slogan: 'Gentle giants deserve gentle homes.',
  url: SITE_URL,
  logo: `${SITE_URL}/logo.svg`,
  image: business.image,
  telephone: business.phoneE164,
  email: business.email,
  foundingDate: String(business.foundedYear),
  priceRange: '$$$',
  currenciesAccepted: 'USD',
  address: addressSchema,
  geo: { '@type': 'GeoCoordinates', latitude: business.latitude, longitude: business.longitude },
  hasMap: `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent('219 S Grand Ave, Evansville, IN 47713')}`,
  openingHoursSpecification: [
    {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
      opens: '09:00',
      closes: '18:00',
    },
  ],
  contactPoint: {
    '@type': 'ContactPoint',
    contactType: 'customer service',
    telephone: business.phoneE164,
    email: business.email,
    areaServed: 'US',
    availableLanguage: 'English',
  },
  knowsAbout: [
    'Maine Coon cats', 'Maine Coon kittens', 'Cat breeding',
    'Feline genetic health testing (HCM, SMA, PKDef)', 'Maine Coon grooming',
    'Maine Coon nutrition and growth',
  ],
  makesOffer: business.services.map((name) => ({
    '@type': 'Offer',
    itemOffered: { '@type': 'Service', name },
  })),
  sameAs: business.sameAs,
  areaServed: [
    { '@type': 'City', name: 'Evansville', containedInPlace: { '@type': 'State', name: 'Indiana' } },
    { '@type': 'City', name: 'Newburgh', containedInPlace: { '@type': 'State', name: 'Indiana' } },
    { '@type': 'City', name: 'Henderson', containedInPlace: { '@type': 'State', name: 'Kentucky' } },
    { '@type': 'City', name: 'Owensboro', containedInPlace: { '@type': 'State', name: 'Kentucky' } },
    { '@type': 'City', name: 'Jasper', containedInPlace: { '@type': 'State', name: 'Indiana' } },
    { '@type': 'AdministrativeArea', name: 'Vanderburgh County' },
    { '@type': 'State', name: 'Indiana' },
    { '@type': 'State', name: 'Kentucky' },
    { '@type': 'Country', name: 'United States' },
  ],
};

const websiteSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  '@id': WEBSITE_ID,
  url: SITE_URL,
  name: business.name,
  inLanguage: 'en-US',
  publisher: { '@id': BUSINESS_ID },
};

function loadSiteFaqs() {
  try {
    const p = path.resolve(projectRoot, 'src/data/siteFaqs.json');
    return JSON.parse(fs.readFileSync(p, 'utf8'));
  } catch (err) {
    console.warn('[prerender] Could not read siteFaqs.json:', err.message);
    return [];
  }
}

function esc(value) {
  return String(value ?? '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

function faqPageSchema(faqs) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((f) => ({
      '@type': 'Question',
      name: f.question,
      acceptedAnswer: { '@type': 'Answer', text: f.answer },
    })),
  };
}

function breadcrumb(items) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map(([name, item], i) => ({
      '@type': 'ListItem', position: i + 1, name, item,
    })),
  };
}

function webPage(type, name, description, url, extra = {}) {
  return {
    '@context': 'https://schema.org',
    '@type': type,
    '@id': `${url}#webpage`,
    name,
    description,
    url,
    inLanguage: 'en-US',
    isPartOf: { '@id': WEBSITE_ID },
    about: { '@id': BUSINESS_ID },
    ...extra,
  };
}

// Mirrors src/lib/seoText.ts — keep titles <= 60 and descriptions <= 155 chars.
const TITLE_MAX = 60;
const DESC_MAX = 155;

function clampAtWord(text, max) {
  if (text.length <= max) return text;
  const cut = text.slice(0, max - 1);
  const lastSpace = cut.lastIndexOf(' ');
  return `${(lastSpace > max * 0.6 ? cut.slice(0, lastSpace) : cut).replace(/[\s,;:—–-]+$/, '')}…`;
}

function fitTitle(base, brand = 'Royal Maine Coon Kittens') {
  const clean = String(base).replace(/\s+/g, ' ').trim();
  if (clean.includes(brand)) return clampAtWord(clean, TITLE_MAX);
  const branded = `${clean} | ${brand}`;
  return branded.length <= TITLE_MAX ? branded : clampAtWord(clean, TITLE_MAX);
}

function fitDescription(text) {
  const clean = String(text).replace(/\s+/g, ' ').trim();
  if (clean.length <= DESC_MAX) return clean;
  const window = clean.slice(0, DESC_MAX);
  const sentenceEnd = Math.max(window.lastIndexOf('. '), window.lastIndexOf('! '), window.lastIndexOf('? '));
  if (sentenceEnd >= 80) return window.slice(0, sentenceEnd + 1);
  return clampAtWord(clean, DESC_MAX);
}

function shortColor(color) {
  const first = String(color || '').split(/[,(;.]/)[0].trim();
  return first.length > 30 ? clampAtWord(first, 30) : first;
}

function loadLocations() {
  try {
    return JSON.parse(fs.readFileSync(path.resolve(projectRoot, 'src/data/locations.json'), 'utf8'));
  } catch (err) {
    console.warn('[prerender] Could not read locations.json:', err.message);
    return [];
  }
}

function loadPageMeta() {
  return JSON.parse(fs.readFileSync(path.resolve(projectRoot, 'src/data/pageMeta.json'), 'utf8'));
}

function yesNo(v) {
  return v === true ? 'Yes' : v === false ? 'No' : null;
}

function catFacts(cat) {
  return [
    ['Breed', 'Maine Coon'],
    ['Age', cat.age_label],
    ['Gender', cat.gender],
    ['Color', cat.color],
    ['Price', cat.adoption_fee ? `$${cat.adoption_fee} USD` : null],
    ['Status', cat.status],
    ['Location', cat.location || 'Evansville, IN (219 S Grand Ave)'],
    ['Vet-checked', yesNo(cat.vet_checked)],
    ['Vaccinated', yesNo(cat.vaccinated)],
    ['Microchipped', yesNo(cat.microchipped)],
    ['Spayed/neutered', yesNo(cat.neutered)],
    ['Good with children', yesNo(cat.good_with_children)],
    ['Good with cats', yesNo(cat.good_with_cats)],
    ['Good with dogs', yesNo(cat.good_with_dogs)],
    ['Personality', (cat.personality || []).join(', ')],
  ].filter(([, v]) => v);
}

function factsTable(rows) {
  return `<dl>${rows.map(([k, v]) => `<dt><strong>${esc(k)}</strong></dt><dd>${esc(v)}</dd>`).join('')}</dl>`;
}

function faqHtml(faqs, heading = 'Frequently asked questions') {
  if (!faqs.length) return '';
  return `<section><h2>${esc(heading)}</h2>${faqs
    .map((f) => `<h3>${esc(f.question)}</h3><p>${esc(f.answer)}</p>`)
    .join('')}</section>`;
}

function catListHtml(cats) {
  if (!cats.length) return '<p>No kittens are listed right now. Contact us to join the waiting list for the next litter.</p>';
  return `<ul>${cats
    .map((c) => {
      const bits = [shortColor(c.color), c.age_label, c.gender, c.adoption_fee ? `$${c.adoption_fee}` : '', c.status]
        .filter(Boolean)
        .join(' · ');
      return `<li><a href="/cats/${esc(c.slug)}">${esc(c.name)}</a> — ${esc(bits)}</li>`;
    })
    .join('')}</ul>`;
}

const NAV = [
  ['/', 'Home'], ['/about', 'About Us'], ['/cats', 'Available Kittens'],
  ['/rehomed', 'Happy Families'], ['/blog', 'Blog'], ['/contact', 'Contact'],
];

/**
 * Wraps page content in a plain, semantic HTML shell. This is what crawlers
 * that don't run JavaScript (most AI answer engines) read. React replaces it
 * with the full interactive page as soon as the app mounts.
 */
function shell(mainHtml) {
  return `<div data-prerendered style="max-width:72rem;margin:0 auto;padding:1.5rem 1rem;font-family:Inter,system-ui,sans-serif;line-height:1.6;color:#1f2a24">
<header><nav aria-label="Main">${NAV.map(([h, l]) => `<a href="${h}">${l}</a>`).join(' · ')}</nav></header>
<main>${mainHtml}</main>
<footer><p><strong>${business.name}</strong> — ${business.street}, ${business.city}, ${business.region} ${business.postalCode}. Phone <a href="tel:${business.phoneE164}">${business.phone}</a> · Email <a href="mailto:${business.email}">${business.email}</a> · ${business.hours}.</p></footer>
</div>`;
}

function stripHtml(html) {
  return html
    .replace(/<h2>(.*?)<\/h2>/g, '\n### $1\n')
    .replace(/<h3>(.*?)<\/h3>/g, '\n#### $1\n')
    .replace(/<li>(.*?)<\/li>/g, '- $1\n')
    .replace(/<strong>(.*?)<\/strong>/g, '**$1**')
    .replace(/<p>([\s\S]*?)<\/p>/g, '$1\n')
    .replace(/<[^>]+>/g, '')
    .replace(/[ \t]+\n/g, '\n')
    .replace(/\n{3,}/g, '\n\n')
    .trim();
}

// ---------------------------------------------------------------------------

async function run() {
  const env = loadEnv();
  const buildDir = path.resolve(projectRoot, 'dist');
  const templatePath = path.resolve(buildDir, 'index.html');

  if (!fs.existsSync(templatePath)) {
    console.error(`[prerender] Error: dist/index.html not found! Run "npm run build" first.`);
    process.exit(1);
  }

  const template = fs.readFileSync(templatePath, 'utf8');

  const catsList = await getCats(env);
  const faqsMap = parseCatFaqs();
  const blogPosts = parseBlogPosts();
  const siteFaqs = loadSiteFaqs();
  const today = new Date().toISOString().slice(0, 10);

  const siteUrl = SITE_URL;
  const siteKeywords = 'Maine Coon kittens for sale Evansville IN, Maine Coon breeders Evansville Indiana, Maine Coon kittens 219 S Grand Ave Evansville, Maine Coon kittens near me, Maine Coon kittens Indiana, Maine Coon kittens Kentucky, Maine Coon kittens Newburgh IN, Maine Coon kittens Henderson KY, Maine Coon kittens Owensboro KY, European Maine Coon kittens Evansville, Maine Coon adoption Evansville IN, Tri-State Maine Coon breeder, registered Maine Coon cattery Indiana';
  // Social platforms don't render SVG previews, so prefer a real kitten photo.
  const firstCatPhoto = catsList.find((c) => c.images && c.images[0])?.images[0];
  const defaultImage = firstCatPhoto || `${siteUrl}/logo.svg`;

  const activeCats = catsList.filter((c) => c.status !== 'Adopted');
  const availableCats = catsList.filter((c) => c.status === 'Available');

  const meta = loadPageMeta();
  const locations = loadLocations();
  const homeDesc = meta.home.description;
  const aboutDesc = meta.about.description;
  const catsDesc = meta.cats.description;
  const rehomedDesc = meta.rehomed.description;
  const contactDesc = meta.contact.description;
  const blogDesc = meta.blog.description;

  const home = ['Home', siteUrl];

  const routes = [
    {
      path: '',
      title: meta.home.title,
      description: homeDesc,
      robots: 'index,follow',
      imageUrl: defaultImage,
      lastmod: today,
      jsonLd: [businessSchema, websiteSchema, webPage('WebPage', business.name, homeDesc, `${siteUrl}/`), faqPageSchema(siteFaqs)],
      body: `<h1>Maine Coon Kittens for Sale in Evansville, IN</h1>
<p>${esc(business.summary)}</p>
<h2>Quick facts</h2>
${factsTable([
  ['Business', business.name],
  ['Type', 'Maine Coon cattery (breeder)'],
  ['Address', `${business.street}, ${business.city}, ${business.region} ${business.postalCode} (${business.county})`],
  ['Phone', business.phone],
  ['Email', business.email],
  ['Hours', business.hours],
  ['Breeding since', String(business.foundedYear)],
  ['Kittens placed', business.placed],
  ['Health testing', 'Parents DNA tested clear for HCM, SMA and PKDef'],
  ['Pickup', 'In person at the Evansville cattery, by appointment'],
  ['Delivery', 'Tri-State and nationwide by pet courier or in-cabin flight nanny'],
])}
<h2>What every kitten comes with</h2>
<ul>${business.included.map((i) => `<li>${esc(i)}</li>`).join('')}</ul>
<h2>Kittens available now</h2>
${catListHtml(activeCats.slice(0, 12))}
<p><a href="/cats">See all available Maine Coon kittens</a></p>
<h2>How to reserve a kitten</h2>
<ol><li>Choose a kitten on the <a href="/cats">Available Kittens</a> page.</li><li>Place a deposit to reserve it; the deposit is deducted from the final price.</li><li>The kitten completes its vet exam, vaccinations, deworming and microchipping.</li><li>Collect your kitten in Evansville or receive it by courier or flight nanny.</li></ol>
<h2>Areas served</h2>
<p>${business.serviceAreas.map(esc).join(', ')}.</p>
${faqHtml(siteFaqs, 'Maine Coon kitten FAQs')}`,
    },
    {
      path: 'about',
      title: meta.about.title,
      description: aboutDesc,
      robots: 'index,follow',
      imageUrl: defaultImage,
      lastmod: today,
      jsonLd: [
        businessSchema,
        webPage('AboutPage', `About ${business.name}`, aboutDesc, `${siteUrl}/about`, { mainEntity: { '@id': BUSINESS_ID } }),
        breadcrumb([home, ['About Us', `${siteUrl}/about`]]),
      ],
      body: `<h1>About ${business.name}</h1>
<p>${business.name} was established in ${business.foundedYear} out of love for the Maine Coon breed. Based in our home at ${business.street}, ${business.city}, ${business.region} ${business.postalCode}, our kittens are raised underfoot — never in cages — so they grow up confident, affectionate and used to everyday household life.</p>
<p>We focus on ethical breeding: genetic health testing of the parents (HCM, SMA and PKDef clear), veterinary examinations, age-appropriate vaccinations and a written health guarantee. Families from Evansville, Newburgh, Henderson KY, Owensboro KY and across the United States have brought home ${business.placed} of our kittens.</p>
<h2>Our services</h2>
<ul>${business.services.map((s) => `<li>${esc(s)}</li>`).join('')}</ul>
<p><a href="/cats">View available kittens</a> · <a href="/contact">Contact us</a></p>`,
    },
    {
      path: 'cats',
      title: meta.cats.title,
      description: catsDesc,
      robots: 'index,follow',
      imageUrl: defaultImage,
      lastmod: today,
      jsonLd: [
        webPage('CollectionPage', 'Available Maine Coon Kittens', catsDesc, `${siteUrl}/cats`),
        {
          '@context': 'https://schema.org',
          '@type': 'ItemList',
          name: 'Maine Coon kittens at Royal Maine Coon Kittens',
          numberOfItems: catsList.length,
          itemListElement: catsList.map((cat, index) => ({
            '@type': 'ListItem',
            position: index + 1,
            url: `${siteUrl}/cats/${cat.slug}`,
            name: cat.name,
            image: cat.images[0] || defaultImage,
          })),
        },
        breadcrumb([home, ['Available Kittens', `${siteUrl}/cats`]]),
      ],
      body: `<h1>Available Maine Coon Kittens in Evansville, IN</h1>
<p>${availableCats.length} purebred Maine Coon kitten${availableCats.length === 1 ? ' is' : 's are'} currently available from ${business.name} at ${business.street}, ${business.city}, ${business.region} ${business.postalCode}. Each kitten is vet-checked, vaccinated and microchipped, from DNA health-tested parents, and can be collected in person or delivered. Prices are in US dollars.</p>
${catListHtml(catsList)}`,
    },
    {
      path: 'rehomed',
      title: meta.rehomed.title,
      description: rehomedDesc,
      robots: 'index,follow',
      imageUrl: defaultImage,
      lastmod: today,
      jsonLd: [
        webPage('WebPage', 'Happy Families', rehomedDesc, `${siteUrl}/rehomed`),
        breadcrumb([home, ['Happy Families', `${siteUrl}/rehomed`]]),
      ],
      body: `<h1>Happy Families</h1><p>${esc(rehomedDesc)}</p><p><a href="/cats">Meet the kittens available now</a></p>`,
    },
    {
      path: 'contact',
      title: meta.contact.title,
      description: contactDesc,
      robots: 'index,follow',
      imageUrl: defaultImage,
      lastmod: today,
      jsonLd: [
        businessSchema,
        webPage('ContactPage', `Contact ${business.name}`, contactDesc, `${siteUrl}/contact`, { mainEntity: { '@id': BUSINESS_ID } }),
        breadcrumb([home, ['Contact', `${siteUrl}/contact`]]),
      ],
      body: `<h1>Contact ${business.name}</h1>
<p>Call <a href="tel:${business.phoneE164}">${business.phone}</a>, email <a href="mailto:${business.email}">${business.email}</a>, or visit by appointment at ${business.street}, ${business.city}, ${business.region} ${business.postalCode}. We aim to reply within 24 hours.</p>
${factsTable([
  ['Address', `${business.street}, ${business.city}, ${business.region} ${business.postalCode}, United States`],
  ['Phone', business.phone],
  ['Email', business.email],
  ['Hours', business.hours],
])}`,
    },
    {
      path: 'help',
      title: meta.help.title,
      description: meta.help.description,
      robots: 'index,follow',
      imageUrl: defaultImage,
      lastmod: today,
      jsonLd: breadcrumb([home, ['How to Help', `${siteUrl}/help`]]),
      body: `<h1>How to Help</h1><p>Ways to support ${business.name}. <a href="/contact">Contact us</a> to get involved.</p>`,
    },
    {
      path: 'donate',
      title: meta.donate.title,
      description: meta.donate.description,
      robots: 'index,follow',
      imageUrl: defaultImage,
      lastmod: today,
      jsonLd: breadcrumb([home, ['Donate', `${siteUrl}/donate`]]),
      body: `<h1>Donate</h1><p>Support ${business.name} with a donation or wishlist gift.</p>`,
    },
    {
      path: 'privacy',
      title: 'Privacy Policy | Royal Maine Coon Kittens',
      description: 'Privacy Policy for Royal Maine Coon Kittens cattery.',
      robots: 'noindex,nofollow',
      imageUrl: defaultImage,
      jsonLd: breadcrumb([home, ['Privacy Policy', `${siteUrl}/privacy`]]),
      body: '<h1>Privacy Policy</h1>',
    },
    {
      path: 'terms',
      title: 'Terms & Conditions | Royal Maine Coon Kittens',
      description: 'Terms and conditions for reserving or purchasing Maine Coon kittens.',
      robots: 'noindex,nofollow',
      imageUrl: defaultImage,
      jsonLd: breadcrumb([home, ['Terms & Conditions', `${siteUrl}/terms`]]),
      body: '<h1>Terms &amp; Conditions</h1>',
    },
    {
      path: 'blog',
      title: meta.blog.title,
      description: blogDesc,
      robots: 'index,follow',
      imageUrl: defaultImage,
      lastmod: blogPosts.map((p) => p.date).sort().pop() || today,
      jsonLd: [
        {
          '@context': 'https://schema.org',
          '@type': 'Blog',
          '@id': `${siteUrl}/blog#blog`,
          name: 'Maine Coon Blog & Guides',
          description: blogDesc,
          url: `${siteUrl}/blog`,
          inLanguage: 'en-US',
          publisher: { '@id': BUSINESS_ID },
          blogPost: blogPosts.map((p) => ({
            '@type': 'BlogPosting',
            headline: p.title,
            url: `${siteUrl}/blog/${p.slug}`,
            datePublished: p.date,
          })),
        },
        breadcrumb([home, ['Blog', `${siteUrl}/blog`]]),
      ],
      body: `<h1>Maine Coon Blog &amp; Guides</h1><p>${esc(blogDesc)}</p>
<ul>${blogPosts.map((p) => `<li><a href="/blog/${esc(p.slug)}">${esc(p.title)}</a> (${esc(p.date)}) — ${esc(p.excerpt)}</li>`).join('')}</ul>`,
    },
  ];

  routes.push({
    path: 'maine-coon-kittens',
    title: meta.areas.title,
    description: meta.areas.description,
    robots: 'index,follow',
    imageUrl: defaultImage,
    lastmod: today,
    jsonLd: [
      webPage('CollectionPage', 'Areas We Serve', meta.areas.description, `${siteUrl}/maine-coon-kittens`),
      {
        '@context': 'https://schema.org',
        '@type': 'ItemList',
        name: 'Areas served by Royal Maine Coon Kittens',
        itemListElement: locations.map((l, i) => ({
          '@type': 'ListItem', position: i + 1, name: l.place, url: `${siteUrl}/maine-coon-kittens/${l.slug}`,
        })),
      },
      breadcrumb([home, ['Areas We Serve', `${siteUrl}/maine-coon-kittens`]]),
    ],
    body: `<h1>Maine Coon Kittens in Indiana &amp; Kentucky</h1>
<p>Our cattery is at ${business.street}, ${business.city}, ${business.region} ${business.postalCode}. Choose your area for drive times, pickup and delivery options, and local answers. We also deliver nationwide.</p>
<ul>${locations.map((l) => `<li><a href="/maine-coon-kittens/${esc(l.slug)}">${esc(l.h1)}</a> — ${esc(l.distance)}</li>`).join('')}</ul>`,
  });

  for (const loc of locations) {
    const url = `${siteUrl}/maine-coon-kittens/${loc.slug}`;
    routes.push({
      path: `maine-coon-kittens/${loc.slug}`,
      title: loc.title,
      description: loc.description,
      robots: 'index,follow',
      imageUrl: defaultImage,
      lastmod: today,
      jsonLd: [
        {
          '@context': 'https://schema.org',
          '@type': 'Service',
          '@id': `${url}#service`,
          name: loc.h1,
          serviceType: 'Maine Coon kittens for sale',
          description: loc.description,
          url,
          provider: { '@id': BUSINESS_ID },
          areaServed: { '@type': loc.type, name: loc.place },
        },
        faqPageSchema(loc.faqs),
        breadcrumb([home, ['Areas We Serve', `${siteUrl}/maine-coon-kittens`], [loc.place, url]]),
      ],
      body: `<h1>${esc(loc.h1)}</h1>
<p>${esc(loc.intro)}</p>
<h2>How far is the cattery from ${esc(loc.place)}?</h2><p>${esc(loc.distance)}</p>
<h2>Pickup and delivery for ${esc(loc.place)}</h2><p>${esc(loc.getting)}</p>
<h2>Good to know</h2><p>${esc(loc.local)}</p>
<h2>Every kitten comes with</h2>
<ul>${business.included.map((i) => `<li>${esc(i)}</li>`).join('')}</ul>
<h2>Kittens available now</h2>
${catListHtml(availableCats.slice(0, 6))}
${faqHtml(loc.faqs, `Maine Coon kittens in ${loc.place}: FAQs`)}
<p>We also serve: ${locations.filter((o) => o.slug !== loc.slug).map((o) => `<a href="/maine-coon-kittens/${esc(o.slug)}">${esc(o.place)}</a>`).join(', ')}.</p>`,
    });
  }

  for (const post of blogPosts) {
    const url = `${siteUrl}/blog/${post.slug}`;
    routes.push({
      path: `blog/${post.slug}`,
      title: post.title,
      description: post.excerpt,
      robots: 'index,follow',
      imageUrl: post.image,
      lastmod: post.date,
      ogType: 'article',
      jsonLd: [
        {
          '@context': 'https://schema.org',
          '@type': 'BlogPosting',
          '@id': `${url}#article`,
          mainEntityOfPage: { '@type': 'WebPage', '@id': url },
          headline: post.title,
          description: post.excerpt,
          image: post.image,
          inLanguage: 'en-US',
          author: { '@type': 'Organization', '@id': BUSINESS_ID, name: post.author, url: siteUrl },
          publisher: { '@id': BUSINESS_ID },
          isPartOf: { '@id': `${siteUrl}/blog#blog` },
          about: { '@type': 'Thing', name: 'Maine Coon cat' },
          datePublished: post.date,
          dateModified: post.date,
        },
        breadcrumb([home, ['Blog', `${siteUrl}/blog`], [post.title, url]]),
      ],
      body: `<article><h1>${esc(post.title)}</h1>
<p>By ${esc(post.author)} · Published <time datetime="${esc(post.date)}">${esc(post.date)}</time></p>
<p><strong>${esc(post.excerpt)}</strong></p>
${post.content}
</article>`,
    });
  }

  for (const cat of catsList) {
    const url = `${siteUrl}/cats/${cat.slug}`;
    const color = shortColor(cat.color);
    const title = `${cat.name} — ${color} Maine Coon Kitten`; // fitted when written
    const description = cat.short_description || `Meet ${cat.name}, a healthy, vet-checked ${color} Maine Coon kitten available from ${business.name} in Evansville, IN.`;
    const imageUrl = cat.images[0] || defaultImage;
    const availability =
      cat.status === 'Adopted'
        ? 'https://schema.org/SoldOut'
        : cat.status === 'Pending'
          ? 'https://schema.org/LimitedAvailability'
          : 'https://schema.org/InStock';

    const productSchema = {
      '@context': 'https://schema.org',
      '@type': 'Product',
      '@id': `${url}#product`,
      name: `${cat.name} — ${color} Maine Coon Kitten`,
      description: cat.short_description || cat.story,
      image: cat.images,
      url,
      category: 'Maine Coon Kitten',
      sku: cat.slug,
      brand: { '@type': 'Brand', name: business.name },
      additionalProperty: catFacts(cat)
        .filter(([k]) => !['Price', 'Status', 'Location'].includes(k))
        .map(([name, value]) => ({ '@type': 'PropertyValue', name, value })),
      offers: {
        '@type': 'Offer',
        url,
        price: cat.adoption_fee,
        priceCurrency: 'USD',
        itemCondition: 'https://schema.org/NewCondition',
        availability,
        priceValidUntil: `${new Date().getFullYear() + 1}-12-31`,
        seller: { '@id': BUSINESS_ID },
        areaServed: 'US',
      },
    };

    const faqs = faqsMap[cat.slug] || [];
    const jsonLd = [
      productSchema,
      breadcrumb([home, ['Available Kittens', `${siteUrl}/cats`], [cat.name, url]]),
    ];
    if (faqs.length) jsonLd.push(faqPageSchema(faqs));

    routes.push({
      path: `cats/${cat.slug}`,
      title,
      description,
      robots: 'index,follow',
      imageUrl,
      lastmod: (cat.created_at || '').slice(0, 10) || today,
      ogType: 'product',
      jsonLd,
      body: `<h1>${esc(cat.name)} — ${esc(color)} Maine Coon Kitten</h1>
<p>${esc(description)}</p>
${factsTable(catFacts(cat))}
${cat.story ? `<h2>About ${esc(cat.name)}</h2><p>${esc(cat.story)}</p>` : ''}
${faqHtml(faqs, `Questions about ${cat.name}`)}
<p>To reserve ${esc(cat.name)}, call <a href="tel:${business.phoneE164}">${business.phone}</a> or <a href="/contact">contact us</a>. <a href="/cats">See all available kittens</a>.</p>`,
    });
  }

  // -------------------------------------------------------------------------
  // Write pre-rendered pages
  // -------------------------------------------------------------------------
  console.log(`[prerender] Starting pre-rendering for ${routes.length} pages...`);
  const seoRegex = /<!-- SEO_TAGS_START -->[\s\S]*?<!-- SEO_TAGS_END -->/;
  const rootRegex = /<div id="root"><\/div>/;

  for (const r of routes) {
    const canonicalUrl = `${siteUrl}/${r.path}`;
    const escapedDesc = esc(fitDescription(r.description));
    const escapedTitle = esc(fitTitle(r.title));

    let seoContent = `
    <!-- SEO_TAGS_START -->
    <title>${escapedTitle}</title>
    <meta name="description" content="${escapedDesc}" />
    <meta name="keywords" content="${siteKeywords}" />
    <meta name="robots" content="${r.robots}${r.robots.startsWith('index') ? ',max-snippet:-1,max-image-preview:large' : ''}" />
    <link rel="canonical" href="${canonicalUrl}" />
    <link rel="alternate" type="text/plain" title="LLM-readable summary" href="${siteUrl}/llms.txt" />

    <!-- Open Graph / social preview -->
    <meta property="og:type" content="${r.ogType || 'website'}" />
    <meta property="og:site_name" content="Royal Maine Coon Kittens" />
    <meta property="og:locale" content="en_US" />
    <meta property="og:title" content="${escapedTitle}" />
    <meta property="og:description" content="${escapedDesc}" />
    <meta property="og:url" content="${canonicalUrl}" />
    <meta property="og:image" content="${esc(r.imageUrl)}" />

    <!-- Twitter preview -->
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:title" content="${escapedTitle}" />
    <meta name="twitter:description" content="${escapedDesc}" />
    <meta name="twitter:image" content="${esc(r.imageUrl)}" />
    <!-- SEO_TAGS_END -->`;

    if (r.jsonLd) {
      // Escape "<" so content can never close the script tag early.
      const json = JSON.stringify(r.jsonLd).replace(/</g, '\\u003c');
      seoContent += `
    <script type="application/ld+json" id="page-jsonld">${json}</script>`;
    }

    let outputHtml = template.replace(seoRegex, () => seoContent);
    if (r.body) {
      outputHtml = outputHtml.replace(rootRegex, () => `<div id="root">${shell(r.body)}</div>`);
    }

    if (r.path === '') {
      fs.writeFileSync(templatePath, outputHtml);
    } else {
      const targetDir = path.resolve(buildDir, r.path);
      fs.mkdirSync(targetDir, { recursive: true });
      fs.writeFileSync(path.resolve(targetDir, 'index.html'), outputHtml);
    }
  }

  const tooLong = routes.filter((r) => fitTitle(r.title).length > TITLE_MAX || fitDescription(r.description).length > DESC_MAX + 1);
  if (tooLong.length) console.warn('[prerender] Meta length issues:', tooLong.map((r) => r.path));

  // -------------------------------------------------------------------------
  // sitemap.xml
  // -------------------------------------------------------------------------
  console.log('[prerender] Generating dynamic sitemap.xml...');
  let sitemap = '<?xml version="1.0" encoding="UTF-8"?>\n';
  sitemap += '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n';

  for (const r of routes) {
    if (r.robots && r.robots.includes('noindex')) continue;

    const canonicalUrl = `${siteUrl}/${r.path}`;
    let changefreq = 'weekly';
    let priority = '0.6';

    if (r.path === '') { changefreq = 'daily'; priority = '1.0'; }
    else if (r.path === 'cats') { changefreq = 'daily'; priority = '0.9'; }
    else if (r.path.startsWith('cats/')) { priority = '0.8'; }
    else if (r.path === 'blog') { priority = '0.8'; }
    else if (r.path.startsWith('maine-coon-kittens')) { priority = '0.8'; }
    else if (r.path.startsWith('blog/')) { changefreq = 'monthly'; priority = '0.7'; }
    else if (r.path === 'about' || r.path === 'contact') { priority = '0.7'; }

    const lastmod = r.lastmod ? `<lastmod>${r.lastmod}</lastmod>` : '';
    sitemap += `  <url><loc>${canonicalUrl}</loc>${lastmod}<changefreq>${changefreq}</changefreq><priority>${priority}</priority></url>\n`;
  }
  sitemap += '</urlset>\n';

  fs.writeFileSync(path.resolve(buildDir, 'sitemap.xml'), sitemap);
  fs.writeFileSync(path.resolve(projectRoot, 'public/sitemap.xml'), sitemap);

  // -------------------------------------------------------------------------
  // llms.txt (index) and llms-full.txt (complete knowledge file)
  // See https://llmstxt.org
  // -------------------------------------------------------------------------
  console.log('[prerender] Generating llms.txt and llms-full.txt...');
  const addressLine = `${business.street}, ${business.city}, ${business.region} ${business.postalCode}, United States`;

  const llms = `# ${business.name}

> ${business.summary}

Key facts:
- Business type: Maine Coon cattery (home breeder), not a shelter or rescue
- Address: ${addressLine} (${business.county})
- Phone: ${business.phone}
- Email: ${business.email}
- Hours: ${business.hours}
- Breeding since: ${business.foundedYear}; ${business.placed} kittens placed
- Health: parents DNA tested clear for HCM, SMA and PKDef; kittens vet-checked, vaccinated, dewormed and microchipped with a written health guarantee
- Pickup and delivery: in person in Evansville, IN, or delivery across Indiana, Kentucky and nationwide by pet courier or in-cabin flight nanny
- Website: ${siteUrl}

## Main pages
- [Available Maine Coon kittens](${siteUrl}/cats): every kitten currently listed, with color, age, price and status
- [About the cattery](${siteUrl}/about): history, breeding practices and services
- [Contact and visits](${siteUrl}/contact): phone, email, address and appointment requests
- [Happy families](${siteUrl}/rehomed): families who brought home our kittens

## Areas served
${locations.map((l) => `- [${l.h1}](${siteUrl}/maine-coon-kittens/${l.slug}): ${l.distance}`).join('\n')}

## Guides
${blogPosts.map((p) => `- [${p.title}](${siteUrl}/blog/${p.slug}): ${p.excerpt}`).join('\n')}

## Optional
- [Full knowledge file](${siteUrl}/llms-full.txt): all facts, FAQs, kitten listings and guides in one plain-text file
- [Sitemap](${siteUrl}/sitemap.xml)
`;

  const kittenBlock = (c) => {
    const lines = catFacts(c).map(([k, v]) => `- ${k}: ${v}`).join('\n');
    return `### ${c.name} — ${shortColor(c.color)} Maine Coon\nURL: ${siteUrl}/cats/${c.slug}\n${lines}\n\n${c.short_description || ''}${c.story ? `\n\n${c.story}` : ''}`;
  };

  const llmsFull = `# ${business.name} — complete reference

Last updated: ${today}
Source: ${siteUrl}

> ${business.summary}

## Business facts
- Name: ${business.name}
- Type: Maine Coon cattery (home breeder)
- Address: ${addressLine}
- County: ${business.county}
- Coordinates: ${business.latitude}, ${business.longitude}
- Phone: ${business.phone}
- Email: ${business.email}
- Hours: ${business.hours}
- Founded: ${business.foundedYear}
- Kittens placed: ${business.placed}
- Social: ${business.sameAs.join(', ')}

## Services
${business.services.map((s) => `- ${s}`).join('\n')}

## Included with every kitten
${business.included.map((s) => `- ${s}`).join('\n')}

## Areas served
${business.serviceAreas.map((s) => `- ${s}`).join('\n')}

## Policies (summary of the published terms)
- A kitten is reserved once availability is confirmed in writing and a deposit is received.
- Kittens are held for 48 hours pending payment.
- Deposits are deducted from the final balance and are non-refundable if the buyer changes their mind; if the cattery cannot supply the reserved kitten the buyer may choose another kitten, wait for the next litter or receive a full deposit refund.
- The balance is due before the kitten travels. Delivery is charged separately.
- Buyers should have the kitten examined by their own veterinarian within 72 hours of arrival.

## Frequently asked questions
${siteFaqs.map((f) => `### ${f.question}\n${f.answer}`).join('\n\n')}

## Areas served in detail
${locations.map((l) => `### ${l.h1}\nURL: ${siteUrl}/maine-coon-kittens/${l.slug}\n\n${l.intro}\n\n- Distance: ${l.distance}\n- Pickup and delivery: ${l.getting}\n\n${l.faqs.map((f) => `**${f.question}** ${f.answer}`).join('\n\n')}`).join('\n\n')}

## Kittens currently listed (${activeCats.length})
${activeCats.map(kittenBlock).join('\n\n') || 'No kittens are listed right now.'}

## Guides
${blogPosts.map((p) => `### ${p.title}\nURL: ${siteUrl}/blog/${p.slug}\nPublished: ${p.date}\n\n${stripHtml(p.content || p.excerpt)}`).join('\n\n')}
`;

  for (const dir of [buildDir, path.resolve(projectRoot, 'public')]) {
    fs.writeFileSync(path.resolve(dir, 'llms.txt'), llms);
    fs.writeFileSync(path.resolve(dir, 'llms-full.txt'), llmsFull);
  }

  console.log(`[prerender] Pre-rendering complete! Generated sitemap, llms.txt and ${routes.length} pages.`);
}

run().catch((err) => {
  console.error('[prerender] Fatal error:', err);
  process.exit(1);
});
