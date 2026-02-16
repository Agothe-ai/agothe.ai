'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import Link from 'next/link';
import { AnimatedSection, AnimatedItem } from './animated-section';
import { ObsidianCard } from './obsidian-card';
import { MeshGradientHero } from '@/components/motion/mesh-gradient-hero';
import { ChromeHeroOverlay } from '@/components/motion/chrome-liquid-metal';

interface FaqItem {
  question: string;
  answer: string;
}

interface RelatedService {
  label: string;
  href: string;
}

export interface ServicePageProps {
  title: string;
  tagline: string;
  description: string;
  price: string;
  priceNote?: string;
  ctaLabel: string;
  ctaHref: string;
  problemTitle: string;
  problemItems: string[];
  solutionTitle: string;
  solutionDescription: string;
  solutionMetrics?: { label: string; value: string }[];
  features: { title: string; description: string }[];
  faq: FaqItem[];
  relatedServices: RelatedService[];
  status?: 'live' | 'development' | 'vision';
  waitlistMode?: boolean;
  accentColor?: string;
  children?: React.ReactNode;
  heroOverride?: 'chrome';
  heroContent?: React.ReactNode;
}

function FaqAccordion({ items }: { items: FaqItem[] }) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <div className="space-y-3">
      {items.map((item, i) => (
        <div key={i} className="obsidian-glass rounded-lg">
          <button
            onClick={() => setOpenIndex(openIndex === i ? null : i)}
            className="flex w-full items-center justify-between px-6 py-4 text-left"
            aria-expanded={openIndex === i}
          >
            <span className="pr-4 text-sm font-medium text-agothe-white">{item.question}</span>
            <motion.span
              animate={{ rotate: openIndex === i ? 180 : 0 }}
              transition={{ duration: 0.2 }}
            >
              <ChevronDown className="h-4 w-4 shrink-0 text-agothe-muted" />
            </motion.span>
          </button>
          <AnimatePresence initial={false}>
            {openIndex === i && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.25 }}
                className="overflow-hidden"
              >
                <p className="px-6 pb-4 text-sm leading-relaxed text-agothe-muted">
                  {item.answer}
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      ))}
    </div>
  );
}

