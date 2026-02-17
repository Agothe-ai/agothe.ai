import type { Metadata } from 'next';
import { ServicePage } from '@/components/agothe/service-page-template';

export const metadata: Metadata = {
  title: 'Mathematical Simulator (Valentine)',
  description: '1,000+ scenario variants with quantified outcomes. Monte Carlo simulation, constraint modeling, and decision optimization.',
};

export default function SimulationPage() {
  return (
    <ServicePage
      heroImage="/images/heroes/about-origin-seed.webp"
      heroImageAlt="Valentine mathematical simulation visualization"
      accentColor="#8b5cf6"
      title="Valentine Simulator"
      tagline="1,000+ scenario variants. Quantified outcomes."
      description="Valentine is our mathematical simulation engine. It runs Monte Carlo simulations across constraint field models, generating 1,000+ scenario variants with quantified probability distributions. The result: decision-grade intelligence, not guesswork."
      price="$997\u2013$9,997"
      priceNote="Per simulation run, based on model complexity"
      ctaLabel="Run Simulation"
      ctaHref="/contact"
      problemTitle="Decisions without simulation are gambles"
      problemItems={[
        'Most scenario planning is qualitative \u2014 best case, worst case, most likely',
        'Real systems have thousands of interacting variables',
        'Human intuition systematically misjudges probability distributions',
        'Without quantified outcomes, strategy is just storytelling',
        'Single-scenario forecasts give false confidence in complex domains',
      ]}
      solutionTitle="1,000+ scenarios in hours"
      solutionDescription="Valentine applies constraint field modeling and Monte Carlo methods to generate statistically robust scenario distributions. Every run produces probability-weighted outcomes with clear decision thresholds."
      solutionMetrics={[
        { label: 'Scenarios', value: '1,000+' },
        { label: 'Variables', value: '100+' },
        { label: 'Delivery', value: '<24 Hours' },
      ]}
      features={[
        { title: 'Constraint Modeling', description: 'Full \u03B4_H field modeling of your system\u2019s constraint architecture. Identifies critical dependencies and failure modes.' },
        { title: 'Monte Carlo Simulation', description: '1,000+ randomized scenario runs with statistical output including probability distributions, confidence intervals, and tail risks.' },
        { title: '\u03B4_H Field Rendering', description: 'Visual and quantitative mapping of how constraint fields evolve across scenarios, showing collapse and emergence pathways.' },
        { title: 'Decision Optimization', description: 'Ranked intervention strategies with expected \u0394\u03B4_H impact, cost estimates, and probability of success.' },
      ]}
      faq={[
        { question: 'What can Valentine simulate?', answer: 'Any system with definable constraints: market dynamics, policy outcomes, organizational restructuring, supply chains, geopolitical scenarios, and technology adoption curves.' },
        { question: 'How is this different from traditional modeling?', answer: 'Valentine uses constraint field theory, not just statistical regression. It models structural relationships between variables, not just correlations.' },
        { question: 'What do I receive?', answer: 'A full simulation report with scenario distributions, probability-weighted outcomes, critical threshold identification, and ranked intervention strategies.' },
        { question: 'Can I integrate this with Solvey Scanner?', answer: 'Yes. Valentine and Solvey share the same \u03B4_H framework. Real-time Solvey monitoring can feed directly into Valentine simulations for dynamic scenario updates.' },
      ]}
      relatedServices={[
        { label: 'Constraint Analysis', href: '/solvey' },
        { label: 'CAPS Intelligence', href: '/intelligence' },
      ]}
    />
  );
}
