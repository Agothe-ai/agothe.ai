'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';

interface SmartImageProps {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  fill?: boolean;
  priority?: boolean;
  sizes?: string;
  className?: string;
  fallbackSrc?: string;
  objectFit?: 'cover' | 'contain' | 'fill' | 'none' | 'scale-down';
}

// Strip any extension from a path and return the base path
function getBasePath(src: string): string {
  return src.replace(/\.(webp|jpg|jpeg|png|gif|avif)$/i, '');
}

// Given a base path, return all format variants to try in order
function getFormatVariants(basePath: string): string[] {
  return [
    `${basePath}.webp`,
    `${basePath}.jpg`,
    `${basePath}.jpeg`,
    `${basePath}.png`,
  ];
}

export function SmartImage({
  src,
  alt,
  width,
  height,
  fill = false,
  priority = false,
  sizes,
  className = '',
  fallbackSrc = '/images/utility/fallback-dark.svg',
  objectFit = 'cover',
}: SmartImageProps) {
  const basePath = getBasePath(src);
  const variants = getFormatVariants(basePath);

  const [imgSrc, setImgSrc] = useState(src);
  const [variantIndex, setVariantIndex] = useState(0);
  const [exhausted, setExhausted] = useState(false);

  // If src prop changes, reset
  useEffect(() => {
    setImgSrc(src);
    setVariantIndex(0);
    setExhausted(false);
  }, [src]);

  const handleError = () => {
    const nextIndex = variantIndex + 1;
    if (nextIndex < variants.length) {
      setVariantIndex(nextIndex);
      setImgSrc(variants[nextIndex]);
    } else {
      setExhausted(true);
      setImgSrc(fallbackSrc);
    }
  };

  if (fill) {
    return (
      <Image
        src={imgSrc}
        alt={alt}
        fill
        priority={priority}
        sizes={sizes}
        className={className}
        style={{ objectFit }}
        onError={handleError}
      />
    );
  }

  if (!width || !height) {
    console.warn('SmartImage: width and height are required when fill is false');
    return null;
  }

  return (
    <Image
      src={imgSrc}
      alt={alt}
      width={width}
      height={height}
      priority={priority}
      sizes={sizes}
      className={className}
      style={{ objectFit }}
      onError={handleError}
    />
  );
}
