import type { Metadata } from 'next';
import { LiveDemoSection } from '@/components/agothe/live-demo-section';

export const metadata: Metadata = {
  title: 'Solvey Scanner — Live Monitor | Agothe',
  description: 'Constraint field simulation with animated domains, hindcast timeline, and alert feed.',
};

export default function SolveyScannerPage() {
  return (
    <main className="pt-20">
      <LiveDemoSection
        title="Solvey Scanner — Live Monitor"
        description="Constraint field simulation with animated domains, hindcast timeline, and alert feed."
        minHeight="900px"
        htmlContent={`
<div class="solvey-root">
  <style>
    .solvey-root * { margin: 0; padding: 0; box-sizing: border-box; }
    .solvey-root {
      background: #0a0a0f;
      color: #e4e4ee;
      font-family: 'DM Sans', sans-serif;
      min-height: 800px;
      padding: 40px 20px;
    }
    .solvey-container {
      max-width: 1200px;
      margin: 0 auto;
    }
    .solvey-header {
      text-align: center;
      margin-bottom: 60px;
    }
    .solvey-title {
      font-family: 'DM Serif Display', serif;
      font-size: 48px;
      margin-bottom: 16px;
      background: linear-gradient(135deg, #00f0ff, #4fd18b);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;
    }
    .solvey-subtitle {
      color: #888898;
      font-size: 18px;
    }
    .solvey-status {
      display: inline-flex;
      align-items: center;
      gap: 8px;
      padding: 8px 16px;
      background: rgba(232, 164, 42, 0.1);
      border: 1px solid rgba(232, 164, 42, 0.2);
      border-radius: 20px;
      margin-top: 20px;
    }
    .solvey-pulse-dot {
      width: 8px;
      height: 8px;
      background: #e8a42a;
      border-radius: 50%;
      animation: pulse 2s ease-in-out infinite;
    }
    @keyframes pulse {
      0%, 100% { opacity: 1; transform: scale(1); }
      50% { opacity: 0.5; transform: scale(1.2); }
    }
    .solvey-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
      gap: 24px;
      margin-bottom: 40px;
    }
    .solvey-card {
      background: rgba(255, 255, 255, 0.02);
      border: 1px solid rgba(255, 255, 255, 0.06);
      border-radius: 12px;
      padding: 24px;
      transition: all 0.3s ease;
    }
    .solvey-card:hover {
      border-color: rgba(0, 240, 255, 0.3);
      transform: translateY(-2px);
    }
    .solvey-card-title {
      font-size: 20px;
      font-weight: 600;
      margin-bottom: 12px;
    }
    .solvey-card-value {
      font-family: 'IBM Plex Mono', monospace;
      font-size: 32px;
      font-weight: 700;
      margin-bottom: 8px;
    }
    .solvey-card-desc {
      color: #888898;
      font-size: 14px;
      line-height: 1.6;
    }
    .status-green { color: #4fd18b; }
    .status-amber { color: #e8a42a; }
    .status-red { color: #e84545; }
    .solvey-alert {
      background: rgba(232, 69, 69, 0.1);
      border: 1px solid rgba(232, 69, 69, 0.2);
      border-radius: 8px;
      padding: 16px;
      margin-bottom: 12px;
      display: flex;
      gap: 12px;
      align-items: start;
    }
    .solvey-alert-dot {
      width: 8px;
      height: 8px;
      background: #e84545;
      border-radius: 50%;
      margin-top: 6px;
      animation: pulse 1.5s ease-in-out infinite;
    }
    .solvey-alert-content {
      flex: 1;
    }
    .solvey-alert-title {
      font-weight: 600;
      margin-bottom: 4px;
    }
    .solvey-alert-desc {
      color: #888898;
      font-size: 13px;
    }
  </style>

  <div class="solvey-container">
    <div class="solvey-header">
      <h1 class="solvey-title">Solvey Scanner</h1>
      <p class="solvey-subtitle">Constraint Field Monitor · v3.0</p>
      <div class="solvey-status">
        <div class="solvey-pulse-dot"></div>
        <span>LIVE MONITORING</span>
      </div>
    </div>

    <div class="solvey-grid">
      <div class="solvey-card">
        <div class="solvey-card-title">Global Index</div>
        <div class="solvey-card-value status-amber" id="global-index">0.48</div>
        <div class="solvey-card-desc">Constraint field stress index. Edge-fragile state detected.</div>
      </div>

      <div class="solvey-card">
        <div class="solvey-card-title">Geopolitical</div>
        <div class="solvey-card-value status-red" id="geo-val">0.61</div>
        <div class="solvey-card-desc">State-level stress fields elevated. Critical threshold exceeded.</div>
      </div>

      <div class="solvey-card">
        <div class="solvey-card-title">Financial Systems</div>
        <div class="solvey-card-value status-amber" id="fin-val">0.47</div>
        <div class="solvey-card-desc">Systemic credit and liquidity monitoring.</div>
      </div>

      <div class="solvey-card">
        <div class="solvey-card-title">Humanitarian</div>
        <div class="solvey-card-value status-red" id="hum-val">0.73</div>
        <div class="solvey-card-desc">Displacement and resource access. Type-R collapse signature active.</div>
      </div>

      <div class="solvey-card">
        <div class="solvey-card-title">Environmental</div>
        <div class="solvey-card-value status-amber" id="env-val">0.54</div>
        <div class="solvey-card-desc">Ecosystem coherence index approaching critical thresholds.</div>
      </div>

      <div class="solvey-card">
        <div class="solvey-card-title">AI / Technology</div>
        <div class="solvey-card-value status-green" id="ai-val">0.38</div>
        <div class="solvey-card-desc">Alignment and proliferation monitoring within safe bounds.</div>
      </div>
    </div>

    <div style="margin-top: 40px;">
      <h2 style="font-size: 24px; margin-bottom: 20px;">Active Alerts</h2>
      
      <div class="solvey-alert">
        <div class="solvey-alert-dot"></div>
        <div class="solvey-alert-content">
          <div class="solvey-alert-title">Humanitarian domain: Orric threshold exceeded</div>
          <div class="solvey-alert-desc">δ_H = 0.73 — Sudan shows Type-R resonance collapse signature. Structural constraint lock active.</div>
        </div>
      </div>

      <div class="solvey-alert">
        <div class="solvey-alert-dot"></div>
        <div class="solvey-alert-content">
          <div class="solvey-alert-title">Geopolitical: LSSE above suppression ridge</div>
          <div class="solvey-alert-desc">Cumulative suppressed-intent accumulation exceeds 0.70 threshold. Eastern European theatre monitoring.</div>
        </div>
      </div>
    </div>
  </div>

  <script>
    // Simple animation to update values
    (function() {
      const elements = {
        global: document.getElementById('global-index'),
        geo: document.getElementById('geo-val'),
        fin: document.getElementById('fin-val'),
        hum: document.getElementById('hum-val'),
        env: document.getElementById('env-val'),
        ai: document.getElementById('ai-val')
      };

      function updateValues() {
        Object.values(elements).forEach(el => {
          if (!el) return;
          const current = parseFloat(el.textContent);
          const change = (Math.random() - 0.5) * 0.02;
          const newVal = Math.max(0, Math.min(1, current + change));
          el.textContent = newVal.toFixed(2);
          
          // Update colors based on value
          el.className = 'solvey-card-value';
          if (newVal < 0.45) el.classList.add('status-green');
          else if (newVal < 0.52) el.classList.add('status-amber');
          else el.classList.add('status-red');
        });
      }

      setInterval(updateValues, 3000);
    })();
  </script>
</div>
`}
      />
    </main>
  );
}
