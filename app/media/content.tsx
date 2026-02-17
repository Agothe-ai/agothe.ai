'use client';

import { useState } from 'react';
import { AnimatedSection, AnimatedItem } from '@/components/agothe/animated-section';
import { SectionHeading } from '@/components/agothe/section-heading';
import { ObsidianCard } from '@/components/agothe/obsidian-card';
import { Copy, Check } from 'lucide-react';
import { PageHero } from '@/components/agothe/page-hero';

const brandColors = [
  { name: 'Obsidian Black', hex: '#0a0a0a', text: 'text-agothe-white' },
  { name: 'Signal Teal', hex: '#00f0ff', text: 'text-agothe-bg' },
  { name: 'Oracle Gold', hex: '#ffd700', text: 'text-agothe-bg' },
  { name: 'Collapse Red', hex: '#ff3366', text: 'text-agothe-bg' },
  { name: 'Cloud White', hex: '#f5f5f5', text: 'text-agothe-bg' },
  { name: 'Muted Gray', hex: '#a0a0a0', text: 'text-agothe-bg' },
];

const typography = [
  { name: 'Space Grotesk', role: 'Headings', weight: '700', sample: 'Predict collapse. Navigate emergence.' },
  { name: 'Inter', role: 'Body Text', weight: '400 / 500', sample: 'Intelligence-grade analysis in hours, not weeks.' },
  { name: 'JetBrains Mono', role: 'Data / Code', weight: '400 / 700', sample: 'MCS > 0.90 | delta_H: 2.3' },
];

const descriptions = {
  short: 'Agothe is a multi-AI intelligence synthesis platform delivering mathematically validated analysis through six coordinated AI systems.',
  medium: 'Agothe coordinates the first commercially available multi-AI intelligence synthesis network. Using the Constraint-Resonance Duality (CRD) framework, we deliver mathematically validated analyses across crisis intelligence, research synthesis, propaganda detection, and scenario simulation. Every output is validated through Mereological Coherence Scoring (MCS >0.90).',
  long: 'Founded by Alex Gomez and Armani Gomez, Agothe operates at the intersection of applied mathematics, artificial intelligence, and crisis intelligence. The platform coordinates six AI systems through the CAPS (Coordinated AI Processing System) network, powered by a 52-engine computational architecture spanning data ingestion, constraint field mapping, multi-AI synthesis, and mereological validation. The Constraint-Resonance Duality (CRD) framework — a mathematical system for measuring collapse risk and emergence patterns — provides the theoretical foundation for all analyses. Agothe delivers intelligence-grade reports on geopolitical crises, research synthesis, propaganda detection, and scenario simulation, with average delivery times under 4 hours and Mereological Coherence Scores consistently above 0.90.',
};

const founders = [
  {
    name: 'Alex Gomez',
    title: 'Systems Architect & Luminal Engineer',
    bio: 'Independent systems researcher specializing in multi-domain constraint analysis, mathematical modeling, and AI orchestration. Architect of the CRD framework and the 52-engine computational architecture.',
  },
  {
    name: 'Armani Gomez',
    title: 'Creative Director & Resonance Architect',
    bio: 'Phenomenological researcher and creative architect specializing in experiential design and sensory systems. Pioneered the resonance-side validation of the CRD framework.',
  },
];

