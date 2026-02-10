'use client';

import { useEffect, useState, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import Link from 'next/link';
import { AnimatedSection, AnimatedItem } from './animated-section';
import { SectionHeading } from './section-heading';

function AnimatedGauge({ target, color }: { target: number; color: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true });
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (!isInView) return;
    let start = 0;
    const duration = 1500;
    const startTime = performance.now();
    function tick(now: number) {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      start = eased * target;
      setValue(start);
      if (progress < 1) requestAnimationFrame(tick);
    }
    requestAnimationFrame(tick);
  }, [isInView, target]);

  const pct = (value / 3) * 100;
  const gaugeColor = value < 0.5 ? '#00f0ff' : value < 1.5 ? '#ffd700' : '#ff3366';

  return (
    <div ref={ref}>
      <div className="relative h-2 w-full overflow-hidden rounded-full bg-[rgba(255,255,255,0.06)]">
        <motion.div
          className="absolute left-0 top-0 h-full rounded-full"
          style={{ backgroundColor: gaugeColor, width: `${pct}%` }}
          initial={{ width: 0 }}
          animate={isInView ? { width: `${pct}%` } : {}}
          transition={{ duration: 1.5, ease: 'easeOut' }}
        />
      </div>
      <p className="mt-2 font-mono text-2xl font-bold" style={{ color: gaugeColor }}>
        {value.toFixed(2)}
      </p>
      <p className="text-[10px] uppercase tracking-wider text-agothe-muted">δ_H Collapse Index</p>
    </div>
  );
}

function PropagandaBar() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true });
  const [pct, setPct] = useState(0);

  useEffect(() => {
    if (!isInView) return;
    const duration = 1200;
    const startTime = performance.now();
    function tick(now: number) {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      setPct(progress * 52);
      if (progress < 1) requestAnimationFrame(tick);
    }
    requestAnimationFrame(tick);
  }, [isInView]);

  return (
    <div ref={ref}>
      <div className="relative h-2 w-full overflow-hidden rounded-full bg-[rgba(255,255,255,0.06)]">
        <motion.div
          className="absolute left-0 top-0 h-full rounded-full bg-agothe-danger"
          initial={{ width: 0 }}
          animate={isInView ? { width: '52%' } : {}}
          transition={{ duration: 1.2, ease: 'easeOut' }}
        />
      </div>
      <p className="mt-2 font-mono text-2xl font-bold text-agothe-danger">
        {pct.toFixed(0)}%
      </p>
      <p className="text-[10px] uppercase tracking-wider text-agothe-muted">Propaganda Layering</p>
    </div>
  );
}

const interventions = [
  { name: 'Economic de-coupling narrative shift', impact: '-0.22' },
  { name: 'Diplomatic back-channel activation', impact: '-0.15' },
  { name: 'Media counter-narrative deployment', impact: '-0.11' },
];

export function CAPSReportPreview() {
  return (
    <section className="px-6 py-24 md:py-32">
      <AnimatedSection className="mx-auto max-w-6xl">
        <SectionHeading
          title="See a Real CAPS Report"
          subtitle="Sample data from our U.S.\u2013Iran Crisis Analysis."
        />

        <div className="grid gap-6 md:grid-cols-3">
          <AnimatedItem>
            <div className="obsidian-glass rounded-lg p-6">
              <h3 className="mb-4 font-heading text-base font-bold text-agothe-teal">
                Solvey Scan
              </h3>
              <AnimatedGauge target={0.76} color="#ff3366" />
              <p className="mt-3 text-xs leading-relaxed text-agothe-muted">
                3 Orric paradox points detected. System approaching critical threshold.
              </p>
            </div>
          </AnimatedItem>

          <AnimatedItem>
            <div className="obsidian-glass rounded-lg p-6">
              <h3 className="mb-4 font-heading text-base font-bold text-agothe-danger">
                PEE-Ω Analysis
              </h3>
              <PropagandaBar />
              <p className="mt-3 text-xs leading-relaxed text-agothe-muted">
                52% of media coverage contains identified propaganda layering.
              </p>
            </div>
          </AnimatedItem>

          <AnimatedItem>
            <div className="obsidian-glass rounded-lg p-6">
              <h3 className="mb-4 font-heading text-base font-bold text-agothe-gold">
                Intervention Matrix
              </h3>
              <ul className="space-y-3">
                {interventions.map((item, i) => (
                  <li key={i} className="flex items-center justify-between gap-2">
                    <span className="text-xs text-agothe-muted">{item.name}</span>
                    <span className="shrink-0 font-mono text-sm font-bold text-agothe-teal">
                      Δδ_H: {item.impact}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </AnimatedItem>
        </div>

        <AnimatedItem>
          <p className="mx-auto mt-8 max-w-2xl text-center text-sm text-agothe-muted">
            This is a sample from our U.S.\u2013Iran Crisis Analysis. Full reports include
            15+ pages of cross-validated intelligence.
          </p>
          <div className="mt-6 text-center">
            <Link
              href="/contact"
              className="inline-flex items-center rounded-full bg-agothe-gold px-6 py-3 text-sm font-semibold text-agothe-bg transition-shadow hover:shadow-[0_0_20px_rgba(255,215,0,0.3)]"
            >
              Commission Your Report
            </Link>
          </div>
        </AnimatedItem>
      </AnimatedSection>
    </section>
  );
}
