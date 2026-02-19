'use client';

import { useRef, useEffect } from 'react';
import Image from 'next/image';
import { Counter } from './counter';
import { LiveStatus } from './live-status';
import { useReducedMotion } from '@/hooks/use-reduced-motion';

const metrics = [
  { value: 0.9, prefix: 'MCS > ', suffix: '0', decimals: 1, label: 'Analysis Coherence' },
  { value: 2, prefix: '< ', suffix: '', decimals: 0, label: 'Avg Delivery', unit: 'Hours', countDown: true },
  { value: 6, prefix: '', suffix: '', decimals: 0, label: 'Coordinated Network', unit: 'AI Systems' },
  { value: 200, prefix: '', suffix: 'M+', decimals: 0, label: 'Research Access', unit: 'Papers' },
];

const badges = [
  'S2ORC Partner',
  'Notion Certified',
  'OpenAI Ecosystem',
];

export function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    if (reducedMotion || !containerRef.current) return;
    let cleanup: (() => void) | undefined;
    (async () => {
      const gsapModule = await import('gsap');
      const gsap = gsapModule.default || gsapModule;
      const el = containerRef.current;
      if (!el) return;
      const items = el.querySelectorAll('[data-hero-item]');
      const chars = el.querySelectorAll('.hero-char');
      gsap.set(items, { opacity: 0, y: 30 });
      gsap.set(chars, { y: '110%', opacity: 0 });
      const tl = gsap.timeline({ delay: 0.2 });
      tl.to(items[0], { opacity: 1, y: 0, duration: 0.6, ease: 'power2.out' });
      tl.to(chars, { y: '0%', opacity: 1, duration: 0.5, stagger: 0.05, ease: 'back.out(1.7)' }, '-=0.2');
      tl.to(items[1], { opacity: 1, y: 0, duration: 0.6, ease: 'power2.out' }, '-=0.3');
      tl.to(items[2], { opacity: 1, y: 0, duration: 0.6, ease: 'power2.out' }, '-=0.4');
      tl.to(items[3], { opacity: 1, y: 0, duration: 0.6, ease: 'power2.out' }, '-=0.4');
      cleanup = () => tl.kill();
    })();
    return () => cleanup?.();
  }, [reducedMotion]);

  return (
    <section
      ref={containerRef}
      className="relative min-h-screen flex flex-col overflow-hidden bg-agothe-void"
    >
      {/* Left gradient fade for text legibility */}
      <div className="pointer-events-none absolute inset-y-0 left-0 w-1/3 z-10 bg-gradient-to-r from-agothe-void via-agothe-void/80 to-transparent" />
      {/* Right gradient fade for text legibility */}
      <div className="pointer-events-none absolute inset-y-0 right-0 w-1/3 z-10 bg-gradient-to-l from-agothe-void via-agothe-void/80 to-transparent" />
      {/* Bottom gradient to blend into next section */}
      <div className="pointer-events-none absolute bottom-0 left-0 right-0 h-48 z-10 bg-gradient-to-t from-agothe-void to-transparent" />

      {/* Center hero image - full bleed background */}
      <div className="absolute inset-0 flex items-center justify-center z-0">
        <div
          className="relative w-full max-w-2xl h-full"
          style={{ filter: 'drop-shadow(0 0 80px rgba(0,240,255,0.35)) drop-shadow(0 0 30px rgba(0,240,255,0.2))' }}
        >
          <Image
            src="/images/heroes/landing-substrate.webp"
            alt="Agothe Core"
            fill
            priority
            className="object-contain"
            sizes="(max-width: 768px) 100vw, 50vw"
          />
        </div>
      </div>

      {/* 3-Column Hero Grid */}
      <div className="relative z-20 flex-1 grid grid-cols-[1fr_400px_1fr] gap-0 pt-28 pb-8 px-8 lg:px-16">

        {/* LEFT COLUMN - BUILD WHAT SURVIVES */}
        <div
          data-hero-item
          className="flex flex-col justify-center items-end text-right pr-8"
        >
          <h1 className="font-heading font-black uppercase leading-none tracking-tighter text-7xl xl:text-8xl 2xl:text-9xl">
            <span className="block text-agothe-white overflow-hidden">
              <span className="hero-char block">BUILD</span>
            </span>
            <span className="block text-agothe-white overflow-hidden">
              <span className="hero-char block">WHAT</span>
            </span>
            <span className="block overflow-hidden">
              <span className="hero-char block text-agothe-teal" style={{ textShadow: '0 0 40px rgba(0,240,255,0.6)' }}>SURVIVES</span>
            </span>
          </h1>
          <p
            data-hero-item
            className="mt-6 max-w-xs text-sm text-agothe-muted leading-relaxed text-right"
          >
            6 AI systems.&nbsp; 200M research papers.{' '}
            Intelligence&#8209;grade analysis in hours.
          </p>
        </div>

        {/* CENTER COLUMN - empty, image renders behind via absolute */}
        <div className="" />

        {/* RIGHT COLUMN - PREDICT COLLAPSE */}
        <div
          data-hero-item
          className="flex flex-col justify-center items-start text-left pl-8"
        >
          <h2 className="font-heading font-black uppercase leading-none tracking-tighter text-7xl xl:text-8xl 2xl:text-9xl">
            <span className="block text-agothe-white overflow-hidden">
              <span className="hero-char block">PREDICT</span>
            </span>
            <span className="block overflow-hidden">
              <span
                className="hero-char block text-agothe-danger"
                style={{ textShadow: '0 0 40px rgba(239,68,68,0.6)' }}
              >
                COLLAPSE
              </span>
            </span>
          </h2>
          <p
            data-hero-item
            className="mt-6 max-w-xs text-sm text-agothe-muted leading-relaxed text-left"
          >
            Agothe detects systemic failure before it reaches the surface.
            Crisis intelligence. Delivered.
          </p>
        </div>
      </div>

      {/* Badge Row */}
      <div
        data-hero-item
        className="relative z-20 flex items-center justify-center gap-3 pb-6"
      >
        {badges.map((badge, i) => (
          <span
            key={badge}
            className="px-3 py-1 rounded-full border border-white/10 bg-white/5 text-xs text-agothe-muted tracking-wide"
          >
            {badge}
          </span>
        ))}
      </div>

      {/* Glass HUD Metrics Bar */}
      <div
        data-hero-item
        className="relative z-20 mx-4 mb-6 lg:mx-16 rounded-2xl border border-agothe-teal/20 overflow-hidden"
        style={{
          background: 'rgba(10, 22, 40, 0.75)',
          backdropFilter: 'blur(24px) saturate(150%)',
          WebkitBackdropFilter: 'blur(24px) saturate(150%)',
          boxShadow: '0 2px 8px rgba(0,0,0,0.4), 0 8px 24px rgba(0,0,0,0.3), inset 0 0 0 1px rgba(0,240,255,0.07)',
        }}
      >
        <div className="grid grid-cols-4 divide-x divide-white/10">
          {metrics.map((m, i) => (
            <div
              key={m.label}
              className="flex flex-col items-center justify-center py-5 px-4 gap-1"
            >
              <div className="font-mono text-2xl font-bold text-agothe-white tracking-tight">
                <Counter
                  value={m.value}
                  prefix={m.prefix}
                  suffix={m.suffix}
                  decimals={m.decimals}
                  countDown={m.countDown}
                />
                {m.unit && (
                  <span className="ml-1 text-sm font-normal text-agothe-muted">{m.unit}</span>
                )}
              </div>
              <div className="text-xs uppercase tracking-widest text-agothe-muted">
                {m.label}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* System Status */}
      <div className="relative z-20 flex justify-center pb-6">
        <LiveStatus />
      </div>
    </section>
  );
}
