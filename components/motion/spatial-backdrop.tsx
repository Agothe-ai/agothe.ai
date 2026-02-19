'use client';

// SpatialBackdrop - ambient only, zero dark overlay
// Dark gradient removed so hero image shows through fully

export function SpatialBackdrop() {
  return (
    <div
      aria-hidden
      className="pointer-events-none fixed inset-0 z-10 overflow-hidden"
    >
      {/* Subtle teal ambient glow - top left */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_25%,rgba(0,240,255,0.06)_0%,transparent_55%),radial-gradient(circle_at_80%_65%,rgba(255,215,0,0.03)_0%,transparent_62%),radial-gradient(circle_at_50%_95%,rgba(148,163,184,0.04)_0%,transparent_65%)]" />

      {/* Subtle noise texture for depth */}
      <div className="absolute inset-0 opacity-[0.03] [background-image:url('data:image/svg+xml,%3Csvg xmlns=%22http://www.w3.org/2000/svg%22 width=%22120%22 height=%22120%22 viewBox=%220 0 120 120%22%3E%3Cfilter id=%22n%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.9%22 numOctaves=%222%22 stitchTiles=%22stitch%22/%3E%3Crect width=%22120%22 height=%22120%22 filter=%22url(%23n)%22 opacity=%220.35%22/%3E%3C/svg%3E')] [background-size:72px_72px,72px_72px]" />
    </div>
  );
}
