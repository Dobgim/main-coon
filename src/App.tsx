import { lazy, Suspense } from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import ScrollToTop from './components/ScrollToTop';
import PageLoader from './components/PageLoader';
import LiveChat from './components/LiveChat';
import { CartProvider } from './lib/cart';

// Admin dashboard is fully isolated (its own chrome, no public header/footer).
const AdminApp = lazy(() => import('./admin/AdminApp'));

// Route-level code splitting — each page is its own chunk.
const Home = lazy(() => import('./pages/Home'));
const About = lazy(() => import('./pages/About'));
const Cats = lazy(() => import('./pages/Cats'));
const CatDetail = lazy(() => import('./pages/CatDetail'));
const Rehomed = lazy(() => import('./pages/Rehomed'));
const Help = lazy(() => import('./pages/Help'));
const Donate = lazy(() => import('./pages/Donate'));
const Contact = lazy(() => import('./pages/Contact'));
const Cart = lazy(() => import('./pages/Cart'));
const Checkout = lazy(() => import('./pages/Checkout'));
const Privacy = lazy(() => import('./pages/Privacy'));
const Terms = lazy(() => import('./pages/Terms'));
const NotFound = lazy(() => import('./pages/NotFound'));

export default function App() {
  const { pathname } = useLocation();

  // The admin dashboard renders without the public site header/footer.
  if (pathname.startsWith('/admin')) {
    return (
      <Suspense fallback={<PageLoader />}>
        <AdminApp />
      </Suspense>
    );
  }

  return (
    <CartProvider>
      <div className="flex min-h-screen flex-col bg-cream">
        <ScrollToTop />
        <Header />
        <main id="main" className="flex-1">
          <Suspense fallback={<PageLoader />}>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<About />} />
              <Route path="/cats" element={<Cats />} />
              <Route path="/cats/:id" element={<CatDetail />} />
              <Route path="/rehomed" element={<Rehomed />} />
              <Route path="/help" element={<Help />} />
              <Route path="/donate" element={<Donate />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/cart" element={<Cart />} />
              <Route path="/checkout" element={<Checkout />} />
              <Route path="/privacy" element={<Privacy />} />
              <Route path="/terms" element={<Terms />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </Suspense>
        </main>
        <Footer />
        <LiveChat />
      </div>
    </CartProvider>
  );
}
