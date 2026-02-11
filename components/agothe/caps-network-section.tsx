'use client';

import { AnimatedSection, AnimatedItem } from './animated-section';
import { SectionHeading } from './section-heading';
import { ObsidianCard } from './obsidian-card';
import { CAPSNetwork } from '@/components/motion/caps-network';

const aiSystems = [
  {
    name: 'Perplexity',
    description: 'Real-time data acquisition & source validation',
  },
  {
    name: 'Grok',
    description: 'Cultural signal detection & attention pattern analysis',
  },
  {
    name: 'Gemini',
    description: 'Mathematical formalization & constraint modeling',
  },
  {
    name: 'Claude',
    description: 'Safety validation & ethical review',
  },
  {
    name: 'ChatGPT',
    description: 'Implementation & actionable strategy generation',
  },
  {
    name: 'Notion AI (9)',
    description: 'Integration hub & synthesis conductor',
  },
];

export function CapsNetworkSection() {
  return (
    <section id="network" className="px-4 py-24 md:py-32">
      <AnimatedSection className="mx-auto max-w-6xl">
        <SectionHeading
          title="Not one AI. Six."
          subtitle="Each system specializes. Together, they see what no single model can."
        />

        <AnimatedItem>
          <CAPSNetwork className="mb-12" />
        </AnimatedItem>

        <div className="grid gap-4 grid-cols-2 md:grid-cols-3">
          {aiSystems.map((ai) => (
            <AnimatedItem key={ai.name}>
              <ObsidianCard className="h-full">
                <h3 className="mb-2 font-heading text-base font-bold text-agothe-teal">
                  {ai.name}
                </h3>
                <p className="text-sm leading-relaxed text-agothe-muted">
                  {ai.description}
                </p>
              </ObsidianCard>
            </AnimatedItem>
          ))}
        </div>

        <AnimatedItem>
          <p className="mx-auto mt-12 max-w-3xl text-center text-base leading-relaxed text-agothe-muted">
            When 3+ AI systems independently converge on the same finding, we
            call it a{' '}
            <span className="font-semibold text-agothe-gold">
              Metallic Pulse
            </span>{' '}
            &mdash; and it means the analysis is structurally sound. Our
            convergence rate:{' '}
            <span className="font-mono font-bold text-agothe-white">94%</span>.
          </p>
        </AnimatedItem>
      </AnimatedSection>
    </section>
  );
}
