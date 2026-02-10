import type { Metadata } from 'next';
import { PricingPageContent } from './content';

export const metadata: Metadata = {
  title: 'Pricing',
  description: 'Compare all Agothe services. Transparent pricing for intelligence-grade analysis.',
};

export default function PricingPage() {
  return <PricingPageContent />;
}
