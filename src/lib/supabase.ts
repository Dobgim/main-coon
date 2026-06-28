import { createClient } from '@supabase/supabase-js';

/**
 * Supabase client.
 *
 * The values below are read from Vite env vars when present, with a fallback to
 * the project's public credentials. The ANON key is *designed* to be exposed in
 * the browser bundle — it is safe to ship because every table is protected by
 * Row Level Security (see supabase/schema.sql). Never put the `service_role`
 * key in this file.
 *
 * To override (e.g. for a different environment) set in a `.env` file or in your
 * Vercel project settings:
 *   VITE_SUPABASE_URL=...
 *   VITE_SUPABASE_ANON_KEY=...
 */
const SUPABASE_URL =
  import.meta.env.VITE_SUPABASE_URL ?? 'https://joptdavvszvekkqwmbau.supabase.co';

const SUPABASE_ANON_KEY =
  import.meta.env.VITE_SUPABASE_ANON_KEY ??
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImpvcHRkYXZ2c3p2ZWtrcXdtYmF1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODI2MzgwNTIsImV4cCI6MjA5ODIxNDA1Mn0.v9khM9JGgOi-HyjgEX6NzP5CUjgIgp8LC2seoeYvIMw';

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY, {
  auth: {
    persistSession: true,
    autoRefreshToken: true,
  },
});

/** Storage bucket that holds uploaded cat photos. */
export const CAT_IMAGES_BUCKET = 'cat-images';
