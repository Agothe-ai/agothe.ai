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
        className="flex items-center gap-1 text-xs font-medium text-agothe-muted transition-colors hover:text-agothe-teal tracking-wide"
        aria-expanded={open}
      >
        {group.label}
        <ChevronDown
          size={12}
          className={`transition-transform duration-200 ${open ? 'rotate-180' : ''}`}
        />
      </button>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.15 }}
            className="absolute top-full left-1/2 -translate-x-1/2 mt-2 min-w-[220px] rounded-xl border border-white/10 z-50 overflow-hidden"
            style={{
              background: 'rgba(10, 22, 40, 0.92)',
              backdropFilter: 'blur(20px)',
              WebkitBackdropFilter: 'blur(20px)',
              boxShadow: '0 8px 32px rgba(0,0,0,0.5), inset 0 0 0 1px rgba(0,240,255,0.07)',
            }}
          >
            {group.items.map((item, i) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className="flex items-center gap-2 px-4 py-2.5 text-xs text-agothe-muted transition-colors hover:bg-[rgba(0,240,255,0.06)] hover:text-agothe-teal"
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
    return () => { document.body.style.overflow = ''; };
  }, [open]);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0, x: '100%' }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: '100%' }}
          transition={{ duration: 0.25, ease: 'easeInOut' }}
          className="fixed inset-0 z-50 flex flex-col overflow-y-auto"
          style={{
            background: 'rgba(10, 10, 10, 0.97)',
            backdropFilter: 'blur(24px)',
          }}
        >
          <div className="flex items-center justify-between px-6 py-5 border-b border-white/10">
            <Link href="/" onClick={onClose} className="font-heading font-bold text-lg text-agothe-teal tracking-tight">
              agothe.ai
            </Link>
            <button onClick={onClose} className="text-agothe-muted hover:text-agothe-white">
              <X size={20} />
            </button>
          </div>
          <div className="flex-1 px-6 py-6 space-y-6">
            {navGroups.map((group) => (
              <div key={group.label}>
                <p className="text-xs uppercase tracking-widest text-agothe-teal font-semibold mb-3">
                  {group.label}
                </p>
                <div className="space-y-1">
                  {group.items.map((item) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      onClick={onClose}
                      className="block py-2 text-sm text-agothe-muted hover:text-agothe-white transition-colors"
                    >
                      {item.label}
                    </Link>
                  ))}
                </div>
              </div>
            ))}
          </div>
          <div className="px-6 pb-8 flex flex-col gap-3">
            <Link
              href="/demo"
              onClick={onClose}
              className="block w-full text-center py-3 rounded-lg border border-agothe-teal text-agothe-teal text-sm font-medium hover:bg-agothe-teal/10 transition-colors"
            >
              Schedule Demo
            </Link>
            <Link
              href="/intelligence"
              onClick={onClose}
              className="block w-full text-center py-3 rounded-lg bg-agothe-teal/20 border border-agothe-teal/40 text-agothe-white text-sm font-medium hover:bg-agothe-teal/30 transition-colors"
            >
              Commission Report
            </Link>
          </div>
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
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled
            ? 'border-b border-white/10'
            : 'border-b border-transparent'
        }`}
        style={{
          background: scrolled
            ? 'rgba(10, 22, 40, 0.88)'
            : 'transparent',
          backdropFilter: scrolled ? 'blur(20px) saturate(150%)' : 'none',
          WebkitBackdropFilter: scrolled ? 'blur(20px) saturate(150%)' : 'none',
        }}
      >
        <div className="flex items-center justify-between px-6 lg:px-12 h-16">
          {/* Logo */}
          <Link
            href="/"
            className="font-heading font-bold text-xl text-agothe-teal tracking-tight hover:opacity-80 transition-opacity"
            style={{ textShadow: '0 0 20px rgba(0,240,255,0.4)' }}
          >
            agothe.ai
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-8">
            {navGroups.map((group) => (
              <DesktopDropdown key={group.label} group={group} />
            ))}
          </nav>

          {/* CTA Buttons */}
          <div className="hidden lg:flex items-center gap-3">
            <Link
              href="/demo"
              className="px-4 py-2 rounded-lg border border-agothe-teal text-agothe-teal text-xs font-medium tracking-wide hover:bg-agothe-teal/10 transition-all duration-200"
            >
              Schedule Demo
            </Link>
            <Link
              href="/intelligence"
              className="px-4 py-2 rounded-lg bg-agothe-teal/20 border border-agothe-teal/40 text-agothe-white text-xs font-medium tracking-wide hover:bg-agothe-teal/30 transition-all duration-200"
            >
              Commission Report
            </Link>
          </div>

          {/* Mobile Hamburger */}
          <button
            onClick={() => setMobileOpen(true)}
            className="text-agothe-white lg:hidden"
            aria-label="Open menu"
          >
            <Menu size={22} />
          </button>
        </div>
      </header>

      <MobileMenu open={mobileOpen} onClose={() => setMobileOpen(false)} />
    </>
  );
}
