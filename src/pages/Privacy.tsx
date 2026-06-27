import PageHero from '@/components/PageHero';
import { site } from '@/data/site';

const sections: Array<{ h: string; p: string[] }> = [
  {
    h: 'Who we are',
    p: [
      `${site.name} is a UK Maine Coon cat rescue. This policy explains how we handle the personal information you share with us through this website.`,
      'Note: this is a demonstration template. Replace this text with your charity\'s reviewed, GDPR-compliant privacy policy before going live.',
    ],
  },
  {
    h: 'Information we collect',
    p: [
      'When you submit a contact, adoption, fostering or donation form we may collect your name, email address, phone number and the details you provide in your message.',
      'We only collect information that you choose to give us, and only use it for the purpose for which it was provided.',
    ],
  },
  {
    h: 'How we use your information',
    p: [
      'We use your details to respond to enquiries, process adoption and fostering applications, acknowledge donations and — where you have opted in — send occasional updates about our work.',
      'We never sell your personal information to third parties.',
    ],
  },
  {
    h: 'Data storage',
    p: [
      'In this template, form submissions are stored locally in your browser for demonstration purposes only. A live deployment should store data securely via a vetted provider (e.g. an email service or CRM).',
    ],
  },
  {
    h: 'Your rights',
    p: [
      'Under UK GDPR you have the right to access, correct or request deletion of your personal data. To exercise these rights, contact us at ' + site.email + '.',
    ],
  },
  {
    h: 'Cookies',
    p: [
      'This template does not set tracking cookies. If you add analytics or advertising tools, update this section and provide a cookie consent mechanism.',
    ],
  },
];

export default function Privacy() {
  return (
    <>
      <PageHero title="Privacy Policy" breadcrumb="Privacy" subtitle="How we collect, use and protect your information." />
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
