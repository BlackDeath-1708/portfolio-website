"use client";

import { SecurityCoreVisual } from "@/components/three/SecurityCoreVisual";
import { useScrollProgress } from "@/hooks/useScrollProgress";

const SCROLL_RANGE_PX = 600;

/** Owns the hero's scroll-progress tracking and renders the Security Core. */
export function HeroScene({ className }: { className?: string }) {
  const scrollProgress = useScrollProgress(SCROLL_RANGE_PX);
  return <SecurityCoreVisual scrollProgress={scrollProgress} className={className} />;
}
