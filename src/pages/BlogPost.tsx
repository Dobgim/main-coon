import { Link, useParams, Navigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import Seo from '@/components/Seo';
import PageHero from '@/components/PageHero';
import { blogPosts } from '@/data/blog';
import { site } from '@/data/site';

export default function BlogPost() {
  const { slug } = useParams<{ slug: string }>();
  const post = blogPosts.find((p) => p.slug === slug);

  if (!post) {
    return <Navigate to="/404" replace />;
  }

  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `${site.url}/blog/${post.slug}`,
    },
    headline: post.title,
    description: post.excerpt,
    image: post.image,
    author: {
      '@type': 'Organization',
      name: post.author,
    },
    publisher: {
      '@type': 'Organization',
      name: site.name,
      logo: {
        '@type': 'ImageObject',
        url: `${site.url}/logo.svg`,
      },
    },
    datePublished: post.date,
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
      {
        '@type': 'ListItem',
        position: 3,
        name: post.title,
        item: `${site.url}/blog/${post.slug}`,
      },
    ],
  };

  return (
    <>
      <Seo
        title={post.title}
        description={post.excerpt}
        image={post.image}
        jsonLd={[articleSchema, breadcrumbJsonLd]}
      />
      <PageHero
        title={post.title}
        image={post.image}
        breadcrumb="Article"
      >
        <p className="mt-4 text-cream/80">
          Published on {new Date(post.date).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
          })}
        </p>
      </PageHero>

      <section className="container-page py-14 md:py-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="prose prose-forest mx-auto lg:prose-lg"
          dangerouslySetInnerHTML={{ __html: post.content }}
        />
        <div className="mt-16 text-center">
          <Link to="/blog" className="btn-ghost">
            &larr; Back to all posts
          </Link>
        </div>
      </section>
    </>
  );
}
