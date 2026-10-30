import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import Seo from '@/components/Seo';
import Hero from '@/components/Hero';
import { localBusinessSchema } from '@/data/site';
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
  PinIcon,
} from '@/components/Icons';
import { useCats } from '@/hooks/useCats';
import { rehomedStories } from '@/data/rehomed';

const services = [
  {
    icon: <HeartIcon className="h-7 w-7" />,
    title: 'DNA Tested & Vet-Certified',
    text: 'Every kitten is vet-checked, fully vaccinated, and DNA-cleared for HCM, SMA, and PKDef with a written guarantee.',
  },
  {
    icon: <PawIcon className="h-7 w-7" />,
    title: 'Home-Raised in Evansville',
    text: 'Raised cage-free underfoot at 219 S Grand Ave, Evansville, IN 47713 and socialized with children and home sounds.',
  },
  {
    icon: <HomeIcon className="h-7 w-7" />,
    title: 'Local Pickup & Tri-State Delivery',
    text: 'Collect your kitten at our Evansville cattery or choose safe door-to-door courier delivery to Newburgh, Henderson KY, Owensboro KY & nationwide.',
  },
  {
    icon: <ShieldIcon className="h-7 w-7" />,
    title: 'Lifetime Breed Mentorship',
    text: 'Continuous guidance on Maine Coon nutrition, coat grooming, growth milestones, and veterinary health for life.',
  },
];

