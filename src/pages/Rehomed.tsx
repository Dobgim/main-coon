import { useState } from 'react';
import Seo from '@/components/Seo';
import PageHero from '@/components/PageHero';
import RehomedCard from '@/components/RehomedCard';
import Reveal from '@/components/Reveal';
import Modal from '@/components/Modal';
import SectionHeading from '@/components/SectionHeading';
import FormField from '@/components/FormField';
import { appendSubmission } from '@/lib/localStorage-utils';
import { submitStory } from '@/lib/db';
import { rehomedStories } from '@/data/rehomed';

const heroImg =
  'https://images.unsplash.com/photo-1495360010541-f48722b34f7d?auto=format&fit=crop&w=1400&q=70';
const PAGE_SIZE = 6;

export default function Rehomed() {
  const [visible, setVisible] = useState(PAGE_SIZE);
  const [open, setOpen] = useState(false);
  const [done, setDone] = useState(false);
  const [story, setStory] = useState({ name: '', catName: '', message: '' });

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    submitStory(story).catch(() => {});
    appendSubmission('mcin:stories', story);
    setStory({ name: '', catName: '', message: '' });
    setOpen(false);
    setDone(true);
  };

  return (
    <>
      <Seo title="Happy Tails — Rehomed Maine Coons" description="Real families and their Maine Coons. See the happy endings from kittens we've placed in loving homes." />
      <PageHero
        title="Our Rehoming Stories"
        subtitle="Every adoption is a happy ending years in the making. Here are some of our favourites."
        image={heroImg}
        breadcrumb="Rehomed Cats"
      >
        <button type="button" onClick={() => setOpen(true)} className="btn-accent">
          Share Your Story
        </button>
      </PageHero>

      <section className="container-page py-14 md:py-20">
        <Reveal stagger={0.08} className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {rehomedStories.slice(0, visible).map((s) => (
            <RehomedCard key={s.id} story={s} />
          ))}
        </Reveal>

        {visible < rehomedStories.length && (
          <div className="mt-10 text-center">
            <button
              type="button"
              onClick={() => setVisible((v) => v + PAGE_SIZE)}
              className="btn-primary"
            >
              View All Stories
            </button>
          </div>
        )}
      </section>

      {/* Stat band */}
      <section className="bg-forest text-white">
        <div className="container-page grid gap-6 py-12 text-center sm:grid-cols-3">
          {[
            ['500+', 'Cats rehomed'],
            ['98%', 'Stay in their forever home'],
            ['14 yrs', 'Of rescue work'],
          ].map(([n, l]) => (
            <div key={l}>
              <p className="text-4xl font-extrabold text-white">{n}</p>
              <p className="mt-1 text-cream/80">{l}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="container-page py-14 text-center md:py-20">
        <SectionHeading
          eyebrow="Be the next chapter"
          title="Could you give a Maine Coon their happy ending?"
          description="Browse the cats currently in our care and start your own rehoming story."
        />
        <div className="mt-8">
          <a href="/cats" className="btn-accent text-base">
            Meet cats for adoption
          </a>
        </div>
      </section>

      {/* Share story modal-as-form */}
      {open && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-ink/50 backdrop-blur-sm" onClick={() => setOpen(false)} />
          <form
            onSubmit={submit}
            className="card relative z-10 w-full max-w-lg p-7"
          >
            <h3 className="text-2xl font-extrabold text-forest-800">Share your story</h3>
            <p className="mt-1 text-sm text-muted">
              We&apos;d love to hear how your adopted cat is getting on.
            </p>
            <div className="mt-5 space-y-4">
              <FormField label="Your name" htmlFor="s-name" required>
                <input
                  id="s-name"
                  required
                  className="input"
                  value={story.name}
                  onChange={(e) => setStory((s) => ({ ...s, name: e.target.value }))}
                />
              </FormField>
              <FormField label="Cat's name" htmlFor="s-cat" required>
                <input
                  id="s-cat"
                  required
                  className="input"
                  value={story.catName}
                  onChange={(e) => setStory((s) => ({ ...s, catName: e.target.value }))}
                />
              </FormField>
              <FormField label="Your story" htmlFor="s-msg" required>
                <textarea
                  id="s-msg"
                  required
                  rows={4}
                  className="input"
                  value={story.message}
                  onChange={(e) => setStory((s) => ({ ...s, message: e.target.value }))}
                />
              </FormField>
            </div>
            <div className="mt-6 flex gap-3">
              <button type="button" onClick={() => setOpen(false)} className="btn-ghost flex-1">
                Cancel
              </button>
              <button type="submit" className="btn-accent flex-1">
                Submit Story
              </button>
            </div>
          </form>
        </div>
      )}

      <Modal open={done} onClose={() => setDone(false)} title="Thank you!">
        Your story has been submitted. We may feature it on this page soon!
      </Modal>
    </>
  );
}
