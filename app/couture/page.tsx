import type { Metadata } from 'next';
import { ServicePage } from '@/components/agothe/service-page-template';
import { ChromeMetallicCards } from '@/components/motion/chrome-liquid-metal';

export const metadata: Metadata = {
  title: 'Consciousness Couture Fashion Systems',
  description: 'Fashion systems integrating mathematical frameworks. Chrome Victorian aesthetics, neurodivergent-optimized sensory design.',
};

export default function CouturePage() {
  return (
    <ServicePage
      heroImage="/images/heroes/couture-chrysalis-unfurling.webp"
      heroImageAlt="Chrysalis unfurling in couture fashion"
      accentColor="#f59e0b"
      title="Consciousness Couture"
      tagline="Fashion systems integrating mathematical frameworks."
      description="Consciousness Couture brings the Constraint-Resonance Duality framework into wearable form. Chrome Victorian aesthetics meet neurodivergent-optimized sensory design. Fashion as architecture. Clothing as constraint field expression."
      price="Preview Collection 2027"
      ctaLabel="View Concept Gallery"
      ctaHref="/contact"
      status="development"
      waitlistMode
      problemTitle="Fashion ignores the body&rsquo;s constraint field"
      problemItems={[
        'Mainstream fashion prioritizes aesthetic over sensory experience',
        'Neurodivergent sensory needs are treated as edge cases, not design principles',
        'Fashion and mathematics are artificially separated domains',
        'Wearable design rarely considers the wearer cognitive and emotional state',
        'Aesthetic innovation has stagnated in recycled trends, not structural innovation',
      ]}
      solutionTitle="Wearable constraint resonance"
      solutionDescription="Each piece integrates mathematical pattern structures with sensory-optimized materials. The result is clothing that doesn't just look different it feels architecturally coherent with the wearer constraint field."
      features={[
        { title: 'Wearable Constraint Resonance', description: 'Design patterns derived from CRD mathematical structures, creating visual and tactile coherence between garment and wearer.' },
        { title: 'Chrome Victorian Aesthetics (Chronica Panel)', description: 'A design language blending Victorian structural precision with chrome-age materials and futuristic silhouettes.' },
        { title: 'Neurodivergent-Optimized Sensory Design', description: 'Every fabric, seam, and closure point designed for sensory processing differences pressure, texture, weight distribution.' },
        { title: 'Mathematical Pattern Integration', description: 'Geometric patterns derived from constraint field mathematics, fractals, and resonance harmonics in the CRD framework.' },
      ]}
      faq={[
        { question: 'When will pieces be available?', answer: 'Preview collection planned for 2027. Join our waitlist for early access and behind-the-scenes development updates.' },
        { question: 'Is this purely conceptual?', answer: 'No. Were developing physical garments. The mathematical framework informs real design and material decisions.' },
        { question: 'What is Chrome Victorian?', answer: 'A design language developed by Armani Gomez that combines Victorian-era structural precision with modern/futuristic materials and constraint field aesthetics.' },
        { question: 'What does neurodivergent-optimized mean?', answer: 'Sensory-first design. Every element fabric weight, seam placement, closure mechanisms, tag removal is designed for sensory processing differences.' },
      ]}
      relatedServices={[
        { label: 'Agothe VR', href: '/vr' },
        { label: 'Agothe Institutes', href: '/institutes' },
      ]}
      heroOverride="chrome"
    >
      <ChromeMetallicCards />
    </ServicePage>
  );
}
