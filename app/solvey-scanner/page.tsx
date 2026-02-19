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
    .solvey-root :root {
      --ink:#0a0a0f; --ink2:#111118; --ink3:#18181f; --surface:#141419;
      --rule:rgba(255,255,255,0.07); --rule2:rgba(255,255,255,0.04);
      --text:#e4e4ee; --sub:#888898; --faint:#44445a;
      --green:#4fd18b; --amber:#e8a42a; --red:#e84545; --blue:#5ab4f0;
      --mono:'IBM Plex Mono',monospace; --serif:'DM Serif Display',serif; --sans:'DM Sans',sans-serif;
    }
    .solvey-root { background:var(--ink); color:var(--text); font-family:var(--sans); -webkit-font-smoothing:antialiased; position:relative; padding-bottom:40px; }
    .solvey-root::after {
      content:''; position:absolute; inset:0; pointer-events:none; z-index:0; opacity:.35;
      background-image:url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='.05'/%3E%3C/svg%3E");
    }

    /* HEADER */
    .solvey-hd { padding:18px 24px; border-bottom:1px solid var(--rule); display:flex; align-items:center; justify-content:space-between; background:linear-gradient(180deg,rgba(12,6,24,.95) 0%,transparent 100%); backdrop-filter:blur(24px); position:sticky; top:0; z-index:5; }
    .solvey-hd-l { display:flex; align-items:center; gap:16px; }
    .solvey-brand-mark { width:32px; height:32px; border:1px solid rgba(90,180,240,.2); border-radius:6px; display:flex; align-items:center; justify-content:center; background:linear-gradient(135deg,rgba(90,180,240,.1),rgba(79,209,139,.05)); }
    .solvey-brand-name { font-family:var(--serif); font-size:16px; }
    .solvey-brand-tag { font-family:var(--mono); font-size:9px; letter-spacing:.18em; color:var(--faint); text-transform:uppercase; margin-top:1px; }
    .solvey-hd-r { display:flex; align-items:center; gap:24px; }
    .solvey-live-chip { display:flex; align-items:center; gap:7px; font-family:var(--mono); font-size:10px; letter-spacing:.12em; color:var(--green); text-transform:uppercase; }
    .solvey-pulse { width:6px; height:6px; background:var(--green); border-radius:50%; box-shadow:0 0 6px var(--green); animation:solvey-pulse 1.4s ease-in-out infinite; }
    @keyframes solvey-pulse { 0%,100%{opacity:1} 50%{opacity:.25} }
    .solvey-utc { font-family:var(--mono); font-size:10px; color:var(--faint); letter-spacing:.07em; }

    /* LAYOUT */
    .solvey-wrap { max-width:1040px; margin:0 auto; padding:28px 24px 40px; position:relative; z-index:1; }
    .solvey-sec { font-family:var(--mono); font-size:9px; letter-spacing:.2em; text-transform:uppercase; color:var(--faint); margin-bottom:14px; display:flex; align-items:center; gap:10px; }
    .solvey-sec::after { content:''; flex:1; height:1px; background:var(--rule2); }

    /* HERO PANEL */
    .solvey-hero { display:grid; grid-template-columns:260px 1fr; border:1px solid var(--rule); border-radius:12px; overflow:hidden; background:var(--surface); margin-bottom:22px; }
    @media (max-width: 800px) {
      .solvey-hero { grid-template-columns:1fr; }
    }

    .solvey-hero-l {
      padding:28px 24px 24px; border-right:1px solid var(--rule);
      background:linear-gradient(160deg,rgba(14,12,26,.9),rgba(10,10,18,1));
      display:flex; flex-direction:column; justify-content:space-between; position:relative; overflow:hidden;
    }
    .solvey-hero-l::before { content:''; position:absolute; bottom:-60px; left:-40px; width:180px; height:180px; background:radial-gradient(circle,rgba(90,180,240,.07) 0%,transparent 70%); pointer-events:none; }

    .solvey-eyebrow { font-family:var(--mono); font-size:9px; letter-spacing:.2em; text-transform:uppercase; color:var(--faint); margin-bottom:12px; display:flex; align-items:center; gap:8px; }
    .solvey-eyebrow::before { content:''; width:14px; height:1px; background:var(--faint); }
    .solvey-big-num { font-family:var(--serif); font-size:74px; line-height:.9; letter-spacing:-.02em; font-variant-numeric:tabular-nums; margin-bottom:14px; transition:color 1s; }
    .solvey-status-pill { display:inline-flex; align-items:center; gap:6px; padding:5px 11px; border-radius:4px; font-family:var(--mono); font-size:10px; font-weight:600; letter-spacing:.1em; text-transform:uppercase; margin-bottom:22px; }

    .solvey-meta { display:flex; flex-direction:column; gap:10px; }
    .solvey-mr { display:flex; flex-direction:column; gap:2px; }
    .solvey-ml { font-family:var(--mono); font-size:9px; letter-spacing:.14em; text-transform:uppercase; color:var(--faint); }
    .solvey-mv { font-family:var(--mono); font-size:12px; color:var(--text); font-weight:500; }
    .solvey-mv.hi { color:var(--amber); }
    .solvey-mv.ok { color:var(--green); }
    .solvey-mv.cr { color:var(--red); }

    /* RIGHT PANEL */
    .solvey-hero-r { padding:26px 24px; display:flex; flex-direction:column; gap:20px; }
    .solvey-ft { font-family:var(--mono); font-size:9px; letter-spacing:.15em; text-transform:uppercase; color:var(--faint); margin-bottom:10px; }

    /* GAUGE */
    .solvey-g-wrap { position:relative; margin-bottom:4px; }
    .solvey-g-track { height:7px; border-radius:4px; background:var(--ink3); border:1px solid var(--rule); position:relative; overflow:visible; }
    .solvey-g-segs { position:absolute; inset:0; border-radius:4px; overflow:hidden; display:flex; }
    .solvey-sg { background:rgba(79,209,139,.18); }
    .solvey-sf { background:rgba(232,164,42,.18); }
    .solvey-sc { background:rgba(232,69,69,.2); }
    .solvey-g-fill { position:absolute; left:0; top:0; bottom:0; border-radius:4px; transition:width 1.8s cubic-bezier(.23,1,.32,1); z-index:2; }
    .solvey-g-fill::after { content:''; position:absolute; right:-1px; top:50%; transform:translateY(-50%); width:13px; height:13px; border-radius:50%; background:var(--ink); border:2px solid currentColor; box-shadow:0 0 10px currentColor,0 0 20px currentColor; z-index:3; }
    .solvey-g-orric { position:absolute; top:-7px; bottom:-7px; width:1px; background:rgba(232,69,69,.5); z-index:4; }
    .solvey-g-orric-lbl { position:absolute; top:-21px; left:4px; font-family:var(--mono); font-size:8px; color:rgba(232,69,69,.7); letter-spacing:.1em; white-space:nowrap; }
    .solvey-g-axis { display:flex; justify-content:space-between; margin-top:7px; font-family:var(--mono); font-size:9px; color:var(--faint); }

    .solvey-zones { display:grid; grid-template-columns:1fr 1fr 1fr; gap:8px; margin-top:6px; }
    .solvey-zc { padding:9px 11px; border-radius:7px; border:1px solid var(--rule); background:var(--ink3); }
    .solvey-zc-lbl { font-family:var(--mono); font-size:8px; letter-spacing:.12em; text-transform:uppercase; margin-bottom:2px; }
    .solvey-zc-val { font-family:var(--mono); font-size:11px; font-weight:500; margin-bottom:3px; }
    .solvey-zc-desc { font-size:10px; color:var(--sub); line-height:1.4; }
    .solvey-zs .solvey-zc-lbl,.solvey-zs .solvey-zc-val { color:var(--green); }
    .solvey-zf .solvey-zc-lbl,.solvey-zf .solvey-zc-val { color:var(--amber); }
    .solvey-zcr .solvey-zc-lbl,.solvey-zcr .solvey-zc-val { color:var(--red); }

    /* sparkline */
    .solvey-spark-row { display:flex; align-items:flex-end; gap:3px; height:34px; }
    .solvey-sbar { flex:1; border-radius:2px; min-height:2px; }

    /* DOMAINS */
    .solvey-dg { display:grid; grid-template-columns:repeat(3,1fr); gap:11px; margin-bottom:22px; }
    @media (max-width: 900px) {
      .solvey-dg { grid-template-columns:repeat(2,1fr); }
    }
    @media (max-width: 640px) {
      .solvey-dg { grid-template-columns:1fr; }
    }
    .solvey-dc { background:var(--surface); border:1px solid var(--rule); border-radius:10px; padding:17px 17px 14px; position:relative; overflow:hidden; transition:border-color .3s; }
    .solvey-dc:hover { border-color:rgba(255,255,255,.11); }
    .solvey-dc.cr { border-color:rgba(232,69,69,.22); }
    .solvey-dc.wn { border-color:rgba(232,164,42,.18); }
    .solvey-dc.cr::before,.solvey-dc.wn::before { content:''; position:absolute; inset:0; pointer-events:none; }
    .solvey-dc.cr::before { background:radial-gradient(ellipse at 90% 0%,rgba(232,69,69,.05),transparent 60%); }
    .solvey-dc.wn::before { background:radial-gradient(ellipse at 90% 0%,rgba(232,164,42,.04),transparent 60%); }
    .solvey-dc-top { display:flex; justify-content:space-between; align-items:flex-start; margin-bottom:12px; }
    .solvey-dc-name { font-size:12px; font-weight:600; margin-bottom:2px; }
    .solvey-dc-sub { font-family:var(--mono); font-size:9px; color:var(--faint); letter-spacing:.09em; text-transform:uppercase; }
    .solvey-dc-icon { font-size:15px; opacity:.45; }
    .solvey-dc-bw { height:3px; background:var(--ink3); border-radius:2px; margin-bottom:9px; overflow:hidden; }
    .solvey-dc-bf { height:100%; border-radius:2px; transition:width 2s cubic-bezier(.23,1,.32,1); }
    .solvey-dc-bot { display:flex; justify-content:space-between; align-items:baseline; }
    .solvey-dc-v { font-family:var(--mono); font-size:20px; font-weight:500; transition:color .8s; }
    .solvey-dc-badge { font-family:var(--mono); font-size:9px; font-weight:600; letter-spacing:.08em; text-transform:uppercase; padding:3px 7px; border-radius:3px; }
    .solvey-dc-sigs { margin-top:10px; padding-top:9px; border-top:1px solid var(--rule2); display:flex; flex-direction:column; gap:4px; }
    .solvey-dc-sig { font-family:var(--mono); font-size:9px; color:var(--sub); display:flex; align-items:center; gap:5px; line-height:1.4; }
    .solvey-dc-dot { width:3px; height:3px; border-radius:50%; background:var(--faint); flex-shrink:0; }

    /* HISTORY */
    .solvey-hp { background:var(--surface); border:1px solid var(--rule); border-radius:10px; padding:24px 26px; margin-bottom:22px; }
    .solvey-hp-hl { font-family:var(--serif); font-size:19px; margin-bottom:6px; }
    .solvey-hp-sub { font-size:12px; color:var(--sub); line-height:1.65; max-width:560px; margin-bottom:22px; }
    .solvey-he { display:grid; grid-template-columns:repeat(5,1fr); position:relative; padding-top:28px; }
    .solvey-he-line { position:absolute; top:8px; left:8%; right:8%; height:1px; background:linear-gradient(90deg,transparent,var(--rule),var(--rule),transparent); }
    .solvey-he-item { text-align:center; padding:0 5px; }
    .solvey-he-dot { width:9px; height:9px; border-radius:50%; margin:0 auto 11px; }
    .solvey-he-cr { background:var(--red); box-shadow:0 0 10px var(--red); }
    .solvey-he-now { background:var(--blue); box-shadow:0 0 8px var(--blue); animation:solvey-pulse 1.5s infinite; }
    .solvey-he-yr { font-family:var(--mono); font-size:9px; color:var(--faint); letter-spacing:.08em; margin-bottom:4px; }
    .solvey-he-name { font-size:11px; font-weight:600; line-height:1.3; margin-bottom:3px; }
    .solvey-he-val { font-family:var(--mono); font-size:12px; font-weight:600; }
    .solvey-he-lead { font-family:var(--mono); font-size:9px; color:var(--faint); margin-top:3px; }

    /* ALERTS */
    .solvey-ap { background:var(--surface); border:1px solid var(--rule); border-radius:10px; overflow:hidden; margin-bottom:22px; }
    .solvey-ap-hd { padding:13px 20px; border-bottom:1px solid var(--rule); display:flex; justify-content:space-between; align-items:center; }
    .solvey-ap-title { font-size:12px; font-weight:600; letter-spacing:.04em; }
    .solvey-ap-n { font-family:var(--mono); font-size:10px; color:var(--sub); }
    .solvey-alert { padding:13px 20px; border-bottom:1px solid var(--rule2); display:flex; align-items:flex-start; gap:13px; animation:solvey-fin .45s ease both; }
    .solvey-alert:last-child { border-bottom:none; }
    @keyframes solvey-fin { from{opacity:0;transform:translateY(-3px)} to{opacity:1;transform:none} }
    .solvey-al-sev { width:6px; height:6px; border-radius:50%; flex-shrink:0; margin-top:5px; }
    .solvey-sc2 { background:var(--red); box-shadow:0 0 6px var(--red); animation:solvey-pulse 1s infinite; }
    .solvey-sw2 { background:var(--amber); box-shadow:0 0 5px var(--amber); }
    .solvey-si2 { background:var(--blue); }
    .solvey-al-body { flex:1; }
    .solvey-al-title { font-size:12px; font-weight:500; margin-bottom:3px; }
    .solvey-al-desc { font-family:var(--mono); font-size:10px; color:var(--sub); line-height:1.5; }
    .solvey-al-time { font-family:var(--mono); font-size:9px; color:var(--faint); margin-top:3px; }
    .solvey-al-badge { font-family:var(--mono); font-size:10px; font-weight:600; padding:3px 9px; border-radius:4px; white-space:nowrap; flex-shrink:0; align-self:flex-start; }
    .solvey-ab-u { background:rgba(232,69,69,.12); color:var(--red); border:1px solid rgba(232,69,69,.2); }
    .solvey-ab-d { background:rgba(79,209,139,.1); color:var(--green); border:1px solid rgba(79,209,139,.2); }

    /* CTA */
    .solvey-cta { background:linear-gradient(135deg,rgba(90,180,240,.07),rgba(79,209,139,.04)); border:1px solid rgba(255,255,255,.08); border-radius:12px; padding:24px 26px; display:flex; justify-content:space-between; align-items:center; gap:24px; }
    @media (max-width: 720px) {
      .solvey-cta { flex-direction:column; align-items:flex-start; }
    }
    .solvey-cta-hl { font-family:var(--serif); font-size:22px; margin-bottom:8px; line-height:1.25; }
    .solvey-cta-desc { font-size:13px; color:var(--sub); line-height:1.65; max-width:420px; }
    .solvey-cta-btns { display:flex; gap:11px; flex-shrink:0; align-items:center; flex-wrap:wrap; }
    .solvey-btn-p { padding:13px 26px; background:var(--text); color:var(--ink); border:none; border-radius:7px; font-family:var(--sans); font-size:13px; font-weight:600; cursor:pointer; letter-spacing:.02em; transition:all .2s; white-space:nowrap; }
    .solvey-btn-p:hover { background:#fff; transform:translateY(-1px); box-shadow:0 8px 28px rgba(0,0,0,.5); }
    .solvey-btn-g { padding:13px 22px; background:transparent; color:var(--sub); border:1px solid var(--rule); border-radius:7px; font-family:var(--sans); font-size:13px; font-weight:500; cursor:pointer; letter-spacing:.02em; transition:all .2s; white-space:nowrap; }
    .solvey-btn-g:hover { border-color:rgba(255,255,255,.2); color:var(--text); }
    .solvey-demo-note { text-align:center; font-family:var(--mono); font-size:9px; color:var(--faint); letter-spacing:.15em; text-transform:uppercase; margin-top:22px; opacity:.45; }

    /* COLOR UTILS */
    .solvey-cg { color:var(--green); } .solvey-ca { color:var(--amber); } .solvey-cr2 { color:var(--red); } .solvey-cb { color:var(--blue); }
    .solvey-bg-g { background:rgba(79,209,139,.1); color:var(--green); border:1px solid rgba(79,209,139,.2); }
    .solvey-bg-a { background:rgba(232,164,42,.1); color:var(--amber); border:1px solid rgba(232,164,42,.2); }
    .solvey-bg-r { background:rgba(232,69,69,.12); color:var(--red); border:1px solid rgba(232,69,69,.2); }
    .solvey-fl-g { background:linear-gradient(90deg,var(--green),rgba(79,209,139,.7)); color:var(--green); }
    .solvey-fl-a { background:linear-gradient(90deg,var(--amber),rgba(232,164,42,.7)); color:var(--amber); }
    .solvey-fl-r { background:linear-gradient(90deg,var(--red),rgba(232,69,69,.7)); color:var(--red); }
  </style>

  <div class="solvey-hd">
    <div class="solvey-hd-l">
      <div class="solvey-brand-mark">
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
          <circle cx="8" cy="8" r="5" stroke="rgba(90,180,240,.8)" stroke-width="1.2"/>
          <circle cx="8" cy="8" r="1.8" fill="rgba(90,180,240,.9)"/>
          <line x1="8" y1="1" x2="8" y2="3.5" stroke="rgba(90,180,240,.5)" stroke-width="1"/>
          <line x1="8" y1="12.5" x2="8" y2="15" stroke="rgba(90,180,240,.5)" stroke-width="1"/>
          <line x1="1" y1="8" x2="3.5" y2="8" stroke="rgba(90,180,240,.5)" stroke-width="1"/>
          <line x1="12.5" y1="8" x2="15" y2="8" stroke="rgba(90,180,240,.5)" stroke-width="1"/>
        </svg>
      </div>
      <div>
        <div class="solvey-brand-name">Solvey Scanner</div>
        <div class="solvey-brand-tag">Constraint Field Monitor · v3.0</div>
      </div>
    </div>
    <div class="solvey-hd-r">
      <div class="solvey-live-chip"><div class="solvey-pulse"></div>Continuous Monitoring</div>
      <div class="solvey-utc" id="solvey-clock">—</div>
    </div>
  </div>

  <div class="solvey-wrap">
    <div class="solvey-sec">Global Constraint Field Index</div>

    <!-- HERO -->
    <div class="solvey-hero">
      <!-- LEFT -->
      <div class="solvey-hero-l">
        <div>
          <div class="solvey-eyebrow">δ_H · Collapse Index</div>
          <div class="solvey-big-num solvey-ca" id="solvey-gVal">0.48</div>
          <div class="solvey-status-pill solvey-bg-a" id="solvey-gStat">Edge-Fragile</div>
        </div>
        <div class="solvey-meta">
          <div class="solvey-mr">
            <div class="solvey-ml">Phase Classification</div>
            <div class="solvey-mv hi" id="solvey-gPhase">Pre-critical transition</div>
          </div>
          <div class="solvey-mr">
            <div class="solvey-ml">Intervention Window</div>
            <div class="solvey-mv hi" id="solvey-gWin">~68 hrs</div>
          </div>
          <div class="solvey-mr">
            <div class="solvey-ml">24 h Trend</div>
            <div class="solvey-mv" id="solvey-gTrend">+0.03 — LSSE accumulating</div>
          </div>
          <div class="solvey-mr">
            <div class="solvey-ml">Domains ≥ Orric Threshold</div>
            <div class="solvey-mv cr" id="solvey-gAbove">2 / 6</div>
          </div>
        </div>
      </div>

      <!-- RIGHT -->
      <div class="solvey-hero-r">
        <div>
          <div class="solvey-ft">Constraint Stress Continuum — δ_H(t) = d(LSSE)/dt</div>
          <div class="solvey-g-wrap">
            <div class="solvey-g-track">
              <div class="solvey-g-segs">
                <div class="solvey-sg" style="width:45%"></div>
                <div class="solvey-sf" style="width:7%"></div>
                <div class="solvey-sc" style="width:48%"></div>
              </div>
              <div class="solvey-g-fill solvey-fl-a" id="solvey-gBar" style="width:48%"></div>
              <div class="solvey-g-orric" style="left:52%"><div class="solvey-g-orric-lbl">Orric Threshold δ = 0.52</div></div>
            </div>
            <div class="solvey-g-axis"><span>0.00</span><span>0.25</span><span>0.50</span><span>0.75</span><span>1.00</span></div>
          </div>
          <div class="solvey-zones">
            <div class="solvey-zc solvey-zs">
              <div class="solvey-zc-lbl">Subcritical</div>
              <div class="solvey-zc-val">δ_H &lt; 0.45</div>
              <div class="solvey-zc-desc">Coherent phase. System self-organises without external intervention.</div>
            </div>
            <div class="solvey-zc solvey-zf">
              <div class="solvey-zc-lbl">Edge-Fragile</div>
              <div class="solvey-zc-val">0.45 – 0.52</div>
              <div class="solvey-zc-desc">LSSE accumulating. Bifurcation point imminent. Window to act.</div>
            </div>
            <div class="solvey-zc solvey-zcr">
              <div class="solvey-zc-lbl">Supercritical</div>
              <div class="solvey-zc-val">δ_H ≥ 0.52</div>
              <div class="solvey-zc-desc">Orric point crossed. Phase transition active. Cascade risk.</div>
            </div>
          </div>
        </div>
        <div>
          <div class="solvey-ft">72-Hour δ_H Trajectory</div>
          <div class="solvey-spark-row" id="solvey-spark"></div>
        </div>
      </div>
    </div>

    <!-- DOMAINS -->
    <div class="solvey-sec">Domain Monitoring — Constraint Field Decomposition</div>
    <div class="solvey-dg" id="solvey-dg"></div>

    <!-- HISTORY -->
    <div class="solvey-sec">Hindcast Validation — Orric Point Detection</div>
    <div class="solvey-hp">
      <div class="solvey-hp-hl">Retrospective δ_H Analysis</div>
      <div class="solvey-hp-sub">Constraint field stress exceeded the critical threshold (δ_H ≥ 0.52) 48–72 hours before each event below became externally visible. Orric crossings are detectable in real time; visible crises are not.</div>
      <div style="position:relative">
        <div class="solvey-he-line"></div>
        <div class="solvey-he" id="solvey-hist"></div>
      </div>
    </div>

    <!-- ALERTS -->
    <div class="solvey-sec">Active Constraint Alerts</div>
    <div class="solvey-ap">
      <div class="solvey-ap-hd">
        <div class="solvey-ap-title">Field Integrity Reports</div>
        <div class="solvey-ap-n" id="solvey-alertN">—</div>
      </div>
      <div id="solvey-alertFeed"></div>
    </div>

    <!-- CTA -->
    <div class="solvey-cta">
      <div>
        <div class="solvey-cta-hl">Receive the Full Solvey Report</div>
        <div class="solvey-cta-desc">Weekly constraint field intelligence across geopolitical, financial, humanitarian, and environmental domains. Quantified δ_H readings, Orric point forecasts, and intervention windows — delivered before the window closes.</div>
      </div>
      <div class="solvey-cta-btns">
        <button class="solvey-btn-p">Request Access →</button>
        <button class="solvey-btn-g">Technical Docs</button>
      </div>
    </div>

    <div class="solvey-demo-note">Simulation · Illustrative Data · Solvey Scanner v3.0 · Agothe.ai</div>
  </div>

  <script>
    (function(){
      const ORRIC=0.52;
      const DOMAINS=[
        {id:'geo',name:'Geopolitical',sub:'State-Level Stress Fields',icon:'🌐',base:.61,v:.025,sigs:['Eastern European stress corridor: elevated','Cross-domain cascade risk: moderate','Multipolar constraint lock: persistent'],dc:'cr'},
        {id:'fin',name:'Financial Systems',sub:'Systemic Credit & Liquidity',icon:'⧖',base:.47,v:.035,sigs:['IG credit spreads: 2.1σ above baseline','Bank reserve ratios: within tolerance','FX implied volatility: elevated'],dc:'wn'},
        {id:'hum',name:'Humanitarian',sub:'Displacement & Resource Access',icon:'◎',base:.73,v:.018,sigs:['Sudan: Type-R collapse signature active','Yemen constraint lock: persistent','WFP resource gap: +18% Q-o-Q'],dc:'cr'},
        {id:'env',name:'Environmental',sub:'Ecosystem Coherence Index',icon:'∿',base:.54,v:.022,sigs:['Amazon dieback corridor: δ_H 0.58','Arctic permafrost LSSE rising','Coral bleaching threshold: approaching'],dc:'wn'},
        {id:'pol',name:'Democratic Systems',sub:'Institutional Coherence',icon:'⊕',base:.44,v:.028,sigs:['Polarisation index: holding stable','Press freedom LSSE: net decompressing','Election integrity baseline: nominal'],dc:''},
        {id:'ai',name:'AI / Technology',sub:'Alignment & Proliferation',icon:'⟁',base:.38,v:.032,sigs:['Safety research velocity: +12% MoM','Open-weight proliferation: elevated','Governance constraint field: forming'],dc:''},
      ];
      const HIST=[
        {yr:'2007–08',name:'Global Financial Crisis',val:'0.58',t:'cr',lead:'72 hrs lead'},
        {yr:'2019–20',name:'COVID-19 Social Breakdown',val:'0.54',t:'cr',lead:'48 hrs lead'},
        {yr:'2021',name:'Myanmar Coup Cascade',val:'0.67',t:'cr',lead:'60 hrs lead'},
        {yr:'2022',name:'Ukraine Escalation',val:'0.61',t:'cr',lead:'54 hrs lead'},
        {yr:'NOW',name:'Current Global Field',val:'0.48',t:'now',lead:'monitoring'},
      ];
      const ALERTS=[
        {sev:'crit',title:'Humanitarian domain: Orric threshold exceeded',desc:'δ_H = 0.73 — Sudan shows Type-R resonance collapse signature. Structural constraint lock active; conventional aid insufficient. V₀ field manipulation required.',badge:'+0.12',up:true,t:'4 min ago'},
        {sev:'crit',title:'Geopolitical: LSSE above suppression ridge',desc:'Cumulative suppressed-intent accumulation exceeds 0.70 threshold. Eastern European theatre: correlated stress spikes across economic and military constraint layers.',badge:'+0.07',up:true,t:'11 min ago'},
        {sev:'warn',title:'Environmental coherence: Orric threshold breached',desc:'Amazon dieback corridor δ_H = 0.58. Phase transition dynamics confirmed. Satellite NDVI correlation approaching bifurcation — cascade to 0.65 probable within 30 days.',badge:'+0.04',up:true,t:'27 min ago'},
        {sev:'warn',title:'Financial: credit stress entering edge-fragile regime',desc:'IG spread widening at 2.1σ. System remains subcritical — no Orric crossing yet. Correlated move with geopolitical domain warrants cross-domain cascade monitoring.',badge:'+0.02',up:true,t:'52 min ago'},
        {sev:'info',title:'Democratic systems: net decompression observed',desc:'Press freedom LSSE declining over 14-day window. Polarisation index holding below fragile threshold. Constraint field trajectory: net improving.',badge:'−0.01',up:false,t:'1 hr ago'},
      ];

      const dv={},hist=[];
      DOMAINS.forEach(d=>{dv[d.id]=d.base;});
      for(let i=0;i<72;i++) hist.push(.36+(i/72)*.12+(Math.random()-.5)*.04);

      function si(v){
        if(v<.45) return{lbl:'Subcritical',cc:'solvey-cg',bg:'solvey-bg-g',fl:'solvey-fl-g',dc:''};
        if(v<.52) return{lbl:'Edge-Fragile',cc:'solvey-ca',bg:'solvey-bg-a',fl:'solvey-fl-a',dc:'wn'};
        if(v<.65) return{lbl:'Supercritical',cc:'solvey-cr2',bg:'solvey-bg-r',fl:'solvey-fl-r',dc:'cr'};
        return{lbl:'Critical Collapse',cc:'solvey-cr2',bg:'solvey-bg-r',fl:'solvey-fl-r',dc:'cr'};
      }

      function tickClock(){
        const el=document.getElementById('solvey-clock'); if(!el) return;
        const n=new Date();const p=x=>String(x).padStart(2,'0');
        el.textContent =
          n.toUTCString().slice(5,11)+ ' ' +
          p(n.getUTCHours())+ ':' + p(n.getUTCMinutes())+ ':' + p(n.getUTCSeconds())+ ' UTC';
      }
      setInterval(tickClock,1000);tickClock();

      function buildSpark(){
        const el=document.getElementById('solvey-spark');if(!el) return;
        el.innerHTML='';
        const sl=hist.slice(-60);const mx=Math.max(...sl);
        sl.forEach((v,i)=>{
          const b=document.createElement('div');b.className='solvey-sbar';
          b.style.height=((v/mx)*100)+'%';
          b.style.background=v<.45?'rgba(79,209,139,.5)':v<.52?'rgba(232,164,42,.5)':'rgba(232,69,69,.5)';
          b.style.opacity=.35+(i/sl.length)*.65;el.appendChild(b);
        });
      }

      function buildDomains(){
        const g=document.getElementById('solvey-dg');if(!g) return;
        g.innerHTML='';
        DOMAINS.forEach(d=>{
          const v=dv[d.id];const s=si(v);
          const c=document.createElement('div');c.className='solvey-dc '+(s.dc||'');c.id='solvey-dc-'+d.id;
          c.innerHTML='<div class="solvey-dc-top"><div><div class="solvey-dc-name">'+d.name+'</div><div class="solvey-dc-sub">'+d.sub+'</div></div><div class="solvey-dc-icon">'+d.icon+'</div></div>' +
            '<div class="solvey-dc-bw"><div class="solvey-dc-bf '+s.fl+'" id="solvey-df-'+d.id+'" style="width:'+(v*100)+'%"></div></div>' +
            '<div class="solvey-dc-bot"><div class="solvey-dc-v '+s.cc+'" id="solvey-dv-'+d.id+'">'+v.toFixed(2)+'</div><div class="solvey-dc-badge '+s.bg+'" id="solvey-dd-'+d.id+'">'+s.lbl+'</div></div>' +
            '<div class="solvey-dc-sigs">'+d.sigs.map(sg=>'<div class="solvey-dc-sig"><div class="solvey-dc-dot"></div>'+sg+'</div>').join('')+'</div>';
          g.appendChild(c);
        });
      }

      function buildHist(){
        const el=document.getElementById('solvey-hist');if(!el) return;
        el.innerHTML='';
        HIST.forEach(ev=>{
          const item=document.createElement('div');item.className='solvey-he-item';
          const col=ev.t==='cr'?'var(--red)':ev.t==='now'?'var(--blue)':'var(--amber)';
          const dc=ev.t==='cr'?'solvey-he-cr':'solvey-he-now';
          item.innerHTML='<div class="solvey-he-dot '+dc+'"></div><div class="solvey-he-yr">'+ev.yr+'</div><div class="solvey-he-name">'+ev.name+'</div><div class="solvey-he-val" style="color:'+col+'">δ_H = '+ev.val+'</div><div class="solvey-he-lead">'+ev.lead+'</div>';
          el.appendChild(item);
        });
      }

      function buildAlerts(){
        const feed=document.getElementById('solvey-alertFeed');
        const nEl=document.getElementById('solvey-alertN');
        if(!feed||!nEl) return;
        nEl.textContent=ALERTS.filter(a=>a.sev==='crit').length+' critical · '+ALERTS.length+' total';
        feed.innerHTML='';
        ALERTS.forEach((a,i)=>{
          const item=document.createElement('div');item.className='solvey-alert';item.style.animationDelay=(i*.08)+'s';
          const sc=a.sev==='crit'?'solvey-sc2':a.sev==='warn'?'solvey-sw2':'solvey-si2';
          item.innerHTML='<div class="solvey-al-sev '+sc+'"></div>' +
            '<div class="solvey-al-body"><div class="solvey-al-title">'+a.title+'</div><div class="solvey-al-desc">'+a.desc+'</div><div class="solvey-al-time">'+a.t+'</div></div>' +
            '<div class="solvey-al-badge '+(a.up?'solvey-ab-u':'solvey-ab-d')+'">'+(a.up?'↑':'↓')+' δ_H '+a.badge+'</div>';
          feed.appendChild(item);
        });
      }

      function updateGlobal(){
        const w=[.25,.20,.20,.15,.10,.10];let g=0;
        DOMAINS.forEach((d,i)=>{g+=dv[d.id]*w[i];});
        const s=si(g);
        const vEl=document.getElementById('solvey-gVal');
        const stEl=document.getElementById('solvey-gStat');
        const bar=document.getElementById('solvey-gBar');
        const winEl=document.getElementById('solvey-gWin');
        const aboveEl=document.getElementById('solvey-gAbove');
        const phaseEl=document.getElementById('solvey-gPhase');
        const trendEl=document.getElementById('solvey-gTrend');
        if(!vEl||!stEl||!bar||!winEl||!aboveEl||!phaseEl||!trendEl) return;

        vEl.textContent=g.toFixed(2);
        vEl.className='solvey-big-num '+s.cc;
        stEl.textContent=s.lbl;
        stEl.className='solvey-status-pill '+s.bg;
        bar.style.width=(g*100)+'%';
        bar.className='solvey-g-fill '+s.fl;
        const dist=Math.max(0,ORRIC-g);
        const hrs=g>=ORRIC?0:Math.round((dist/.04)*6);
        winEl.textContent=g>=ORRIC?'Threshold exceeded — act now':'~'+hrs+' hrs';
        winEl.className='solvey-mv '+(g>=ORRIC?'cr':g>.48?'hi':'ok');
        const above=DOMAINS.filter(d=>dv[d.id]>=ORRIC).length;
        aboveEl.textContent=above+' / '+DOMAINS.length;
        aboveEl.className='solvey-mv '+(above>0?'cr':'ok');
        phaseEl.textContent=g<.45?'Coherent — no intervention required':g<.52?'Pre-critical transition':'Phase transition active';
        phaseEl.className='solvey-mv '+(g<.45?'ok':g<.52?'hi':'cr');
        trendEl.textContent=g>.47?('+'+(g-.45).toFixed(2)+' — LSSE accumulating'):((g-.45).toFixed(2)+' — stable');
      }

      function tickDomains(){
        DOMAINS.forEach(d=>{
          const prev=dv[d.id];const noise=(Math.random()-.5)*d.v*.3;const rev=(d.base-prev)*.025;
          dv[d.id]=Math.max(.05,Math.min(.95,prev+noise+rev));
          const v=dv[d.id];const s=si(v);
          const vEl=document.getElementById('solvey-dv-'+d.id);
          const fEl=document.getElementById('solvey-df-'+d.id);
          const dEl=document.getElementById('solvey-dd-'+d.id);
          const cEl=document.getElementById('solvey-dc-'+d.id);
          if(vEl){vEl.textContent=v.toFixed(2);vEl.className='solvey-dc-v '+s.cc;}
          if(fEl){fEl.style.width=(v*100)+'%';fEl.className='solvey-dc-bf '+s.fl;}
          if(dEl){dEl.textContent=s.lbl;dEl.className='solvey-dc-badge '+s.bg;}
          if(cEl){cEl.className='solvey-dc '+(s.dc||'');}
        });
        const w=[.25,.20,.20,.15,.10,.10];let g=0;
        DOMAINS.forEach((d,i)=>{g+=dv[d.id]*w[i];});
        hist.push(g);if(hist.length>96)hist.shift();
        buildSpark();updateGlobal();
      }

      buildDomains();buildSpark();buildHist();buildAlerts();updateGlobal();
      setInterval(tickDomains,3200);
    })();
  </script>
</div>
`}
      />
    </main>
  );
}
