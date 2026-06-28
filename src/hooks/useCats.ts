import { useEffect, useState } from 'react';
import type { Cat } from '@/types';
import { fetchPublicCats, fetchPublicCatBySlug } from '@/lib/db';

/** Live list of published cats (with loading state) for the public site. */
export function useCats() {
  const [cats, setCats] = useState<Cat[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let active = true;
    fetchPublicCats()
      .then((data) => active && setCats(data))
      .finally(() => active && setLoading(false));
    return () => {
      active = false;
    };
  }, []);

  return { cats, loading };
}

/** Live single cat by slug. `notFound` is true once the lookup completes empty. */
export function useCat(slug: string | undefined) {
  const [cat, setCat] = useState<Cat | undefined>(undefined);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!slug) {
      setLoading(false);
      return;
    }
    let active = true;
    setLoading(true);
    fetchPublicCatBySlug(slug)
      .then((data) => active && setCat(data))
      .finally(() => active && setLoading(false));
    return () => {
      active = false;
    };
  }, [slug]);

  return { cat, loading, notFound: !loading && !cat };
}
