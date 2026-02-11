import type { Metadata } from 'next';
import { ServicePage } from '@/components/agothe/service-page-template';
import { CityParallax } from '@/components/motion/city-parallax';

export const metadata: Metadata = {
  title: 'Agothe City \u2014 Cognitive Navigation',
  description: 'Your mind as a living, navigable city. Spatialized cognitive navigation and consciousness mapping.',
};

export default function CityPage() {
  return (
    <ServicePage
      accentColor="#3b82f6"
      title="Agothe City"
      tagline="Your mind as a living, navigable city."
      description="Agothe City transforms cognitive architecture into navigable spatial environments. Think of it as Google Maps for your mind \u2014 a living, breathing city built from your thought patterns, memory structures, and knowledge networks."
      price="Waitlist"
      ctaLabel="Join Waitlist"
      ctaHref="/contact"
      status="development"
      waitlistMode
      heroContent={<CityParallax />}
      problemTitle="The mind has no map"
      problemItems={[
        'Knowledge exists in fragments without spatial relationships',
        'Memory retrieval depends on associative luck, not systematic navigation',
        'Existing note-taking tools are flat \u2014 they don\u2019t model cognitive architecture',
        'Without visualization, cognitive patterns remain invisible',
        'Knowledge management treats information as files, not as living architecture',
      ]}
      solutionTitle="Cognitive architecture as navigable space"
      solutionDescription="Agothe City uses the CRD framework to map your cognitive patterns into spatial structures. Thoughts become buildings. Connections become streets. Memory becomes geography you can walk through."
      features={[
        { title: 'Spatialized Cognitive Navigation', description: 'Navigate your knowledge base as a 3D city environment with districts, landmarks, and pathways reflecting actual cognitive structures.' },
        { title: 'Thought-as-Architecture', description: 'Individual concepts materialize as architectural elements \u2014 their size, position, and connections reflecting real cognitive importance.' },
        { title: 'Memory Palace Integration', description: 'Classical memory palace techniques enhanced with computational mapping and real-time constraint field visualization.' },
        { title: 'Real-time Consciousness Mapping', description: 'Live visualization of cognitive activity, attention flows, and emerging thought patterns as they happen.' },
      ]}
      faq={[
        { question: 'When will Agothe City be available?', answer: 'We\u2019re currently in development. Join the waitlist for early access and development updates.' },
        { question: 'What technology does this use?', answer: 'Spatial computing, constraint field modeling, and adaptive visualization built on the CRD framework.' },
        { question: 'Is this a VR experience?', answer: 'Agothe City will be available across multiple modalities \u2014 browser-based, VR, and potentially AR in later phases.' },
        { question: 'How does it connect to other Agothe services?', answer: 'City integrates with Agothe VR for therapeutic applications and with the Codex for knowledge architecture.' },
      ]}
      relatedServices={[
        { label: 'Agothe VR', href: '/vr' },
        { label: 'Framework Licensing', href: '/framework' },
      ]}
    />
  );
}
