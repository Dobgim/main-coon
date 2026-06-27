import { useLayoutEffect, useRef } from 'react';
import { gsap, ScrollTrigger, prefersReducedMotion } from '@/lib/gsap-config';

interface RevealOptions {
  y?: number;
  duration?: number;
  delay?: number;
  /** When set, direct children animate in with this stagger (seconds). */
  stagger?: number;
  start?: string;
}

/**
 * Returns a ref to attach to an element. On scroll into view the element (or its
 * children, when `stagger` is set) fades and slides up using GSAP ScrollTrigger.
 * Honours `prefers-reduced-motion` by rendering elements in their final state.
 */
export function useScrollReveal<T extends HTMLElement = HTMLDivElement>(
  options: RevealOptions = {},
) {
  const ref = useRef<T>(null);
  const { y = 28, duration = 0.7, delay = 0, stagger, start = 'top 85%' } = options;

  useLayoutEffect(() => {
    const el = ref.current;
    if (!el || prefersReducedMotion()) return;

    const ctx = gsap.context(() => {
      const targets = stagger ? (Array.from(el.children) as HTMLElement[]) : el;
      gsap.from(targets, {
        opacity: 0,
        y,
        duration,
        delay,
        ease: 'power3.out',
        stagger: stagger ?? 0,
        scrollTrigger: { trigger: el, start },
      });
    }, el);

    return () => ctx.revert();
  }, [y, duration, delay, stagger, start]);

  return ref;
}

export { ScrollTrigger };
