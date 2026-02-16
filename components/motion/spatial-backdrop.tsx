"use client";

import dynamic from "next/dynamic";
import { usePathname, useSearchParams } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import { useScroll } from "framer-motion";
import { useDeviceCapability } from "@/hooks/use-device-capability";
import { useReducedMotion } from "@/hooks/use-reduced-motion";

const SpatialBackdropCanvas = dynamic(
  () => import("@/components/motion/spatial-backdrop-canvas"),
  { ssr: false }
);

type BackdropMode = "on" | "off";

function readStoredMode(): BackdropMode | null {
  try {
    const v = window.localStorage.getItem("agothe_backdrop");
    return v === "on" || v === "off" ? v : null;
  } catch {
    return null;
  }
}

function writeStoredMode(mode: BackdropMode) {
  try {
    window.localStorage.setItem("agothe_backdrop", mode);
  } catch {
    // ignore
  }
}

export function SpatialBackdrop() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const { scrollYProgress } = useScroll();
  const capability = useDeviceCapability();
  const reduced = useReducedMotion();

  const [mounted, setMounted] = useState(false);
  const [mode, setMode] = useState<BackdropMode>("off");

  useEffect(() => setMounted(true), []);

  useEffect(() => {
    if (!mounted) return;

    const qp = searchParams?.get("backdrop");
    if (qp === "on" || qp === "off") {
      setMode(qp);
      writeStoredMode(qp);
      return;
    }

    const stored = readStoredMode();
    if (stored) {
      setMode(stored);
      return;
    }

    const envDefault =
      (process.env.NEXT_PUBLIC_AGOTHE_BACKDROP_DEFAULT as BackdropMode | undefined) ??
      "on";
    setMode(envDefault === "off" ? "off" : "on");
  }, [mounted, searchParams]);

  useEffect(() => {
    if (!mounted) return;

    const onKeyDown = (e: KeyboardEvent) => {
      if (!e.shiftKey) return;
      if (e.key.toLowerCase() !== "b") return;

      setMode((prev) => {
        const next: BackdropMode = prev === "on" ? "off" : "on";
        writeStoredMode(next);
        return next;
      });
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [mounted]);

  const isHome = pathname === "/";

  const webglEnabled = useMemo(() => {
    if (!mounted) return false;
    if (!isHome) return false;
    if (mode !== "on") return false;
    if (reduced) return false;
    if (capability === "low") return false;
    return true;
  }, [mounted, isHome, mode, reduced, capability]);

  return (
    <div
      aria-hidden
      className="pointer-events-none fixed inset-0 -z-10 overflow-hidden"
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_25%,rgba(0,240,255,0.12)_0%,transparent_55%),radial-gradient(circle_at_80%_65%,rgba(255,215,0,0.10)_0%,transparent_62%),radial-gradient(circle_at_50%_95%,rgba(148,163,184,0.10)_0%,transparent_65%)]" />
      <div className="absolute inset-0 bg-[linear-gradient(to_bottom,rgba(10,10,10,0.95)_0%,rgba(10,10,10,0.55)_18%,rgba(10,10,10,0.40)_50%,rgba(10,10,10,0.72)_78%,rgba(10,10,10,0.96)_100%)]" />
      <div className="absolute inset-0 opacity-[0.08] [background-image:linear-gradient(to_right,rgba(148,163,184,0.18)_1px,transparent_1px),linear-gradient(to_bottom,rgba(148,163,184,0.18)_1px,transparent_1px)] [background-size:72px_72px,72px_72px]" />
      <div className="absolute inset-0 opacity-[0.06] [background-image:url('data:image/svg+xml,%3Csvg xmlns=%22http://www.w3.org/2000/svg%22 width=%22120%22 height=%22120%22 viewBox=%220 0 120 120%22%3E%3Cfilter id=%22n%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.9%22 numOctaves=%222%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22120%22 height=%22120%22 filter=%22url(%23n)%22 opacity=%220.35%22/%3E%3C/svg%3E')]" />

      {webglEnabled ? (
        <SpatialBackdropCanvas scrollYProgress={scrollYProgress} />
      ) : null}
    </div>
  );
}
