/**
 * Site-wide email sending.
 *
 * Messages go to our own /api/send-email function, which talks to Resend with
 * a secret key. The browser never sees that key — this is why we cannot call
 * Resend directly from the client.
 *
 * Resolves `{ ok: false }` rather than throwing, so callers can degrade
 * gracefully and still show the customer their confirmation.
 */
export interface EmailField {
  label: string;
  value: string;
}

export async function sendEmail(params: {
  subject: string;
  replyTo?: string;
  fields: EmailField[];
}): Promise<{ ok: boolean }> {
  try {
    const res = await fetch('/api/send-email', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        subject: params.subject,
        replyTo: params.replyTo,
        // Drop empties so the email stays readable.
        fields: params.fields.filter((f) => f.value && f.value.trim()),
      }),
    });
    const data = await res.json().catch(() => null);
    return { ok: res.ok && Boolean(data?.ok) };
  } catch (err) {
    console.error('Email send failed:', err);
    return { ok: false };
  }
}

/** Convenience for the common `Record` shape the forms already build. */
export function fieldsFrom(record: Record<string, unknown>): EmailField[] {
  return Object.entries(record).map(([key, value]) => ({
    label: key
      .replace(/_/g, ' ')
      .replace(/\b\w/g, (c) => c.toUpperCase())
      .trim(),
    value: String(value ?? ''),
  }));
}
