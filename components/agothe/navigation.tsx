'use client';

import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, Menu, X } from 'lucide-react';
import Link from 'next/link';

interface NavItem {
  label: string;
  href: string;
}

interface NavGroup {
  label: string;
  items: NavItem[];
}

const navGroups: NavGroup[] = [
  {
    label: 'Core Services',
    items: [
      { label: 'Research Synthesis ($500+)', href: '/research' },
      { label: 'CAPS Intelligence ($2,500+)', href: '/intelligence' },
      { label: 'Constraint Analysis (Solvey)', href: '/solvey' },
      { label: 'Propaganda Detection (PEE-\u03A9)', href: '/propaganda' },
      { label: 'AI Automation ($297+)', href: '/automation' },
      { label: 'Mathematical Simulation (Valentine)', href: '/simulation' },
      { label: 'Framework Licensing ($297/mo)', href: '/framework' },
    ],
  },
  {
    label: 'Platform',
    items: [
      { label: 'Agothe City (Cognitive Navigation)', href: '/city' },
      { label: 'Agothe VR (Therapeutic Worldbuilding)', href: '/vr' },
      { label: 'Agothe Institutes (Physical Centers)', href: '/institutes' },
      { label: 'Consciousness Couture (Fashion Systems)', href: '/couture' },
    ],
  },
  {
    label: 'Company',
    items: [
      { label: 'About (Founders + CAPS)', href: '/about' },
      { label: 'Case Studies', href: '/case-studies' },
      { label: 'Pricing (Compare Services)', href: '/pricing' },
      { label: 'Agothe OS (Infrastructure)', href: '/os' },
      { label: 'Documentation', href: '/docs' },
      { label: 'Transmissions (Blog)', href: '/transmissions' },
      { label: 'Media Kit', href: '/media' },
      { label: 'Contact', href: '/contact' },
    ],
  },
];

function DesktopDropdown({ group }: { group: NavGroup }) {
  const [open, setOpen] = useState(false);
  const timeout = useRef<ReturnType<typeof setTimeout>>();

  function enter() {
    clearTimeout(timeout.current);
    setOpen(true);
  }

  function leave() {
    timeout.current = setTimeout(() => setOpen(false), 150);
  }

  return (
    <div className="relative" onMouseEnter={enter} onMouseLeave={leave}>
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center gap-1 text-sm text-agothe-muted transition-colors hover:text-agothe-white"
        aria-expanded={open}
      >
        {group.label}
        <ChevronDown className={`h-3.5 w-3.5 transition-transform ${open ? 'rotate-180' : ''}`} />
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 8 }}
            transition={{ duration: 0.15 }}
            className="obsidian-glass-static absolute left-0 top-full z-50 mt-2 min-w-[280px] rounded-lg p-2"
          >
            {group.items.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className="block rounded-md px-3 py-2 text-sm text-agothe-muted transition-colors hover:bg-[rgba(0,240,255,0.05)] hover:text-agothe-white"
              >
                {item.label}
              </Link>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function MobileMenu({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  useEffect(() => {
    if (open) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [open]);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0, x: '100%' }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: '100%' }}
          transition={{ duration: 0.25, ease: 'easeOut' }}
          className="fixed inset-0 z-50 overflow-y-auto bg-agothe-bg/95 backdrop-blur-xl"
        >
          <div className="flex items-center justify-between px-6 py-4">
            <Link href="/" onClick={onClose} className="font-heading text-lg font-bold text-agothe-teal">
              agothe.ai
            </Link>
            <button onClick={onClose} className="text-agothe-muted" aria-label="Close menu">
              <X className="h-6 w-6" />
            </button>
          </div>

          <nav className="px-6 pb-12 pt-4">
            {navGroups.map((group) => (
              <div key={group.label} className="mb-8">
                <p className="mb-3 text-xs font-medium uppercase tracking-[0.2em] text-agothe-muted">
                  {group.label}
                </p>
                <div className="space-y-1">
                  {group.items.map((item) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      onClick={onClose}
                      className="block rounded-md px-3 py-2.5 text-base text-agothe-white transition-colors hover:bg-[rgba(0,240,255,0.05)]"
                    >
                      {item.label}
                    </Link>
                  ))}
                </div>
              </div>
            ))}

            <Link
              href="/contact"
              onClick={onClose}
              className="mt-4 block rounded-full bg-agothe-teal py-3.5 text-center text-sm font-semibold text-agothe-bg"
            >
              Commission Report
            </Link>
          </nav>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export function Navigation() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    function onScroll() {
      setScrolled(window.scrollY > 20);
    }
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <>
      <header
        className={`fixed left-0 right-0 top-0 z-40 transition-all duration-300 ${
          scrolled
            ? 'border-b border-[rgba(255,255,255,0.06)] bg-agothe-bg/80 backdrop-blur-xl'
            : 'bg-transparent'
        }`}
      >
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
          <Link href="/" className="font-heading text-lg font-bold text-agothe-teal">
            agothe.ai
          </Link>

          <nav className="hidden items-center gap-8 lg:flex">
            {navGroups.map((group) => (
              <DesktopDropdown key={group.label} group={group} />
            ))}
          </nav>

          <div className="flex items-center gap-4">
            <Link
              href="/contact"
              className="hidden rounded-full bg-agothe-teal px-5 py-2 text-sm font-semibold text-agothe-bg transition-shadow hover:shadow-[0_0_20px_rgba(0,240,255,0.3)] lg:inline-flex"
            >
              Commission Report
            </Link>

            <button
              onClick={() => setMobileOpen(true)}
              className="text-agothe-muted lg:hidden"
              aria-label="Open menu"
            >
              <Menu className="h-6 w-6" />
            </button>
          </div>
        </div>
      </header>

      <MobileMenu open={mobileOpen} onClose={() => setMobileOpen(false)} />
    </>
  );
}
