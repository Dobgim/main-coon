import { supabase, CAT_IMAGES_BUCKET } from './supabase';
import { cats as seedCats } from '@/data/cats';
import type { Cat, AgeGroup, CatGender, CatStatus } from '@/types';

/** Shape of a row in the `cats` table (snake_case). */
export interface CatRow {
  id: string;
  slug: string;
  name: string;
  age_label: string;
  age_group: AgeGroup;
  gender: CatGender;
  color: string;
  location: string;
  region: string;
  status: CatStatus;
  neutered: boolean;
  vaccinated: boolean;
  vet_checked: boolean;
  microchipped: boolean;
  good_with_children: boolean;
  good_with_cats: boolean;
  good_with_dogs: boolean;
  indoor_only: boolean;
  adoption_fee: number;
  reserve_price: number;
  breeding_price: number;
  warranty_price: number;
  coordinator_name: string;
  coordinator_email: string;
  coordinator_phone: string;
  personality: string[];
  short_description: string;
  story: string;
  images: string[];
  published: boolean;
  created_at: string;
}

/** Editable cat fields used by the admin form. `id` is the row uuid (edit only). */
export interface CatInput {
  id?: string;
  slug: string;
  name: string;
  ageLabel: string;
  ageGroup: AgeGroup;
  gender: CatGender;
  color: string;
  location: string;
  region: string;
  status: CatStatus;
  neutered: boolean;
  vaccinated: boolean;
  vetChecked: boolean;
  microchipped: boolean;
  goodWithChildren: boolean;
  goodWithCats: boolean;
  goodWithDogs: boolean;
  indoorOnly: boolean;
  adoptionFee: number;
  reservePrice: number;
  breedingPrice: number;
  warrantyPrice: number;
  coordinatorName: string;
  coordinatorEmail: string;
  coordinatorPhone: string;
  personality: string[];
  shortDescription: string;
  story: string;
  images: string[];
  published: boolean;
}

/** A Cat with its admin metadata (db uuid + publish flag) attached. */
export interface AdminCat extends Cat {
  rowId: string;
  published: boolean;
  createdAt: string;
}

const rowToAdminCat = (r: CatRow): AdminCat => ({
  rowId: r.id,
  id: r.slug, // public URLs use the slug
  name: r.name,
  ageLabel: r.age_label,
  ageGroup: r.age_group,
  gender: r.gender,
  color: r.color,
  location: r.location,
  region: r.region,
  status: r.status,
  neutered: r.neutered,
  vaccinated: r.vaccinated,
  vetChecked: r.vet_checked,
  microchipped: r.microchipped,
  goodWithChildren: r.good_with_children,
  goodWithCats: r.good_with_cats,
  goodWithDogs: r.good_with_dogs,
  indoorOnly: r.indoor_only,
  adoptionFee: Number(r.adoption_fee),
  reservePrice: Number(r.reserve_price ?? 0),
  breedingPrice: Number(r.breeding_price ?? 0),
  warrantyPrice: Number(r.warranty_price ?? 0),
  coordinator: {
    name: r.coordinator_name,
    email: r.coordinator_email,
    phone: r.coordinator_phone,
  },
  personality: r.personality ?? [],
  shortDescription: r.short_description,
  story: r.story,
  images: r.images ?? [],
  published: r.published,
  createdAt: r.created_at,
});

const inputToRow = (c: CatInput) => ({
  slug: c.slug,
  name: c.name,
  age_label: c.ageLabel,
  age_group: c.ageGroup,
  gender: c.gender,
  color: c.color,
  location: c.location,
  region: c.region,
  status: c.status,
  neutered: c.neutered,
  vaccinated: c.vaccinated,
  vet_checked: c.vetChecked,
  microchipped: c.microchipped,
  good_with_children: c.goodWithChildren,
  good_with_cats: c.goodWithCats,
  good_with_dogs: c.goodWithDogs,
  indoor_only: c.indoorOnly,
  adoption_fee: c.adoptionFee,
  reserve_price: c.reservePrice,
  breeding_price: c.breedingPrice,
  warranty_price: c.warrantyPrice,
  coordinator_name: c.coordinatorName,
  coordinator_email: c.coordinatorEmail,
  coordinator_phone: c.coordinatorPhone,
  personality: c.personality,
  short_description: c.shortDescription,
  story: c.story,
  images: c.images,
  published: c.published,
});

export const slugify = (value: string): string =>
  value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .slice(0, 60) || 'cat';

// ---------------------------------------------------------------------------
// PUBLIC READS (used by the customer-facing site)
// ---------------------------------------------------------------------------

/**
 * Fetch published cats for the public site. If Supabase is unreachable we fall
 * back to the bundled demo data so the site is never blank.
 */
export async function fetchPublicCats(): Promise<Cat[]> {
  const { data, error } = await supabase
    .from('cats')
    .select('*')
    .eq('published', true)
    .order('created_at', { ascending: false });

  if (error || !data) {
    console.warn('[db] falling back to seed cats:', error?.message);
    return seedCats;
  }
  return (data as CatRow[]).map(rowToAdminCat);
}

export async function fetchPublicCatBySlug(slug: string): Promise<Cat | undefined> {
  const { data, error } = await supabase
    .from('cats')
    .select('*')
    .eq('slug', slug)
    .eq('published', true)
    .maybeSingle();

  if (error) {
    return seedCats.find((c) => c.id === slug);
  }
  return data ? rowToAdminCat(data as CatRow) : undefined;
}

