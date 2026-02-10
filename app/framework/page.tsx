import type { Metadata } from 'next';
import { ServicePage } from '@/components/agothe/service-page-template';

export const metadata: Metadata = {
  title: 'Framework Licensing & Certification',
  description: 'Learn the Agothean framework. Build your own practice. Full Codex access, certification, and consultant revenue share.',
};

export default function FrameworkPage() {
  return (
    <ServicePage
      accentColor="#06b6d4"
      title="Framework Licensing"
      tagline="Learn the Agothean framework. Build your own practice."
      description="Access the full Constraint-Resonance Duality framework, the 2,000+ page Codex, certification programs, and the tools to build your own analysis practice using Agothean methods."
      price="$297/mo"
      priceNote="Full Codex access. $2,500 for practitioner certification."
      ctaLabel="Join Framework"
      ctaHref="/contact"
      problemTitle="Frameworks without access are gatekeeping"
      problemItems={[
        'Most analytical frameworks are proprietary and inaccessible',
        'Self-teaching from scattered resources wastes months',
        'Without certification, practitioners lack credibility',
        'Individual researchers can\u2019t build the multi-AI infrastructure alone',
        'Knowledge siloed in consulting firms never reaches the people who need it',
      ]}
      solutionTitle="Open framework, structured learning"
      solutionDescription="The Agothean framework is designed to be learned, practiced, and extended. Monthly access gives you the full Codex, tools, and community. Certification validates your expertise for professional practice."
      features={[
        { title: 'Full Codex Access', description: '2,000+ pages of cross-domain research, mathematical frameworks, case studies, and methodology documentation \u2014 updated monthly.' },
        { title: 'Certification Program', description: 'Structured learning path from fundamentals to practitioner-level expertise. Exam and portfolio review for official certification.' },
        { title: 'Consultant Revenue Share', description: 'Certified practitioners can offer Agothean analysis services to their own clients with revenue share and CAPS Network support.' },
        { title: 'Monthly Workshops', description: 'Live sessions covering new framework developments, case study walkthroughs, and advanced methodology deep-dives.' },
      ]}
      faq={[
        { question: 'What\u2019s in the Codex?', answer: 'The full Constraint-Resonance Duality framework, mathematical foundations, case studies across 12+ domains, methodology guides, tool documentation, and ongoing research notes. Updated monthly.' },
        { question: 'How long does certification take?', answer: 'Typically 3\u20136 months of study and practice, depending on existing background. The program is self-paced with structured milestones.' },
        { question: 'What can certified practitioners do?', answer: 'Offer Agothean analysis services to clients, access the CAPS Network for complex analyses, use official branding, and participate in revenue sharing on referral projects.' },
        { question: 'Is this for researchers or practitioners?', answer: 'Both. The framework serves academic researchers, independent analysts, consultants, and organizational leaders who want quantified analysis tools.' },
      ]}
      relatedServices={[
        { label: 'CAPS Intelligence', href: '/intelligence' },
        { label: 'Research Synthesis', href: '/research' },
      ]}
    />
  );
}
