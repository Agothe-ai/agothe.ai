'use client';

import { SmartImage } from './smart-image';

interface PageHeroProps {
  imageSrc?: string;
  imageAlt?: string;
  title?: React.ReactNode | string;
  subtitle?: React.ReactNode | string;
}

export function PageHero({ imageSrc, imageAlt, title, subtitle }: PageHeroProps) {
  return (
    <div className="relative">
      {imageSrc && imageAlt && (
        <div className="pointer-events-none absolute inset-0 z-0">
          <SmartImage
            src={imageSrc}
            alt={imageAlt}
            fill
            priority={true}
            sizes="100vw"
            className="object-cover"
          />
          {/* Dark gradient overlay for text readability */}
          <div className="absolute inset-0 bg-gradient-to-b from-agothe-bg/60 via-agothe-bg/80 to-agothe-bg" />
        </div>
      )}
      {(title || subtitle) && (
        <header className="relative z-10 mx-auto max-w-2xl px-4 py-16 text-center">
          {title && (
            <h1 className="text-3xl font-bold tracking-tight text-agothe-white sm:text-4xl">
              {title}
            </h1>
          )}
          {subtitle && (
            <p className="mt-4 text-base text-agothe-muted">
              {subtitle}
            </p>
          )}
        </header>
      )}
    </div>
  );
}
