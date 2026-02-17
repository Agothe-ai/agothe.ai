'use client';

import { X, Check } from 'lucide-react';
import { AnimatedSection, AnimatedItem } from './animated-section';
import { SectionHeading } from './section-heading';
import { ObsidianCard } from './obsidian-card';

const oldWay = [
  '2-3 weeks for a single report',
  '$50,000+ per consulting engagement',
  'Qualitative analysis without metrics',
  'Single-perspective, fragmented insights',
  'Generic intervention strategies',
];

const agotheWay = [
  'Under 2 hours, start to finish',
  'Fraction of traditional cost',
  'Quantified analysis with MCS scoring',
  '6 AI systems cross-validating simultaneously',
  'Optimized interventions ranked by impact',
];

export function ProblemSection() {
  return (
    <section id="problem" className="px-4 py-24 md:py-32">
      <AnimatedSection className="mx-auto max-w-6xl">
        <SectionHeading title="Traditional analysis is broken." />

        <AnimatedItem>
          <div className="grid gap-6 md:grid-cols-2">
            <ObsidianCard className="opacity-70">
              <h3 className="mb-6 font-heading text-lg font-bold text-agothe-muted">
                The Old Way
              </h3>
              <ul className="space-y-4">
                {oldWay.map((item) => (
                  <li key={item} className="flex items-start gap-3 text-agothe-muted">
                    <X className="mt-0.5 h-4 w-4 shrink-0 text-agothe-danger" />
                    <span className="text-sm">{item}</span>
                  </li>
                ))}
              </ul>
            </ObsidianCard>

            <ObsidianCard>
              <h3 className="mb-6 font-heading text-lg font-bold text-agothe-teal">
                The Agothe Way
              </h3>
              <ul className="space-y-4">
                {agotheWay.map((item) => (
                  <li key={item} className="flex items-start gap-3 text-agothe-white">
                    <Check className="mt-0.5 h-4 w-4 shrink-0 text-agothe-teal" />
                    <span className="text-sm">{item}</span>
                  </li>
                ))}
              </ul>
            </ObsidianCard>
          </div>
        </AnimatedItem>

        <AnimatedItem>
          <p className="mx-auto mt-12 max-w-3xl text-center text-lg leading-relaxed text-white/90 shadow-[0_0_20px_rgba(255,255,255,0.1)] md:text-xl">
            Agothe coordinates six specialized AI systems through a mathematical
            framework called Constraint-Resonance Duality. The result:
            intelligence-grade analysis that&apos;s faster, cheaper, and more
            rigorous than anything on the market.
          </p>
        </AnimatedItem>
      </AnimatedSection>
    </section>
  );
}
