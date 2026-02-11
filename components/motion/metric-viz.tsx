'use client';

import { useRef, useEffect, useState } from 'react';
import { useReducedMotion } from '@/hooks/use-reduced-motion';

type MetricType = 'coherence' | 'speed' | 'network' | 'research';

interface MetricVizProps {
  type: MetricType;
  className?: string;
}

function CoherenceRing() {
  return (
    <svg width="40" height="40" viewBox="0 0 40 40" aria-hidden="true">
      <circle
        cx="20"
        cy="20"
        r="16"
        fill="none"
        stroke="rgba(0,240,255,0.15)"
        strokeWidth="2.5"
      />
      <circle
        cx="20"
        cy="20"
        r="16"
        fill="none"
        stroke="#00f0ff"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeDasharray="100.53"
        strokeDashoffset="100.53"
        transform="rotate(-90 20 20)"
      >
        <animate
          attributeName="stroke-dashoffset"
          values="100.53;10.05;10.05;100.53"
          keyTimes="0;0.4;0.8;1"
          dur="4s"
          repeatCount="indefinite"
        />
      </circle>
      <text
        x="20"
        y="22"
        textAnchor="middle"
        fill="#00f0ff"
        fontSize="8"
        fontFamily="monospace"
        opacity="0.9"
      >
        .90
      </text>
    </svg>
  );
}

function SpeedSweep() {
  return (
    <svg width="40" height="40" viewBox="0 0 40 40" aria-hidden="true">
      <circle
        cx="20"
        cy="20"
        r="15"
        fill="none"
        stroke="rgba(0,240,255,0.15)"
        strokeWidth="1.5"
      />
      {[0, 30, 60, 90, 120, 150, 180, 210, 240, 270, 300, 330].map((deg) => (
        <line
          key={deg}
          x1="20"
          y1="7"
          x2="20"
          y2="9"
          stroke="rgba(0,240,255,0.3)"
          strokeWidth="0.8"
          transform={`rotate(${deg} 20 20)`}
        />
      ))}
      <circle cx="20" cy="20" r="1.5" fill="#00f0ff" />
      <line
        x1="20"
        y1="20"
        x2="20"
        y2="10"
        stroke="#00f0ff"
        strokeWidth="1.5"
        strokeLinecap="round"
      >
        <animateTransform
          attributeName="transform"
          type="rotate"
          from="0 20 20"
          to="360 20 20"
          dur="1.5s"
          repeatCount="indefinite"
        />
      </line>
      <circle cx="20" cy="20" r="17" fill="none" stroke="#00f0ff" strokeWidth="0.5" opacity="0.3">
        <animate
          attributeName="r"
          values="15;18;15"
          dur="1.5s"
          repeatCount="indefinite"
        />
        <animate
          attributeName="opacity"
          values="0.3;0.05;0.3"
          dur="1.5s"
          repeatCount="indefinite"
        />
      </circle>
    </svg>
  );
}

function OrbitalNodes() {
  const nodePositions = [0, 60, 120, 180, 240, 300].map((deg) => {
    const rad = (deg * Math.PI) / 180;
    return {
      x: 20 + 12 * Math.cos(rad),
      y: 20 + 12 * Math.sin(rad),
    };
  });

  return (
    <svg width="40" height="40" viewBox="0 0 40 40" aria-hidden="true">
      <circle
        cx="20"
        cy="20"
        r="12"
        fill="none"
        stroke="rgba(0,240,255,0.08)"
        strokeWidth="0.5"
      />
      {nodePositions.map((pos, i) =>
        nodePositions.slice(i + 1).map((pos2, j) => (
          <line
            key={`${i}-${j}`}
            x1={pos.x}
            y1={pos.y}
            x2={pos2.x}
            y2={pos2.y}
            stroke="rgba(0,240,255,0.1)"
            strokeWidth="0.3"
          >
            <animate
              attributeName="stroke-opacity"
              values="0.05;0.4;0.05"
              dur={`${3 + i * 0.5}s`}
              begin={`${j * 0.3}s`}
              repeatCount="indefinite"
            />
          </line>
        ))
      )}
      {nodePositions.map((pos, i) => (
        <circle key={i} cx={pos.x} cy={pos.y} r="2" fill="#00f0ff" opacity="0.8">
          <animate
            attributeName="opacity"
            values="0.5;1;0.5"
            dur="2s"
            begin={`${i * 0.33}s`}
            repeatCount="indefinite"
          />
        </circle>
      ))}
      <circle cx="20" cy="20" r="2.5" fill="#ffd700">
        <animate
          attributeName="r"
          values="2;3;2"
          dur="3s"
          repeatCount="indefinite"
        />
        <animate
          attributeName="opacity"
          values="0.7;1;0.7"
          dur="3s"
          repeatCount="indefinite"
        />
      </circle>
    </svg>
  );
}

