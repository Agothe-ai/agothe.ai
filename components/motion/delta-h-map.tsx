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
        {`\u03B4_H: ${spot.deltaH.toFixed(2)}`}
      </text>
    </g>
  );
}

export function DeltaHMap() {
  // Component neutralized - animated graphic removed
  return null;
}
