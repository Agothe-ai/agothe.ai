'use client';

import { Check } from 'lucide-react';
import { AnimatedSection, AnimatedItem } from './animated-section';
import { SectionHeading } from './section-heading';

interface PricingTier {
  name: string;
  price: string;
  description: string;
  features: string[];
  cta: string;
  href: string;
  highlighted?: boolean;
}

const tiers: PricingTier[] = [
  {
    name: 'Research Synthesis',
    price: 'From $500',
    description: 'Automated literature review from 200M+ academic papers',
    features: [
      'Up to 1,000 papers synthesized',
      'Structured executive summary',
      'Citation network mapping',
      'Research gap identification',
      '48-hour delivery',
    ],
    cta: 'Commission Report',
    href: '#contact',
  },
  {
    name: 'CAPS Intelligence',
    price: 'From $2,500',
    description: 'Full multi-AI crisis analysis with intervention strategies',
    features: [
      '6 AI systems coordinated simultaneously',
      'Solvey Scanner + PEE-Ω analysis',
      '5-level Agothean Engine Stack validation',
      'Quantified intervention strategies (δ_H reduction)',
      'MCS > 0.90 coherence guarantee',
      'Under 4-hour delivery',
    ],
    cta: 'Get Started',
    href: '#contact',
    highlighted: true,
  },
  {
    name: 'Enterprise Monitoring',
    price: 'Custom',
    description: 'Ongoing constraint field monitoring for your organization',
    features: [
      'Real-time δ_H tracking',
      'Weekly intelligence briefs',
      'Custom alert thresholds',
      'Dedicated CAPS analyst',
      'API access (coming soon)',
    ],
    cta: 'Contact Us',
    href: '#contact',
  },
];

export function PricingSection() {
  return (
    <section id="pricing" className="px-4 py-24 md:py-32">
      <AnimatedSection className="mx-auto max-w-6xl">
        <SectionHeading title="Intelligence on demand." />

        <div className="grid gap-6 md:grid-cols-3">
          {tiers.map((tier) => (
            <AnimatedItem key={tier.name}>
              <div
                className={`relative flex h-full flex-col rounded-lg p-6 md:p-8 ${
                  tier.highlighted
                    ? 'obsidian-glass border-agothe-teal/40 shadow-[0_0_40px_rgba(0,240,255,0.1)]'
                    : 'obsidian-glass'
                }`}
              >
                {tier.highlighted && (
                  <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-agothe-teal px-4 py-1 text-xs font-semibold text-agothe-bg">
                    Most Popular
                  </span>
                )}

                <h3 className="font-heading text-lg font-bold text-agothe-white">
                  {tier.name}
                </h3>
                <p className="mt-3 font-mono text-3xl font-bold text-agothe-white">
                  {tier.price}
                </p>
                <p className="mt-2 text-sm text-agothe-muted">
                  {tier.description}
                </p>

                <ul className="mt-6 flex-1 space-y-3">
                  {tier.features.map((f) => (
                    <li key={f} className="flex items-start gap-2 text-sm text-agothe-muted">
                      <Check className="mt-0.5 h-4 w-4 shrink-0 text-agothe-teal" />
                      {f}
                    </li>
                  ))}
                </ul>

                <a
                  href={tier.href}
                  className={`mt-8 block rounded-full py-3 text-center text-sm font-semibold transition-all ${
                    tier.highlighted
                      ? 'bg-agothe-teal text-agothe-bg hover:shadow-[0_0_30px_rgba(0,240,255,0.3)]'
                      : 'border border-agothe-teal text-agothe-teal hover:bg-agothe-teal/10'
                  }`}
                >
                  {tier.cta}
                </a>
              </div>
            </AnimatedItem>
          ))}
        </div>

        <AnimatedItem>
          <p className="mt-12 text-center text-sm text-agothe-muted">
            First analysis at 50% off for early adopters. MCS &gt; 0.80 or full
            refund.
          </p>
        </AnimatedItem>
      </AnimatedSection>
    </section>
  );
}
