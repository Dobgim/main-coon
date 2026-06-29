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
