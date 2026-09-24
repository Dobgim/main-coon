import { NavLink, Navigate, Outlet, Link } from 'react-router-dom';
import { useAuth } from './AuthProvider';
import {
  PawIcon,
  HomeIcon,
  ShoppingBagIcon,
  ClipboardIcon,
  ArrowRightIcon,
} from '@/components/Icons';

const ReceiptIcon = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
  </svg>
);

const nav = [
  { to: '/admin', label: 'Dashboard', icon: <HomeIcon className="h-5 w-5" />, end: true },
  { to: '/admin/products', label: 'Products', icon: <ShoppingBagIcon className="h-5 w-5" />, end: false },
  { to: '/admin/submissions', label: 'Submissions', icon: <ClipboardIcon className="h-5 w-5" />, end: false },
  { to: '/admin/invoices', label: 'Invoices', icon: <ReceiptIcon className="h-5 w-5" />, end: false },
];

export default function AdminLayout() {
  const { session, isAdmin, loading, signOut } = useAuth();

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-cream">
        <PawIcon className="h-10 w-10 animate-pulse text-forest-400" />
      </div>
    );
  }

  if (!session) return <Navigate to="/admin/login" replace />;

  if (!isAdmin) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center gap-4 bg-cream px-4 text-center">
        <h1 className="text-2xl font-extrabold text-forest-800">Not authorized</h1>
        <p className="max-w-sm text-muted">
          This account isn&apos;t an admin yet. Add its user id to the{' '}
          <code className="rounded bg-sand px-1">admins</code> table in Supabase, then sign in again.
        </p>
        <button type="button" onClick={signOut} className="btn-primary">
          Sign out
        </button>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen bg-cream">
      {/* Sidebar */}
      <aside className="hidden w-64 shrink-0 flex-col bg-forest-800 p-5 text-cream md:flex">
        <div className="flex items-center gap-2 px-2">
          <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/10">
            <PawIcon className="h-6 w-6 text-white" />
          </span>
          <div>
            <p className="text-sm font-extrabold leading-tight text-white">Maine Coons</p>
            <p className="text-xs text-cream/70">Admin</p>
          </div>
        </div>

        <nav className="mt-8 flex flex-1 flex-col gap-1">
          {nav.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.end}
              className={({ isActive }) =>
                `flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-semibold transition ${
                  isActive ? 'bg-white/15 text-white' : 'text-cream/75 hover:bg-white/10 hover:text-white'
                }`
              }
            >
              {item.icon}
              {item.label}
            </NavLink>
          ))}
        </nav>

        <Link
          to="/"
          className="mt-2 flex items-center gap-2 rounded-xl px-3 py-2.5 text-sm font-semibold text-cream/75 transition hover:bg-white/10 hover:text-white"
        >
          <ArrowRightIcon className="h-5 w-5" /> View live site
        </Link>
        <button
          type="button"
          onClick={signOut}
          className="mt-1 rounded-xl bg-white/10 px-3 py-2.5 text-sm font-semibold text-white transition hover:bg-white/20"
        >
          Sign out
        </button>
      </aside>

      {/* Main */}
      <div className="flex min-w-0 flex-1 flex-col">
        {/* Mobile top bar */}
        <header className="flex items-center justify-between gap-3 border-b border-sand bg-white px-4 py-3 md:hidden">
          <div className="flex items-center gap-2">
            <PawIcon className="h-6 w-6 text-forest-600" />
            <span className="font-extrabold text-forest-800">Admin</span>
          </div>
          <button type="button" onClick={signOut} className="btn-ghost px-3 py-1.5 text-sm">
            Sign out
          </button>
        </header>

        {/* Mobile nav */}
        <nav className="flex gap-1 overflow-x-auto border-b border-sand bg-white px-3 py-2 md:hidden">
          {nav.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.end}
              className={({ isActive }) =>
                `flex shrink-0 items-center gap-2 rounded-lg px-3 py-1.5 text-sm font-semibold ${
                  isActive ? 'bg-forest-50 text-forest-700' : 'text-muted'
                }`
              }
            >
              {item.icon}
              {item.label}
            </NavLink>
          ))}
        </nav>

        <main className="flex-1 overflow-x-hidden p-5 md:p-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
