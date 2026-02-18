'use client';

import { useRef, useEffect } from 'react';
import { Counter } from './counter';
import { LiveStatus } from './live-status';
import { SmartImage } from './smart-image';
import { NewsletterSignup } from './newsletter-signup';
import { useReducedMotion } from '@/hooks/use-reduced-motion';

const metrics = [
  { value: 0.9, prefix: 'MCS > ', suffix: '', decimals: 1, label: 'Analysis Coherence' },
  { value: 2, prefix: '< ', suffix: '', decimals: 0, label: 'Average Delivery', countDown: true },
  { value: 6, prefix: '', suffix: '', decimals: 0, label: 'Coordinated Network' },
  { value: 200, prefix: '', suffix: 'M+', decimals: 0, label: 'Research Access' },
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
      gsap.set(items, { opacity: 0, y: 30 });

      const tl = gsap.timeline({ delay: 0.2 });
      Array.from(items).forEach((item, i) => {
        tl.to(item, { opacity: 1, y: 0, duration: 0.6, ease: 'power2.out' }, i === 0 ? '>' : '-=0.35');
      });

      cleanup = () => tl.kill();
    })();

    return () => cleanup?.();
  }, [reducedMotion]);

  return (
    <section
      ref={containerRef}
      className="relative min-h-screen overflow-hidden pt-20"
    >
      {/* ── BACKGROUND IMAGE ── */}
      <div className="absolute inset-0 z-0">
        <SmartImage
          src="/images/heroes/landing-substrate.webp"
          alt="Agothe Intelligence substrate visualization"
          fill
          priority={true}
          sizes="100vw"
          className="object-cover object-center"
        />
        {/* Phase 3: directional overlay — left dark for text, right breathes */}
        <div
          className="absolute inset-0"
          style={{
            background: `
              linear-gradient(to right,
                rgba(10,10,18,0.88) 0%,
                rgba(10,10,18,0.70) 38%,
                rgba(10,10,18,0.28) 62%,
                rgba(10,10,18,0.08) 100%
              ),
              linear-gradient(to bottom,
                rgba(10,10,18,0.50) 0%,
                transparent 25%,
                transparent 70%,
                rgba(10,10,18,0.95) 100%
              )
            `,
          }}
        />
      </div>

      {/* ── HERO BODY ── */}
      <div className="relative z-10 mx-auto flex min-h-[calc(100vh-5rem)] max-w-7xl flex-col justify-between px-8 py-12 md:px-14 lg:px-20">

        {/* ── TOP: SPLIT GRID (text left / tile right) ── */}
        <div className="flex flex-1 flex-col justify-center">
          <div className="grid grid-cols-1 items-start gap-10 lg:grid-cols-[54fr_46fr] lg:gap-14">

            {/* LEFT COLUMN */}
            <div className="flex flex-col">

              {/* Live badge */}
              <div data-hero-item="" className="mb-5 inline-flex items-center gap-2 self-start rounded-full border border-agothe-teal/30 bg-[rgba(0,240,255,0.06)] px-4 py-1.5">
                <span className="relative flex h-1.5 w-1.5">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-agothe-teal opacity-75" />
                  <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-agothe-teal" />
                </span>
                <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-agothe-teal">
                  Live Analysis Active
                </span>
              </div>

              {/* BUILD WHAT SURVIVES — one line each, clamp keeps it single-line */}
              <div data-hero-item="" className="hero-text-safe">
                <h1 className="font-heading font-black uppercase leading-[1.0] tracking-tight">
                  <span className="block whitespace-nowrap text-[clamp(2.8rem,6.5vw,6rem)] text-agothe-white">
                    BUILD WHAT
                  </span>
                  <span className="block whitespace-nowrap text-[clamp(2.8rem,6.5vw,6rem)] text-agothe-teal">
                    SURVIVES
                  </span>
                </h1>
              </div>

              {/* Subtext */}
              <p data-hero-item="" className="mt-5 pb-1 text-[clamp(0.95rem,1.6vw,1.15rem)] leading-[1.8] text-agothe-muted">
                6 AI systems.{' '}
                <span className="font-semibold text-agothe-teal">200M</span> research papers.
                <br />
                Intelligence-grade analysis in hours, not weeks.
              </p>

              {/* Partner line */}
              <p data-hero-item="" className="mt-5 text-[11px] uppercase tracking-[0.2em] text-agothe-muted/50">
                S2ORC Partner &nbsp;·&nbsp; Notion Certified &nbsp;·&nbsp; OpenAI Ecosystem
              </p>

              {/* Newsletter */}
              <div data-hero-item="">
                <NewsletterSignup />
              </div>
            </div>

            {/* RIGHT COLUMN — LIVE ANALYSIS TILE */}
            <div data-hero-item="" className="w-full">
              <div
                className="relative rounded-2xl border border-[rgba(0,240,255,0.18)] p-6 md:p-7"
                style={{
                  background: 'rgba(6,10,20,0.82)',
                  backdropFilter: 'blur(28px)',
                  WebkitBackdropFilter: 'blur(28px)',
                  boxShadow: '0 0 80px rgba(0,240,255,0.07), 0 0 0 1px rgba(255,255,255,0.03) inset',
                }}
              >
                {/* Tile header */}
                <div className="mb-5 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="relative flex h-2 w-2">
                      <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                      <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
                    </span>
                    <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-emerald-400">
                      Live Analysis
                    </span>
                  </div>
                  <span className="font-mono text-[10px] text-agothe-muted/40">CAPS v3.1</span>
                </div>

                {/* BIG MCS number */}
                <div className="mb-5 border-b border-[rgba(255,255,255,0.07)] pb-5 text-center">
                  <p className="mb-1 text-[10px] uppercase tracking-[0.25em] text-agothe-muted/50">
                    MCS Coherence
                  </p>
                  <div
                    className="font-mono text-[5rem] font-bold leading-none text-agothe-teal"
                    style={{ textShadow: '0 0 40px rgba(0,240,255,0.45)' }}
                  >
                    0.92
                  </div>
                  {/* MCS bar */}
                  <div className="mt-3 h-1.5 w-full overflow-hidden rounded-full bg-[rgba(255,255,255,0.06)]">
                    <div
                      className="h-full rounded-full bg-agothe-teal"
                      style={{ width: '92%', boxShadow: '0 0 10px rgba(0,240,255,0.6)' }}
                    />
                  </div>
                  <p className="mt-2 text-right font-mono text-[10px] text-agothe-muted/40">
                    92% convergence
                  </p>
                </div>

                {/* 6 AI system rows */}
                <div className="mb-5 space-y-2 border-b border-[rgba(255,255,255,0.07)] pb-5">
                  {[
                    { name: 'Perplexity', time: '0.12s' },
                    { name: 'Claude',     time: '0.08s' },
                    { name: 'Gemini',     time: '0.15s' },
                    { name: 'ChatGPT',    time: '0.11s' },
                    { name: 'Grok',       time: '0.19s' },
                    { name: 'Notion AI',  time: '0.14s' },
                  ].map((sys) => (
                    <div key={sys.name} className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                        <span className="font-mono text-[11px] text-agothe-white">{sys.name}</span>
                      </div>
                      <span className="font-mono text-[11px] text-agothe-muted/50">{sys.time}</span>
                    </div>
                  ))}
                </div>

                {/* Metallic Pulse */}
                <div
                  className="flex items-center justify-between rounded-lg px-4 py-2.5"
                  style={{
                    background: 'rgba(255,215,0,0.07)',
                    border: '1px solid rgba(255,215,0,0.18)',
                  }}
                >
                  <span className="font-mono text-[11px] font-semibold text-agothe-gold">
                    ⚡ METALLIC PULSE CONFIRMED
                  </span>
                  <span className="font-mono text-[10px] text-agothe-gold/70">
                    94% convergence detected
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ── PREDICT COLLAPSE — floating right, below the grid ── */}
        <div data-hero-item="" className="hero-text-safe pointer-events-none mt-6 flex justify-end lg:mt-0 lg:absolute lg:bottom-[18%] lg:right-[5%]">
          <h2 className="font-heading font-black uppercase leading-[1.0] tracking-tight">
            <span className="block whitespace-nowrap text-[clamp(2.2rem,5vw,4.8rem)] text-agothe-white">
              PREDICT
            </span>
            <span className="block whitespace-nowrap text-[clamp(2.2rem,5vw,4.8rem)] text-agothe-danger">
              COLLAPSE
            </span>
          </h2>
        </div>

        {/* ── BOTTOM: 4-METRIC BAR + LIVE STATUS ── */}
        <div className="mt-8 space-y-3 lg:mt-6">
          {/* 4-column metrics bar */}
          <div
            data-hero-item=""
            className="w-full rounded-lg border border-[rgba(0,240,255,0.15)] px-4 py-4"
            style={{
              background: 'rgba(6,10,20,0.75)',
              backdropFilter: 'blur(20px)',
              WebkitBackdropFilter: 'blur(20px)',
            }}
          >
            <div className="grid grid-cols-2 gap-4 md:grid-cols-4 md:gap-2">
              {metrics.map((m, i) => (
                <div
                  key={m.label}
                  className={`flex flex-col items-center px-3 py-2 ${
                    i < metrics.length - 1 ? 'md:border-r md:border-[rgba(255,255,255,0.08)]' : ''
                  }`}
                >
                  <div className="font-mono text-2xl font-bold text-agothe-white md:text-3xl">
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

            {/* System status row */}
            <div className="mt-3 flex items-center justify-center gap-4 border-t border-[rgba(255,255,255,0.08)] pt-3 text-xs">
              <div className="flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-green-500" />
                <span className="font-mono text-[10px] uppercase tracking-wider text-agothe-white">
                  System Operational
                </span>
              </div>
              <div className="flex items-center gap-1 font-mono text-[10px] text-agothe-muted">
                <span>01</span><span>/</span><span>02</span><span>/</span><span>03</span>
              </div>
              <div className="font-mono text-[10px] text-agothe-muted">
                Stage: <span className="text-agothe-white">2</span>
              </div>
            </div>
          </div>

          {/* Live status ticker */}
          <div data-hero-item="">
            <LiveStatus />
          </div>
        </div>
      </div>
    </section>
  );
}
