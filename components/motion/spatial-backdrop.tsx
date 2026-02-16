"use client";

// SILENT WEBGL KILL - Neutralized per V1 design requirements
// This component now returns only static dark gradients, no WebGL

export function SpatialBackdrop() {
  // SILENT WEBGL KILL - Neutralized per V1 design requirements
  // Returns static dark background with subtle gradients instead of WebGL
  return (
    <div
      aria-hidden
      className="pointer-events-none fixed inset-0 -z-10 overflow-hidden"
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_25%,rgba(0,240,255,0.12)_0%,transparent_55%),radial-gradient(circle_at_80%_65%,rgba(255,215,0,0.10)_0%,transparent_62%),radial-gradient(circle_at_50%_95%,rgba(148,163,184,0.10)_0%,transparent_65%)]" />
      <div className="absolute inset-0 bg-[linear-gradient(to_bottom,rgba(10,10,10,0.95)_0%,rgba(10,10,10,0.55)_18%,rgba(10,10,10,0.40)_50%,rgba(10,10,10,0.72)_78%,rgba(10,10,10,0.96)_100%)]" />
      <div className="absolute inset-0 opacity-[0.08] [background-image:linear-gradient(to_right,rgba(148,163,184,0.18)_1px,transparent_1px),linear-gradient(to_bottom,rgba(148,163,184,0.18)_1px,transparent_1px)] [background-size:72px_72px,72px_72px]" />
      <div className="absolute inset-0 opacity-[0.06] [background-image:url('data:image/svg+xml,%3Csvg xmlns=%22http://www.w3.org/2000/svg%22 width=%22120%22 height=%22120%22 viewBox=%220 0 120 120%22%3E%3Cfilter id=%22n%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.9%22 numOctaves=%222%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22120%22 height=%22120%22 filter=%22url(%23n)%22 opacity=%220.35%22/%3E%3C/svg%3E')]" />
    </div>
  );
}