function DataStream() {
  const dots = Array.from({ length: 14 }, (_, i) => ({
    x: 8 + Math.random() * 24,
    delay: i * 0.3,
    speed: 1.5 + Math.random() * 1.5,
    isGold: i % 5 === 0,
  }));

  return (
    <svg width="40" height="40" viewBox="0 0 40 40" aria-hidden="true">
      <defs>
        <clipPath id="stream-clip">
          <rect x="4" y="4" width="32" height="32" rx="4" />
        </clipPath>
      </defs>
      <g clipPath="url(#stream-clip)">
        {dots.map((dot, i) => (
          <circle
            key={i}
            cx={dot.x}
            r={dot.isGold ? 1.5 : 1}
            fill={dot.isGold ? '#ffd700' : '#00f0ff'}
            opacity={dot.isGold ? 0.9 : 0.5}
          >
            <animate
              attributeName="cy"
              values="38;2"
              dur={`${dot.speed}s`}
              begin={`${dot.delay}s`}
              repeatCount="indefinite"
            />
            <animate
              attributeName="opacity"
              values="0;0.8;0.8;0"
              keyTimes="0;0.1;0.85;1"
              dur={`${dot.speed}s`}
              begin={`${dot.delay}s`}
              repeatCount="indefinite"
            />
          </circle>
        ))}
      </g>
    </svg>
  );
}

function StaticIcon({ type }: { type: MetricType }) {
  const icons: Record<MetricType, React.ReactNode> = {
    coherence: (
      <svg width="40" height="40" viewBox="0 0 40 40" aria-hidden="true">
        <circle cx="20" cy="20" r="16" fill="none" stroke="rgba(0,240,255,0.3)" strokeWidth="2.5" />
        <circle cx="20" cy="20" r="16" fill="none" stroke="#00f0ff" strokeWidth="2.5" strokeDasharray="90.48 10.05" strokeLinecap="round" transform="rotate(-90 20 20)" />
      </svg>
    ),
    speed: (
      <svg width="40" height="40" viewBox="0 0 40 40" aria-hidden="true">
        <circle cx="20" cy="20" r="15" fill="none" stroke="rgba(0,240,255,0.2)" strokeWidth="1.5" />
        <line x1="20" y1="20" x2="20" y2="8" stroke="#00f0ff" strokeWidth="1.5" strokeLinecap="round" />
        <circle cx="20" cy="20" r="1.5" fill="#00f0ff" />
      </svg>
    ),
    network: (
      <svg width="40" height="40" viewBox="0 0 40 40" aria-hidden="true">
        {[0, 60, 120, 180, 240, 300].map((deg) => {
          const rad = (deg * Math.PI) / 180;
          return <circle key={deg} cx={20 + 12 * Math.cos(rad)} cy={20 + 12 * Math.sin(rad)} r="2" fill="#00f0ff" opacity="0.7" />;
        })}
        <circle cx="20" cy="20" r="2.5" fill="#ffd700" opacity="0.8" />
      </svg>
    ),
    research: (
      <svg width="40" height="40" viewBox="0 0 40 40" aria-hidden="true">
        {[12, 16, 20, 24, 28].map((x) => (
          <circle key={x} cx={x} cy="20" r="1" fill="#00f0ff" opacity="0.6" />
        ))}
      </svg>
    ),
  };
  return <>{icons[type]}</>;
}

export function MetricViz({ type, className = '' }: MetricVizProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    if (!ref.current) return;
    const el = ref.current;
    const observer = new IntersectionObserver(
      ([entry]) => setVisible(entry.isIntersecting),
      { threshold: 0.5 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  if (reducedMotion) {
    return (
      <div ref={ref} className={className}>
        <StaticIcon type={type} />
      </div>
    );
  }

  return (
    <div ref={ref} className={className} style={{ opacity: visible ? 1 : 0, transition: 'opacity 0.3s' }}>
      {visible && (
        <>
          {type === 'coherence' && <CoherenceRing />}
          {type === 'speed' && <SpeedSweep />}
          {type === 'network' && <OrbitalNodes />}
          {type === 'research' && <DataStream />}
        </>
      )}
      {!visible && <StaticIcon type={type} />}
    </div>
  );
}
