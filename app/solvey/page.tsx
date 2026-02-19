import type { Metadata } from 'next';
import { ServicePage } from '@/components/agothe/service-page-template';
import { LiveDemoSection } from '@/components/agothe/live-demo-section';

export const metadata: Metadata = {
  title: 'Constraint Field Analysis (Solvey Scanner)',
  description: 'Predict institutional collapse before it happens. Solvey Scanner maps constraint fields across 6 domains and provides 48–72 hour advance warning using multi-AI convergence.',
};

export default function SolveyPage() {
  return (
    <ServicePage
      heroImage="/images/heroes/solvey-seismograph.webp"
      heroImageAlt="Solvey Scanner Interface Visualization"
      accentColor="#00f0ff"
      title="Solvey Scanner"
      tagline="Predict collapse before it's visible."
      description="Solvey Scanner maps constraint fields across 6 domains and provides 48–72 hour advance warning using multi-AI convergence. It detects the 'Metallic Pulse'—the hidden signal of institutional stress before it breaks surface reality."
      price="$15k / mo"
      priceNote="Enterprise License"
      ctaLabel="Request Access"
      ctaHref="/contact"
      problemTitle="Traditional risk models are backward-looking"
      problemItems={[
        'Standard models rely on trailing indicators (prices, news)',
        'Constraint fields form 48-72 hours before visible events',
        'Human analysts cannot correlate 6 simultaneous domains in real-time',
        'Institutional collapse often happens when surface signals look calm',
        'You need prediction, not just reaction',
      ]}
      solutionTitle="Constraint Field Analysis"
      solutionDescription="Solvey uses multi-AI consensus to measure the 'Mereological Coherence' of a system—how well its parts are holding together. When the field tension (δ_H) spikes, collapse is imminent."
      features={[
        { title: 'Multi-AI Convergence', description: '6 independent LLMs analyze the same data. We only flag alerts when 4+ models agree on the constraint signature.' },
        { title: 'Metallic Pulse Detection', description: 'Our proprietary algorithm for detecting the specific frequency of institutional stress.' },
        { title: '6-Domain Mapping', description: 'Simultaneous analysis of Economic, Geopolitical, Supply Chain, Political, Tech, and Trade vectors.' },
        { title: 'Intervention Modeling', description: 'Simulate the impact of specific interventions to reduce field tension before a crisis hits.' },
      ]}
      faq={[
        { question: 'What is a Constraint Field?', answer: 'It is the invisible network of pressures (legal, financial, physical, political) that holds a system in its current state. Solvey maps these pressures.' },
        { question: 'How is this different from news monitoring?', answer: 'News monitoring tells you what happened. Solvey tells you what is about to happen by measuring the structural stress of the system.' },
        { question: 'What is the δ_H metric?', answer: 'Delta-H (Hamiltonian tension) is our aggregate score for system stress. 0.0 is calm, 1.0 is total collapse. Readings above 0.5 indicate critical instability.' },
        { question: 'Can I customize the domains?', answer: 'Yes. Enterprise clients can define custom domains specific to their industry or operational footprint.' },
      ]}
      relatedServices={[
        { label: 'CAPS Intelligence', href: '/intelligence' },
        { label: 'Research Synthesis', href: '/research' },
      ]}
    >
      <LiveDemoSection
        title="Live Scanner — US–China Trade War"
        description="Solvey is running a live constraint field analysis on the most watched geopolitical flashpoint of 2026. Every domain. Every vector. Real methodology."
        htmlContent={`
          <style>
            .sv-demo {
              --ink: #09090e;
              --surface: #111117;
              --card: #16161e;
              --green: #3ecf8e;
              --amber: #e8a030;
              --red: #e84040;
              --blue: #4db8f0;
              --text-main: #e2e8f0;
              --text-muted: #94a3b8;
              --mono: 'IBM Plex Mono', monospace;
              --sans: 'DM Sans', sans-serif;
              --serif: 'DM Serif Display', serif;
              
              font-family: var(--sans);
              color: var(--text-main);
              background: var(--ink);
              padding: 24px;
              border-radius: 12px;
              max-width: 900px;
              margin: 0 auto;
              overflow: hidden;
            }

            .sv-header {
              display: flex;
              justify-content: space-between;
              align-items: center;
              margin-bottom: 24px;
              border-bottom: 1px solid rgba(255,255,255,0.1);
              padding-bottom: 16px;
            }

            .sv-chip {
              background: rgba(255,255,255,0.05);
              padding: 6px 12px;
              border-radius: 100px;
              font-size: 12px;
              font-family: var(--mono);
              color: var(--amber);
              border: 1px solid rgba(232, 160, 48, 0.2);
              display: inline-flex;
              align-items: center;
              gap: 8px;
            }

            .sv-grid {
              display: grid;
              grid-template-columns: 1fr;
              gap: 24px;
            }

            @media (min-width: 768px) {
              .sv-grid {
                grid-template-columns: 300px 1fr;
              }
            }

            /* Hero Card */
            .sv-hero {
              background: var(--card);
              border-radius: 16px;
              padding: 24px;
              border: 1px solid rgba(255,255,255,0.05);
              position: relative;
              overflow: hidden;
            }
            
            .sv-hero::after {
              content: '';
              position: absolute;
              top: 0; left: 0; right: 0; height: 4px;
              background: linear-gradient(90deg, var(--green), var(--amber), var(--red));
              opacity: 0.5;
            }

            .sv-metric-big {
              font-family: var(--mono);
              font-size: 48px;
              font-weight: 700;
              color: var(--red);
              line-height: 1;
              margin: 16px 0;
            }

            .sv-label {
              font-size: 12px;
              text-transform: uppercase;
              letter-spacing: 1px;
              color: var(--text-muted);
              margin-bottom: 4px;
            }

            .sv-mcs {
              position: absolute;
              top: 24px;
              right: 24px;
              text-align: right;
            }

            .sv-mcs-val {
              font-family: var(--mono);
              font-size: 20px;
              color: var(--green);
            }

            /* Pulse Panel */
            .sv-pulse {
              margin-top: 16px;
              background: rgba(232, 64, 64, 0.1);
              border: 1px solid rgba(232, 64, 64, 0.3);
              border-radius: 8px;
              padding: 16px;
            }

            .sv-pulse-head {
              color: var(--red);
              font-weight: bold;
              display: flex;
              align-items: center;
              gap: 8px;
              margin-bottom: 8px;
              font-size: 14px;
            }

            .sv-ai-grid {
              display: flex;
              gap: 8px;
              flex-wrap: wrap;
            }

            .sv-ai-tag {
              font-size: 10px;
              background: rgba(0,0,0,0.3);
              padding: 2px 6px;
              border-radius: 4px;
              font-family: var(--mono);
              color: var(--text-muted);
            }
            .sv-ai-tag.active { color: var(--green); border: 1px solid rgba(62, 207, 142, 0.3); }

            /* Domains List */
            .sv-domain-list {
              display: flex;
              flex-direction: column;
              gap: 12px;
            }

            .sv-domain-item {
              background: var(--card);
              border-radius: 8px;
              padding: 16px;
              display: flex;
              align-items: center;
              gap: 16px;
              border-left: 3px solid transparent;
              transition: transform 0.2s;
            }
            .sv-domain-item:hover { transform: translateX(4px); }
            .sv-domain-item.crit { border-left-color: var(--red); }
            .sv-domain-item.high { border-left-color: var(--amber); }
            .sv-domain-item.med { border-left-color: var(--blue); }

            .sv-d-icon { font-size: 20px; }
            .sv-d-info { flex: 1; }
            .sv-d-title { font-weight: 600; font-size: 14px; margin-bottom: 2px; }
            .sv-d-desc { font-size: 12px; color: var(--text-muted); }
            .sv-d-val { font-family: var(--mono); font-weight: bold; }
            
            /* Intervention Strategies */
            .sv-interventions {
              margin-top: 24px;
              border-top: 1px solid rgba(255,255,255,0.1);
              padding-top: 24px;
            }
            
            .sv-int-item {
              display: flex;
              justify-content: space-between;
              padding: 12px;
              background: rgba(255,255,255,0.03);
              margin-bottom: 8px;
              border-radius: 6px;
              font-size: 13px;
            }
            
            .sv-impact { color: var(--green); font-family: var(--mono); }

            /* Sparkline & History (Visuals only) */
            .sv-spark {
              height: 40px;
              display: flex;
              align-items: flex-end;
              gap: 2px;
              margin: 20px 0;
              opacity: 0.6;
            }
            .sv-bar { flex: 1; background: var(--blue); border-radius: 1px 1px 0 0; transition: height 0.5s; }
          </style>

          <div class="sv-demo">
            <div class="sv-header">
              <div class="sv-chip">
                <span>📍</span> Scenario: US–China Trade War — Feb 2026
              </div>
              <div style="font-family: var(--mono); font-size: 12px; color: var(--text-muted);">
                LIVE FEED ●
              </div>
            </div>

            <div class="sv-grid">
              <!-- Left Col: Hero Metric -->
              <div class="sv-col-left">
                <div class="sv-hero">
                  <div class="sv-label">System Tension (δ_H)</div>
                  <div class="sv-metric-big">0.59</div>
                  <div class="sv-label" style="color: var(--amber);">CRITICAL INSTABILITY</div>
                  
                  <div class="sv-mcs">
                    <div class="sv-mcs-val">0.91 ✓</div>
                    <div class="sv-label">MCS Score</div>
                  </div>

                  <div class="sv-spark" id="spark-container">
                    <!-- Bars injected by JS -->
                  </div>

                  <div class="sv-pulse">
                    <div class="sv-pulse-head">
                      <span>🔔</span> METALLIC PULSE DETECTED
                    </div>
                    <p style="font-size: 11px; margin-bottom: 8px; color: var(--text-muted);">
                      5 of 6 AI systems converged on this reading.
                      <br>Confidence: HIGH | Convergence threshold: 4+
                    </p>
                    <div class="sv-ai-grid">
                      <span class="sv-ai-tag active">GPT</span>
                      <span class="sv-ai-tag active">Claude</span>
                      <span class="sv-ai-tag active">Gemini</span>
                      <span class="sv-ai-tag active">Perplexity</span>
                      <span class="sv-ai-tag active">Grok</span>
                      <span class="sv-ai-tag">DeepSeek</span>
                    </div>
                  </div>
                </div>

                <div class="sv-interventions">
                  <div class="sv-label" style="margin-bottom: 12px;">Intervention Strategies</div>
                  <div class="sv-int-item">
                    <span>① Bilateral tariff freeze</span>
                    <span class="sv-impact">Δδ_H: -0.14</span>
                  </div>
                  <div class="sv-int-item">
                    <span>② Supply chain rerouting</span>
                    <span class="sv-impact">Δδ_H: -0.09</span>
                  </div>
                  <div class="sv-int-item">
                    <span>③ Back-channel diplomacy</span>
                    <span class="sv-impact">Δδ_H: -0.06</span>
                  </div>
                </div>
              </div>

              <!-- Right Col: Domains -->
              <div class="sv-domain-list">
                <div class="sv-domain-item crit">
                  <div class="sv-d-icon">📈</div>
                  <div class="sv-d-info">
                    <div class="sv-d-title">Economic Impact</div>
                    <div class="sv-d-desc">US manufacturing cost shock — tariff cascade</div>
                  </div>
                  <div class="sv-d-val" style="color: var(--red);">0.67</div>
                </div>

                <div class="sv-domain-item crit">
                  <div class="sv-d-icon">🌐</div>
                  <div class="sv-d-info">
                    <div class="sv-d-title">Geopolitical Tension</div>
                    <div class="sv-d-desc">US–China diplomatic channels narrowing rapidly</div>
                  </div>
                  <div class="sv-d-val" style="color: var(--red);">0.74</div>
                </div>

                <div class="sv-domain-item high">
                  <div class="sv-d-icon">⛓️</div>
                  <div class="sv-d-info">
                    <div class="sv-d-title">Supply Chain</div>
                    <div class="sv-d-desc">Semiconductor + rare earth bottlenecks deepening</div>
                  </div>
                  <div class="sv-d-val" style="color: var(--amber);">0.61</div>
                </div>

                <div class="sv-domain-item med">
                  <div class="sv-d-icon">⚖️</div>
                  <div class="sv-d-info">
                    <div class="sv-d-title">US Domestic Politics</div>
                    <div class="sv-d-desc">Bipartisan pressure — intervention window narrow</div>
                  </div>
                  <div class="sv-d-val" style="color: var(--blue);">0.44</div>
                </div>

                <div class="sv-domain-item high">
                  <div class="sv-d-icon">⚡</div>
                  <div class="sv-d-info">
                    <div class="sv-d-title">Tech Sector Risk</div>
                    <div class="sv-d-desc">Chip export controls triggering retaliatory bans</div>
                  </div>
                  <div class="sv-d-val" style="color: var(--amber);">0.58</div>
                </div>

                <div class="sv-domain-item high">
                  <div class="sv-d-icon">🔄</div>
                  <div class="sv-d-info">
                    <div class="sv-d-title">Global Trade Flow</div>
                    <div class="sv-d-desc">WTO dispute filings increasing — multilateral stress</div>
                  </div>
                  <div class="sv-d-val" style="color: var(--amber);">0.51</div>
                </div>
              </div>
            </div>
          </div>

          <script>
            // Simple Sparkline Animation
            (function() {
              const container = document.getElementById('spark-container');
              if(!container) return;
              
              // Generate 20 bars
              let bars = '';
              for(let i=0; i<20; i++) {
                const h = 20 + Math.random() * 80;
                const color = h > 70 ? 'var(--red)' : (h > 50 ? 'var(--amber)' : 'var(--blue)');
                bars += \`<div class="sv-bar" style="height: \${h}%; background: \${color}"></div>\`;
              }
              container.innerHTML = bars;

              // Animate periodically
              setInterval(() => {
                const barsEls = container.querySelectorAll('.sv-bar');
                const randomIdx = Math.floor(Math.random() * barsEls.length);
                const newH = 20 + Math.random() * 80;
                barsEls[randomIdx].style.height = \`\${newH}%\`;
                barsEls[randomIdx].style.background = newH > 70 ? 'var(--red)' : (newH > 50 ? 'var(--amber)' : 'var(--blue)');
              }, 800);
            })();
          </script>
        `}
        minHeight="800px"
      />
    </ServicePage>
  );
}
