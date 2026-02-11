'use client';

import { useEffect, useRef, useMemo } from 'react';
import { useReducedMotion } from '@/hooks/use-reduced-motion';
import { useDeviceCapability } from '@/hooks/use-device-capability';

function seededRandom(seed: number) {
  const x = Math.sin(seed) * 10000;
  return x - Math.floor(x);
}

function generateStars(count: number) {
  return Array.from({ length: count }, (_, i) => ({
    x: seededRandom(i * 7 + 1) * 100,
    y: seededRandom(i * 13 + 3) * 100,
    size: 1 + seededRandom(i * 19 + 5) * 2,
    duration: 2 + seededRandom(i * 23 + 7) * 3,
    delay: seededRandom(i * 31 + 11) * 5,
  }));
}

function generateBuildings(
  count: number,
  minH: number,
  maxH: number,
  seed: number
) {
  return Array.from({ length: count }, (_, i) => ({
    x: (i / count) * 100,
    width: 3 + seededRandom(seed + i * 3) * 6,
    height: minH + seededRandom(seed + i * 7) * (maxH - minH),
    windows: Math.floor(2 + seededRandom(seed + i * 11) * 5),
  }));
}

function generateParticles(count: number) {
  return Array.from({ length: count }, (_, i) => ({
    x: seededRandom(i * 41 + 1) * 100,
    y: seededRandom(i * 43 + 3) * 100,
    size: 2 + seededRandom(i * 47 + 5) * 2,
    duration: 20 + seededRandom(i * 53 + 7) * 20,
    delay: seededRandom(i * 59 + 11) * 20,
    color: seededRandom(i * 61 + 13) > 0.5 ? '#00f0ff' : '#ffd700',
  }));
}

