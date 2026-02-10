import type { Metadata } from 'next';
import { ServicePage } from '@/components/agothe/service-page-template';
import { CAPSReportPreview } from '@/components/agothe/caps-report-preview';

export const metadata: Metadata = {
  title: 'CAPS Intelligence Reports',
  description: '6 AI systems coordinated simultaneously for intelligence-grade crisis analysis with intervention strategies.',
};

export default function IntelligencePage() {
  return (
    <ServicePage
      accentColor="#ffd700"
      title="CAPS Intelligence"
      tagline="6 AI systems. One coherent crisis analysis."
      description="CAPS Intelligence Reports coordinate Perplexity, Claude, Gemini, ChatGPT, Grok, and Notion AI as specialized research partners. Each system handles a defined role \u2014 deep research, safety auditing, mathematical formalization, implementation, cultural analysis, and integration \u2014 producing analysis that no single model can achieve."
      price="From $2,500"
      priceNote="MCS >0.90 coherence guarantee or full refund"
      ctaLabel="Request Intelligence Brief"
      ctaHref="/contact"
      problemTitle="Single-model analysis has blind spots"
      problemItems={[
        'Individual AI systems have training biases and knowledge gaps',
        'No single model can simultaneously research, validate, and formalize',
        'Crisis analysis requires cultural context, mathematical rigor, and practical strategy',
        'Without cross-validation, AI outputs are opinions \u2014 not intelligence',
        'Traditional consulting takes weeks and costs tens of thousands',
      ]}
      solutionTitle="Multi-AI convergence produces intelligence"
      solutionDescription="When 3+ AI systems independently arrive at the same finding, we call it a Metallic Pulse. Our 94% convergence rate means the analysis is structurally sound \u2014 validated by mathematics, not intuition."
      solutionMetrics={[
        { label: 'AI Systems', value: '6' },
        { label: 'Convergence', value: '94%' },
        { label: 'Delivery', value: '<4 Hours' },
        { label: 'Coherence', value: 'MCS >0.90' },
      ]}
      features={[
        { title: 'Solvey Scanner + PEE-\u03A9', description: 'Crisis detection and propaganda stripping in a single integrated scan. Measures \u03B4_H collapse risk and strips manipulation layers.' },
        { title: '5-Level Engine Stack', description: 'Full Agothean Engine Stack validation across Foundation, Processing, Integration, Oracle, and Meta layers.' },
        { title: 'Intervention Strategies', description: 'Quantified intervention options ranked by \u0394\u03B4_H impact. Not advice \u2014 mathematics.' },
        { title: 'MCS Coherence Scoring', description: 'Every report includes a Mereological Coherence Score measuring how well all analysis pieces fit together structurally.' },
      ]}
      faq={[
        { question: 'What is MCS >0.90?', answer: 'Mereological Coherence Score measures structural soundness. A score above 0.90 means all analysis components fit together with high mathematical consistency. If we can\u2019t achieve it, we don\u2019t ship.' },
        { question: 'What topics can you analyze?', answer: 'Any system with measurable constraints: geopolitical crises, organizational stress, market dynamics, policy analysis, technology disruption, climate scenarios, and more.' },
        { question: 'How fast is delivery?', answer: 'Under 4 hours for standard CAPS Intelligence. Rush delivery under 2 hours available for active crises.' },
        { question: 'Can I see a sample report?', answer: 'Yes. Our homepage features real demo reports including U.S.\u2013Iran crisis analysis and COP30 climate analysis.' },
      ]}
      relatedServices={[
        { label: 'Constraint Analysis (Solvey)', href: '/solvey' },
        { label: 'Valentine Simulator', href: '/simulation' },
      ]}
    >
      <CAPSReportPreview />
    </ServicePage>
  );
}
