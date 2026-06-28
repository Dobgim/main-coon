import { Link } from 'react-router-dom';
import { useCart, formatPrice } from '@/lib/cart';
import PaymentBadges from '@/components/PaymentBadges';
import { CartIcon, TrashIcon, ArrowRightIcon } from '@/components/Icons';

export default function Cart() {
  const { items, remove, total, count } = useCart();

  if (count === 0) {
    return (
      <div className="container-page flex min-h-[60vh] flex-col items-center justify-center gap-4 py-16 text-center">
        <CartIcon className="h-14 w-14 text-forest-300" />
        <h1 className="text-3xl font-extrabold text-forest-800">Your cart is empty</h1>
        <p className="max-w-md text-muted">
          Browse our available kittens and reserve your new companion.
        </p>
        <Link to="/cats" className="btn-primary">
          Browse kittens <ArrowRightIcon className="h-5 w-5" />
        </Link>
      </div>
    );
  }

  return (
    <div className="container-page py-12 md:py-16">
      <h1 className="text-3xl font-extrabold text-forest-800">Your Cart</h1>
      <p className="mt-1 text-muted">{count} {count === 1 ? 'kitten' : 'kittens'} reserved for you</p>

      <div className="mt-8 grid gap-8 lg:grid-cols-[1fr_360px]">
        {/* Items */}
        <div className="space-y-4">
          {items.map((item) => (
            <div key={item.id} className="card flex items-center gap-4 p-4">
              <img
                src={item.image || 'https://placehold.co/100x100?text=Cat'}
                alt={item.name}
                className="h-20 w-20 shrink-0 rounded-2xl object-cover"
              />
              <div className="min-w-0 flex-1">
                <Link to={`/cats/${item.catSlug}`} className="font-extrabold text-forest-800 hover:underline">
                  {item.name}
                </Link>
                <p className="text-sm text-muted">{item.optionLabel}</p>
              </div>
              <p className="shrink-0 font-bold text-forest-800">{formatPrice(item.price)}</p>
              <button
                type="button"
                onClick={() => remove(item.id)}
                aria-label={`Remove ${item.name}`}
                className="shrink-0 rounded-full p-2 text-muted transition hover:bg-red-50 hover:text-red-600"
              >
                <TrashIcon className="h-5 w-5" />
              </button>
            </div>
          ))}
          <Link to="/cats" className="inline-flex items-center gap-1 text-sm font-semibold text-forest-600 hover:underline">
            ← Continue browsing
          </Link>
        </div>

        {/* Summary */}
        <aside className="lg:sticky lg:top-24 lg:self-start">
          <div className="card p-6">
            <h2 className="text-lg font-extrabold text-forest-800">Order summary</h2>
            <dl className="mt-4 space-y-2 text-sm">
              {items.map((item) => (
                <div key={item.id} className="flex justify-between gap-3">
                  <dt className="text-muted">{item.name} — {item.optionLabel}</dt>
                  <dd className="font-semibold text-forest-800">{formatPrice(item.price)}</dd>
                </div>
              ))}
            </dl>
            <div className="mt-4 flex items-center justify-between border-t border-sand pt-4">
              <span className="font-bold text-forest-800">Total</span>
              <span className="text-xl font-extrabold text-ember">{formatPrice(total)}</span>
            </div>
            <Link to="/checkout" className="btn-accent mt-5 w-full text-base">
              Proceed to Checkout <ArrowRightIcon className="h-5 w-5" />
            </Link>
            <PaymentBadges className="mt-4 justify-center" />
          </div>
        </aside>
      </div>
    </div>
  );
}
