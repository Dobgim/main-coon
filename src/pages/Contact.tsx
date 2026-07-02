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
  return (
    <>
      <Seo
        title="Contact Us — Royal Maine Coon Kittens Indiana"
        description="Get in touch with Royal Maine Coon Kittens in Evansville, Indiana. Have questions about reserving a kitten, prices, or shipping options? Contact us today."
      />
      <PageHero
        title="Contact Us"
        subtitle="Questions about adoption, fostering or volunteering? We'd love to hear from you."
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
                    <p className="font-semibold text-forest-800">Phone</p>
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
                <li className="flex items-start gap-3">
                  <PinIcon className="mt-0.5 h-5 w-5 text-forest-600" />
                  <div>
                    <p className="font-semibold text-forest-800">Location</p>
                    <p className="text-muted">{site.address}</p>
                  </div>
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

            {/* Map placeholder (no third-party embed in this template) */}
            <div className="card overflow-hidden">
              <div className="flex aspect-video items-center justify-center bg-forest-50 text-center text-sm text-muted">
                <span className="px-6">
                  Map embed goes here — add a Google Maps iframe with the rescue&apos;s real
                  location.
                </span>
              </div>
            </div>
          </aside>
        </div>
      </section>
    </>
  );
}
