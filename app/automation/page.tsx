import type { Metadata } from 'next';
import { ServicePage } from '@/components/agothe/service-page-template';

export const metadata: Metadata = {
  title: 'AI Workflow Automation',
  description: 'Custom AI automation for your operations. Workflow design, multi-AI orchestration, and Notion integration.',
};

export default function AutomationPage() {
  return (
    <ServicePage
      heroImage="/images/heroes/os-52-engine-cluster.webp"
      heroImageAlt="AI automation workflow visualization"
      accentColor="#00f0ff"
      title="AI Automation"
      tagline="Custom AI automation for your operations."
      description="We design and build AI-powered workflows tailored to your operations. From multi-AI orchestration to Notion-integrated knowledge management, we automate the work that is too complex for templates but too repetitive for your best people."
      price="$297- 2,500$"
      priceNote="Per project, depending on complexity"
      ctaLabel="Start Project"
      ctaHref="/contact"
      problemTitle="AI tools without architecture are just noise"
      problemItems={[
        'Most teams use AI as a chat interface, not a system',
        'Disconnected tools create information silos, not intelligence',
        'Generic automation templates do not match real workflow complexity',
        'Without orchestration, multiple AI tools fight instead of coordinate',
        'Manual handoffs between AI systems waste 60% of potential value',
      ]}
      solutionTitle="Orchestrated AI workflows"
      solutionDescription="We map your operations, identify automation opportunities, and build multi-AI workflows that coordinate tools like an intelligence network not a collection of chatbots."
      features={[
        { title: 'Workflow Design', description: 'Complete mapping of your current processes and design of AI-optimized workflows with clear input/output specifications.' },
        { title: 'Multi-AI Orchestration', description: 'Coordination of multiple AI systems (Claude, GPT, Gemini, Perplexity) with defined roles and handoff protocols.' },
        { title: 'Notion Integration', description: 'Deep integration with Notion as a knowledge hub automated databases, content pipelines, and living documentation.' },
        { title: 'Ongoing Maintenance', description: 'Monthly optimization based on usage patterns, model updates, and evolving workflow requirements.' },
      ]}
      faq={[
        { question: 'What kinds of workflows can you automate?', answer: 'Research pipelines, content production, client onboarding, report generation, competitive analysis, knowledge management, and any process involving multiple AI tools.' },
        { question: 'Do I need technical expertise?', answer: 'No. We handle all technical implementation. You provide domain knowledge and requirements; we build the system.' },
        { question: 'How long does a project take?', answer: '1-2 weeks for simple automations, 2-4 weeks for complex multi-AI orchestrations. Rush delivery available.' },
        { question: 'What is included in maintenance?', answer: 'Monthly review of workflow performance, model updates, prompt optimization, and up to 4 hours of modifications per month.' },
      ]}
      relatedServices={[
        { label: 'CAPS Intelligence', href: '/intelligence' },
        { label: 'Research Synthesis', href: '/research' },
      ]}
    />
  );
}
