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
    const postRegex = /slug:\s*['"`]([^'"`]+)['"`][\s\S]*?title:\s*['"`]([^'"`]+)['"`][\s\S]*?date:\s*['"`]([^'"`]+)['"`][\s\S]*?author:\s*['"`]([^'"`]+)['"`][\s\S]*?excerpt:\s*['"`]([^'"`]+)['"`][\s\S]*?image:\s*['"`]([^'"`]+)['"`]/g;
    let match;
    while ((match = postRegex.exec(text)) !== null) {
      posts.push({
        slug: match[1],
        title: match[2],
        date: match[3],
        author: match[4],
        excerpt: match[5],
        image: match[6]
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
  const blogPosts = parseBlogPosts();

  const siteUrl = 'https://royalmainecoonkiten.com';
  const siteKeywords = 'Maine Coon kittens for sale Evansville IN, Maine Coon breeders Evansville Indiana, Maine Coon kittens 219 S Grand Ave Evansville, Maine Coon kittens near me, Maine Coon kittens Indiana, Maine Coon kittens Kentucky, Maine Coon kittens Newburgh IN, Maine Coon kittens Henderson KY, Maine Coon kittens Owensboro KY, European Maine Coon kittens Evansville, Maine Coon adoption Evansville IN, Tri-State Maine Coon breeder, registered Maine Coon cattery Indiana';
  // Social platforms (WhatsApp, Facebook, X, LinkedIn) do NOT render SVG in link
  // previews, so an .svg logo here produces a blank share card. Use the first real
  // published kitten photo — a raster image of actual stock — and only fall back to
  // the logo if the cattery has no photos at all.
  const firstCatPhoto = catsList.find((c) => c.images && c.images[0])?.images[0];
  const defaultImage = firstCatPhoto || `${siteUrl}/logo.svg`;

  // Define metadata for static routes
  const routes = [
    {
      path: '',
      title: 'Maine Coon Kittens for Sale in Evansville, IN | 219 S Grand Ave | Royal Maine Coon Kittens',
      description: 'Purebred, home-raised Maine Coon kittens for sale in Evansville, Indiana. Located at 219 S Grand Ave, Evansville, IN 47713. DNA health-tested, vet-checked gentle giants with in-person pickup and safe delivery to Newburgh, Henderson KY, Owensboro KY, and nationwide.',
      keywords: siteKeywords,
      robots: 'index,follow',
      imageUrl: defaultImage,
      jsonLd: {
        '@context': 'https://schema.org',
        '@type': ['PetStore', 'AnimalShelter'],
        'name': 'Royal Maine Coon Kittens',
        'description': 'Purebred, home-raised Maine Coon kittens for sale at 219 S Grand Ave, Evansville, IN 47713. DNA health-tested gentle giants with in-person pickup and safe delivery to Newburgh, Henderson KY, Owensboro KY, and nationwide.',
        'url': siteUrl,
        'telephone': '(317) 225-7139',
        'email': 'royalmainecoonkitten159@gmail.com',
        'image': 'https://images.unsplash.com/photo-1606214174585-fe31582dc6ee?auto=format&fit=crop&w=1200&q=70',
        'priceRange': '$$$',
        'address': {
          '@type': 'PostalAddress',
          'streetAddress': '219 S Grand Ave',
          'addressLocality': 'Evansville',
          'addressRegion': 'IN',
          'postalCode': '47713',
          'addressCountry': 'US'
        },
        'geo': {
          '@type': 'GeoCoordinates',
          'latitude': 37.9698,
          'longitude': -87.5615
        },
        'openingHoursSpecification': [
          {
            '@type': 'OpeningHoursSpecification',
            'dayOfWeek': ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
            'opens': '09:00',
            'closes': '18:00'
          }
        ],
        'sameAs': [
          'https://www.facebook.com/share/1BbohnNhPm/?mibextid=wwXIfr',
          'https://www.tiktok.com/@royalcoonkittens?_r=1&_t=ZT-97aIEINMEaT'
        ],
        'areaServed': [
          { '@type': 'PostalAddress', 'postalCode': '47713', 'addressLocality': 'Evansville', 'addressRegion': 'IN' },
          { '@type': 'City', 'name': 'Evansville' },
          { '@type': 'City', 'name': 'Newburgh' },
          { '@type': 'City', 'name': 'Henderson' },
          { '@type': 'City', 'name': 'Owensboro' },
          { '@type': 'City', 'name': 'Jasper' },
          { '@type': 'AdministrativeArea', 'name': 'Vanderburgh County' },
          { '@type': 'State', 'name': 'Indiana' },
          { '@type': 'State', 'name': 'Kentucky' },
          { '@type': 'Country', 'name': 'United States' }
        ]
      }
    },
    {
      path: 'about',
      title: 'About Us — Maine Coon Breeder in Evansville, IN | 219 S Grand Ave',
      description: 'Learn about our family cattery at 219 S Grand Ave, Evansville, IN 47713. Home-raised, DNA health-tested Maine Coon kittens, local pickup, and Tri-State pet delivery.',
      keywords: siteKeywords,
      robots: 'index,follow',
      imageUrl: defaultImage,
      jsonLd: [
        {
          '@context': 'https://schema.org',
          '@type': 'AboutPage',
          'name': 'About Us — Royal Maine Coon Kittens',
          'description': 'Learn about our family cattery at 219 S Grand Ave, Evansville, IN 47713. Home-raised, DNA health-tested Maine Coon kittens, local pickup, and Tri-State pet delivery.',
          'url': `${siteUrl}/about`,
          'mainEntity': {
            '@type': ['PetStore', 'AnimalShelter'],
            'name': 'Royal Maine Coon Kittens',
            'url': siteUrl,
            'image': 'https://images.unsplash.com/photo-1606214174585-fe31582dc6ee?auto=format&fit=crop&w=1200&q=70',
            'address': {
              '@type': 'PostalAddress',
              'streetAddress': '219 S Grand Ave',
              'addressLocality': 'Evansville',
              'addressRegion': 'IN',
              'postalCode': '47713',
              'addressCountry': 'US'
            }
          }
        },
        {
          '@context': 'https://schema.org',
          '@type': 'BreadcrumbList',
          'itemListElement': [
            {
              '@type': 'ListItem',
              'position': 1,
              'name': 'Home',
              'item': siteUrl
            },
            {
              '@type': 'ListItem',
              'position': 2,
              'name': 'About Us',
              'item': `${siteUrl}/about`
            }
          ]
        }
      ]
    },
    {
      path: 'cats',
      title: 'Available Maine Coon Kittens for Sale in Evansville, IN | 219 S Grand Ave',
      description: 'Browse purebred Maine Coon kittens for sale in Evansville, Indiana. Raised at 219 S Grand Ave, Evansville, IN 47713. Vet-checked, vaccinated, DNA health-tested gentle giants. In-person pickup & safe delivery.',
      keywords: siteKeywords,
      robots: 'index,follow',
      imageUrl: defaultImage,
      jsonLd: [
        {
          '@context': 'https://schema.org',
          '@type': 'ItemList',
          'itemListElement': catsList.map((cat, index) => ({
            '@type': 'ListItem',
            'position': index + 1,
            'url': `${siteUrl}/cats/${cat.slug}`,
            'name': cat.name,
            'image': cat.images[0] || defaultImage
          }))
        },
        {
          '@context': 'https://schema.org',
          '@type': 'BreadcrumbList',
          'itemListElement': [
            {
              '@type': 'ListItem',
              'position': 1,
              'name': 'Home',
              'item': siteUrl
            },
            {
              '@type': 'ListItem',
              'position': 2,
              'name': 'Available Kittens',
              'item': `${siteUrl}/cats`
            }
          ]
        }
      ]
    },
    {
      path: 'rehomed',
      title: 'Happy Tails — Maine Coon Adoptions in Evansville, IN & Tri-State',
      description: "Real stories and reviews from families who adopted Maine Coon kittens from our cattery at 219 S Grand Ave, Evansville, IN 47713. Serving Evansville, Newburgh, Henderson KY, Owensboro KY, and beyond.",
      keywords: siteKeywords,
      robots: 'index,follow',
      imageUrl: defaultImage,
      jsonLd: {
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        'itemListElement': [
          {
            '@type': 'ListItem',
            'position': 1,
            'name': 'Home',
            'item': siteUrl
          },
          {
            '@type': 'ListItem',
            'position': 2,
            'name': 'Happy Families',
            'item': `${siteUrl}/rehomed`
          }
        ]
      }
    },
    {
      path: 'contact',
      title: 'Contact Us — Maine Coon Cattery in Evansville, IN | 219 S Grand Ave',
      description: 'Contact Royal Maine Coon Kittens at 219 S Grand Ave, Evansville, IN 47713. Inquire about available kittens, schedule an in-person cattery appointment, or arrange Tri-State delivery.',
      keywords: siteKeywords,
      robots: 'index,follow',
      imageUrl: defaultImage,
      jsonLd: [
        {
          '@context': 'https://schema.org',
          '@type': 'ContactPage',
          'name': 'Contact Us — Royal Maine Coon Kittens',
          'description': 'Contact Royal Maine Coon Kittens at 219 S Grand Ave, Evansville, IN 47713.',
          'url': `${siteUrl}/contact`,
          'mainEntity': {
            '@type': ['PetStore', 'AnimalShelter'],
            'name': 'Royal Maine Coon Kittens',
            'telephone': '(317) 225-7139',
            'email': 'royalmainecoonkitten159@gmail.com',
            'address': {
              '@type': 'PostalAddress',
              'streetAddress': '219 S Grand Ave',
              'addressLocality': 'Evansville',
              'addressRegion': 'IN',
              'postalCode': '47713',
              'addressCountry': 'US'
            }
          }
        },
        {
          '@context': 'https://schema.org',
          '@type': 'BreadcrumbList',
          'itemListElement': [
            {
              '@type': 'ListItem',
              'position': 1,
              'name': 'Home',
              'item': siteUrl
            },
            {
              '@type': 'ListItem',
              'position': 2,
              'name': 'Contact',
              'item': `${siteUrl}/contact`
            }
          ]
        }
      ]
    },
    {
      path: 'help',
      title: 'How to Help | Royal Maine Coon Kittens',
      description: 'Get involved and support our mission. Learn about fostering, volunteering, and other ways to help.',
      keywords: siteKeywords,
      robots: 'index,follow',
      imageUrl: defaultImage,
      jsonLd: {
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        'itemListElement': [
          {
            '@type': 'ListItem',
            'position': 1,
            'name': 'Home',
            'item': siteUrl
          },
          {
            '@type': 'ListItem',
            'position': 2,
            'name': 'How to Help',
            'item': `${siteUrl}/help`
          }
        ]
      }
    },
    {
      path: 'donate',
      title: 'Donate | Royal Maine Coon Kittens',
      description: 'Support our cattery or help Maine Coon kittens in need. Make a donation, view our Amazon wishlist, or read our payment details.',
      keywords: siteKeywords,
      robots: 'index,follow',
      imageUrl: defaultImage,
      jsonLd: {
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        'itemListElement': [
          {
            '@type': 'ListItem',
            'position': 1,
            'name': 'Home',
            'item': siteUrl
          },
          {
            '@type': 'ListItem',
            'position': 2,
            'name': 'Donate',
            'item': `${siteUrl}/donate`
          }
        ]
      }
    },
    {
      path: 'privacy',
      title: 'Privacy Policy | Royal Maine Coon Kittens',
      description: 'Privacy Policy for Royal Maine Coon Kittens cattery.',
      keywords: siteKeywords,
      robots: 'noindex,nofollow',
      imageUrl: defaultImage,
      jsonLd: {
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        'itemListElement': [
          {
            '@type': 'ListItem',
            'position': 1,
            'name': 'Home',
            'item': siteUrl
          },
          {
            '@type': 'ListItem',
            'position': 2,
            'name': 'Privacy Policy',
            'item': `${siteUrl}/privacy`
          }
        ]
      }
    },
    {
      path: 'terms',
      title: 'Terms & Conditions | Royal Maine Coon Kittens',
      description: 'Terms and conditions for adopting or purchasing Maine Coon kittens.',
      keywords: siteKeywords,
      robots: 'noindex,nofollow',
      imageUrl: defaultImage,
      jsonLd: {
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        'itemListElement': [
          {
            '@type': 'ListItem',
            'position': 1,
            'name': 'Home',
            'item': siteUrl
          },
          {
            '@type': 'ListItem',
            'position': 2,
            'name': 'Terms & Conditions',
            'item': `${siteUrl}/terms`
          }
        ]
      }
    },
    {
      path: 'blog',
      title: 'Maine Coon Blog & Guides — Evansville, IN Cattery Advice | Royal Maine Coon Kittens',
      description: 'Expert advice on Maine Coon growth, grooming, ethical breeder selection, and kitten care in Evansville, IN, Henderson KY, Owensboro KY, and the Tri-State area.',
      keywords: `${siteKeywords}, blog, cat care`,
      robots: 'index,follow',
      imageUrl: defaultImage,
      jsonLd: {
        '@context': 'https://schema.org',
        '@type': 'Blog',
        'name': 'Maine Coon Blog & Guides | Royal Maine Coon Kittens',
        'description': 'Expert advice on Maine Coon growth, grooming, ethical breeder selection, and kitten care in Evansville, IN, Henderson KY, Owensboro KY, and the Tri-State area.',
        'url': `${siteUrl}/blog`,
        'publisher': {
          '@type': 'Organization',
          'name': 'Royal Maine Coon Kittens',
          'logo': {
            '@type': 'ImageObject',
            'url': `${siteUrl}/logo.svg`
          }
        }
      }
    }
  ];

  for (const post of blogPosts) {
    routes.push({
      path: `blog/${post.slug}`,
      title: `${post.title} | Royal Maine Coon Kittens`,
      description: post.excerpt,
      keywords: `${siteKeywords}, ${post.title}`,
      robots: 'index,follow',
      imageUrl: post.image,
      jsonLd: {
        '@context': 'https://schema.org',
        '@type': 'BlogPosting',
        'mainEntityOfPage': {
          '@type': 'WebPage',
          '@id': `${siteUrl}/blog/${post.slug}`
        },
        'headline': post.title,
        'description': post.excerpt,
        'image': post.image,
        'author': {
          '@type': 'Organization',
          'name': post.author
        },
        'publisher': {
          '@type': 'Organization',
          'name': 'Royal Maine Coon Kittens',
          'logo': {
            '@type': 'ImageObject',
            'url': `${siteUrl}/logo.svg`
          }
        },
        'datePublished': post.date
      }
    });
  }

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
      'sku': cat.slug,
      'brand': {
        '@type': 'Brand',
        'name': 'Royal Maine Coon Kittens'
      },
      'offers': {
        '@type': 'Offer',
        'price': cat.adoption_fee,
        'priceCurrency': 'USD',
        'itemCondition': 'https://schema.org/NewCondition',
        'availability': cat.status === 'Available' ? 'https://schema.org/InStock' : 'https://schema.org/OutOfStock',
        'priceValidUntil': '2027-12-31'
      }
    };

    const breadcrumbSchema = {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      'itemListElement': [
        {
          '@type': 'ListItem',
          'position': 1,
          'name': 'Home',
          'item': siteUrl
        },
        {
          '@type': 'ListItem',
          'position': 2,
          'name': 'Available Kittens',
          'item': `${siteUrl}/cats`
        },
        {
          '@type': 'ListItem',
          'position': 3,
          'name': cat.name,
          'item': `${siteUrl}/cats/${cat.slug}`
        }
      ]
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

    const jsonLd = faqSchema ? [productSchema, breadcrumbSchema, faqSchema] : [productSchema, breadcrumbSchema];

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
    } else if (r.path === 'blog') {
      changefreq = 'weekly';
      priority = '0.8';
    } else if (r.path.startsWith('blog/')) {
      changefreq = 'monthly';
      priority = '0.7';
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
