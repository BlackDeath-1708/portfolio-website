"use client";

import { SecurityCoreVisual } from "@/components/three/SecurityCoreVisual";
import { useScrollProgress } from "@/hooks/useScrollProgress";

/**
 * Owns the hero's scroll-progress tracking and renders the 3D Security
 * Core behind the hero text, offset toward the right so it doesn't
 * collide with the left-aligned headline.
 */
export function HeroScene() {
  const scrollProgress = useScrollProgress(600);

  return (
    <SecurityCoreVisual
      scrollProgress={scrollProgress}
      className="pointer-events-none absolute inset-y-0 right-[-10%] left-[35%] sm:left-[45%]"
    />
  );
}
