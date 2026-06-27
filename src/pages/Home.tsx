import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import Hero from '@/components/Hero';
import CatSlideshow from '@/components/CatSlideshow';
import SectionHeading from '@/components/SectionHeading';
import CatGrid from '@/components/CatGrid';
import RehomedCard from '@/components/RehomedCard';
import Reveal from '@/components/Reveal';
import {
  ArrowRightIcon,
  HeartIcon,
  PawIcon,
  ShieldIcon,
  HomeIcon,
  SearchIcon,
  ClipboardIcon,
  CheckIcon,
  UsersIcon,
} from '@/components/Icons';
import { cats } from '@/data/cats';
import { rehomedStories } from '@/data/rehomed';

const services = [
  {
    icon: <HeartIcon className="h-7 w-7" />,
    title: 'Compassionate Care',
    text: 'Every cat is vet-checked, vaccinated and loved while they wait for their forever home.',
  },
  {
    icon: <PawIcon className="h-7 w-7" />,
    title: 'Dedicated Rescue',
    text: 'We step in for Maine Coons in crisis, wherever they are in the UK.',
  },
  {
    icon: <HomeIcon className="h-7 w-7" />,
    title: 'Forever Homes',
    text: 'Careful matching means cats and families thrive together for life.',
  },
  {
    icon: <ShieldIcon className="h-7 w-7" />,
    title: 'Lifelong Support',
    text: 'Our team is here for advice and guidance long after adoption day.',
  },
];

const adoptionSteps = [
  {
    step: '01',
    icon: <SearchIcon className="h-6 w-6" />,
    title: 'Browse our cats',
    text: 'Explore our available Maine Coons. Filter by age, location and lifestyle to find your perfect match.',
  },
  {
    step: '02',
    icon: <ClipboardIcon className="h-6 w-6" />,
    title: 'Submit an application',
    text: 'Fill in our simple adoption form telling us about your home, lifestyle and experience with cats.',
  },
  {
    step: '03',
    icon: <HomeIcon className="h-6 w-6" />,
    title: 'Home check',
    text: 'A friendly volunteer visits to ensure your home is a safe and loving environment for your new companion.',
  },
  {
    step: '04',
    icon: <HeartIcon className="h-6 w-6" />,
    title: 'Welcome home',
    text: 'Collect your new companion and start your journey together. We are here every step of the way.',
  },
];

const cardVariants = {
  hidden: { opacity: 0, y: 32 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.1, duration: 0.6, ease: 'easeOut' },
  }),
};

