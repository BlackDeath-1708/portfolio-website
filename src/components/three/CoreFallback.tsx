const NODE_COUNT = 12;
const CENTER = 200;
const NODE_ORBIT = 150;

const nodes = Array.from({ length: NODE_COUNT }, (_, i) => {
  const angle = (i / NODE_COUNT) * Math.PI * 2 + 0.2;
  const radius = NODE_ORBIT * (i % 2 ? 0.86 : 1);
  return { x: CENTER + Math.cos(angle) * radius, y: CENTER + Math.sin(angle) * radius };
});

const hexagon = Array.from({ length: 6 }, (_, i) => {
  const angle = (i / 6) * Math.PI * 2 + Math.PI / 6;
  return `${CENTER + Math.cos(angle) * 52},${CENTER + Math.sin(angle) * 52}`;
}).join(" ");

/**
 * Static SVG stand-in for the 3D Security Core: shown on small screens, under
 * reduced motion, and while the WebGL scene loads.
 */
export function CoreFallback({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 400 400" className={className} aria-hidden>
      <g className="origin-center animate-[spin_90s_linear_infinite] motion-reduce:animate-none">
        <ellipse cx={CENTER} cy={CENTER} rx="170" ry="62" fill="none" className="stroke-accent/25" />
        <ellipse
          cx={CENTER}
          cy={CENTER}
          rx="182"
          ry="96"
          fill="none"
          transform={`rotate(38 ${CENTER} ${CENTER})`}
          className="stroke-violet/30"
        />
      </g>
      {nodes.map((node, i) => (
        <g key={i}>
          <path
            d={`M${node.x},${node.y} Q${(node.x + CENTER) / 2 + 18},${(node.y + CENTER) / 2 - 18} ${CENTER},${CENTER}`}
            fill="none"
            className="stroke-accent/20"
          />
          <circle cx={node.x} cy={node.y} r="3" className={i === 4 ? "fill-warning" : "fill-accent"} />
        </g>
      ))}
      <circle cx={nodes[4].x} cy={nodes[4].y} r="9" fill="none" className="stroke-warning/60" />
      <circle cx={CENTER} cy={CENTER} r="60" className="fill-violet/10" />
      <polygon points={hexagon} fill="none" className="stroke-accent/70" strokeWidth="1.2" />
      <polygon
        points={hexagon}
        fill="none"
        transform={`rotate(30 ${CENTER} ${CENTER}) translate(${CENTER * 0.38} ${CENTER * 0.38}) scale(0.62)`}
        className="stroke-accent/40"
      />
      <text x={nodes[1].x + 8} y={nodes[1].y + 4} className="fill-foreground-muted font-mono text-[10px]">
        10.0.4.12:443
      </text>
      <text x={nodes[7].x - 92} y={nodes[7].y + 4} className="fill-foreground-muted font-mono text-[10px]">
        172.16.0.8:53
      </text>
    </svg>
  );
}
