import type { Metadata } from 'next';
import { ServicePage } from '@/components/agothe/service-page-template';
import { PropagandaDetector } from '@/components/motion/propaganda-detector';

export const metadata: Metadata = {
  title: 'Propaganda Detection (PEE-03)',
  description: 'Strip manipulation from information. Detect false certainty, emotional amplification, and hidden agendas with quantified scoring.',
};

export default function PropagandaPage() {
  return (
    <ServicePage
      heroImage="/images/heroes/propaganda-filter.webp"
      heroImageAlt="Propaganda detection filter"
      accentColor="#ff3366"
      title="Propaganda Detection"
      tagline="Strip manipulation from information."
      description="PEE-03 (Propaganda & Epistemic Exploitation \u2014 Omega Scan) identifies and quantifies manipulation layers in any content. It detects false certainty, emotional amplification, hidden agendas, and source manipulation with a quantified Bullshit Score."
      price="From $997"
      priceNote="Per report. Designed for newsrooms and policy organizations."
      ctaLabel="Analyze Content"
      ctaHref="/contact"
      problemTitle="Information warfare is the default"
      problemItems={[
        'Media coverage routinely contains 40%-60% propaganda layering',
        'False certainty is presented as analysis, hiding ambiguity',
        'Emotional amplification bypasses rational evaluation',
        'Source manipulation makes propaganda look like journalism',
        'Without quantification, detection relies on individual judgment',
      ]}
      solutionTitle="Quantified manipulation detection"
      solutionDescription="PEE-03 applies multi-AI analysis to strip propaganda layers from content, producing a numerical Bullshit Score and detailed breakdown of manipulation techniques used."
      solutionMetrics={[
        { label: 'Detection Rate', value: '96%' },
        { label: 'Techniques Tracked', value: '23+' },
        { label: 'Analysis Time', value: '<1 Hour' },
      ]}
      features={[
        { title: 'Bullshit Score', description: 'A single quantified metric (0\u2013100) measuring total propaganda load in any piece of content.' },
        { title: 'Emotional Amplification Detection', description: 'Identifies language designed to bypass rational evaluation and trigger emotional responses.' },
        { title: 'False Certainty Analysis', description: 'Detects claims presented with more confidence than evidence supports, flagging epistemic overreach.' },
        { title: 'Source Validation', description: 'Traces claims to original sources, identifying distortion, omission, and fabrication in the chain.' },
      ]}
      faq={[
        { question: 'What content can PEE-03 analyze?', answer: 'Any text-based content: news articles, policy papers, social media campaigns, corporate communications, political speeches, and academic publications.' },
        { question: 'How accurate is the Bullshit Score?', answer: '96% detection rate across 23+ known propaganda techniques. Validated against expert human analysis with high correlation.' },
        { question: 'Who uses this?', answer: 'Newsrooms, policy research organizations, intelligence analysts, academic institutions, and decision-makers who need clean information.' },
        { question: 'Can you analyze an entire media narrative?', answer: 'Yes. We can analyze collections of content across sources and time periods to map narrative manipulation patterns.' },
      ]}
      relatedServices={[
        { label: 'CAPS Intelligence', href: '/intelligence' },
        { label: 'Constraint Analysis', href: '/solvey' },
      ]}
    >
      <PropagandaDetector />
    </ServicePage>
  );
}
