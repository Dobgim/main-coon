import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { supabase } from '@/lib/supabase';
import {
  ShoppingBagIcon,
  CheckIcon,
  ClipboardIcon,
  HeartIcon,
  MailIcon,
  UsersIcon,
  ArrowRightIcon,
} from '@/components/Icons';

type Counts = Record<string, number>;

/* eslint-disable @typescript-eslint/no-explicit-any */
async function count(table: string, filter?: (q: any) => any): Promise<number> {
  let query: any = supabase.from(table).select('*', { count: 'exact', head: true });
  if (filter) query = filter(query);
  const { count: c } = await query;
  return c ?? 0;
}

export default function Dashboard() {
  const [counts, setCounts] = useState<Counts>({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      const [cats, available, adopted, contacts, adoptions, donations, subscribers, stories] =
        await Promise.all([
          count('cats'),
          count('cats', (q) => q.eq('status', 'Available')),
          count('cats', (q) => q.eq('status', 'Adopted')),
          count('contact_messages'),
          count('adoption_applications'),
          count('donations'),
          count('newsletter_subscribers'),
          count('stories'),
        ]);
      setCounts({ cats, available, adopted, contacts, adoptions, donations, subscribers, stories });
      setLoading(false);
    })().catch(() => setLoading(false));
  }, []);

  const cards = [
    { label: 'Total cats', value: counts.cats, icon: <ShoppingBagIcon className="h-6 w-6" />, tint: 'bg-forest-50 text-forest-600' },
    { label: 'Available', value: counts.available, icon: <CheckIcon className="h-6 w-6" />, tint: 'bg-emerald-50 text-emerald-600' },
    { label: 'Adopted', value: counts.adopted, icon: <HeartIcon className="h-6 w-6" filled />, tint: 'bg-sky-50 text-sky-600' },
    { label: 'Adoption applications', value: counts.adoptions, icon: <ClipboardIcon className="h-6 w-6" />, tint: 'bg-ember-100 text-ember-700' },
    { label: 'Contact messages', value: counts.contacts, icon: <MailIcon className="h-6 w-6" />, tint: 'bg-amber-50 text-amber-600' },
    { label: 'Newsletter subscribers', value: counts.subscribers, icon: <UsersIcon className="h-6 w-6" />, tint: 'bg-purple-50 text-purple-600' },
  ];

  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="text-3xl font-extrabold text-forest-800">Dashboard</h1>
          <p className="mt-1 text-muted">An overview of your rescue at a glance.</p>
        </div>
        <Link to="/admin/products/new" className="btn-primary">
          Add a cat <ArrowRightIcon className="h-5 w-5" />
        </Link>
      </div>

      <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {cards.map((c) => (
          <div key={c.label} className="card flex items-center gap-4 p-5">
            <span className={`flex h-12 w-12 items-center justify-center rounded-2xl ${c.tint}`}>
              {c.icon}
            </span>
            <div>
              <p className="text-2xl font-extrabold text-forest-800">
                {loading ? '—' : (c.value ?? 0)}
              </p>
              <p className="text-sm text-muted">{c.label}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-8 grid gap-4 sm:grid-cols-2">
        <Link to="/admin/products" className="card flex items-center justify-between gap-4 p-6 transition hover:-translate-y-0.5 hover:shadow-lift">
          <div>
            <h2 className="text-lg font-extrabold text-forest-800">Manage cats</h2>
            <p className="mt-1 text-sm text-muted">Add, edit, publish or remove listings.</p>
          </div>
          <ArrowRightIcon className="h-6 w-6 text-forest-500" />
        </Link>
        <Link to="/admin/submissions" className="card flex items-center justify-between gap-4 p-6 transition hover:-translate-y-0.5 hover:shadow-lift">
          <div>
            <h2 className="text-lg font-extrabold text-forest-800">View submissions</h2>
            <p className="mt-1 text-sm text-muted">Applications, messages, donations & more.</p>
          </div>
          <ArrowRightIcon className="h-6 w-6 text-forest-500" />
        </Link>
      </div>
    </div>
  );
}
