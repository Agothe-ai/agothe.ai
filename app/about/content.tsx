'use client';

import { lazy, Suspense } from 'react';
import { motion } from 'framer-motion';
import { AnimatedSection, AnimatedItem } from '@/components/agothe/animated-section';
import { ObsidianCard } from '@/components/agothe/obsidian-card';
import { SectionHeading } from '@/components/agothe/section-heading';
import { CapsNetworkSection } from '@/components/agothe/caps-network-section';
import { MeshGradientHero } from '@/components/motion/mesh-gradient-hero';

const CAPSInteractive = lazy(() =>
  import('@/components/motion/caps-interactive').then((mod) => ({ default: mod.CAPSInteractive }))
);

const founders = [
  {
    name: 'Alex Gomez',
    subtitle: 'Systems Architect & Luminal Engineer',
    gradient: 'from-[#00f0ff] to-[#ffd700]',
    innerGradient: 'bg-gradient-to-br from-[#00f0ff]/20 via-agothe-bg to-agothe-bg',
    bio: [
      'Independent systems researcher specializing in multi-domain constraint analysis, mathematical modeling, and AI orchestration.',
      'Developed the Constraint-Resonance Duality (CRD) framework \u2014 a mathematical system for measuring collapse risk and emergence patterns across personal, organizational, and civilizational scales.',
      'Architect of a 2,000+ page living research Codex spanning applied mathematics, crisis intelligence, consciousness mapping, and cross-domain systems theory.',
      'Designed and validated a 52-engine computational architecture for real-time pattern detection, scenario simulation, and multi-AI coordination.',
    ],
  },
  {
    name: 'Armani Gomez',
    subtitle: 'Creative Director & Resonance Architect',
    gradient: 'from-[#ffd700] to-[#ff3366]',
    innerGradient: 'bg-gradient-to-br from-[#ffd700]/15 via-agothe-bg to-agothe-bg',
    bio: [
      'Phenomenological researcher and creative architect specializing in experiential design, sensory systems, and aesthetic innovation.',
      'Pioneered the resonance-side validation of the CRD framework \u2014 translating mathematical structures into embodied, experiential protocols.',
      'Leads creative direction across all Agothe verticals including therapeutic design, fashion systems, and immersive experience architecture.',
      'Brings the human-felt dimension that turns mathematical frameworks into tools people actually use.',
    ],
  },
];

const infrastructure = [
  {
    title: 'Agothe OS',
    description: 'Autonomous AI system with local LLM reasoning, file operations, Notion integration, and self-evolution.',
  },
  {
    title: '52-Engine Architecture',
    description: 'Full computational stack across 4 tiers (Foundation, Processing, Integration, Oracle).',
  },
  {
    title: 'Codex-as-CMS',
    description: '2,000+ pages feeding directly into public content via Notion API.',
  },
];

function FounderAvatar({ gradient, innerGradient }: { gradient: string; innerGradient: string }) {
  return (
    <motion.div
      whileHover={{ scale: 1.03 }}
      transition={{ duration: 0.3 }}
      className={`mx-auto h-[200px] w-[200px] rounded-full bg-gradient-to-br ${gradient} p-[2px]`}
    >
      <div className={`flex h-full w-full items-center justify-center rounded-full ${innerGradient}`}>
        <div
          className="h-full w-full rounded-full opacity-30"
          style={{
            backgroundImage:
              'repeating-linear-gradient(45deg, rgba(255,255,255,0.03) 0px, rgba(255,255,255,0.03) 1px, transparent 1px, transparent 12px)',
          }}
        />
      </div>
    </motion.div>
  );
}

export function AboutPageContent() {
  return (
    <main className="pt-20">
      <section className="relative overflow-hidden px-6 py-24 md:py-32">
        <MeshGradientHero />
        <AnimatedSection className="relative z-10 mx-auto max-w-3xl text-center">
          <AnimatedItem>
            <h1 className="font-heading text-4xl font-bold text-agothe-white md:text-6xl">
              Built by neurodivergent architects. Powered by six minds.
            </h1>
          </AnimatedItem>
          <AnimatedItem>
            <p className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-agothe-muted">
              Agothe coordinates the first commercially available multi-AI intelligence synthesis
              network. Every analysis is validated through Mereological Coherence Scoring (MCS
              &gt;0.90) &mdash; a mathematical measure of structural soundness.
            </p>
          </AnimatedItem>
        </AnimatedSection>
      </section>

      <section className="px-6 py-24 md:py-32">
        <AnimatedSection className="mx-auto max-w-6xl">
          <SectionHeading title="Founders" />
          <div className="grid gap-8 md:grid-cols-2">
            {founders.map((f) => (
              <AnimatedItem key={f.name}>
                <div className="obsidian-glass-static rounded-lg p-8">
                  <FounderAvatar gradient={f.gradient} innerGradient={f.innerGradient} />
                  <div className="mt-6 text-center">
                    <h3 className="font-heading text-xl font-bold text-agothe-white">{f.name}</h3>
                    <p className="mt-1 text-sm text-agothe-teal">{f.subtitle}</p>
                  </div>
                  <ul className="mt-6 space-y-4">
                    {f.bio.map((line, i) => (
                      <li key={i} className="flex items-start gap-3 text-sm leading-relaxed text-agothe-muted">
                        <span className="mt-1.5 block h-1.5 w-1.5 shrink-0 rounded-full bg-agothe-teal" />
                        {line}
                      </li>
                    ))}
                  </ul>
                </div>
              </AnimatedItem>
            ))}
          </div>
        </AnimatedSection>
      </section>

      <CapsNetworkSection />

      <Suspense fallback={<div className="h-96 bg-agothe-bg" />}>
        <CAPSInteractive />
      </Suspense>

      <section className="px-6 py-24 md:py-32">
        <AnimatedSection className="mx-auto max-w-6xl">
          <SectionHeading title="Infrastructure" subtitle="The systems powering every analysis." />
          <div className="grid gap-6 md:grid-cols-3">
            {infrastructure.map((item) => (
              <AnimatedItem key={item.title}>
                <ObsidianCard className="h-full">
                  <h3 className="mb-2 font-heading text-lg font-bold text-agothe-white">{item.title}</h3>
                  <p className="text-sm leading-relaxed text-agothe-muted">{item.description}</p>
                </ObsidianCard>
              </AnimatedItem>
            ))}
          </div>
        </AnimatedSection>
      </section>
    </main>
  );
}
