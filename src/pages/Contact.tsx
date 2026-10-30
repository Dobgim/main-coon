import Seo from '@/components/Seo';
import PageHero from '@/components/PageHero';
import ContactForm from '@/components/ContactForm';
import {
  MailIcon,
  PhoneIcon,
  PinIcon,
  FacebookIcon,
  InstagramIcon,
  TikTokIcon,
} from '@/components/Icons';
import { site } from '@/data/site';

const heroImg =
  'https://images.unsplash.com/photo-1518791841217-8f162f1e1131?auto=format&fit=crop&w=1400&q=70';

export default function Contact() {
  const contactPageSchema = {
    '@context': 'https://schema.org',
    '@type': 'ContactPage',
    name: `Contact Us | ${site.name}`,
    description: 'Get in touch with Royal Maine Coon Kittens at 219 S Grand Ave, Evansville, IN 47713. Schedule an in-person cattery visit, reserve a kitten, or arrange Tri-State and nationwide delivery.',
    url: `${site.url}/contact`,
    mainEntity: {
      '@type': ['PetStore', 'AnimalShelter'],
      name: site.name,
      url: site.url,
      telephone: site.phone,
      email: site.email,
      address: {
        '@type': 'PostalAddress',
        streetAddress: '219 S Grand Ave',
        addressLocality: 'Evansville',
        addressRegion: 'IN',
        postalCode: '47713',
        addressCountry: 'US',
      },
      geo: {
        '@type': 'GeoCoordinates',
        latitude: 37.9698,
        longitude: -87.5615,
      },
      areaServed: site.serviceAreas.map((area) => ({ '@type': 'AdministrativeArea', name: area })),
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
        name: 'Contact',
        item: `${site.url}/contact`,
      },
    ],
  };

  return (
    <>
      <Seo
        title="Contact Us — Maine Coon Cattery in Evansville, IN | 219 S Grand Ave"
        description="Contact Royal Maine Coon Kittens at 219 S Grand Ave, Evansville, IN 47713. Inquire about available kittens, schedule an in-person cattery appointment, or arrange Tri-State delivery."
        jsonLd={[contactPageSchema, breadcrumbJsonLd]}
      />
      <PageHero
        title="Contact Our Evansville Cattery"
        subtitle="Located at 219 S Grand Ave, Evansville, IN 47713. We're here to answer questions about kitten reservations, in-person pickups, and delivery options."
        image={heroImg}
      />

      <section className="container-page py-14 md:py-20">
        <div className="grid gap-10 lg:grid-cols-[1fr_360px]">
          {/* Form */}
          <div>
            <h2 className="text-2xl font-extrabold text-forest-800">Send us a message</h2>
            <p className="mt-2 text-muted">{site.responseTime}</p>
            <div className="mt-6">
              <ContactForm />
            </div>
          </div>

          {/* Details */}
          <aside className="space-y-4">
            <div className="card p-6">
              <h3 className="text-lg font-extrabold text-forest-800">Get in touch</h3>
              <ul className="mt-4 space-y-4 text-sm">
                <li className="flex items-start gap-3">
                  <PhoneIcon className="mt-0.5 h-5 w-5 text-forest-600" />
                  <div>
                    <p className="font-semibold text-forest-800">Phone &amp; Text</p>
                    <a href={`tel:${site.phone.replace(/\s/g, '')}`} className="link-quiet">
                      {site.phone}
                    </a>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <MailIcon className="mt-0.5 h-5 w-5 text-forest-600" />
                  <div>
                    <p className="font-semibold text-forest-800">Email</p>
                    <a href={`mailto:${site.email}`} className="link-quiet">
                      {site.email}
                    </a>
                  </div>
                </li>
                {site.address && (
                  <li className="flex items-start gap-3">
                    <PinIcon className="mt-0.5 h-5 w-5 text-forest-600" />
                    <div>
                      <p className="font-semibold text-forest-800">Cattery Address</p>
                      <a
                        href="https://maps.google.com/?q=219+S+Grand+Ave,+Evansville,+IN+47713"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-forest-700 hover:text-ember font-medium"
                      >
                        {site.address}
                      </a>
                      <p className="mt-1 text-xs text-muted">Vanderburgh County, IN</p>
                    </div>
                  </li>
                )}
                <li className="border-t border-forest-50 pt-3 text-xs text-muted">
                  <strong className="text-forest-800">Visiting Hours:</strong> {site.hours}
                </li>
              </ul>

              <div className="mt-6">
                <p className="text-sm font-semibold text-forest-800">Follow us</p>
                <div className="mt-3 flex gap-3">
                  {[
                    { href: site.social.facebook, label: 'Facebook', icon: <FacebookIcon /> },
                    { href: site.social.instagram, label: 'Instagram', icon: <InstagramIcon /> },
                    { href: site.social.tiktok, label: 'TikTok', icon: <TikTokIcon /> },
                  ].map((s) => (
                    <a
                      key={s.label}
                      href={s.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={s.label}
                      className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-forest-50 text-forest-700 transition hover:-translate-y-0.5 hover:bg-ember hover:text-white"
                    >
                      {s.icon}
                    </a>
                  ))}
                </div>
              </div>
            </div>

            {/* Address & Visiting Policy Card */}
            <div className="card overflow-hidden p-6 bg-forest-50/60 border border-forest-100">
              <div className="flex items-center gap-2 text-forest-800 font-bold">
                <PinIcon className="h-5 w-5 text-forest-600" />
                <span>Visit 219 S Grand Ave, Evansville</span>
              </div>
              <p className="mt-3 text-xs sm:text-sm text-ink/80 leading-relaxed">
                For the safety and health of our young kittens, in-person cattery visits are held{' '}
                <strong>by scheduled appointment only</strong>. Please submit a reservation enquiry or call us in advance to schedule your meetup.
              </p>
              <div className="mt-4">
                <a
                  href="https://maps.google.com/?q=219+S+Grand+Ave,+Evansville,+IN+47713"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-primary w-full text-xs py-2.5 justify-center"
                >
                  Get Google Maps Directions &rarr;
                </a>
              </div>
              <div className="mt-5 pt-4 border-t border-forest-100 text-xs text-ink/75">
                <p className="font-semibold text-forest-800 mb-1">Serving Surrounding Areas:</p>
                <p>Newburgh, Henderson KY, Owensboro KY, Jasper, Mount Vernon, Boonville, Princeton, and the wider Tri-State region.</p>
              </div>
            </div>
          </aside>
        </div>
      </section>
    </>
  );
}
