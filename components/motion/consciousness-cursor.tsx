'use client';

import { useEffect, useRef, useState, useCallback } from 'react';
import { usePathname } from 'next/navigation';
import { useReducedMotion } from '@/hooks/use-reduced-motion';
import { useDeviceCapability } from '@/hooks/use-device-capability';
import { MOTION_CONFIG } from '@/lib/motion-config';

export function ConsciousnessCursor() {
  const reducedMotion = useReducedMotion();
  const capability = useDeviceCapability();
  const pathname = usePathname();
  const [isTouch, setIsTouch] = useState(true);
  const [hovering, setHovering] = useState<'default' | 'link' | 'image' | 'nav'>('default');

  const mainRef = useRef<HTMLDivElement>(null);
  const trail1Ref = useRef<HTMLDivElement>(null);
  const trail2Ref = useRef<HTMLDivElement>(null);
  const trail3Ref = useRef<HTMLDivElement>(null);

  const mousePos = useRef({ x: -100, y: -100 });
  const positions = useRef([
    { x: -100, y: -100 },
    { x: -100, y: -100 },
    { x: -100, y: -100 },
  ]);

  const accent = MOTION_CONFIG.pageAccents[pathname] || MOTION_CONFIG.colors.teal;

  useEffect(() => {
    const hasTouch = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
    setIsTouch(hasTouch);
  }, []);

  const disabled = reducedMotion || capability === 'low' || isTouch;

  const onMouseMove = useCallback((e: MouseEvent) => {
    mousePos.current = { x: e.clientX, y: e.clientY };
  }, []);

  useEffect(() => {
    if (disabled) return;

    function checkHover(e: MouseEvent) {
      const target = e.target as HTMLElement;
      if (!target) return;

      const isLink = target.closest('a, button, [role="button"], input, textarea, select, label');
      const isImg = target.closest('img, picture, video, svg');
      const isNav = target.closest('nav');

      if (isNav && isLink) setHovering('nav');
      else if (isLink) setHovering('link');
      else if (isImg) setHovering('image');
      else setHovering('default');
    }

    window.addEventListener('mousemove', onMouseMove, { passive: true });
    window.addEventListener('mouseover', checkHover, { passive: true });

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseover', checkHover);
    };
  }, [disabled, onMouseMove]);

  useEffect(() => {
    if (disabled) return;

    const styleEl = document.createElement('style');
    styleEl.textContent = `
      @media (pointer: fine) {
        * { cursor: none !important; }
      }
    `;
    document.head.appendChild(styleEl);
    return () => { styleEl.remove(); };
  }, [disabled]);

  useEffect(() => {
    if (disabled) return;
    let frame: number;

    function tick() {
      const { x, y } = mousePos.current;

      if (mainRef.current) {
        mainRef.current.style.transform = `translate3d(${x}px, ${y}px, 0) translate(-50%, -50%)`;
      }

      const delays = [0.12, 0.2, 0.28];
      const refs = [trail1Ref, trail2Ref, trail3Ref];

      refs.forEach((ref, i) => {
        const pos = positions.current[i];
        pos.x += (x - pos.x) * (1 - delays[i]);
        pos.y += (y - pos.y) * (1 - delays[i]);
        if (ref.current) {
          ref.current.style.transform = `translate3d(${pos.x}px, ${pos.y}px, 0) translate(-50%, -50%)`;
        }
      });

      frame = requestAnimationFrame(tick);
    }

    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [disabled]);

  if (disabled) return null;

  const mainSize = hovering === 'link' ? 40 : hovering === 'nav' ? 16 : 12;
  const mainBorder = hovering === 'link' ? 1 : 1.5;

  const getCursorStyle = (): React.CSSProperties => {
    const base: React.CSSProperties = {
      position: 'fixed',
      top: 0,
      left: 0,
      pointerEvents: 'none',
      zIndex: 99999,
      borderRadius: '50%',
      transition: 'width 0.2s ease, height 0.2s ease, border-width 0.2s ease, box-shadow 0.2s ease, border-radius 0.2s ease',
      willChange: 'transform',
    };

    if (hovering === 'image') {
      return {
        ...base,
        width: 20,
        height: 20,
        border: 'none',
        borderRadius: 0,
        background: 'transparent',
        boxShadow: `
          inset 0 -1px 0 ${accent}, inset 0 1px 0 ${accent},
          inset -1px 0 0 ${accent}, inset 1px 0 0 ${accent}
        `,
      };
    }

    if (hovering === 'nav') {
      return {
        ...base,
        width: mainSize,
        height: mainSize,
        border: `1.5px solid ${accent}`,
        background: 'transparent',
        transform: 'rotate(45deg)',
        borderRadius: 2,
      };
    }

    return {
      ...base,
      width: mainSize,
      height: mainSize,
      border: `${mainBorder}px solid ${accent}`,
      background: 'transparent',
      boxShadow: hovering === 'link' ? `0 0 15px ${accent}40` : 'none',
    };
  };

  return (
    <>
      <div ref={mainRef} style={getCursorStyle()} />
      <div
        ref={trail1Ref}
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          pointerEvents: 'none',
          zIndex: 99998,
          width: 10,
          height: 10,
          borderRadius: '50%',
          border: `1px solid ${accent}66`,
          willChange: 'transform',
        }}
      />
      <div
        ref={trail2Ref}
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          pointerEvents: 'none',
          zIndex: 99997,
          width: 8,
          height: 8,
          borderRadius: '50%',
          border: `1px solid ${accent}40`,
          willChange: 'transform',
        }}
      />
      <div
        ref={trail3Ref}
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          pointerEvents: 'none',
          zIndex: 99996,
          width: 6,
          height: 6,
          borderRadius: '50%',
          border: `1px solid ${accent}1f`,
          willChange: 'transform',
        }}
      />
    </>
  );
}
