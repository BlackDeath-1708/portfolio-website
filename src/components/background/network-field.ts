/**
 * Simulation + drawing for the site-wide network background: drifting nodes,
 * links between nearby nodes, links to the pointer, and occasional accent
 * "packets" travelling along a link.
 *
 * Nodes and packets are mutated in place each frame on purpose — allocating
 * fresh arrays at 60fps would only create GC pressure in a hot render loop.
 */

export type FieldNode = { x: number; y: number; vx: number; vy: number; r: number };
export type Packet = { from: FieldNode; to: FieldNode; t: number; speed: number };
export type Pointer = { x: number; y: number; active: boolean };
export type FieldColors = { line: string; accent: string };

const PX_PER_NODE = 20000;
const MIN_NODES = 24;
const MAX_NODES = 80;
const MAX_SPEED = 0.22;
const LINK_DISTANCE = 150;
const LINK_ALPHA = 0.18;
const NODE_ALPHA = 0.4;
const POINTER_RADIUS = 190;
const POINTER_ALPHA = 0.35;
const PACKET_SPAWN_CHANCE = 0.02;
const MAX_PACKETS = 5;
const PARALLAX = 0.08;

export function nodeCountFor(width: number, height: number): number {
  return Math.max(MIN_NODES, Math.min(MAX_NODES, Math.round((width * height) / PX_PER_NODE)));
}

function randomNode(width: number, height: number): FieldNode {
  const angle = Math.random() * Math.PI * 2;
  const speed = MAX_SPEED * (0.3 + Math.random() * 0.7);
  return {
    x: Math.random() * width,
    y: Math.random() * height,
    vx: Math.cos(angle) * speed,
    vy: Math.sin(angle) * speed,
    r: 0.8 + Math.random() * 1.1,
  };
}

/** Grows or trims the node list to suit the current viewport area. */
export function fitNodes(nodes: FieldNode[], width: number, height: number): FieldNode[] {
  const target = nodeCountFor(width, height);
  const kept = nodes.slice(0, target);
  const added = Array.from({ length: Math.max(0, target - kept.length) }, () =>
    randomNode(width, height),
  );
  return [...kept, ...added];
}

function wrap(value: number, size: number): number {
  return ((value % size) + size) % size;
}

export function stepNodes(nodes: FieldNode[], width: number, height: number, dt: number): void {
  for (const node of nodes) {
    node.x = wrap(node.x + node.vx * dt, width);
    node.y = wrap(node.y + node.vy * dt, height);
  }
}

/** Screen position of a node, shifted by scroll for a slow parallax drift. */
function projectY(node: FieldNode, height: number, scrollY: number): number {
  return wrap(node.y - scrollY * PARALLAX, height);
}

function distance(ax: number, ay: number, bx: number, by: number): number {
  return Math.hypot(ax - bx, ay - by);
}

export function stepPackets(
  packets: Packet[],
  nodes: FieldNode[],
  height: number,
  scrollY: number,
  dt: number,
): Packet[] {
  const alive = packets.filter((packet) => {
    packet.t += packet.speed * dt;
    const d = distance(
      packet.from.x,
      projectY(packet.from, height, scrollY),
      packet.to.x,
      projectY(packet.to, height, scrollY),
    );
    return packet.t < 1 && d < LINK_DISTANCE;
  });

  if (alive.length >= MAX_PACKETS || Math.random() > PACKET_SPAWN_CHANCE) return alive;

  const from = nodes[Math.floor(Math.random() * nodes.length)];
  const fromY = projectY(from, height, scrollY);
  const to = nodes.find(
    (n) =>
      n !== from &&
      distance(from.x, fromY, n.x, projectY(n, height, scrollY)) < LINK_DISTANCE * 0.8,
  );
  return to ? [...alive, { from, to, t: 0, speed: 0.008 + Math.random() * 0.008 }] : alive;
}

export function drawField(
  ctx: CanvasRenderingContext2D,
  nodes: FieldNode[],
  packets: Packet[],
  pointer: Pointer,
  colors: FieldColors,
  width: number,
  height: number,
  scrollY: number,
): void {
  ctx.clearRect(0, 0, width, height);
  const ys = nodes.map((node) => projectY(node, height, scrollY));

  ctx.lineWidth = 0.6;
  ctx.strokeStyle = colors.line;
  for (let i = 0; i < nodes.length; i++) {
    for (let j = i + 1; j < nodes.length; j++) {
      const d = distance(nodes[i].x, ys[i], nodes[j].x, ys[j]);
      if (d >= LINK_DISTANCE) continue;
      ctx.globalAlpha = (1 - d / LINK_DISTANCE) * LINK_ALPHA;
      ctx.beginPath();
      ctx.moveTo(nodes[i].x, ys[i]);
      ctx.lineTo(nodes[j].x, ys[j]);
      ctx.stroke();
    }
  }

  if (pointer.active) {
    ctx.strokeStyle = colors.accent;
    nodes.forEach((node, i) => {
      const d = distance(node.x, ys[i], pointer.x, pointer.y);
      if (d >= POINTER_RADIUS) return;
      ctx.globalAlpha = (1 - d / POINTER_RADIUS) * POINTER_ALPHA;
      ctx.beginPath();
      ctx.moveTo(node.x, ys[i]);
      ctx.lineTo(pointer.x, pointer.y);
      ctx.stroke();
    });
  }

  ctx.fillStyle = colors.line;
  ctx.globalAlpha = NODE_ALPHA;
  nodes.forEach((node, i) => {
    ctx.beginPath();
    ctx.arc(node.x, ys[i], node.r, 0, Math.PI * 2);
    ctx.fill();
  });

  ctx.fillStyle = colors.accent;
  for (const packet of packets) {
    const fromY = projectY(packet.from, height, scrollY);
    const toY = projectY(packet.to, height, scrollY);
    const x = packet.from.x + (packet.to.x - packet.from.x) * packet.t;
    const y = fromY + (toY - fromY) * packet.t;
    ctx.globalAlpha = Math.sin(packet.t * Math.PI);
    ctx.beginPath();
    ctx.arc(x, y, 1.8, 0, Math.PI * 2);
    ctx.fill();
  }

  ctx.globalAlpha = 1;
}