// ---------------------------------------------------------------------------
// ADMIN READS / WRITES (require an authenticated admin via RLS)
// ---------------------------------------------------------------------------

export async function fetchAllCats(): Promise<AdminCat[]> {
  const { data, error } = await supabase
    .from('cats')
    .select('*')
    .order('created_at', { ascending: false });
  if (error) throw error;
  return (data as CatRow[]).map(rowToAdminCat);
}

export async function fetchCatByRowId(rowId: string): Promise<AdminCat | null> {
  const { data, error } = await supabase.from('cats').select('*').eq('id', rowId).maybeSingle();
  if (error) throw error;
  return data ? rowToAdminCat(data as CatRow) : null;
}

export async function createCat(input: CatInput): Promise<void> {
  const { error } = await supabase.from('cats').insert(inputToRow(input));
  if (error) throw error;
}

export async function updateCat(rowId: string, input: CatInput): Promise<void> {
  const { error } = await supabase.from('cats').update(inputToRow(input)).eq('id', rowId);
  if (error) throw error;
}

export async function deleteCat(rowId: string): Promise<void> {
  const { error } = await supabase.from('cats').delete().eq('id', rowId);
  if (error) throw error;
}

/** Upload one image file to storage and return its public URL. */
export async function uploadCatImage(file: File, slug: string): Promise<string> {
  const ext = file.name.split('.').pop()?.toLowerCase() || 'jpg';
  const path = `${slug || 'cat'}/${Date.now()}-${Math.random().toString(36).slice(2, 8)}.${ext}`;
  const { error } = await supabase.storage
    .from(CAT_IMAGES_BUCKET)
    .upload(path, file, { cacheControl: '3600', upsert: false });
  if (error) throw error;
  const { data } = supabase.storage.from(CAT_IMAGES_BUCKET).getPublicUrl(path);
  return data.publicUrl;
}

/** One-time helper: import the bundled demo cats into an empty table. */
export async function importSeedCats(): Promise<number> {
  const rows = seedCats.map((c, i) => ({
    slug: c.id,
    name: c.name,
    age_label: c.ageLabel,
    age_group: c.ageGroup,
    gender: c.gender,
    color: c.color,
    location: c.location,
    region: c.region,
    status: c.status,
    neutered: c.neutered,
    vaccinated: c.vaccinated,
    vet_checked: c.vetChecked,
    microchipped: c.microchipped,
    good_with_children: c.goodWithChildren,
    good_with_cats: c.goodWithCats,
    good_with_dogs: c.goodWithDogs,
    indoor_only: c.indoorOnly,
    adoption_fee: c.adoptionFee,
    reserve_price: 0,
    breeding_price: 0,
    warranty_price: 0,
    coordinator_name: c.coordinator.name,
    coordinator_email: c.coordinator.email,
    coordinator_phone: c.coordinator.phone,
    personality: c.personality,
    short_description: c.shortDescription,
    story: c.story,
    images: c.images,
    published: true,
    // stagger timestamps so the original order is preserved
    created_at: new Date(Date.now() - (seedCats.length - i) * 1000).toISOString(),
  }));
  const { error } = await supabase.from('cats').upsert(rows, { onConflict: 'slug' });
  if (error) throw error;
  return rows.length;
}

// ---------------------------------------------------------------------------
// FORM SUBMISSIONS (public insert)
// ---------------------------------------------------------------------------

export interface OrderItemInput {
  catSlug: string;
  name: string;
  optionId: string;
  optionLabel: string;
  price: number;
}

export async function createOrder(o: {
  customerName: string;
  email: string;
  phone: string;
  address: string;
  notes: string;
  items: OrderItemInput[];
  total: number;
}): Promise<void> {
  const { error } = await supabase.from('orders').insert({
    customer_name: o.customerName,
    email: o.email,
    phone: o.phone,
    address: o.address,
    notes: o.notes,
    items: o.items,
    total: o.total,
  });
  if (error) throw error;
}

export async function submitContact(m: {
  name: string; email: string; phone: string; subject: string; message: string;
}): Promise<void> {
  const { error } = await supabase.from('contact_messages').insert(m);
  if (error) throw error;
}

export async function submitAdoption(a: {
  catId: string; catName: string; name: string; email: string; phone: string;
  address: string; homeType: string; hasChildren: string; hasPets: string; experience: string;
}): Promise<void> {
  const { error } = await supabase.from('adoption_applications').insert({
    cat_id: a.catId,
    cat_name: a.catName,
    name: a.name,
    email: a.email,
    phone: a.phone,
    address: a.address,
    home_type: a.homeType,
    has_children: a.hasChildren,
    has_pets: a.hasPets,
    experience: a.experience,
  });
  if (error) throw error;
}

export async function submitDonation(d: {
  amount: number; frequency: string; method: string;
}): Promise<void> {
  const { error } = await supabase.from('donations').insert(d);
  if (error) throw error;
}

export async function submitNewsletter(email: string): Promise<void> {
  const { error } = await supabase.from('newsletter_subscribers').insert({ email });
  if (error) throw error;
}

export async function submitStory(s: {
  name: string; catName: string; message: string;
}): Promise<void> {
  const { error } = await supabase.from('stories').insert({
    name: s.name,
    cat_name: s.catName,
    message: s.message,
  });
  if (error) throw error;
}
