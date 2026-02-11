'use client';

import { useEffect, useRef, useState } from 'react';
import { useReducedMotion } from '@/hooks/use-reduced-motion';
import { useDeviceCapability } from '@/hooks/use-device-capability';

export function VREnvironmentMorph() {
  const reducedMotion = useReducedMotion();
  const capability = useDeviceCapability();
  const containerRef = useRef<HTMLDivElement>(null);
  const [dividerPosition, setDividerPosition] = useState(50);
  const [leftDelta, setLeftDelta] = useState(0.8);

  useEffect(() => {
    if (reducedMotion) {
      setDividerPosition(65);
      setLeftDelta(0.55);
      return;
    }

    const container = containerRef.current;
    if (!container) return;

    function onScroll() {
      const rect = container!.getBoundingClientRect();
      const vh = window.innerHeight;
      const scrollProgress = Math.max(
        0,
        Math.min(1, (vh - rect.top) / (vh + rect.height))
      );
      const newPos = 50 + scrollProgress * 30;
      setDividerPosition(Math.min(newPos, 80));
      setLeftDelta(0.8 - scrollProgress * 0.5);
    }

    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, [reducedMotion]);

  const isMobile = capability === 'low';

  return (
    <div
      ref={containerRef}
      className="relative w-full overflow-hidden"
      style={{ height: '60vh', minHeight: 300 }}
      aria-hidden="true"
    >
      {/* Left half: Chaotic gradient */}
      <div
        className="absolute inset-0"
        style={{
          clipPath: `inset(0 ${100 - dividerPosition}% 0 0)`,
          background:
            'linear-gradient(135deg, #7f1d1d 0%, #dc2626 25%, #ea580c 50%, #b91c1c 75%, #7f1d1d 100%)',
          animation:
            reducedMotion || isMobile
              ? 'none'
              : 'chaos-jitter 0.5s steps(3) infinite',
        }}
      />

      {/* Right half: Ordered gradient */}
      <div
        className="absolute inset-0"
        style={{
          clipPath: `inset(0 0 0 ${dividerPosition}%)`,
          background:
            'linear-gradient(135deg, #064e3b 0%, #059669 30%, #00f0ff08 60%, #0d9488 80%, #064e3b 100%)',
          animation:
            reducedMotion || isMobile
              ? 'none'
              : 'calm-breathe 4s ease-in-out infinite',
        }}
      />

      {/* Divider line */}
      <div
        className="absolute top-0 bottom-0"
        style={{
          left: `${dividerPosition}%`,
          width: 1,
          backgroundColor: 'rgba(255,255,255,0.2)',
          zIndex: 2,
          transition: reducedMotion ? 'none' : 'left 0.1s linear',
        }}
      />

      {/* Text overlays */}
      <div className="absolute inset-0 flex items-center justify-between px-8 md:px-16" style={{ zIndex: 3 }}>
        <div className="text-center" style={{ width: `${dividerPosition}%` }}>
          <p
            className="font-mono text-2xl font-bold md:text-4xl"
            style={{ color: '#ff3366' }}
          >
            δ_H: {leftDelta.toFixed(2)}
          </p>
          <p className="mt-1 font-mono text-xs text-red-400/60">
            Constraint Stress
          </p>
        </div>
        <div
          className="text-center"
          style={{ width: `${100 - dividerPosition}%` }}
        >
          <p
            className="font-mono text-2xl font-bold md:text-4xl"
            style={{ color: '#00f0ff' }}
          >
            δ_H: 0.30
          </p>
          <p className="mt-1 font-mono text-xs text-teal-400/60">
            Resonance State
          </p>
        </div>
      </div>

      {/* Bottom gradient for blending */}
      <div
        className="absolute bottom-0 left-0 right-0 h-24"
        style={{
          background: 'linear-gradient(to top, #0a0a0a, transparent)',
          zIndex: 4,
          pointerEvents: 'none',
        }}
      />
    </div>
  );
}
