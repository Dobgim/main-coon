import { site } from '@/data/site';

export interface PaymentMethod {
  label: string;
  value: string;
  href?: string;
}

/** Returns only the payment methods you've filled in (others are hidden). */
export function getPaymentMethods(): PaymentMethod[] {
  const p = site.payment;
  const methods: PaymentMethod[] = [];

  if (p.zelle.trim()) methods.push({ label: 'Zelle', value: p.zelle });
  if (p.cashApp.trim()) {
    const tag = p.cashApp.replace(/^\$/, '');
    methods.push({ label: 'Cash App', value: `$${tag}`, href: `https://cash.app/$${tag}` });
  }
  if (p.chime.trim()) {
    const tag = p.chime.replace(/^\$/, '');
    methods.push({ label: 'Chime', value: p.chime.startsWith('$') ? `$${tag}` : p.chime });
  }
  if (p.applePay.trim()) methods.push({ label: 'Apple Pay', value: p.applePay });
  return methods;
}

export const paymentInstructions = (): string => site.payment.instructions;

/** Plain-text summary used inside the order email sent to the owner. */
export function paymentMethodsText(): string {
  const methods = getPaymentMethods();
  if (methods.length === 0) return 'No payment methods configured yet (add them in site config).';
  return methods.map((m) => `${m.label}: ${m.value}`).join('\n');
}

/**
 * The methods a buyer may pick at checkout. This is deliberately independent of
 * which handles are filled in under `site.payment` — a buyer can say how they
 * intend to pay before we've published the receiving account, and the site
 * already advertises these four. Keep in step with <PaymentBadges />.
 */
export const SELECTABLE_PAYMENT_METHODS = [
  'Zelle',
  'Cash App',
  'Chime',
  'Apple Pay',
] as const;

export type SelectablePaymentMethod = (typeof SELECTABLE_PAYMENT_METHODS)[number];

/** The configured handle for one method, or null when it isn't set up yet. */
export function getPaymentMethod(label: string): PaymentMethod | null {
  return getPaymentMethods().find((m) => m.label === label) ?? null;
}
