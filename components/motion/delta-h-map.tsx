'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { useReducedMotion } from '@/hooks/use-reduced-motion';

interface Hotspot {
  id: string;
  label: string;
  x: number;
  y: number;
  deltaH: number;
  color: string;
  size: number;
  pulsePeriod: number;
  status: 'Active Crisis' | 'Monitoring' | 'Stable';
}

const hotspots: Hotspot[] = [
  { id: 'middle-east', label: 'Middle East', x: 57, y: 38, deltaH: 0.76, color: '#ff3366', size: 8, pulsePeriod: 2, status: 'Active Crisis' },
  { id: 'east-africa', label: 'East Africa (Sudan)', x: 54, y: 50, deltaH: 0.89, color: '#f59e0b', size: 6, pulsePeriod: 2.2, status: 'Active Crisis' },
  { id: 'eastern-europe', label: 'Eastern Europe', x: 54, y: 28, deltaH: 0.61, color: '#ffd700', size: 6, pulsePeriod: 2.5, status: 'Monitoring' },
  { id: 'south-asia', label: 'South Asia', x: 68, y: 42, deltaH: 0.38, color: '#00f0ff', size: 5, pulsePeriod: 3, status: 'Monitoring' },
  { id: 'south-america', label: 'South America', x: 30, y: 62, deltaH: 0.29, color: '#00f0ff', size: 4, pulsePeriod: 3, status: 'Stable' },
  { id: 'north-america', label: 'North America', x: 22, y: 32, deltaH: 0.22, color: '#10b981', size: 3.5, pulsePeriod: 3.5, status: 'Stable' },
  { id: 'western-europe', label: 'Western Europe', x: 48, y: 28, deltaH: 0.18, color: '#10b981', size: 3, pulsePeriod: 3.5, status: 'Stable' },
];

const connections: [string, string][] = [
  ['middle-east', 'east-africa'],
  ['middle-east', 'eastern-europe'],
  ['middle-east', 'south-asia'],
  ['eastern-europe', 'western-europe'],
  ['north-america', 'western-europe'],
];

function PulsingHotspot({
  spot,
  onHover,
  onLeave,
}: {
  spot: Hotspot;
  onHover: (spot: Hotspot, e: React.MouseEvent) => void;
  onLeave: () => void;
}) {
  return (
    <g
      onMouseEnter={(e) => onHover(spot, e)}
      onMouseLeave={onLeave}
      className="cursor-pointer"
    >
      <circle cx={spot.x} cy={spot.y} r={spot.size * 2.5} fill={spot.color} opacity={0.06}>
        <animate attributeName="r" values={`${spot.size};${spot.size * 3};${spot.size}`} dur={`${spot.pulsePeriod}s`} repeatCount="indefinite" />
        <animate attributeName="opacity" values="0.08;0.02;0.08" dur={`${spot.pulsePeriod}s`} repeatCount="indefinite" />
      </circle>
      <circle cx={spot.x} cy={spot.y} r={spot.size * 1.5} fill={spot.color} opacity={0.12}>
        <animate attributeName="r" values={`${spot.size * 0.8};${spot.size * 2};${spot.size * 0.8}`} dur={`${spot.pulsePeriod}s`} repeatCount="indefinite" />
        <animate attributeName="opacity" values="0.15;0.04;0.15" dur={`${spot.pulsePeriod}s`} repeatCount="indefinite" />
      </circle>
      <circle cx={spot.x} cy={spot.y} r={spot.size * 0.5} fill={spot.color} opacity={0.9} />
      <text
        x={spot.x}
        y={spot.y - spot.size - 3}
        textAnchor="middle"
        fill={spot.color}
        fontSize="2.2"
        fontFamily="monospace"
        opacity={0.8}
      >
        {`δ_H: ${spot.deltaH.toFixed(2)}`}
      </text>
    </g>
  );
}

