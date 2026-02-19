'use client';

import { useRef, useEffect } from 'react';
import Image from 'next/image';
import { Counter } from './counter';
import { LiveStatus } from './live-status';
import { useReducedMotion } from '@/hooks/use-reduced-motion';

const metrics = [
  { value: 0.97, prefix: 'MCS > ', suffix: '', decimals: 2, label: 'Analysis Coherence' },
  { value: 3, prefix: '< ', suffix: '', decimals: 0, label: 'Avg Delivery', unit: 'Hours', countDown: true },
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
      {/* =====================
          BACKGROUND IMAGE - full bleed, no overlays
      ===================== */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/heroes/landing-substrate.webp"
          alt="Agothe Core"
          fill
          priority
          className="object-cover object-center"
          sizes="100vw"
        />
      </div>

      {/* =====================
          CONTENT LAYER
      ===================== */}
      <div className="relative z-10 flex flex-col min-h-screen">

        {/* Spacer for navbar */}
        <div className="h-20" />

        {/* Hero text grid - 3 col on desktop, stacked on mobile */}
        <div className="flex-1 grid grid-cols-1 lg:grid-cols-[1fr_360px_1fr] px-6 lg:px-12 pt-8 pb-4 gap-0">

          {/* LEFT - BUILD WHAT SURVIVES */}
          <div
            data-hero-item
            className="flex flex-col justify-center items-start lg:items-end lg:text-right lg:pr-8 mb-6 lg:mb-0"
          >
            <h1 className="font-heading font-black uppercase leading-none tracking-tighter text-6xl xl:text-7xl 2xl:text-8xl drop-shadow-2xl">
              <span className="block text-agothe-white overflow-hidden">
                <span className="hero-char block">BUILD WHAT</span>
              </span>
              <span className="block overflow-hidden">
                <span
                  className="hero-char block text-agothe-teal"
                  style={{ textShadow: '0 0 40px rgba(0,240,255,0.8), 0 2px 4px rgba(0,0,0,0.9)' }}
                >
                  SURVIVES
                </span>
              </span>
            </h1>
            <p
              data-hero-item
              className="mt-4 max-w-xs text-sm text-white/80 leading-relaxed drop-shadow-lg"
              style={{ textShadow: '0 1px 3px rgba(0,0,0,0.9)' }}
            >
              6 AI systems.&nbsp;200M research papers.{' '}
              Intelligence&#8209;grade analysis in hours.
            </p>
          </div>

          {/* CENTER - empty spacer column (image behind) */}
          <div className="hidden lg:block" />

          {/* RIGHT - PREDICT COLLAPSE */}
          <div
            data-hero-item
            className="flex flex-col justify-center items-start lg:pl-8"
          >
            <h2 className="font-heading font-black uppercase leading-none tracking-tighter text-6xl xl:text-7xl 2xl:text-8xl drop-shadow-2xl">
              <span className="block text-agothe-white overflow-hidden">
                <span className="hero-char block">PREDICT</span>
              </span>
              <span className="block overflow-hidden">
                <span
                  className="hero-char block text-agothe-danger"
                  style={{ textShadow: '0 0 40px rgba(239,68,68,0.8), 0 2px 4px rgba(0,0,0,0.9)' }}
                >
                  COLLAPSE
                </span>
              </span>
            </h2>
            <p
              data-hero-item
              className="mt-4 max-w-xs text-sm text-white/80 leading-relaxed"
              style={{ textShadow: '0 1px 3px rgba(0,0,0,0.9)' }}
            >
              Agothe detects systemic failure before it surfaces.
              Crisis intelligence. Delivered.
            </p>
          </div>
        </div>

        {/* =====================
            BOTTOM HUD AREA
        ===================== */}
        <div className="px-4 lg:px-12 pb-5 space-y-3">

          {/* STATS MODULE */}
          <div
            data-hero-item
            className="rounded-xl overflow-hidden"
            style={{
              background: 'rgba(8, 18, 32, 0.55)',
              backdropFilter: 'blur(16px) saturate(140%)',
              WebkitBackdropFilter: 'blur(16px) saturate(140%)',
              border: '1px solid rgba(0, 240, 255, 0.18)',
              boxShadow: '0 2px 16px rgba(0,0,0,0.35), inset 0 0 0 1px rgba(0,240,255,0.06)',
            }}
          >
            <div className="grid grid-cols-2 lg:grid-cols-4 divide-x divide-white/10">
              {metrics.map((m) => (
                <div
                  key={m.label}
                  className="flex flex-col items-center justify-center py-3 px-3 gap-0.5"
                >
                  <div className="font-mono text-lg lg:text-xl font-bold text-agothe-white tracking-tight leading-tight">
                    <Counter
                      value={m.value}
                      prefix={m.prefix}
                      suffix={m.suffix}
                      decimals={m.decimals}
                      countDown={m.countDown}
                    />
                    {m.unit && (
                      <span className="ml-1 text-xs font-normal text-agothe-muted">{m.unit}</span>
                    )}
                  </div>
                  <div className="text-[10px] uppercase tracking-widest text-agothe-muted text-center leading-tight">
                    {m.label}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* SYSTEM OPERATIONAL - kept as-is */}
          <div data-hero-item>
            <LiveStatus />
          </div>

          {/* BADGE ROW */}
          <div
            data-hero-item
            className="flex items-center justify-center gap-3 pb-1"
          >
            {badges.map((badge) => (
              <span
                key={badge}
                className="px-3 py-1 rounded-full text-xs text-white/60 tracking-wide"
                style={{
                  background: 'rgba(255,255,255,0.06)',
                  border: '1px solid rgba(255,255,255,0.12)',
                }}
              >
                {badge}
              </span>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
}
