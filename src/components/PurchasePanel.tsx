import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import type { Cat } from '@/types';
import { useCart, buildPurchaseOptions, formatPrice } from '@/lib/cart';
import PaymentBadges from './PaymentBadges';
import { CartIcon, CheckIcon, WhatsAppIcon, ShieldIcon, TruckIcon } from './Icons';
import { site } from '@/data/site';

export default function PurchasePanel({ cat }: { cat: Cat }) {
  const { add, has } = useCart();
  const options = buildPurchaseOptions(cat.adoptionFee);
  const [selected, setSelected] = useState(options[1].id); // default: Full Payment
  const inCart = has(cat.id);

  const sold = cat.status === 'Adopted';
  const chosen = options.find((o) => o.id === selected) ?? options[1];

  const addToCart = () => {
    add({
      id: `${cat.id}:${chosen.id}`,
      catSlug: cat.id,
      name: cat.name,
      image: cat.images[0] ?? '',
      optionId: chosen.id,
      optionLabel: chosen.label,
      price: chosen.price,
    });
  };

  const waMessage = encodeURIComponent(
    `Hi! I'm interested in ${cat.name} (${chosen.label} — ${formatPrice(chosen.price)}). Could you send me a quote?`,
  );
  const waHref = site.whatsapp
    ? `https://wa.me/${site.whatsapp}?text=${waMessage}`
    : '/contact';

  return (
    <div className="card overflow-hidden">
      <div className="p-6">
        <p className="text-center text-4xl font-extrabold text-forest-800">
          {formatPrice(cat.adoptionFee)}
        </p>

        <p className="mt-5 text-sm font-bold text-forest-800">
          Purchase options: <span className="text-ember">*</span>
        </p>
        <div className="mt-3 space-y-2">
          {options.map((o) => {
            const active = selected === o.id;
            return (
              <button
                key={o.id}
                type="button"
                disabled={sold}
                onClick={() => setSelected(o.id)}
                className={`flex w-full items-center gap-3 rounded-2xl border-2 px-4 py-3 text-left transition ${
                  active ? 'border-forest bg-forest-50' : 'border-sand hover:border-forest/40'
                } ${sold ? 'cursor-not-allowed opacity-60' : ''}`}
              >
                <span
                  className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-full border-2 ${
                    active ? 'border-forest bg-forest text-white' : 'border-muted/50'
                  }`}
                >
                  {active && <CheckIcon className="h-3 w-3" />}
                </span>
                <span className="min-w-0 flex-1">
                  <span className="font-semibold text-forest-800">{o.label}</span>
                  {o.note && <span className="ml-1 text-xs text-muted">({o.note})</span>}
                </span>
                <span className="shrink-0 font-bold text-ember">{formatPrice(o.price)}</span>
              </button>
            );
          })}
        </div>

        {sold ? (
          <div className="mt-5 rounded-2xl bg-sky-50 px-4 py-3 text-center text-sm font-semibold text-sky-700">
            {cat.name} has found a forever home.
          </div>
        ) : inCart ? (
          <Link to="/cart" className="btn-primary mt-5 w-full text-base">
            <CartIcon className="h-5 w-5" /> In cart — View cart
          </Link>
        ) : (
          <motion.button
            type="button"
            whileTap={{ scale: 0.98 }}
            onClick={addToCart}
            className="btn-accent mt-5 w-full text-base"
          >
            <CartIcon className="h-5 w-5" /> Add to Cart
          </motion.button>
        )}

        <PaymentBadges className="mt-4 justify-center" />
      </div>

      {/* Delivery options */}
      <div className="border-t border-sand bg-sand/30 p-6">
        <h3 className="flex items-center gap-2 text-sm font-extrabold text-forest-800">
          <TruckIcon className="h-5 w-5 text-forest-600" /> Delivery options
        </h3>
        <p className="mt-1 text-sm text-muted">
          Nationwide delivery available. Get a personalised quote for your location.
        </p>
        <a
          href={waHref}
          target={site.whatsapp ? '_blank' : undefined}
          rel="noopener noreferrer"
          className="mt-3 inline-flex w-full items-center justify-center gap-2 rounded-full bg-[#25D366] px-5 py-3 text-sm font-bold text-white transition hover:brightness-95"
        >
          <WhatsAppIcon className="h-5 w-5" /> Get quote via WhatsApp
        </a>
        <p className="mt-3 flex items-center justify-center gap-1.5 text-xs text-muted">
          <ShieldIcon className="h-4 w-4 text-forest-500" /> Health-guaranteed · vet-checked · raised at home
        </p>
      </div>
    </div>
  );
}
