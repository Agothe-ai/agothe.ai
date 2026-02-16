'use client';

import Link from 'next/link';

const tickerText =
  '> PERPLEXITY: Source validated. MCS 0.91  |  > CLAUDE: Safety check pass. No flags.  |  > GEMINI: Constraint field balanced. \u03B4_H stable.  |  > CHATGPT: Intervention matrix generated.  |  > GROK: Cultural signal detected. Attention shift +12%.  |  > 9: Synthesis complete. All systems nominal.  |  > CAPS NETWORK: Metallic Pulse confirmed. Coherence locked.  |  ';

const serviceLinks = [
  { label: 'Research Synthesis', href: '/research' },
  { label: 'CAPS Intelligence', href: '/intelligence' },
  { label: 'Constraint Analysis', href: '/solvey' },
  { label: 'Propaganda Detection', href: '/propaganda' },
  { label: 'AI Automation', href: '/automation' },
  { label: 'Valentine Simulator', href: '/simulation' },
  { label: 'Framework Licensing', href: '/framework' },
  { label: 'Agothe City', href: '/city' },
  { label: 'Agothe VR', href: '/vr' },
  { label: 'Consciousness Couture', href: '/couture' },
];

const companyLinks = [
  { label: 'About', href: '/about' },
  { label: 'Case Studies', href: '/case-studies' },
  { label: 'Pricing', href: '/pricing' },
  { label: 'Agothe OS', href: '/os' },
  { label: 'Transmissions', href: '/transmissions' },
  { label: 'Contact', href: '/contact' },
];

const resourceLinks = [
  { label: 'Documentation', href: '/docs' },
  { label: 'Media Kit', href: '/media' },
  { label: 'Framework Licensing', href: '/framework' },
  { label: 'Codex Access', href: '/framework' },
];

function FooterColumn({ title, links }: { title: string; links: { label: string; href: string }[] }) {
  return (
    <div>
      <p className="mb-3 text-xs font-medium uppercase tracking-[0.2em] text-agothe-white">
        {title}
      </p>
      <ul className="space-y-2">
        {links.map((link) => (
          <li key={link.label}>
            <Link
              href={link.href}
              className="text-xs text-agothe-muted transition-colors hover:text-agothe-white"
            >
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export function Footer() {
  return (
    <footer className="bg-[#050505]">
      <div className="border-t border-[rgba(0,240,255,0.1)] py-3 overflow-hidden bg-[#050505]">
        <div className="flex animate-marquee whitespace-nowrap">
          <span className="font-mono text-xs text-[rgba(0,240,255,0.4)] uppercase tracking-wider">
            {tickerText}
          </span>
          <span className="font-mono text-xs text-[rgba(0,240,255,0.4)] uppercase tracking-wider">
            {tickerText}
          </span>
        </div>
      </div>

      <div className="border-t border-[rgba(255,255,255,0.06)] px-6 py-12">
        <div className="mx-auto grid max-w-7xl gap-10 md:grid-cols-2 lg:grid-cols-4">
          <div>
            <Link href="/" className="font-heading text-lg font-bold text-agothe-teal">
              agothe.ai
            </Link>
            <p className="mt-3 text-xs leading-relaxed text-agothe-muted">
              AI-powered research synthesis &amp; crisis intelligence. 6 AI systems coordinated simultaneously.
            </p>
            <div className="mt-4 flex items-center gap-2 text-xs text-agothe-muted">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-pulse-dot rounded-full bg-agothe-teal" />
              </span>
              <span className="text-[10px] uppercase tracking-widest text-agothe-teal">
                Operational
              </span>
            </div>
          </div>

          <FooterColumn title="Services" links={serviceLinks} />
          <FooterColumn title="Company" links={companyLinks} />
          <FooterColumn title="Resources" links={resourceLinks} />
        </div>
      </div>

      <div className="border-t border-[rgba(255,255,255,0.06)] px-6 py-6">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-3 text-xs text-agothe-muted md:flex-row">
          <p>&copy; 2026 Agothe. Built by Alex Gomez, Armani Gomez &amp; the CAPS Network.</p>
          <p>research@agothe.ai</p>
        </div>
      </div>
    </footer>
  );
}
