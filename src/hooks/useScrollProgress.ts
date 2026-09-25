"use client";

import { useEffect, useRef } from "react";

/**
 * Tracks scroll position as a 0-1 progress ref over `distance` px, updated
 * via rAF. Returns a ref (not state) so consumers — typically a
 * useFrame loop in a Three.js scene — can read it every frame without
 * forcing a React re-render.
 */
export function useScrollProgress(distance: number) {
  const progress = useRef(0);

  useEffect(() => {
    let rafId: number | null = null;

    function update() {
      rafId = null;
      progress.current = Math.min(1, Math.max(0, window.scrollY / distance));
    }

    function handleScroll() {
      if (rafId === null) rafId = requestAnimationFrame(update);
    }

    update();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", handleScroll);
      if (rafId !== null) cancelAnimationFrame(rafId);
    };
  }, [distance]);

  return progress;
}
