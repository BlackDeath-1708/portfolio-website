"use client";

import dynamic from "next/dynamic";
import { useEffect, useRef, useState, type RefObject } from "react";

const SecurityCore = dynamic(() => import("./SecurityCore").then((m) => m.SecurityCore), {
  ssr: false,
});

type Props = {
  scrollProgress: RefObject<number>;
  className?: string;
};

export function SecurityCoreVisual({ scrollProgress, className }: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const [shouldRender, setShouldRender] = useState(false);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion) return;
    // Skip entirely on small phones — not just CSS-hidden, since a hidden
    // canvas still burns GPU on a continuous render loop. Full 3D from
    // tablet width up, per the brief's own "simplified 3D on mobile" call.
    if (window.innerWidth < 640) return;

    const id = window.setTimeout(() => setShouldRender(true), 250);
    return () => window.clearTimeout(id);
  }, []);

  return (
    <div ref={ref} className={className} aria-hidden>
      {shouldRender && <SecurityCore scrollProgress={scrollProgress} />}
    </div>
  );
}
