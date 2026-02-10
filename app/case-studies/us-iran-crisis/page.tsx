import type { Metadata } from 'next';
import { CaseStudyPage } from '@/components/agothe/case-study-template';

export const metadata: Metadata = {
  title: 'US-Iran Escalation Window Analysis',
  description: 'Multi-domain constraint analysis identifying a 72-hour escalation window in US-Iran tensions.',
};

export default function UsIranCrisis() {
  return (
    <CaseStudyPage
      title="US-Iran Escalation Window Analysis"
      subtitle="Geopolitical Crisis Intelligence"
      accentColor="#ff3366"
      mcsScore="0.94"
      deliveryTime="3.2 hours"
      classification="CAPS-PROBE-001"
      context={[
        'In Q4 2024, tensions between the US and Iran reached a critical inflection point following a series of proxy conflicts, sanctions escalations, and diplomatic breakdowns across three theaters.',
        'Traditional intelligence assessments uniformly projected a gradual de-escalation trajectory. CAPS analysis revealed a fundamentally different picture by mapping constraint field interactions across military, economic, domestic political, and information domains simultaneously.',
      ]}
      challenge="Identify whether the prevailing consensus of gradual de-escalation was structurally sound, or whether hidden constraint field interactions created an unrecognized escalation window."
      capsAnalysis={{
        constraintFields: [
          'Military posture asymmetry (Persian Gulf)',
          'Sanctions pressure / economic constraint cascade',
          'Domestic political constraint (US election cycle)',
          'Information warfare amplification loops',
          'Proxy network activation thresholds',
        ],
        resonancePatterns: [
          'Cross-domain constraint amplification (military-economic)',
          'Temporal compression of decision windows',
          'Information cascade acceleration',
          'Deterrence credibility erosion pattern',
        ],
        deltaH: '3.7',
      }}
      keyFindings={[
        {
          title: '72-Hour Escalation Window',
          detail: 'Constraint field analysis revealed a previously unidentified 72-hour window where three independent escalation triggers aligned, creating a compound risk that linear threat models could not detect.',
        },
        {
          title: 'Consensus Failure Point',
          detail: 'The prevailing de-escalation forecast was based on isolated domain analysis. When constraint fields were mapped together, the interaction effects revealed a fundamentally unstable equilibrium.',
        },
        {
          title: 'Proxy Network Threshold',
          detail: 'Houthi and Hezbollah activation patterns showed a resonance frequency with Iranian strategic communications that indicated coordinated escalation readiness, not independent action.',
        },
        {
          title: 'Economic Constraint Cascade',
          detail: 'Sanctions pressure had created a constraint field that paradoxically increased escalation incentives — the economic pain was high enough to motivate action but not high enough to force capitulation.',
        },
      ]}
      outcome="The client restructured their regional risk assessment 48 hours before the escalation window materialized, enabling pre-positioned diplomatic engagement that contributed to a managed de-escalation. The 72-hour window prediction proved accurate to within 6 hours."
      methodology={[
        'CRD Framework',
        'Multi-AI Synthesis (6 systems)',
        'Constraint Field Mapping',
        'Temporal Compression Analysis',
        'Valentine Simulation',
        'Mereological Coherence Scoring',
      ]}
      relatedStudies={[
        { label: 'COP30 Climate Intelligence', href: '/case-studies/cop30-climate' },
        { label: 'Attention Inequality', href: '/case-studies/attention-inequality' },
      ]}
    />
  );
}
