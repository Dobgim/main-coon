-- =============================================================================
-- Maine Coons in Need — Supabase schema
-- =============================================================================
-- HOW TO USE:
--   1. Open your Supabase project -> SQL Editor -> New query.
--   2. Paste this ENTIRE file and click "Run".  It is safe to run more than once.
--   3. Create your admin login: Authentication -> Users -> "Add user"
--      (enter your email + a password, tick "Auto Confirm User").
--   4. Make that user an admin by running (replace the email):
--        insert into public.admins (user_id)
--        select id from auth.users where email = 'you@example.com'
--        on conflict do nothing;
--   5. Log in at  https://your-domain/admin
-- =============================================================================

-- ---------- CATS / PRODUCTS ---------------------------------------------------
create table if not exists public.cats (
  id                  uuid primary key default gen_random_uuid(),
  slug                text unique not null,
  name                text not null,
  age_label           text not null default '',
  age_group           text not null default 'Young',
  gender              text not null default 'Male',
  color               text not null default '',
  location            text not null default '',
  region              text not null default '',
  status              text not null default 'Available',
  neutered            boolean not null default true,
  vaccinated          boolean not null default true,
  vet_checked         boolean not null default true,
  microchipped        boolean not null default true,
  good_with_children  boolean not null default true,
  good_with_cats      boolean not null default true,
  good_with_dogs      boolean not null default false,
  indoor_only         boolean not null default false,
  adoption_fee        numeric not null default 0,
  coordinator_name    text not null default '',
  coordinator_email   text not null default '',
  coordinator_phone   text not null default '',
  personality         text[] not null default '{}',
  short_description   text not null default '',
  story               text not null default '',
  images              text[] not null default '{}',
  published           boolean not null default true,
  created_at          timestamptz not null default now()
);
create index if not exists cats_created_at_idx on public.cats (created_at desc);

-- Per-kitten purchase pricing (added later; safe to re-run).
alter table public.cats add column if not exists reserve_price  numeric not null default 0;
alter table public.cats add column if not exists breeding_price numeric not null default 0;
alter table public.cats add column if not exists warranty_price numeric not null default 0;

-- Per-kitten videos (added later; safe to re-run).
alter table public.cats add column if not exists videos text[] not null default '{}';

-- ---------- FORM SUBMISSIONS --------------------------------------------------
create table if not exists public.contact_messages (
  id          uuid primary key default gen_random_uuid(),
  name        text not null,
  email       text not null,
  phone       text default '',
  subject     text default '',
  message     text not null,
  handled     boolean not null default false,
  created_at  timestamptz not null default now()
);

create table if not exists public.adoption_applications (
  id            uuid primary key default gen_random_uuid(),
  cat_id        text default '',
  cat_name      text default '',
  name          text not null,
  email         text not null,
  phone         text default '',
  address       text default '',
  home_type     text default '',
  has_children  text default '',
  has_pets      text default '',
  experience    text default '',
  status        text not null default 'New',
  created_at    timestamptz not null default now()
);

create table if not exists public.donations (
  id          uuid primary key default gen_random_uuid(),
  amount      numeric not null default 0,
  frequency   text default 'one-time',
  method      text default '',
  created_at  timestamptz not null default now()
);

create table if not exists public.newsletter_subscribers (
  id          uuid primary key default gen_random_uuid(),
  email       text not null,
  created_at  timestamptz not null default now()
);

create table if not exists public.stories (
  id          uuid primary key default gen_random_uuid(),
  name        text not null,
  cat_name    text default '',
  message     text not null,
  approved    boolean not null default false,
  created_at  timestamptz not null default now()
);

create table if not exists public.orders (
  id             uuid primary key default gen_random_uuid(),
  customer_name  text not null,
  email          text not null,
  phone          text default '',
  address        text default '',
  notes          text default '',
  items          jsonb not null default '[]',
  total          numeric not null default 0,
  status         text not null default 'New',
  created_at     timestamptz not null default now()
);

