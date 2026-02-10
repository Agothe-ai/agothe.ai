'use client';

import { TextReveal } from '@/components/motion/text-reveal';

export function SectionHeading({
  title,
  subtitle,
}: {
  title: string;
  subtitle?: string;
}) {
  return (
    <div className="mb-16 text-center" data-anim-item="">
      <h2 className="font-heading text-3xl font-bold text-agothe-white md:text-5xl">
        <TextReveal mode="words" tag="span">{title}</TextReveal>
      </h2>
      {subtitle && (
        <p className="mx-auto mt-4 max-w-2xl text-lg text-agothe-muted">
          <TextReveal mode="words" tag="span" delay={0.2}>{subtitle}</TextReveal>
        </p>
      )}
    </div>
  );
}
