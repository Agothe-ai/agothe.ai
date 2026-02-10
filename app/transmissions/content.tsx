'use client';

import { AnimatedSection, AnimatedItem } from '@/components/agothe/animated-section';
import { SectionHeading } from '@/components/agothe/section-heading';
import { ObsidianCard } from '@/components/agothe/obsidian-card';
import { MeshGradientHero } from '@/components/motion/mesh-gradient-hero';

// TODO: Connect to Notion API for dynamic Codex content
const posts = [
  {
    title: 'The Universal Spectral-Gap Hypothesis: RH + NS Unification',
    excerpt: 'A mathematical bridge connecting the Riemann Hypothesis to Navier-Stokes through constraint field spectral analysis.',
    date: 'Feb 8, 2026',
    readTime: '18 min',
    tags: ['Mathematics', 'Framework'],
  },
  {
    title: 'Bounce Collapse Symmetry: Why Systems Self-Heal',
    excerpt: 'When constraint fields collapse past critical δ_H, a symmetry-breaking bounce creates new emergent structures.',
    date: 'Feb 3, 2026',
    readTime: '12 min',
    tags: ['Systems Theory', 'CRD'],
  },
  {
    title: 'δ_H as a Fundamental Constant: Evidence from 4 Domains',
    excerpt: 'Cross-domain evidence suggesting δ_H critical thresholds are universal across physical, social, and cognitive systems.',
    date: 'Jan 28, 2026',
    readTime: '22 min',
    tags: ['Research', 'Mathematics'],
  },
  {
    title: 'Entity X: The Observer Field in Mathematical Systems',
    excerpt: 'What happens when the observer is modeled as a constraint field within the system being analyzed?',
    date: 'Jan 20, 2026',
    readTime: '15 min',
    tags: ['Consciousness', 'Framework'],
  },
  {
    title: 'Agothe City as Cognitive Architecture: Design Principles',
    excerpt: 'How spatial metaphors from urban design inform the architecture of navigable cognitive environments.',
    date: 'Jan 14, 2026',
    readTime: '10 min',
    tags: ['Agothe City', 'Design'],
  },
];

const featured = posts[0];
const grid = posts.slice(1);

export function TransmissionsContent() {
  return (
    <main className="pt-20">
      <section className="relative overflow-hidden px-6 py-24 md:py-32">
        <MeshGradientHero />
        <AnimatedSection className="relative z-10 mx-auto max-w-3xl text-center">
          <AnimatedItem>
            <h1 className="font-heading text-4xl font-bold text-agothe-white md:text-6xl">
              Transmissions from the Codex
            </h1>
          </AnimatedItem>
          <AnimatedItem>
            <p className="mx-auto mt-4 max-w-xl text-lg text-agothe-muted">
              Research, framework updates, and intelligence from the living Codex.
            </p>
          </AnimatedItem>
        </AnimatedSection>
      </section>

      <section className="px-6 py-16">
        <AnimatedSection className="mx-auto max-w-6xl">
          <AnimatedItem>
            <ObsidianCard className="p-8 md:p-12" hover={false}>
              <div className="flex flex-wrap gap-2">
                {featured.tags.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-full border border-agothe-teal/30 px-3 py-0.5 font-mono text-[10px] uppercase tracking-wider text-agothe-teal"
                  >
                    {tag}
                  </span>
                ))}
              </div>
              <h2 className="mt-4 font-heading text-2xl font-bold text-agothe-white md:text-3xl">
                {featured.title}
              </h2>
              <p className="mt-3 text-base leading-relaxed text-agothe-muted">
                {featured.excerpt}
              </p>
              <div className="mt-4 flex items-center gap-4 text-xs text-agothe-muted/60">
                <span>{featured.date}</span>
                <span>{featured.readTime} read</span>
              </div>
              <button
                className="mt-6 inline-flex items-center rounded-full bg-agothe-teal px-6 py-2.5 text-sm font-semibold text-agothe-bg transition-shadow hover:shadow-[0_0_20px_rgba(0,240,255,0.3)]"
              >
                Read Transmission
              </button>
            </ObsidianCard>
          </AnimatedItem>
        </AnimatedSection>
      </section>

      <section className="px-6 py-16">
        <AnimatedSection className="mx-auto max-w-6xl">
          <SectionHeading title="Recent Transmissions" />
          <div className="grid gap-6 md:grid-cols-2">
            {grid.map((post) => (
              <AnimatedItem key={post.title}>
                <ObsidianCard className="h-full">
                  <div className="flex flex-wrap gap-2">
                    {post.tags.map((tag) => (
                      <span
                        key={tag}
                        className="rounded-full border border-[rgba(255,255,255,0.1)] px-2.5 py-0.5 font-mono text-[10px] uppercase tracking-wider text-agothe-muted"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                  <h3 className="mt-3 font-heading text-lg font-bold text-agothe-white">
                    {post.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-agothe-muted">
                    {post.excerpt}
                  </p>
                  <div className="mt-3 flex items-center gap-4 text-xs text-agothe-muted/60">
                    <span>{post.date}</span>
                    <span>{post.readTime} read</span>
                  </div>
                  <button className="mt-4 text-sm font-medium text-agothe-teal transition-colors hover:text-agothe-white">
                    Read Transmission
                  </button>
                </ObsidianCard>
              </AnimatedItem>
            ))}
          </div>
        </AnimatedSection>
      </section>
    </main>
  );
}
