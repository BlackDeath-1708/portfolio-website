"use client";

import { useMemo, useSyncExternalStore } from "react";

export type ThemeColors = {
  accent: string;
  violet: string;
  warning: string;
};

const FALLBACK = "#00d1ff|#7c3aed|#f59e0b";

function subscribe(onChange: () => void): () => void {
  const observer = new MutationObserver(onChange);
  observer.observe(document.documentElement, { attributes: true, attributeFilter: ["data-theme"] });
  return () => observer.disconnect();
}

// A joined string keeps the snapshot a stable primitive between renders.
function getSnapshot(): string {
  const styles = getComputedStyle(document.documentElement);
  const read = (name: string) => styles.getPropertyValue(name).trim();
  return `${read("--accent")}|${read("--violet")}|${read("--warning")}`;
}

/** Live theme colors from CSS custom properties, for canvas/WebGL consumers. */
export function useThemeColors(): ThemeColors {
  const snapshot = useSyncExternalStore(subscribe, getSnapshot, () => FALLBACK);
  return useMemo(() => {
    const [accent, violet, warning] = snapshot.split("|");
    const [fallbackAccent, fallbackViolet, fallbackWarning] = FALLBACK.split("|");
    return {
      accent: accent || fallbackAccent,
      violet: violet || fallbackViolet,
      warning: warning || fallbackWarning,
    };
  }, [snapshot]);
}
