/**
 * Server-side email delivery via Resend.
 *
 * This runs on Vercel, not in the browser, which is the whole point: a Resend
 * API key grants the ability to send mail as your domain, so it must never
 * reach the client bundle. Nothing here is prefixed VITE_, so Vite will not
 * inline it.
 *
 * Required environment variables (set in the Vercel dashboard):
 *   RESEND_API_KEY  — from https://resend.com/api-keys
 *   ORDER_TO_EMAIL  — inbox that receives notifications
 *   ORDER_FROM_EMAIL — verified sender, e.g. "Royal Maine Coon <orders@yourdomain.com>"
 */
export const config = { runtime: 'edge' };

/** Fields we accept from the site. Anything else is ignored. */
interface EmailRequest {
  subject?: string;
  replyTo?: string;
  /** Ordered label/value pairs rendered as the email body. */
  fields?: Array<{ label: string; value: string }>;
}

const esc = (s: string) =>
  s
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');

function renderHtml(subject: string, fields: Array<{ label: string; value: string }>) {
  const rows = fields
    .map(
      (f) => `
        <tr>
          <td style="padding:10px 14px;border-bottom:1px solid #eee7d8;font:600 13px system-ui,sans-serif;color:#5c6b5e;white-space:nowrap;vertical-align:top">${esc(
            f.label,
          )}</td>
          <td style="padding:10px 14px;border-bottom:1px solid #eee7d8;font:400 14px system-ui,sans-serif;color:#14331f;white-space:pre-wrap">${esc(
            f.value,
          )}</td>
        </tr>`,
    )
    .join('');

  return `<!doctype html><html><body style="margin:0;background:#faf7f1;padding:24px">
  <table role="presentation" style="max-width:640px;margin:0 auto;background:#fff;border:1px solid #e7ddcb;border-radius:14px;border-collapse:separate;overflow:hidden">
    <tr><td style="background:#14331f;padding:18px 20px;font:800 16px system-ui,sans-serif;color:#fff">${esc(
      subject,
    )}</td></tr>
    <tr><td style="padding:6px 6px 14px"><table role="presentation" style="width:100%;border-collapse:collapse">${rows}</table></td></tr>
  </table></body></html>`;
}

export default async function handler(req: Request): Promise<Response> {
  if (req.method !== 'POST') {
    return new Response(JSON.stringify({ error: 'Method not allowed' }), {
      status: 405,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.ORDER_TO_EMAIL;
  const from = process.env.ORDER_FROM_EMAIL;

  if (!apiKey || !to || !from) {
    // Surface a clear message in the Vercel logs rather than failing silently.
    console.error('Resend is not configured: set RESEND_API_KEY, ORDER_TO_EMAIL, ORDER_FROM_EMAIL');
    return new Response(JSON.stringify({ error: 'Email is not configured' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  let body: EmailRequest;
  try {
    body = (await req.json()) as EmailRequest;
  } catch {
    return new Response(JSON.stringify({ error: 'Invalid JSON' }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  const subject = (body.subject || 'New website enquiry').slice(0, 200);
  const fields = Array.isArray(body.fields) ? body.fields.slice(0, 40) : [];

  if (fields.length === 0) {
    return new Response(JSON.stringify({ error: 'Nothing to send' }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  const text = fields.map((f) => `${f.label}: ${f.value}`).join('\n');

  const payload: Record<string, unknown> = {
    from,
    to: [to],
    subject,
    html: renderHtml(subject, fields),
    // A plain-text alternative materially improves deliverability.
    text,
  };

  // Let the owner reply straight to the customer.
  if (body.replyTo && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(body.replyTo)) {
    payload.reply_to = body.replyTo;
  }

  try {
    const res = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    });

    if (!res.ok) {
      const detail = await res.text();
      console.error('Resend rejected the message:', res.status, detail);
      return new Response(JSON.stringify({ error: 'Send failed' }), {
        status: 502,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    return new Response(JSON.stringify({ ok: true }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (err) {
    console.error('Resend request failed:', err);
    return new Response(JSON.stringify({ error: 'Send failed' }), {
      status: 502,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}
