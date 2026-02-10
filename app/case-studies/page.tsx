import type { Metadata } from 'next';
import { CaseStudiesIndex } from './content';

export const metadata: Metadata = {
  title: 'Case Studies',
  description: 'Real-world intelligence analyses demonstrating CAPS methodology and multi-AI synthesis.',
};

export default function CaseStudiesPage() {
  return <CaseStudiesIndex />;
}
