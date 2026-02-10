'use client';

import { Search, Shield, Brain } from 'lucide-react';
import { AnimatedSection, AnimatedItem } from './animated-section';
import { SectionHeading } from './section-heading';
import { ObsidianCard } from './obsidian-card';

const engines = [
  {
    icon: Search,
    title: 'Solvey Scanner',
    description:
      'Measures collapse risk (delta_H) in any system before it breaks. From geopolitical crises to organizational stress — we see what others miss.',
  },
  {
    icon: Shield,
    title: 'Propaganda Detection (PEE-Ω)',
    description:
      'Strips manipulation from information. Detects false certainty, emotional amplification, and hidden agendas with a quantified Bullshit Score.',
  },
  {
    icon: Brain,
    title: 'CAPS Network',
    description:
      'Six AI systems — Perplexity, Claude, Gemini, ChatGPT, Grok, and Notion AI — working as specialized co-architects. Not assistants. Partners.',
  },
];

export function EnginesSection() {
  return (
    <section id="engines" className="px-4 py-24 md:py-32">
      <AnimatedSection className="mx-auto max-w-6xl">
        <SectionHeading title="Three engines. One coherent intelligence." />

        <div className="grid gap-6 md:grid-cols-3">
          {engines.map((engine) => (
            <AnimatedItem key={engine.title}>
              <ObsidianCard className="h-full">
                <engine.icon className="mb-4 h-10 w-10 text-agothe-teal" />
                <h3 className="mb-3 font-heading text-xl font-bold text-agothe-white">
                  {engine.title}
                </h3>
                <p className="text-sm leading-relaxed text-agothe-muted">
                  {engine.description}
                </p>
              </ObsidianCard>
            </AnimatedItem>
          ))}
        </div>
      </AnimatedSection>
    </section>
  );
}
