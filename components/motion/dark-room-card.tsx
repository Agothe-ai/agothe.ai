'use client';

import { useRef, useEffect, useState, type ReactNode } from 'react';
import { useReducedMotion } from '@/hooks/use-reduced-motion';

interface DarkRoomCardProps {
  children: ReactNode;
  accentColor?: string;
  className?: string;
}

export function DarkRoomCard({
  children,
  accentColor = '#00f0ff',
  className = '',
}: DarkRoomCardProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);
  const [hovered, setHovered] = useState(false);
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    if (!ref.current) return;
    const el = ref.current;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          observer.unobserve(el);
        }
      },
      { threshold: 0.25 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const revealed = reducedMotion || inView;

  return (
    <div
      ref={ref}
      className={`relative overflow-hidden rounded-xl p-6 ${className}`}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        background: revealed
          ? `linear-gradient(135deg, ${accentColor}0f 0%, transparent 60%), rgba(255,255,255,0.03)`
          : 'rgba(255,255,255,0.02)',
        border: `1px solid ${
          hovered
            ? `${accentColor}33`
            : revealed
            ? 'rgba(255,255,255,0.08)'
            : 'rgba(255,255,255,0.04)'
        }`,
        boxShadow: hovered
          ? `0 4px 24px rgba(0,0,0,0.3), 0 0 20px ${accentColor}14`
          : revealed
          ? '0 4px 24px rgba(0,0,0,0.3)'
          : 'none',
        transform: hovered ? 'translateY(-2px)' : 'translateY(0)',
        transition: reducedMotion
          ? 'none'
          : 'background 0.8s cubic-bezier(0.4,0,0.2,1), border-color 0.3s, box-shadow 0.3s, transform 0.3s',
        backdropFilter: 'blur(12px)',
      }}
    >
      <div
        style={{
          opacity: revealed ? 1 : 0.45,
          transition: reducedMotion ? 'none' : 'opacity 0.8s cubic-bezier(0.4,0,0.2,1)',
        }}
      >
        {children}
      </div>
    </div>
  );
}