-- ---------- ADMINS ALLOWLIST --------------------------------------------------
-- A user is treated as an admin only if their auth id appears here.
create table if not exists public.admins (
  user_id    uuid primary key references auth.users (id) on delete cascade,
  created_at timestamptz not null default now()
);

create or replace function public.is_admin()
returns boolean
language sql
security definer
set search_path = public
as $$
  select exists (select 1 from public.admins a where a.user_id = auth.uid());
$$;

-- =============================================================================
-- ROW LEVEL SECURITY
-- =============================================================================
alter table public.cats                   enable row level security;
alter table public.contact_messages       enable row level security;
alter table public.adoption_applications  enable row level security;
alter table public.donations              enable row level security;
alter table public.newsletter_subscribers enable row level security;
alter table public.stories                enable row level security;
alter table public.orders                 enable row level security;
alter table public.admins                 enable row level security;

-- CATS: everyone can read published cats; admins can do everything.
drop policy if exists "cats public read"  on public.cats;
drop policy if exists "cats admin all"    on public.cats;
create policy "cats public read" on public.cats
  for select using (published = true or public.is_admin());
create policy "cats admin all" on public.cats
  for all using (public.is_admin()) with check (public.is_admin());

-- SUBMISSIONS: anyone can insert (submit a form); only admins can read/manage.
do $$
declare t text;
begin
  foreach t in array array[
    'contact_messages','adoption_applications','donations',
    'newsletter_subscribers','stories','orders'
  ] loop
    execute format('drop policy if exists "%s insert" on public.%I', t, t);
    execute format('drop policy if exists "%s admin"  on public.%I', t, t);
    execute format(
      'create policy "%s insert" on public.%I for insert with check (true)', t, t);
    execute format(
      'create policy "%s admin" on public.%I for all using (public.is_admin()) with check (public.is_admin())',
      t, t);
  end loop;
end $$;

-- ADMINS: a signed-in user may check whether *they* are an admin.
drop policy if exists "admins read self" on public.admins;
create policy "admins read self" on public.admins
  for select using (user_id = auth.uid());

-- ---------- BOOTSTRAP ADMIN ACCOUNT ------------------------------------------
-- This email is automatically granted admin access, whether the user is created
-- before or after this script runs. Change the email if you want a different login.
create or replace function public.handle_new_admin()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  if new.email = 'royalmainecoonkitten159@gmail.com' then
    insert into public.admins (user_id) values (new.id) on conflict do nothing;
  end if;
  return new;
end $$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_admin();

-- Grant now if the account already exists.
insert into public.admins (user_id)
select id from auth.users where email = 'royalmainecoonkitten159@gmail.com'
on conflict do nothing;

-- =============================================================================
-- STORAGE — public bucket for cat photos
-- =============================================================================
-- The bucket holds both photos and videos. Raise the per-file size limit to
-- 200MB so phone videos fit (NOTE: this cannot exceed your project's global
-- limit under Storage -> Settings -> "Upload file size limit" — raise that too
-- if your clips are larger). allowed_mime_types = null means all types allowed.
insert into storage.buckets (id, name, public, file_size_limit)
values ('cat-images', 'cat-images', true, 209715200)
on conflict (id) do update set public = true, file_size_limit = 209715200;

drop policy if exists "cat images public read"   on storage.objects;
drop policy if exists "cat images admin write"    on storage.objects;
drop policy if exists "cat images admin update"   on storage.objects;
drop policy if exists "cat images admin delete"   on storage.objects;

create policy "cat images public read" on storage.objects
  for select using (bucket_id = 'cat-images');
create policy "cat images admin write" on storage.objects
  for insert with check (bucket_id = 'cat-images' and public.is_admin());
create policy "cat images admin update" on storage.objects
  for update using (bucket_id = 'cat-images' and public.is_admin());
create policy "cat images admin delete" on storage.objects
  for delete using (bucket_id = 'cat-images' and public.is_admin());
