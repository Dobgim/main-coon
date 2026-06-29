import Seo from '@/components/Seo';
import PageHero from '@/components/PageHero';
import { site } from '@/data/site';

const sections: Array<{ h: string; p: string[] }> = [
  {
    h: 'About these terms',
    p: [
      `These terms apply to your use of the ${site.name} website and to adoptions arranged through us. This is a demonstration template — replace it with your charity's reviewed terms before going live.`,
    ],
  },
  {
    h: 'Adoption process',
    p: [
      'All adoptions are subject to an application, a friendly home visit and a reference check. We reserve the right to decline an application where we believe a placement would not be in the cat\'s best interests.',
      'An adoption fee contributes towards the veterinary and care costs incurred while the cat was in our charge.',
    ],
  },
  {
    h: 'Adopter responsibilities',
    p: [
      'By adopting, you agree to provide appropriate food, shelter, enrichment and veterinary care for the lifetime of the cat, and to contact us first should you ever be unable to keep them.',
    ],
  },
  {
    h: 'Donations',
    p: [
      'Donations are voluntary and, unless otherwise agreed, non-refundable. We aim to direct donations towards the direct care of cats in our rescue.',
      'Payment details shown on this template are placeholders and must be replaced with verified charity details before accepting real donations.',
    ],
  },
  {
    h: 'Liability',
    p: [
      'While we share known health and behaviour information in good faith, cats are living animals and we cannot guarantee future health or temperament. Adopters accept cats on this understanding.',
    ],
  },
  {
    h: 'Contact',
    p: [`Questions about these terms? Email us at ${site.email}.`],
  },
];

export default function Terms() {
  return (
    <>
      <Seo title="Terms & Conditions" noindex />
      <PageHero title="Terms & Conditions" breadcrumb="Terms" subtitle="The terms covering adoptions and use of this website." />
      <article className="container-page max-w-3xl py-14 md:py-20">
        <p className="text-sm text-muted">Last updated: {new Date().getFullYear()}</p>
        {sections.map((s) => (
          <section key={s.h} className="mt-8">
            <h2 className="text-2xl font-extrabold text-forest-800">{s.h}</h2>
            {s.p.map((para, i) => (
              <p key={i} className="mt-3 leading-relaxed text-ink/85">
                {para}
              </p>
            ))}
          </section>
        ))}
      </article>
    </>
  );
}
