import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from 'react';
import { readStore, writeStore } from './localStorage-utils';

export interface CartItem {
  /** Unique line id: `${catSlug}:${optionId}` (a kitten+option is unique). */
  id: string;
  catSlug: string;
  name: string;
  image: string;
  optionId: string;
  optionLabel: string;
  price: number;
}

interface CartContextValue {
  items: CartItem[];
  count: number;
  total: number;
  add: (item: CartItem) => void;
  remove: (id: string) => void;
  clear: () => void;
  has: (catSlug: string) => boolean;
}

const CartContext = createContext<CartContextValue | undefined>(undefined);
const CART_KEY = 'mcin:cart';

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>(() => readStore<CartItem[]>(CART_KEY, []));

  useEffect(() => {
    writeStore(CART_KEY, items);
  }, [items]);

  const value = useMemo<CartContextValue>(() => {
    const add = (item: CartItem) =>
      setItems((prev) => {
        // A specific kitten can only be in the cart once — replace if re-added.
        const withoutCat = prev.filter((i) => i.catSlug !== item.catSlug);
        return [...withoutCat, item];
      });
    const remove = (id: string) => setItems((prev) => prev.filter((i) => i.id !== id));
    const clear = () => setItems([]);
    const has = (catSlug: string) => items.some((i) => i.catSlug === catSlug);
    return {
      items,
      count: items.length,
      total: items.reduce((sum, i) => sum + i.price, 0),
      add,
      remove,
      clear,
      has,
    };
  }, [items]);

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart(): CartContextValue {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error('useCart must be used within CartProvider');
  return ctx;
}

// --- Purchase option helpers ----------------------------------------------

export interface PurchaseOption {
  id: string;
  label: string;
  price: number;
  note?: string;
}

export const RESERVE_DEPOSIT = 200;
export const BREEDING_RIGHTS_ADDON = 500;
export const WARRANTY_ADDON = 500;

interface PricedCat {
  adoptionFee: number;
  reservePrice?: number;
  breedingPrice?: number;
  warrantyPrice?: number;
}

/**
 * Build the purchase options for a kitten. Uses the per-kitten prices set in the
 * admin dashboard when provided (> 0), otherwise sensible defaults.
 */
export function buildPurchaseOptions(cat: PricedCat): PurchaseOption[] {
  const base = cat.adoptionFee;
  const reserve = cat.reservePrice && cat.reservePrice > 0 ? cat.reservePrice : RESERVE_DEPOSIT;
  const breeding =
    cat.breedingPrice && cat.breedingPrice > 0 ? cat.breedingPrice : base + BREEDING_RIGHTS_ADDON;
  const warranty =
    cat.warrantyPrice && cat.warrantyPrice > 0 ? cat.warrantyPrice : base + WARRANTY_ADDON;
  return [
    { id: 'reserve', label: 'Reserve', price: reserve, note: 'deposit, rest on pickup' },
    { id: 'full', label: 'Full Payment', price: base },
    { id: 'breeding', label: 'Add breeding rights', price: breeding },
    { id: 'warranty', label: 'Extend health warranty 6 → 12 months', price: warranty },
  ];
}

export const formatPrice = (n: number) =>
  n.toLocaleString('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 });
