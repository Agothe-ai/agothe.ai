'use client';

import { useRef, useEffect } from 'react';
import { Counter } from './counter';
import { LiveStatus } from './live-status';
import { MeshGradientHero } from '@/components/motion/mesh-gradient-hero';
import { MetricViz } from '@/components/motion/metric-viz';
import { MagneticButton } from '@/components/motion/magnetic-button';
import { useReducedMotion } from '@/hooks/use-reduced-motion';

const metrics = [
  { value: 0.9, prefix: 'MCS > ', suffix: '0', decimals: 1, label: 'Analysis Coherence', viz: 'coherence' as const },
  { value: 2, prefix: '< ', suffix: '', decimals: 0, label: 'Average Delivery', unit: 'Hours', countDown: true, viz: 'speed' as const },
  { value: 6, prefix: '', suffix: '', decimals: 0, label: 'Coordinated Network', unit: 'AI Systems', viz: 'network' as const },
  { value: 200, prefix: '', suffix: 'M+', decimals: 0, label: 'Research Access', unit: 'Papers', viz: 'research' as const },
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
        stagger: 0.018,
        ease: 'back.out(1.7)',
      }, '-=0.2');

      tl.to(items[1], { opacity: 1, y: 0, duration: 0.6, ease: 'power2.out' }, '-=0.3');
      tl.to(items[2], { opacity: 1, y: 0, duration: 0.6, ease: 'power2.out' }, '-=0.4');
      tl.to(items[3], { opacity: 1, y: 0, duration: 0.6, ease: 'power2.out' }, '-=0.4');
      tl.to(items[4], { opacity: 1, y: 0, duration: 0.6, ease: 'power2.out' }, '-=0.3');

      cleanup = () => tl.kill();
    })();

    return () => cleanup?.();
  }, [reducedMotion]);

  const headingSegments = [
    { text: 'Predict ', className: 'text-agothe-white' },
    { text: 'collapse', className: 'text-agothe-danger' },
    { text: '. ', className: 'text-agothe-white' },
    { text: 'Navigate ', className: 'text-agothe-white' },
    { text: 'emergence', className: 'text-agothe-teal' },
    { text: '. ', className: 'text-agothe-white' },
    { text: 'Build ', className: 'text-agothe-white' },
    { text: 'coherence', className: 'text-agothe-gold' },
    { text: '.', className: 'text-agothe-white' },
  ];

  return (
    <section ref={containerRef} className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden px-4">
      <MeshGradientHero />

      <div className="relative z-10 mx-auto max-w-4xl text-center">
        <p
          data-hero-item=""
          className="mb-6 text-xs font-medium uppercase tracking-[0.3em] text-agothe-muted"
        >
          AI-Powered Research &amp; Crisis Intelligence
        </p>

        <h1 className="font-heading text-4xl font-bold leading-tight sm:text-5xl md:text-7xl">
          {headingSegments.map((seg, si) =>
            seg.text.split('').map((char, ci) =>
              char === ' ' ? (
                <span key={`${si}-${ci}`}> </span>
              ) : (
                <span key={`${si}-${ci}`} className={`inline-block overflow-hidden ${seg.className}`}>
                  <span className="hero-char inline-block">{char}</span>
                </span>
              )
            )
          )}
        </h1>

        <p
          data-hero-item=""
          className="mx-auto mt-6 max-w-2xl text-lg text-agothe-muted md:text-xl"
        >
          6 AI systems. 200M research papers. Intelligence-grade analysis in
          hours, not weeks.
        </p>

        <div
          data-hero-item=""
          className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row"
        >
          <MagneticButton
            href="#demo"
            accentColor="#00f0ff"
            className="inline-flex items-center rounded-full bg-agothe-teal px-8 py-4 text-sm font-semibold text-agothe-bg"
            aria-label="See Live Demo"
          >
            See Live Demo
          </MagneticButton>
          <MagneticButton
            href="#pricing"
            accentColor="#00f0ff"
            className="inline-flex items-center rounded-full border border-agothe-teal px-8 py-4 text-sm font-semibold text-agothe-teal"
            aria-label="Commission a Report"
          >
            Commission a Report
          </MagneticButton>
        </div>

        <p
          data-hero-item=""
          className="mt-8 text-xs text-agothe-muted/60"
        >
          S2ORC Partner &nbsp;&middot;&nbsp; Notion Certified &nbsp;&middot;&nbsp; OpenAI Ecosystem
        </p>
      </div>

      <div
        data-hero-item=""
        className="obsidian-glass-static relative z-10 mx-auto mt-20 w-full max-w-4xl rounded-lg px-2 py-6 sm:px-6"
      >
        <div className="grid grid-cols-2 gap-y-6 md:grid-cols-4 md:gap-y-0">
          {metrics.map((m, i) => (
            <div
              key={m.label}
              className={`flex flex-col items-center px-4 ${
                i < metrics.length - 1
                  ? 'md:border-r md:border-[rgba(255,255,255,0.1)]'
                  : ''
              }`}
            >
              <MetricViz type={m.viz} className="mb-2" />
              <div className="text-3xl text-agothe-white md:text-4xl">
                <Counter
                  target={m.value}
                  prefix={m.prefix}
                  suffix={m.suffix}
                  decimals={m.decimals}
                  countDown={m.countDown}
                />
              </div>
              <p className="mt-1 text-center text-[10px] font-medium uppercase tracking-[0.2em] text-agothe-muted">
                {m.label}
              </p>
            </div>
          ))}
        </div>
      </div>

      <LiveStatus />
    </section>
  );
}
