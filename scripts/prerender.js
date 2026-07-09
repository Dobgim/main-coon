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
      status: r.status
    }));
  } catch (err) {
    console.warn(`[prerender] Failed to fetch live cats from Supabase (${err.message}). Falling back to local seed data.`);
    return parseSeedCats();
  }
}

async function run() {
  const env = loadEnv();
  const buildDir = path.resolve(projectRoot, 'dist');
  const templatePath = path.resolve(buildDir, 'index.html');

  if (!fs.existsSync(templatePath)) {
    console.error(`[prerender] Error: dist/index.html not found! Run "npm run build" first.`);
    process.exit(1);
  }

  const template = fs.readFileSync(templatePath, 'utf8');

  // Parse cattery data
  const catsList = await getCats(env);
  const faqsMap = parseCatFaqs();

  const siteUrl = 'https://royalmainecoonkiten.com';
  const siteKeywords = 'Maine Coon kittens, Maine Coon kittens for sale, Maine Coon kittens Indiana, Maine Coon kittens Evansville, Maine Coon breeder, buy Maine Coon kitten, reserve Maine Coon kitten';
  const defaultImage = `${siteUrl}/logo.svg`;

  // Define metadata for static routes
  const routes = [
    {
      path: '',
      title: 'Maine Coon Kittens for Sale in Evansville, Indiana | Royal Maine Coon Kittens',
      description: 'Healthy, home-raised Maine Coon kittens for sale in Evansville, Indiana. Vet-checked, vaccinated gentle giants — reserve your Maine Coon kitten today, with nationwide delivery available.',
      keywords: siteKeywords,
      robots: 'index,follow',
      imageUrl: defaultImage,
      jsonLd: {
        '@context': 'https://schema.org',
        '@type': 'PetStore',
        'name': 'Royal Maine Coon Kittens',
        'description': 'Healthy, home-raised Maine Coon kittens for sale in Evansville, Indiana. Vet-checked, vaccinated gentle giants.',
        'url': siteUrl,
        'telephone': '(317) 225-7139',
        'email': 'royalmainecoonkitten159@gmail.com',
        'image': 'https://images.unsplash.com/photo-1606214174585-fe31582dc6ee?auto=format&fit=crop&w=1200&q=70',
        'priceRange': '$$$'
      }
    },
    {
      path: 'about',
      title: 'About Us — Maine Coon Breeder in Indiana | Royal Maine Coon Kittens',
      description: 'Learn about our family cattery, how we home-raise healthy, socialized Maine Coon kittens in Evansville, Indiana, and our written health guarantee.',
      keywords: siteKeywords,
      robots: 'index,follow',
      imageUrl: defaultImage
    },
    {
      path: 'cats',
      title: 'Available Maine Coon Kittens for Sale in Indiana | Royal Maine Coon Kittens',
      description: 'Browse available Maine Coon kittens — vet-checked, vaccinated and home-raised in Indiana. Reserve your gentle giant today, with nationwide delivery.',
      keywords: siteKeywords,
      robots: 'index,follow',
      imageUrl: defaultImage
    },
    {
      path: 'rehomed',
      title: 'Happy Tails — Rehomed Maine Coons | Royal Maine Coon Kittens',
      description: "Real families and their Maine Coons. See the happy endings from kittens we've placed in loving homes.",
      keywords: siteKeywords,
      robots: 'index,follow',
      imageUrl: defaultImage
    },
    {
      path: 'contact',
      title: 'Contact Us — Royal Maine Coon Kittens Indiana',
      description: 'Get in touch with Royal Maine Coon Kittens in Evansville, Indiana. Have questions about reserving a kitten, prices, or shipping options? Contact us today.',
      keywords: siteKeywords,
      robots: 'index,follow',
      imageUrl: defaultImage
    },
    {
      path: 'help',
      title: 'How to Help | Royal Maine Coon Kittens',
      description: 'Get involved and support our mission. Learn about fostering, volunteering, and other ways to help.',
      keywords: siteKeywords,
      robots: 'index,follow',
      imageUrl: defaultImage
    },
    {
      path: 'donate',
      title: 'Donate | Royal Maine Coon Kittens',
      description: 'Support our cattery or help Maine Coon kittens in need. Make a donation, view our Amazon wishlist, or read our payment details.',
      keywords: siteKeywords,
      robots: 'index,follow',
      imageUrl: defaultImage
    },
    {
      path: 'privacy',
      title: 'Privacy Policy | Royal Maine Coon Kittens',
      description: 'Privacy Policy for Royal Maine Coon Kittens cattery.',
      keywords: siteKeywords,
      robots: 'noindex,nofollow',
      imageUrl: defaultImage
    },
    {
      path: 'terms',
      title: 'Terms & Conditions | Royal Maine Coon Kittens',
      description: 'Terms and conditions for adopting or purchasing Maine Coon kittens.',
      keywords: siteKeywords,
      robots: 'noindex,nofollow',
      imageUrl: defaultImage
    }
  ];

  // Add dynamic cat pages to routes
  for (const cat of catsList) {
    const title = `${cat.name} — ${cat.color} Maine Coon Kitten`;
    const description = cat.short_description || `Meet ${cat.name}, a healthy, vet-checked ${cat.color} Maine Coon kitten available for adoption.`;
    const imageUrl = cat.images[0] || defaultImage;

    const productSchema = {
      '@context': 'https://schema.org',
      '@type': 'Product',
      'name': `${cat.name} — ${cat.color} Maine Coon Cat`,
      'description': cat.short_description || cat.story,
      'image': cat.images,
      'category': 'Maine Coon Kitten',
      'offers': {
        '@type': 'Offer',
        'price': cat.adoption_fee,
        'priceCurrency': 'USD',
        'itemCondition': 'https://schema.org/NewCondition',
        'availability': cat.status === 'Available' ? 'https://schema.org/InStock' : 'https://schema.org/OutOfStock',
        'priceValidUntil': '2027-12-31'
      }
    };

    const faqs = faqsMap[cat.slug] || [];
    const faqSchema = faqs.length > 0 ? {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      'mainEntity': faqs.map(f => ({
        '@type': 'Question',
        'name': f.question,
        'acceptedAnswer': {
          '@type': 'Answer',
          'text': f.answer
        }
      }))
    } : null;

    const jsonLd = faqSchema ? [productSchema, faqSchema] : productSchema;

    routes.push({
      path: `cats/${cat.slug}`,
      title,
      description,
      keywords: `${siteKeywords}, ${cat.name}, ${cat.color} Maine Coon`,
      robots: 'index,follow',
      imageUrl,
      jsonLd
    });
  }

  // Pre-render each page
  console.log(`[prerender] Starting pre-rendering for ${routes.length} pages...`);
  const seoRegex = /<!-- SEO_TAGS_START -->[\s\S]*?<!-- SEO_TAGS_END -->/;

  for (const r of routes) {
    const canonicalUrl = `${siteUrl}/${r.path}`;
    const escapedDesc = r.description.replace(/"/g, '&quot;');

    let seoContent = `
    <!-- SEO_TAGS_START -->
    <title>${r.title}</title>
    <meta name="description" content="${escapedDesc}" />
    <meta name="keywords" content="${r.keywords}" />
    <meta name="robots" content="${r.robots}" />
    <link rel="canonical" href="${canonicalUrl}" />

    <!-- Open Graph / social preview -->
    <meta property="og:type" content="website" />
    <meta property="og:site_name" content="Royal Maine Coon Kittens" />
    <meta property="og:title" content="${r.title}" />
    <meta property="og:description" content="${escapedDesc}" />
    <meta property="og:url" content="${canonicalUrl}" />
    <meta property="og:image" content="${r.imageUrl}" />

    <!-- Twitter preview -->
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:title" content="${r.title}" />
    <meta name="twitter:description" content="${escapedDesc}" />
    <meta name="twitter:image" content="${r.imageUrl}" />
    <!-- SEO_TAGS_END -->`;

    if (r.jsonLd) {
      seoContent += `
    <script type="application/ld+json" id="page-jsonld">${JSON.stringify(r.jsonLd)}</script>`;
    }

    const outputHtml = template.replace(seoRegex, seoContent);

    if (r.path === '') {
      // Root index.html is updated directly in the dist folder
      fs.writeFileSync(templatePath, outputHtml);
    } else {
      // Sub-pages are written in their corresponding subdirectories
      const targetDir = path.resolve(buildDir, r.path);
      if (!fs.existsSync(targetDir)) {
        fs.mkdirSync(targetDir, { recursive: true });
      }
      fs.writeFileSync(path.resolve(targetDir, 'index.html'), outputHtml);
    }
  }

  // Generate dynamic sitemap.xml
  console.log('[prerender] Generating dynamic sitemap.xml...');
  let sitemap = '<?xml version="1.0" encoding="UTF-8"?>\n';
  sitemap += '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n';

  for (const r of routes) {
    const isNoIndex = r.robots && r.robots.includes('noindex');
    if (isNoIndex) continue;

    const canonicalUrl = `${siteUrl}/${r.path}`;
    let changefreq = 'weekly';
    let priority = '0.6';

    if (r.path === '') {
      changefreq = 'daily';
      priority = '1.0';
    } else if (r.path === 'cats') {
      changefreq = 'daily';
      priority = '0.9';
    } else if (r.path.startsWith('cats/')) {
      changefreq = 'weekly';
      priority = '0.8';
    } else if (r.path === 'about' || r.path === 'contact') {
      priority = '0.7';
    }

    sitemap += `  <url><loc>${canonicalUrl}</loc><changefreq>${changefreq}</changefreq><priority>${priority}</priority></url>\n`;
  }
  sitemap += '</urlset>\n';

  fs.writeFileSync(path.resolve(buildDir, 'sitemap.xml'), sitemap);
  // Also write sitemap to public folder so it's persisted in the repository src
  fs.writeFileSync(path.resolve(projectRoot, 'public/sitemap.xml'), sitemap);

  console.log(`[prerender] Pre-rendering complete! Generated sitemap and pre-rendered ${routes.length} pages.`);
}

run().catch(err => {
  console.error('[prerender] Fatal error:', err);
  process.exit(1);
});
