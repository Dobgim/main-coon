/**
 * Optional EmailJS integration.
 *
 * This template stores form submissions in localStorage by default so it works
 * with zero configuration. To send real emails to the charity, install EmailJS
 * (`npm i @emailjs/browser`), fill in the IDs below (ideally via .env vars),
 * and flip `EMAIL_ENABLED` to true. See README for the full walkthrough.
 */
export const EMAIL_ENABLED = false;

export const emailConfig = {
  serviceId: import.meta.env.VITE_EMAILJS_SERVICE_ID ?? '',
  templateId: import.meta.env.VITE_EMAILJS_TEMPLATE_ID ?? '',
  publicKey: import.meta.env.VITE_EMAILJS_PUBLIC_KEY ?? '',
};

/**
 * Sends a form payload via EmailJS when enabled, otherwise resolves immediately
 * so the calling component can fall back to local persistence.
 */
export async function sendEmail(
  payload: Record<string, unknown>,
): Promise<{ ok: boolean; skipped?: boolean }> {
  if (!EMAIL_ENABLED) return { ok: true, skipped: true };

  try {
    // Lazy, indirect import keeps EmailJS optional: it stays out of the bundle
    // and is only resolved at runtime when you've installed it and enabled email.
    const moduleName = '@emailjs/browser';
    const emailjs = (await import(/* @vite-ignore */ moduleName)) as {
      send: (
        service: string,
        template: string,
        params: Record<string, string>,
        opts: { publicKey: string },
      ) => Promise<unknown>;
    };
    await emailjs.send(
      emailConfig.serviceId,
      emailConfig.templateId,
      payload as Record<string, string>,
      { publicKey: emailConfig.publicKey },
    );
    return { ok: true };
  } catch (err) {
    console.error('EmailJS send failed:', err);
    return { ok: false };
  }
}
