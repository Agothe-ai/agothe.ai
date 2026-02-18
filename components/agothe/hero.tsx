'use client';

import { useRef, useEffect } from 'react';
import { Counter } from './counter';
import { LiveStatus } from './live-status';
import { SmartImage } from './smart-image';
import { NewsletterSignup } from './newsletter-signup';
import { useReducedMotion } from '@/hooks/use-reduced-motion';

// AI Systems for status display
const aiSystems = [
  { name: 'Perplexity', status: 'active', latency: 0.12 },
  { name: 'Claude', status: 'active', latency: 0.08 },
  { name: 'Gemini', status: 'active', latency: 0.15 },
  { name: 'ChatGPT', status: 'active', latency: 0.11 },
  { name: 'Grok', status: 'active', latency: 0.19 },
  { name: 'Notion AI', status: 'active', latency: 0.14 },
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

      // Stagger fade-in for all hero items
      items.forEach((item, i) => {
        tl.to(item, { 
          opacity: 1, 
          y: 0, 
          duration: 0.6, 
          ease: 'power2.out' 
        }, i === 0 ? 0 : '-=0.4');
      });

      cleanup = () => tl.kill();
    })();

    return () => cleanup?.();
  }, [reducedMotion]);

  return (
    <section ref={containerRef} className="relative min-h-screen overflow-hidden px-8 py-20 md:px-16 lg:px-24">
      {/* Phase 3: Background image with directional gradients */}
      <div className="absolute inset-0 z-0">
        <SmartImage
          src="/images/heroes/landing-substrate.webp"
          alt="Agothe Intelligence substrate visualization"
          fill
          priority={true}
          sizes="100vw"
          className="object-cover"
        />
        {/* Directional gradients: left-to-right (92% dark on left, 10% on right) */}
        <div className="absolute inset-0 bg-gradient-to-r from-agothe-bg/95 via-agothe-bg/60 to-agothe-bg/10" />
        {/* Top-to-bottom gradient for depth */}
        <div className="absolute inset-0 bg-gradient-to-b from-agothe-bg/40 via-transparent to-agothe-bg/80" />
      </div>

      {/* Phase 1: Two-column grid layout (55fr/45fr) */}
      <div className="relative z-10 mx-auto grid max-w-7xl gap-8 lg:grid-cols-[55fr_45fr] lg:gap-12">
        
        {/* Left Column: Text Stack */}
        <div className="flex flex-col justify-center space-y-8">
          
          {/* Primary headline with hero-text-safe */}
          <div data-hero-item="" className="hero-text-safe">
            <h1 
              className="font-heading uppercase leading-none tracking-tight text-agothe-white"
              style={{ fontSize: 'clamp(3rem, 8vw, 7rem)' }}
            >
              <span className="block">BUILD WHAT</span>
              <span className="block text-agothe-teal">SURVIVES</span>
            </h1>
          </div>

          {/* Badge */}
          <div 
            data-hero-item="" 
            className="inline-flex items-center gap-2 self-start rounded-full border border-agothe-teal/30 bg-agothe-teal/10 px-4 py-2 backdrop-blur-sm"
          >
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-agothe-teal opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-agothe-teal" />
            </span>
            <span className="font-mono text-xs font-medium uppercase tracking-wider text-agothe-teal">
              Live Analysis Active
            </span>
          </div>

          {/* Subheading */}
          <p
            data-hero-item=""
            className="text-agothe-white/90"
            style={{ fontSize: 'clamp(1.125rem, 2vw, 1.5rem)', lineHeight: '1.6' }}
          >
            6 AI systems. <span className="font-semibold text-agothe-teal">200M</span> research papers.<br />
            Intelligence-grade analysis in hours, not weeks.
          </p>

          {/* Partner badges */}
          <p
            data-hero-item=""
            className="text-xs text-agothe-muted/70"
          >
            S2ORC Partner &nbsp;&middot;&nbsp; Notion Certified &nbsp;&middot;&nbsp; OpenAI Ecosystem
          </p>

          {/* Newsletter signup */}
          <div data-hero-item="">
            <NewsletterSignup />
          </div>
        </div>

        {/* Right Column: Live Analysis Tile (Phase 2) */}
        <div data-hero-item="" className="flex items-center justify-center lg:justify-end">
          <div className="obsidian-glass w-full max-w-md rounded-2xl border border-agothe-teal/20 p-6 shadow-2xl lg:mr-8">
            
            {/* MCS Score with teal glow */}
            <div className="mb-6 text-center">
              <div 
                className="font-heading font-black text-agothe-teal"
                style={{ 
                  fontSize: 'clamp(3rem, 5vw, 5rem)',
                  textShadow: '0 0 30px rgba(0, 240, 255, 0.5), 0 0 60px rgba(0, 240, 255, 0.3)'
                }}
              >
                <Counter target={0.92} prefix="" suffix="" decimals={2} />
              </div>
              <p className="mt-2 font-mono text-sm uppercase tracking-wider text-agothe-muted">
                MCS Coherence
              </p>
            </div>

            {/* MCS Progress Bar */}
            <div className="mb-6">
              <div className="relative h-3 overflow-hidden rounded-full bg-agothe-navy/50">
                <div 
                  className="h-full bg-gradient-to-r from-agothe-teal to-agothe-teal/80 transition-all duration-1000 ease-out"
                  style={{ 
                    width: '92%',
                    boxShadow: '0 0 20px rgba(0, 240, 255, 0.6), inset 0 1px 2px rgba(255, 255, 255, 0.3)'
                  }}
                />
              </div>
              <p className="mt-2 text-right font-mono text-xs text-agothe-muted">
                92% convergence
              </p>
            </div>

            {/* AI System Status Rows */}
            <div className="space-y-2 border-t border-agothe-white/10 pt-4">
              {aiSystems.map((system, idx) => (
                <div 
                  key={system.name}
                  className="flex items-center justify-between"
                  style={{ 
                    animation: `fadeIn 0.5s ease-out ${0.1 * idx}s both` 
                  }}
                >
                  <div className="flex items-center gap-2">
                    <span 
                      className="relative flex h-1.5 w-1.5"
                      style={{ 
                        animation: `pulse 2s ease-in-out infinite ${0.2 * idx}s` 
                      }}
                    >
                      <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                      <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-emerald-500" />
                    </span>
                    <span className="font-mono text-xs text-agothe-white">
                      {system.name}
                    </span>
                  </div>
                  <span className="font-mono text-xs text-agothe-muted">
                    {system.latency}s
                  </span>
                </div>
              ))}
            </div>

            {/* Gold "Metallic Pulse confirmed" strip */}
            <div className="mt-6 rounded-lg bg-gradient-to-r from-agothe-gold/20 to-agothe-gold/10 p-3 text-center">
              <p className="font-mono text-xs font-bold uppercase tracking-wider text-agothe-gold">
                ⚡ Metallic Pulse Confirmed
              </p>
              <p className="mt-1 font-mono text-[10px] text-agothe-gold/70">
                94% convergence detected
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* LiveStatus component at bottom */}
      <div className="relative z-10">
        <LiveStatus />
      </div>

      {/* CSS for animations */}
      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes pulse {
          0%, 100% {
            opacity: 1;
          }
          50% {
            opacity: 0.5;
          }
        }
      `}</style>
    </section>
  );
}
