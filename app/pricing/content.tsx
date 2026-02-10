'use client';

import { AnimatedSection, AnimatedItem } from '@/components/agothe/animated-section';
import { SectionHeading } from '@/components/agothe/section-heading';
import { Check, Minus } from 'lucide-react';
import Link from 'next/link';
import { MeshGradientHero } from '@/components/motion/mesh-gradient-hero';

interface Service {
  name: string;
  price: string;
  color: string;
  href: string;
}

const services: Service[] = [
  { name: 'Research Synthesis', price: '$500+', color: '#00f0ff', href: '/research' },
  { name: 'CAPS Intelligence', price: '$2,500+', color: '#ffd700', href: '/intelligence' },
  { name: 'Solvey', price: '$1,500+', color: '#ff3366', href: '/solvey' },
  { name: 'PEE-Ω', price: '$2,000+', color: '#ff3366', href: '/propaganda' },
  { name: 'Automation', price: '$297+', color: '#00f0ff', href: '/automation' },
  { name: 'Valentine', price: '$3,000+', color: '#8b5cf6', href: '/simulation' },
  { name: 'Framework', price: '$297/mo', color: '#06b6d4', href: '/framework' },
];

type FeatureValue = boolean | string;

interface Feature {
  label: string;
  values: FeatureValue[];
}

const features: Feature[] = [
  { label: 'Multi-AI Synthesis (6 systems)', values: [true, true, true, true, false, true, true] },
  { label: 'MCS Validation (>0.90)', values: [true, true, true, true, false, true, false] },
  { label: 'Constraint Field Mapping', values: [false, true, true, false, false, true, true] },
  { label: 'Resonance Pattern Detection', values: [false, true, false, false, false, true, true] },
  { label: 'Propaganda Detection', values: [false, true, false, true, false, false, false] },
  { label: 'Scenario Simulation', values: [false, true, false, false, false, true, false] },
  { label: 'Custom AI Agents', values: [false, false, false, false, true, false, false] },
  { label: 'Delivery Time', values: ['2-4h', '3-6h', '4-8h', '4-8h', '1-2w', '1w', 'Instant'] },
  { label: 'S2ORC Access (200M papers)', values: [true, true, true, true, false, true, true] },
  { label: 'Codex Integration', values: [false, true, false, false, false, true, true] },
  { label: 'Ongoing Support', values: [false, false, false, false, true, false, true] },
  { label: 'White-label Available', values: [false, true, false, false, false, false, true] },
];

function CellValue({ value }: { value: FeatureValue }) {
  if (typeof value === 'string') {
    return <span className="font-mono text-xs text-agothe-white">{value}</span>;
  }
  if (value) {
    return <Check className="mx-auto h-4 w-4 text-agothe-teal" />;
  }
  return <Minus className="mx-auto h-4 w-4 text-agothe-muted/30" />;
}

export function PricingPageContent() {
  return (
    <main className="pt-20">
      <section className="relative overflow-hidden px-6 py-24 md:py-32">
        <MeshGradientHero />
        <AnimatedSection className="relative z-10 mx-auto max-w-3xl text-center">
          <AnimatedItem>
            <h1 className="font-heading text-4xl font-bold text-agothe-white md:text-6xl">
              Compare Services
            </h1>
          </AnimatedItem>
          <AnimatedItem>
            <p className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-agothe-muted">
              Transparent pricing for intelligence-grade analysis. Every service includes
              multi-AI synthesis and mathematical validation.
            </p>
          </AnimatedItem>
        </AnimatedSection>
      </section>

      <section className="px-4 pb-24 md:px-6">
        <AnimatedSection className="mx-auto max-w-7xl">
          <AnimatedItem>
            <div className="overflow-x-auto">
              <table className="w-full min-w-[900px] border-collapse">
                <thead>
                  <tr>
                    <th className="sticky left-0 z-10 bg-agothe-bg px-4 py-4 text-left text-xs font-medium uppercase tracking-wider text-agothe-muted">
                      Feature
                    </th>
                    {services.map((s) => (
                      <th key={s.name} className="px-3 py-4 text-center">
                        <Link href={s.href} className="group">
                          <span
                            className="block text-xs font-semibold transition-colors group-hover:underline"
                            style={{ color: s.color }}
                          >
                            {s.name}
                          </span>
                          <span className="mt-1 block font-mono text-sm font-bold text-agothe-white">
                            {s.price}
                          </span>
                        </Link>
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {features.map((feature, i) => (
                    <tr
                      key={feature.label}
                      className={`border-t border-white/5 ${
                        i % 2 === 0 ? 'bg-transparent' : 'bg-[rgba(255,255,255,0.01)]'
                      }`}
                    >
                      <td className="sticky left-0 z-10 bg-agothe-bg px-4 py-3 text-sm text-agothe-muted">
                        {feature.label}
                      </td>
                      {feature.values.map((val, j) => (
                        <td key={j} className="px-3 py-3 text-center">
                          <CellValue value={val} />
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </AnimatedItem>

          <AnimatedItem>
            <div className="mt-12 text-center">
              <p className="text-sm text-agothe-muted">
                Need a custom package or enterprise pricing?
              </p>
              <Link
                href="/contact"
                className="mt-4 inline-flex items-center rounded-full bg-agothe-teal px-8 py-3 text-sm font-semibold text-agothe-bg transition-shadow hover:shadow-[0_0_30px_rgba(0,240,255,0.3)]"
              >
                Contact Us
              </Link>
            </div>
          </AnimatedItem>
        </AnimatedSection>
      </section>
    </main>
  );
}