export function CityParallax() {
  const reducedMotion = useReducedMotion();
  const capability = useDeviceCapability();
  const containerRef = useRef<HTMLDivElement>(null);
  const scrollY = useRef(0);
  const frameRef = useRef<number>(0);

  const isMobile = capability === 'low';
  const multiplier = isMobile ? 0.5 : 1;

  const stars = useMemo(() => generateStars(25), []);
  const farBuildings = useMemo(() => generateBuildings(12, 20, 50, 100), []);
  const midBuildings = useMemo(() => generateBuildings(10, 30, 65, 200), []);
  const foreBuildings = useMemo(() => generateBuildings(8, 25, 55, 300), []);
  const particles = useMemo(() => generateParticles(isMobile ? 20 : 40), [isMobile]);

  useEffect(() => {
    if (reducedMotion) return;
    const container = containerRef.current;
    if (!container) return;

    const layers = container.querySelectorAll<HTMLDivElement>('[data-parallax]');

    function onScroll() {
      scrollY.current = window.scrollY;
    }

    function tick() {
      const rect = container!.getBoundingClientRect();
      const offset = -rect.top;

      layers.forEach((layer) => {
        const speed = parseFloat(layer.dataset.parallax || '0') * multiplier;
        layer.style.transform = `translate3d(0, ${offset * speed * 0.3}px, 0)`;
      });

      frameRef.current = requestAnimationFrame(tick);
    }

    window.addEventListener('scroll', onScroll, { passive: true });
    frameRef.current = requestAnimationFrame(tick);

    return () => {
      window.removeEventListener('scroll', onScroll);
      cancelAnimationFrame(frameRef.current);
    };
  }, [reducedMotion, multiplier]);

  return (
    <div
      ref={containerRef}
      className="relative w-full overflow-hidden"
      style={{ height: '100vh', background: '#050510' }}
      aria-hidden="true"
    >
      {/* Layer 1: Sky with stars */}
      <div
        data-parallax="0.2"
        className="absolute inset-0"
        style={{ zIndex: 1 }}
      >
        {stars.map((star, i) => (
          <div
            key={i}
            className="absolute rounded-full"
            style={{
              left: `${star.x}%`,
              top: `${star.y}%`,
              width: star.size,
              height: star.size,
              backgroundColor: 'rgba(255,255,255,0.6)',
              animation: reducedMotion
                ? 'none'
                : `pulse-dot ${star.duration}s ease-in-out ${star.delay}s infinite`,
            }}
          />
        ))}
      </div>

      {/* Layer 2: Far buildings */}
      <div
        data-parallax="0.4"
        className="absolute bottom-0 left-0 right-0"
        style={{ zIndex: 2, height: '60%' }}
      >
        {farBuildings.map((b, i) => (
          <div
            key={i}
            className="absolute bottom-0"
            style={{
              left: `${b.x}%`,
              width: `${b.width}%`,
              height: `${b.height}%`,
              backgroundColor: 'rgba(255,255,255,0.03)',
            }}
          >
            {Array.from({ length: b.windows }).map((_, w) => (
              <div
                key={w}
                className="absolute"
                style={{
                  width: 2,
                  height: 2,
                  borderRadius: '50%',
                  left: `${20 + seededRandom(i * 100 + w * 17) * 60}%`,
                  top: `${10 + seededRandom(i * 100 + w * 23) * 70}%`,
                  backgroundColor:
                    seededRandom(i * 100 + w * 29) > 0.5
                      ? 'rgba(0,240,255,0.3)'
                      : 'rgba(255,215,0,0.2)',
                }}
              />
            ))}
          </div>
        ))}
      </div>

      {/* Layer 3: Mid buildings */}
      <div
        data-parallax="0.6"
        className="absolute bottom-0 left-0 right-0"
        style={{ zIndex: 3, height: '55%' }}
      >
        {midBuildings.map((b, i) => (
          <div
            key={i}
            className="absolute bottom-0"
            style={{
              left: `${b.x}%`,
              width: `${b.width}%`,
              height: `${b.height}%`,
              backgroundColor: 'rgba(255,255,255,0.06)',
            }}
          >
            {Array.from({ length: b.windows }).map((_, w) => {
              const isPulsing = !reducedMotion && seededRandom(i * 200 + w * 37) > 0.6;
              return (
                <div
                  key={w}
                  className="absolute"
                  style={{
                    width: 3,
                    height: 3,
                    borderRadius: '50%',
                    left: `${15 + seededRandom(i * 200 + w * 41) * 70}%`,
                    top: `${8 + seededRandom(i * 200 + w * 43) * 75}%`,
                    backgroundColor:
                      seededRandom(i * 200 + w * 47) > 0.4
                        ? 'rgba(0,240,255,0.4)'
                        : 'rgba(255,215,0,0.3)',
                    animation: isPulsing
                      ? `pulse-dot ${2 + seededRandom(i * 200 + w * 53) * 3}s ease-in-out infinite`
                      : 'none',
                  }}
                />
              );
            })}
          </div>
        ))}
      </div>

      {/* Layer 4: Fog / atmospheric haze */}
      <div
        data-parallax="0.7"
        className="absolute left-0 right-0"
        style={{
          zIndex: 4,
          top: '55%',
          height: '20%',
          background:
            'radial-gradient(ellipse at 50% 50%, rgba(0,240,255,0.05) 0%, transparent 70%)',
          pointerEvents: 'none',
        }}
      />

      {/* Layer 5: Foreground buildings */}
      <div
        data-parallax="1.0"
        className="absolute bottom-0 left-0 right-0"
        style={{ zIndex: 5, height: '45%' }}
      >
        {foreBuildings.map((b, i) => (
          <div
            key={i}
            className="absolute bottom-0"
            style={{
              left: `${b.x}%`,
              width: `${b.width}%`,
              height: `${b.height}%`,
              backgroundColor: 'rgba(255,255,255,0.10)',
              borderTop: '1px solid rgba(0,240,255,0.15)',
              borderLeft: '1px solid rgba(0,240,255,0.08)',
            }}
          />
        ))}
      </div>

      {/* Layer 6: Floating particles */}
      <div
        data-parallax="1.2"
        className="absolute inset-0"
        style={{ zIndex: 6, pointerEvents: 'none' }}
      >
        {particles.map((p, i) => (
          <div
            key={i}
            className="absolute rounded-full"
            style={{
              left: `${p.x}%`,
              bottom: `${p.y}%`,
              width: p.size,
              height: p.size,
              backgroundColor: p.color,
              opacity: 0.4,
              animation: reducedMotion
                ? 'none'
                : `city-float-up ${p.duration}s linear ${p.delay}s infinite`,
            }}
          />
        ))}
      </div>

      {/* Gradient overlay at bottom for content blending */}
      <div
        className="absolute bottom-0 left-0 right-0 h-32"
        style={{
          zIndex: 7,
          background: 'linear-gradient(to top, #0a0a0a, transparent)',
          pointerEvents: 'none',
        }}
      />
    </div>
  );
}
