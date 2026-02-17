import type { Metadata } from 'next';
import { DemoWizard } from '@/components/agothe/demo-wizard';
import { AnimatedSection, AnimatedItem } from '@/components/agothe/animated-section';
import { PageHero } from '@/components/agothe/page-hero';
import { Check, Users, Clock, Shield } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Schedule a Demo — Agothe Intelligence Platform',
  description: 'See the CAPS Network in action. Custom demo tailored to your organization\'s needs. Response within 24 hours.',
};

const TRUST_METRICS = [
  { icon: Users, label: 'Enterprise Clients', value: '50+' },
  { icon: Clock, label: 'Avg Response Time', value: '<24h' },
  { icon: Shield, label: 'Data Security', value: 'SOC 2' },
];

const WHAT_TO_EXPECT = [
  {
    title: '30-Minute Session',
    description: 'Focused demo tailored to your specific use case and challenges',
  },
  {
    title: 'Live CAPS Network',
    description: 'See 6-AI coordination in real-time analyzing your domain',
  },
  {
    title: 'Custom Analysis',
    description: 'We\'ll run a sample constraint analysis on your selected topic',
  },
  {
    title: 'Implementation Roadmap',
    description: 'Clear next steps and timeline for integration',
  },
];

const TESTIMONIALS = [
  {
    quote: 'The constraint field analysis revealed risks we couldn\'t see with traditional methods.',
    author: 'Sarah Chen',
    role: 'Chief Risk Officer, Fortune 500',
  },
  {
    quote: 'CAPS Network coordination reduced our research time from weeks to hours.',
    author: 'Dr. Michael Torres',
    role: 'Director of Strategic Intelligence',
  },
];

