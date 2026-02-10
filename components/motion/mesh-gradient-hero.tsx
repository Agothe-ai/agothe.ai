'use client';

import { useRef, useEffect, useCallback } from 'react';
import { useReducedMotion } from '@/hooks/use-reduced-motion';
import { useDeviceCapability } from '@/hooks/use-device-capability';
import { MOTION_CONFIG } from '@/lib/motion-config';

const VERTEX_SHADER = `
  attribute vec2 a_position;
  void main() {
    gl_Position = vec4(a_position, 0.0, 1.0);
  }
`;

const FRAGMENT_SHADER = `
  precision mediump float;
  uniform vec2 u_resolution;
  uniform float u_time;
  uniform float u_scroll;
  uniform vec3 u_accent;

  vec3 hexToRgb(float r, float g, float b) {
    return vec3(r, g, b);
  }

  float blob(vec2 uv, vec2 center, float radius) {
    float d = length(uv - center);
    return smoothstep(radius, 0.0, d);
  }

  void main() {
    vec2 uv = gl_FragCoord.xy / u_resolution;
    float t = u_time * 0.05;

    vec2 c1 = vec2(
      0.3 + 0.15 * sin(t * 0.7),
      0.7 + 0.1 * cos(t * 0.5)
    );
    vec2 c2 = vec2(
      0.7 + 0.12 * cos(t * 0.6),
      0.3 + 0.15 * sin(t * 0.8)
    );
    vec2 c3 = vec2(
      0.5 + 0.08 * sin(t * 0.4),
      0.5 + 0.1 * cos(t * 0.3)
    );

    float b1 = blob(uv, c1, 0.55 + 0.05 * sin(t * 0.9));
    float b2 = blob(uv, c2, 0.50 + 0.04 * cos(t * 0.7));
    float b3 = blob(uv, c3, 0.45 + 0.06 * sin(t * 0.5));

    float scrollBoost = 1.0 + u_scroll * 0.15;

    vec3 teal = u_accent;
    vec3 gold = vec3(1.0, 0.843, 0.0);
    vec3 violet = vec3(0.102, 0.0, 0.2);
    vec3 base = vec3(0.039, 0.039, 0.039);

    vec3 color = base;
    color += teal * b1 * 0.08 * scrollBoost;
    color += gold * b2 * 0.04;
    color += violet * b3 * 0.06;

    gl_FragColor = vec4(color, 1.0);
  }
`;

function hexToGLColor(hex: string): [number, number, number] {
  const r = parseInt(hex.slice(1, 3), 16) / 255;
  const g = parseInt(hex.slice(3, 5), 16) / 255;
  const b = parseInt(hex.slice(5, 7), 16) / 255;
  return [r, g, b];
}

interface MeshGradientHeroProps {
  accentColor?: string;
}

export function MeshGradientHero({ accentColor }: MeshGradientHeroProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const glRef = useRef<WebGLRenderingContext | null>(null);
  const programRef = useRef<WebGLProgram | null>(null);
  const animFrameRef = useRef<number>(0);
  const startTimeRef = useRef<number>(0);
  const scrollRef = useRef<number>(0);
  const accentRef = useRef<[number, number, number]>(hexToGLColor(accentColor || MOTION_CONFIG.colors.teal));
  const targetAccentRef = useRef<[number, number, number]>(accentRef.current);

  const reducedMotion = useReducedMotion();
  const capability = useDeviceCapability();

  const shouldUseWebGL = !reducedMotion && capability !== 'low';

  useEffect(() => {
    targetAccentRef.current = hexToGLColor(accentColor || MOTION_CONFIG.colors.teal);
  }, [accentColor]);

  const initGL = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const gl = canvas.getContext('webgl', { alpha: false, antialias: false, powerPreference: 'low-power' });
    if (!gl) return;

    glRef.current = gl;

    const vs = gl.createShader(gl.VERTEX_SHADER)!;
    gl.shaderSource(vs, VERTEX_SHADER);
    gl.compileShader(vs);

    const fs = gl.createShader(gl.FRAGMENT_SHADER)!;
    gl.shaderSource(fs, FRAGMENT_SHADER);
    gl.compileShader(fs);

    const program = gl.createProgram()!;
    gl.attachShader(program, vs);
    gl.attachShader(program, fs);
    gl.linkProgram(program);
    gl.useProgram(program);
    programRef.current = program;

    const buffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
    gl.bufferData(
      gl.ARRAY_BUFFER,
      new Float32Array([-1, -1, 1, -1, -1, 1, -1, 1, 1, -1, 1, 1]),
      gl.STATIC_DRAW
    );

    const posAttr = gl.getAttribLocation(program, 'a_position');
    gl.enableVertexAttribArray(posAttr);
    gl.vertexAttribPointer(posAttr, 2, gl.FLOAT, false, 0, 0);
  }, []);

  useEffect(() => {
    if (!shouldUseWebGL) return;

    initGL();
    startTimeRef.current = performance.now();

    function onScroll() {
      const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
      scrollRef.current = maxScroll > 0 ? window.scrollY / maxScroll : 0;
    }

    function resize() {
      const canvas = canvasRef.current;
      const gl = glRef.current;
      if (!canvas || !gl) return;

      const dpr = Math.min(window.devicePixelRatio, 1.5);
      const w = canvas.clientWidth;
      const h = canvas.clientHeight;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      gl.viewport(0, 0, canvas.width, canvas.height);
    }

    function render() {
      const gl = glRef.current;
      const program = programRef.current;
      if (!gl || !program) return;

      const elapsed = (performance.now() - startTimeRef.current) / 1000;

      for (let i = 0; i < 3; i++) {
        accentRef.current[i] += (targetAccentRef.current[i] - accentRef.current[i]) * 0.01;
      }

      const uRes = gl.getUniformLocation(program, 'u_resolution');
      const uTime = gl.getUniformLocation(program, 'u_time');
      const uScroll = gl.getUniformLocation(program, 'u_scroll');
      const uAccent = gl.getUniformLocation(program, 'u_accent');

      gl.uniform2f(uRes, gl.canvas.width, gl.canvas.height);
      gl.uniform1f(uTime, elapsed);
      gl.uniform1f(uScroll, scrollRef.current);
      gl.uniform3f(uAccent, accentRef.current[0], accentRef.current[1], accentRef.current[2]);

      gl.drawArrays(gl.TRIANGLES, 0, 6);
      animFrameRef.current = requestAnimationFrame(render);
    }

    resize();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', resize);
    animFrameRef.current = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(animFrameRef.current);
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', resize);
    };
  }, [shouldUseWebGL, initGL]);

  if (!shouldUseWebGL) {
    const accent = accentColor || MOTION_CONFIG.colors.teal;
    return (
      <div
        className="pointer-events-none absolute inset-0 z-0"
        style={{
          background: `radial-gradient(ellipse at 30% 20%, ${accent}14 0%, transparent 50%), radial-gradient(ellipse at 70% 80%, rgba(255,215,0,0.05) 0%, transparent 50%), #0a0a0a`,
        }}
      />
    );
  }

  return (
    <>
      <canvas
        ref={canvasRef}
        className="pointer-events-none absolute inset-0 z-0 h-full w-full"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute inset-0 z-[1]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.03'/%3E%3C/svg%3E")`,
          opacity: 0.03,
        }}
        aria-hidden="true"
      />
    </>
  );
}
