'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import { useReducedMotion } from '@/hooks/use-reduced-motion';

interface Highlight {
  text: string;
  label: string;
  scoreContribution: number;
}

const sampleSentences = [
  'Officials confirmed today that the situation remains under control.',
  'Sources close to the administration say there is no cause for alarm.',
  'Critics have been silenced by overwhelming evidence of progress.',
  'The public should remain calm and trust the process.',
];

const highlights: Highlight[] = [
  { text: 'remains under control', label: 'False Certainty', scoreContribution: 0.23 },
  { text: 'no cause for alarm', label: 'Emotional Suppression', scoreContribution: 0.28 },
  { text: 'silenced', label: 'Coercion Marker', scoreContribution: 0.15 },
  { text: 'trust the process', label: 'Authority Appeal', scoreContribution: 0.12 },
];

const CYCLE_DURATION = 12000;
const PHASE_1_END = 4000;
const PHASE_2_END = 8000;

export function PropagandaDetector() {
  const reducedMotion = useReducedMotion();
  const [phase, setPhase] = useState<1 | 2 | 3>(1);
  const [scanProgress, setScanProgress] = useState(0);
  const [revealedHighlights, setRevealedHighlights] = useState<number>(0);
  const [score, setScore] = useState(0);
  const [showVerdict, setShowVerdict] = useState(false);
  const frameRef = useRef<number>(0);
  const startRef = useRef<number>(0);

  const animate = useCallback((now: number) => {
    if (!startRef.current) startRef.current = now;
    const elapsed = (now - startRef.current) % CYCLE_DURATION;

    if (elapsed < PHASE_1_END) {
      setPhase(1);
      setScanProgress(0);
      setRevealedHighlights(0);
      setScore(0);
      setShowVerdict(false);
    } else if (elapsed < PHASE_2_END) {
      setPhase(2);
      const phaseProgress = (elapsed - PHASE_1_END) / (PHASE_2_END - PHASE_1_END);
      setScanProgress(phaseProgress);

      const revealed = Math.min(Math.floor(phaseProgress * (highlights.length + 0.5)), highlights.length);
      setRevealedHighlights(revealed);

      let runningScore = 0;
      for (let i = 0; i < revealed; i++) {
        runningScore += highlights[i].scoreContribution;
      }
      setScore(runningScore);
    } else {
      setPhase(3);
      setRevealedHighlights(highlights.length);
      setScore(0.78);
      setShowVerdict(true);
    }

    frameRef.current = requestAnimationFrame(animate);
  }, []);

  useEffect(() => {
    if (reducedMotion) {
      setPhase(3);
      setRevealedHighlights(highlights.length);
      setScore(0.78);
      setShowVerdict(true);
      return;
    }

    frameRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(frameRef.current);
  }, [reducedMotion, animate]);

  function renderText() {
    return sampleSentences.map((sentence, si) => {
      let parts: React.ReactNode[] = [];
      let remaining = sentence;
      let keyIdx = 0;

      highlights.forEach((h, hi) => {
        const idx = remaining.indexOf(h.text);
        if (idx === -1) return;

        if (idx > 0) {
          parts.push(<span key={`${si}-${keyIdx++}`}>{remaining.slice(0, idx)}</span>);
        }

        const isRevealed = hi < revealedHighlights;
        parts.push(
          <span
            key={`${si}-h-${hi}`}
            className="relative inline transition-all duration-500"
            style={{
              backgroundColor: isRevealed ? 'rgba(255,51,102,0.2)' : 'transparent',
              borderBottom: isRevealed ? '2px solid #ff3366' : '2px solid transparent',
            }}
          >
            {h.text}
            {isRevealed && (
              <span
                className="absolute -top-5 left-0 whitespace-nowrap rounded px-1 py-0.5 text-[9px] font-bold uppercase tracking-wider"
                style={{
                  backgroundColor: 'rgba(255,51,102,0.9)',
                  color: '#fff',
                }}
              >
                {h.label}
              </span>
            )}
          </span>
        );

        remaining = remaining.slice(idx + h.text.length);
      });

      if (remaining) {
        parts.push(<span key={`${si}-end`}>{remaining}</span>);
      }

      if (parts.length === 0) {
        parts = [<span key={si}>{sentence}</span>];
      }

      return (
        <p key={si} className="relative mb-3 text-sm leading-relaxed text-agothe-muted/90">
          {parts}
        </p>
      );
    });
  }

  return (
    <section className="px-6 py-24 md:py-32">
      <div className="mx-auto max-w-2xl">
        <div
          className="relative overflow-hidden rounded-lg p-6 md:p-8 transition-shadow duration-700"
          style={{
            background: 'rgba(255,255,255,0.03)',
            border: `1px solid ${showVerdict ? 'rgba(255,51,102,0.4)' : 'rgba(255,255,255,0.08)'}`,
            boxShadow: showVerdict ? '0 0 40px rgba(255,51,102,0.1)' : 'none',
          }}
        >
          <div className="mb-4 flex items-center justify-between">
            <span className="font-mono text-xs tracking-wider text-agothe-teal">
              PEE-{'Ω'} SCANNER
            </span>
            <span className="font-mono text-xs text-agothe-muted">
              {phase === 1 && 'Ready'}
              {phase === 2 && 'Scanning...'}
              {phase === 3 && 'Complete'}
            </span>
          </div>

          {phase >= 2 && !reducedMotion && (
            <div
              className="absolute left-0 right-0 h-[1px] transition-opacity"
              style={{
                top: `${20 + scanProgress * 70}%`,
                background: 'linear-gradient(90deg, transparent, #00f0ff, transparent)',
                opacity: phase === 2 ? 0.6 : 0,
              }}
            />
          )}

          <div className="relative mt-2">{renderText()}</div>

          <div className="mt-6 flex items-center justify-between border-t border-[rgba(255,255,255,0.08)] pt-4">
            <span className="text-xs uppercase tracking-wider text-agothe-muted">
              Manipulation Score
            </span>
            <span
              className="font-mono text-lg font-bold transition-colors duration-300"
              style={{
                color: score > 0.5 ? '#ff3366' : score > 0.3 ? '#ffd700' : '#00f0ff',
              }}
            >
              {score.toFixed(2)}
            </span>
          </div>

          {showVerdict && (
            <div
              className="mt-4 rounded-md px-4 py-3 text-center transition-opacity duration-500"
              style={{
                background: 'rgba(255,51,102,0.1)',
                border: '1px solid rgba(255,51,102,0.3)',
              }}
            >
              <p className="font-mono text-sm font-bold text-[#ff3366]">
                Bullshit Score: 0.78 — HIGH MANIPULATION
              </p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
