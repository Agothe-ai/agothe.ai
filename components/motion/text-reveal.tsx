'use client';

import { useRef, useEffect, type ReactNode } from 'react';
import { useReducedMotion } from '@/hooks/use-reduced-motion';

interface TextRevealProps {
  children: string;
  mode?: 'characters' | 'words';
  className?: string;
  tag?: 'h1' | 'h2' | 'h3' | 'p' | 'span';
  triggerOnLoad?: boolean;
  delay?: number;
}

export function TextReveal({
  children,
  mode = 'words',
  className = '',
  tag: Tag = 'span',
  triggerOnLoad = false,
  delay = 0,
}: TextRevealProps) {
  const containerRef = useRef<HTMLElement>(null);
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    if (reducedMotion || !containerRef.current) return;

    let cleanup: (() => void) | undefined;

    (async () => {
      const gsapModule = await import('gsap');
      const scrollTriggerModule = await import('gsap/ScrollTrigger');

      const gsap = gsapModule.default || gsapModule;
      const ScrollTrigger = scrollTriggerModule.ScrollTrigger || scrollTriggerModule.default;

      if (!ScrollTrigger) return;
      gsap.registerPlugin(ScrollTrigger);

      const el = containerRef.current;
      if (!el) return;

      const spans = el.querySelectorAll('.tr-unit');
      if (!spans.length) return;

      gsap.set(spans, {
        y: '110%',
        opacity: 0,
      });

      const staggerVal = mode === 'characters' ? 0.018 : 0.04;
      const easeVal = mode === 'characters'
        ? 'back.out(1.7)'
        : 'power2.out';
      const dur = mode === 'characters' ? 0.5 : 0.6;

      const animConfig: Record<string, any> = {
        y: '0%',
        opacity: 1,
        duration: dur,
        stagger: staggerVal,
        delay,
        ease: easeVal,
      };

      if (triggerOnLoad) {
        gsap.to(spans, animConfig);
      } else {
        gsap.to(spans, {
          ...animConfig,
          scrollTrigger: {
            trigger: el,
            start: 'top 85%',
            once: true,
          },
        });
      }

      cleanup = () => {
        ScrollTrigger.getAll().forEach((t: any) => {
          if (t.trigger === el) t.kill();
        });
      };
    })();

    return () => cleanup?.();
  }, [mode, triggerOnLoad, delay, reducedMotion]);

  if (reducedMotion) {
    return <Tag className={className}>{children}</Tag>;
  }

  const units = mode === 'characters'
    ? children.split('').map((char, i) => (
        char === ' ' ? (
          <span key={i}>&nbsp;</span>
        ) : (
          <span key={i} className="tr-wrap inline-block overflow-hidden">
            <span className="tr-unit inline-block">{char}</span>
          </span>
        )
      ))
    : children.split(' ').map((word, i, arr) => (
        <span key={i} className="tr-wrap inline-block overflow-hidden">
          <span className="tr-unit inline-block">
            {word}
            {i < arr.length - 1 ? '\u00A0' : ''}
          </span>
        </span>
      ));

  return (
    <Tag ref={containerRef as any} className={className} aria-label={children}>
      {units}
    </Tag>
  );
}
