import Image from "next/image";
import Link from "next/link";
import { Magnetic } from "@/components/Magnetic";
import { Reveal } from "@/components/Reveal";
import { SplitReveal } from "@/components/SplitReveal";
import { buttonPrimary, buttonSecondary, eyebrow } from "@/components/ui/styles";
import { aboutHero, aboutStats, identity } from "@/lib/about-content";
import { siteConfig } from "@/lib/site-config";

const HEADLINE = "I build at the intersection of security, systems and software.";
const HIGHLIGHTS = { security: "text-accent", systems: "text-accent", software: "text-violet" };

/** Network → systems → software: labelled clusters routing into the portrait. */
const CLUSTERS = [
  { label: "Network", x: 78, y: 70, endpoints: [[34, 40], [120, 34], [40, 112]] },
  { label: "Systems", x: 404, y: 84, endpoints: [[448, 46], [446, 130], [364, 38]] },
  { label: "Software", x: 410, y: 358, endpoints: [[456, 318], [446, 404], [360, 404]] },
  { label: "Research", x: 70, y: 346, endpoints: [[30, 300], [118, 400], [26, 390]] },
] as const;
const CENTER = { x: 240, y: 220 };
const PORTRAIT_R = 106;

function arcTo(x: number, y: number): string {
  const dx = CENTER.x - x;
  const dy = CENTER.y - y;
  const len = Math.hypot(dx, dy);
  const ex = CENTER.x - (dx / len) * PORTRAIT_R;
  const ey = CENTER.y - (dy / len) * PORTRAIT_R;
  const cx = (x + ex) / 2 + dy * 0.18;
  const cy = (y + ey) / 2 - dx * 0.18;
  return `M${x},${y} Q${cx},${cy} ${ex},${ey}`;
}

function NetworkPortrait() {
  return (
    <div className="glow relative mx-auto aspect-[12/11] w-full max-w-[520px]">
      <svg viewBox="0 0 480 440" className="absolute inset-0 h-full w-full" aria-hidden>
        <circle cx={CENTER.x} cy={CENTER.y} r={PORTRAIT_R + 34} fill="none" className="stroke-line" />
        <circle cx={CENTER.x} cy={CENTER.y} r={PORTRAIT_R + 70} fill="none" strokeDasharray="2 6" className="stroke-violet/30" />
        <path
          d={`M${CLUSTERS[0].x},${CLUSTERS[0].y} Q240,-10 ${CLUSTERS[1].x},${CLUSTERS[1].y} Q500,220 ${CLUSTERS[2].x},${CLUSTERS[2].y}`}
          fill="none"
          className="flow-line-slow stroke-violet/60"
        />
        {CLUSTERS.map((cluster) => (
          <g key={cluster.label}>
            {cluster.endpoints.map(([ex, ey]) => (
              <g key={`${ex}-${ey}`}>
                <line x1={cluster.x} y1={cluster.y} x2={ex} y2={ey} className="stroke-accent/25" />
                <circle cx={ex} cy={ey} r="2.5" className="fill-foreground-muted" />
              </g>
            ))}
            <path d={arcTo(cluster.x, cluster.y)} fill="none" className="stroke-accent/20" />
            <path d={arcTo(cluster.x, cluster.y)} fill="none" strokeWidth="1.4" className="flow-line stroke-accent" />
            <circle cx={cluster.x} cy={cluster.y} r="9" className="fill-accent/15 stroke-accent/70" />
            <circle cx={cluster.x} cy={cluster.y} r="3.5" className="fill-accent" />
            <text
              x={cluster.x}
              y={cluster.y + (cluster.y < CENTER.y ? -18 : 26)}
              textAnchor="middle"
              className="fill-foreground-muted font-mono text-[10px] tracking-[0.2em] uppercase"
            >
              {cluster.label}
            </text>
          </g>
        ))}
      </svg>
      <div className="absolute top-1/2 left-1/2 aspect-square w-[44%] -translate-x-1/2 -translate-y-1/2 overflow-hidden rounded-full ring-2 ring-accent/40 ring-offset-4 ring-offset-background">
        <Image
          src={siteConfig.avatarUrl}
          alt={`Portrait of ${siteConfig.name}`}
          fill
          priority
          sizes="(min-width: 1024px) 230px, 44vw"
          className="object-cover"
        />
      </div>
    </div>
  );
}

export function AboutHero() {
  return (
    <section aria-labelledby="about-title" className="mx-auto max-w-6xl px-6 pt-32 pb-16 sm:pt-40">
      <div className="grid items-center gap-12 lg:grid-cols-[1.1fr_1fr]">
        <div>
          <Reveal>
            <p className={`${eyebrow} flex items-center gap-3 text-accent`}>
              <span className="h-px w-6 bg-accent" />
              {aboutHero.eyebrow}
            </p>
          </Reveal>
          <h1 id="about-title" className="mt-6 text-[2.3rem] leading-[1.08] font-semibold tracking-tight sm:text-[3rem]">
            <SplitReveal text={HEADLINE} highlights={HIGHLIGHTS} delay={0.1} />
          </h1>
          <Reveal delay={200}>
            <p className="mt-6 max-w-xl text-lg leading-relaxed text-foreground/70">{aboutHero.intro}</p>
          </Reveal>
          <Reveal delay={300}>
            <div className="mt-8 flex flex-wrap gap-3">
              <Magnetic>
                <a href={siteConfig.resumeUrl} download className={buttonPrimary}>
                  Download résumé <span aria-hidden>↓</span>
                </a>
              </Magnetic>
              <Magnetic>
                <Link href="/work" className={buttonSecondary}>
                  View my work <span aria-hidden>→</span>
                </Link>
              </Magnetic>
            </div>
          </Reveal>
        </div>

        <Reveal delay={150}>
          <NetworkPortrait />
        </Reveal>
      </div>

      <Reveal delay={200} className="mt-12">
        <div className="card grid overflow-hidden lg:grid-cols-[1.1fr_1fr]">
          <div className="border-b border-line p-5 font-mono text-xs sm:p-6 sm:text-[13px] lg:border-r lg:border-b-0">
            <p>
              <span className="text-success">sudhareshan@about:~$</span> whoami
            </p>
            <dl className="mt-4 grid grid-cols-[4.25rem_1fr] gap-y-1.5 sm:grid-cols-[5.5rem_1fr]">
              {identity.map((row) => (
                <div key={row.key} className="contents">
                  <dt className="text-foreground-muted">{row.key}</dt>
                  <dd className="flex items-baseline gap-2 text-foreground/85">
                    <span className="text-foreground-muted">:</span>
                    {row.value}
                    {row.isLive && <span className="status-dot ml-1 self-center" aria-hidden />}
                  </dd>
                </div>
              ))}
            </dl>
          </div>
          <dl className="grid grid-cols-2 sm:grid-cols-4">
            {aboutStats.map((stat, i) => (
              <div
                key={stat.label}
                className={`flex flex-col-reverse justify-center border-line p-5 ${
                  i % 2 === 0 ? "border-r" : "sm:border-r"
                } ${i < 2 ? "border-b sm:border-b-0" : ""} last:border-r-0`}
              >
                <dt className="mt-1 text-xs text-foreground-muted">{stat.label}</dt>
                <dd className="font-mono text-2xl font-semibold text-accent">{stat.value}</dd>
              </div>
            ))}
          </dl>
        </div>
      </Reveal>
    </section>
  );
}
