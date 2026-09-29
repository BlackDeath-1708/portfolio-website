"use client";

import { useSyncExternalStore } from "react";

const subscribe = () => () => {};

/** True after hydration. Hydration-safe without a setState-in-effect round trip. */
export function useIsClient(): boolean {
  return useSyncExternalStore(
    subscribe,
    () => true,
    () => false,
  );
}
