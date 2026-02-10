'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import { Database, Cpu, Activity, FileText, CheckCircle } from 'lucide-react';
import { useReducedMotion } from '@/hooks/use-reduced-motion';

interface Stage {
  icon: typeof Database;
  label: string;
  accent: string;
  detail: string;
}

const stages: Stage[] = [
  { icon: Database, label: 'Data Ingestion', accent: '#00f0ff', detail: 'Sources analyzed' },
  { icon: Cpu, label: 'AI Processing', accent: '#ffd700', detail: '6 AI systems' },
  { icon: Activity, label: 'Constraint Analysis', accent: '#ff3366', detail: 'δ_H measurement' },
  { icon: FileText, label: 'Synthesis', accent: '#00f0ff', detail: 'MCS coherence' },
  { icon: CheckCircle, label: 'Delivery', accent: '#10b981', detail: 'Report complete' },
];

const AI_NAMES = ['Perplexity', 'Claude', 'Gemini', 'ChatGPT', 'Grok', '9'];

const CYCLE = 20000;

function lerp(a: number, b: number, t: number) {
  return a + (b - a) * Math.min(Math.max(t, 0), 1);
}

export function ReportGeneration() {
  const reducedMotion = useReducedMotion();
  const [activeStage, setActiveStage] = useState(0);
  const [progress, setProgress] = useState(0);
  const [stageValues, setStageValues] = useState({
    sources: 0,
    litAIs: 0,
    currentAI: '',
    deltaH: 0,
    mcs: 0,
    delivered: false,
    timer: '',
  });
  const frameRef = useRef<number>(0);
  const startRef = useRef<number>(0);

  const animate = useCallback((now: number) => {
    if (!startRef.current) startRef.current = now;
    const elapsed = (now - startRef.current) % CYCLE;
    const overallProgress = elapsed / CYCLE;

    setProgress(overallProgress);

    const stageIdx = Math.min(Math.floor(overallProgress * 5), 4);
    setActiveStage(stageIdx);

    const stageProgress = (overallProgress * 5) % 1;

    const values = {
      sources: 0,
      litAIs: 0,
      currentAI: '',
      deltaH: 0,
      mcs: 0,
      delivered: false,
      timer: '',
    };

    if (stageIdx === 0) {
      values.sources = Math.round(lerp(0, 287, stageProgress));
    } else if (stageIdx === 1) {
      values.sources = 287;
      values.litAIs = Math.min(Math.floor(stageProgress * 7), 6);
      const aiIdx = Math.min(Math.floor(stageProgress * 6), 5);
      values.currentAI = AI_NAMES[aiIdx];
    } else if (stageIdx === 2) {
      values.sources = 287;
      values.litAIs = 6;
      values.deltaH = lerp(0, 0.76, stageProgress);
    } else if (stageIdx === 3) {
      values.sources = 287;
      values.litAIs = 6;
      values.deltaH = 0.76;
      values.mcs = lerp(0, 0.91, stageProgress);
    } else {
      values.sources = 287;
      values.litAIs = 6;
      values.deltaH = 0.76;
      values.mcs = 0.91;
      values.delivered = stageProgress > 0.3;
      values.timer = '1.8 hours';
    }

    setStageValues(values);
    frameRef.current = requestAnimationFrame(animate);
  }, []);

  useEffect(() => {
    if (reducedMotion) {
      setActiveStage(4);
      setProgress(1);
      setStageValues({
        sources: 287,
        litAIs: 6,
        currentAI: '',
        deltaH: 0.76,
        mcs: 0.91,
        delivered: true,
        timer: '1.8 hours',
      });
      return;
    }

    frameRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(frameRef.current);
  }, [reducedMotion, animate]);

  function renderStageContent(idx: number) {
    const isActive = idx === activeStage;
    const isPast = idx < activeStage;

    if (idx === 0) {
      return (
        <p className="mt-2 font-mono text-xs" style={{ color: isActive || isPast ? '#00f0ff' : 'rgba(255,255,255,0.3)' }}>
          {isPast || isActive ? stageValues.sources : 0}
          <span className="text-agothe-muted"> sources</span>
        </p>
      );
    }
    if (idx === 1) {
      return (
        <div className="mt-2 flex gap-1">
          {AI_NAMES.map((_, i) => (
            <div
              key={i}
              className="h-1.5 w-1.5 rounded-full transition-colors duration-300"
              style={{
                backgroundColor: (isActive && i < stageValues.litAIs) || isPast
                  ? '#ffd700'
                  : 'rgba(255,255,255,0.1)',
              }}
            />
          ))}
        </div>
      );
    }
    if (idx === 2) {
      const val = isActive ? stageValues.deltaH : isPast ? 0.76 : 0;
      const barColor = val > 0.5 ? '#ff3366' : val > 0.3 ? '#ffd700' : '#00f0ff';
      return (
        <div className="mt-2">
          <div className="h-1 w-full overflow-hidden rounded-full bg-[rgba(255,255,255,0.06)]">
            <div
              className="h-full rounded-full transition-all duration-100"
              style={{
                width: `${(val / 1) * 100}%`,
                backgroundColor: barColor,
              }}
            />
          </div>
          <p className="mt-1 font-mono text-[10px]" style={{ color: barColor }}>
            {`δ_H: ${val.toFixed(2)}`}
          </p>
        </div>
      );
    }
    if (idx === 3) {
      const val = isActive ? stageValues.mcs : isPast ? 0.91 : 0;
      return (
        <p className="mt-2 font-mono text-xs" style={{ color: isActive || isPast ? '#00f0ff' : 'rgba(255,255,255,0.3)' }}>
          MCS: {val.toFixed(2)}
        </p>
      );
    }
    return (
      <p className="mt-2 font-mono text-xs" style={{ color: stageValues.delivered ? '#10b981' : 'rgba(255,255,255,0.3)' }}>
        {stageValues.delivered ? stageValues.timer : '--'}
      </p>
    );
  }

  return (
    <section className="px-4 py-16 md:py-24">
      <div className="mx-auto max-w-5xl">
        <div className="relative mb-6">
          <div className="absolute left-0 right-0 top-1/2 hidden h-[2px] -translate-y-1/2 bg-[rgba(255,255,255,0.06)] md:block" />
          <div
            className="absolute left-0 top-1/2 hidden h-[2px] -translate-y-1/2 transition-all duration-100 md:block"
            style={{
              width: `${progress * 100}%`,
              background: `linear-gradient(90deg, #00f0ff, ${stages[activeStage]?.accent || '#00f0ff'})`,
            }}
          />
        </div>

        <div className="grid grid-cols-2 gap-4 md:grid-cols-5 md:gap-3">
          {stages.map((stage, idx) => {
            const isActive = idx === activeStage;
            const isPast = idx < activeStage;
            const Icon = stage.icon;

            return (
              <div
                key={stage.label}
                className="rounded-lg p-4 transition-all duration-500"
                style={{
                  background: isActive
                    ? 'rgba(255,255,255,0.06)'
                    : 'rgba(255,255,255,0.02)',
                  border: `1px solid ${isActive ? stage.accent + '40' : 'rgba(255,255,255,0.06)'}`,
                  boxShadow: isActive ? `0 0 20px ${stage.accent}15` : 'none',
                  opacity: isActive || isPast ? 1 : 0.4,
                }}
              >
                <Icon
                  className="mb-2 h-5 w-5 transition-colors duration-300"
                  style={{ color: isActive || isPast ? stage.accent : 'rgba(255,255,255,0.2)' }}
                />
                <p
                  className="text-xs font-semibold uppercase tracking-wider transition-colors duration-300"
                  style={{ color: isActive ? stage.accent : isPast ? 'rgba(255,255,255,0.6)' : 'rgba(255,255,255,0.3)' }}
                >
                  {stage.label}
                </p>
                {renderStageContent(idx)}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
