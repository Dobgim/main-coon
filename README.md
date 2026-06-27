# Maine Coons in Need — Charity Website Template

A warm, trustworthy, production-ready website **template** for a UK Maine Coon cat
rescue charity. Built with React 18, Vite, TypeScript, Tailwind CSS, React Router,
GSAP and Framer Motion.

> ⚠️ **Important — this is an original, independent template.**
> It is *inspired by* the genre of cat-rescue charity sites but does **not** copy any
> real charity's logo, photos, written content, bank details or charity number.
> Every name, contact detail, charity number and payment detail in this project is a
> **placeholder**. Replace them all with real, verified information — and obtain the
> charity's permission — before deploying anything that represents a real organisation
> or accepts real donations.

---

## ✨ Features

- **10 routes**: Home, About, Cats for Adoption, Cat Detail (`/cats/:id`), Rehomed,
  How to Help, Donate, Contact, Privacy, Terms (+ a 404 page).
- **Sticky responsive navbar** with center menu, pulsing "Donate Now" button, active-link
  underline (Framer Motion `layoutId`) and a slide-in mobile menu.
- **Cats for Adoption**: filter by age / gender / location / status, paginated grid,
  favourite (♥) toggle persisted to `localStorage`, and an empty state.
- **Cat detail**: image gallery, health & compatibility grids, adoption requirements,
  coordinator contact, share button, and a **multi-step adoption form**.
- **Donation page**: amount presets + custom amount, one-time/monthly toggle, PayPal
  link, copyable bank details, a demo card form and trust badges.
- **Rehomed stories** with before/after image toggle and a "Share your story" form.
- **Forms** (contact, adoption, donation, newsletter) with validation, loading states,
  success modals, and `localStorage` persistence (optional EmailJS hook included).
- **Animations**: GSAP `ScrollTrigger` fade/slide reveals + hero parallax; Framer Motion
  hover/tap micro-interactions and modals. Respects `prefers-reduced-motion`.
- **Responsive** mobile-first layout, accessible focus styles, lazy-loaded images,
  route-based code splitting.

## 🧰 Tech stack

| Concern        | Library                          |
| -------------- | -------------------------------- |
| Framework      | React 18 + TypeScript            |
| Build tool     | Vite 5                           |
| Styling        | Tailwind CSS 3                   |
| Routing        | React Router DOM 6               |
| Scroll anims   | GSAP 3 (ScrollTrigger)           |
| Micro-interactions | Framer Motion 11             |

## 🚀 Getting started

```bash
npm install
npm run dev        # start the dev server (http://localhost:5173)
npm run build      # type-check + production build to /dist
npm run preview    # preview the production build locally
```

Requires Node 18+ (developed on Node 20/24).

## 📁 Project structure

```
src/
  App.tsx                 # router + layout (lazy-loaded routes)
  main.tsx                # entry point
  components/             # Header, Footer, Hero, CatCard, forms, Modal, Icons …
  pages/                  # Home, About, Cats, CatDetail, Rehomed, Help, Donate,
                          # Contact, Privacy, Terms, NotFound
  data/                   # site.ts, cats.ts, rehomed.ts, team.ts, help.ts
  lib/                    # gsap-config, localStorage-utils, emailjs-config
  hooks/                  # useScrollReveal (GSAP)
  styles/global.css       # Tailwind layers + custom component classes
public/
  favicon.svg             # original custom cat-badge favicon
  logo.svg                # original custom logo (the app also renders an inline <Logo/>)
```

## 🐾 Editing content

Almost everything is data-driven:

- **Cats** → `src/data/cats.ts` (see [CATS.md](./CATS.md) for a step-by-step guide).
- **Rehomed stories** → `src/data/rehomed.ts`
- **Team** → `src/data/team.ts`
- **Ways to help** → `src/data/help.ts`
- **Charity name, contact, social, bank/PayPal, charity number** → `src/data/site.ts`

### Images

Placeholder photos are royalty-free Unsplash images loaded by URL. To use your own:
drop files in `public/images/` and reference them as `/images/your-photo.jpg` in the
data files (no import needed). Keep images optimised (WebP, ~200KB) for performance.

### Branding (logo & favicon)

The logo is drawn inline in `src/components/Logo.tsx` and as `public/logo.svg`; the
favicon is `public/favicon.svg` (referenced from `index.html`). Replace these with the
charity's real, authorised brand assets.

## ✉️ Forms → real emails (optional EmailJS)

By default, every form saves to `localStorage` so the template works with zero config.
To send real emails to the charity:

1. `npm i @emailjs/browser`
2. Create a free [EmailJS](https://www.emailjs.com/) account, service and template.
3. Add a `.env` file:
   ```
   VITE_EMAILJS_SERVICE_ID=your_service_id
   VITE_EMAILJS_TEMPLATE_ID=your_template_id
   VITE_EMAILJS_PUBLIC_KEY=your_public_key
   ```
4. Set `EMAIL_ENABLED = true` in `src/lib/emailjs-config.ts`.

Prefer [Formspree](https://formspree.io/)? Point each form's submit handler at your
Formspree endpoint instead — the handlers are isolated in each form component.

## 💳 Donations (PayPal + bank transfer)

- Set `site.donation.paypalUrl` in `src/data/site.ts` to your **hosted PayPal donate
  button** URL.
- Fill in real bank details under `site.donation.bank`.
- The card form is a **demo only** and does not process payments. For live card payments,
  integrate [Stripe](https://stripe.com/) (e.g. Payment Links or Checkout) and replace
  the demo handler in `src/components/DonationForm.tsx`.

## ☁️ Deploy to Vercel

1. Push this project to a Git repository.
2. In [Vercel](https://vercel.com/), **Add New → Project** and import the repo.
3. Framework preset: **Vite**. Build command `npm run build`, output `dist`.
4. Add any `VITE_…` env vars (EmailJS) in Project → Settings → Environment Variables.
5. Deploy. (SPA routing works out of the box with Vercel's Vite preset.)

Netlify works the same way — set build `npm run build`, publish `dist`, and add a
`/* → /index.html` redirect for client-side routing.

## ♿ Accessibility & performance

- Semantic landmarks, skip-to-content link, labelled form fields and focus rings.
- Animations disabled under `prefers-reduced-motion`.
- Route-level code splitting + manual vendor chunks; lazy-loaded imagery.

## 📄 License & assets

Your own code is yours to use. Replace all placeholder branding, copy and Unsplash
images with assets you are licensed to use before publishing.
