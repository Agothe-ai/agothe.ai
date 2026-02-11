'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import { useReducedMotion } from '@/hooks/use-reduced-motion';

interface AINode {
  id: string;
  label: string;
  role: string;
  x: number;
  y: number;
}

const nodes: AINode[] = [
  { id: 'perplexity', label: 'Perplexity', role: 'Deep Research & Source Validation', x: 50, y: 12 },
  { id: 'claude', label: 'Claude', role: 'Safety Validation & Ethical Review', x: 83, y: 31 },
  { id: 'gemini', label: 'Gemini', role: 'Mathematical Formalization & Constraint Modeling', x: 83, y: 69 },
  { id: 'chatgpt', label: 'ChatGPT', role: 'Implementation & Actionable Strategy', x: 50, y: 88 },
  { id: 'grok', label: 'Grok', role: 'Cultural Signal Detection & Attention Analysis', x: 17, y: 69 },
  { id: 'nine', label: '9', role: 'Integration Hub & Synthesis Conductor', x: 17, y: 31 },
];

const connectionPairs: [number, number][] = [
  [0, 1], [1, 2], [2, 3], [3, 4], [4, 5], [5, 0],
  [0, 3], [1, 4], [2, 5],
];

const CYCLE_DURATION = 30;
const PULSE_DURATION = CYCLE_DURATION / 7;

