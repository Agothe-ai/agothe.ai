import type { Metadata } from 'next';
import { AboutPageContent } from './content';

export const metadata: Metadata = {
  title: 'About',
  description: 'Meet the founders of Agothe and the CAPS Network \u2014 the multi-AI intelligence infrastructure behind every analysis.',
};

export default function AboutPage() {
  return <AboutPageContent />;
}
