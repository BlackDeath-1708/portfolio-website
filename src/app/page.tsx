import Link from "next/link";
import { ProjectCard } from "@/components/ProjectCard";
import { Reveal } from "@/components/Reveal";
import { NetworkVisual } from "@/components/three/NetworkVisual";
import { achievements, experience } from "@/lib/resume";
import { projects } from "@/lib/projects";
import { siteConfig } from "@/lib/site-config";
import { posts } from "@/lib/writing";

const stats = [
  { value: String(projects.length), label: "Projects shipped" },
  { value: String(experience.length), label: "Professional roles" },
  { value: String(achievements.length), label: "Hackathon results" },
  { value: siteConfig.education.graduation, label: "Graduation" },
];

export default function Home() {
  const highlights = projects.filter((project) => project.featured);

  return (
    <div>
      <section className="bg-grid relative overflow-hidden border-b border-black/10 dark:border-white/10">
        <NetworkVisual
          mode="cloud"
          count={30}
          travelerCount={6}
          eager
          className="pointer-events-none absolute inset-0 opacity-70"
        />
        <div className="relative z-10 mx-auto max-w-5xl px-6 py-24 sm:py-32">
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
          <p className="mt-3 font-mono text-xs text-foreground/40">
            {siteConfig.location} · {siteConfig.openTo}
          </p>

          <div className="mt-8 flex flex-wrap gap-4 text-sm font-medium">
            <Link
              href="/work"
              className="rounded-full bg-accent px-5 py-2.5 text-accent-foreground transition-opacity hover:opacity-90"
            >
              View work
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

        <div className="relative z-10 border-t border-black/10 bg-background/60 backdrop-blur-sm dark:border-white/10">
          <div className="mx-auto grid max-w-5xl grid-cols-2 divide-x divide-y divide-black/10 px-6 sm:grid-cols-4 sm:divide-y-0 dark:divide-white/10">
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
          <div className="flex items-baseline justify-between gap-3">
            <div className="flex items-baseline gap-3">
              <span className="h-px w-8 bg-accent" />
              <h2 className="font-mono text-xs uppercase tracking-widest text-foreground/50">
                Highlighted work
              </h2>
            </div>
            <Link
              href="/work"
              className="font-mono text-xs uppercase tracking-widest text-foreground/50 transition-colors hover:text-accent"
            >
              View all →
            </Link>
          </div>
        </Reveal>
        <div className="mt-6">
          {highlights.map((project, index) => (
            <Reveal key={project.slug} delay={index * 60}>
              <ProjectCard project={project} index={index} />
            </Reveal>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-5xl border-t border-black/10 px-6 py-20 dark:border-white/10">
        <Reveal>
          <div className="flex items-baseline justify-between gap-3">
            <div className="flex items-baseline gap-3">
              <span className="h-px w-8 bg-accent" />
              <h2 className="font-mono text-xs uppercase tracking-widest text-foreground/50">
                Recent writing
              </h2>
            </div>
            <Link
              href="/writing"
              className="font-mono text-xs uppercase tracking-widest text-foreground/50 transition-colors hover:text-accent"
            >
              View all →
            </Link>
          </div>
        </Reveal>
        <div className="mt-6 grid gap-6 sm:grid-cols-2">
          {posts.slice(0, 2).map((post, index) => (
            <Reveal key={post.slug} delay={index * 60}>
              <Link
                href={`/writing/${post.slug}`}
                className="group block rounded-lg border border-black/10 p-5 transition-all hover:border-accent/40 hover:shadow-[0_0_24px_-8px_var(--color-accent)] dark:border-white/10"
              >
                <h3 className="font-semibold tracking-tight transition-colors group-hover:text-accent">
                  {post.title}
                </h3>
                <p className="mt-2 text-sm text-foreground/60">{post.excerpt}</p>
              </Link>
            </Reveal>
          ))}
        </div>
      </section>
    </div>
  );
}
