/**
 * Advanced Typography System for Agothe.ai
 * Features: Variable fonts, fluid scaling, kinetic animations, responsive typography
 * Based on 2026 design trends research
 */

// Fluid typography calculator - scales between viewport sizes
export function fluidType(minSize: number, maxSize: number, minVw = 320, maxVw = 1920) {
  const slope = (maxSize - minSize) / (maxVw - minVw);
  const yAxisIntersection = -minVw * slope + minSize;
  
  return `clamp(${minSize}px, ${yAxisIntersection}px + ${slope * 100}vw, ${maxSize}px)`;
}

// Variable font weight transition
export const variableFontWeights = {
  light: 300,
  regular: 400,
  medium: 500,
  semibold: 600,
  bold: 700,
} as const;

// Typography scale - perfect fourth (1.333) for hierarchy
export const typographyScale = {
  xs: fluidType(12, 14),
  sm: fluidType(14, 16),
  base: fluidType(16, 18),
  lg: fluidType(18, 20),
  xl: fluidType(20, 24),
  '2xl': fluidType(24, 30),
  '3xl': fluidType(30, 36),
  '4xl': fluidType(36, 48),
  '5xl': fluidType(48, 60),
  '6xl': fluidType(60, 72),
  '7xl': fluidType(72, 96),
  hero: fluidType(96, 144),
} as const;

// Letter spacing for different contexts
export const letterSpacing = {
  tighter: '-0.05em',
  tight: '-0.025em',
  normal: '0',
  wide: '0.025em',
  wider: '0.05em',
  widest: '0.1em',
  ultraWide: '0.15em', // For "AI-POWERED" style headings
} as const;

// Line heights for optimal readability
export const lineHeight = {
  none: '1',
  tight: '1.25',
  snug: '1.375',
  normal: '1.5',
  relaxed: '1.625',
  loose: '2',
} as const;

// Font weight animation configuration
export const fontWeightTransition = {
  duration: 500,
  easing: 'cubic-bezier(0.4, 0, 0.2, 1)',
  property: 'font-variation-settings',
} as const;

// Scroll-linked typography morphing config
export interface TypographyMorphConfig {
  startWeight: number;
  endWeight: number;
  startSize: string;
  endSize: string;
  startSpacing: string;
  endSpacing: string;
  scrollStart: string;
  scrollEnd: string;
}

// Kinetic typography animation presets
export const kineticPresets = {
  fadeUp: {
    initial: { opacity: 0, y: 40 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6, ease: [0.43, 0.13, 0.23, 0.96] },
  },
  elastic: {
    initial: { opacity: 0, scale: 0.8 },
    animate: { opacity: 1, scale: 1 },
    transition: { duration: 0.8, ease: [0.34, 1.56, 0.64, 1] },
  },
  rotate3D: {
    initial: { opacity: 0, rotateX: -90, transformPerspective: 1000 },
    animate: { opacity: 1, rotateX: 0 },
    transition: { duration: 0.7, ease: 'easeOut' },
  },
} as const;

// Split text stagger configuration
export const staggerConfig = {
  chars: {
    delayChildren: 0.02,
    staggerChildren: 0.02,
  },
  words: {
    delayChildren: 0.1,
    staggerChildren: 0.1,
  },
  lines: {
    delayChildren: 0.15,
    staggerChildren: 0.15,
  },
} as const;

// Responsive typography breakpoints
export const breakpoints = {
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1280,
  '2xl': 1536,
} as const;

// CSS custom properties for variable fonts
export function getVariableFontCSS(weight: number) {
  return {
    fontVariationSettings: `'wght' ${weight}`,
    transition: `font-variation-settings ${fontWeightTransition.duration}ms ${fontWeightTransition.easing}`,
  };
}

// Generate responsive typography classes
export function generateResponsiveTypography() {
  return Object.entries(typographyScale).map(([key, value]) => ({
    [`.text-${key}`]: {
      fontSize: value,
    },
  }));
}

// Accessibility - respect reduced motion
export function getRespectMotionPreference() {
  if (typeof window === 'undefined') return false;
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

// Text gradient utilities for colored keywords
export const textGradients = {
  danger: 'linear-gradient(135deg, #ff3366 0%, #ff6b9d 100%)',
  teal: 'linear-gradient(135deg, #00f0ff 0%, #00b8d4 100%)',
  gold: 'linear-gradient(135deg, #ffd700 0%, #ffed4e 100%)',
  aurora: 'linear-gradient(135deg, #00f0ff 0%, #ffd700 50%, #ff3366 100%)',
} as const;

// WebGL text shader configs
export const shaderConfigs = {
  glow: {
    intensity: 1.5,
    radius: 0.5,
    threshold: 0.5,
  },
  pixelate: {
    pixelSize: 4,
    transitionDuration: 300,
  },
  distortion: {
    amplitude: 0.1,
    frequency: 2,
    speed: 0.5,
  },
} as const;

export type TypographyScale = keyof typeof typographyScale;
export type VariableFontWeight = keyof typeof variableFontWeights;
