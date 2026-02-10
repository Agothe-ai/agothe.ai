'use client';

import { useEffect, useRef } from 'react';
import { useReducedMotion } from '@/hooks/use-reduced-motion';

export function ChromeHeroOverlay() {
  const reducedMotion = useReducedMotion();

  if (reducedMotion) return null;

  return (
    <div
      className="pointer-events-none absolute inset-0 z-[1]"
      aria-hidden="true"
      style={{
        background: 'conic-gradient(from 0deg at 50% 50%, #94a3b8, #f59e0b, #94a3b8, #0a0a0a, #94a3b8, #f59e0b, #94a3b8)',
        backgroundSize: '200% 200%',
        opacity: 0.08,
        animation: 'chrome-rotate 20s linear infinite',
      }}
    />
  );
}

export function ChromeMetallicCards() {
  const containerRef = useRef<HTMLDivElement>(null);
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    if (reducedMotion || !containerRef.current) return;

    const el = containerRef.current;
    const cards = el.querySelectorAll('.obsidian-glass, .obsidian-glass-static');

    function onScroll() {
      const scrollY = window.scrollY;
      const angle = 135 + (scrollY * 0.1) % 360;
      cards.forEach((card) => {
        (card as HTMLElement).style.borderImage = `linear-gradient(${angle}deg, #94a3b8, #f59e0b, #94a3b8) 1`;
        (card as HTMLElement).style.borderWidth = '1px';
        (card as HTMLElement).style.borderStyle = 'solid';
      });
    }

    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();

    return () => window.removeEventListener('scroll', onScroll);
  }, [reducedMotion]);

  return <div ref={containerRef} className="contents" />;
}
