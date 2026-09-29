"use client";

import { useEffect, useMemo, useRef, type RefObject } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";
import { fibonacciSphere, packetPath, uniqueVertices } from "@/components/three/core-geometry";
import type { ThemeColors } from "@/hooks/useThemeColors";

const CORE_RADIUS = 1.1;
const NODE_COUNT = 14;
const NODE_RADIUS = 2.5;
const PATH_SEGMENTS = 24;
const PACKET_COUNT = 9;
const THREAT_EVERY = 3;
const THREAT_HOLD_S = 3.2;
const SPIN_SPEED = 0.07;
const PARALLAX_TILT = 0.22;
const EASE = 0.035;

/** Illustrative endpoints only — generic private-range addresses, not real hosts. */
export const CORE_LABELS = [
  { node: 2, text: "10.0.4.12:443" },
  { node: 5, text: "172.16.0.8:53" },
  { node: 9, text: "192.168.1.20:22" },
  { node: 12, text: "10.0.9.3:8080" },
];

type PacketState = { path: number; t: number; speed: number; isThreat: boolean };

type Props = {
  colors: ThemeColors;
  scrollProgress: RefObject<number>;
  /** DOM label elements (one per CORE_LABELS entry), positioned here each frame. */
  labelRefs: RefObject<(HTMLSpanElement | null)[]>;
};

function spawnPacket(index: number, counter: number): PacketState {
  return {
    path: Math.floor(Math.random() * NODE_COUNT),
    t: -Math.random() * 0.6 - index * 0.05,
    speed: 0.16 + Math.random() * 0.12,
    isThreat: counter % THREAT_EVERY === 0,
  };
}

