'use client';

import { useState } from 'react';
import { AnimatedSection, AnimatedItem } from '@/components/agothe/animated-section';
import { ObsidianCard } from '@/components/agothe/obsidian-card';
import { Book, Code2, Calculator, Activity, ChevronRight } from 'lucide-react';
import { PageHero } from '@/components/agothe/page-hero';

interface DocSection {
  id: string;
  icon: React.ReactNode;
  title: string;
  subsections: { id: string; title: string; content: string[] }[];
}

const docSections: DocSection[] = [
  {
    id: 'getting-started',
    icon: <Book className="h-4 w-4" />,
    title: 'Getting Started',
    subsections: [
      {
        id: 'overview',
        title: 'Overview',
        content: [
          'Agothe is a multi-AI intelligence synthesis platform built on the Constraint-Resonance Duality (CRD) framework. It coordinates six AI systems to produce mathematically validated analyses across any domain.',
          'Every analysis output is validated through Mereological Coherence Scoring (MCS), ensuring structural soundness scores above 0.90 before delivery.',
          'This documentation covers the mathematical foundations, API interfaces, and integration patterns for working with Agothe systems.',
        ],
      },
      {
        id: 'architecture',
        title: 'System Architecture',
        content: [
          'The Agothe platform operates on a 52-engine computational architecture organized across four tiers:',
          'Foundation Tier (Engines 1-13): Data ingestion, preprocessing, and initial pattern detection across the S2ORC corpus of 200M+ academic papers.',
          'Processing Tier (Engines 14-26): Constraint field mapping, resonance pattern analysis, and cross-domain synthesis using CRD mathematical structures.',
          'Integration Tier (Engines 27-39): Multi-AI coordination via the CAPS (Coordinated AI Processing System) network, integrating outputs from GPT-4, Claude, Gemini, Perplexity, Grok, and DeepSeek.',
          'Oracle Tier (Engines 40-52): Mereological coherence validation, temporal dynamics analysis, and final synthesis output generation.',
        ],
      },
      {
        id: 'quickstart',
        title: 'Quick Start Guide',
        content: [
          'Step 1: Commission a report through the contact form or API endpoint. Specify your domain, research question, and desired analysis depth.',
          'Step 2: The CAPS network assigns the analysis to the appropriate engine configuration based on domain complexity and constraint field density.',
          'Step 3: Multi-AI synthesis begins. Each AI system processes the question through its specialized lens, and outputs are coordinated through the Integration Tier.',
          'Step 4: Mereological Coherence Scoring validates the structural soundness of the synthesis. Analyses below MCS 0.90 are automatically flagged for re-processing.',
          'Step 5: Delivery of the final report with full constraint field maps, resonance patterns, and actionable intelligence.',
        ],
      },
    ],
  },
  {
    id: 'api-reference',
    icon: <Code2 className="h-4 w-4" />,
    title: 'API Reference',
    subsections: [
      {
        id: 'authentication',
        title: 'Authentication',
        content: [
          'All API requests require a Bearer token obtained through the client dashboard. Framework licensees receive API credentials upon subscription activation.',
          'Authorization: Bearer <your-api-key>',
          'Rate limits: 100 requests/hour for standard tier, 1,000 requests/hour for enterprise.',
          'All endpoints return JSON responses with standard error codes (400, 401, 403, 404, 429, 500).',
        ],
      },
      {
        id: 'endpoints',
        title: 'Core Endpoints',
        content: [
          'POST /v1/analysis/commission - Submit a new analysis request. Required fields: domain (string), question (string), depth (standard | deep | comprehensive).',
          'GET /v1/analysis/:id - Retrieve analysis status and results. Returns constraint field maps, MCS scores, and synthesis output.',
          'POST /v1/constraint-map - Generate a standalone constraint field map for a given system description. Returns JSON constraint graph with delta_H calculations.',
          'GET /v1/mcs/validate - Validate a pre-existing analysis against MCS criteria. Returns coherence score and structural breakdown.',
          'POST /v1/valentine/simulate - Run a Valentine simulation scenario. Accepts initial conditions and constraint parameters, returns trajectory predictions.',
        ],
      },
      {
        id: 'webhooks',
        title: 'Webhooks',
        content: [
          'Register webhook endpoints to receive real-time notifications when analyses complete, MCS scores change, or constraint fields shift significantly.',
          'POST /v1/webhooks - Register a new webhook. Required: url (string), events (array of event types).',
          'Supported events: analysis.completed, analysis.failed, mcs.threshold, constraint.shift, valentine.complete.',
          'Webhook payloads include the full analysis metadata, relevant scores, and a signature header for verification.',
        ],
      },
    ],
  },
  {
    id: 'mcs-calculation',
    icon: <Calculator className="h-4 w-4" />,
    title: 'MCS Calculation Guide',
    subsections: [
      {
        id: 'mcs-overview',
        title: 'What is MCS?',
        content: [
          'Mereological Coherence Scoring (MCS) measures the structural soundness of a multi-AI synthesis output. It evaluates whether the parts of an analysis form a coherent whole -- a mereological question.',
          'MCS ranges from 0.00 to 1.00. Scores above 0.90 indicate high structural coherence. Agothe requires MCS >0.90 for all deliverables.',
          'The scoring system evaluates three dimensions: Internal Consistency (do the parts agree?), Structural Completeness (are all necessary constraint fields mapped?), and Cross-Domain Coherence (do cross-domain connections maintain logical integrity?).',
        ],
      },
      {
        id: 'mcs-formula',
        title: 'Calculation Method',
        content: [
          'MCS = w1 * IC + w2 * SC + w3 * CDC',
          'Where: IC = Internal Consistency score (0-1), SC = Structural Completeness score (0-1), CDC = Cross-Domain Coherence score (0-1).',
          'Default weights: w1 = 0.35, w2 = 0.30, w3 = 0.35. Weights can be adjusted based on analysis type.',
          'IC is calculated through pairwise contradiction detection across all AI system outputs. SC uses the constraint field completeness theorem to verify all necessary dimensions are mapped. CDC applies graph-theoretic measures to cross-domain connection validity.',
        ],
      },
      {
        id: 'mcs-interpretation',
        title: 'Score Interpretation',
        content: [
          '0.95-1.00: Exceptional coherence. Rare in complex, multi-domain analyses. Indicates near-perfect structural alignment.',
          '0.90-0.94: High coherence. Standard Agothe delivery threshold. Indicates robust structural soundness with minor edge-case variations.',
          '0.80-0.89: Moderate coherence. May contain structural gaps or unresolved cross-domain tensions. Flagged for review.',
          '0.70-0.79: Low coherence. Significant structural issues. Requires re-processing with adjusted parameters.',
          'Below 0.70: Incoherent. Analysis fundamentally flawed. Full re-synthesis required.',
        ],
      },
    ],
  },
  {
    id: 'delta-h',
    icon: <Activity className="h-4 w-4" />,
    title: '\u03B4_H Measurement Protocol',
    subsections: [
      {
        id: 'delta-h-definition',
        title: 'Definition',
        content: [
          '\u03B4_H (delta-H) measures the system stress index -- the distance between a system\'s current constraint field configuration and its nearest collapse threshold.',
          'Lower \u03B4_H values indicate proximity to structural collapse. Higher values indicate stability, though extremely high values can indicate rigidity (a different form of systemic risk).',
          'The measurement is domain-agnostic: it applies equally to geopolitical systems, organizational structures, economic markets, or individual cognitive architectures.',
        ],
      },
      {
        id: 'delta-h-measurement',
        title: 'Measurement Process',
        content: [
          'Step 1: Map all active constraint fields in the target system. Each field is represented as a vector in the constraint space C.',
          'Step 2: Calculate the constraint density tensor D(C) representing the interaction intensity between constraint fields.',
          'Step 3: Identify collapse attractors -- states where constraint field interactions create self-reinforcing negative feedback loops.',
          'Step 4: Compute \u03B4_H as the minimum geodesic distance in constraint space between the current system state and the nearest collapse attractor.',
          'Step 5: Normalize to a standard scale where \u03B4_H < 1.0 indicates critical proximity, 1.0-2.0 indicates caution zone, and >2.0 indicates relative stability.',
        ],
      },
      {
        id: 'delta-h-applications',
        title: 'Practical Applications',
        content: [
          'Crisis Intelligence: Real-time \u03B4_H monitoring enables early warning of system collapse. The US-Iran analysis identified a 72-hour escalation window through \u03B4_H trajectory analysis.',
          'Organizational Health: Map organizational constraint fields (resource, talent, strategic, cultural) and monitor \u03B4_H to detect emerging structural risks before they manifest.',
          'Market Analysis: Apply \u03B4_H to financial market constraint fields to identify systemic stress patterns invisible to traditional volatility measures.',
          'Personal Systems: Individual cognitive constraint mapping uses \u03B4_H to identify burnout trajectories, attention fragmentation, and optimal recovery pathways.',
        ],
      },
    ],
  },
];

