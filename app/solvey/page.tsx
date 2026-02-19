import type { Metadata } from 'next';
import { ServicePage } from '@/components/agothe/service-page-template';
import { LiveDemoSection } from '@/components/agothe/live-demo-section';

export const metadata: Metadata = {
  title: 'Constraint Field Analysis (Solvey Scanner)',
  description: 'Custom AI automation for your operations. Workflow design, multi-AI orchestration, and Notion integration.',
};

export default function SolveyPage() {
  return (
    <ServicePage
      heroImage="/images/heroes/solvey-seismograph.webp"
      heroImageAlt="AI automation workflow visualization"
      accentColor="#ff3366"
      title="Solvey Scanner"
      tagline="Custom AI automation for your operations."
      description="We design and build AI-powered workflows tailored to your operations. From multi-AI orchestration to Notion-integrated knowledge management, we automate the work that is too complex for templates but too repetitive for your best people."
      price="$297-$2,500"
      priceNote="Per project, depending on complexity"
      ctaLabel="Start Project"
      ctaHref="/contact"
      problemTitle="AI tools without architecture are just noise"
      problemItems={[
        'Most teams use AI as a chat interface, not a system',
        'Disconnected tools create information silos, not intelligence',
        'Generic automation templates do not match real workflow complexity',
        'Without orchestration, multiple AI tools fight instead of coordinate',
        'Manual handoffs between AI systems waste 60% of potential value',
      ]}
      solutionTitle="Orchestrated AI workflows"
      solutionDescription="We map your operations, identify automation opportunities, and build multi-AI workflows that coordinate tools like an intelligence network. Not a collection of chatbots."
      features={[
        { title: 'Workflow Design', description: 'Complete mapping of your current processes and design of AI-optimized workflows with clear input/output specifications.' },
        { title: 'Multi-AI Orchestration', description: 'Coordination of multiple AI systems (Claude, GPT, Gemini, Perplexity) with defined roles and handoff protocols.' },
        { title: 'Notion Integration', description: 'Deep integration with Notion as a knowledge hub automated databases, content pipelines, and living documentation.' },
        { title: 'Ongoing Maintenance', description: 'Monthly optimization based on usage patterns, model updates, and evolving workflow requirements.' },
      ]}
      faq={[
        { question: 'What kinds of workflows can you automate?', answer: 'Research pipelines, content production, client onboarding, report generation, competitive analysis, knowledge management, and any process involving multiple AI tools.' },
        { question: 'Do I need technical expertise?', answer: 'No. We handle all technical implementation. You provide domain knowledge and requirements; we build the system.' },
        { question: 'How long does a project take?', answer: '1-2 weeks for simple automations, 2-4 weeks for complex multi-AI orchestrations. Rush delivery available.' },
        { question: 'What is included in maintenance?', answer: 'Monthly review of workflow performance, model updates, prompt optimization, and up to 4 hours of modifications per month.' },
      ]}
      relatedServices={[
        { label: 'CAPS Intelligence', href: '/intelligence' },
        { label: 'Research Synthesis', href: '/research' },
      ]}
    >
      <LiveDemoSection
        title="Live Demo"
        description="Interactive demonstration - click the button to see it in action"
        htmlContent={`
          <div style="text-align: center; padding: 60px 20px;">
            <h3 style="color: #00f0ff; font-size: 24px; margin-bottom: 30px; font-family: 'Space Grotesk', sans-serif;">
              Interactive Example
            </h3>
            
            <div style="max-width: 400px; margin: 0 auto; background: rgba(255,255,255,0.03); padding: 40px; border-radius: 12px; border: 1px solid rgba(0,240,255,0.2);">
              <p id="demo-text" style="color: #64748b; margin-bottom: 25px; font-size: 16px;">
                Click the button below to see a live interaction
              </p>
              
              <button 
                onclick="
                  const text = document.getElementById('demo-text');
                  const btn = this;
                  text.innerHTML = 'Button clicked! The demo is working. 🎉';
                  text.style.color = '#00f0ff';
                  btn.style.backgroundColor = '#00f0ff';
                  btn.style.color = '#0a0a0a';
                  btn.innerHTML = '✓ Success!';
                  setTimeout(() => {
                    text.innerHTML = 'You can add any HTML, CSS, or JavaScript here';
                    text.style.color = '#ffd700';
                  }, 2000);
                "
                style="
                  background-color: #ff3366;
                  color: white;
                  padding: 14px 32px;
                  border: none;
                  border-radius: 25px;
                  cursor: pointer;
                  font-size: 16px;
                  font-weight: bold;
                  transition: all 0.3s;
                  box-shadow: 0 4px 15px rgba(255,51,102,0.3);
                "
                onmouseover="this.style.transform = 'scale(1.05)'; this.style.boxShadow = '0 6px 20px rgba(255,51,102,0.5)';"
                onmouseout="this.style.transform = 'scale(1)'; this.style.boxShadow = '0 4px 15px rgba(255,51,102,0.3)';"
              >
                Try Demo
              </button>
            </div>
            
            <p style="color: #64748b; margin-top: 40px; font-size: 14px;">
              This is a placeholder demo. Replace the htmlContent prop with your own HTML/CSS/JS.
            </p>
          </div>
        `}
      />
    </ServicePage>
  );
}
