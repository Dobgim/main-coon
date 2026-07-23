import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import Seo from '@/components/Seo';
import PageHero from '@/components/PageHero';
import { blogPosts } from '@/data/blog';
import { site } from '@/data/site';

const heroImg = 'https://images.unsplash.com/photo-1596854407944-bf87f6fdd49e?auto=format&fit=crop&w=1400&q=70';

const cardVariants = {
  hidden: { opacity: 0, y: 28 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.1, duration: 0.5, ease: 'easeOut' },
  }),
};

export default function Blog() {
  const publishedPosts = blogPosts.filter(p => p.published);

  const blogPageSchema = {
    '@context': 'https://schema.org',
    '@type': 'Blog',
    name: `Blog | ${site.name}`,
    description: 'Read the latest articles about Maine Coon cats, grooming tips, and cattery news.',
    url: `${site.url}/blog`,
    publisher: {
      '@type': 'Organization',
      name: site.name,
      logo: {
        '@type': 'ImageObject',
        url: `${site.url}/logo.svg`,
      },
    },
  };

  const breadcrumbJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Home',
        item: site.url,
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: 'Blog',
        item: `${site.url}/blog`,
      },
    ],
  };

  return (
    <>
      <Seo
        title="Blog — Maine Coon Care & Tips"
        description="Read the latest articles about Maine Coon cats, grooming tips, and cattery news."
        jsonLd={[blogPageSchema, breadcrumbJsonLd]}
      />
      <PageHero
        title="Our Blog"
        subtitle="Tips, news, and everything you need to know about Maine Coon cats."
        image={heroImg}
        breadcrumb="Blog"
      />

      <section className="container-page py-14 md:py-20">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-3">
          {publishedPosts.map((post, i) => (
            <motion.article
              key={post.id}
              custom={i}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-60px' }}
              variants={cardVariants}
              className="card group flex h-full flex-col overflow-hidden transition hover:-translate-y-1 hover:shadow-lift"
            >
              <div className="relative aspect-video overflow-hidden">
                <Link to={`/blog/${post.slug}`} aria-label={`Read ${post.title}`}>
                  <img
                    src={post.image}
                    alt=""
                    loading="lazy"
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </Link>
              </div>
              <div className="flex flex-1 flex-col p-6">
                <p className="text-sm font-semibold text-forest-600">
                  {new Date(post.date).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                  })}
                </p>
                <Link to={`/blog/${post.slug}`} className="mt-2 block">
                  <h2 className="text-xl font-extrabold leading-tight text-forest-800 transition group-hover:text-forest">
                    {post.title}
                  </h2>
                </Link>
                <p className="mt-3 line-clamp-3 text-sm leading-relaxed text-ink/80">
                  {post.excerpt}
                </p>
                <div className="mt-auto pt-6">
                  <Link to={`/blog/${post.slug}`} className="btn-ghost px-0 text-sm">
                    Read article &rarr;
                  </Link>
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </section>
    </>
  );
}
