import type { Metadata } from 'next';
import { ServicePage } from '@/components/agothe/service-page-template';

export const metadata: Metadata = {
  title: 'Research Synthesis Engine',
  description: '200M+ academic papers synthesized into structured insights in 48 hours via Semantic Scholar API + multi-AI processing.',
};

export default function ResearchPage() {
  return (
    <ServicePage
      heroImage="/images/heroes/research-synthesis-lattice.webp"
      heroImageAlt="Research synthesis lattice visualization"
      title="Research Synthesis"
      tagline="200M+ academic papers. Synthesized in 48 hours."
      description="Our Research Synthesis Engine scans the full Semantic Scholar corpus, identifies relevant literature, maps citation networks, and produces structured executive summaries with gap analysis. Multi-AI processing ensures no critical papers are missed."
      price="From $500"
      priceNote="16
      —$299/mo subscription also available"      ctaLabel="Commission Synthesis"
      ctaHref="/contact"
      problemTitle="Research is drowning in volume"
      problemItems={[
        'A single research question returns 10,000+ potentially relevant papers',
        'Manual literature reviews take 2\u20136 weeks and miss critical connections',
        'Citation networks are too complex for human pattern recognition',
        'Research gaps remain invisible without systematic cross-domain analysis',
        'Synthesis quality depends entirely on reviewer expertise and time',
      ]}
      solutionTitle="Automated, exhaustive, structured"
      solutionDescription="We connect to the Semantic Scholar Open Research Corpus (200M+ papers), apply multi-AI filtering and synthesis, and deliver a structured report that would take a research team weeks to produce manually."
      solutionMetrics={[
        { label: 'Papers Indexed', value: '200M+' },
        { label: 'Delivery', value: '48 Hours' },
        { label: 'Synthesis Depth', value: '1,000 Papers' },
      ]}
      features={[
        { title: 'Literature Review', description: 'Comprehensive scan across multiple databases with relevance scoring and deduplication.' },
        { title: 'Citation Network Mapping', description: 'Visual and quantitative mapping of citation relationships, identifying influential papers and clusters.' },
        { title: 'Gap Identification', description: 'Algorithmic detection of under-researched areas, contradictions, and opportunities for novel contribution.' },
        { title: 'Executive Summary', description: 'Structured output with key findings, methodology overview, and actionable recommendations.' },
      ]}
      faq={[
        { question: 'What databases do you access?', answer: 'Primarily Semantic Scholar\u2019s Open Research Corpus (200M+ papers), supplemented by domain-specific sources as needed for each project.' },
        { question: 'How many papers can you synthesize?', answer: 'Up to 1,000 papers per synthesis report. For larger-scope reviews, we can run multiple passes and integrate results.' },
        { question: 'What formats do you deliver in?', answer: 'Structured PDF report with executive summary, methodology, findings, citation map, and gap analysis. Raw data available on request.' },
        { question: 'Can you handle specialized domains?', answer: 'Yes. The multi-AI processing adapts to any academic domain. We\u2019ve covered physics, medicine, policy, economics, and more.' },
        { question: 'What\u2019s the turnaround time?', answer: '48 hours for standard synthesis. Rush delivery (24 hours) available for additional fee.' },
      ]}
      relatedServices={[
        { label: 'CAPS Intelligence', href: '/intelligence' },
        { label: 'Framework Licensing', href: '/framework' },
      ]}
    />
  );
}
