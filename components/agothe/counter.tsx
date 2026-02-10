'use client';

import { useEffect, useRef, useState } from 'react';
import { useInView } from 'framer-motion';

export function Counter({
  target,
  prefix = '',
  suffix = '',
  decimals = 0,
  duration = 2000,
  countDown = false,
}: {
  target: number;
  prefix?: string;
  suffix?: string;
  decimals?: number;
  duration?: number;
  countDown?: boolean;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.5 });
  const [display, setDisplay] = useState(
    countDown ? (target * 5).toFixed(decimals) : (0).toFixed(decimals)
  );

  useEffect(() => {
    if (!inView) return;

    const start = countDown ? target * 5 : 0;
    const end = target;
    const startTime = performance.now();

    function update(now: number) {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      const current = start + (end - start) * eased;
      setDisplay(current.toFixed(decimals));

      if (progress < 1) {
        requestAnimationFrame(update);
      } else {
        setDisplay(end.toFixed(decimals));
      }
    }

    requestAnimationFrame(update);
  }, [inView, target, decimals, duration, countDown]);

  return (
    <span ref={ref} className="font-mono font-bold tabular-nums">
      {prefix}
      {display}
      {suffix}
    </span>
  );
}