function CopyButton({ text }: { text: string }) {
  const [copied, setCopied] = useState(false);

  function handleCopy() {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  return (
    <button
      onClick={handleCopy}
      className="flex items-center gap-1 rounded-md px-2 py-1 text-xs text-agothe-muted transition-colors hover:bg-white/5 hover:text-agothe-white"
    >
      {copied ? <Check className="h-3 w-3 text-agothe-teal" /> : <Copy className="h-3 w-3" />}
      {copied ? 'Copied' : 'Copy'}
    </button>
  );
}

export function MediaPageContent() {
  return (
    <main className="pt-20">
      <section className="relative overflow-hidden px-6 py-24 md:py-32">
        <PageHero imageSrc="/images/heroes/media-prism-organism.webp" imageAlt="Prism organism of media assets" />
        <AnimatedSection className="relative z-10 mx-auto max-w-3xl text-center">
          <AnimatedItem>
            <h1 className="font-heading text-4xl font-bold text-agothe-white md:text-6xl">
              Media Kit
            </h1>
          </AnimatedItem>
          <AnimatedItem>
            <p className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-agothe-muted">
              Brand assets, company descriptions, and press resources.
              Everything you need to write about Agothe accurately.
            </p>
          </AnimatedItem>
        </AnimatedSection>
      </section>

      <section className="px-6 py-16 md:py-24">
        <AnimatedSection className="mx-auto max-w-5xl space-y-20">
          <AnimatedItem>
            <div>
              <SectionHeading title="Brand Colors" />
              <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-6">
                {brandColors.map((c) => (
                  <div key={c.hex} className="overflow-hidden rounded-lg border border-white/5">
                    <div
                      className={`flex h-20 items-end p-2 ${c.text}`}
                      style={{ backgroundColor: c.hex }}
                    >
                      <span className="font-mono text-[10px] font-medium">{c.hex}</span>
                    </div>
                    <div className="bg-[rgba(17,17,17,0.6)] px-2 py-2">
                      <p className="text-xs font-medium text-agothe-white">{c.name}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </AnimatedItem>

          <AnimatedItem>
            <div>
              <SectionHeading title="Typography" />
              <div className="grid gap-4 md:grid-cols-3">
                {typography.map((t) => (
                  <ObsidianCard key={t.name} hover={false}>
                    <p className="text-xs font-medium uppercase tracking-wider text-agothe-muted/60">
                      {t.role}
                    </p>
                    <p className="mt-1 text-lg font-bold text-agothe-white">{t.name}</p>
                    <p className="mt-0.5 text-xs text-agothe-muted">Weight: {t.weight}</p>
                    <p
                      className="mt-3 border-t border-white/5 pt-3 text-sm text-agothe-muted"
                      style={{
                        fontFamily:
                          t.name === 'Space Grotesk'
                            ? 'var(--font-space-grotesk)'
                            : t.name === 'Inter'
                            ? 'var(--font-inter)'
                            : 'var(--font-jetbrains-mono)',
                      }}
                    >
                      {t.sample}
                    </p>
                  </ObsidianCard>
                ))}
              </div>
            </div>
          </AnimatedItem>

          <AnimatedItem>
            <div>
              <SectionHeading title="Company Descriptions" subtitle="Copy-ready descriptions for press use." />
              <div className="space-y-4">
                {Object.entries(descriptions).map(([key, text]) => (
                  <ObsidianCard key={key} hover={false}>
                    <div className="flex items-center justify-between">
                      <p className="text-xs font-medium uppercase tracking-wider text-agothe-teal">
                        {key === 'short' ? 'Short (1 sentence)' : key === 'medium' ? 'Medium (3 sentences)' : 'Long (full)'}
                      </p>
                      <CopyButton text={text} />
                    </div>
                    <p className="mt-3 text-sm leading-relaxed text-agothe-muted">{text}</p>
                  </ObsidianCard>
                ))}
              </div>
            </div>
          </AnimatedItem>

          <AnimatedItem>
            <div>
              <SectionHeading title="Founder Bios" subtitle="Press-ready biographical information." />
              <div className="grid gap-4 md:grid-cols-2">
                {founders.map((f) => (
                  <ObsidianCard key={f.name} hover={false}>
                    <div className="flex items-start justify-between">
                      <div>
                        <p className="font-heading text-lg font-bold text-agothe-white">{f.name}</p>
                        <p className="text-xs text-agothe-teal">{f.title}</p>
                      </div>
                      <CopyButton text={`${f.name}, ${f.title}\n${f.bio}`} />
                    </div>
                    <p className="mt-3 text-sm leading-relaxed text-agothe-muted">{f.bio}</p>
                  </ObsidianCard>
                ))}
              </div>
            </div>
          </AnimatedItem>

          <AnimatedItem>
            <div>
              <SectionHeading title="Key Facts" />
              <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3">
                {[
                  { label: 'Founded', value: '2024' },
                  { label: 'Headquarters', value: 'Remote-first' },
                  { label: 'AI Systems', value: '6 coordinated' },
                  { label: 'Research Papers', value: '200M+ (S2ORC)' },
                  { label: 'MCS Threshold', value: '>0.90' },
                  { label: 'Avg Delivery', value: '<4 hours' },
                ].map((fact) => (
                  <div key={fact.label} className="obsidian-glass-static rounded-lg px-4 py-3">
                    <p className="text-[10px] font-medium uppercase tracking-wider text-agothe-muted/60">
                      {fact.label}
                    </p>
                    <p className="mt-1 font-mono text-lg font-bold text-agothe-white">{fact.value}</p>
                  </div>
                ))}
              </div>
            </div>
          </AnimatedItem>

          <AnimatedItem>
            <div>
              <SectionHeading title="Sample Report" />
              <ObsidianCard hover={false}>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-heading text-lg font-bold text-agothe-white">
                      CAPS-PROBE-001: US-Iran Escalation Window
                    </p>
                    <p className="mt-1 text-xs text-agothe-muted">
                      Redacted sample demonstrating CAPS methodology and output format.
                    </p>
                  </div>
                  <a
                    href="/case-studies/us-iran-crisis"
                    className="rounded-full bg-agothe-teal/10 px-4 py-2 text-xs font-medium text-agothe-teal transition-colors hover:bg-agothe-teal/20"
                  >
                    View Case Study
                  </a>
                </div>
              </ObsidianCard>
            </div>
          </AnimatedItem>
        </AnimatedSection>
      </section>
    </main>
  );
}
