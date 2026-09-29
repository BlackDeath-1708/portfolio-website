const CENTER = { x: 210, y: 112 };
const ORBIT = { rx: 148, ry: 76 };
const THREATS = ["DDoS", "C2 beacon", "DGA / DNS", "TLS malware", "Recon", "Exfil"];
const FLAGGED = 1;

const satellites = THREATS.map((label, i) => {
  const angle = (i / THREATS.length) * Math.PI * 2 - Math.PI / 2 + 0.35;
  return {
    label,
    x: CENTER.x + Math.cos(angle) * ORBIT.rx,
    y: CENTER.y + Math.sin(angle) * ORBIT.ry,
  };
});

/** ODIN card visual: mirrored traffic feeding a hub that fans out to six threat detectors. */
export function OdinVisual() {
  return (
    <svg viewBox="0 0 420 224" className="h-full w-full" aria-hidden>
      <ellipse cx={CENTER.x} cy={CENTER.y} rx={ORBIT.rx} ry={ORBIT.ry} fill="none" className="stroke-line" />
      <ellipse cx={CENTER.x} cy={CENTER.y} rx={ORBIT.rx * 0.55} ry={ORBIT.ry * 0.55} fill="none" className="stroke-violet/30" />

      <path d={`M0,${CENTER.y} H${CENTER.x - 24}`} className="stroke-accent/25" strokeWidth="1" />
      <path d={`M0,${CENTER.y} H${CENTER.x - 24}`} className="flow-line stroke-accent" strokeWidth="1.2" fill="none" />
      <text x="8" y={CENTER.y - 8} className="fill-foreground-muted font-mono text-[9px]">
        mirror
      </text>

      {satellites.map((s, i) => (
        <g key={s.label}>
          <line x1={CENTER.x} y1={CENTER.y} x2={s.x} y2={s.y} className="stroke-accent/20" />
          <line
            x1={CENTER.x}
            y1={CENTER.y}
            x2={s.x}
            y2={s.y}
            className={`flow-line-slow ${i === FLAGGED ? "stroke-warning" : "stroke-accent/70"}`}
          />
          {i === FLAGGED && <circle cx={s.x} cy={s.y} r="9" fill="none" className="stroke-warning/60" />}
          <circle cx={s.x} cy={s.y} r="3.5" className={i === FLAGGED ? "fill-warning" : "fill-accent"} />
          <text
            x={s.x}
            y={s.y + (s.y < CENTER.y ? -10 : 16)}
            textAnchor="middle"
            className="fill-foreground-muted font-mono text-[9px]"
          >
            {s.label}
          </text>
        </g>
      ))}

      <circle cx={CENTER.x} cy={CENTER.y} r="26" className="fill-violet/15 stroke-accent/60" />
      <text x={CENTER.x} y={CENTER.y + 3.5} textAnchor="middle" className="fill-foreground font-mono text-[10px] font-semibold">
        ODIN
      </text>
    </svg>
  );
}
