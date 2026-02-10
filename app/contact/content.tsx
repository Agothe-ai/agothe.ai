'use client';

import { useState, FormEvent } from 'react';
import { AnimatedSection, AnimatedItem } from '@/components/agothe/animated-section';
import { supabase } from '@/lib/supabase';
import { MeshGradientHero } from '@/components/motion/mesh-gradient-hero';

const services = [
  'Research Synthesis',
  'CAPS Intelligence',
  'Constraint Analysis (Solvey)',
  'Propaganda Detection (PEE-\u03A9)',
  'AI Automation',
  'Mathematical Simulation (Valentine)',
  'Framework Licensing',
  'Agothe City',
  'Agothe VR',
  'Agothe Institutes',
  'Consciousness Couture',
  'Not sure yet',
];

export function ContactPageContent() {
  const [form, setForm] = useState({ name: '', email: '', service: '', message: '' });
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [errorMsg, setErrorMsg] = useState('');

  function update(field: string, value: string) {
    setForm((prev) => ({ ...prev, [field]: value }));
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (!form.email.trim() || !form.message.trim()) return;

    setStatus('loading');
    setErrorMsg('');

    const { error } = await supabase.from('contact_submissions').insert({
      name: form.name.trim(),
      email: form.email.trim().toLowerCase(),
      service_interest: form.service,
      message: form.message.trim(),
    });

    if (error) {
      setStatus('error');
      setErrorMsg('Something went wrong. Please try again.');
    } else {
      setStatus('success');
    }
  }

  return (
    <main className="pt-20">
      <section className="relative overflow-hidden px-6 py-24 md:py-32">
        <MeshGradientHero />
        <AnimatedSection className="relative z-10 mx-auto max-w-3xl text-center">
          <AnimatedItem>
            <h1 className="font-heading text-4xl font-bold text-agothe-white md:text-6xl">
              Start with a question. End with intelligence.
            </h1>
          </AnimatedItem>
          <AnimatedItem>
            <p className="mx-auto mt-4 max-w-xl text-lg text-agothe-muted">
              Tell us what you&apos;re navigating. We&apos;ll respond within 24 hours.
            </p>
          </AnimatedItem>
        </AnimatedSection>
      </section>

      <section className="px-6 pb-24 md:pb-32">
        <AnimatedSection className="mx-auto max-w-xl">
          <AnimatedItem>
            {status === 'success' ? (
              <div className="obsidian-glass-static rounded-xl p-8 text-center md:p-12">
                <p className="font-mono text-xl text-agothe-teal">
                  Received. The network will respond within 24 hours.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="obsidian-glass-static space-y-5 rounded-xl p-8 md:p-10">
                <div>
                  <label htmlFor="contact-name" className="mb-1.5 block text-xs uppercase tracking-wider text-agothe-muted">
                    Name (optional)
                  </label>
                  <input
                    id="contact-name"
                    type="text"
                    value={form.name}
                    onChange={(e) => update('name', e.target.value)}
                    className="w-full rounded-lg border border-[rgba(255,255,255,0.1)] bg-[rgba(10,10,10,0.8)] px-4 py-3 text-sm text-agothe-white placeholder-agothe-muted/50 outline-none transition-colors focus:border-agothe-teal"
                    placeholder="Your name"
                  />
                </div>

                <div>
                  <label htmlFor="contact-email" className="mb-1.5 block text-xs uppercase tracking-wider text-agothe-muted">
                    Email
                  </label>
                  <input
                    id="contact-email"
                    type="email"
                    required
                    value={form.email}
                    onChange={(e) => update('email', e.target.value)}
                    className="w-full rounded-lg border border-[rgba(255,255,255,0.1)] bg-[rgba(10,10,10,0.8)] px-4 py-3 text-sm text-agothe-white placeholder-agothe-muted/50 outline-none transition-colors focus:border-agothe-teal"
                    placeholder="you@example.com"
                  />
                </div>

                <div>
                  <label htmlFor="contact-service" className="mb-1.5 block text-xs uppercase tracking-wider text-agothe-muted">
                    Service Interest
                  </label>
                  <select
                    id="contact-service"
                    value={form.service}
                    onChange={(e) => update('service', e.target.value)}
                    className="w-full rounded-lg border border-[rgba(255,255,255,0.1)] bg-[rgba(10,10,10,0.8)] px-4 py-3 text-sm text-agothe-white outline-none transition-colors focus:border-agothe-teal"
                  >
                    <option value="">Select a service...</option>
                    {services.map((s) => (
                      <option key={s} value={s}>{s}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label htmlFor="contact-message" className="mb-1.5 block text-xs uppercase tracking-wider text-agothe-muted">
                    Message
                  </label>
                  <textarea
                    id="contact-message"
                    required
                    rows={5}
                    value={form.message}
                    onChange={(e) => update('message', e.target.value)}
                    className="w-full resize-none rounded-lg border border-[rgba(255,255,255,0.1)] bg-[rgba(10,10,10,0.8)] px-4 py-3 text-sm text-agothe-white placeholder-agothe-muted/50 outline-none transition-colors focus:border-agothe-teal"
                    placeholder="What are you navigating?"
                  />
                </div>

                {status === 'error' && (
                  <p className="text-sm text-agothe-danger">{errorMsg}</p>
                )}

                <button
                  type="submit"
                  disabled={status === 'loading'}
                  className="w-full rounded-lg bg-agothe-teal py-3 text-sm font-semibold text-agothe-bg transition-shadow hover:shadow-[0_0_20px_rgba(0,240,255,0.3)] disabled:opacity-50"
                >
                  {status === 'loading' ? 'Sending...' : 'Send to CAPS Network'}
                </button>
              </form>
            )}
          </AnimatedItem>

          <AnimatedItem>
            <div className="mt-8 text-center text-sm text-agothe-muted">
              <p>Alternative: <span className="text-agothe-teal">research@agothe.ai</span></p>
              <p className="mt-1 text-xs text-agothe-muted/60">
                For urgent crisis analysis, email directly with subject: URGENT
              </p>
            </div>
          </AnimatedItem>
        </AnimatedSection>
      </section>
    </main>
  );
}
