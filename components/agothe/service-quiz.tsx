'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { AnimatedSection, AnimatedItem } from './animated-section';
import { SectionHeading } from './section-heading';
import { ArrowRight, ArrowLeft, Sparkles } from 'lucide-react';
import Link from 'next/link';

interface Step {
  question: string;
  options: { label: string; value: string }[];
}

const steps: Step[] = [
  {
    question: 'What are you trying to understand?',
    options: [
      { label: 'A specific research question or literature gap', value: 'research' },
      { label: 'A complex crisis or geopolitical situation', value: 'crisis' },
      { label: 'Propaganda or disinformation threats', value: 'propaganda' },
      { label: 'A systemic constraint or organizational bottleneck', value: 'constraint' },
      { label: 'Future scenario modeling or risk prediction', value: 'simulation' },
      { label: 'How to automate my AI workflows', value: 'automation' },
    ],
  },
  {
    question: 'What is your timeline?',
    options: [
      { label: 'Under 4 hours (urgent)', value: 'urgent' },
      { label: '1-3 days', value: 'standard' },
      { label: '1-2 weeks (deep analysis)', value: 'deep' },
      { label: 'Ongoing / subscription', value: 'ongoing' },
    ],
  },
  {
    question: 'What is your budget range?',
    options: [
      { label: 'Under $500', value: 'low' },
      { label: '$500 - $2,500', value: 'mid' },
      { label: '$2,500 - $10,000', value: 'high' },
      { label: '$10,000+', value: 'enterprise' },
    ],
  },
];

interface Recommendation {
  service: string;
  href: string;
  reason: string;
  color: string;
}

function getRecommendation(answers: string[]): Recommendation {
  const [need, , budget] = answers;

  if (need === 'propaganda') {
    return {
      service: 'Propaganda Detection (PEE-\u03A9)',
      href: '/propaganda',
      reason: 'Our Propaganda Exposure Engine identifies coordinated disinformation patterns with mathematical precision.',
      color: '#ff3366',
    };
  }

  if (need === 'automation') {
    return {
      service: 'AI Automation',
      href: '/automation',
      reason: 'Custom AI workflows and agent systems tailored to your operational needs.',
      color: '#00f0ff',
    };
  }

  if (need === 'simulation') {
    return {
      service: 'Valentine Simulation',
      href: '/simulation',
      reason: 'Mathematical scenario modeling using constraint-resonance dynamics for predictive analysis.',
      color: '#8b5cf6',
    };
  }

  if (need === 'constraint') {
    return {
      service: 'Solvey Constraint Analysis',
      href: '/solvey',
      reason: 'Deep constraint field mapping to identify bottlenecks, leverage points, and emergence opportunities.',
      color: '#ff3366',
    };
  }

  if (need === 'crisis' || budget === 'high' || budget === 'enterprise') {
    return {
      service: 'CAPS Intelligence Report',
      href: '/intelligence',
      reason: 'Full multi-AI intelligence synthesis with MCS validation — our most comprehensive analysis product.',
      color: '#ffd700',
    };
  }

  return {
    service: 'Research Synthesis',
    href: '/research',
    reason: '200M+ paper database with AI-powered synthesis. Fast, rigorous, and cost-effective.',
    color: '#00f0ff',
  };
}

