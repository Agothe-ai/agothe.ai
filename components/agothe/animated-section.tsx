'use client';

import { useRef, useEffect, type ReactNode } from 'react';
import { useReducedMotion } from '@/hooks/use-reduced-motion';

export function AnimatedSection({
  children,
  className = '',
}: {
  children: ReactNode;
  className?: string;
}) {
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

      const items = el.querySelectorAll(':scope > [data-anim-item]');
      if (!items.length) return;

      gsap.set(items, { opacity: 0, y: 40 });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: el,
          start: 'top 85%',
          once: true,
        },
      });

      tl.to(items, {
        opacity: 1,
        y: 0,
        duration: 0.7,
        stagger: 0.1,
        ease: 'power2.out',
        clearProps: 'transform',
      });

      cleanup = () => {
        tl.kill();
        ScrollTrigger.getAll().forEach((t: any) => {
          if (t.trigger === el) t.kill();
        });
      };
    })();

    return () => cleanup?.();
  }, [reducedMotion]);

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}

export function AnimatedItem({
  children,
  className = '',
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div data-anim-item="" className={className}>
      {children}
    </div>
  );
}
