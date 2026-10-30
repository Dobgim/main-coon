import Seo from '@/components/Seo';
import { site } from '@/data/site';
import PageHero from '@/components/PageHero';
import DonationForm from '@/components/DonationForm';
import SectionHeading from '@/components/SectionHeading';

const heroImg =
  'https://images.unsplash.com/photo-1592194996308-7b43878e84a6?auto=format&fit=crop&w=1400&q=70';

export default function Donate() {
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
        name: 'Donate',
        item: `${site.url}/donate`,
      },
    ],
  };

  return (
    <>
      <Seo
        title="Support Maine Coon Care & Rescue in Evansville, IN | Donate"
        description="Support veterinary care, nutritious food, and medical treatment for Maine Coons in need at our Evansville, IN cattery (219 S Grand Ave)."
        jsonLd={breadcrumbJsonLd}
      />
      <PageHero
        title="Support Our Maine Coon Care Mission"
        subtitle="Your support helps fund veterinary checkups, vaccination, and loving shelter for Maine Coons across Evansville, IN and the Tri-State area."
        image={heroImg}
      >
        <span className="badge bg-white/15 text-white">
          100% of donations go directly to cat care
        </span>
      </PageHero>

      <section className="container-page py-14 md:py-20">
        <SectionHeading
          eyebrow="Make a difference"
          title="Every gift gives a gentle giant a brighter future"
          description="Choose an amount below and give once or monthly. Prefer a bank transfer? The details are on the right."
        />
        <div className="mt-12">
          <DonationForm />
        </div>
      </section>
    </>
  );
}
