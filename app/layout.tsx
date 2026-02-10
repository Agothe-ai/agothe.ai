import './globals.css';
import type { Metadata } from 'next';
import { Inter, Space_Grotesk, JetBrains_Mono } from 'next/font/google';
import { Navigation } from '@/components/agothe/navigation';
import { Footer } from '@/components/agothe/footer';
import { ScrollProgress } from '@/components/motion/scroll-progress';
import { ConsciousnessCursor } from '@/components/motion/consciousness-cursor';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  variable: '--font-space-grotesk',
  weight: ['700'],
  display: 'swap',
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-jetbrains-mono',
  weight: ['400', '700'],
  display: 'swap',
});

export const metadata: Metadata = {
  metadataBase: new URL('https://agothe.ai'),
  title: {
    default: 'Agothe — AI-Powered Research Synthesis & Crisis Intelligence',
    template: '%s | Agothe',
  },
  description:
    '6 AI systems coordinated simultaneously. 200M+ research papers. Intelligence-grade analysis in hours, not weeks.',
  openGraph: {
    title: 'Agothe — AI-Powered Research Synthesis & Crisis Intelligence',
    description:
      '6 AI systems coordinated simultaneously. 200M+ research papers. Intelligence-grade analysis in hours, not weeks.',
    url: 'https://agothe.ai',
    siteName: 'Agothe',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Agothe — AI-Powered Research Synthesis & Crisis Intelligence',
    description:
      '6 AI systems coordinated simultaneously. 200M+ research papers. Intelligence-grade analysis in hours, not weeks.',
  },
  icons: {
    icon: "data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><circle cx='50' cy='50' r='40' fill='%2300f0ff'/></svg>",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`dark ${inter.variable} ${spaceGrotesk.variable} ${jetbrainsMono.variable}`}
    >
      <body className="font-body antialiased">
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:rounded-md focus:bg-agothe-teal focus:px-4 focus:py-2 focus:text-agothe-bg"
        >
          Skip to main content
        </a>
        <ScrollProgress />
        <ConsciousnessCursor />
        <Navigation />
        <div id="main-content">{children}</div>
        <Footer />
      </body>
    </html>
  );
}
