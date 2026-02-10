'use client';

import { useState, FormEvent } from 'react';
import { AnimatedSection, AnimatedItem } from './animated-section';
import { supabase } from '@/lib/supabase';

export function EmailCapture() {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [errorMsg, setErrorMsg] = useState('');

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (!email.trim()) return;

    setStatus('loading');
    setErrorMsg('');

    const { error } = await supabase
      .from('newsletter_subscribers')
      .insert({ email: email.trim().toLowerCase() });

    if (error) {
      if (error.code === '23505') {
        setStatus('success');
      } else {
        setStatus('error');
        setErrorMsg('Something went wrong. Please try again.');
      }
    } else {
      setStatus('success');
    }
    setEmail('');
  }

  return (
    <section id="contact" className="relative px-4 py-24 md:py-32">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-agothe-teal/[0.03] to-transparent" />

      <AnimatedSection className="relative mx-auto max-w-xl">
        <AnimatedItem>
          <div className="obsidian-glass-static rounded-xl p-8 text-center md:p-12">
            <h2 className="font-heading text-3xl font-bold text-agothe-white md:text-4xl">
              Enter the field.
            </h2>
            <p className="mt-3 text-base text-agothe-muted">
              Get weekly intelligence briefs, framework updates, and early access
              to new tools.
            </p>

            {status === 'success' ? (
              <p className="mt-8 font-mono text-lg text-agothe-teal">
                Welcome to the field.
              </p>
            ) : (
              <form
                onSubmit={handleSubmit}
                className="mt-8 flex flex-col gap-3 sm:flex-row"
              >
                <input
                  type="email"
                  required
                  placeholder="your@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="flex-1 rounded-lg border border-[rgba(255,255,255,0.1)] bg-[rgba(10,10,10,0.8)] px-4 py-3 text-sm text-agothe-white placeholder-agothe-muted/50 outline-none transition-colors focus:border-agothe-teal"
                />
                <button
                  type="submit"
                  disabled={status === 'loading'}
                  className="rounded-lg bg-agothe-teal px-6 py-3 text-sm font-semibold text-agothe-bg transition-shadow hover:shadow-[0_0_20px_rgba(0,240,255,0.3)] disabled:opacity-50"
                >
                  {status === 'loading' ? '...' : 'Join'}
                </button>
              </form>
            )}

            {status === 'error' && (
              <p className="mt-3 text-sm text-agothe-danger">{errorMsg}</p>
            )}

            <p className="mt-4 text-xs text-agothe-muted/50">
              No spam. Unsubscribe anytime. We respect your attention.
            </p>
          </div>
        </AnimatedItem>
      </AnimatedSection>
    </section>
  );
}
