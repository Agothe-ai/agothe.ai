'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import { Database, Cpu, Activity, FileText, CheckCircle } from 'lucide-react';
import { useReducedMotion } from '@/hooks/use-reduced-motion';
import { useDeviceCapability } from '@/hooks/use-device-capability';

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

// For the sequential animation
const STAGE_DELAY = 800; // 800ms between stages

function lerp(a: number, b: number, t: number) {
  return a + (b - a) * Math.min(Math.max(t, 0), 1);
}

export function ReportGeneration() {
  const reducedMotion = useReducedMotion();
  const capability = useDeviceCapability();
  const [activeStage, setActiveStage] = useState(-1); // Start with no active stage
  const [completedStages, setCompletedStages] = useState<number[]>([]);
  const [stageValues, setStageValues] = useState({
    sources: 0,
    litAIs: 0,
    currentAI: '',
    deltaH: 0,
    deltaHColor: '#00f0ff',
    mcs: 0,
    delivered: false,
    timer: '',
    docPieces: 0,
  });
  const sectionRef = useRef<HTMLElement>(null);
  const [animationStarted, setAnimationStarted] = useState(false);
  const animationFrameRef = useRef<number>();
  const stageStartTimeRef = useRef<number>(0);

  // IntersectionObserver — trigger animation when visible
  useEffect(() => {
    if (reducedMotion || animationStarted) {
      return;
    }
    const el = sectionRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !animationStarted) {
          setAnimationStarted(true);
          animateSequentially(0);
        }
      },
      { rootMargin: '100px' }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [reducedMotion, animationStarted]);

  const animateSequentially = (stageIndex: number) => {
    if (stageIndex >= stages.length) {
      return;
    }

    setActiveStage(stageIndex);
    stageStartTimeRef.current = Date.now();
    
    // Animate the current stage's content
    animateStageContent(stageIndex);

    // Move to next stage after delay
    setTimeout(() => {
      setCompletedStages(prev => [...prev, stageIndex]);
      animateSequentially(stageIndex + 1);
    }, STAGE_DELAY);
  };

  const animateStageContent = (stageIndex: number) => {
    const startTime = Date.now();
    const duration = STAGE_DELAY;

    const animate = () => {
      const elapsed = Date.now() - startTime;
      const progress = Math.min(elapsed / duration, 1);

      const values = {
        sources: 0,
        litAIs: 0,
        currentAI: '',
        deltaH: 0,
        deltaHColor: '#00f0ff' as string,
        mcs: 0,
        delivered: false,
        timer: '',
        docPieces: 0,
      };

      // Carry forward completed stage values
      if (stageIndex >= 0) values.sources = 287;
      if (stageIndex >= 1) values.litAIs = 6;
      if (stageIndex >= 2) {
        values.deltaH = 0.76;
        values.deltaHColor = '#ff3366';
      }
      if (stageIndex >= 3) {
        values.mcs = 0.91;
        values.docPieces = 5;
      }
      if (stageIndex >= 4) {
        values.delivered = true;
        values.timer = '1.8 hours';
      }

      // Animate current stage
      if (stageIndex === 0) {
        values.sources = Math.round(lerp(0, 287, progress));
      } else if (stageIndex === 1) {
        values.litAIs = Math.min(Math.floor(progress * 7), 6);
        const aiIdx = Math.min(Math.floor(progress * 6), 5);
        values.currentAI = AI_NAMES[aiIdx];
      } else if (stageIndex === 2) {
        values.deltaH = lerp(0, 0.76, progress);
        const dh = values.deltaH;
        values.deltaHColor = dh > 0.5 ? '#ff3366' : dh > 0.3 ? '#ffd700' : '#00f0ff';
      } else if (stageIndex === 3) {
        values.mcs = lerp(0, 0.91, progress);
        values.docPieces = Math.min(Math.floor(progress * 6), 5);
      }

      setStageValues(values);

      if (progress < 1) {
        animationFrameRef.current = requestAnimationFrame(animate);
      }
    };

    if (animationFrameRef.current) {
      cancelAnimationFrame(animationFrameRef.current);
    }
    animate();
  };

  useEffect(() => {
    if (reducedMotion) {
      setActiveStage(4);
      setCompletedStages([0, 1, 2, 3, 4]);
      setStageValues({
        sources: 287,
        litAIs: 6,
        currentAI: '',
        deltaH: 0.76,
        deltaHColor: '#ff3366',
        mcs: 0.91,
        delivered: true,
        timer: '1.8 hours',
        docPieces: 5,
      });
      return;
    }

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [reducedMotion]);

  function renderStageContent(idx: number) {
    const isActive = idx === activeStage;
    const isPast = completedStages.includes(idx);

    if (idx === 0) {
      return (
        <div className="mt-3">
          <p className="font-mono text-xs transition-colors duration-300" style={{ color: isActive || isPast ? '#00f0ff' : 'rgba(255,255,255,0.3)' }}>
            Sources analyzed: <span className="font-bold">{isPast ? 287 : isActive ? stageValues.sources : 0}</span>
          </p>
          {isActive && (
            <div className="mt-2 flex gap-0.5">
              {Array.from({ length: 8 }).map((_, i) => (
                <div
                  key={i}
                  className="h-1 w-1 rounded-full"
                  style={{
                    backgroundColor: '#00f0ff',
                    opacity: ((stageValues.sources / 287) * 8) > i ? 0.8 : 0.1,
                    transition: 'opacity 0.15s',
                  }}
                />
              ))}
            </div>
          )}
        </div>
      );
    }
    if (idx === 1) {
      return (
        <div className="mt-3">
          <div className="flex flex-wrap gap-1">
            {AI_NAMES.map((name, i) => {
              const isLit = (isActive && i < stageValues.litAIs) || isPast;
              const isCurrent = isActive && name === stageValues.currentAI;
              return (
                <div
                  key={i}
                  className="relative flex items-center gap-1"
                >
                  <div
                    className="h-2 w-2 rounded-full transition-all duration-300"
                    style={{
                      backgroundColor: isLit ? '#ffd700' : 'rgba(255,255,255,0.1)',
                      boxShadow: isCurrent ? '0 0 6px #ffd700' : 'none',
                    }}
                  />
                  {isCurrent && (
                    <span className="font-mono text-[9px] text-agothe-gold">{name}</span>
                  )}
                </div>
              );
            })}
          </div>
          {isActive && stageValues.litAIs > 1 && (
            <div className="mt-1.5 h-[1px] w-full overflow-hidden rounded-full bg-[rgba(255,255,255,0.04)]">
              <div
                className="h-full rounded-full transition-all duration-300"
                style={{
                  width: `${(stageValues.litAIs / 6) * 100}%`,
                  background: 'linear-gradient(90deg, #ffd700, #ffd70060)',
                }}
              />
            </div>
          )}
        </div>
      );
    }
    if (idx === 2) {
      const val = isActive ? stageValues.deltaH : isPast ? 0.76 : 0;
      const barColor = val > 0.5 ? '#ff3366' : val > 0.3 ? '#ffd700' : '#00f0ff';
      return (
        <div className="mt-3">
          <div className="h-1.5 w-full overflow-hidden rounded-full bg-[rgba(255,255,255,0.06)]">
            <div
              className="h-full rounded-full transition-all duration-100"
              style={{
                width: `${(val / 1) * 100}%`,
                backgroundColor: barColor,
                boxShadow: isActive ? `0 0 8px ${barColor}60` : 'none',
              }}
            />
          </div>
          <p className="mt-1.5 font-mono text-[10px] font-bold" style={{ color: barColor }}>
            δ_H: {val.toFixed(2)}{isPast || (isActive && val >= 0.7) ? ' — Critical Stress Detected' : ''}
          </p>
        </div>
      );
    }
    if (idx === 3) {
      const val = isActive ? stageValues.mcs : isPast ? 0.91 : 0;
      return (
        <div className="mt-3">
          {isActive && (
            <div className="mb-2 flex gap-0.5">
              {Array.from({ length: 5 }).map((_, i) => (
                <div
                  key={i}
                  className="h-2 rounded-sm transition-all duration-300"
                  style={{
                    width: '100%',
                    backgroundColor: i < stageValues.docPieces ? 'rgba(0,240,255,0.15)' : 'rgba(255,255,255,0.03)',
                    border: i < stageValues.docPieces ? '1px solid rgba(0,240,255,0.2)' : '1px solid rgba(255,255,255,0.04)',
                  }}
                />
              ))}
            </div>
          )}
          <p className="font-mono text-xs" style={{ color: isActive || isPast ? '#00f0ff' : 'rgba(255,255,255,0.3)' }}>
            Coherence: <span className="font-bold">{val.toFixed(2)}</span>
          </p>
        </div>
      );
    }
    // Stage 4: Delivery
    return (
      <div className="mt-3">
        <p className="font-mono text-xs" style={{ color: stageValues.delivered ? '#10b981' : 'rgba(255,255,255,0.3)' }}>
          {stageValues.delivered ? (
            <>
              <span className="mr-1">✓</span>
              Completed in {stageValues.timer}
            </>
          ) : '--'}
        </p>
      </div>
    );
  }

  return (
    <section ref={sectionRef} className="relative overflow-hidden bg-[#0a0a0a] px-4 py-16 md:py-24">
      {/* Subtle texture overlay */}
      <div className="pointer-events-none absolute inset-0 opacity-[0.03]" style={{
        backgroundImage: 'url("data:image/svg+xml,%3Csvg width=\'100\' height=\'100\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'noise\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.9\' numOctaves=\'4\' /%3E%3C/filter%3E%3Crect width=\'100\' height=\'100\' filter=\'url(%23noise)\' opacity=\'1\' /%3E%3C/svg%3E")',
      }} />

      <div className="mx-auto max-w-5xl">
        {/* Section heading */}
        <div className="mb-12 text-center">
          <h2 className="mb-3 text-2xl font-bold uppercase tracking-tight text-white md:text-3xl">
            Intelligence Synthesis Pipeline
          </h2>
          <p className="text-sm text-[rgba(255,255,255,0.6)] md:text-base">
            Real-time report generation in under 2 hours
          </p>
        </div>

        <div className="relative mb-6">
          <div className="absolute left-0 right-0 top-1/2 hidden h-[2px] -translate-y-1/2 bg-[rgba(255,255,255,0.06)] md:block" />
          <div
            className="absolute left-0 top-1/2 hidden h-[2px] -translate-y-1/2 md:block"
            style={{
              width: `${activeStage >= 0 ? ((activeStage + 1) / stages.length) * 100 : 0}%`,
              background: activeStage >= 0 ? `linear-gradient(90deg, #00f0ff, ${stages[Math.min(activeStage, stages.length - 1)]?.accent || '#00f0ff'})` : '#00f0ff',
              boxShadow: activeStage >= 0 ? `0 0 8px ${stages[Math.min(activeStage, stages.length - 1)]?.accent || '#00f0ff'}40` : 'none',
              transition: capability === 'low' ? 'none' : 'width 0.8s ease-out',
            }}
          />
        </div>

        {/* Vertical progress line for mobile */}
        <div className="relative md:hidden">
          <div className="absolute bottom-0 left-4 top-0 w-[2px] bg-[rgba(255,255,255,0.06)]" />
          <div
            className="absolute left-4 top-0 w-[2px]"
            style={{
              height: `${activeStage >= 0 ? ((activeStage + 1) / stages.length) * 100 : 0}%`,
              background: activeStage >= 0 ? `linear-gradient(180deg, #00f0ff, ${stages[Math.min(activeStage, stages.length - 1)]?.accent || '#00f0ff'})` : '#00f0ff',
              transition: capability === 'low' ? 'none' : 'height 0.8s ease-out',
            }}
          />
        </div>

        {/* Desktop: horizontal grid, Mobile: vertical stack */}
        <div className="grid grid-cols-1 gap-4 md:grid-cols-5 md:gap-3">
          {stages.map((stage, idx) => {
            const isActive = idx === activeStage;
            const isPast = completedStages.includes(idx);
            const Icon = stage.icon;

            return (
              <div
                key={stage.label}
                className="obsidian-glass-static rounded-lg p-4 transition-all duration-500"
                style={{
                  background: isActive
                    ? 'rgba(255,255,255,0.06)'
                    : 'rgba(255,255,255,0.02)',
                  border: `1px solid ${isActive ? `rgba(0,240,255,0.25)` : 'rgba(255,255,255,0.06)'}`,
                  boxShadow: isActive ? `0 0 24px rgba(0,240,255,0.094)` : 'none',
                  opacity: isActive || isPast ? 1 : 0.4,
                }}
              >
                <div className="flex items-center gap-2 md:block">
                  <Icon
                    className="mb-0 h-5 w-5 shrink-0 transition-colors duration-300 md:mb-2"
                    style={{ color: isActive || isPast ? stage.accent : 'rgba(255,255,255,0.2)' }}
                  />
                  <p
                    className="text-xs font-semibold uppercase tracking-wider transition-colors duration-300"
                    style={{ color: isActive ? stage.accent : isPast ? 'rgba(255,255,255,0.6)' : 'rgba(255,255,255,0.3)' }}
                  >
                    {stage.label}
                  </p>
                </div>
                {renderStageContent(idx)}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
