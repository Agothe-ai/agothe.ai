'use client';

import Link from 'next/link';
import { AnimatedSection, AnimatedItem } from '@/components/agothe/animated-section';
import { SectionHeading } from '@/components/agothe/section-heading';
import { ObsidianCard } from '@/components/agothe/obsidian-card';
import { PageHero } from '@/components/agothe/page-hero';

const tiers = [
  {
    tier: 'Tier 1 \u2014 Foundation',
    items: ['Local LLM reasoning (Ollama)', 'File system operations', 'Terminal command execution', 'Base knowledge retrieval'],
  },
  {
    tier: 'Tier 2 \u2014 Processing',
    items: ['Multi-model routing', 'Notion API integration', 'Content transformation pipeline', 'Automated scheduling'],
  },
  {
    tier: 'Tier 3 \u2014 Integration',
    items: ['CAPS Network coordination', 'Cross-system data sync', 'Codex-as-CMS publishing', 'Webhook orchestration'],
  },
  {
    tier: 'Tier 4 \u2014 Oracle',
    items: ['Self-evolution routines', 'Pattern meta-analysis', 'Framework extension protocols', 'Autonomous research loops'],
  },
];

const capabilities = [
  { title: 'Local LLM Reasoning', description: 'On-device inference using Ollama for privacy-sensitive operations, fast iteration, and offline capability.' },
  { title: 'Notion Integration', description: 'Deep bidirectional sync with Notion \u2014 reads from the Codex, writes analysis outputs, manages knowledge databases.' },
  { title: 'Self-Modifying Codebase', description: 'Agothe OS can modify its own configurations, prompts, and routing logic based on performance feedback loops.' },
  { title: 'Multi-AI Routing', description: 'Intelligent routing of tasks to the optimal AI system based on task type, complexity, and required capabilities.' },
  { title: 'File Operations', description: 'Full file system access for reading, writing, transforming, and organizing research artifacts and outputs.' },
  { title: 'Automated Scheduling', description: 'Cron-based task execution for recurring analyses, monitoring checks, and content publishing.' },
];

export function OSPageContent() {
  return (
    <main className="pt-20">
      <section className="relative overflow-hidden px-6 py-24 md:py-32">
        <PageHero imageSrc="/images/heroes/os-52-engine-cluster.webp" imageAlt="52-engine cluster architecture" />
        <AnimatedSection className="relative z-10 mx-auto max-w-3xl text-center">
          <AnimatedItem>
            <h1 className="font-heading text-4xl font-bold text-agothe-white md:text-6xl">
              Agothe OS
            </h1>
          </AnimatedItem>
          <AnimatedItem>
            <p className="mx-auto mt-4 max-w-xl text-lg text-agothe-muted">
              Autonomous AI infrastructure with self-evolution
            </p>
          </AnimatedItem>
          <AnimatedItem>
            <p className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-agothe-muted/80">
              Agothe OS is the internal operating system that powers every service we offer. It
              coordinates local LLM reasoning, file operations, Notion integration, multi-AI routing,
              and self-modifying codebase evolution \u2014 all running autonomously.
            </p>
          </AnimatedItem>
        </AnimatedSection>
      </section>

      <section className="px-6 py-24 md:py-32">
        <AnimatedSection className="mx-auto max-w-6xl">
          <SectionHeading
            title="52-Engine Architecture"
            subtitle="Four tiers powering every analysis."
          />
          <div className="grid gap-6 md:grid-cols-2">
            {tiers.map((t) => (
              <AnimatedItem key={t.tier}>
                <ObsidianCard className="h-full" hover={false}>
                  <h3 className="mb-4 font-heading text-lg font-bold text-agothe-teal">
                    {t.tier}
                  </h3>
                  <ul className="space-y-2">
                    {t.items.map((item) => (
                      <li key={item} className="flex items-start gap-2 text-sm text-agothe-muted">
                        <span className="mt-1.5 block h-1 w-1 shrink-0 rounded-full bg-agothe-teal" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </ObsidianCard>
              </AnimatedItem>
            ))}
          </div>
        </AnimatedSection>
      </section>

      <section className="px-6 py-24 md:py-32">
        <AnimatedSection className="mx-auto max-w-6xl">
          <SectionHeading title="Capabilities" />
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {capabilities.map((c) => (
              <AnimatedItem key={c.title}>
                <ObsidianCard className="h-full">
                  <h3 className="mb-2 font-heading text-base font-bold text-agothe-white">
                    {c.title}
                  </h3>
                  <p className="text-sm leading-relaxed text-agothe-muted">{c.description}</p>
                </ObsidianCard>
              </AnimatedItem>
            ))}
          </div>
        </AnimatedSection>
      </section>

      <section className="px-6 py-16">
        <AnimatedSection className="mx-auto max-w-md text-center">
          <AnimatedItem>
            <Link
              href="/contact"
              className="inline-flex items-center rounded-full border border-agothe-teal px-6 py-3 text-sm font-semibold text-agothe-teal transition-all hover:bg-agothe-teal/10"
            >
              Developer Documentation (Coming Soon)
            </Link>
          </AnimatedItem>
        </AnimatedSection>
      </section>
    </main>
  );
}