export function ServiceQuiz() {
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState<string[]>([]);
  const [showResult, setShowResult] = useState(false);

  function selectOption(value: string) {
    const newAnswers = [...answers];
    newAnswers[currentStep] = value;
    setAnswers(newAnswers);

    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      setShowResult(true);
    }
  }

  function goBack() {
    if (showResult) {
      setShowResult(false);
    } else if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  }

  function reset() {
    setCurrentStep(0);
    setAnswers([]);
    setShowResult(false);
  }

  const recommendation = showResult ? getRecommendation(answers) : null;

  return (
    <section className="px-6 py-24 md:py-32">
      <AnimatedSection className="mx-auto max-w-2xl">
        <SectionHeading
          title="Not sure where to start?"
          subtitle="Answer three questions. We'll recommend the right service."
        />

        <AnimatedItem>
          <div className="obsidian-glass-static overflow-hidden rounded-lg">
            <div className="flex items-center justify-between border-b border-white/5 px-6 py-3">
              <div className="flex gap-1.5">
                {steps.map((_, i) => (
                  <div
                    key={i}
                    className="h-1.5 w-8 rounded-full transition-colors duration-300"
                    style={{
                      backgroundColor:
                        i < currentStep || showResult
                          ? '#00f0ff'
                          : i === currentStep && !showResult
                          ? 'rgba(0,240,255,0.4)'
                          : 'rgba(255,255,255,0.08)',
                    }}
                  />
                ))}
              </div>
              <span className="font-mono text-[10px] text-agothe-muted">
                {showResult ? 'Result' : `${currentStep + 1} / ${steps.length}`}
              </span>
            </div>

            <div className="px-6 py-8">
              <AnimatePresence mode="wait">
                {!showResult ? (
                  <motion.div
                    key={currentStep}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.2 }}
                  >
                    <h3 className="mb-6 font-heading text-lg font-bold text-agothe-white">
                      {steps[currentStep].question}
                    </h3>
                    <div className="space-y-2">
                      {steps[currentStep].options.map((opt) => (
                        <button
                          key={opt.value}
                          onClick={() => selectOption(opt.value)}
                          className="group flex w-full items-center justify-between rounded-lg border border-white/5 px-4 py-3 text-left text-sm text-agothe-muted transition-all hover:border-agothe-teal/30 hover:bg-[rgba(0,240,255,0.03)] hover:text-agothe-white"
                        >
                          {opt.label}
                          <ArrowRight className="h-4 w-4 opacity-0 transition-opacity group-hover:opacity-100" />
                        </button>
                      ))}
                    </div>
                  </motion.div>
                ) : recommendation ? (
                  <motion.div
                    key="result"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.3 }}
                    className="text-center"
                  >
                    <div
                      className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full"
                      style={{ backgroundColor: `${recommendation.color}15` }}
                    >
                      <Sparkles className="h-5 w-5" style={{ color: recommendation.color }} />
                    </div>
                    <p className="text-xs font-medium uppercase tracking-[0.2em] text-agothe-muted">
                      Recommended Service
                    </p>
                    <h3
                      className="mt-2 font-heading text-2xl font-bold"
                      style={{ color: recommendation.color }}
                    >
                      {recommendation.service}
                    </h3>
                    <p className="mx-auto mt-3 max-w-md text-sm leading-relaxed text-agothe-muted">
                      {recommendation.reason}
                    </p>
                    <div className="mt-6 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
                      <Link
                        href={recommendation.href}
                        className="inline-flex items-center gap-2 rounded-full px-6 py-3 text-sm font-semibold text-agothe-bg transition-shadow hover:shadow-[0_0_20px_rgba(0,240,255,0.2)]"
                        style={{ backgroundColor: recommendation.color }}
                      >
                        Learn More <ArrowRight className="h-4 w-4" />
                      </Link>
                      <button
                        onClick={reset}
                        className="text-sm text-agothe-muted transition-colors hover:text-agothe-white"
                      >
                        Start Over
                      </button>
                    </div>
                  </motion.div>
                ) : null}
              </AnimatePresence>
            </div>

            {!showResult && currentStep > 0 && (
              <div className="border-t border-white/5 px-6 py-3">
                <button
                  onClick={goBack}
                  className="flex items-center gap-1 text-xs text-agothe-muted transition-colors hover:text-agothe-white"
                >
                  <ArrowLeft className="h-3 w-3" /> Back
                </button>
              </div>
            )}
          </div>
        </AnimatedItem>
      </AnimatedSection>
    </section>
  );
}
