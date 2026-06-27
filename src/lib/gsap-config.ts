import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

/**
 * Central GSAP setup. Import { gsap, ScrollTrigger } from here so the plugin
 * is only registered once across the app.
 */
gsap.registerPlugin(ScrollTrigger);

export const prefersReducedMotion = (): boolean =>
  typeof window !== 'undefined' &&
  window.matchMedia('(prefers-reduced-motion: reduce)').matches;

export { gsap, ScrollTrigger };
