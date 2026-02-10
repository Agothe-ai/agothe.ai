import type { Metadata } from 'next';
import { CaseStudyPage } from '@/components/agothe/case-study-template';

export const metadata: Metadata = {
  title: 'COP30 Climate Negotiation Intelligence',
  description: 'Predictive analysis of COP30 negotiation collapse points and emergence opportunities.',
};

export default function COP30Climate() {
  return (
    <CaseStudyPage
      title="COP30 Climate Negotiation Intelligence"
      subtitle="Policy & Regulatory Analysis"
      accentColor="#00f0ff"
      mcsScore="0.91"
      deliveryTime="4.1 hours"
      classification="CAPS-PROBE-002"
      context={[
        'COP30 negotiations in Belem represented the most complex multilateral climate process in history, with 197 nation-state positions, overlapping economic interests, and unprecedented civil society pressure.',
        'The client needed to understand not just likely outcomes, but the structural dynamics that would determine whether specific negotiation tracks would collapse or produce breakthrough agreements.',
      ]}
      challenge="Map the constraint field landscape across 197 national positions to identify collapse points, emergence opportunities, and the specific conditions under which breakthrough agreements become structurally possible."
      capsAnalysis={{
        constraintFields: [
          'Economic development vs. emissions reduction tension',
          'Small island states existential constraint',
          'Fossil fuel dependency lock-in (12 major economies)',
          'Technology transfer barriers',
          'Climate finance commitment gaps',
        ],
        resonancePatterns: [
          'Coalition formation dynamics (G77 fragmentation)',
          'Loss & damage framework resonance',
          'Carbon market convergence signal',
          'Youth movement pressure amplification',
        ],
        deltaH: '2.8',
      }}
      keyFindings={[
        {
          title: 'Three Collapse Points Identified',
          detail: 'Constraint field mapping revealed three specific negotiation tracks where structural conditions made collapse more likely than compromise: methane reduction targets, fossil fuel phase-out language, and climate finance mechanisms.',
        },
        {
          title: 'Emergence Window for Carbon Markets',
          detail: 'A previously unrecognized alignment between developing nation interests and private sector carbon credit frameworks created a narrow emergence window for breakthrough carbon market architecture.',
        },
        {
          title: 'G77 Fragmentation Pattern',
          detail: 'The traditional G77 coalition showed constraint field divergence that would force a split into at least three sub-coalitions, fundamentally changing negotiation dynamics.',
        },
        {
          title: 'Loss & Damage Breakthrough Conditions',
          detail: 'Specific conditions under which loss and damage financing could move from aspirational to structural were identified through resonance pattern analysis of donor nation domestic politics.',
        },
      ]}
      outcome="The policy institute used the analysis to pre-position three negotiation strategies corresponding to the three identified collapse scenarios. Two of the three collapse points materialized as predicted. The carbon market emergence window was successfully leveraged for a framework proposal."
      methodology={[
        'CRD Framework',
        'Multi-AI Synthesis (6 systems)',
        '197-Nation Constraint Mapping',
        'Coalition Dynamics Modeling',
        'Temporal Window Analysis',
        'MCS Validation',
      ]}
      relatedStudies={[
        { label: 'US-Iran Crisis Analysis', href: '/case-studies/us-iran-crisis' },
        { label: 'Attention Inequality', href: '/case-studies/attention-inequality' },
      ]}
    />
  );
}
