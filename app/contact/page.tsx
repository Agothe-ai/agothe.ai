import type { Metadata } from 'next';
import { ContactPageContent } from './content';

export const metadata: Metadata = {
  title: 'Contact',
  description: 'Start with a question. End with intelligence. Tell us what you\u2019re navigating.',
};

export default function ContactPage() {
  return <ContactPageContent />;
}
