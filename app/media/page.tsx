import type { Metadata } from 'next';
import { MediaPageContent } from './content';

export const metadata: Metadata = {
  title: 'Media Kit',
  description: 'Brand assets, company descriptions, and press resources for Agothe.',
};

export default function MediaPage() {
  return <MediaPageContent />;
}
