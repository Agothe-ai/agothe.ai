'use client';

import { AnimatedSection, AnimatedItem } from '@/components/agothe/animated-section';
import { SectionHeading } from '@/components/agothe/section-heading';
import { ObsidianCard } from '@/components/agothe/obsidian-card';
import { ArrowRight, BarChart3, Clock } from 'lucide-react';
import Link from 'next/link';
import { MeshGradientHero } from '@/components/motion/mesh-gradient-hero';

const studies = [
  {
    slug: 'us-iran-crisis',
    title: 'US-Iran Escalation Window Analysis',
    subtitle: 'Geopolitical Crisis Intelligence',
    description:
      'Multi-domain constraint analysis identifying a 72-hour escalation window that traditional intelligence methods missed entirely.',
    mcs: '0.94',
    delivery: '3.2h',
    accentColor: '#ff3366',
  },
  {
    slug: 'cop30-climate',
    title: 'COP30 Climate Negotiation Intelligence',
    subtitle: 'Policy & Regulatory Analysis',
    description:
      'Predictive analysis of negotiation collapse points and emergence opportunities across 197 nation-state positions.',
    mcs: '0.91',
    delivery: '4.1h',
    accentColor: '#00f0ff',
  },
  {
    slug: 'attention-inequality',
    title: 'Attention Inequality & Market Disruption',
    subtitle: 'Economic Systems Analysis',
    description:
      'First-of-kind analysis mapping attention economy dynamics to financial market stress indicators and regulatory triggers.',
    mcs: '0.93',
    delivery: '2.8h',
    accentColor: '#ffd700',
  },
];

export function CaseStudiesIndex() {
  return (
    <main className="pt-20">
      <section className="relative overflow-hidden px-6 py-24 md:py-32">
        <MeshGradientHero />
        <AnimatedSection className="relative z-10 mx-auto max-w-3xl text-center">
          <AnimatedItem>
            <h1 className="font-heading text-4xl font-bold text-agothe-white md:text-6xl">
              Case Studies
            </h1>
          </AnimatedItem>
          <AnimatedItem>
            <p className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-agothe-muted">
              Real intelligence analyses demonstrating CAPS methodology. Every study
              below achieved MCS &gt;0.90 and was delivered in under 5 hours.
            </p>
          </AnimatedItem>
        </AnimatedSection>
      </section>

      <section className="px-6 py-16 md:py-24">
        <AnimatedSection className="mx-auto max-w-5xl">
          <div className="grid gap-8">
            {studies.map((s) => (
              <AnimatedItem key={s.slug}>
                <Link href={`/case-studies/${s.slug}`} className="block">
                  <ObsidianCard className="group relative overflow-hidden">
                    <div
                      className="pointer-events-none absolute left-0 top-0 h-full w-1"
                      style={{ backgroundColor: s.accentColor }}
                    />
                    <div className="pl-4">
                      <p
                        className="text-[10px] font-medium uppercase tracking-[0.2em]"
                        style={{ color: s.accentColor }}
                      >
                        {s.subtitle}
                      </p>
                      <h2 className="mt-2 font-heading text-xl font-bold text-agothe-white md:text-2xl">
                        {s.title}
                      </h2>
                      <p className="mt-3 max-w-2xl text-sm leading-relaxed text-agothe-muted">
                        {s.description}
                      </p>
                      <div className="mt-4 flex flex-wrap items-center gap-4">
                        <span className="flex items-center gap-1.5 text-xs text-agothe-muted">
                          <BarChart3 className="h-3 w-3" style={{ color: s.accentColor }} />
                          MCS {s.mcs}
                        </span>
                        <span className="flex items-center gap-1.5 text-xs text-agothe-muted">
                          <Clock className="h-3 w-3" style={{ color: s.accentColor }} />
                          {s.delivery}
                        </span>
                        <span className="ml-auto flex items-center gap-1 text-sm font-medium text-agothe-teal opacity-0 transition-opacity group-hover:opacity-100">
                          Read Analysis <ArrowRight className="h-4 w-4" />
                        </span>
                      </div>
                    </div>
                  </ObsidianCard>
                </Link>
              </AnimatedItem>
            ))}
          </div>
        </AnimatedSection>
      </section>
    </main>
  );
}
