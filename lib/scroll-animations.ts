/**
 * Advanced Scroll Animation Utilities for Agothe.ai
 * GSAP ScrollTrigger configurations and presets
 * Research-backed smooth scroll and kinetic effects
 */

// ScrollTrigger configuration presets
export const scrollTriggerPresets = {
  // Fade in when element enters viewport
  fadeIn: {
    start: 'top 80%',
    end: 'top 20%',
    toggleActions: 'play none none reverse',
    markers: false,
  },
  // Pin element during scroll
  pin: {
    start: 'top top',
    end: '+=100%',
    pin: true,
    pinSpacing: true,
    anticipatePin: 1,
  },
  // Scrub animation linked to scroll
  scrub: {
    start: 'top bottom',
    end: 'bottom top',
    scrub: 1,
    markers: false,
  },
  // Pin + scrub combo (hero effect)
  pinScrub: {
    start: 'top top',
    end: '+=200%',
    pin: true,
    scrub: 1,
    anticipatePin: 1,
  },
  // Fast scroll end (skip when scrolling fast)
  fastScrollEnd: {
    start: 'top 80%',
    fastScrollEnd: 2500, // velocity threshold
  },
} as const;

// Animation presets for GSAP
export const animationPresets = {
  // Slide up fade in
  slideUp: {
    from: {
      opacity: 0,
      y: 60,
    },
    to: {
      opacity: 1,
      y: 0,
      duration: 0.8,
      ease: 'power3.out',
    },
  },
  // Scale + fade
  scaleIn: {
    from: {
      opacity: 0,
      scale: 0.8,
    },
    to: {
      opacity: 1,
      scale: 1,
      duration: 0.6,
      ease: 'back.out(1.7)',
    },
  },
  // Rotate 3D reveal
  rotate3D: {
    from: {
      opacity: 0,
      rotateX: -90,
      transformPerspective: 1000,
    },
    to: {
      opacity: 1,
      rotateX: 0,
      duration: 0.9,
      ease: 'power2.out',
    },
  },
  // Blur to focus
  blurFocus: {
    from: {
      opacity: 0,
      filter: 'blur(10px)',
    },
    to: {
      opacity: 1,
      filter: 'blur(0px)',
      duration: 0.7,
      ease: 'power2.inOut',
    },
  },
  // Elastic bounce
  elastic: {
    from: {
      opacity: 0,
      scale: 0,
    },
    to: {
      opacity: 1,
      scale: 1,
      duration: 1,
      ease: 'elastic.out(1, 0.5)',
    },
  },
} as const;

// Stagger configuration for multiple elements
export const staggerPresets = {
  fast: {
    amount: 0.15,
    from: 'start',
    ease: 'power2.out',
  },
  medium: {
    amount: 0.3,
    from: 'start',
    ease: 'power2.out',
  },
  slow: {
    amount: 0.6,
    from: 'start',
    ease: 'power2.out',
  },
  center: {
    amount: 0.3,
    from: 'center',
    ease: 'power2.out',
  },
  random: {
    amount: 0.4,
    from: 'random',
    ease: 'power2.out',
  },
} as const;

// Scroll-linked typography morphing
export interface ScrollTypographyConfig {
  selector: string;
  startProps: {
    weight: number;
    size: string;
    spacing: string;
  };
  endProps: {
    weight: number;
    size: string;
    spacing: string;
  };
  scrollTrigger: {
    start: string;
    end: string;
    scrub: boolean | number;
  };
}

// Parallax layer configuration
export interface ParallaxLayerConfig {
  selector: string;
  speed: number; // 0.5 = slow, 1.0 = normal, 1.5 = fast
  direction: 'up' | 'down';
  intensity?: number;
}

// Multi-layer parallax setup
export const parallaxLayers: ParallaxLayerConfig[] = [
  {
    selector: '.parallax-bg',
    speed: 0.3,
    direction: 'up',
  },
  {
    selector: '.parallax-mid',
    speed: 0.6,
    direction: 'up',
  },
  {
    selector: '.parallax-front',
    speed: 1.2,
    direction: 'down',
  },
];

// Scroll progress utilities
export function getScrollProgress(element: HTMLElement): number {
  const rect = element.getBoundingClientRect();
  const windowHeight = window.innerHeight;
  const progress = (windowHeight - rect.top) / (windowHeight + rect.height);
  return Math.max(0, Math.min(1, progress));
}

// Smooth scroll to element
export function smoothScrollTo(target: string | HTMLElement, offset = 0) {
  if (typeof window === 'undefined') return;
  
  const element = typeof target === 'string' 
    ? document.querySelector(target) 
    : target;
    
  if (!element) return;
  
  const targetPosition = element.getBoundingClientRect().top + window.pageYOffset - offset;
  
  window.scrollTo({
    top: targetPosition,
    behavior: 'smooth',
  });
}

// Snap scroll configuration
export const snapConfig = {
  snapTo: 'labelsDirectional',
  duration: { min: 0.2, max: 0.4 },
  delay: 0.1,
  ease: 'power1.inOut',
} as const;

// Scroll velocity tracking
export function getScrollVelocity(): () => number {
  let lastScrollTop = 0;
  let lastTimestamp = 0;

  return () => {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    const timestamp = Date.now();
    const timeDiff = timestamp - lastTimestamp;
    const velocity = (scrollTop - lastScrollTop) / (timeDiff || 1);

    lastScrollTop = scrollTop;
    lastTimestamp = timestamp;

    return velocity;
  };
}

// Intersection Observer configuration for lazy loading
export const intersectionConfig = {
  root: null,
  rootMargin: '50px',
  threshold: [0, 0.25, 0.5, 0.75, 1],
} as const;

// Create timeline with scroll trigger
export function createScrollTimeline(config: {
  trigger: string;
  start?: string;
  end?: string;
  scrub?: boolean | number;
  pin?: boolean;
}) {
  return {
    scrollTrigger: {
      trigger: config.trigger,
      start: config.start || 'top center',
      end: config.end || 'bottom center',
      scrub: config.scrub !== undefined ? config.scrub : 1,
      pin: config.pin || false,
      markers: process.env.NODE_ENV === 'development',
    },
  };
}

// Text reveal animation (split by chars/words)
export const textRevealConfig = {
  duration: 0.6,
  stagger: 0.02,
  ease: 'power3.out',
  transformOrigin: 'bottom left',
  rotationX: 90,
  opacity: 0,
  y: 20,
} as const;

// Magnetic pull effect configuration
export const magneticConfig = {
  strength: 0.3,
  maxDistance: 100,
  returnDuration: 0.4,
  returnEase: 'power2.out',
} as const;

export type ScrollTriggerPreset = keyof typeof scrollTriggerPresets;
export type AnimationPreset = keyof typeof animationPresets;
export type StaggerPreset = keyof typeof staggerPresets;
