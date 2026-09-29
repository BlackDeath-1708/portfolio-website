import * as THREE from "three";

const GOLDEN_ANGLE = Math.PI * (3 - Math.sqrt(5));
const UP = new THREE.Vector3(0, 1, 0);
const SIDE = new THREE.Vector3(1, 0, 0);

/** Evenly distributes `count` points over a sphere of `radius`. */
export function fibonacciSphere(count: number, radius: number): THREE.Vector3[] {
  return Array.from({ length: count }, (_, i) => {
    const y = 1 - (i / Math.max(1, count - 1)) * 2;
    const ring = Math.sqrt(1 - y * y);
    const theta = GOLDEN_ANGLE * i;
    return new THREE.Vector3(
      Math.cos(theta) * ring * radius,
      y * radius,
      Math.sin(theta) * ring * radius,
    );
  });
}

/**
 * A gently arced path from an outer network node into the core's surface,
 * bowed sideways so paths read as routes rather than spokes.
 */
export function packetPath(from: THREE.Vector3, coreRadius: number): THREE.QuadraticBezierCurve3 {
  const end = from.clone().setLength(coreRadius);
  const axis = Math.abs(from.clone().normalize().dot(UP)) > 0.9 ? SIDE : UP;
  const bow = from.clone().cross(axis).setLength(from.length() * 0.18);
  const control = from.clone().add(end).multiplyScalar(0.5).add(bow);
  return new THREE.QuadraticBezierCurve3(from.clone(), control, end);
}

/** Unique vertex positions of a geometry (indexed or not). */
export function uniqueVertices(geometry: THREE.BufferGeometry): THREE.Vector3[] {
  const positions = geometry.attributes.position;
  const seen = new Set<string>();
  const unique: THREE.Vector3[] = [];
  for (let i = 0; i < positions.count; i++) {
    const v = new THREE.Vector3().fromBufferAttribute(positions, i);
    const key = `${v.x.toFixed(2)},${v.y.toFixed(2)},${v.z.toFixed(2)}`;
    if (seen.has(key)) continue;
    seen.add(key);
    unique.push(v);
  }
  return unique;
}
