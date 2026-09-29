/** ODIN's pipeline as documented in its case study (projects.ts). */
const PIPELINE = [
  { label: "Internet", detail: "traffic" },
  { label: "TAP", detail: "one-way mirror" },
  { label: "Zeek", detail: "conn · dns · ssl" },
  { label: "Kafka", detail: "log stream" },
  { label: "ML detectors", detail: "×6, batched" },
  { label: "Correlation", detail: "threat core" },
];
const THREATS = ["DDoS", "C2 beacon", "DGA / DNS", "TLS malware", "Recon", "Data exfil"];
const PULSING_THREAT = 1;

const BOX = { w: 104, h: 46, y: 8 };
const GAP = 22;
const busY = 118;
const threatY = 176;
const xOf = (i: number) => 8 + i * (BOX.w + GAP);
const coreIndex = PIPELINE.length - 1;
const coreCenterX = xOf(coreIndex) + BOX.w / 2;
const threatX = (i: number) => 60 + i * 128;

/** Large ODIN architecture diagram: desktop SVG with flowing connectors, stacked list on phones. */
export function OdinArchitecture() {
  return (
    <>
      <svg viewBox="0 0 770 218" className="hidden h-auto w-full md:block" role="img" aria-labelledby="odin-arch-title">
        <title id="odin-arch-title">
          ODIN pipeline: Internet to TAP to Zeek to Kafka to ML detectors to a correlation core, branching into six
          threat classes.
        </title>

        {PIPELINE.slice(0, -1).map((_, i) => {
          const x1 = xOf(i) + BOX.w;
          const x2 = xOf(i + 1);
          const y = BOX.y + BOX.h / 2;
          return (
            <g key={`c${i}`}>
              <line x1={x1} y1={y} x2={x2} y2={y} className="stroke-accent/25" />
              <line x1={x1} y1={y} x2={x2} y2={y} className="flow-line stroke-accent" strokeWidth="1.5" />
            </g>
          );
        })}

        {PIPELINE.map((stage, i) => {
          const isCore = i === coreIndex;
          return (
            <g key={stage.label}>
              <rect
                x={xOf(i)}
                y={BOX.y}
                width={BOX.w}
                height={BOX.h}
                rx="10"
                className={isCore ? "fill-violet/20 stroke-violet" : "fill-background/80 stroke-accent/50"}
              />
              <text x={xOf(i) + BOX.w / 2} y={BOX.y + 20} textAnchor="middle" className="fill-foreground text-[12px] font-medium">
                {stage.label}
              </text>
              <text x={xOf(i) + BOX.w / 2} y={BOX.y + 35} textAnchor="middle" className="fill-foreground-muted font-mono text-[9px]">
                {stage.detail}
              </text>
            </g>
          );
        })}

        <line x1={coreCenterX} y1={BOX.y + BOX.h} x2={coreCenterX} y2={busY} className="flow-line stroke-violet" strokeWidth="1.5" />
        <line x1={threatX(0)} y1={busY} x2={coreCenterX} y2={busY} className="stroke-violet/50" />

        {THREATS.map((threat, i) => {
          const x = threatX(i);
          const isPulsing = i === PULSING_THREAT;
          return (
            <g key={threat}>
              <line x1={x} y1={busY} x2={x} y2={threatY - 12} className="flow-line-slow stroke-warning/70" strokeWidth="1.2" />
              {isPulsing && (
                <circle cx={x} cy={threatY} r="14" className="fill-warning/15 motion-safe:animate-pulse" />
              )}
              <path
                d={`M${x},${threatY - 9} L${x + 9},${threatY + 7} L${x - 9},${threatY + 7} Z`}
                className="fill-warning/20 stroke-warning"
                strokeLinejoin="round"
              />
              <text x={x} y={threatY + 5} textAnchor="middle" className="fill-warning text-[9px] font-bold">
                !
              </text>
              <text x={x} y={threatY + 30} textAnchor="middle" className="fill-foreground/80 font-mono text-[10px]">
                {threat}
              </text>
            </g>
          );
        })}
      </svg>

      <ol className="flex flex-col gap-2 md:hidden" aria-label="ODIN pipeline">
        {PIPELINE.map((stage, i) => (
          <li
            key={stage.label}
            className={`flex items-center justify-between rounded-lg border px-3 py-2 ${
              i === coreIndex ? "border-violet/60 bg-violet/10" : "border-line bg-background/60"
            }`}
          >
            <span className="text-sm font-medium">
              <span className="mr-2 font-mono text-[10px] text-accent">{String(i + 1).padStart(2, "0")}</span>
              {stage.label}
            </span>
            <span className="font-mono text-[10px] text-foreground-muted">{stage.detail}</span>
          </li>
        ))}
        <li className="flex flex-wrap gap-1.5 pt-1">
          {THREATS.map((threat) => (
            <span key={threat} className="rounded border border-warning/40 px-2 py-0.5 font-mono text-[10px] text-warning">
              {threat}
            </span>
          ))}
        </li>
      </ol>
    </>
  );
}
