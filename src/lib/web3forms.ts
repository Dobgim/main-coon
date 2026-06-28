/**
 * Web3Forms integration — emails form submissions straight to your inbox with
 * no backend. The access key is safe to expose in the browser (that's how
 * Web3Forms is designed to work).
 *
 * Get a free key at https://web3forms.com (enter the email where you want to
 * receive submissions). Then set it here or via VITE_WEB3FORMS_ACCESS_KEY.
 */
const PLACEHOLDER = 'YOUR_WEB3FORMS_ACCESS_KEY';

const ACCESS_KEY =
  import.meta.env.VITE_WEB3FORMS_ACCESS_KEY ?? '95056a37-546a-4850-a044-c0cd6fb80b35';

/** True once a real access key has been configured. */
export const WEB3FORMS_READY = Boolean(ACCESS_KEY) && ACCESS_KEY !== PLACEHOLDER;

/**
 * Send a payload to Web3Forms. Resolves `{ ok: false }` (never throws) when the
 * key isn't set or the request fails, so callers can fall back gracefully.
 */
export async function sendWeb3Form(
  payload: Record<string, unknown>,
): Promise<{ ok: boolean }> {
  if (!WEB3FORMS_READY) return { ok: false };
  try {
    const res = await fetch('https://api.web3forms.com/submit', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
      body: JSON.stringify({ access_key: ACCESS_KEY, ...payload }),
    });
    const data = await res.json();
    return { ok: Boolean(data?.success) };
  } catch (err) {
    console.error('Web3Forms send failed:', err);
    return { ok: false };
  }
}
