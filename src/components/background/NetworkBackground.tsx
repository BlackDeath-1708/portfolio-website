"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import {
  drawField,
  fitNodes,
  stepNodes,
  stepPackets,
  type FieldColors,
  type FieldNode,
  type Packet,
  type Pointer,
} from "@/components/background/network-field";
import { isForcedDarkRoute } from "@/lib/theme-routes";

const MAX_DPR = 2;
const FRAME_MS = 1000 / 60;
const MAX_FRAME_STEP = 3;

function readColors(el: HTMLElement): FieldColors {
  const styles = getComputedStyle(el);
  return {
    line: styles.getPropertyValue("--foreground").trim() || "#f5f5f7",
    accent: styles.getPropertyValue("--accent").trim() || "#38bdf8",
  };
}

/**
 * Site-wide animated backdrop: a faded grid plus a drifting network of nodes
 * that links up to the pointer. Fixed behind all content; honours
 * prefers-reduced-motion by drawing a single static frame.
 */
export function NetworkBackground() {
  const forceDark = isForcedDarkRoute(usePathname());
  const rootRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const colorsRef = useRef<FieldColors>({ line: "#f5f5f7", accent: "#38bdf8" });
  const redrawRef = useRef<() => void>(() => {});

  // Re-read theme colors whenever the route's forced theme or the global theme changes.
  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    const sync = () => {
      colorsRef.current = readColors(root);
      redrawRef.current();
    };
    sync();
    const observer = new MutationObserver(sync);
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["data-theme"],
    });
    return () => observer.disconnect();
  }, [forceDark]);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) return;

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const pointer: Pointer = { x: 0, y: 0, active: false };
    let nodes: FieldNode[] = [];
    let packets: Packet[] = [];
    let width = 0;
    let height = 0;
    let frameId = 0;
    let lastTime = performance.now();

    const draw = () =>
      drawField(ctx, nodes, packets, pointer, colorsRef.current, width, height, window.scrollY);
    redrawRef.current = draw;

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, MAX_DPR);
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      nodes = fitNodes(nodes, width, height);
      draw();
    };

    const tick = (now: number) => {
      const dt = Math.min((now - lastTime) / FRAME_MS, MAX_FRAME_STEP);
      lastTime = now;
      stepNodes(nodes, width, height, dt);
      packets = stepPackets(packets, nodes, height, window.scrollY, dt);
      draw();
      frameId = requestAnimationFrame(tick);
    };

    const handlePointerMove = (event: PointerEvent) => {
      pointer.x = event.clientX;
      pointer.y = event.clientY;
      pointer.active = event.pointerType === "mouse";
    };
    const handlePointerLeave = () => {
      pointer.active = false;
    };

    resize();
    window.addEventListener("resize", resize);
    if (reducedMotion) {
      window.addEventListener("scroll", draw, { passive: true });
    } else {
      window.addEventListener("pointermove", handlePointerMove, { passive: true });
      document.documentElement.addEventListener("pointerleave", handlePointerLeave);
      frameId = requestAnimationFrame(tick);
    }

    return () => {
      cancelAnimationFrame(frameId);
      redrawRef.current = () => {};
      window.removeEventListener("resize", resize);
      window.removeEventListener("scroll", draw);
      window.removeEventListener("pointermove", handlePointerMove);
      document.documentElement.removeEventListener("pointerleave", handlePointerLeave);
    };
  }, []);

  return (
    <div
      ref={rootRef}
      aria-hidden
      data-theme={forceDark ? "dark" : undefined}
      className="pointer-events-none fixed inset-0 -z-10 overflow-hidden bg-background"
    >
      <div className="network-grid absolute inset-0" />
      <canvas ref={canvasRef} className="absolute inset-0 h-full w-full" />
      <div className="network-vignette absolute inset-0" />
    </div>
  );
}