export function ServicePage(props: ServicePageProps) {
  const statusBadge = props.status === 'development' ? 'In Development' : props.status === 'vision' ? 'Long-term Vision' : null;
  const accent = props.accentColor || '#00f0ff';

  const ctaBg = { backgroundColor: accent };
  const ctaShadow = `0 0 30px ${accent}4d`;
  const overlayGradient = `radial-gradient(ellipse at 50% 0%, ${accent}14 0%, transparent 70%)`;
  const borderAccent = `1px solid ${accent}33`;

  return (
    <main className="pt-20">
      {props.heroContent}
      <section className="relative overflow-hidden px-6 py-24 md:py-32">
        {props.heroOverride === 'chrome' ? <ChromeHeroOverlay /> : <MeshGradientHero accentColor={accent} />}
        <div
          className="pointer-events-none absolute inset-0 z-[1]"
          style={{ background: overlayGradient }}
        />
        <AnimatedSection className="relative z-10 mx-auto max-w-3xl text-center">
          <AnimatedItem>
            {statusBadge && (
              <span className="mb-4 inline-block rounded-full border border-agothe-gold/40 px-4 py-1 font-mono text-xs text-agothe-gold">
                {statusBadge}
              </span>
            )}
            <h1 className="font-heading text-4xl font-bold text-agothe-white md:text-6xl">
              {props.title}
            </h1>
          </AnimatedItem>
          <AnimatedItem>
            <p className="mx-auto mt-4 max-w-xl text-lg text-agothe-muted">{props.tagline}</p>
          </AnimatedItem>
          <AnimatedItem>
            <p className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-agothe-muted/80">
              {props.description}
            </p>
          </AnimatedItem>
          <AnimatedItem>
            <div className="mt-8">
              <Link
                href={props.ctaHref}
                className="inline-flex items-center rounded-full px-8 py-4 text-sm font-semibold text-agothe-bg transition-shadow"
                style={{ ...ctaBg, boxShadow: `0 0 0px transparent` }}
                onMouseEnter={(e) => { (e.target as HTMLElement).style.boxShadow = ctaShadow; }}
                onMouseLeave={(e) => { (e.target as HTMLElement).style.boxShadow = '0 0 0px transparent'; }}
              >
                {props.ctaLabel}
              </Link>
            </div>
          </AnimatedItem>
        </AnimatedSection>
      </section>

      <section className="px-6 py-24 md:py-32">
        <AnimatedSection className="mx-auto max-w-6xl">
          <AnimatedItem>
            <h2 className="mb-10 text-center font-heading text-3xl font-bold text-agothe-white md:text-4xl">
              {props.problemTitle}
            </h2>
          </AnimatedItem>
          <AnimatedItem>
            <div
              className="obsidian-glass-static mx-auto max-w-2xl rounded-lg p-8"
              style={{ borderTop: borderAccent }}
            >
              <ul className="space-y-4">
                {props.problemItems.map((item) => (
                  <li key={item} className="flex items-start gap-3 text-sm text-agothe-muted">
                    <span className="mt-1.5 block h-1.5 w-1.5 shrink-0 rounded-full bg-agothe-danger" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </AnimatedItem>
        </AnimatedSection>
      </section>

      <section className="px-6 py-24 md:py-32">
        <AnimatedSection className="mx-auto max-w-6xl">
          <AnimatedItem>
            <h2 className="mb-6 text-center font-heading text-3xl font-bold text-agothe-white md:text-4xl">
              {props.solutionTitle}
            </h2>
          </AnimatedItem>
          <AnimatedItem>
            <p className="mx-auto mb-10 max-w-2xl text-center text-base leading-relaxed text-agothe-muted">
              {props.solutionDescription}
            </p>
          </AnimatedItem>
          {props.solutionMetrics && (
            <AnimatedItem>
              <div className="obsidian-glass-static mx-auto mb-12 max-w-xl rounded-lg px-6 py-5">
                <div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-4">
                  {props.solutionMetrics.map((m) => (
                    <div key={m.label} className="text-center">
                      <p className="font-mono text-xl font-bold" style={{ color: accent }}>{m.value}</p>
                      <p className="mt-0.5 text-[10px] uppercase tracking-[0.15em] text-agothe-muted">
                        {m.label}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </AnimatedItem>
          )}

          <div className="grid gap-6 md:grid-cols-2">
            {props.features.map((f) => (
              <AnimatedItem key={f.title}>
                <ObsidianCard className="h-full">
                  <h3 className="mb-2 font-heading text-lg font-bold text-agothe-white">
                    {f.title}
                  </h3>
                  <p className="text-sm leading-relaxed text-agothe-muted">{f.description}</p>
                </ObsidianCard>
              </AnimatedItem>
            ))}
          </div>
        </AnimatedSection>
      </section>

      {props.children}

      {!props.waitlistMode && (
        <section className="px-6 py-24 md:py-32">
          <AnimatedSection className="mx-auto max-w-md text-center">
            <AnimatedItem>
              <div className="obsidian-glass rounded-lg p-8 md:p-10">
                <p className="font-mono text-3xl font-bold text-agothe-white">{props.price}</p>
                {props.priceNote && (
                  <p className="mt-2 text-sm text-agothe-muted">{props.priceNote}</p>
                )}
                <Link
                  href={props.ctaHref}
                  className="mt-6 block rounded-full py-3 text-center text-sm font-semibold text-agothe-bg transition-shadow"
                  style={{ ...ctaBg }}
                >
                  {props.ctaLabel}
                </Link>
              </div>
            </AnimatedItem>
          </AnimatedSection>
        </section>
      )}

      <section className="px-6 py-24 md:py-32">
        <AnimatedSection className="mx-auto max-w-2xl">
          <AnimatedItem>
            <h2 className="mb-10 text-center font-heading text-3xl font-bold text-agothe-white md:text-4xl">
              Frequently Asked Questions
            </h2>
          </AnimatedItem>
          <FaqAccordion items={props.faq} />
        </AnimatedSection>
      </section>

      <section className="px-6 py-16">
        <AnimatedSection className="mx-auto max-w-xl text-center">
          <AnimatedItem>
            <p className="mb-4 text-xs uppercase tracking-[0.2em] text-agothe-muted">Related Services</p>
            <div className="flex flex-wrap justify-center gap-4">
              {props.relatedServices.map((s) => (
                <Link
                  key={s.href}
                  href={s.href}
                  className="rounded-full border border-[rgba(255,255,255,0.1)] px-5 py-2 text-sm text-agothe-muted transition-all hover:border-agothe-teal/30 hover:text-agothe-white"
                >
                  {s.label}
                </Link>
              ))}
            </div>
          </AnimatedItem>
        </AnimatedSection>
      </section>
    </main>
  );
}