export default function Home() {
  const featured = cats.filter((c) => c.status !== 'Adopted').slice(0, 3);
  const topStories = rehomedStories.slice(0, 3);

  return (
    <>
      <Hero />

      {/* Tagline band */}
      <section className="bg-forest text-white">
        <div className="container-page flex flex-col items-center gap-4 py-10 text-center md:flex-row md:justify-between md:text-left">
          <div>
            <h2 className="text-2xl font-extrabold text-white sm:text-3xl">
              Gentle Giants, Lovable Companions
            </h2>
            <p className="mt-2 max-w-2xl text-cream/80">
              Maine Coons are affectionate, sociable and devoted — and when life takes a turn,
              they need a rescue that truly understands them. That&apos;s where we come in.
            </p>
          </div>
          <Link to="/cats" className="btn-accent shrink-0 text-base">
            Meet our cats <ArrowRightIcon className="h-5 w-5" />
          </Link>
        </div>
      </section>

      {/* Cat photo slideshow */}
      <CatSlideshow />

      {/* Why we exist — service cards */}
      <section className="container-page py-16 md:py-24">
        <SectionHeading
          eyebrow="Why we exist"
          title="Giving Maine Coons the second chance they deserve"
          description="From rescue to rehabilitation to a loving forever home, we are with each cat every step of the way."
        />
        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {services.map((s, i) => (
            <motion.div
              key={s.title}
              custom={i}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-60px' }}
              variants={cardVariants}
              className="card p-7 text-center transition hover:-translate-y-1 hover:shadow-lift"
            >
              <span className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-forest-50 text-forest-600">
                {s.icon}
              </span>
              <h3 className="mt-5 text-lg font-extrabold text-forest-800">{s.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted">{s.text}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* About Us */}
      <section className="overflow-hidden bg-sand/40 py-16 md:py-24">
        <div className="container-page grid items-center gap-12 lg:grid-cols-2">
          {/* Overlapping image collage */}
          <motion.div
            className="relative hidden h-[460px] lg:block"
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <img
              src="https://images.unsplash.com/photo-1574158622682-e40e69881006?auto=format&fit=crop&w=700&q=70"
              alt="Maine Coon cat being cared for by a volunteer"
              loading="lazy"
              className="absolute right-0 top-0 h-4/5 w-3/4 rounded-[2rem] object-cover shadow-lift"
            />
            <img
              src="https://images.unsplash.com/photo-1596854407944-bf87f6fdd49e?auto=format&fit=crop&w=500&q=70"
              alt="Happy Maine Coon in a loving home"
              loading="lazy"
              className="absolute bottom-0 left-0 h-2/5 w-2/5 rounded-[1.5rem] object-cover shadow-lift ring-4 ring-cream"
            />
            {/* Stat chip */}
            <motion.div
              className="absolute bottom-20 right-4 rounded-2xl bg-forest px-5 py-4 text-white shadow-lift"
              animate={{ y: [0, -6, 0] }}
              transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
            >
              <p className="text-2xl font-extrabold leading-none">500+</p>
              <p className="mt-1 text-xs text-cream/80">cats rehomed since 2010</p>
            </motion.div>
          </motion.div>

          {/* Content */}
          <Reveal>
            <SectionHeading
              align="left"
              eyebrow="About us"
              title="A rescue built on love for gentle giants"
              className="!mx-0"
            />
            <p className="mt-5 leading-relaxed text-ink/85">
              Founded in 2010 by a group of Maine Coon lovers, we stepped in because these
              beautiful cats were ending up in shelters not equipped for their specialist needs.
              Today we are a UK-wide network of volunteers, foster carers and vet partners.
            </p>
            <p className="mt-4 leading-relaxed text-ink/85">
              Every Maine Coon in our care is fully health-checked, vaccinated and micro-chipped
              before being carefully matched with a loving family. We stay in touch long after
              adoption day — because a forever home really does mean forever.
            </p>

            <div className="mt-7 grid grid-cols-3 gap-4 border-t border-forest-100 pt-6">
              {[
                { n: '500+', l: 'Cats rehomed' },
                { n: '14', l: 'Years rescuing' },
                { n: '100%', l: 'To cat care' },
              ].map((s) => (
                <div key={s.l}>
                  <p className="text-3xl font-extrabold text-forest">{s.n}</p>
                  <p className="mt-0.5 text-sm text-muted">{s.l}</p>
                </div>
              ))}
            </div>

            <div className="mt-7 flex flex-wrap gap-3">
              <Link to="/about" className="btn-primary">
                Our story <ArrowRightIcon className="h-5 w-5" />
              </Link>
              <Link to="/cats" className="btn-ghost">
                Meet the cats
              </Link>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Featured cats */}
      <section className="py-16 md:py-24">
        <div className="container-page">
          <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
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

      {/* How adoption works */}
      <section className="bg-forest-800 py-16 text-white md:py-24">
        <div className="container-page">
          <SectionHeading
            eyebrow="Simple process"
            title={
              <span className="text-white">How adoption works</span>
            }
            description={
              <span className="text-cream/80">
                Adopting a Maine Coon through us is straightforward, transparent and supported
                every step of the way.
              </span>
            }
          />
          <div className="mt-14 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {adoptionSteps.map((step, i) => (
              <motion.div
                key={step.step}
                custom={i}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: '-60px' }}
                variants={cardVariants}
                className="relative flex flex-col"
              >
                {/* Connector line (desktop) */}
                {i < adoptionSteps.length - 1 && (
                  <div className="absolute left-full top-7 hidden h-px w-8 bg-white/20 lg:block" />
                )}
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-white/10 text-ember">
                  {step.icon}
                </div>
                <span className="mt-4 text-sm font-bold text-ember">{step.step}</span>
                <h3 className="mt-2 text-lg font-extrabold text-white">{step.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-cream/75">{step.text}</p>
              </motion.div>
            ))}
          </div>
          <div className="mt-12 text-center">
            <Link to="/cats" className="btn-accent text-base">
              Start browsing cats <ArrowRightIcon className="h-5 w-5" />
            </Link>
          </div>
        </div>
      </section>

      {/* Rehomed stories */}
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

      {/* Volunteer & Foster CTA */}
      <section className="bg-sand/40 py-16 md:py-20">
        <div className="container-page">
          <SectionHeading
            eyebrow="Get involved"
            title="More ways to make a difference"
            description="You don't have to adopt to help. Every volunteer and foster carer is a lifeline for a cat in need."
          />
          <div className="mt-10 grid gap-6 md:grid-cols-2">
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="relative overflow-hidden rounded-3xl bg-forest p-8 text-white"
            >
              <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-white/15">
                <UsersIcon className="h-7 w-7 text-white" />
              </div>
              <h3 className="text-2xl font-extrabold text-white">Volunteer with us</h3>
              <p className="mt-3 leading-relaxed text-cream/80">
                Help with transport, home checks, grooming days, fundraising events and admin.
                Our volunteers are the backbone of what we do — and every hour matters.
              </p>
              <ul className="mt-4 space-y-2 text-sm text-cream/80">
                {['Transport assistance', 'Home visits', 'Events & fundraising', 'Social media support'].map((item) => (
                  <li key={item} className="flex items-center gap-2">
                    <CheckIcon className="h-4 w-4 text-ember-200" /> {item}
                  </li>
                ))}
              </ul>
              <Link to="/contact" className="btn-accent mt-7 inline-flex">
                Get involved <ArrowRightIcon className="h-5 w-5" />
              </Link>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.15 }}
              className="relative overflow-hidden rounded-3xl bg-ember-600 p-8 text-white"
            >
              <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-white/15">
                <HomeIcon className="h-7 w-7 text-white" />
              </div>
              <h3 className="text-2xl font-extrabold text-white">Foster a cat</h3>
              <p className="mt-3 leading-relaxed text-white/85">
                Open your home temporarily and give a rescued Maine Coon the time and care
                they need to heal, grow and thrive before finding their forever family.
              </p>
              <ul className="mt-4 space-y-2 text-sm text-white/85">
                {['Full vet care provided', 'Food & supplies included', 'Full training & support', 'No long-term commitment'].map((item) => (
                  <li key={item} className="flex items-center gap-2">
                    <CheckIcon className="h-4 w-4 text-white/70" /> {item}
                  </li>
                ))}
              </ul>
              <Link to="/contact" className="mt-7 inline-flex items-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-bold text-ember-700 transition hover:bg-cream">
                Become a foster <ArrowRightIcon className="h-5 w-5" />
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Donation CTA */}
      <section className="relative overflow-hidden bg-forest-800 py-16 text-center text-white md:py-20">
        <div className="absolute inset-0 bg-paw-pattern opacity-20" aria-hidden />
        <div className="container-page relative">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <h2 className="mx-auto max-w-2xl text-3xl font-extrabold text-white sm:text-4xl">
              Your kindness keeps gentle giants safe
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-cream/80">
              100% of donations go directly to vet care, food and shelter. Will you help a
              Maine Coon in need today?
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-3">
              <Link to="/donate" className="btn-accent inline-flex items-center gap-2 text-base shadow-glow">
                <HeartIcon className="h-5 w-5" filled /> Donate Now
              </Link>
              <Link to="/help" className="btn-outline-white text-base">
                Other ways to help
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </>
  );
}
