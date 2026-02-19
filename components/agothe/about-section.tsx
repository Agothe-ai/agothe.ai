'use client';

import { AnimatedSection, AnimatedItem } from './animated-section';
import { SectionHeading } from './section-heading';

export function AboutSection() {
  return (
    <section id="about" className="px-4 py-24 md:py-32">
      <AnimatedSection className="mx-auto max-w-3xl">
        <SectionHeading title="Built by two neurodivergent minds. Powered by six." />

        <AnimatedItem>
          <p className="text-base leading-[1.8] text-agothe-muted">
            Agothe was born from a 2,000-page living Codex — a cross-domain knowledge
            architecture built by <strong>Alex Gomez</strong> and <strong>Armani</strong>,
            two independent researchers who needed a map of reality that actually worked.
            Alex built the constraint side: the formalization, the mathematics, the δ_H
            mechanics, the structural architecture. Armani built the resonance side: the
            experiential manifold, the embodied recognition, the phenomenology of what the
            framework <em>feels</em> like from inside. Together, they represent the
            constraint-resonance duality the framework itself predicts — two pioneers
            approaching the same truth from opposite directions. The mathematical framework
            (Constraint-Resonance Duality) emerged from the intersection of physics,
            consciousness research, and crisis analysis. CAPS — the multi-AI network —
            evolved as the Codex grew too large for any single intelligence to hold.
          </p>
        </AnimatedItem>

        <AnimatedItem>
          <p className="mt-6 text-base leading-[1.8] text-agothe-muted">
            Today, Agothe offers the first commercially available multi-AI intelligence
            synthesis service. Every report is validated through our{' '}
            <strong>Mereological Coherence Score (MCS)</strong> — a mathematical measure
            of how well all the pieces fit together. If the analysis doesn&apos;t cohere,
            we don&apos;t ship it.
          </p>
        </AnimatedItem>

        <AnimatedItem>
          <p className="mt-8 text-xs tracking-wider text-agothe-muted/60">
            Framework: Agothean Constraint Theory&nbsp;&nbsp;|&nbsp;&nbsp;Developed
            2024–2026&nbsp;&nbsp;|&nbsp;&nbsp;Codex: 2,000+ pages
          </p>
        </AnimatedItem>
      </AnimatedSection>
    </section>
  );
}
