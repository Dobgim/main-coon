-- =============================================================================
-- Invoices — Run this in Supabase SQL Editor (safe to re-run)
-- =============================================================================
-- Creates an `invoices` table with auto-incrementing invoice numbers,
-- linked to orders. Clients can view their invoice via a public URL
-- (secured by the unguessable UUID). Admins can update status (Pending → Paid).
-- =============================================================================

-- Sequence for human-readable invoice numbers (INV-001000, INV-001001, …)
create sequence if not exists public.invoice_number_seq start with 1000;

create table if not exists public.invoices (
  id              uuid primary key default gen_random_uuid(),
  invoice_number  text unique not null
    default 'INV-' || lpad(nextval('public.invoice_number_seq')::text, 6, '0'),
  order_id        uuid references public.orders(id) on delete set null,
  customer_name   text not null,
  email           text not null,
  phone           text default '',
  address         text default '',
  items           jsonb not null default '[]',
  total           numeric not null default 0,
  status          text not null default 'Pending',
  paid_at         timestamptz,
  notes           text default '',
  created_at      timestamptz not null default now()
);

create index if not exists invoices_created_at_idx on public.invoices (created_at desc);
create index if not exists invoices_status_idx    on public.invoices (status);

-- ---------- ROW LEVEL SECURITY -----------------------------------------------
alter table public.invoices enable row level security;

-- Anyone can read an invoice if they have the UUID (unguessable = secure).
drop policy if exists "invoices public read"   on public.invoices;
create policy "invoices public read" on public.invoices
  for select using (true);

-- The checkout flow (anon) can create invoices.
drop policy if exists "invoices public insert"  on public.invoices;
create policy "invoices public insert" on public.invoices
  for insert with check (true);

-- Only admins can update (mark as paid) or delete.
drop policy if exists "invoices admin update"   on public.invoices;
create policy "invoices admin update" on public.invoices
  for update using (public.is_admin()) with check (public.is_admin());

drop policy if exists "invoices admin delete"   on public.invoices;
create policy "invoices admin delete" on public.invoices
  for delete using (public.is_admin());
