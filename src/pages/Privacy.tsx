import Seo from '@/components/Seo';
import PageHero from '@/components/PageHero';
import { site } from '@/data/site';

/**
 * Privacy policy describing what this site ACTUALLY does:
 * Supabase stores form submissions, Google Analytics 4 and Smartsupp live chat
 * both set cookies. Keep this in sync if those integrations change.
 *
 * This is written to be accurate, not to be legal advice — have a solicitor or
 * attorney review it before relying on it.
 */
const sections: Array<{ h: string; p: string[] }> = [
  {
    h: 'Who we are',
    p: [
      `${site.name} is a family-run Maine Coon cattery based in Evansville, Indiana. This policy explains what personal information we collect through this website, why we collect it, and what you can do about it.`,
      `If you have any question about this policy, email us at ${site.email}.`,
    ],
  },
  {
    h: 'Information we collect',
    p: [
      'When you submit a contact form, reservation enquiry, kitten application, newsletter signup or order, we collect the details you enter — typically your name, email address, phone number, delivery address and any message you write.',
      'We only collect information you choose to give us. We do not buy personal data from third parties.',
    ],
  },
  {
    h: 'How we use your information',
    p: [
      'We use your details to answer your enquiry, process and deliver your kitten reservation or order, arrange payment, and — where you have opted in — send occasional updates about available kittens.',
      'We never sell your personal information.',
    ],
  },
  {
    h: 'Where your data is stored',
    p: [
      'Form submissions and orders are stored in our database, hosted by Supabase, and are accessible only to authorised members of our team through a password-protected admin area.',
      'This website is hosted by Vercel. Their servers process standard technical data such as your IP address in order to deliver the site to you.',
    ],
  },
  {
    h: 'Cookies and analytics',
    p: [
      'We use Google Analytics 4 to understand how visitors find and use the site. It sets cookies and processes a truncated version of your IP address. This helps us see which pages are useful; we do not use it to identify you personally.',
      'We also use Smartsupp live chat so you can message us directly. Smartsupp sets cookies to keep your chat session open between pages.',
      'You can block or delete cookies in your browser settings. The site will still work, though live chat may not keep your conversation.',
    ],
  },
  {
    h: 'Sharing your information',
    p: [
      'We share your details only where it is necessary to complete what you asked for — for example, with a pet courier arranging your kitten delivery, or with the payment service you choose to pay through.',
      'We may also disclose information where we are required to by law.',
    ],
  },
  {
    h: 'How long we keep it',
    p: [
      'We keep enquiry and order records for as long as needed to support you as a customer and to meet our tax and record-keeping obligations, then delete them.',
    ],
  },
  {
    h: 'Your rights',
    p: [
      `Depending on where you live, you may have the right to access, correct, port or delete the personal data we hold about you, and to opt out of marketing at any time. Indiana residents have these rights under the Indiana Consumer Data Protection Act, and California residents under the CCPA.`,
      `To exercise any of these rights, email ${site.email} and we will respond within the timeframe the law allows.`,
    ],
  },
  {
    h: "Children's privacy",
    p: [
      'This site is not directed at children under 13 and we do not knowingly collect their personal information.',
    ],
  },
  {
    h: 'Changes to this policy',
    p: [
      'If we change how we handle your information we will update this page and revise the date shown above.',
    ],
  },
];

export default function Privacy() {
  return (
    <>
      <Seo title="Privacy Policy" noindex />
      <PageHero
        title="Privacy Policy"
        breadcrumb="Privacy"
        subtitle="How we collect, use and protect your information."
      />
      <article className="container-page max-w-3xl py-14 md:py-20">
        <p className="text-sm text-muted">
          Last updated:{' '}
          {new Date().toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
        </p>
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
