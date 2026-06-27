/**
 * Tiny typed localStorage helpers used to persist form submissions and the
 * favourites list. Everything is wrapped in try/catch so private-mode or
 * storage-full errors never crash the UI.
 */

const safeParse = <T>(raw: string | null, fallback: T): T => {
  if (!raw) return fallback;
  try {
    return JSON.parse(raw) as T;
  } catch {
    return fallback;
  }
};

export function readStore<T>(key: string, fallback: T): T {
  if (typeof window === 'undefined') return fallback;
  return safeParse<T>(window.localStorage.getItem(key), fallback);
}

export function writeStore<T>(key: string, value: T): void {
  if (typeof window === 'undefined') return;
  try {
    window.localStorage.setItem(key, JSON.stringify(value));
  } catch {
    /* storage unavailable — fail silently */
  }
}

/** Append a timestamped record to a list stored under `key`. */
export function appendSubmission<T extends object>(key: string, record: T): void {
  const existing = readStore<Array<T & { submittedAt: string }>>(key, []);
  existing.push({ ...record, submittedAt: new Date().toISOString() });
  writeStore(key, existing);
}

// --- Favourites (wishlist) ------------------------------------------------
const FAV_KEY = 'mcin:favourites';

export const getFavourites = (): string[] => readStore<string[]>(FAV_KEY, []);

export function toggleFavourite(id: string): string[] {
  const current = getFavourites();
  const next = current.includes(id)
    ? current.filter((x) => x !== id)
    : [...current, id];
  writeStore(FAV_KEY, next);
  return next;
}