const adoptionSteps = [
  {
    step: '01',
    icon: <SearchIcon className="h-6 w-6" />,
    title: 'Select your kitten',
    text: 'Explore our available European and American Maine Coon kittens in classic tabby, black smoke, silver, and solid coats.',
  },
  {
    step: '02',
    icon: <ClipboardIcon className="h-6 w-6" />,
    title: 'Reserve with a deposit',
    text: 'Place a deposit to reserve your kitten. We provide weekly photo and video growth updates as your kitten develops.',
  },
  {
    step: '03',
    icon: <ShieldIcon className="h-6 w-6" />,
    title: 'Vet exam & vaccinations',
    text: 'Your kitten completes complete vet exams, age-appropriate vaccines, deworming, microchipping, and litter training.',
  },
  {
    step: '04',
    icon: <HeartIcon className="h-6 w-6" />,
    title: 'Local pickup or delivery',
    text: 'Pick up your kitten at 219 S Grand Ave, Evansville, IN 47713, or receive safe, stress-free delivery to your doorstep.',
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
  const { cats } = useCats();
  const featured = cats.filter((c) => c.status !== 'Adopted').slice(0, 3);
  const topStories = rehomedStories.slice(0, 3);

  return (
    <>
      <Seo
        title="Maine Coon Kittens for Sale in Evansville, IN | 219 S Grand Ave"
        description="Purebred Maine Coon kittens for sale in Evansville, Indiana. Located at 219 S Grand Ave, Evansville, IN 47713. Vet-checked, DNA health-tested gentle giants with in-person pickup and safe delivery to Newburgh, Henderson KY, Owensboro KY, and nationwide."
        jsonLd={localBusinessSchema}
      />
      <Hero />

      {/* Tagline band */}
      <section className="bg-forest text-white">
        <div className="container-page flex flex-col items-center gap-4 py-10 text-center md:flex-row md:justify-between md:text-left">
          <div>
            <h2 className="text-2xl font-extrabold text-white sm:text-3xl">
              Evansville's Premier Maine Coon Cattery
            </h2>
            <p className="mt-2 max-w-2xl text-cream/80">
              Specializing in healthy, giant European and American Maine Coons with affectionate, dog-like temperaments.
              Raised at 219 S Grand Ave, Evansville, IN 47713 — serving Indiana, Kentucky, and families across the US.
            </p>
          </div>
          <Link to="/cats" className="btn-accent shrink-0 text-base">
            View available kittens <ArrowRightIcon className="h-5 w-5" />
          </Link>
        </div>
      </section>

      {/* Cat photo slideshow */}
      <CatSlideshow />

      {/* Why we exist — service cards */}
      <section className="container-page py-16 md:py-24">
        <SectionHeading
          eyebrow="Why Tri-State Families Choose Us"
          title="Ethical Breeding & Health-First Care in Evansville, IN"
          description="From birth at our cattery at 219 S Grand Ave to pickup or delivery day, every kitten receives premium nutrition, socialization, and strict veterinary screening."
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
              <p className="mt-1 text-xs text-cream/80">kittens placed since 2010</p>
            </motion.div>
          </motion.div>

          {/* Content */}
          <Reveal>
            <SectionHeading
              align="left"
              eyebrow="About us"
              title="A cattery built on love for gentle giants"
              className="!mx-0"
            />
            <p className="mt-5 leading-relaxed text-ink/85">
              Founded in 2010 by a family of Maine Coon lovers, we raise our kittens underfoot in
              our home — never in cages — so they grow up confident, affectionate and ready to bond
              with you.
            </p>
            <p className="mt-4 leading-relaxed text-ink/85">
              Every kitten is fully health-checked, vaccinated and micro-chipped before going home,
              and comes with a health guarantee. We stay in touch long after pickup — because our
              families are part of ours.
            </p>

            <div className="mt-7 grid grid-cols-3 gap-4 border-t border-forest-100 pt-6">
              {[
                { n: '500+', l: 'Kittens placed' },
                { n: '14', l: 'Years breeding' },
                { n: '100%', l: 'Health guaranteed' },
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
                View kittens
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
              eyebrow="Looking for a home"
              title="Kittens ready for their new homes"
              className="!mx-0"
            />
            <Link to="/cats" className="btn-ghost shrink-0">
              View all kittens <ArrowRightIcon className="h-4 w-4" />
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
              <span className="text-white">How to reserve your kitten</span>
            }
            description={
              <span className="text-cream/80">
                Reserving a Maine Coon kitten with us is straightforward, transparent and supported
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
              Browse available kittens <ArrowRightIcon className="h-5 w-5" />
            </Link>
          </div>
        </div>
      </section>

      {/* Rehomed stories */}
      <section className="container-page py-16 md:py-24">
        <SectionHeading
          eyebrow="Happy endings"
          title="Happy families & their kittens"
          description="Hundreds of Maine Coon kittens have joined loving families through our cattery."
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
            eyebrow="Why buy from us"
            title="More than just a kitten"
            description="Every family gets a healthy, well-socialised companion — plus our guidance and support for life."
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
                <ShieldIcon className="h-7 w-7 text-white" />
              </div>
              <h3 className="text-2xl font-extrabold text-white">Health guarantee</h3>
              <p className="mt-3 leading-relaxed text-cream/80">
                Every kitten leaves us healthy and protected. You receive full records and a written
                health guarantee for total peace of mind.
              </p>
              <ul className="mt-4 space-y-2 text-sm text-cream/80">
                {['Vet-checked & vaccinated', 'Dewormed & litter-trained', 'Microchipped', 'Written health guarantee', 'DNA tested HCM/SMA/PKDef clear'].map((item) => (
                  <li key={item} className="flex items-center gap-2">
                    <CheckIcon className="h-4 w-4 text-ember-200" /> {item}
                  </li>
                ))}
              </ul>
              <Link to="/cats" className="btn-accent mt-7 inline-flex">
                View kittens <ArrowRightIcon className="h-5 w-5" />
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
              <h3 className="text-2xl font-extrabold text-white">Local Pickup &amp; Delivery</h3>
              <p className="mt-3 leading-relaxed text-white/85">
                Visit our home cattery at 219 S Grand Ave in Evansville, IN for in-person pickup, or let us arrange safe white-glove transport to your door.
              </p>
              <ul className="mt-4 space-y-2 text-sm text-white/85">
                {['In-person pickup at 219 S Grand Ave, Evansville, IN 47713', 'Delivery to Newburgh, Henderson KY & Owensboro KY', 'Regional delivery to Indianapolis & Louisville', 'Safe nationwide pet courier & flight nanny'].map((item) => (
                  <li key={item} className="flex items-center gap-2">
                    <CheckIcon className="h-4 w-4 text-white/70" /> {item}
                  </li>
                ))}
              </ul>
              <Link to="/contact" className="mt-7 inline-flex items-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-bold text-ember-700 transition hover:bg-cream">
                Schedule a Visit or Delivery <ArrowRightIcon className="h-5 w-5" />
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Local Services & Regional Coverage in Evansville & Tri-State */}
      <section className="bg-cream py-16 md:py-24">
        <div className="container-page">
          <SectionHeading
            eyebrow="Local Maine Coon Services"
            title="Maine Coon Services in Evansville, IN & The Tri-State"
            description="From purebred kitten reservations to local pickup and breed mentorship, explore the services our Evansville cattery provides to Indiana and Kentucky families."
          />

          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {[
              {
                title: 'Purebred Kitten Reservations',
                desc: 'Champion bloodlines, European giant traits, lynx ear tufts, and sweet dog-like personalities in tabby, black smoke, and silver colors.',
                badge: 'TICA / CFA Pedigrees',
              },
              {
                title: 'Cattery Pickup in Evansville (47713)',
                desc: 'Meet your reserved kitten in person at 219 S Grand Ave, Evansville, IN 47713. Experience our cage-free, loving home environment.',
                badge: 'By Appointment',
              },
              {
                title: 'Tri-State Pet Courier Delivery',
                desc: 'Stress-free, climate-controlled personal delivery across Newburgh IN, Henderson KY, Owensboro KY, Jasper, and surrounding regions.',
                badge: 'Door-to-Door Delivery',
              },
              {
                title: 'Genetic DNA Health Screening',
                desc: 'All parent cats are genetically tested clear for Hypertrophic Cardiomyopathy (HCM), Spinal Muscular Atrophy (SMA), and PKDef.',
                badge: 'Health Certified',
              },
              {
                title: 'Adult Cat Adoption & Rehoming',
                desc: 'Occasional retired kings and queens available for adoption to loving, quiet pet homes in Evansville and Western Kentucky.',
                badge: 'Retirement Placements',
              },
              {
                title: 'Lifetime Breed Care & Nutrition Guidance',
                desc: 'Ongoing support for Evansville families on grooming tools for dense double coats, raw/kibble nutrition, and growth milestones.',
                badge: 'Lifetime Support',
              },
            ].map((srv, idx) => (
              <motion.div
                key={srv.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.08 }}
                className="card p-6 flex flex-col justify-between hover:shadow-lift transition"
              >
                <div>
                  <span className="badge bg-forest-50 text-forest-700 text-xs font-semibold">
                    {srv.badge}
                  </span>
                  <h3 className="mt-3 text-lg font-extrabold text-forest-800">{srv.title}</h3>
                  <p className="mt-2 text-sm text-ink/80 leading-relaxed">{srv.desc}</p>
                </div>
                <div className="mt-5 pt-4 border-t border-forest-50">
                  <Link to="/contact" className="text-sm font-bold text-forest hover:text-ember flex items-center gap-1">
                    Inquire about this service &rarr;
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Service Area coverage badges */}
          <div className="mt-14 rounded-3xl bg-forest-50/70 border border-forest-100 p-8 sm:p-10">
            <div className="max-w-3xl">
              <span className="badge bg-forest-100 text-forest-800 text-xs font-bold uppercase tracking-wider">
                Geographic Service Coverage
              </span>
              <h3 className="mt-3 text-2xl font-extrabold text-forest-800 sm:text-3xl">
                Serving Evansville, IN &amp; Surrounding Communities
              </h3>
              <p className="mt-2 text-sm sm:text-base text-ink/80 leading-relaxed">
                Whether you live in Vanderburgh County, across the river in Kentucky, or in neighboring Indiana counties,
                our cattery at <strong>219 S Grand Ave, Evansville, IN 47713</strong> provides local pickup and dedicated personal delivery.
              </p>
            </div>

            <div className="mt-6 flex flex-wrap gap-2.5">
              {[
                'Evansville, IN (47713, 47708, 47714, 47715)',
                'Newburgh, IN',
                'Henderson, KY (15 min drive)',
                'Owensboro, KY (40 min drive)',
                'Jasper & Dubois County, IN',
                'Mount Vernon & Posey County, IN',
                'Boonville & Warrick County, IN',
                'Princeton & Gibson County, IN',
                'Vincennes & Knox County, IN',
                'Bloomington, IN',
                'Indianapolis, IN',
                'Louisville, KY',
                'Nationwide White-Glove Delivery',
              ].map((loc) => (
                <span
                  key={loc}
                  className="inline-flex items-center gap-1.5 rounded-full bg-white px-3.5 py-1.5 text-xs font-semibold text-forest-800 shadow-soft border border-forest-100"
                >
                  <PinIcon className="h-3.5 w-3.5 text-ember-600" />
                  {loc}
                </span>
              ))}
            </div>

            <div className="mt-8 pt-6 border-t border-forest-200/60 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div>
                <p className="text-sm font-bold text-forest-800">Visiting our Evansville Cattery?</p>
                <p className="text-xs text-muted">219 S Grand Ave, Evansville, IN 47713 · Visits by scheduled appointment</p>
              </div>
              <Link to="/contact" className="btn-primary text-sm shrink-0">
                Book a Visit or Consultation <ArrowRightIcon className="h-4 w-4" />
              </Link>
            </div>
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
              Ready to welcome a Maine Coon kitten?
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-cream/80">
              Reserve your kitten today and we&apos;ll guide you through every step — from deposit
              to delivery. Your new best friend is waiting.
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-3">
              <Link to="/cats" className="btn-accent inline-flex items-center gap-2 text-base shadow-glow">
                <HeartIcon className="h-5 w-5" filled /> View available kittens
              </Link>
              <Link to="/contact" className="btn-outline-white text-base">
                Contact us
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </>
  );
}
