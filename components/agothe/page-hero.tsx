'use client';

import { SmartImage } from './smart-image';

interface PageHeroProps {
  imageSrc: string;
  imageAlt: string;
}

export function PageHero({ imageSrc, imageAlt }: PageHeroProps) {
  return (
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
  );
}
