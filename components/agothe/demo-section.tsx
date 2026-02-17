'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import Link from 'next/link';
import { AnimatedSection, AnimatedItem } from './animated-section';
import { SectionHeading } from './section-heading';

interface DemoReport {
  badge: string;
  title: string;
  metrics: { label: string; value: string }[];
  finding: string;
  details: string[];
}

const demos: DemoReport[] = [
  {
    badge: 'CAPS-DEMO-001',
    title: 'U.S. Iran Crisis Analysis. February 2026',
    metrics: [
      { label: '\u03B4_H', value: '0.76' },
      { label: 'MCS', value: '0.91' },
      { label: 'Time', value: '1.8 hours' },
    ],
    finding:
      'The crisis is 70% domestic political theater + energy economics. Only 30% genuine military risk.',
    details: [
      'Solvey Scanner detected 3 Orric paradox points',
      'PEE-3 identified 52% propaganda layering in media coverage',
      'Top intervention: Economic de-coupling narrative shift (\u0394\u03B4_H: -0.22)',
      '72% escalation probability within 30 days without intervention',
      'All 6 AI systems converged on same core dynamic (MCS: 0.91)',
    ],
  },
  {
    badge: 'CAPS-PROBE-002',
    title: 'COP30 Climate Crisis Multi-AI Systems Analysis',
    metrics: [
      { label: '\u03B4_H', value: '2.0-2.5' },
      { label: 'MCS', value: '0.94' },
      { label: 'Systems', value: '3 AI' },
    ],
    finding:
      'COP30 negotiations are mathematically untenable. $219B injection required to stabilize.',
    details: [
      'Financial stress coefficient: 0.916 (near unity)',
      'G77 fracture reduces network connectivity (Fiedler value \u03BB\u2082 \u2192 0)',
      'Three independent AIs converged on identical failure modes',
      'Gemini formalized H-field collapse prediction matching Perplexity empirical scan',
      'Hybrid solution emerged only through multi-AI triangulation',
    ],
  },
  {
    badge: 'CAPS-PROBE-003',
    title: 'Global Supply Chain Stress Valentine Simulation',
    metrics: [
      { label: '\u03B4_H', value: '1.8-3.2' },
      { label: 'Scenarios', value: '1,000+' },
      { label: 'MCS', value: '0.89' },
    ],
    finding:
      'Semiconductor shortage cascades into 12+ secondary collapses by Q4 2026. Mitigation window: 4-6 weeks.',
    details: [
      'Valentine ran 1,000+ Monte Carlo scenario variants',
      'Critical path dependency on 3 TSMC fabrication nodes',
      'Secondary cascades affect automotive, medical devices, and defense sectors',
      'Optimal intervention point: pre-Q3 inventory buffer strategy',
      '\u0394\u03B4_H reduction of -0.47 achievable with coordinated policy response',
    ],
  },
];

function DemoCard({ report }: { report: DemoReport }) {
  const [expanded, setExpanded] = useState(false);

  return (
    <div className="obsidian-glass flex h-full flex-col rounded-lg p-6 md:p-8">
      <span className="mb-4 inline-block w-fit font-mono text-xs tracking-wider text-agothe-teal">
        {report.badge}
      </span>
      <h3 className="mb-4 font-heading text-xl font-bold text-agothe-white">
        {report.title}
      </h3>

      <div className="mb-4 flex flex-wrap gap-x-4 gap-y-2">
        {report.metrics.map((m) => (
          <span key={m.label} className="font-mono text-sm text-agothe-white">
            {m.label}:{' '}
            <span className="text-agothe-teal">{m.value}</span>
          </span>
        ))}
      </div>

      <p className="mb-6 text-sm italic leading-relaxed text-agothe-muted">
        &ldquo;{report.finding}&rdquo;
      </p>

      <div className="mt-auto">
        <button
          onClick={() => setExpanded(!expanded)}
          className="flex items-center gap-2 text-sm font-medium text-agothe-teal transition-colors hover:text-agothe-white"
          aria-expanded={expanded}
        >
          {expanded ? 'Hide Details' : 'Show Details'}
          <motion.span
            animate={{ rotate: expanded ? 180 : 0 }}
            transition={{ duration: 0.2 }}
          >
            <ChevronDown className="h-4 w-4" />
          </motion.span>
        </button>

        <AnimatePresence initial={false}>
          {expanded && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3, ease: 'easeInOut' }}
              className="overflow-hidden"
            >
              <ul className="mt-4 space-y-2 border-t border-[rgba(255,255,255,0.08)] pt-4">
                {report.details.map((d) => (
                  <li
                    key={d}
                    className="flex items-start gap-2 text-sm text-agothe-muted"
                  >
                    <span className="mt-1.5 block h-1 w-1 shrink-0 rounded-full bg-agothe-teal" />
                    {d}
                  </li>
                ))}
              </ul>
            </motion.div>
          )}
        </AnimatePresence>

        <a
          href="#"
          className="mt-4 inline-block text-sm font-medium text-agothe-teal underline-offset-4 transition-colors hover:text-agothe-white hover:underline"
        >
          Read Full Report
        </a>
      </div>
    </div>
  );
}

export function DemoSection() {
  return (
    <section id="demo" className="px-4 py-24 md:py-32">
      <AnimatedSection className="mx-auto max-w-6xl">
        <SectionHeading
          title="Don't take our word for it. Read the analysis."
          subtitle="These are real CAPS intelligence reports produced in under 2 hours each."
        />

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {demos.map((report) => (
            <AnimatedItem key={report.badge}>
              <DemoCard report={report} />
            </AnimatedItem>
          ))}
        </div>

        <AnimatedItem>
          <p className="mx-auto mt-12 max-w-3xl text-center text-sm leading-relaxed text-agothe-muted">
            Every analysis includes: Solvey Scan (crisis detection) + PEE-&#937;
            Scan (propaganda detection) + Full 5-Level Engine Stack Validation +
            Intervention Optimization + MCS Coherence Scoring
          </p>
          <div className="mt-6 text-center">
            <Link
              href="/intelligence"
              className="inline-flex items-center rounded-full border border-agothe-teal px-6 py-2.5 text-sm font-semibold text-agothe-teal transition-all hover:bg-agothe-teal/10"
            >
              View All Intelligence
            </Link>
          </div>
        </AnimatedItem>
      </AnimatedSection>
    </section>
  );
}
