'use client';

// SILENT WEBGL KILL - Neutralized per V1 design requirements
// Returns static gradient fallback instead of WebGL mesh

import { MOTION_CONFIG } from '@/lib/motion-config';

interface MeshGradientHeroProps {
  accentColor?: string;
}

export function MeshGradientHero({ accentColor }: MeshGradientHeroProps) {
  // Return static fallback gradient - no WebGL
  const accent = accentColor || MOTION_CONFIG.colors.teal;
  return (
    <div
      className="pointer-events-none absolute inset-0 z-0"
      style={{
        background: `radial-gradient(ellipse at 30% 20%, ${accent}14 0%, transparent 50%), radial-gradient(ellipse at 70% 80%, rgba(255,215,0,0.05) 0%, transparent 50%), #0a0a0a`,
      }}
    />
  );
}
