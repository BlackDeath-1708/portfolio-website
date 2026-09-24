import Link from "next/link";
import { ProjectCard } from "@/components/ProjectCard";
import { Reveal } from "@/components/Reveal";
import { achievements, experience } from "@/lib/resume";
import { projects } from "@/lib/projects";
import { siteConfig } from "@/lib/site-config";

const stats = [
  { value: String(projects.filter((p) => p.featured).length), label: "Featured projects" },
  { value: String(achievements.length), label: "Hackathon results" },
  { value: String(experience.length), label: "Professional roles" },
];

export default function Home() {
  const featured = projects.filter((project) => project.featured);

  return (
    <div>
      <section className="bg-grid relative overflow-hidden border-b border-black/10 dark:border-white/10">
        <div className="mx-auto max-w-5xl px-6 py-24 sm:py-32">
          <div className="flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-foreground/50">
            <span className="status-dot" />
            B.E. CSE (Cyber Security), Final Year — Coimbatore, IN
          </div>

          <h1 className="mt-6 text-5xl font-bold tracking-tight sm:text-7xl">
            {siteConfig.name}
          </h1>
          <p className="mt-3 font-mono text-base text-accent sm:text-lg">
            {siteConfig.title}
          </p>
          <p className="mt-6 max-w-xl text-lg leading-relaxed text-foreground/70">
            {siteConfig.tagline}
          </p>

          <div className="mt-10 flex flex-wrap gap-4 text-sm font-medium">
            <Link
              href="/projects"
              className="rounded-full bg-accent px-5 py-2.5 text-accent-foreground transition-opacity hover:opacity-90"
            >
              View projects
            </Link>
            <Link
              href="/contact"
              className="rounded-full border border-black/10 px-5 py-2.5 transition-colors hover:border-accent/40 dark:border-white/10"
            >
              Get in touch
            </Link>
            <a
              href={siteConfig.resumeUrl}
              download
              className="rounded-full border border-black/10 px-5 py-2.5 transition-colors hover:border-accent/40 dark:border-white/10"
            >
              Résumé
            </a>
          </div>
        </div>

        <div className="relative border-t border-black/10 dark:border-white/10">
          <div className="mx-auto grid max-w-5xl grid-cols-3 divide-x divide-black/10 px-6 dark:divide-white/10">
            {stats.map((stat) => (
              <div key={stat.label} className="py-6 text-center sm:text-left sm:px-2">
                <p className="font-mono text-3xl font-bold text-accent sm:text-4xl">
                  {stat.value}
                </p>
                <p className="mt-1 text-xs uppercase tracking-widest text-foreground/50">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-5xl px-6 py-20">
        <Reveal>
          <div className="flex items-baseline gap-3">
            <span className="h-px w-8 bg-accent" />
            <h2 className="font-mono text-xs uppercase tracking-widest text-foreground/50">
              Featured work
            </h2>
          </div>
        </Reveal>
        <div className="mt-6">
          {featured.map((project, index) => (
            <Reveal key={project.slug} delay={index * 60}>
              <ProjectCard project={project} index={index} />
            </Reveal>
          ))}
        </div>
      </section>
    </div>
  );
}
