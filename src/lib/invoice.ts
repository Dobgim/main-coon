import { supabase } from './supabase';
import { site } from '@/data/site';
import { getPaymentMethods, paymentInstructions } from './payment';

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

export interface InvoiceItem {
  catSlug: string;
  name: string;
  optionId: string;
  optionLabel: string;
  price: number;
}

export interface Invoice {
  id: string;
  invoiceNumber: string;
  orderId: string | null;
  customerName: string;
  email: string;
  phone: string;
  address: string;
  items: InvoiceItem[];
  total: number;
  status: 'Pending' | 'Paid';
  paidAt: string | null;
  notes: string;
  createdAt: string;
}

/** Raw Supabase row shape (snake_case). */
interface InvoiceRow {
  id: string;
  invoice_number: string;
  order_id: string | null;
  customer_name: string;
  email: string;
  phone: string;
  address: string;
  items: InvoiceItem[];
  total: number;
  status: string;
  paid_at: string | null;
  notes: string;
  created_at: string;
}

// ---------------------------------------------------------------------------
// Mappers
// ---------------------------------------------------------------------------

const rowToInvoice = (r: InvoiceRow): Invoice => ({
  id: r.id,
  invoiceNumber: r.invoice_number,
  orderId: r.order_id,
  customerName: r.customer_name,
  email: r.email,
  phone: r.phone,
  address: r.address,
  items: r.items ?? [],
  total: Number(r.total),
  status: r.status as Invoice['status'],
  paidAt: r.paid_at,
  notes: r.notes,
  createdAt: r.created_at,
});

// ---------------------------------------------------------------------------
// Public reads (no auth required — secured by unguessable UUID)
// ---------------------------------------------------------------------------

/** Fetch a single invoice by its UUID (public page). */
export async function fetchInvoiceById(id: string): Promise<Invoice | null> {
  const { data, error } = await supabase
    .from('invoices')
    .select('*')
    .eq('id', id)
    .maybeSingle();
  if (error) {
    console.error('[invoice] fetchById error:', error.message);
    return null;
  }
  return data ? rowToInvoice(data as InvoiceRow) : null;
}

// ---------------------------------------------------------------------------
// Public write (checkout flow — anon insert)
// ---------------------------------------------------------------------------

export interface CreateInvoiceInput {
  orderId?: string | null;
  customerName: string;
  email: string;
  phone: string;
  address: string;
  items: InvoiceItem[];
  total: number;
  notes: string;
}

/** Create a new invoice and return its id + invoice_number. */
export async function createInvoice(
  input: CreateInvoiceInput,
): Promise<{ id: string; invoiceNumber: string }> {
  const { data, error } = await supabase
    .from('invoices')
    .insert({
      order_id: input.orderId || null,
      customer_name: input.customerName,
      email: input.email,
      phone: input.phone,
      address: input.address,
      items: input.items,
      total: input.total,
      notes: input.notes,
    })
    .select('id, invoice_number')
    .single();
  if (error) throw error;
  return { id: data.id, invoiceNumber: data.invoice_number };
}

// ---------------------------------------------------------------------------
// Admin reads / writes (require admin via RLS)
// ---------------------------------------------------------------------------

/** Fetch all invoices, newest first (admin). */
export async function fetchAllInvoices(): Promise<Invoice[]> {
  const { data, error } = await supabase
    .from('invoices')
    .select('*')
    .order('created_at', { ascending: false });
  if (error) throw error;
  return (data as InvoiceRow[]).map(rowToInvoice);
}

/** Mark an invoice as Paid (admin). */
export async function markInvoicePaid(invoiceId: string): Promise<void> {
  const { error } = await supabase
    .from('invoices')
    .update({ status: 'Paid', paid_at: new Date().toISOString() })
    .eq('id', invoiceId);
  if (error) throw error;
}

/** Revert an invoice to Pending (admin — in case of mistake). */
export async function markInvoicePending(invoiceId: string): Promise<void> {
  const { error } = await supabase
    .from('invoices')
    .update({ status: 'Pending', paid_at: null })
    .eq('id', invoiceId);
  if (error) throw error;
}

/** Delete an invoice (admin). */
export async function deleteInvoice(invoiceId: string): Promise<void> {
  const { error } = await supabase.from('invoices').delete().eq('id', invoiceId);
  if (error) throw error;
}

// ---------------------------------------------------------------------------
// Helpers — shareable links
// ---------------------------------------------------------------------------

/** Build the full public URL for an invoice. */
export function invoiceUrl(invoiceId: string): string {
  return `${window.location.origin}/invoice/${invoiceId}`;
}

/** Build a mailto: link the admin can click to send the invoice to the client. */
export function invoiceMailtoLink(inv: Invoice): string {
  const url = invoiceUrl(inv.id);
  const subject = encodeURIComponent(
    `Invoice ${inv.invoiceNumber} — ${site.name}`,
  );
  const body = encodeURIComponent(
    [
      `Dear ${inv.customerName},`,
      '',
      `Your invoice from ${site.name} is ready.`,
      '',
      `Invoice #: ${inv.invoiceNumber}`,
      `Amount due: ${fmtMoney(inv.total)}`,
      `Status: ${inv.status}`,
      '',
      `View your full invoice here:`,
      url,
      '',
      paymentInstructions(),
      '',
      getPaymentMethods()
        .map((m) => `${m.label}: ${m.value}`)
        .join('\n'),
      '',
      `Thank you!`,
      site.name,
      site.email,
      site.phone,
    ].join('\n'),
  );
  return `mailto:${inv.email}?subject=${subject}&body=${body}`;
}

/** Build a WhatsApp link the admin can use to send the invoice to the client. */
export function invoiceWhatsAppLink(inv: Invoice, recipientPhone?: string): string {
  const url = invoiceUrl(inv.id);
  const phone = recipientPhone || inv.phone.replace(/\D/g, '');
  const text = encodeURIComponent(
    [
      `Hi ${inv.customerName}! 🐱`,
      '',
      `Your invoice from ${site.name} is ready.`,
      `Invoice #: ${inv.invoiceNumber}`,
      `Amount due: ${fmtMoney(inv.total)}`,
      `Status: ${inv.status}`,
      '',
      `View your invoice here:`,
      url,
      '',
      `Thank you!`,
    ].join('\n'),
  );
  return `https://wa.me/${phone}?text=${text}`;
}

// ---------------------------------------------------------------------------
// Formatting
// ---------------------------------------------------------------------------

export const fmtMoney = (n: number) =>
  Number(n).toLocaleString('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 0,
  });

export const fmtDate = (iso: string) =>
  new Date(iso).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

export const fmtDateTime = (iso: string) =>
  new Date(iso).toLocaleString(undefined, {
    dateStyle: 'medium',
    timeStyle: 'short',
  });
