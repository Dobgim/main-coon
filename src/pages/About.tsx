import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import Seo from '@/components/Seo';
import PageHero from '@/components/PageHero';
import SectionHeading from '@/components/SectionHeading';
import TrustBadge from '@/components/TrustBadge';
import {
  ShieldIcon,
  HeartIcon,
  PawIcon,
  ArrowRightIcon,
  StarIcon,
  HandshakeIcon,
} from '@/components/Icons';
import { team } from '@/data/team';
import { site } from '@/data/site';

const heroImg =
  'https://images.unsplash.com/photo-1574158622682-e40e69881006?auto=format&fit=crop&w=1400&q=70';

const cardVariants = {
  hidden: { opacity: 0, y: 28 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.08, duration: 0.5, ease: 'easeOut' },
  }),
};

const values = [
  {
    icon: <HeartIcon className="h-7 w-7" />,
    title: 'Compassion first',
    text: 'Every cat is treated with patience, dignity and love — from the day we rescue them to the day they go home.',
  },
  {
    icon: <ShieldIcon className="h-7 w-7" />,
    title: 'Health guaranteed',
    text: 'Vet checks, vaccinations and honest health records come standard before any kitten is placed.',
  },
  {
    icon: <HandshakeIcon className="h-7 w-7" />,
    title: 'Lifelong support',
    text: 'We stay in touch long after adoption day, with friendly advice whenever you need it.',
  },
];

export default function About() {
  return (
    <>
      <Seo
        title="About Us — Maine Coon Breeder in Indiana"
        description="Learn about our family cattery, how we home-raise healthy, socialized Maine Coon kittens in Evansville, Indiana, and our written health guarantee."
      />
      <PageHero
        title={`About ${site.name}`}
        subtitle="A small, passionate cattery raising healthy, well-socialised Maine Coon kittens for families across the US."
        image={heroImg}
        breadcrumb="About Us"
      />

      {/* Story */}
      <section className="container-page py-14 md:py-20">
        <div className="grid items-center gap-10 lg:grid-cols-2">
          <div className="overflow-hidden rounded-[2.5rem] shadow-lift ring-1 ring-black/5">
            <img
              src="https://images.unsplash.com/photo-1596854407944-bf87f6fdd49e?auto=format&fit=crop&w=900&q=70"
              alt="A Maine Coon cat resting comfortably"
              loading="lazy"
              className="h-full w-full object-cover"
            />
          </div>
          <div>
            <SectionHeading
              align="left"
              eyebrow="Our story"
              title="Raising exceptional Maine Coon kittens since 2010"
              className="!mx-0"
            />
            <p className="mt-5 leading-relaxed text-ink/85">
              {site.name} began with a simple love for this magnificent breed. Our kittens are
              raised underfoot in our home — not in cages — so they grow up confident, affectionate
              and beautifully socialised with people and other pets.
            </p>
            <p className="mt-4 leading-relaxed text-ink/85">
              Every kitten is health-checked, vaccinated and comes with a health guarantee. Over the
              years we&apos;ve placed{' '}
              <strong className="text-forest-700">{site.rehomedCount} kittens</strong> with happy
              families — and counting.
            </p>
            <div className="mt-6 rounded-2xl bg-forest-50 p-5">
              <p className="font-bold text-forest-800">Our promise</p>
              <p className="mt-1 text-sm text-ink/80">
                To raise healthy, happy, well-socialised Maine Coon kittens and match them with
                loving families — with support for life.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Trust */}
      <section className="bg-sand/60 py-14">
        <div className="container-page grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <TrustBadge icon={<ShieldIcon />} title="Health Guarantee" subtitle="Vet-checked & vaccinated" />
          <TrustBadge icon={<HeartIcon />} title="500+ Kittens Placed" subtitle="Since 2010" />
          <TrustBadge icon={<PawIcon />} title="Nationwide Delivery" subtitle="Safe door-to-door transport" />
          <TrustBadge icon={<StarIcon />} title="5-Star Breeder" subtitle="Trusted by families" />
        </div>
      </section>

      {/* Our values */}
      <section className="container-page py-14 md:py-20">
        <SectionHeading
          eyebrow="What we stand for"
          title="Our values"
          description="The principles that guide how we raise our kittens and care for every family."
        />
        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {values.map((v, i) => (
            <motion.div
              key={v.title}
              custom={i}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-60px' }}
              variants={cardVariants}
              className="card p-7 text-center transition hover:-translate-y-1 hover:shadow-lift"
            >
              <span className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-forest-50 text-forest-600">
                {v.icon}
              </span>
              <h3 className="mt-5 text-lg font-extrabold text-forest-800">{v.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted">{v.text}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Team */}
      <section className="bg-sand/40 py-14 md:py-20">
        <div className="container-page">
          <SectionHeading
            eyebrow="Meet the team"
            title="The volunteers behind the rescue"
            description="A small but mighty group of people who give their time so cats can find homes."
          />
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {team.map((m, i) => (
              <motion.div
                key={m.name}
                custom={i}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: '-60px' }}
                variants={cardVariants}
                className="card overflow-hidden text-center transition hover:-translate-y-1 hover:shadow-lift"
              >
                <div className="aspect-square overflow-hidden">
                  <img src={m.image} alt={m.name} loading="lazy" className="h-full w-full object-cover" />
                </div>
                <div className="p-5">
                  <h3 className="text-lg font-extrabold text-forest-800">{m.name}</h3>
                  <p className="text-sm font-semibold text-ember">{m.role}</p>
                  <p className="mt-2 text-sm text-muted">{m.bio}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Maine Coons */}
      <section className="bg-forest-800 py-14 text-white md:py-20">
        <div className="container-page grid items-center gap-10 lg:grid-cols-2">
          <div className="overflow-hidden rounded-[2.5rem] shadow-lift lg:order-2">
            <img
              src="https://images.unsplash.com/photo-1606214174585-fe31582dc6ee?auto=format&fit=crop&w=900&q=70"
              alt="A majestic Maine Coon cat"
              loading="lazy"
              className="h-full w-full object-cover"
            />
          </div>
          <div className="lg:order-1">
            <span className="badge inline-flex items-center gap-1.5 bg-white/15 text-white"><PawIcon className="h-3.5 w-3.5" /> The breed</span>
            <h2 className="mt-3 text-3xl font-extrabold text-white">Why families love Maine Coons</h2>
            <p className="mt-4 leading-relaxed text-cream/85">
              Maine Coons are one of the largest and most affectionate cat breeds — gentle,
              sociable and devoted to their people. Their playful, dog-like personalities and
              luxurious coats make them a wonderful addition to any home.
            </p>
            <ul className="mt-5 space-y-2 text-cream/85">
              <li>• Friendly, dog-like personalities that crave companionship</li>
              <li>• Great with children and other pets</li>
              <li>• Raised in our home and beautifully socialised</li>
            </ul>
            <Link to="/cats" className="btn-accent mt-7">
              View available kittens <ArrowRightIcon className="h-5 w-5" />
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
