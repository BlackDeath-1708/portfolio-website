import type { Metadata } from "next";
import Link from "next/link";
import { Badge } from "@/components/Badge";
import { ProjectList } from "@/components/ProjectList";
import { Reveal } from "@/components/Reveal";
import { NetworkVisual } from "@/components/three/NetworkVisual";
import { projects } from "@/lib/projects";

export const metadata: Metadata = {
  title: "Work",
};

const featuredSlug = "odin-king-of-analysis";

export default function WorkPage() {
  const featured = projects.find((p) => p.slug === featuredSlug);
  const rest = projects.filter((p) => p.slug !== featuredSlug);

  return (
    <div className="mx-auto max-w-5xl px-6 py-20">
      <div className="flex items-baseline gap-3">
        <span className="h-px w-8 bg-accent" />
        <h1 className="font-mono text-xs uppercase tracking-widest text-foreground/50">
          Work
        </h1>
      </div>
      <p className="mt-4 max-w-xl text-lg text-foreground/70">
        Security tooling and full-stack software. ODIN and PhishGuard have full write-ups —
        the rest are quick summaries.
      </p>

      {featured && (
        <Reveal className="mt-12">
          <Link
            href={`/work/${featured.slug}`}
            className="group block rounded-xl border border-accent/30 bg-accent/[0.03] p-6 transition-colors hover:border-accent/60 sm:p-10"
          >
            <span className="font-mono text-xs uppercase tracking-widest text-accent">
              Featured project
            </span>
            <h2 className="mt-3 text-2xl font-bold tracking-tight transition-colors group-hover:text-accent sm:text-3xl">
              {featured.title}
            </h2>
            <p className="mt-3 max-w-2xl text-foreground/70">{featured.summary}</p>

            {featured.architecture && (
              <div className="relative mt-6 h-36 overflow-hidden rounded-lg border border-black/10 sm:h-44 dark:border-white/10">
                <NetworkVisual
                  mode="pipeline"
                  count={featured.architecture.length}
                  travelerCount={4}
                  className="absolute inset-0"
                />
              </div>
            )}

            {featured.architecture && (
              <div className="mt-4 flex flex-wrap items-center gap-x-2 gap-y-3 font-mono text-xs text-foreground/60">
                {featured.architecture.map((stage, i) => (
                  <span key={stage} className="flex items-center gap-2">
                    <span className="rounded border border-black/10 bg-background px-2.5 py-1.5 dark:border-white/10">
                      {stage}
                    </span>
                    {i < featured.architecture!.length - 1 && (
                      <span aria-hidden className="text-accent">
                        →
                      </span>
                    )}
                  </span>
                ))}
              </div>
            )}

            <ul className="mt-6 flex flex-wrap gap-2">
              {featured.stack.map((tech) => (
                <li key={tech}>
                  <Badge>{tech}</Badge>
                </li>
              ))}
            </ul>

            <span className="mt-6 inline-flex items-center gap-1 font-mono text-xs uppercase tracking-widest text-accent">
              Read the case study
              <span
                aria-hidden
                className="transition-transform duration-300 group-hover:translate-x-1"
              >
                →
              </span>
            </span>
          </Link>
        </Reveal>
      )}

      <Reveal className="mt-16">
        <h2 className="font-mono text-xs uppercase tracking-widest text-foreground/50">
          Selected work
        </h2>
      </Reveal>
      <div className="mt-4">
        <ProjectList projects={rest} />
      </div>
    </div>
  );
}
