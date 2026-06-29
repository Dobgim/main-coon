import { Link } from 'react-router-dom';
import Seo from '@/components/Seo';
import PageHero from '@/components/PageHero';
import HelpCard from '@/components/HelpCard';
import Reveal from '@/components/Reveal';
import SectionHeading from '@/components/SectionHeading';
import { helpWays } from '@/data/help';

const heroImg =
  'https://images.unsplash.com/photo-1543852786-1cf6624b9987?auto=format&fit=crop&w=1400&q=70';

export default function Help() {
  return (
    <>
      <Seo title="How to Help" />
      <PageHero
        title="How You Can Help"
        subtitle="There are so many ways to make a difference for Maine Coons in need — find the one that's right for you."
        image={heroImg}
        breadcrumb="How to Help"
      />

      <section className="container-page py-14 md:py-20">
        <Reveal stagger={0.08} className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {helpWays.map((way) => (
            <HelpCard key={way.id} way={way} />
          ))}
        </Reveal>
      </section>

      {/* Impact band */}
      <section className="bg-sand/60 py-14 md:py-20">
        <div className="container-page grid items-center gap-10 lg:grid-cols-2">
          <div>
            <SectionHeading
              align="left"
              eyebrow="Your impact"
              title="Where your support goes"
              className="!mx-0"
            />
            <ul className="mt-6 space-y-4">
              {[
                ['$10', 'feeds a rescued Maine Coon for two weeks'],
                ['$25', 'covers a vaccination and health check'],
                ['$50', 'pays for microchipping and neutering'],
                ['$100', 'funds emergency vet care for a cat in crisis'],
              ].map(([amt, desc]) => (
                <li key={amt} className="flex items-center gap-4 rounded-2xl bg-white p-4 shadow-soft">
                  <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-ember-100 text-lg font-extrabold text-ember-700">
                    {amt}
                  </span>
                  <span className="text-sm text-ink/85">{desc}</span>
                </li>
              ))}
            </ul>
            <Link to="/donate" className="btn-accent mt-8">
              Donate Now
            </Link>
          </div>
          <div className="overflow-hidden rounded-[2.5rem] shadow-lift ring-1 ring-black/5">
            <img
              src="https://images.unsplash.com/photo-1561948955-570b270e7c36?auto=format&fit=crop&w=900&q=70"
              alt="A content Maine Coon being cared for"
              loading="lazy"
              className="h-full w-full object-cover"
            />
          </div>
        </div>
      </section>
    </>
  );
}
