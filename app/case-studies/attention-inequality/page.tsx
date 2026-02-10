import type { Metadata } from 'next';
import { CaseStudyPage } from '@/components/agothe/case-study-template';

export const metadata: Metadata = {
  title: 'Attention Inequality & Market Disruption',
  description: 'First-of-kind analysis mapping attention economy dynamics to financial market stress indicators.',
};

export default function AttentionInequality() {
  return (
    <CaseStudyPage
      title="Attention Inequality & Market Disruption"
      subtitle="Economic Systems Analysis"
      accentColor="#ffd700"
      mcsScore="0.93"
      deliveryTime="2.8 hours"
      classification="CAPS-PROBE-003"
      context={[
        'Attention inequality — the structural asymmetry in how cognitive resources are distributed across populations — has emerged as a critical but unmeasured variable in financial market dynamics.',
        'The client, a global financial services firm, needed to understand whether attention economy dynamics were creating hidden stress indicators that traditional market analysis frameworks could not capture.',
      ]}
      challenge="Determine whether measurable attention inequality patterns correlate with financial market stress indicators, and if so, identify the specific mechanisms through which attention asymmetry translates into market disruption."
      capsAnalysis={{
        constraintFields: [
          'Attention distribution asymmetry (Gini coefficient: 0.73)',
          'Information processing capacity constraints',
          'Algorithmic amplification feedback loops',
          'Retail investor attention fragmentation',
          'Institutional attention monopolization',
        ],
        resonancePatterns: [
          'Meme stock phenomena as attention cascade',
          'Flash crash correlation with attention spikes',
          'Regulatory attention lag pattern',
          'Cross-platform attention contagion',
        ],
        deltaH: '2.1',
      }}
      keyFindings={[
        {
          title: 'Attention Gini Coefficient',
          detail: 'Developed a novel metric showing attention inequality at 0.73 Gini — higher than income inequality in most developed nations. This concentration creates structural instability in information-dependent markets.',
        },
        {
          title: 'Predictive Regulatory Trigger',
          detail: 'Attention inequality patterns predicted regulatory intervention windows with 78% accuracy. When attention concentration exceeds specific thresholds, regulatory action follows within 3-6 months.',
        },
        {
          title: 'Market Stress Correlation',
          detail: 'Attention cascade events showed a 0.84 correlation with subsequent market volatility spikes, providing a leading indicator 48-72 hours ahead of traditional VIX movements.',
        },
        {
          title: 'Algorithmic Amplification Loop',
          detail: 'Platform recommendation algorithms create a self-reinforcing attention concentration cycle that mirrors and amplifies underlying market sentiment asymmetries.',
        },
      ]}
      outcome="The client restructured their risk model to incorporate attention inequality metrics as a leading indicator. Within six months, the attention-based early warning system correctly flagged two market disruption events that traditional models missed, resulting in significant portfolio protection."
      methodology={[
        'CRD Framework',
        'Multi-AI Synthesis (6 systems)',
        'Attention Economy Modeling',
        'Gini Coefficient Analysis',
        'Cross-Platform Data Synthesis',
        'Temporal Correlation Mapping',
        'MCS Validation',
      ]}
      relatedStudies={[
        { label: 'US-Iran Crisis Analysis', href: '/case-studies/us-iran-crisis' },
        { label: 'COP30 Climate Intelligence', href: '/case-studies/cop30-climate' },
      ]}
    />
  );
}
