import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Badge } from "@/components/Badge";
import { Magnetic } from "@/components/Magnetic";
import { splitTitle } from "@/components/ProjectCard";
import { Reveal } from "@/components/Reveal";
import { SplitReveal } from "@/components/SplitReveal";
import { InfoGrid } from "@/components/ui/InfoGrid";
import { buttonPrimary, buttonSecondary, eyebrow } from "@/components/ui/styles";
import { projectVisuals } from "@/components/visuals";
import { OdinArchitecture } from "@/components/visuals/OdinArchitecture";
import { StackVisual } from "@/components/visuals/StackVisual";
import { projects } from "@/lib/projects";

type Props = {
  params: Promise<{ slug: string }>;
};

const ODIN_SLUG = "odin-king-of-analysis";

export function generateStaticParams() {
  return projects.map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const project = projects.find((p) => p.slug === slug);
  if (!project) return { title: "Project not found" };
  return { title: project.title, description: project.summary };
}

const caseStudySections = [
  { key: "problem", label: "The problem" },
  { key: "approach", label: "Approach" },
  { key: "challenge", label: "The hard part" },
  { key: "result", label: "Result" },
] as const;

export default async function WorkDetailPage({ params }: Props) {
  const { slug } = await params;
  const index = projects.findIndex((p) => p.slug === slug);
  if (index === -1) notFound();

  const project = projects[index];
  const previous = projects[(index - 1 + projects.length) % projects.length];
  const next = projects[(index + 1) % projects.length];
  const { main, sub } = splitTitle(project.title);
  const Visual = projectVisuals[project.slug];

  return (
    <article className="mx-auto max-w-6xl px-6 pt-36 pb-24 sm:pt-44">
      <Link
        href="/work"
        className={`${eyebrow} text-foreground-muted transition-colors hover:text-accent`}
      >
        ← All work
      </Link>

      <header className="mt-8 grid gap-10 lg:grid-cols-[1.3fr_1fr] lg:items-end">
        <div>
          <p className={`${eyebrow} text-accent`}>{project.category}</p>
          <h1 className="mt-4 text-4xl leading-[1.08] font-semibold tracking-tight sm:text-6xl">
            <SplitReveal text={main} />
          </h1>
          {sub && <p className="mt-3 text-lg text-accent">{sub}</p>}
          <p className="mt-5 max-w-xl text-lg leading-relaxed text-foreground/70">{project.summary}</p>
        </div>
        <Reveal delay={150}>
          <InfoGrid
            items={[
              { label: "Category", value: project.category },
              { label: "Source", value: project.repoUrl ? "Public on GitHub" : "Private / in progress" },
              {
                label: "Stack",
                wide: true,
                value: (
                  <ul className="mt-1 flex flex-wrap gap-1.5">
                    {project.stack.map((tech) => (
                      <li key={tech}>
                        <Badge>{tech}</Badge>
                      </li>
                    ))}
                  </ul>
                ),
              },
            ]}
          />
        </Reveal>
      </header>

      {!project.embeddable && (
        <Reveal className="mt-14">
          <div className="card glow relative overflow-hidden p-6 sm:p-10">
            {project.slug === ODIN_SLUG ? (
              <OdinArchitecture />
            ) : (
              <div className="mx-auto h-64 max-w-xl sm:h-72 sm:scale-125">
                {Visual ? <Visual /> : <StackVisual stack={project.stack} />}
              </div>
            )}
          </div>
        </Reveal>
      )}

      <div className="mt-16 max-w-3xl">
        {project.caseStudy ? (
          <ol className="relative flex flex-col gap-12 border-l border-line pl-8">
            {caseStudySections.map(({ key, label }, i) => (
              <li key={key} className="relative">
                <Reveal>
                  <span
                    aria-hidden
                    className="absolute top-1 -left-[calc(2rem+5px)] h-2.5 w-2.5 rounded-full bg-accent shadow-[0_0_12px_var(--accent)]"
                  />
                  <h2 className={`${eyebrow} text-accent`}>
                    {String(i + 1).padStart(2, "0")} · {label}
                  </h2>
                  <p className="mt-3 text-base leading-relaxed text-foreground/80 sm:text-lg">{project.caseStudy![key]}</p>
                </Reveal>
              </li>
            ))}
          </ol>
        ) : (
          <Reveal>
            <h2 className={`${eyebrow} text-accent`}>Overview</h2>
            <p className="mt-3 text-base leading-relaxed text-foreground/80 sm:text-lg">{project.description}</p>
          </Reveal>
        )}
      </div>

      {project.embeddable && project.liveUrl && (
        <section aria-labelledby="preview-title" className="mt-16">
          <h2 id="preview-title" className={`${eyebrow} text-accent`}>
            Live preview
          </h2>
          <p className="mt-2 max-w-2xl text-sm text-foreground-muted">
            Running instance, embedded directly — try it below. It&apos;s on free-tier hosting, so it may take a few
            seconds to wake up.
          </p>
          <div className="card mt-4 overflow-hidden">
            <iframe
              src={project.liveUrl}
              title={`${project.title} — live preview`}
              loading="lazy"
              sandbox="allow-scripts allow-same-origin allow-forms allow-popups"
              referrerPolicy="no-referrer"
              className="h-[520px] w-full bg-white"
            />
          </div>
        </section>
      )}

      <div className="mt-14 flex flex-wrap gap-3">
        {project.liveUrl && (
          <Magnetic>
            <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" className={buttonPrimary}>
              {project.embeddable ? "Open full screen" : "Live demo"} <span aria-hidden>↗</span>
            </a>
          </Magnetic>
        )}
        {project.repoUrl ? (
          <Magnetic>
            <a
              href={project.repoUrl}
              target="_blank"
              rel="noopener noreferrer"
              className={project.liveUrl ? buttonSecondary : buttonPrimary}
            >
              View on GitHub <span aria-hidden>↗</span>
            </a>
          </Magnetic>
        ) : (
          <p className="inline-flex items-center rounded-full border border-line px-5 py-2.5 text-sm text-foreground-muted">
            Private repository / in progress
          </p>
        )}
      </div>

      <nav aria-label="More projects" className="mt-20 grid gap-4 border-t border-line pt-10 sm:grid-cols-2">
        {[
          { label: "Previous", project: previous },
          { label: "Next", project: next },
        ].map(({ label, project: other }) => (
          <Link
            key={label}
            href={`/work/${other.slug}`}
            className={`group card p-5 transition-colors hover:border-accent/40 ${label === "Next" ? "sm:text-right" : ""}`}
          >
            <span className={`${eyebrow} text-foreground-muted`}>{label}</span>
            <span className="mt-2 block font-medium transition-colors group-hover:text-accent">
              {splitTitle(other.title).main}
            </span>
          </Link>
        ))}
      </nav>
    </article>
  );
}
