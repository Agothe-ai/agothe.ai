import type { Metadata } from 'next';
import { ServicePage } from '@/components/agothe/service-page-template';
import { VREnvironmentMorph } from '@/components/motion/vr-environment-morph';

export const metadata: Metadata = {
  title: 'Agothe VR Therapeutic Worldbuilding',
  description: 'Anxiety becomes a room. Healing becomes architecture. Neurodivergent-optimized therapeutic VR environments.',
};

export default function VRPage() {
  return (
    <ServicePage
      accentColor="#10b981"
      title="Agothe VR"
      tagline="Anxiety becomes a room. Healing becomes architecture."
      description="Agothe VR builds therapeutic environments informed by constraint field modeling. Your internal states anxiety, overstimulation, creative flow become navigable architectural spaces designed for neurodivergent minds."
      price="Waitlist"
      ctaLabel="Join Waitlist"
      ctaHref="/contact"
      status="development"
      waitlistMode
      heroContent={<VREnvironmentMorph />}
      problemTitle="Therapy wasn&rsquo;t built for how some minds work"
      problemItems={[
        'Traditional therapeutic environments are one-size-fits-all',
        'Neurodivergent sensory needs are rarely considered in design',
        'Abstract emotional states are hard to process without externalization',
        'Existing VR therapy lacks mathematical modeling of internal states',
        'Healing tools designed for neurotypical minds miss critical dimensions',
      ]}
      solutionTitle="Mathematically informed healing spaces"
      solutionDescription="Agothe VR uses Collapse constraint field modeling to design environments that respond to your internal state. Anxiety has a shape. Overwhelm has architecture. And healing becomes a place you can walk through."
      features={[
        { title: 'Therapeutic Worldbuilding Engine', description: 'Procedurally generated environments that respond to emotional and cognitive states in real-time.' },
        { title: 'Person Collapse measured base environment Design', description: 'Environments shaped by constraint field measurements high-stress states produce different architecture than flow states.' },
        { title: 'Neurodivergent-Optimized Sensory Design', description: 'Every sensory element calibrated for neurodivergent processing lighting, sound, texture, and spatial rhythm.' },
        { title: 'Guided Therapeutic Journeys', description: 'Structured narrative experiences designed with therapeutic goals, validated through CRD coherence scoring.' },
      ]}
      faq={[
        { question: 'When will Agothe VR be available?', answer: 'Currently in development. Join the waitlist for early access and development updates.' },
        { question: 'Do I need VR hardware?', answer: 'Initial release will support standard VR headsets. Future versions may include browser-based and AR experiences.' },
        { question: 'Is this a replacement for therapy?', answer: 'No. Agothe VR is a therapeutic tool, not a replacement for professional clinical care. It's designed to complement existing therapeutic approaches.' },
        { question: 'How is the neurodivergent design validated?', answer: 'Through extensive consultation with neurodivergent researchers and practitioners, including our co-founder Armani Gomez.' },
      ]}
      relatedServices={[
        { label: 'Agothe City', href: '/city' },
        { label: 'Agothe Institutes', href: '/institutes' },
      ]}
    />
  );
}
