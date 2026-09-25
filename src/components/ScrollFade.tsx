"use client";

import { useEffect, useRef } from "react";

type Props = {
  children: React.ReactNode;
  /** Scroll distance (px) over which the effect fully completes. */
  fadeDistance?: number;
  className?: string;
};

/**
 * Apple-style "recede on scroll": as the page scrolls past the wrapped
 * content, it fades out, scales down slightly, and lifts — the
 * classic hero-shrinks-as-you-scroll pattern. Mutates the DOM directly
 * via a ref (no React state) so it stays smooth at 60fps without
 * re-rendering. Disabled under prefers-reduced-motion.
 */
export function ScrollFade({ children, fadeDistance = 500, className }: Props) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion) return;

    const node = ref.current;
    if (!node) return;

    let rafId: number | null = null;

    function apply() {
      rafId = null;
      const progress = Math.min(1, Math.max(0, window.scrollY / fadeDistance));
      if (node) {
        node.style.opacity = String(1 - progress);
        node.style.transform = `translateY(${progress * 32}px) scale(${1 - progress * 0.06})`;
      }
    }

    function handleScroll() {
      if (rafId === null) {
        rafId = requestAnimationFrame(apply);
      }
    }

    apply();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", handleScroll);
      if (rafId !== null) cancelAnimationFrame(rafId);
    };
  }, [fadeDistance]);

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}