export function CAPSNetwork({ className = '' }: { className?: string }) {
  const reducedMotion = useReducedMotion();
  const [activeNodeIdx, setActiveNodeIdx] = useState(-1);
  const [showConvergence, setShowConvergence] = useState(false);
  const [hoveredNode, setHoveredNode] = useState<string | null>(null);
  const [tooltipPos, setTooltipPos] = useState({ x: 0, y: 0 });
  const containerRef = useRef<HTMLDivElement>(null);
  const frameRef = useRef<number>(0);
  const startRef = useRef<number>(0);

  const animate = useCallback((now: number) => {
    if (!startRef.current) startRef.current = now;
    const elapsed = ((now - startRef.current) / 1000) % CYCLE_DURATION;

    const nodePhaseEnd = PULSE_DURATION * 6;

    if (elapsed < nodePhaseEnd) {
      const idx = Math.floor(elapsed / PULSE_DURATION);
      setActiveNodeIdx(idx);
      setShowConvergence(false);
    } else {
      setActiveNodeIdx(-1);
      setShowConvergence(true);
    }

    frameRef.current = requestAnimationFrame(animate);
  }, []);

  useEffect(() => {
    if (reducedMotion) {
      setShowConvergence(true);
      return;
    }

    frameRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(frameRef.current);
  }, [reducedMotion, animate]);

  function handleNodeHover(node: AINode, e: React.MouseEvent) {
    const rect = containerRef.current?.getBoundingClientRect();
    if (!rect) return;
    setHoveredNode(node.id);
    setTooltipPos({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  }

  const nodeRadius = 30;
  const svgSize = 300;

  function getNodePos(node: AINode) {
    return { x: (node.x / 100) * svgSize, y: (node.y / 100) * svgSize };
  }

  return (
    <div ref={containerRef} className={`relative mx-auto max-w-md ${className}`}>
      <svg
        viewBox={`0 0 ${svgSize} ${svgSize}`}
        className="w-full"
        role="img"
        aria-label="CAPS Network: 6 AI systems working in coordination"
      >
        {connectionPairs.map(([a, b], i) => {
          const from = getNodePos(nodes[a]);
          const to = getNodePos(nodes[b]);
          const isHighlighted =
            hoveredNode === nodes[a].id ||
            hoveredNode === nodes[b].id;
          const isActive = activeNodeIdx === a || activeNodeIdx === b;

          return (
            <g key={i}>
              <line
                x1={from.x}
                y1={from.y}
                x2={to.x}
                y2={to.y}
                stroke={isHighlighted ? '#00f0ff' : '#00f0ff'}
                strokeWidth={isHighlighted ? 1.5 : 1}
                opacity={
                  isHighlighted ? 0.6 : isActive ? 0.4 : hoveredNode ? 0.08 : 0.15
                }
                style={{ transition: 'opacity 0.3s' }}
              />
              {isActive && !reducedMotion && (
                <circle r="3" fill="#00f0ff" opacity="0.8">
                  <animateMotion
                    dur={`${PULSE_DURATION}s`}
                    repeatCount="1"
                    path={`M${from.x},${from.y} L${to.x},${to.y}`}
                  />
                  <animate
                    attributeName="opacity"
                    values="0.8;0.3;0.8"
                    dur={`${PULSE_DURATION}s`}
                    repeatCount="1"
                  />
                </circle>
              )}
            </g>
          );
        })}

        {showConvergence && (
          <circle
            cx={svgSize / 2}
            cy={svgSize / 2}
            r="20"
            fill="none"
            stroke="#ffd700"
            strokeWidth="2"
            opacity="0.4"
          >
            {!reducedMotion && (
              <>
                <animate
                  attributeName="r"
                  values="15;25;15"
                  dur="2s"
                  repeatCount="indefinite"
                />
                <animate
                  attributeName="opacity"
                  values="0.4;0.15;0.4"
                  dur="2s"
                  repeatCount="indefinite"
                />
              </>
            )}
          </circle>
        )}
        {showConvergence && (
          <text
            x={svgSize / 2}
            y={svgSize / 2 + 4}
            textAnchor="middle"
            fill="#ffd700"
            fontSize="10"
            fontFamily="monospace"
            opacity="0.7"
          >
            PULSE
          </text>
        )}

        {nodes.map((node, i) => {
          const pos = getNodePos(node);
          const isActive = i === activeNodeIdx;
          const isHovered = hoveredNode === node.id;
          const dimmed = hoveredNode !== null && !isHovered;

          return (
            <g
              key={node.id}
              onMouseEnter={(e) => handleNodeHover(node, e)}
              onMouseLeave={() => setHoveredNode(null)}
              className="cursor-pointer"
              style={{ transition: 'transform 0.3s' }}
            >
              <circle
                cx={pos.x}
                cy={pos.y}
                r={nodeRadius}
                fill="rgba(255,255,255,0.03)"
                stroke={isActive ? '#00f0ff' : 'rgba(0,240,255,0.2)'}
                strokeWidth={isActive ? 2 : 1}
                opacity={dimmed ? 0.3 : 1}
                style={{ transition: 'stroke 0.3s, opacity 0.3s' }}
              />
              {isActive && !reducedMotion && (
                <circle
                  cx={pos.x}
                  cy={pos.y}
                  r={nodeRadius}
                  fill="none"
                  stroke="#00f0ff"
                  strokeWidth="1"
                  opacity="0.3"
                >
                  <animate
                    attributeName="r"
                    values={`${nodeRadius};${nodeRadius + 8};${nodeRadius}`}
                    dur="1.5s"
                    repeatCount="indefinite"
                  />
                  <animate
                    attributeName="opacity"
                    values="0.3;0;0.3"
                    dur="1.5s"
                    repeatCount="indefinite"
                  />
                </circle>
              )}
              {isHovered && (
                <circle
                  cx={pos.x}
                  cy={pos.y}
                  r={nodeRadius + 2}
                  fill="none"
                  stroke="#00f0ff"
                  strokeWidth="1"
                  opacity="0.3"
                />
              )}
              <text
                x={pos.x}
                y={pos.y + 4}
                textAnchor="middle"
                fill={dimmed ? 'rgba(255,255,255,0.3)' : '#f5f5f5'}
                fontSize={node.id === 'nine' ? '14' : '10'}
                fontFamily="sans-serif"
                fontWeight="600"
                style={{ transition: 'fill 0.3s', pointerEvents: 'none' }}
              >
                {node.label}
              </text>
            </g>
          );
        })}
      </svg>

      {hoveredNode && (
        <div
          className="pointer-events-none absolute z-50 rounded-md px-3 py-2"
          style={{
            left: tooltipPos.x + 12,
            top: tooltipPos.y - 10,
            background: 'rgba(10,10,10,0.95)',
            border: '1px solid rgba(0,240,255,0.3)',
            transform: 'translateY(-100%)',
            maxWidth: '220px',
          }}
        >
          <p className="text-xs font-semibold text-agothe-white">
            {nodes.find((n) => n.id === hoveredNode)?.label}
          </p>
          <p className="mt-0.5 text-[10px] text-agothe-muted">
            {nodes.find((n) => n.id === hoveredNode)?.role}
          </p>
        </div>
      )}
    </div>
  );
}
