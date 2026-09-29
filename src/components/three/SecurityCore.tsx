"use client";

import { useEffect, useRef, useState, type RefObject } from "react";
import { Canvas } from "@react-three/fiber";
import { CORE_LABELS, CoreScene } from "@/components/three/CoreScene";
import { useThemeColors } from "@/hooks/useThemeColors";

type Props = {
  scrollProgress: RefObject<number>;
  onReady?: () => void;
};

/** WebGL shell for the Security Core. Stops rendering when off-screen or the tab is hidden. */
export function SecurityCore({ scrollProgress, onReady }: Props) {
  const colors = useThemeColors();
  const wrapRef = useRef<HTMLDivElement>(null);
  const labelRefs = useRef<(HTMLSpanElement | null)[]>([]);
  const [isActive, setIsActive] = useState(true);

  useEffect(() => {
    const wrap = wrapRef.current;
    if (!wrap) return;
    let isOnScreen = true;
    const update = () => setIsActive(isOnScreen && document.visibilityState === "visible");

    const observer = new IntersectionObserver(([entry]) => {
      isOnScreen = entry.isIntersecting;
      update();
    });
    observer.observe(wrap);
    document.addEventListener("visibilitychange", update);
    return () => {
      observer.disconnect();
      document.removeEventListener("visibilitychange", update);
    };
  }, []);

  return (
    <div ref={wrapRef} className="relative h-full w-full">
      <Canvas
        camera={{ position: [0, 0, 7.2], fov: 45 }}
        dpr={[1, 1.5]}
        gl={{ antialias: true, alpha: true, powerPreference: "low-power" }}
        frameloop={isActive ? "always" : "never"}
        onCreated={() => onReady?.()}
      >
        <CoreScene colors={colors} scrollProgress={scrollProgress} labelRefs={labelRefs} />
      </Canvas>
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        {CORE_LABELS.map((label, i) => (
          <span
            key={label.text}
            ref={(el) => {
              labelRefs.current[i] = el;
            }}
            className="absolute top-0 left-0 font-mono text-[10px] whitespace-nowrap text-foreground-muted opacity-0 transition-opacity duration-500"
          >
            {label.text}
          </span>
        ))}
      </div>
    </div>
  );
}
