"use client";

import dynamic from "next/dynamic";
import { useEffect, useState, type RefObject } from "react";
import { CoreFallback } from "@/components/three/CoreFallback";

const SecurityCore = dynamic(() => import("./SecurityCore").then((m) => m.SecurityCore), {
  ssr: false,
});

const MIN_3D_WIDTH = 640;
const START_DELAY_MS = 250;

type Props = {
  scrollProgress: RefObject<number>;
  className?: string;
};

/**
 * Progressive Security Core: the SVG fallback renders immediately; on
 * tablet/desktop without reduced motion, the WebGL scene lazy-loads after
 * first paint and crossfades in over it.
 */
export function SecurityCoreVisual({ scrollProgress, className }: Props) {
  const [shouldRender3D, setShouldRender3D] = useState(false);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    // Skip WebGL entirely on phones — a hidden canvas would still burn GPU.
    if (prefersReducedMotion || window.innerWidth < MIN_3D_WIDTH) return;
    const id = window.setTimeout(() => setShouldRender3D(true), START_DELAY_MS);
    return () => window.clearTimeout(id);
  }, []);

  return (
    <div className={`relative ${className ?? ""}`} aria-hidden>
      <CoreFallback
        className={`absolute inset-0 m-auto h-full w-full max-w-[520px] transition-opacity duration-700 ${
          isReady ? "opacity-0" : "opacity-100"
        }`}
      />
      {shouldRender3D && (
        <div
          className={`absolute inset-0 transition-opacity duration-1000 ${isReady ? "opacity-100" : "opacity-0"}`}
        >
          <SecurityCore scrollProgress={scrollProgress} onReady={() => setIsReady(true)} />
        </div>
      )}
    </div>
  );
}
