'use client';

import { AnimatedSection, AnimatedItem } from './animated-section';
import { SectionHeading } from './section-heading';
import { ObsidianCard } from './obsidian-card';

const metrics = [
  {
    stat: 'MCS >0.90',
    description: 'Every analysis passes structural coherence validation',
  },
  {
    stat: '<4 Hour Delivery',
    description: 'Intelligence-grade synthesis, not weeks-long consulting',
  },
  {
    stat: '6-AI Validation',
    description: 'Metallic Pulse convergence rate: 94%',
  },
];

export function TrustSection() {
  return (
    <section className="px-6 py-24 md:py-32">
      <AnimatedSection className="mx-auto max-w-6xl">
        <SectionHeading title="Validated by mathematics. Trusted by decision-makers." />

        <div className="grid gap-6 md:grid-cols-3">
          {metrics.map((m) => (
            <AnimatedItem key={m.stat}>
              <ObsidianCard className="h-full text-center">
                <p className="font-mono text-2xl font-bold text-agothe-teal">{m.stat}</p>
                <p className="mt-3 text-sm leading-relaxed text-agothe-muted">{m.description}</p>
              </ObsidianCard>
            </AnimatedItem>
          ))}
        </div>

        <AnimatedItem>
          <p className="mt-10 text-center text-sm text-agothe-muted">
            Financial Services &nbsp;|&nbsp; Policy Research &nbsp;|&nbsp; Academic Institutions &nbsp;|&nbsp; Crisis Management
          </p>
        </AnimatedItem>
      </AnimatedSection>
    </section>
  );
}
