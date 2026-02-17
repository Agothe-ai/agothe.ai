import type { Metadata } from 'next';
import { ServicePage } from '@/components/agothe/service-page-template';

export const metadata: Metadata = {
  title: 'Agothe Institutes Physical Education & Research Centers',
  description: 'Physical education, healing, and research centers. Framework education programs, therapeutic practice spaces, and community integration.',
};

export default function InstitutesPage() {
  return (
    <ServicePage
      accentColor="#94a3b8"
      title="Agothe Institutes"
      tagline="Physical education, healing, and research centers."
      description="Agothe Institutes are the long-term vision for physical spaces where the Agothean framework is taught, practiced, and extended. Education, therapeutic practice, collaborative research, and community building all under one architecture."
      price="Long-term Vision"
      ctaLabel="Learn More"
      ctaHref="/contact"
      status="vision"
      waitlistMode
      problemTitle="Knowledge without embodiment stays abstract"
      problemItems={[
        'Online learning lacks the depth of immersive, embodied education',
        'Research communities are fragmented across institutions',
        'Therapeutic practice spaces rarely integrate mathematical frameworks',
        'Most educational institutions separate theory from practice',
        'Community for cross-domain researchers barely exists',
      ]}
      solutionTitle="Where framework becomes practice"
      solutionDescription="Agothe Institutes will be physical centers where researchers, practitioners, and students can learn the CRD framework through immersive, embodied education and collaborative practice."
      features={[
        { title: 'Framework Education Programs', description: 'Structured in-person curriculum from foundational concepts through advanced practitioner certification.' },
        { title: 'Therapeutic Practice Spaces', description: 'Purpose-designed environments integrating CRD-informed therapeutic architecture with professional clinical practice.' },
        { title: 'Collaborative Research Facilities', description: 'Shared laboratory and workshop spaces for cross-domain research using the Agothean framework.' },
        { title: 'Community Integration', description: 'Residential and gathering spaces designed for the neurodivergent research community.' },
      ]}
      faq={[
        { question: 'When will institutes open?', answer: 'This is a long-term vision (2028+). Were currently in the conceptual and planning phase.' },
        { question: 'Where will they be located?', answer: 'Locations have not yet been determined. We are exploring options that balance accessibility, cost of living, and research community proximity.' },
        { question: 'Can I be involved in planning?', answer: 'Yes. Contact us to express interest. We are building a planning advisory group from the framework community.' },
        { question: 'How does this connect to online programs?', answer: 'The institutes will extend the online Framework Licensing program with in-person intensives, residencies, and collaborative research opportunities.' },
      ]}
      relatedServices={[
        { label: 'Framework Licensing', href: '/framework' },
        { label: 'Agothe VR', href: '/vr' },
      ]}
    />
  );
}
