'use client';

import { useEffect, useState, useRef } from 'react';
import { motion, useInView } from 'framer-motion';

function AnimatedNumber({ target, decimals = 0 }: { target: number; decimals?: number }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.5 });
  const [display, setDisplay] = useState('0');

  useEffect(() => {
    if (!inView) return;
    const startTime = performance.now();
    const duration = 1500;

    function update(now: number) {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      const current = target * eased;
      setDisplay(current.toFixed(decimals));
      if (progress < 1) requestAnimationFrame(update);
      else setDisplay(target.toFixed(decimals));
    }

    requestAnimationFrame(update);
  }, [inView, target, decimals]);

  return <span ref={ref}>{display}</span>;
}

export function LiveStatus() {
  const [time, setTime] = useState('');

  useEffect(() => {
    function updateTime() {
      const now = new Date();
      setTime(
        now.toLocaleTimeString('en-US', {
          hour: '2-digit',
          minute: '2-digit',
          timeZoneName: 'short',
        })
      );
    }
    updateTime();
    const interval = setInterval(updateTime, 60000);
    return () => clearInterval(interval);
  }, []);

  const deltaH = 2.3;

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 1.8, duration: 0.6 }}
      className="relative z-10 mx-auto mt-4 w-full max-w-4xl overflow-hidden rounded-lg"
    >
      <div className="status-sweep obsidian-glass-static px-4 py-2.5 sm:px-6">
        <div className="flex flex-col items-center gap-2 sm:flex-row sm:justify-between">
          <div className="flex items-center gap-2">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
            </span>
            <span className="font-mono text-[11px] font-medium uppercase tracking-wider text-emerald-400">
              System Operational
            </span>
          </div>

          <div className="flex items-center gap-3 font-mono text-[11px] text-agothe-muted sm:gap-4">
            <span>
              <span className="text-agothe-muted/60">&#948;_H: </span>
              <span className={deltaH > 2.0 ? 'animate-pulse-dot text-agothe-danger' : 'text-agothe-teal'}>
                <AnimatedNumber target={deltaH} decimals={1} />
              </span>
            </span>
            <span className="hidden text-agothe-muted/30 sm:inline">|</span>
            <span className="hidden sm:inline">
              <span className="text-agothe-muted/60">Crises: </span>
              <span className="text-agothe-white"><AnimatedNumber target={7} /></span>
            </span>
            <span className="hidden text-agothe-muted/30 sm:inline">|</span>
            <span className="hidden sm:inline">
              <span className="text-agothe-muted/60">Reports: </span>
              <span className="text-agothe-white"><AnimatedNumber target={4} /></span>
            </span>
          </div>

          <div className="hidden font-mono text-[10px] text-agothe-muted/50 md:block">
            {time && <>Updated {time}</>}
          </div>
        </div>
      </div>
    </motion.div>
  );
}
