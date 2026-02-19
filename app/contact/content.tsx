'use client';

import { useState, FormEvent } from 'react';
import { AnimatedSection, AnimatedItem } from '@/components/agothe/animated-section';
import { PageHero } from '@/components/agothe/page-hero';

const services = [
  'Research Synthesis',
  'CAPS Intelligence',
  'Constraint Analysis (Solvey)',
  'Propaganda Detection (PEE-Ω)',
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

    try {
      const res = await fetch('/api/send-notification', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          type: 'contact',
          name: form.name.trim(),
          email: form.email.trim().toLowerCase(),
          service: form.service,
          message: form.message.trim(),
        }),
      });

      if (!res.ok) {
        throw new Error('Network response was not ok');
      }

      setStatus('success');
    } catch (err) {
      console.error('Submission error:', err);
      setStatus('error');
      setErrorMsg('Something went wrong. Please try again or email research@agothe.ai directly.');
    }
  }

  return (
    <main className="min-h-screen bg-agothe-bg pt-24 pb-16">
      <PageHero
        title="Start with a question. End with intelligence."
        subtitle="Tell us what you're navigating. We'll respond within 24 hours."
      />
      <section className="mx-auto max-w-xl px-4">
        <AnimatedSection>
          <AnimatedItem>
            {status === 'success' ? (
              <div className="rounded-xl border border-agothe-teal/30 bg-agothe-teal/5 p-8 text-center">
                <p className="text-agothe-teal font-semibold">Received. The network will respond within 24 hours.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                <div>
                  <label htmlFor="contact-name" className="mb-1.5 block text-xs font-medium text-agothe-muted uppercase tracking-wider">
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
                  <label htmlFor="contact-email" className="mb-1.5 block text-xs font-medium text-agothe-muted uppercase tracking-wider">
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
                  <label htmlFor="contact-service" className="mb-1.5 block text-xs font-medium text-agothe-muted uppercase tracking-wider">
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
                  <label htmlFor="contact-message" className="mb-1.5 block text-xs font-medium text-agothe-muted uppercase tracking-wider">
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
                  <p className="text-sm text-red-400">{errorMsg}</p>
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
