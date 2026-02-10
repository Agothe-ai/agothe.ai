'use client';

import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import { useReducedMotion } from '@/hooks/use-reduced-motion';
import { MOTION_CONFIG } from '@/lib/motion-config';

export function ScrollProgress() {
  const [progress, setProgress] = useState(0);
  const pathname = usePathname();
  const reducedMotion = useReducedMotion();

  const accent = MOTION_CONFIG.pageAccents[pathname] || MOTION_CONFIG.colors.teal;

  useEffect(() => {
    if (reducedMotion) return;

    function onScroll() {
      const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
      if (maxScroll <= 0) {
        setProgress(0);
        return;
      }
      setProgress(window.scrollY / maxScroll);
    }

    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, [reducedMotion, pathname]);

  if (reducedMotion) return null;

  return (
    <div
      className="fixed left-0 right-0 top-0 z-[9999] h-[2px]"
      style={{ opacity: 0.6 }}
      aria-hidden="true"
    >
      <div
        className="h-full origin-left"
        style={{
          width: `${progress * 100}%`,
          background: `linear-gradient(90deg, ${accent}, ${accent}cc)`,
          transition: 'width 0s linear',
        }}
      />
    </div>
  );
}
