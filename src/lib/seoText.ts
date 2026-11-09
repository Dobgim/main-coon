/**
 * Search engines (Bing in particular) flag titles over ~60–70 characters and
 * meta descriptions outside 25–160 characters. These helpers keep every page
 * within those limits, including pages built from admin-entered kitten data.
 * scripts/prerender.js mirrors this logic for the static HTML.
 */
export const TITLE_MAX = 60;
export const DESC_MAX = 155;

function clampAtWord(text: string, max: number): string {
  if (text.length <= max) return text;
  const cut = text.slice(0, max - 1);
  const lastSpace = cut.lastIndexOf(' ');
  return `${(lastSpace > max * 0.6 ? cut.slice(0, lastSpace) : cut).replace(/[\s,;:—–-]+$/, '')}…`;
}

/** Appends the brand only when it fits; otherwise shortens the base title. */
export function fitTitle(base: string, brand: string): string {
  const clean = base.replace(/\s+/g, ' ').trim();
  if (clean.includes(brand)) return clampAtWord(clean, TITLE_MAX);
  const branded = `${clean} | ${brand}`;
  return branded.length <= TITLE_MAX ? branded : clampAtWord(clean, TITLE_MAX);
}

/** Prefers ending on a full sentence; falls back to a word boundary. */
export function fitDescription(text: string): string {
  const clean = text.replace(/\s+/g, ' ').trim();
  if (clean.length <= DESC_MAX) return clean;
  const window = clean.slice(0, DESC_MAX);
  const sentenceEnd = Math.max(window.lastIndexOf('. '), window.lastIndexOf('! '), window.lastIndexOf('? '));
  if (sentenceEnd >= 80) return window.slice(0, sentenceEnd + 1);
  return clampAtWord(clean, DESC_MAX);
}

/** First phrase of a color field, so long admin descriptions don't bloat titles. */
export function shortColor(color: string): string {
  const first = String(color || '').split(/[,(;.]/)[0].trim();
  return first.length > 30 ? clampAtWord(first, 30) : first;
}
