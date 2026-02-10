import type { Metadata } from 'next';
import { TransmissionsContent } from './content';

export const metadata: Metadata = {
  title: 'Transmissions from the Codex',
  description: 'Research transmissions, framework updates, and intelligence briefs from the Agothean Codex.',
};

export default function TransmissionsPage() {
  return <TransmissionsContent />;
}