export function CoreScene({ colors, scrollProgress, labelRefs }: Props) {
  const { viewport } = useThree();
  const groupRef = useRef<THREE.Group>(null);
  const ringRefs = useRef<(THREE.Mesh | null)[]>([]);
  const nodeRefs = useRef<(THREE.Mesh | null)[]>([]);
  const packetRefs = useRef<(THREE.Mesh | null)[]>([]);
  const coreGlowRef = useRef<THREE.Mesh>(null);
  const alertRef = useRef<THREE.Mesh>(null);
  const pointer = useRef({ x: 0, y: 0 });
  const threat = useRef({ node: -1, remaining: 0 });
  const spawnCounter = useRef(0);

  const ico = useMemo(() => new THREE.IcosahedronGeometry(CORE_RADIUS, 1), []);
  const coreEdges = useMemo(() => new THREE.EdgesGeometry(ico), [ico]);
  const coreVertices = useMemo(() => uniqueVertices(ico), [ico]);
  const nodes = useMemo(() => fibonacciSphere(NODE_COUNT, NODE_RADIUS), []);
  const paths = useMemo(() => nodes.map((node) => packetPath(node, CORE_RADIUS)), [nodes]);

  const pathGeometry = useMemo(() => {
    const points = paths.flatMap((curve) => {
      const samples = curve.getPoints(PATH_SEGMENTS);
      return samples.slice(1).flatMap((p, i) => [samples[i], p]);
    });
    return new THREE.BufferGeometry().setFromPoints(points);
  }, [paths]);

  const packets = useRef<PacketState[]>(
    Array.from({ length: PACKET_COUNT }, (_, i) => spawnPacket(i, i + 1)),
  );

  useEffect(() => {
    function handlePointerMove(event: PointerEvent) {
      pointer.current.x = (event.clientX / window.innerWidth) * 2 - 1;
      pointer.current.y = (event.clientY / window.innerHeight) * 2 - 1;
    }
    window.addEventListener("pointermove", handlePointerMove, { passive: true });
    return () => window.removeEventListener("pointermove", handlePointerMove);
  }, []);

  useEffect(
    () => () => {
      ico.dispose();
      coreEdges.dispose();
      pathGeometry.dispose();
    },
    [ico, coreEdges, pathGeometry],
  );

  const accent = useMemo(() => new THREE.Color(colors.accent), [colors.accent]);
  const warning = useMemo(() => new THREE.Color(colors.warning), [colors.warning]);
  const scratch = useMemo(() => new THREE.Vector3(), []);

  useFrame((state, delta) => {
    const group = groupRef.current;
    if (!group) return;
    const progress = scrollProgress.current ?? 0;

    group.rotation.y += delta * SPIN_SPEED;
    group.rotation.x = THREE.MathUtils.lerp(group.rotation.x, pointer.current.y * PARALLAX_TILT, EASE);
    group.rotation.z = THREE.MathUtils.lerp(group.rotation.z, -pointer.current.x * PARALLAX_TILT * 0.6, EASE);
    group.scale.setScalar(1 - progress * 0.3);
    group.position.y = -progress * 1.1;

    ringRefs.current.forEach((ring, i) => {
      if (!ring) return;
      ring.rotation.z += delta * (0.05 + i * 0.03) * (i % 2 ? -1 : 1);
    });

    // Threat indicator: the flagged node turns warning-colored and pulses until it times out.
    threat.current.remaining = Math.max(0, threat.current.remaining - delta);
    const activeThreat = threat.current.remaining > 0 ? threat.current.node : -1;
    nodeRefs.current.forEach((mesh, i) => {
      if (!mesh) return;
      (mesh.material as THREE.MeshBasicMaterial).color.copy(i === activeThreat ? warning : accent);
    });
    const alert = alertRef.current;
    if (alert) {
      alert.visible = activeThreat >= 0;
      if (activeThreat >= 0) {
        alert.position.copy(nodes[activeThreat]);
        alert.lookAt(0, 0, 0);
        const pulse = (state.clock.elapsedTime * 1.6) % 1;
        alert.scale.setScalar(1 + pulse * 1.6);
        (alert.material as THREE.MeshBasicMaterial).opacity = 0.7 * (1 - pulse);
      }
    }

    // Packets travel inward along their path; a threat packet flags its origin node on arrival.
    packets.current = packets.current.map((packet, i) => {
      const mesh = packetRefs.current[i];
      const t = packet.t + delta * packet.speed;
      if (t >= 1) {
        if (packet.isThreat) threat.current = { node: packet.path, remaining: THREAT_HOLD_S };
        spawnCounter.current += 1;
        return { ...spawnPacket(0, spawnCounter.current), t: 0 };
      }
      if (mesh) {
        mesh.visible = t > 0;
        if (t > 0) mesh.position.copy(paths[packet.path].getPoint(t));
        (mesh.material as THREE.MeshBasicMaterial).color.copy(packet.isThreat ? warning : accent);
      }
      return { ...packet, t };
    });

    if (coreGlowRef.current) {
      const material = coreGlowRef.current.material as THREE.MeshBasicMaterial;
      material.opacity = 0.07 + (activeThreat >= 0 ? 0.05 : 0) + Math.sin(state.clock.elapsedTime * 1.2) * 0.02;
    }

    // Project label anchors to screen space; fade those on the far side of the sphere.
    CORE_LABELS.forEach((label, i) => {
      const el = labelRefs.current[i];
      const node = nodeRefs.current[label.node];
      if (!el || !node) return;
      node.getWorldPosition(scratch);
      const isFront = scratch.z > 0;
      scratch.project(state.camera);
      const x = ((scratch.x + 1) / 2) * state.size.width + 10;
      const y = ((1 - scratch.y) / 2) * state.size.height;
      el.style.transform = `translate3d(${x}px, ${y}px, 0) translateY(-50%)`;
      el.style.opacity = isFront ? "0.9" : "0.15";
    });
  });

  const fit = Math.min(1, Math.min(viewport.width, viewport.height) / 6.4);

  return (
    <group ref={groupRef} scale={fit}>
      <lineSegments geometry={coreEdges}>
        <lineBasicMaterial color={colors.accent} transparent opacity={0.55} />
      </lineSegments>
      <mesh ref={coreGlowRef}>
        <sphereGeometry args={[CORE_RADIUS * 0.92, 32, 32]} />
        <meshBasicMaterial color={colors.violet} transparent opacity={0.08} depthWrite={false} />
      </mesh>
      {coreVertices.map((v, i) => (
        <mesh key={`v${i}`} position={v}>
          <sphereGeometry args={[0.025, 6, 6]} />
          <meshBasicMaterial color={colors.accent} transparent opacity={0.8} />
        </mesh>
      ))}

      <lineSegments geometry={pathGeometry}>
        <lineBasicMaterial color={colors.accent} transparent opacity={0.16} depthWrite={false} />
      </lineSegments>

      {nodes.map((node, i) => (
        <mesh
          key={`n${i}`}
          position={node}
          ref={(el) => {
            nodeRefs.current[i] = el;
          }}
        >
          <sphereGeometry args={[0.038, 10, 10]} />
          <meshBasicMaterial color={colors.accent} />
        </mesh>
      ))}

      {Array.from({ length: PACKET_COUNT }, (_, i) => (
        <mesh
          key={`p${i}`}
          visible={false}
          ref={(el) => {
            packetRefs.current[i] = el;
          }}
        >
          <sphereGeometry args={[0.035, 8, 8]} />
          <meshBasicMaterial color={colors.accent} />
        </mesh>
      ))}

      <mesh ref={alertRef} visible={false}>
        <ringGeometry args={[0.1, 0.12, 32]} />
        <meshBasicMaterial color={colors.warning} transparent side={THREE.DoubleSide} depthWrite={false} />
      </mesh>

      {[
        { radius: 2.0, color: colors.accent, opacity: 0.22, tilt: [Math.PI / 2.4, 0, 0] },
        { radius: 2.9, color: colors.violet, opacity: 0.2, tilt: [Math.PI / 2, 0.35, 0] },
        { radius: 3.3, color: colors.accent, opacity: 0.08, tilt: [Math.PI / 1.7, -0.3, 0] },
      ].map((ring, i) => (
        <mesh
          key={`r${i}`}
          rotation={ring.tilt as [number, number, number]}
          ref={(el) => {
            ringRefs.current[i] = el;
          }}
        >
          <torusGeometry args={[ring.radius, 0.005, 6, 128]} />
          <meshBasicMaterial color={ring.color} transparent opacity={ring.opacity} />
        </mesh>
      ))}

    </group>
  );
}
