'use client';

import { useRef, useEffect, type ReactNode } from 'react';
import { useReducedMotion } from '@/hooks/use-reduced-motion';

type Variant = 'fadeUp' | 'fadeIn' | 'scaleIn' | 'slideLeft' | 'slideRight';

interface ScrollRevealProps {
  children: ReactNode;
  variant?: Variant;
  delay?: number;
  duration?: number;
  stagger?: number;
  triggerOffset?: string;
  className?: string;
}

const variantStyles: Record<Variant, { from: Record<string, string | number> }> = {
  fadeUp: { from: { opacity: 0, transform: 'translateY(40px)' } },
  fadeIn: { from: { opacity: 0, transform: 'none' } },
  scaleIn: { from: { opacity: 0, transform: 'scale(0.85)' } },
  slideLeft: { from: { opacity: 0, transform: 'translateX(-60px)' } },
  slideRight: { from: { opacity: 0, transform: 'translateX(60px)' } },
};

export function ScrollReveal({
  children,
  variant = 'fadeUp',
  delay = 0,
  duration = 0.8,
  stagger = 0.08,
  triggerOffset = '85%',
  className = '',
}: ScrollRevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    if (reducedMotion || !ref.current) return;

    let cleanup: (() => void) | undefined;

    (async () => {
      const gsapModule = await import('gsap');
      const scrollTriggerModule = await import('gsap/ScrollTrigger');

      const gsap = gsapModule.default || gsapModule;
      const ScrollTrigger = scrollTriggerModule.ScrollTrigger || scrollTriggerModule.default;

      if (!ScrollTrigger) return;
      gsap.registerPlugin(ScrollTrigger);

      const el = ref.current;
      if (!el) return;

      const directChildren = el.children;
      const targets = directChildren.length > 1 ? Array.from(directChildren) : el;
      const { from } = variantStyles[variant];

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: el,
          start: `top ${triggerOffset}`,
          once: true,
        },
      });

      if (Array.isArray(targets) && targets.length > 1) {
        gsap.set(targets, from);
        tl.to(targets, {
          opacity: 1,
          x: 0,
          y: 0,
          scale: 1,
          transform: 'none',
          duration,
          stagger,
          delay,
          ease: 'power2.out',
          clearProps: 'all',
        });
      } else {
        gsap.set(el, from);
        tl.to(el, {
          opacity: 1,
          x: 0,
          y: 0,
          scale: 1,
          transform: 'none',
          duration,
          delay,
          ease: 'power2.out',
          clearProps: 'all',
        });
      }

      cleanup = () => {
        tl.kill();
        ScrollTrigger.getAll().forEach((t: any) => {
          if (t.trigger === el) t.kill();
        });
      };
    })();

    return () => cleanup?.();
  }, [variant, delay, duration, stagger, triggerOffset, reducedMotion]);

  return (
    <div
      ref={ref}
      className={className}
      style={reducedMotion ? undefined : { visibility: 'visible' }}
    >
      {children}
    </div>
  );
}
