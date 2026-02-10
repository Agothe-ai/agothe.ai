'use client';

import { AnimatedSection, AnimatedItem } from './animated-section';
import { SectionHeading } from './section-heading';
import { ObsidianCard } from './obsidian-card';
import { Star } from 'lucide-react';

const testimonials = [
  {
    quote:
      'The CAPS report on attention inequality predicted regulatory shifts six months before they materialized. We restructured our entire portfolio based on those findings.',
    attribution: 'Director of Strategy',
    org: 'Global Financial Services Firm',
    rating: 5,
  },
  {
    quote:
      'We needed a rapid threat assessment for COP30 positioning. Agothe delivered a 47-page intelligence synthesis in under 4 hours with an MCS of 0.94. No consulting firm comes close.',
    attribution: 'Senior Policy Advisor',
    org: 'International Policy Institute',
    rating: 5,
  },
  {
    quote:
      'The propaganda detection analysis saved our campaign. We identified coordinated disinformation networks three weeks before they escalated.',
    attribution: 'Communications Director',
    org: 'Crisis Management Agency',
    rating: 5,
  },
];

function StarRating({ count }: { count: number }) {
  return (
    <div className="flex gap-0.5">
      {Array.from({ length: count }).map((_, i) => (
        <Star key={i} className="h-3.5 w-3.5 fill-agothe-gold text-agothe-gold" />
      ))}
    </div>
  );
}

export function TestimonialsSection() {
  return (
    <section className="px-6 py-24 md:py-32">
      <AnimatedSection className="mx-auto max-w-6xl">
        <SectionHeading
          title="What decision-makers are saying"
          subtitle="Real results from intelligence-grade analysis."
        />

        <div className="grid gap-6 md:grid-cols-3">
          {testimonials.map((t, i) => (
            <AnimatedItem key={i}>
              <ObsidianCard className="flex h-full flex-col justify-between">
                <div>
                  <StarRating count={t.rating} />
                  <blockquote className="mt-4 text-sm leading-relaxed text-agothe-muted">
                    &ldquo;{t.quote}&rdquo;
                  </blockquote>
                </div>
                <div className="mt-6 border-t border-white/5 pt-4">
                  <p className="text-sm font-medium text-agothe-white">{t.attribution}</p>
                  <p className="mt-0.5 text-xs text-agothe-muted/70">{t.org}</p>
                </div>
              </ObsidianCard>
            </AnimatedItem>
          ))}
        </div>
      </AnimatedSection>
    </section>
  );
}