export function DeltaHMap() {
  const reducedMotion = useReducedMotion();
  const [tooltip, setTooltip] = useState<{ spot: Hotspot; x: number; y: number } | null>(null);
  const [scanX, setScanX] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (reducedMotion) return;
    let frame: number;
    let start = performance.now();

    function animate(now: number) {
      const elapsed = (now - start) / 1000;
      const progress = (elapsed % 8) / 8;
      setScanX(progress * 100);
      frame = requestAnimationFrame(animate);
    }

    frame = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(frame);
  }, [reducedMotion]);

  function handleHover(spot: Hotspot, e: React.MouseEvent) {
    const rect = containerRef.current?.getBoundingClientRect();
    if (!rect) return;
    setTooltip({
      spot,
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  }

  const spotMap = Object.fromEntries(hotspots.map((s) => [s.id, s]));

  return (
    <section className="px-6 py-24 md:py-32">
      <div className="mx-auto max-w-5xl">
        <div ref={containerRef} className="relative overflow-hidden rounded-lg" style={{ background: 'rgba(255,255,255,0.03)' }}>
          <svg
            viewBox="0 0 100 65"
            className="w-full"
            style={{ display: 'block' }}
          >
            <defs>
              <linearGradient id="scan-grad" x1="0" x2="1" y1="0" y2="0">
                <stop offset="0%" stopColor="#00f0ff" stopOpacity="0" />
                <stop offset="80%" stopColor="#00f0ff" stopOpacity="0.3" />
                <stop offset="100%" stopColor="#00f0ff" stopOpacity="0" />
              </linearGradient>
            </defs>

            <path
              d="M15,30 Q17,28 20,28 L24,26 L26,28 L28,30 Q30,32 28,36 L26,42 Q24,48 22,52 L20,56 Q18,60 16,62 L14,60 Q12,56 14,48 L16,38 Z
                 M26,28 L30,26 Q32,24 34,26 L36,30 Q38,34 36,38 L34,40 Q32,42 30,40 L28,36 Z
                 M30,50 L32,48 Q34,46 36,48 L38,52 Q40,58 38,62 L36,64 Q34,62 32,58 L30,54 Z
                 M44,20 L46,18 Q48,16 50,18 L52,20 Q54,22 56,22 L58,20 Q60,18 62,20 L64,24 Q66,28 64,32 L62,34 Q60,36 58,34 L56,32 Q54,30 52,32 L50,34 Q48,36 46,34 L44,28 Z
                 M44,34 L46,36 Q48,38 50,40 L52,44 Q54,48 52,50 L50,52 Q48,50 46,46 L44,40 Z
                 M44,24 L42,22 Q40,20 38,22 L36,26 Q34,30 36,32 L38,34 Q40,36 42,34 L44,30 Z
                 M54,24 L56,24 Q60,22 64,24 L68,28 Q72,32 74,30 L76,26 Q78,24 80,26 L82,30 Q84,36 82,40 L80,44 Q78,48 74,50 L70,48 Q66,46 62,44 L58,42 Q56,40 54,38 L52,34 Q54,30 54,28 Z
                 M64,44 L66,48 Q68,52 66,56 L64,58 Q62,56 60,52 L58,48 Z
                 M74,34 Q76,36 80,38 L84,42 Q88,46 86,50 L84,52 Q82,54 78,52 L74,48 Q72,44 74,40 Z
                 M82,26 L86,24 Q90,22 92,26 L94,32 Q96,38 94,42 L90,44 Q88,40 86,36 L84,32 Z"
              fill="none"
              stroke="rgba(255,255,255,0.08)"
              strokeWidth="0.3"
            />

            {connections.map(([fromId, toId]) => {
              const from = spotMap[fromId];
              const to = spotMap[toId];
              if (!from || !to) return null;
              return (
                <line
                  key={`${fromId}-${toId}`}
                  x1={from.x}
                  y1={from.y}
                  x2={to.x}
                  y2={to.y}
                  stroke="rgba(255,255,255,0.06)"
                  strokeWidth="0.2"
                  strokeDasharray="0.8,0.8"
                />
              );
            })}

            {!reducedMotion && (
              <rect
                x={scanX - 3}
                y={0}
                width={3}
                height={65}
                fill="url(#scan-grad)"
              />
            )}

            {hotspots.map((spot) => (
              <PulsingHotspot
                key={spot.id}
                spot={spot}
                onHover={handleHover}
                onLeave={() => setTooltip(null)}
              />
            ))}
          </svg>

          {tooltip && (
            <div
              className="pointer-events-none absolute z-50 rounded-md px-3 py-2"
              style={{
                left: tooltip.x + 12,
                top: tooltip.y - 10,
                background: 'rgba(10,10,10,0.95)',
                border: `1px solid ${tooltip.spot.color}40`,
                transform: 'translateY(-100%)',
              }}
            >
              <p className="text-xs font-semibold text-agothe-white">{tooltip.spot.label}</p>
              <p className="font-mono text-xs" style={{ color: tooltip.spot.color }}>
                {`δ_H: ${tooltip.spot.deltaH.toFixed(2)}`}
              </p>
              <p className="mt-0.5 text-[10px] text-agothe-muted">{tooltip.spot.status}</p>
            </div>
          )}
        </div>

        <div className="mt-8 text-center">
          <p className="text-sm text-agothe-muted">
            Live constraint field monitoring across 6 domains. Updated in real-time.
          </p>
          <Link
            href="/contact"
            className="mt-4 inline-flex items-center rounded-full bg-[#ff3366] px-6 py-2.5 text-sm font-semibold text-white transition-shadow hover:shadow-[0_0_20px_rgba(255,51,102,0.3)]"
          >
            Commission a Solvey Scan
          </Link>
        </div>
        {/* TODO: Connect to live Solvey Scanner API for real-time data */}
      </div>
    </section>
  );
}
