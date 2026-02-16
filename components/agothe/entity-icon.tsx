'use client';

import { useState } from 'react';
import Image from 'next/image';

interface EntityIconProps {
  src: string;
  alt: string;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

const sizeMap = {
  sm: { width: 32, height: 32, containerSize: 'w-8 h-8' },
  md: { width: 48, height: 48, containerSize: 'w-12 h-12' },
  lg: { width: 64, height: 64, containerSize: 'w-16 h-16' },
};

export function EntityIcon({ src, alt, size = 'md', className = '' }: EntityIconProps) {
  const [hasError, setHasError] = useState(false);
  const { width, height, containerSize } = sizeMap[size];

  const handleError = () => {
    setHasError(true);
  };

  if (hasError || !src) {
    // Teal circle fallback
    return (
      <div
        className={`${containerSize} rounded-full bg-gradient-to-br from-agothe-teal/30 to-agothe-teal/10 border border-agothe-teal/40 flex items-center justify-center ${className}`}
        title={alt}
      >
        <div className="w-2 h-2 rounded-full bg-agothe-teal" />
      </div>
    );
  }

  return (
    <div className={`${containerSize} relative ${className}`}>
      <Image
        src={src}
        alt={alt}
        width={width}
        height={height}
        className="rounded-full object-cover"
        onError={handleError}
      />
    </div>
  );
}
