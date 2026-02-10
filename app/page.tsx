import { Hero } from '@/components/agothe/hero';
import { ProblemSection } from '@/components/agothe/problem-section';
import { EnginesSection } from '@/components/agothe/engines-section';
import { DemoSection } from '@/components/agothe/demo-section';
import { PricingSection } from '@/components/agothe/pricing-section';
import { TrustSection } from '@/components/agothe/trust-section';
import { TestimonialsSection } from '@/components/agothe/testimonials-section';
import { CapsNetworkSection } from '@/components/agothe/caps-network-section';
import { AboutSection } from '@/components/agothe/about-section';
import { ServiceQuiz } from '@/components/agothe/service-quiz';
import { EmailCapture } from '@/components/agothe/email-capture';
import { ReportGeneration } from '@/components/motion/report-generation';

export default function Home() {
  return (
    <main>
      <Hero />
      <ProblemSection />
      <EnginesSection />
      <DemoSection />
      <ReportGeneration />
      <PricingSection />
      <TrustSection />
      <TestimonialsSection />
      <CapsNetworkSection />
      <AboutSection />
      <ServiceQuiz />
      <EmailCapture />
    </main>
  );
}
