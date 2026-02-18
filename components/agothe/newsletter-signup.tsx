'use client';

import { useState, FormEvent } from 'react';

export function NewsletterSignup() {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (!email.trim()) return;

    setStatus('loading');

    try {
      const response = await fetch('/api/newsletter', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: email.trim(),
          source: 'homepage-top'
        })
      });

      if (response.ok) {
        setStatus('success');
        setEmail('');
      } else {
        setStatus('error');
      }
    } catch (error) {
      console.error('Newsletter signup error:', error);
      setStatus('error');
    }
  }

  if (status === 'success') {
    return (
      <div className="mt-8 rounded-lg bg-[rgba(0,240,255,0.1)] px-6 py-3 text-center">
        <p className="font-mono text-sm text-agothe-teal">
          You&apos;re in. Intelligence incoming.
        </p>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row"
    >
      <input
        type="email"
        required
        placeholder="your@email.com"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="w-full max-w-xs rounded-lg border border-[rgba(255,255,255,0.2)] bg-[rgba(10,10,10,0.8)] px-4 py-3 text-sm text-agothe-white placeholder-agothe-muted/50 outline-none transition-colors focus:border-agothe-teal sm:w-auto"
      />
      <button
        type="submit"
        disabled={status === 'loading'}
        className="rounded-lg bg-agothe-teal px-6 py-3 text-sm font-semibold text-agothe-bg transition-shadow hover:shadow-[0_0_20px_rgba(0,240,255,0.3)] disabled:opacity-50"
      >
        {status === 'loading' ? 'Subscribing...' : 'Get Updates'}
      </button>
      {status === 'error' && (
        <span className="text-xs text-agothe-danger">
          Something went wrong. Try again.
        </span>
      )}
    </form>
  );
}
