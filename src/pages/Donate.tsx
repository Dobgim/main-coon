import Seo from '@/components/Seo';
import PageHero from '@/components/PageHero';
import DonationForm from '@/components/DonationForm';
import SectionHeading from '@/components/SectionHeading';

const heroImg =
  'https://images.unsplash.com/photo-1592194996308-7b43878e84a6?auto=format&fit=crop&w=1400&q=70';

export default function Donate() {
  return (
    <>
      <Seo title="Donate" />
      <PageHero
        title="Donate to Help Maine Coons"
        subtitle="Your donations support vet care, nutritious food and safe shelter for every Maine Coon in our care."
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