export default function DemoPage() {
  return (
    <main className="pt-20">
      {/* Hero Section */}
      <section className="relative overflow-hidden px-6 py-24 md:py-32">
        <PageHero imageSrc="/images/heroes/about-origin-seed.webp" imageAlt="Demo interface with tendrils" />
        <AnimatedSection className="relative z-10 mx-auto max-w-3xl text-center">
          <AnimatedItem>
            <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-agothe-teal/30 bg-[rgba(0,240,255,0.05)] px-4 py-1.5">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-pulse-dot rounded-full bg-agothe-teal" />
              </span>
              <span className="font-mono text-xs uppercase tracking-wider text-agothe-teal">
                Live Demo Scheduling
              </span>
            </div>
          </AnimatedItem>
          <AnimatedItem>
            <h1 className="font-heading text-4xl font-bold text-agothe-white md:text-6xl">
              See Intelligence-Grade Analysis in Action
            </h1>
          </AnimatedItem>
          <AnimatedItem>
            <p className="mx-auto mt-4 max-w-xl text-lg text-agothe-muted">
              Schedule a custom demo of the CAPS Network. Watch 6 AI systems coordinate to deliver
              research that would take weeks in under 2 hours.
            </p>
          </AnimatedItem>

          {/* Trust Metrics */}
          <AnimatedItem>
            <div className="mt-12 grid gap-6 md:grid-cols-3">
              {TRUST_METRICS.map((metric) => {
                const Icon = metric.icon;
                return (
                  <div
                    key={metric.label}
                    className="rounded-lg border border-[rgba(255,255,255,0.06)] bg-[rgba(255,255,255,0.02)] p-6 backdrop-blur-xl"
                  >
                    <Icon className="mx-auto mb-3 h-8 w-8 text-agothe-teal" />
                    <p className="font-heading text-2xl font-bold text-agothe-white">
                      {metric.value}
                    </p>
                    <p className="mt-1 text-xs text-agothe-muted">{metric.label}</p>
                  </div>
                );
              })}
            </div>
          </AnimatedItem>
        </AnimatedSection>
      </section>

      {/* Form Section */}
      <section className="px-6 py-16">
        <AnimatedSection>
          <DemoWizard />
        </AnimatedSection>
      </section>

      {/* What to Expect */}
      <section className="border-t border-[rgba(255,255,255,0.06)] px-6 py-16">
        <AnimatedSection className="mx-auto max-w-6xl">
          <AnimatedItem>
            <h2 className="mb-8 text-center font-heading text-3xl font-bold text-agothe-white">
              What to Expect
            </h2>
          </AnimatedItem>
          <div className="grid gap-6 md:grid-cols-2">
            {WHAT_TO_EXPECT.map((item) => (
              <AnimatedItem key={item.title}>
                <div className="flex gap-4 rounded-lg border border-[rgba(255,255,255,0.06)] bg-[rgba(255,255,255,0.02)] p-6 backdrop-blur-xl">
                  <Check className="h-6 w-6 flex-shrink-0 text-agothe-teal" />
                  <div>
                    <h3 className="mb-2 font-semibold text-agothe-white">{item.title}</h3>
                    <p className="text-sm text-agothe-muted">{item.description}</p>
                  </div>
                </div>
              </AnimatedItem>
            ))}
          </div>
        </AnimatedSection>
      </section>

      {/* Testimonials */}
      <section className="border-t border-[rgba(255,255,255,0.06)] px-6 py-16">
        <AnimatedSection className="mx-auto max-w-6xl">
          <AnimatedItem>
            <h2 className="mb-8 text-center font-heading text-3xl font-bold text-agothe-white">
              What Clients Say
            </h2>
          </AnimatedItem>
          <div className="grid gap-6 md:grid-cols-2">
            {TESTIMONIALS.map((testimonial) => (
              <AnimatedItem key={testimonial.author}>
                <div className="rounded-lg border border-[rgba(255,255,255,0.06)] bg-[rgba(255,255,255,0.02)] p-8 backdrop-blur-xl">
                  <p className="mb-4 text-lg leading-relaxed text-agothe-muted">
                    &quot;{testimonial.quote}&quot;
                  </p>
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-agothe-teal/10 font-mono text-sm font-bold text-agothe-teal">
                      {testimonial.author.charAt(0)}
                    </div>
                    <div>
                      <p className="text-sm font-medium text-agothe-white">{testimonial.author}</p>
                      <p className="text-xs text-agothe-muted">{testimonial.role}</p>
                    </div>
                  </div>
                </div>
              </AnimatedItem>
            ))}
          </div>
        </AnimatedSection>
      </section>

      {/* FAQ Quick Answers */}
      <section className="border-t border-[rgba(255,255,255,0.06)] px-6 py-16">
        <AnimatedSection className="mx-auto max-w-3xl">
          <AnimatedItem>
            <h2 className="mb-8 text-center font-heading text-3xl font-bold text-agothe-white">
              Quick Answers
            </h2>
          </AnimatedItem>
          <AnimatedItem>
            <div className="space-y-6">
              <div className="rounded-lg border border-[rgba(255,255,255,0.06)] bg-[rgba(255,255,255,0.02)] p-6 backdrop-blur-xl">
                <h3 className="mb-2 font-semibold text-agothe-white">
                  How long does a demo take?
                </h3>
                <p className="text-sm text-agothe-muted">
                  30 minutes. We focus on your specific use case and show live results.
                </p>
              </div>
              <div className="rounded-lg border border-[rgba(255,255,255,0.06)] bg-[rgba(255,255,255,0.02)] p-6 backdrop-blur-xl">
                <h3 className="mb-2 font-semibold text-agothe-white">
                  Do I need to prepare anything?
                </h3>
                <p className="text-sm text-agothe-muted">
                  Just bring your questions and a specific topic you&apos;d like analyzed. We&apos;ll handle
                  the rest.
                </p>
              </div>
              <div className="rounded-lg border border-[rgba(255,255,255,0.06)] bg-[rgba(255,255,255,0.02)] p-6 backdrop-blur-xl">
                <h3 className="mb-2 font-semibold text-agothe-white">
                  Is there a cost for the demo?
                </h3>
                <p className="text-sm text-agothe-muted">
                  No. Demos are complimentary for qualified organizations.
                </p>
              </div>
            </div>
          </AnimatedItem>
        </AnimatedSection>
      </section>
    </main>
  );
}
