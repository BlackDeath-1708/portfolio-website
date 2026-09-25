"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

export type NetworkSceneProps = {
  mode: "cloud" | "pipeline";
  count?: number;
  travelerCount?: number;
  interactive?: boolean;
};

type Point = [number, number, number];
type Edge = [number, number];

function fibonacciSphere(count: number, radius: number): Point[] {
  const points: Point[] = [];
  const goldenAngle = Math.PI * (3 - Math.sqrt(5));
  for (let i = 0; i < count; i++) {
    const y = count === 1 ? 0 : 1 - (i / (count - 1)) * 2;
    const r = Math.sqrt(Math.max(0, 1 - y * y));
    const theta = goldenAngle * i;
    points.push([Math.cos(theta) * r * radius, y * radius, Math.sin(theta) * r * radius]);
  }
  return points;
}

function distance(a: Point, b: Point): number {
  return Math.hypot(a[0] - b[0], a[1] - b[1], a[2] - b[2]);
}

function nearestNeighborEdges(points: Point[], k: number): Edge[] {
  const edgeSet = new Set<string>();
  for (let i = 0; i < points.length; i++) {
    const dists = points
      .map((p, j): [number, number] => [j, distance(points[i], p)])
      .filter(([j]) => j !== i)
      .sort((a, b) => a[1] - b[1]);
    for (let n = 0; n < k && n < dists.length; n++) {
      const j = dists[n][0];
      const key = i < j ? `${i}-${j}` : `${j}-${i}`;
      edgeSet.add(key);
    }
  }
  return Array.from(edgeSet).map((key) => key.split("-").map(Number) as Edge);
}

function pipelinePositions(count: number): Point[] {
  const points: Point[] = [];
  const spacing = 2.6;
  const totalWidth = (count - 1) * spacing;
  for (let i = 0; i < count; i++) {
    const x = i * spacing - totalWidth / 2;
    const y = Math.sin(i * 0.9) * 0.4;
    points.push([x, y, 0]);
  }
  return points;
}

function useAccentColor(): string {
  const [color, setColor] = useState("#38bdf8");

  useEffect(() => {
    function readColor() {
      const value = getComputedStyle(document.documentElement).getPropertyValue("--accent").trim();
      if (value) setColor(value);
    }
    readColor();
    const media = window.matchMedia("(prefers-color-scheme: dark)");
    media.addEventListener("change", readColor);
    return () => media.removeEventListener("change", readColor);
  }, []);

  return color;
}

function Scene({ mode, count = 24, travelerCount = 5, interactive = true }: NetworkSceneProps) {
  const accent = useAccentColor();
  const groupRef = useRef<THREE.Group>(null);

  const { positions, edges } = useMemo(() => {
    if (mode === "pipeline") {
      const positions = pipelinePositions(count);
      const edges: Edge[] = [];
      for (let i = 0; i < positions.length - 1; i++) edges.push([i, i + 1]);
      return { positions, edges };
    }
    const positions = fibonacciSphere(count, 3.2);
    const edges = nearestNeighborEdges(positions, 2);
    return { positions, edges };
  }, [mode, count]);

  const edgeGeometry = useMemo(() => {
    const geometry = new THREE.BufferGeometry();
    const points: number[] = [];
    edges.forEach(([a, b]) => {
      points.push(...positions[a], ...positions[b]);
    });
    geometry.setAttribute("position", new THREE.Float32BufferAttribute(points, 3));
    return geometry;
  }, [edges, positions]);

  const travelers = useRef<{ progress: number; speed: number }[]>(null);
  if (travelers.current === null) {
    travelers.current = Array.from({ length: travelerCount }, (_, i) => ({
      progress: (i / Math.max(travelerCount, 1)) * Math.max(edges.length, 1),
      speed: 0.5 + ((i * 37) % 10) / 30,
    }));
  }

  const pulseRefs = useRef<(THREE.Mesh | null)[]>([]);

  useFrame((_, delta) => {
    if (interactive && groupRef.current && mode === "cloud") {
      groupRef.current.rotation.y += delta * 0.05;
    }

    if (edges.length === 0 || !travelers.current) return;

    travelers.current.forEach((traveler, i) => {
      traveler.progress += delta * traveler.speed;
      if (traveler.progress >= edges.length) {
        traveler.progress =
          mode === "pipeline" ? 0 : (traveler.progress * 2.71828) % edges.length;
      }

      const edgeIndex = Math.floor(traveler.progress) % edges.length;
      const t = traveler.progress % 1;
      const [a, b] = edges[edgeIndex];
      const pa = positions[a];
      const pb = positions[b];

      const mesh = pulseRefs.current[i];
      if (mesh) {
        mesh.position.set(
          pa[0] + (pb[0] - pa[0]) * t,
          pa[1] + (pb[1] - pa[1]) * t,
          pa[2] + (pb[2] - pa[2]) * t,
        );
      }
    });
  });

  return (
    <group ref={groupRef}>
      <lineSegments geometry={edgeGeometry}>
        <lineBasicMaterial color={accent} transparent opacity={0.25} />
      </lineSegments>
      {positions.map((position, i) => (
        <mesh key={i} position={position}>
          <sphereGeometry args={[0.045, 8, 8]} />
          <meshBasicMaterial color={accent} transparent opacity={0.6} />
        </mesh>
      ))}
      {Array.from({ length: travelerCount }, (_, i) => (
        <mesh
          key={i}
          ref={(el) => {
            pulseRefs.current[i] = el;
          }}
        >
          <sphereGeometry args={[0.07, 8, 8]} />
          <meshBasicMaterial color={accent} />
        </mesh>
      ))}
    </group>
  );
}

export function NetworkScene(props: NetworkSceneProps) {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    function handleVisibility() {
      setIsVisible(document.visibilityState === "visible");
    }
    document.addEventListener("visibilitychange", handleVisibility);
    return () => document.removeEventListener("visibilitychange", handleVisibility);
  }, []);

  return (
    <Canvas
      camera={{ position: [0, 0, 7], fov: 45 }}
      dpr={[1, 1.5]}
      gl={{ antialias: false, alpha: true, powerPreference: "low-power" }}
      frameloop={isVisible ? "always" : "never"}
    >
      <Scene {...props} />
    </Canvas>
  );
}
