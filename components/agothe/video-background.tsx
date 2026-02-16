'use client';

import { useState, useRef, useEffect } from 'react';
import { SmartImage } from './smart-image';

interface VideoBackgroundProps {
  videoSrc: string;
  posterSrc: string;
  alt: string;
  className?: string;
}

export function VideoBackground({
  videoSrc,
  posterSrc,
  alt,
  className = '',
}: VideoBackgroundProps) {
  const [hasError, setHasError] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const handleLoadedData = () => {
      setIsLoaded(true);
    };

    const handleError = () => {
      setHasError(true);
    };

    video.addEventListener('loadeddata', handleLoadedData);
    video.addEventListener('error', handleError);

    return () => {
      video.removeEventListener('loadeddata', handleLoadedData);
      video.removeEventListener('error', handleError);
    };
  }, []);

  if (hasError) {
    // Fallback to static image if video fails
    return (
      <div className={`relative w-full h-full ${className}`}>
        <SmartImage
          src={posterSrc}
          alt={alt}
          fill
          objectFit="cover"
          priority
        />
      </div>
    );
  }

  return (
    <div className={`relative w-full h-full ${className}`}>
      {/* Static poster image (shown until video loads) */}
      {!isLoaded && (
        <div className="absolute inset-0">
          <SmartImage
            src={posterSrc}
            alt={alt}
            fill
            objectFit="cover"
            priority
          />
        </div>
      )}
      
      {/* Video element */}
      <video
        ref={videoRef}
        className="absolute inset-0 w-full h-full object-cover"
        autoPlay
        loop
        muted
        playsInline
        poster={posterSrc}
      >
        <source src={videoSrc} type="video/mp4" />
        <source src={videoSrc.replace('.mp4', '.webm')} type="video/webm" />
      </video>
    </div>
  );
}
