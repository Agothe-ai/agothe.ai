import type { Metadata } from 'next';
import { ServicePage } from '@/components/agothe/service-page-template';
import { DeltaHMap } from '@/components/motion/delta-h-map';

export const metadata: Metadata = {
  title: 'Constraint Field Analysis (Solvey Scanner)',
  description: 'Measure collapse risk (δ_H) in any system before it breaks. Real-time monitoring and alert thresholds.',
};

export default function SolveyPage() {
  return (
    <ServicePage
      accentColor="#ff3366"
      title="Solvey Scanner"
      tagline="Measure collapse risk before it breaks."
      description="The Solvey Scanner quantifies constraint field stress (δ_H) across any complex system. From geopolitical tensions to organizational health to market dynamics \u2014 it detects structural instabilities before they manifest as visible crises."
      price="Custom"
      priceNote="Enterprise subscription with tailored alert thresholds"
      ctaLabel="Schedule Demo"
      ctaHref="/contact"
      problemTitle="Crises don&rsquo;t announce themselves"
      problemItems={[
        'Collapse happens when constraint fields exceed critical thresholds invisibly',
        'Qualitative risk assessment can\u2019t measure what it can\u2019t see',
        'By the time a crisis is visible, the intervention window has closed',
        'Most monitoring systems detect symptoms, not structural causes',
        'Without mathematical measurement, risk is just opinion',
      ]}
      solutionTitle="Quantified collapse prediction"
      solutionDescription="The Solvey Scanner applies the Constraint-Resonance Duality framework to measure δ_H \u2014 the stress index of any constraint field. When δ_H approaches critical thresholds, you get advance warning with time to intervene."
      solutionMetrics={[
        { label: 'Measurement', value: 'δ_H Index' },
        { label: 'Monitoring', value: 'Real-time' },
        { label: 'Alert Speed', value: '<5 min' },
      ]}
      features={[
        { title: 'Real-time δ_H Tracking', description: 'Continuous measurement of constraint field stress across your defined monitoring targets.' },
        { title: 'Custom Alert Thresholds', description: 'Set δ_H warning and critical thresholds tailored to your system\u2019s specific tolerances.' },
        { title: 'Weekly Intelligence Briefs', description: 'Scheduled reports on constraint field trends, emerging stress patterns, and recommended interventions.' },
        { title: 'API Access (Coming Soon)', description: 'Integrate Solvey Scanner data directly into your existing monitoring infrastructure and dashboards.' },
      ]}
      faq={[
        { question: 'What is δ_H?', answer: 'Delta-H is the core metric of the Constraint-Resonance Duality framework. It measures the stress level in a constraint field \u2014 how close a system is to structural collapse or transformation.' },
        { question: 'What systems can you monitor?', answer: 'Any complex system with measurable constraints: organizations, markets, geopolitical regions, supply chains, institutional health, and more.' },
        { question: 'How is this different from risk management?', answer: 'Traditional risk management is qualitative and reactive. Solvey Scanner is quantitative and predictive \u2014 it measures structural stress before it becomes a visible problem.' },
        { question: 'What does an enterprise subscription include?', answer: 'Dedicated analyst, custom monitoring setup, real-time alerts, weekly briefs, and direct CAPS Network access for deep analysis on demand.' },
      ]}
      relatedServices={[
        { label: 'CAPS Intelligence', href: '/intelligence' },
        { label: 'Propaganda Detection', href: '/propaganda' },
      ]}
    >
      <DeltaHMap />
    </ServicePage>
  );
}
