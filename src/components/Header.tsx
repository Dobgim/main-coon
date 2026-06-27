import { useEffect, useState } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import Logo from './Logo';
import { HeartIcon } from './Icons';
import { navLinks } from '@/data/site';

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();

  // Shrink + add shadow once the user scrolls past the hero edge.
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Close the mobile menu whenever the route changes.
  useEffect(() => setMenuOpen(false), [location.pathname]);

  // Lock body scroll while the mobile menu is open.
  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [menuOpen]);

  const navItemClass = ({ isActive }: { isActive: boolean }) =>
    [
      'relative rounded-full px-3 py-2 text-sm font-semibold transition-all duration-200',
      'hover:scale-[1.03] hover:text-ember',
      isActive ? 'text-ember' : 'text-forest-800',
    ].join(' ');

  return (
    <header
      className={[
        'sticky top-0 z-50 w-full transition-all duration-300',
        scrolled
          ? 'bg-cream/90 shadow-soft backdrop-blur supports-[backdrop-filter]:bg-cream/75'
          : 'bg-cream/60 backdrop-blur',
      ].join(' ')}
    >
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-3 focus:z-50 focus:rounded-full focus:bg-forest focus:px-4 focus:py-2 focus:text-white"
      >
        Skip to content
      </a>

      <div className="container-page flex h-16 items-center justify-between gap-4 md:h-20">
        <Link to="/" aria-label="Maine Coons in Need — home" className="shrink-0">
          <Logo />
        </Link>

        {/* Desktop nav */}
        <nav className="hidden items-center gap-1 lg:flex" aria-label="Primary">
          {navLinks.map((link) => (
            <NavLink key={link.to} to={link.to} end={link.to === '/'} className={navItemClass}>
              {({ isActive }) => (
                <>
                  {link.label}
                  {isActive && (
                    <motion.span
                      layoutId="nav-underline"
                      className="absolute inset-x-3 -bottom-0.5 h-0.5 rounded-full bg-ember"
                    />
                  )}
                </>
              )}
            </NavLink>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <motion.div
            className="hidden sm:block"
            animate={{ scale: [1, 1.04, 1] }}
            transition={{ duration: 2.4, repeat: Infinity, ease: 'easeInOut' }}
          >
            <Link
              to="/donate"
              className="btn-accent inline-flex items-center gap-2 shadow-glow"
              aria-label="Donate now"
            >
              <HeartIcon className="h-4 w-4" filled /> Donate Now
            </Link>
          </motion.div>

          {/* Hamburger */}
          <button
            type="button"
            onClick={() => setMenuOpen((v) => !v)}
            className="inline-flex h-11 w-11 items-center justify-center rounded-full text-forest-800 hover:bg-forest-50 lg:hidden"
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
          >
            <Burger open={menuOpen} />
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {menuOpen && (
          <>
            <motion.div
              className="fixed inset-0 z-40 bg-ink/40 lg:hidden"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMenuOpen(false)}
            />
            <motion.div
              id="mobile-menu"
              className="fixed right-0 top-0 z-50 flex h-full w-[82%] max-w-sm flex-col bg-cream p-6 shadow-lift lg:hidden"
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', stiffness: 320, damping: 34 }}
            >
              <div className="mb-8 flex items-center justify-between">
                <Logo />
                <button
                  type="button"
                  onClick={() => setMenuOpen(false)}
                  aria-label="Close menu"
                  className="inline-flex h-11 w-11 items-center justify-center rounded-full hover:bg-forest-50"
                >
                  <Burger open />
                </button>
              </div>

              <nav className="flex flex-col gap-1" aria-label="Mobile">
                {navLinks.map((link, i) => (
                  <motion.div
                    key={link.to}
                    initial={{ opacity: 0, x: 24 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.05 * i + 0.1 }}
                  >
                    <NavLink
                      to={link.to}
                      end={link.to === '/'}
                      className={({ isActive }) =>
                        [
                          'block rounded-2xl px-4 py-3 text-base font-semibold transition',
                          isActive
                            ? 'bg-forest-50 text-ember'
                            : 'text-forest-800 hover:bg-forest-50',
                        ].join(' ')
                      }
                    >
                      {link.label}
                    </NavLink>
                  </motion.div>
                ))}
              </nav>

              <Link to="/donate" className="btn-accent mt-6 inline-flex w-full items-center justify-center gap-2">
                <HeartIcon className="h-4 w-4" filled /> Donate Now
              </Link>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </header>
  );
}

function Burger({ open }: { open: boolean }) {
  return (
    <div className="relative h-5 w-6">
      <span
        className={`absolute left-0 h-0.5 w-6 rounded-full bg-current transition-all duration-300 ${
          open ? 'top-2 rotate-45' : 'top-0'
        }`}
      />
      <span
        className={`absolute left-0 top-2 h-0.5 w-6 rounded-full bg-current transition-all duration-300 ${
          open ? 'opacity-0' : 'opacity-100'
        }`}
      />
      <span
        className={`absolute left-0 h-0.5 w-6 rounded-full bg-current transition-all duration-300 ${
          open ? 'top-2 -rotate-45' : 'top-4'
        }`}
      />
    </div>
  );
}
