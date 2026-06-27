import { Link } from 'react-router-dom';
import Hero from '@/components/Hero';
import SectionHeading from '@/components/SectionHeading';
import CatGrid from '@/components/CatGrid';
import RehomedCard from '@/components/RehomedCard';
import Reveal from '@/components/Reveal';
import { ArrowRightIcon, HeartIcon, PawIcon, ShieldIcon } from '@/components/Icons';
import { cats } from '@/data/cats';
import { rehomedStories } from '@/data/rehomed';

const services = [
  { icon: <HeartIcon />, title: 'Compassionate Care', text: 'Every cat is vet-checked, vaccinated and loved while they wait.' },
  { icon: <PawIcon />, title: 'Dedicated Rescue', text: 'We step in for Maine Coons in crisis, wherever they are in the UK.' },
  { icon: '🏡', title: 'Forever Homes', text: 'Careful matching means cats and families thrive together for life.' },
  { icon: <ShieldIcon />, title: 'Lifelong Support', text: 'Our team is here for advice long after adoption day.' },
];

export default function Home() {
  const featured = cats.filter((c) => c.status !== 'Adopted').slice(0, 3);
  const topStories = rehomedStories.slice(0, 3);

  return (
    <>
      <Hero />

      {/* Tagline band */}
      <section className="bg-forest text-white">
        <div className="container-page flex flex-col items-center gap-4 py-12 text-center md:flex-row md:justify-between md:text-left">
          <div>
            <h2 className="text-2xl font-extrabold text-white sm:text-3xl">
              Gentle Giants, Lovable Companions
            </h2>
            <p className="mt-2 max-w-2xl text-cream/80">
              Maine Coons are affectionate, sociable and devoted — and when life takes a turn,
              they need a rescue that understands them. That&apos;s where we come in.
            </p>
          </div>
          <Link to="/cats" className="btn-accent shrink-0 text-base">
            Meet our cats <ArrowRightIcon className="h-5 w-5" />
          </Link>
        </div>
      </section>

      {/* Services */}
      <section className="container-page py-16 md:py-24">
        <SectionHeading
          eyebrow="Why we exist"
          title="Giving Maine Coons the second chance they deserve"
          description="From rescue to rehabilitation to a loving forever home, we're with each cat every step of the way."
        />
        <Reveal stagger={0.1} className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {services.map((s) => (
            <div key={s.title} className="card p-7 text-center transition hover:-translate-y-1 hover:shadow-lift">
              <span className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-forest-50 text-2xl text-forest-600">
                {s.icon}
              </span>
              <h3 className="mt-5 text-lg font-extrabold text-forest-800">{s.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted">{s.text}</p>
            </div>
          ))}
        </Reveal>
      </section>

      {/* Featured cats */}
      <section className="bg-sand/50 py-16 md:py-24">
        <div className="container-page">
          <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
            <SectionHeading
              align="left"
              eyebrow="Looking for love"
              title="Cats ready for adoption"
              className="!mx-0"
            />
            <Link to="/cats" className="btn-ghost shrink-0">
              View all cats <ArrowRightIcon className="h-4 w-4" />
            </Link>
          </div>
          <div className="mt-10">
            <CatGrid cats={featured} />
          </div>
        </div>
      </section>

      {/* Testimonials / rehomed */}
      <section className="container-page py-16 md:py-24">
        <SectionHeading
          eyebrow="Happy endings"
          title="Rehoming stories that warm the heart"
          description="Hundreds of Maine Coons have found their forever families through our rescue."
        />
        <Reveal stagger={0.1} className="mt-12 grid gap-6 md:grid-cols-3">
          {topStories.map((s) => (
            <RehomedCard key={s.id} story={s} />
          ))}
        </Reveal>
        <div className="mt-10 text-center">
          <Link to="/rehomed" className="btn-primary">
            Read more stories <ArrowRightIcon className="h-5 w-5" />
          </Link>
        </div>
      </section>

      {/* Donation CTA */}
      <section className="relative overflow-hidden bg-forest-800 py-16 text-center text-white md:py-20">
        <div className="absolute inset-0 bg-paw-pattern opacity-20" aria-hidden />
        <div className="container-page relative">
          <h2 className="mx-auto max-w-2xl text-3xl font-extrabold text-white sm:text-4xl">
            Your kindness keeps gentle giants safe
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-cream/80">
            100% of donations go directly to vet care, food and shelter. Will you help a Maine
            Coon in need today?
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Link to="/donate" className="btn-accent text-base shadow-glow">
              ❤️ Donate Now
            </Link>
            <Link to="/help" className="btn-outline-white text-base">
              Other ways to help
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
