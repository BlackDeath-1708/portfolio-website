"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";

function useAccentColor(): string {
  const [color, setColor] = useState("#38bdf8");
  useEffect(() => {
    function read() {
      const value = getComputedStyle(document.documentElement).getPropertyValue("--accent").trim();
      if (value) setColor(value);
    }
    read();
    const media = window.matchMedia("(prefers-color-scheme: dark)");
    media.addEventListener("change", read);
    return () => media.removeEventListener("change", read);
  }, []);
  return color;
}

type CoreProps = {
  scrollProgress: React.RefObject<number>;
};

function Core({ scrollProgress }: CoreProps) {
  const accent = useAccentColor();
  const groupRef = useRef<THREE.Group>(null);
  const ringA = useRef<THREE.Mesh>(null);
  const ringB = useRef<THREE.Mesh>(null);
  const pulseRefs = useRef<(THREE.Mesh | null)[]>([]);
  const mouse = useRef({ x: 0, y: 0 });
  const { viewport } = useThree();

  useEffect(() => {
    function handlePointerMove(e: PointerEvent) {
      mouse.current.x = (e.clientX / window.innerWidth) * 2 - 1;
      mouse.current.y = (e.clientY / window.innerHeight) * 2 - 1;
    }
    window.addEventListener("pointermove", handlePointerMove);
    return () => window.removeEventListener("pointermove", handlePointerMove);
  }, []);

  const icosahedron = useMemo(() => new THREE.IcosahedronGeometry(1.4, 1), []);
  const edges = useMemo(() => new THREE.EdgesGeometry(icosahedron), [icosahedron]);

  const vertexPositions = useMemo(() => {
    const positions = icosahedron.attributes.position;
    const unique: THREE.Vector3[] = [];
    const seen = new Set<string>();
    for (let i = 0; i < positions.count; i++) {
      const v = new THREE.Vector3().fromBufferAttribute(positions, i);
      const key = `${v.x.toFixed(2)},${v.y.toFixed(2)},${v.z.toFixed(2)}`;
      if (!seen.has(key)) {
        seen.add(key);
        unique.push(v);
      }
    }
    return unique;
  }, [icosahedron]);

  const travelers = useRef(
    Array.from({ length: 6 }, (_, i) => ({
      progress: (i / 6) * vertexPositions.length,
      speed: 0.35 + ((i * 17) % 10) / 40,
    })),
  );

  useFrame((_, delta) => {
    const progress = scrollProgress.current ?? 0;

    if (groupRef.current) {
      groupRef.current.rotation.y += delta * 0.12;
      groupRef.current.rotation.x = THREE.MathUtils.lerp(
        groupRef.current.rotation.x,
        mouse.current.y * 0.2,
        0.03,
      );
      groupRef.current.rotation.z = THREE.MathUtils.lerp(
        groupRef.current.rotation.z,
        mouse.current.x * -0.15,
        0.03,
      );

      const scale = 1 - progress * 0.35;
      groupRef.current.scale.setScalar(scale);
      groupRef.current.position.y = -progress * 1.2;
    }

    if (ringA.current) {
      ringA.current.rotation.x += delta * 0.25;
      ringA.current.rotation.y += delta * 0.08;
    }
    if (ringB.current) {
      ringB.current.rotation.y -= delta * 0.18;
      ringB.current.rotation.z += delta * 0.06;
    }

    travelers.current.forEach((traveler, i) => {
      traveler.progress += delta * traveler.speed;
      const count = vertexPositions.length;
      if (count === 0) return;
      if (traveler.progress >= count) traveler.progress -= count;

      const from = Math.floor(traveler.progress) % count;
      const to = (from + 1) % count;
      const t = traveler.progress % 1;
      const a = vertexPositions[from];
      const b = vertexPositions[to];

      const mesh = pulseRefs.current[i];
      if (mesh && a && b) {
        mesh.position.set(
          a.x + (b.x - a.x) * t,
          a.y + (b.y - a.y) * t,
          a.z + (b.z - a.z) * t,
        );
      }
    });
  });

  const heroScale = Math.min(viewport.width, viewport.height) < 5 ? 0.75 : 1;

  return (
    <group ref={groupRef} scale={heroScale}>
      <lineSegments geometry={edges}>
        <lineBasicMaterial color={accent} transparent opacity={0.5} />
      </lineSegments>

      {vertexPositions.map((v, i) => (
        <mesh key={i} position={v}>
          <sphereGeometry args={[0.03, 8, 8]} />
          <meshBasicMaterial color={accent} transparent opacity={0.7} />
        </mesh>
      ))}

      {Array.from({ length: 6 }, (_, i) => (
        <mesh
          key={i}
          ref={(el) => {
            pulseRefs.current[i] = el;
          }}
        >
          <sphereGeometry args={[0.05, 8, 8]} />
          <meshBasicMaterial color={accent} />
        </mesh>
      ))}

      <mesh ref={ringA} rotation={[Math.PI / 3, 0, 0]}>
        <torusGeometry args={[2.1, 0.006, 8, 96]} />
        <meshBasicMaterial color={accent} transparent opacity={0.25} />
      </mesh>
      <mesh ref={ringB} rotation={[0, 0, Math.PI / 4]}>
        <torusGeometry args={[2.5, 0.005, 8, 96]} />
        <meshBasicMaterial color={accent} transparent opacity={0.15} />
      </mesh>
    </group>
  );
}

type Props = {
  scrollProgress: React.RefObject<number>;
};

export function SecurityCore({ scrollProgress }: Props) {
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
      camera={{ position: [0, 0, 6], fov: 45 }}
      dpr={[1, 1.5]}
      gl={{ antialias: false, alpha: true, powerPreference: "low-power" }}
      frameloop={isVisible ? "always" : "never"}
    >
      <Core scrollProgress={scrollProgress} />
    </Canvas>
  );
}
