'use client';

import {
  useRef,
  useState,
  useCallback,
  type ReactNode,
  type MouseEvent,
  type CSSProperties,
} from 'react';
import { useReducedMotion } from '@/hooks/use-reduced-motion';

interface MagneticButtonProps {
  children: ReactNode;
  accentColor?: string;
  className?: string;
  href?: string;
  onClick?: () => void;
  type?: 'button' | 'submit';
  'aria-label'?: string;
}

export function MagneticButton({
  children,
  accentColor = '#00f0ff',
  className = '',
  href,
  onClick,
  type = 'button',
  'aria-label': ariaLabel,
}: MagneticButtonProps) {
  const ref = useRef<HTMLElement>(null);
  const rippleRef = useRef<HTMLSpanElement>(null);
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const [showShimmer, setShowShimmer] = useState(false);
  const [hovered, setHovered] = useState(false);
  const reducedMotion = useReducedMotion();
  const isTouch = useRef(false);

  const handleMouseMove = useCallback(
    (e: MouseEvent) => {
      if (reducedMotion || isTouch.current || !ref.current) return;
      const rect = ref.current.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      const dx = (e.clientX - cx) * 0.1;
      const dy = (e.clientY - cy) * 0.1;
      const maxDisplacement = 6;
      setOffset({
        x: Math.max(-maxDisplacement, Math.min(maxDisplacement, dx)),
        y: Math.max(-maxDisplacement, Math.min(maxDisplacement, dy)),
      });
    },
    [reducedMotion]
  );

  const handleMouseEnter = useCallback(() => {
    setHovered(true);
    setShowShimmer(true);
    setTimeout(() => setShowShimmer(false), 600);
  }, []);

  const handleMouseLeave = useCallback(() => {
    setHovered(false);
    setOffset({ x: 0, y: 0 });
  }, []);

  const handleMouseDown = useCallback(
    (e: MouseEvent) => {
      if (reducedMotion || !ref.current) return;
      const rect = ref.current.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const size = Math.max(rect.width, rect.height) * 2;

      const ripple = document.createElement('span');
      ripple.style.cssText = `
        position:absolute;left:${x}px;top:${y}px;width:0;height:0;
        border-radius:50%;background:rgba(255,255,255,0.15);
        transform:translate(-50%,-50%);pointer-events:none;
      `;
      ref.current.appendChild(ripple);

      requestAnimationFrame(() => {
        ripple.style.transition = 'width 0.5s ease-out, height 0.5s ease-out, opacity 0.5s ease-out';
        ripple.style.width = `${size}px`;
        ripple.style.height = `${size}px`;
        ripple.style.opacity = '0';
      });

      setTimeout(() => ripple.remove(), 600);
    },
    [reducedMotion]
  );

  const handleTouchStart = useCallback(() => {
    isTouch.current = true;
  }, []);

  const style: CSSProperties = {
    position: 'relative',
    overflow: 'hidden',
    transform: reducedMotion
      ? 'none'
      : `translate(${offset.x}px, ${offset.y}px)`,
    transition: reducedMotion
      ? 'none'
      : hovered
      ? 'transform 0.1s ease-out, box-shadow 0.3s'
      : 'transform 0.4s cubic-bezier(0.22,1,0.36,1), box-shadow 0.3s',
    boxShadow: hovered
      ? `0 0 20px ${accentColor}4d, 0 0 30px ${accentColor}80`
      : `0 0 20px ${accentColor}4d`,
  };

  const shimmerStyle: CSSProperties = {
    position: 'absolute',
    inset: 0,
    background: `linear-gradient(120deg, transparent 30%, rgba(255,255,255,0.15) 50%, transparent 70%)`,
    transform: showShimmer ? 'translateX(100%)' : 'translateX(-100%)',
    transition: showShimmer ? 'transform 0.6s ease-out' : 'none',
    pointerEvents: 'none',
  };

  const inner = (
    <>
      <span style={shimmerStyle} aria-hidden="true" />
      <span style={{ position: 'relative', zIndex: 1 }}>{children}</span>
    </>
  );

  if (href) {
    return (
      <a
        ref={ref as React.RefObject<HTMLAnchorElement>}
        href={href}
        className={className}
        style={style}
        onMouseMove={handleMouseMove}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onMouseDown={handleMouseDown}
        onTouchStart={handleTouchStart}
        aria-label={ariaLabel}
      >
        {inner}
      </a>
    );
  }

  return (
    <button
      ref={ref as React.RefObject<HTMLButtonElement>}
      type={type}
      className={className}
      style={style}
      onClick={onClick}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onMouseDown={handleMouseDown}
      onTouchStart={handleTouchStart}
      aria-label={ariaLabel}
    >
      {inner}
    </button>
  );
}
