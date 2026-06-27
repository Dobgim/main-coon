import type { ElementType, ReactNode } from 'react';
import { useScrollReveal } from '@/hooks/useScrollReveal';

interface RevealProps {
  children: ReactNode;
  className?: string;
  as?: ElementType;
  /** Stagger direct children (seconds). Omit to animate the block as one. */
  stagger?: number;
  delay?: number;
  y?: number;
}

/**
 * Scroll-triggered fade/slide-up wrapper built on GSAP ScrollTrigger.
 * Use `stagger` to cascade a grid of cards as they enter the viewport.
 */
export default function Reveal({
  children,
  className,
  as,
  stagger,
  delay,
  y,
}: RevealProps) {
  const Tag = (as ?? 'div') as ElementType;
  const ref = useScrollReveal<HTMLElement>({ stagger, delay, y });
  return (
    <Tag ref={ref} className={className}>
      {children}
    </Tag>
  );
}
