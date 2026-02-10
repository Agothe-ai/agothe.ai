'use client';

import { motion } from 'framer-motion';
import { AnimatedSection, AnimatedItem } from './animated-section';
import { ObsidianCard } from './obsidian-card';
import { SectionHeading } from './section-heading';
import { ArrowLeft, Clock, BarChart3, Shield } from 'lucide-react';
import Link from 'next/link';
import { MeshGradientHero } from '@/components/motion/mesh-gradient-hero';

export interface CaseStudyProps {
  title: string;
  subtitle: string;
  accentColor: string;
  mcsScore: string;
  deliveryTime: string;
  classification: string;
  context: string[];
  challenge: string;
  capsAnalysis: {
    constraintFields: string[];
    resonancePatterns: string[];
    deltaH: string;
  };
  keyFindings: { title: string; detail: string }[];
  outcome: string;
  methodology: string[];
  relatedStudies: { label: string; href: string }[];
}

export function CaseStudyPage(props: CaseStudyProps) {
  const {
    title, subtitle, accentColor, mcsScore, deliveryTime, classification,
    context, challenge, capsAnalysis, keyFindings, outcome, methodology,
    relatedStudies,
  } = props;

  return (
    <main className="pt-20">
      <section className="relative overflow-hidden px-6 py-24 md:py-32">
        <MeshGradientHero accentColor={accentColor} />

        <div
          className="pointer-events-none absolute inset-0 opacity-[0.06]"
          style={{
            background: `radial-gradient(ellipse at 30% 50%, ${accentColor}, transparent 70%)`,
          }}
        />

        <AnimatedSection className="relative z-10 mx-auto max-w-4xl">
          <AnimatedItem>
            <Link
              href="/case-studies"
              className="mb-8 inline-flex items-center gap-2 text-sm text-agothe-muted transition-colors hover:text-agothe-teal"
            >
              <ArrowLeft className="h-4 w-4" />
              All Case Studies
            </Link>
          </AnimatedItem>

          <AnimatedItem>
            <p
              className="mb-4 text-xs font-medium uppercase tracking-[0.3em]"
              style={{ color: accentColor }}
            >
              {subtitle}
            </p>
          </AnimatedItem>

          <AnimatedItem>
            <h1 className="font-heading text-3xl font-bold text-agothe-white md:text-5xl">
              {title}
            </h1>
          </AnimatedItem>

          <AnimatedItem>
            <div className="mt-8 flex flex-wrap gap-4">
              <MetaBadge icon={<BarChart3 className="h-3.5 w-3.5" />} label="MCS" value={mcsScore} color={accentColor} />
              <MetaBadge icon={<Clock className="h-3.5 w-3.5" />} label="Delivery" value={deliveryTime} color={accentColor} />
              <MetaBadge icon={<Shield className="h-3.5 w-3.5" />} label="Class" value={classification} color={accentColor} />
            </div>
          </AnimatedItem>
        </AnimatedSection>
      </section>

      <section className="px-6 py-16 md:py-24">
        <AnimatedSection className="mx-auto max-w-4xl space-y-16">
          <AnimatedItem>
            <div>
              <SectionLabel text="Context" color={accentColor} />
              <div className="mt-4 space-y-4">
                {context.map((p, i) => (
                  <p key={i} className="text-sm leading-relaxed text-agothe-muted">{p}</p>
                ))}
              </div>
            </div>
          </AnimatedItem>

          <AnimatedItem>
            <div>
              <SectionLabel text="Challenge" color={accentColor} />
              <ObsidianCard hover={false} className="mt-4">
                <p className="text-sm leading-relaxed text-agothe-muted">{challenge}</p>
              </ObsidianCard>
            </div>
          </AnimatedItem>

          <AnimatedItem>
            <div>
              <SectionLabel text="CAPS Analysis" color={accentColor} />
              <div className="mt-4 grid gap-4 md:grid-cols-3">
                <ObsidianCard hover={false}>
                  <p className="mb-2 text-xs font-medium uppercase tracking-wider text-agothe-muted/70">
                    Constraint Fields
                  </p>
                  <ul className="space-y-1.5">
                    {capsAnalysis.constraintFields.map((f, i) => (
                      <li key={i} className="flex items-start gap-2 text-sm text-agothe-muted">
                        <span className="mt-1.5 block h-1 w-1 shrink-0 rounded-full" style={{ backgroundColor: accentColor }} />
                        {f}
                      </li>
                    ))}
                  </ul>
                </ObsidianCard>
                <ObsidianCard hover={false}>
                  <p className="mb-2 text-xs font-medium uppercase tracking-wider text-agothe-muted/70">
                    Resonance Patterns
                  </p>
                  <ul className="space-y-1.5">
                    {capsAnalysis.resonancePatterns.map((r, i) => (
                      <li key={i} className="flex items-start gap-2 text-sm text-agothe-muted">
                        <span className="mt-1.5 block h-1 w-1 shrink-0 rounded-full" style={{ backgroundColor: accentColor }} />
                        {r}
                      </li>
                    ))}
                  </ul>
                </ObsidianCard>
                <ObsidianCard hover={false}>
                  <p className="mb-2 text-xs font-medium uppercase tracking-wider text-agothe-muted/70">
                    System Stress Index
                  </p>
                  <div className="flex items-baseline gap-2">
                    <span className="font-mono text-3xl font-bold" style={{ color: accentColor }}>
                      {capsAnalysis.deltaH}
                    </span>
                    <span className="text-xs text-agothe-muted">&#948;_H</span>
                  </div>
                </ObsidianCard>
              </div>
            </div>
          </AnimatedItem>

          <AnimatedItem>
            <div>
              <SectionLabel text="Key Findings" color={accentColor} />
              <div className="mt-4 grid gap-4 md:grid-cols-2">
                {keyFindings.map((f, i) => (
                  <ObsidianCard key={i} hover={false}>
                    <p className="mb-1 text-sm font-semibold text-agothe-white">{f.title}</p>
                    <p className="text-sm leading-relaxed text-agothe-muted">{f.detail}</p>
                  </ObsidianCard>
                ))}
              </div>
            </div>
          </AnimatedItem>

          <AnimatedItem>
            <div>
              <SectionLabel text="Outcome" color={accentColor} />
              <ObsidianCard hover={false} className="mt-4">
                <p className="text-sm leading-relaxed text-agothe-white">{outcome}</p>
              </ObsidianCard>
            </div>
          </AnimatedItem>

          <AnimatedItem>
            <div>
              <SectionLabel text="Methodology" color={accentColor} />
              <div className="mt-4 flex flex-wrap gap-2">
                {methodology.map((m, i) => (
                  <span
                    key={i}
                    className="rounded-full border px-3 py-1 text-xs text-agothe-muted"
                    style={{ borderColor: `${accentColor}30` }}
                  >
                    {m}
                  </span>
                ))}
              </div>
            </div>
          </AnimatedItem>

          {relatedStudies.length > 0 && (
            <AnimatedItem>
              <div>
                <SectionLabel text="Related Studies" color={accentColor} />
                <div className="mt-4 flex flex-wrap gap-3">
                  {relatedStudies.map((s) => (
                    <Link
                      key={s.href}
                      href={s.href}
                      className="obsidian-glass rounded-lg px-4 py-2 text-sm text-agothe-muted transition-colors hover:text-agothe-white"
                    >
                      {s.label} &rarr;
                    </Link>
                  ))}
                </div>
              </div>
            </AnimatedItem>
          )}

          <AnimatedItem>
            <div className="border-t border-white/5 pt-12 text-center">
              <p className="text-sm text-agothe-muted">Need a similar analysis for your domain?</p>
              <Link
                href="/contact"
                className="mt-4 inline-flex items-center rounded-full px-8 py-3 text-sm font-semibold text-agothe-bg transition-shadow hover:shadow-[0_0_30px_rgba(0,240,255,0.2)]"
                style={{ backgroundColor: accentColor }}
              >
                Commission a Report
              </Link>
            </div>
          </AnimatedItem>
        </AnimatedSection>
      </section>
    </main>
  );
}

function SectionLabel({ text, color }: { text: string; color: string }) {
  return (
    <div className="flex items-center gap-3">
      <div className="h-px w-8" style={{ backgroundColor: color }} />
      <p className="text-xs font-medium uppercase tracking-[0.2em]" style={{ color }}>
        {text}
      </p>
    </div>
  );
}

function MetaBadge({
  icon,
  label,
  value,
  color,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
  color: string;
}) {
  return (
    <div className="obsidian-glass-static flex items-center gap-2 rounded-full px-3 py-1.5">
      <span style={{ color }}>{icon}</span>
      <span className="text-[10px] uppercase tracking-wider text-agothe-muted">{label}</span>
      <span className="font-mono text-xs font-medium text-agothe-white">{value}</span>
    </div>
  );
}
