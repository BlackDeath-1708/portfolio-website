import Link from "next/link";
import { Badge } from "@/components/Badge";
import { Reveal } from "@/components/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { buttonSecondary, eyebrow } from "@/components/ui/styles";
import { OdinArchitecture } from "@/components/visuals/OdinArchitecture";
import { projects } from "@/lib/projects";

const ODIN_SLUG = "odin-king-of-analysis";

/** Facts taken from ODIN's case study in projects.ts — nothing added. */
const HIGHLIGHTS = [
  "Six threat classes, one purpose-built detector each",
  "4.74× pipeline throughput from micro-batched inference",
  "Verdicts streamed live over SSE to a React dashboard",
  "Runs end to end on Docker Compose",
];

const TAGS = ["Zeek", "Kafka", "Python", "ML inference", "React", "Docker"];

export function OdinShowcase() {
  const odin = projects.find((project) => project.slug === ODIN_SLUG);
  if (!odin) return null;

  return (
    <section aria-labelledby="odin-title" className="mx-auto max-w-6xl px-6 py-24 sm:py-32">
      <Reveal>
        <SectionHeading index="02" label="Signature case study" title="Detection from a one-way mirror." />
      </Reveal>

      <Reveal delay={100} className="mt-12">
        <div className="card glow relative overflow-hidden">
          <div className="border-b border-line p-6 sm:p-10">
            <div className="flex flex-wrap items-end justify-between gap-4">
              <div>
                <h3 id="odin-title" className="text-5xl font-semibold tracking-tight sm:text-6xl">
                  ODIN
                </h3>
                <p className={`${eyebrow} mt-3 text-accent`}>Passive network threat detection</p>
              </div>
              <p className="max-w-sm text-base leading-snug text-foreground/75 sm:text-right">
                Real-time threat detection with no return path into the network being watched.
              </p>
            </div>
            <div className="mt-10">
              <OdinArchitecture />
            </div>
          </div>

          <div className="grid gap-8 p-6 sm:p-10 lg:grid-cols-[1.4fr_1fr]">
            <ul className="grid gap-3 sm:grid-cols-2">
              {HIGHLIGHTS.map((item) => (
                <li key={item} className="flex gap-3 text-sm leading-relaxed text-foreground/75">
                  <svg viewBox="0 0 16 16" className="mt-0.5 h-4 w-4 shrink-0 text-success" aria-hidden>
                    <path d="M3 8.5l3 3 7-7" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                  {item}
                </li>
              ))}
            </ul>
            <div className="flex flex-col gap-6 lg:items-end">
              <ul className="flex flex-wrap gap-1.5 lg:justify-end">
                {TAGS.map((tag) => (
                  <li key={tag}>
                    <Badge>{tag}</Badge>
                  </li>
                ))}
              </ul>
              <div className="flex flex-wrap items-center gap-3">
                <Link href={`/work/${odin.slug}`} className={buttonSecondary}>
                  View case study <span aria-hidden>→</span>
                </Link>
                {odin.repoUrl && (
                  <a
                    href={odin.repoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-2 text-sm text-foreground-muted transition-colors hover:text-foreground"
                  >
                    Source ↗
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>
      </Reveal>
    </section>
  );
}
