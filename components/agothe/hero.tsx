'use client';

import { useRef, useEffect } from 'react';
import { Counter } from './counter';
import { LiveStatus } from './live-status';
import { SmartImage } from './smart-image';
import { NewsletterSignup } from './newsletter-signup';
import { useReducedMotion } from '@/hooks/use-reduced-motion';

const metrics = [
  { value: 0.9, prefix: 'MCS > ', suffix: '0', decimals: 1, label: 'Analysis Coherence' },
  { value: 2, prefix: '< ', suffix: '', decimals: 0, label: 'Average Delivery', unit: 'Hours', countDown: true },
  { value: 6, prefix: '', suffix: '', decimals: 0, label: 'Coordinated Network', unit: 'AI Systems' },
  { value: 200, prefix: '', suffix: 'M+', decimals: 0, label: 'Research Access', unit: 'Papers' },
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

      tl.to(chars, {
        y: '0%',
        opacity: 1,
        duration: 0.5,
        stagger: 0.05,
        ease: 'back.out(1.7)',
      }, '-=0.2');

      tl.to(items[1], { opacity: 1, y: 0, duration: 0.6, ease: 'power2.out' }, '-=0.3');
      tl.to(items[2], { opacity: 1, y: 0, duration: 0.6, ease: 'power2.out' }, '-=0.4');
      tl.to(items[3], { opacity: 1, y: 0, duration: 0.6, ease: 'power2.out' }, '-=0.4');

      cleanup = () => tl.kill();
    })();

    return () => cleanup?.();
  }, [reducedMotion]);



  return (
    <section ref={containerRef} className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden px-4 pt-20">
      {/* Hero background image with dark overlay */}
      <div className="absolute inset-0 z-0">
        <SmartImage
          src="/images/heroes/landing-substrate.webp"
          alt="Agothe Intelligence substrate visualization"
          fill
          priority={true}
          sizes="100vw"
          className="object-cover"
        />
        {/* Dark gradient overlay for text readability */}
        <div className="absolute inset-0 bg-gradient-to-b from-agothe-bg/60 via-agothe-bg/80 to-agothe-bg" />
      </div>

      <div className="relative z-10 mx-auto w-full max-w-7xl px-6 text-left">
        {/* Primary headline - left aligned */}
        <div data-hero-item="" className="relative inline-block rounded-2xl bg-[rgba(0,0,0,0.4)] px-8 py-6 backdrop-blur-sm">
          <h1 className="font-heading text-6xl font-black uppercase leading-none tracking-tight sm:text-7xl md:text-8xl lg:text-9xl">
            <span className="text-agothe-white">BUILD WHAT</span>{' '}
            <span className="text-agothe-teal">SURVIVES</span>
          </h1>
        </div>

        {/* Subheading */}
        <p
          data-hero-item=""
          className="mt-6 text-lg text-agothe-white md:text-xl"
        >
          6 AI systems. <span className="font-semibold text-agothe-teal">200M</span> research papers.<br />
          Intelligence-grade analysis in hours.
        </p>

        {/* Secondary headline - right aligned */}
        <div data-hero-item="" className="mt-12 flex justify-end">
          <div className="relative inline-block rounded-2xl bg-[rgba(0,0,0,0.4)] px-8 py-6 backdrop-blur-sm">
            <h2 className="font-heading text-5xl font-black uppercase leading-none tracking-tight sm:text-6xl md:text-7xl lg:text-8xl">
              <span className="text-agothe-white">PREDICT</span>{' '}
              <span className="text-agothe-danger">COLLAPSE</span>
            </h2>
          </div>
        </div>

        {/* Badges - partner logos */}
        <p
          data-hero-item=""
          className="mt-6 text-xs text-agothe-muted/60"
        >
          S2ORC Partner &nbsp;&middot;&nbsp; Notion Certified &nbsp;&middot;&nbsp; OpenAI Ecosystem
        </p>

        <div data-hero-item="" className="mt-6">
          <NewsletterSignup />
        </div>
      </div>

      <div
        data-hero-item=""
        className="obsidian-glass-static relative z-10 mx-auto mt-12 w-full max-w-4xl rounded-lg border border-[rgba(0,240,255,0.15)] px-4 py-4"
      >
        <div className="grid grid-cols-2 gap-4 md:grid-cols-4 md:gap-2">
          {metrics.map((m, i) => (
            <div
              key={m.label}
              className={`flex flex-col items-center px-3 py-2 ${
                i < metrics.length - 1
                  ? 'md:border-r md:border-[rgba(255,255,255,0.1)]'
                  : ''
              }`}
            >
              <div className="text-2xl font-bold text-agothe-white md:text-3xl">
                <Counter
                  target={m.value}
                  prefix={m.prefix}
                  suffix={m.suffix}
                  decimals={m.decimals}
                  countDown={m.countDown}
                />
              </div>
              <p className="mt-1 text-center text-[9px] font-semibold uppercase tracking-[0.12em] text-agothe-muted">
                {m.label}
              </p>
            </div>
          ))}
        </div>

        {/* System Status Indicator */}
        <div className="mt-4 flex items-center justify-center gap-4 border-t border-[rgba(255,255,255,0.1)] pt-4 text-xs">
          <div className="flex items-center gap-2">
            <span className="h-1.5 w-1.5 rounded-full bg-green-500"></span>
            <span className="font-mono text-[10px] uppercase tracking-wider text-agothe-white">
              System Operational
            </span>
          </div>
          <div className="flex items-center gap-1.5 font-mono text-[10px] text-agothe-muted">
            <span>01</span>
            <span>/</span>
            <span>02</span>
            <span>/</span>
            <span>03</span>
          </div>
          <div className="font-mono text-[10px] text-agothe-muted">
            Stage: <span className="text-agothe-white">2</span>
          </div>
        </div>
      </div>

      <LiveStatus />
    </section>
  );
}