export function DocsPageContent() {
  const [activeSection, setActiveSection] = useState(docSections[0].id);
  const [activeSubsection, setActiveSubsection] = useState(docSections[0].subsections[0].id);

  const currentSection = docSections.find((s) => s.id === activeSection) || docSections[0];
  const currentSub = currentSection.subsections.find((s) => s.id === activeSubsection) || currentSection.subsections[0];

  function navigateTo(sectionId: string, subId: string) {
    setActiveSection(sectionId);
    setActiveSubsection(subId);
  }

  return (
    <main className="pt-20">
      <section className="relative overflow-hidden px-6 py-16 md:py-24">
        <PageHero imageSrc="/images/heroes/about-origin-seed.webp" imageAlt="Archive coral documentation" />
        <AnimatedSection className="relative z-10 mx-auto max-w-3xl text-center">
          <AnimatedItem>
            <h1 className="font-heading text-4xl font-bold text-agothe-white md:text-5xl">
              Documentation
            </h1>
          </AnimatedItem>
          <AnimatedItem>
            <p className="mx-auto mt-4 max-w-xl text-sm leading-relaxed text-agothe-muted">
              Technical reference for the CRD framework, CAPS network API, and mathematical foundations.
            </p>
          </AnimatedItem>
        </AnimatedSection>
      </section>

      <section className="px-4 pb-24 md:px-6">
        <div className="mx-auto flex max-w-6xl gap-8">
          <aside className="hidden w-64 shrink-0 md:block">
            <nav className="sticky top-24 space-y-1">
              {docSections.map((section) => (
                <div key={section.id}>
                  <button
                    onClick={() => navigateTo(section.id, section.subsections[0].id)}
                    className={`flex w-full items-center gap-2 rounded-md px-3 py-2 text-left text-sm transition-colors ${
                      activeSection === section.id
                        ? 'bg-[rgba(0,240,255,0.05)] text-agothe-teal'
                        : 'text-agothe-muted hover:text-agothe-white'
                    }`}
                  >
                    {section.icon}
                    {section.title}
                  </button>
                  {activeSection === section.id && (
                    <div className="ml-6 mt-1 space-y-0.5 border-l border-white/5 pl-3">
                      {section.subsections.map((sub) => (
                        <button
                          key={sub.id}
                          onClick={() => navigateTo(section.id, sub.id)}
                          className={`flex w-full items-center gap-1 rounded-md px-2 py-1.5 text-left text-xs transition-colors ${
                            activeSubsection === sub.id
                              ? 'text-agothe-teal'
                              : 'text-agothe-muted/70 hover:text-agothe-muted'
                          }`}
                        >
                          <ChevronRight className={`h-3 w-3 transition-transform ${activeSubsection === sub.id ? 'rotate-90' : ''}`} />
                          {sub.title}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </nav>
          </aside>

          <div className="min-w-0 flex-1">
            <div className="mb-6 flex gap-2 overflow-x-auto md:hidden">
              {docSections.map((section) => (
                <button
                  key={section.id}
                  onClick={() => navigateTo(section.id, section.subsections[0].id)}
                  className={`flex shrink-0 items-center gap-1.5 rounded-full px-3 py-1.5 text-xs transition-colors ${
                    activeSection === section.id
                      ? 'bg-agothe-teal/10 text-agothe-teal'
                      : 'bg-white/5 text-agothe-muted'
                  }`}
                >
                  {section.icon}
                  {section.title}
                </button>
              ))}
            </div>

            <div className="mb-4 flex gap-2 overflow-x-auto md:hidden">
              {currentSection.subsections.map((sub) => (
                <button
                  key={sub.id}
                  onClick={() => setActiveSubsection(sub.id)}
                  className={`shrink-0 rounded-md px-2.5 py-1 text-xs transition-colors ${
                    activeSubsection === sub.id
                      ? 'bg-white/5 text-agothe-white'
                      : 'text-agothe-muted/60'
                  }`}
                >
                  {sub.title}
                </button>
              ))}
            </div>

            <ObsidianCard hover={false} className="min-h-[400px]">
              <div className="mb-2 flex items-center gap-2 text-xs text-agothe-muted/50">
                <span>{currentSection.title}</span>
                <ChevronRight className="h-3 w-3" />
                <span className="text-agothe-muted">{currentSub.title}</span>
              </div>

              <h2 className="font-heading text-2xl font-bold text-agothe-white">
                {currentSub.title}
              </h2>

              <div className="mt-6 space-y-4">
                {currentSub.content.map((paragraph, i) => {
                  const isCode =
                    paragraph.startsWith('POST ') ||
                    paragraph.startsWith('GET ') ||
                    paragraph.startsWith('Authorization:') ||
                    paragraph.startsWith('MCS =') ||
                    paragraph.startsWith('Where:') ||
                    paragraph.startsWith('Default weights:');

                  if (isCode) {
                    return (
                      <pre
                        key={i}
                        className="overflow-x-auto rounded-md bg-[rgba(0,0,0,0.4)] p-3 font-mono text-xs leading-relaxed text-agothe-teal"
                      >
                        {paragraph}
                      </pre>
                    );
                  }

                  const isStep = /^Step \d+:/.test(paragraph);
                  if (isStep) {
                    return (
                      <div key={i} className="flex gap-3 text-sm leading-relaxed text-agothe-muted">
                        <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-agothe-teal/10 text-[10px] font-bold text-agothe-teal">
                          {paragraph.match(/\d+/)?.[0]}
                        </span>
                        <span>{paragraph.replace(/^Step \d+:\s*/, '')}</span>
                      </div>
                    );
                  }

                  const isTier = /^(Foundation|Processing|Integration|Oracle) Tier/.test(paragraph);
                  if (isTier) {
                    return (
                      <div key={i} className="flex items-start gap-2 text-sm leading-relaxed text-agothe-muted">
                        <span className="mt-1.5 block h-1.5 w-1.5 shrink-0 rounded-full bg-agothe-teal" />
                        <span>
                          <strong className="text-agothe-white">{paragraph.split(':')[0]}:</strong>
                          {paragraph.split(':').slice(1).join(':')}
                        </span>
                      </div>
                    );
                  }

                  const isScore = /^[\d.]+[-–]/.test(paragraph) || paragraph.startsWith('Below');
                  if (isScore) {
                    return (
                      <div key={i} className="flex items-start gap-2 text-sm leading-relaxed text-agothe-muted">
                        <span className="mt-1.5 block h-1.5 w-1.5 shrink-0 rounded-full bg-agothe-gold" />
                        <span>{paragraph}</span>
                      </div>
                    );
                  }

                  return (
                    <p key={i} className="text-sm leading-relaxed text-agothe-muted">
                      {paragraph}
                    </p>
                  );
                })}
              </div>
            </ObsidianCard>
          </div>
        </div>
      </section>
    </main>
  );
}
