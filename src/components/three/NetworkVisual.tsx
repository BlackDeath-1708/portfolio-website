"use client";

import dynamic from "next/dynamic";
import { useEffect, useRef, useState } from "react";
import type { NetworkSceneProps } from "./NetworkScene";

const NetworkScene = dynamic(() => import("./NetworkScene").then((m) => m.NetworkScene), {
  ssr: false,
});

type Props = NetworkSceneProps & {
  className?: string;
  /** Skip the IntersectionObserver gate and mount shortly after idle — for persistent, always-visible backgrounds. */
  eager?: boolean;
  /** Below this viewport width, skip mounting entirely (not just CSS-hide) — a hidden canvas still burns GPU/battery on a continuous render loop. */
  minWidth?: number;
};

const MOBILE_BREAKPOINT = 640;

export function NetworkVisual({
  className,
  eager = false,
  minWidth = 0,
  count = 24,
  travelerCount = 5,
  ...sceneProps
}: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const [shouldRender, setShouldRender] = useState(false);
  const [isNarrow, setIsNarrow] = useState(false);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion) return;

    if (window.innerWidth < minWidth) return;

    function activate() {
      setIsNarrow(window.innerWidth < MOBILE_BREAKPOINT);
      setShouldRender(true);
    }

    if (eager) {
      const id = window.setTimeout(activate, 300);
      return () => window.clearTimeout(id);
    }

    const node = ref.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          activate();
          observer.disconnect();
        }
      },
      { rootMargin: "200px" },
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, [eager, minWidth]);

  const effectiveCount = isNarrow ? Math.ceil(count / 2) : count;
  const effectiveTravelerCount = isNarrow ? Math.max(1, Math.ceil(travelerCount / 2)) : travelerCount;

  return (
    <div ref={ref} className={className} aria-hidden>
      {shouldRender && (
        <NetworkScene {...sceneProps} count={effectiveCount} travelerCount={effectiveTravelerCount} />
      )}
    </div>
  );
}
