import type { Metadata } from 'next';
import { OSPageContent } from './content';

export const metadata: Metadata = {
  title: 'Agothe OS \u2014 Autonomous AI Infrastructure',
  description: 'Autonomous AI system with local LLM reasoning, file operations, Notion integration, and self-evolution capabilities.',
};

export default function OSPage() {
  return <OSPageContent />;
}
