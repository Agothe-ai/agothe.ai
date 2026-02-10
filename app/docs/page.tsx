import type { Metadata } from 'next';
import { DocsPageContent } from './content';

export const metadata: Metadata = {
  title: 'Documentation',
  description: 'Technical documentation for Agothe frameworks, APIs, and mathematical foundations.',
};

export default function DocsPage() {
  return <DocsPageContent />;
}
