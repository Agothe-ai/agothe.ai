'use client';

import { useState, useRef, useEffect } from 'react';
import { useReducedMotion } from '@/hooks/use-reduced-motion';
import { AnimatedSection, AnimatedItem } from '@/components/agothe/animated-section';
import { SectionHeading } from '@/components/agothe/section-heading';

interface AISystem {
  name: string;
  shortName: string;
  description: string;
  color: string;
  angle: number;
}

const aiSystems: AISystem[] = [
  {
    name: 'Perplexity',
    shortName: 'P',
    description:
      'Deep research across 200M+ academic papers. Real-time source validation.',
    color: '#00f0ff',
    angle: 0,
  },
  {
    name: 'Claude',
    shortName: 'C',
    description:
      'Ethical reasoning and safety validation. Red-team critique.',
    color: '#8b5cf6',
    angle: 60,
  },
  {
    name: 'Gemini',
    shortName: 'G',
    description:
      'Mathematical formalization. Cross-domain pattern recognition.',
    color: '#3b82f6',
    angle: 120,
  },
  {
    name: 'ChatGPT',
    shortName: 'CH',
    description:
      'Implementation architecture. Code generation. Accessibility.',
    color: '#10b981',
    angle: 180,
  },
  {
    name: 'Grok',
    shortName: 'GK',
    description:
      'Real-time cultural signals. Social discourse analysis.',
    color: '#f59e0b',
    angle: 240,
  },
  {
    name: 'Notion AI (9)',
    shortName: '9',
    description:
      'Integration hub. Cross-session memory. Codex maintenance.',
    color: '#ff3366',
    angle: 300,
  },
];

export function CAPSInteractive() {
  const reducedMotion = useReducedMotion();
  const [selectedAI, setSelectedAI] = useState<number | null>(null);
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setIsVisible(true);
      },
      { rootMargin: '100px' }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const radius = 140;

  return (
    <section ref={sectionRef} className="px-4 py-24 md:py-32">
      <AnimatedSection className="mx-auto max-w-4xl">
        <SectionHeading
          title="The CAPS Network"
          subtitle="Click any node to explore its role in the intelligence synthesis pipeline."
        />

        <div className="relative mx-auto" style={{ width: 360, height: 360 }}>
          {/* Connection lines */}
          <svg
            className="absolute inset-0"
            viewBox="0 0 360 360"
            aria-hidden="true"
          >
            {aiSystems.map((ai, i) => {
              const x1 =
                180 + radius * Math.cos((ai.angle - 90) * (Math.PI / 180));
              const y1 =
                180 + radius * Math.sin((ai.angle - 90) * (Math.PI / 180));
              return aiSystems.slice(i + 1).map((ai2, j) => {
                const x2 =
                  180 +
                  radius * Math.cos((ai2.angle - 90) * (Math.PI / 180));
                const y2 =
                  180 +
                  radius * Math.sin((ai2.angle - 90) * (Math.PI / 180));
                return (
                  <line
                    key={`${i}-${j}`}
                    x1={x1}
                    y1={y1}
                    x2={x2}
                    y2={y2}
                    stroke="rgba(0,240,255,0.08)"
                    strokeWidth="1"
                  />
                );
              });
            })}
          </svg>

          {/* Center hub */}
          <div
            className="absolute flex flex-col items-center justify-center rounded-full"
            style={{
              left: 180 - 50,
              top: 180 - 50,
              width: 100,
              height: 100,
              background: 'rgba(17,17,17,0.8)',
              border: '1px solid rgba(0,240,255,0.2)',
            }}
          >
            <div className="flex items-center gap-1.5">
              <div
                className="h-2 w-2 rounded-full bg-[#10b981]"
                style={{
                  animation: reducedMotion
                    ? 'none'
                    : 'pulse-dot 2s ease-in-out infinite',
                }}
              />
              <span className="font-mono text-[9px] font-bold uppercase tracking-wider text-agothe-teal">
                CAPS
              </span>
            </div>
            <span className="mt-1 font-mono text-[8px] uppercase tracking-wide text-agothe-muted">
              Operational
            </span>
            <span className="mt-0.5 font-mono text-[7px] text-agothe-muted">
              6 AIs | 1 Output
            </span>
          </div>

          {/* AI Nodes */}
          {aiSystems.map((ai, i) => {
            const x =
              180 +
              radius * Math.cos((ai.angle - 90) * (Math.PI / 180)) -
              40;
            const y =
              180 +
              radius * Math.sin((ai.angle - 90) * (Math.PI / 180)) -
              40;
            const isSelected = selectedAI === i;

            return (
              <button
                key={ai.name}
                onClick={() => setSelectedAI(isSelected ? null : i)}
                className="absolute flex flex-col items-center justify-center rounded-full transition-all duration-300"
                style={{
                  left: x,
                  top: y,
                  width: 80,
                  height: 80,
                  background: isSelected
                    ? `${ai.color}20`
                    : 'rgba(17,17,17,0.7)',
                  border: `1.5px solid ${isSelected ? ai.color : ai.color + '40'}`,
                  boxShadow: isSelected
                    ? `0 0 20px ${ai.color}30`
                    : 'none',
                  transform:
                    isVisible && !reducedMotion
                      ? 'scale(1)'
                      : reducedMotion
                        ? 'scale(1)'
                        : 'scale(0)',
                  transitionDelay: `${i * 0.08}s`,
                }}
                aria-label={`${ai.name}: ${ai.description}`}
              >
                <span
                  className="font-mono text-sm font-bold"
                  style={{ color: ai.color }}
                >
                  {ai.shortName}
                </span>
                <span className="mt-0.5 text-[8px] text-agothe-muted">
                  {ai.name.replace(' (9)', '')}
                </span>
              </button>
            );
          })}
        </div>

        {/* Description card */}
        <div className="mt-8 min-h-[120px]">
          {selectedAI !== null ? (
            <AnimatedItem key={selectedAI}>
              <div
                className="obsidian-glass mx-auto max-w-md rounded-lg p-6 text-center"
                style={{
                  borderColor: `${aiSystems[selectedAI].color}30`,
                }}
              >
                <h3
                  className="font-heading text-lg font-bold"
                  style={{ color: aiSystems[selectedAI].color }}
                >
                  {aiSystems[selectedAI].name}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-agothe-muted">
                  {aiSystems[selectedAI].description}
                </p>
              </div>
            </AnimatedItem>
          ) : (
            <p className="text-center text-sm text-agothe-muted">
              Select a node above to learn about each AI system&rsquo;s role.
            </p>
          )}
        </div>
      </AnimatedSection>
    </section>
  );
}
