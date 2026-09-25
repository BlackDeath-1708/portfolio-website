import type { Metadata } from "next";
import Image from "next/image";
import { Reveal } from "@/components/Reveal";
import { SkillLayers } from "@/components/SkillLayers";
import { SplitReveal } from "@/components/SplitReveal";
import { achievements, experience, skills } from "@/lib/resume";
import { siteConfig } from "@/lib/site-config";

export const metadata: Metadata = {
  title: "About",
  description:
    "Final-year Computer Science (Cyber Security) student building eBPF/XDP kernel security tooling, network threat detection, and full-stack software.",
};

const ABOUT_STATEMENT = "Security engineer. Software builder. Deliberately both.";

const skillLayers = Object.entries(skills).map(([label, items]) => ({ label, items }));

export default function AboutPage() {
  return (
    <div data-theme="dark" className="bg-background">
      <section className="relative flex min-h-screen flex-col justify-center overflow-hidden px-6 py-24">
        <Image
          src="/about-hero-bg.jpg"
          alt=""
          aria-hidden="true"
          fill
          priority
          sizes="100vw"
          className="hidden scale-110 object-cover object-[88%_30%] opacity-78 blur-sm sm:block"
        />
        <div
          className="absolute inset-0 hidden sm:block"
          style={{
            backgroundImage:
              "linear-gradient(to right, var(--background) 0%, var(--background) 15%, color-mix(in srgb, var(--background) 80%, transparent) 35%, color-mix(in srgb, var(--background) 50%, transparent) 55%, color-mix(in srgb, var(--background) 20%, transparent) 75%, transparent 100%)",
          }}
        />

        <Image
          src="/about-hero-bg-mobile.jpg"
          alt=""
          aria-hidden="true"
          fill
          priority
          sizes="100vw"
          className="block scale-110 object-cover object-center opacity-65 blur-sm sm:hidden"
        />
        <div
          className="absolute inset-0 sm:hidden"
          style={{
            backgroundImage:
              "linear-gradient(to bottom, var(--background) 0%, var(--background) 42%, color-mix(in srgb, var(--background) 80%, transparent) 58%, color-mix(in srgb, var(--background) 50%, transparent) 72%, color-mix(in srgb, var(--background) 20%, transparent) 90%, transparent 100%)",
          }}
        />

        <div className="relative mx-auto w-full max-w-5xl">
          <Image
            src={siteConfig.avatarUrl}
            alt={siteConfig.name}
            width={128}
            height={128}
            className="h-32 w-32 rounded-full object-cover ring-2 ring-accent/30"
          />
          <div className="mt-8 flex items-baseline gap-3">
            <span className="h-px w-8 bg-accent" />
            <p className="font-mono text-xs uppercase tracking-widest text-foreground-muted">
              About
            </p>
          </div>
          <h1 className="mt-8 max-w-3xl text-5xl leading-[1.1] font-bold tracking-tight sm:text-7xl">
            <SplitReveal text={ABOUT_STATEMENT} delay={0.1} />
          </h1>
        </div>
      </section>

      <section className="flex min-h-screen flex-col justify-center border-t border-black/5 px-6 py-24 dark:border-white/5">
        <div className="mx-auto w-full max-w-5xl">
          <Reveal>
            <div className="flex max-w-2xl flex-col gap-6 text-xl leading-relaxed text-foreground/80">
              {siteConfig.narrative.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>
          </Reveal>
          <Reveal delay={120} className="mt-10">
            <div className="flex items-center gap-3 rounded-lg border border-black/10 px-5 py-4 dark:border-white/10">
              <span className="status-dot shrink-0" />
              <p className="font-mono text-xs text-foreground/60 sm:text-sm">
                <span className="text-accent">Now —</span> {siteConfig.now}
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="flex min-h-screen flex-col justify-center border-t border-black/5 px-6 py-24 dark:border-white/5">
        <div className="mx-auto w-full max-w-5xl">
          <Reveal>
            <h2 className="font-mono text-xs uppercase tracking-widest text-foreground-muted">
              Experience
            </h2>
            <div className="relative mt-8 flex flex-col gap-12 border-l border-black/10 pl-8 dark:border-white/10">
              {experience.map((job) => (
                <div key={job.role} className="relative">
                  <span className="absolute top-1.5 -left-[calc(2rem+4.5px)] h-2.5 w-2.5 rounded-full bg-accent" />
                  <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
                    <h3 className="text-xl font-semibold">{job.role}</h3>
                    <span className="font-mono text-xs text-foreground-muted">{job.period}</span>
                  </div>
                  <p className="text-sm text-accent">{job.org}</p>
                  <ul className="mt-3 list-disc space-y-1.5 pl-5 text-sm leading-relaxed text-foreground/70">
                    {job.points.map((point) => (
                      <li key={point}>{point}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      <section className="flex min-h-screen flex-col justify-center border-t border-black/5 px-6 py-24 dark:border-white/5">
        <div className="mx-auto w-full max-w-5xl">
          <Reveal>
            <h2 className="font-mono text-xs uppercase tracking-widest text-foreground-muted">
              Skills & stack
            </h2>
            <p className="mt-3 text-sm text-foreground-muted">Tap a layer to expand it.</p>
            <div className="mt-8">
              <SkillLayers layers={skillLayers} />
            </div>
          </Reveal>

          <Reveal delay={120} className="mt-16">
            <h2 className="font-mono text-xs uppercase tracking-widest text-foreground-muted">
              Education
            </h2>
            <div className="mt-8 grid gap-x-8 gap-y-4 rounded-lg border border-black/10 p-6 sm:grid-cols-2 dark:border-white/10">
              <div>
                <p className="font-mono text-xs uppercase tracking-widest text-foreground-muted">
                  Degree
                </p>
                <p className="mt-1 text-sm text-foreground/80">{siteConfig.education.degree}</p>
              </div>
              <div>
                <p className="font-mono text-xs uppercase tracking-widest text-foreground-muted">
                  Specialization
                </p>
                <p className="mt-1 text-sm text-foreground/80">
                  {siteConfig.education.specialization}
                </p>
              </div>
              <div>
                <p className="font-mono text-xs uppercase tracking-widest text-foreground-muted">
                  Institution
                </p>
                <p className="mt-1 text-sm text-foreground/80">
                  {siteConfig.education.institution}
                </p>
              </div>
              <div>
                <p className="font-mono text-xs uppercase tracking-widest text-foreground-muted">
                  Graduation
                </p>
                <p className="mt-1 text-sm text-foreground/80">
                  {siteConfig.education.graduation}
                </p>
              </div>
              <div className="sm:col-span-2">
                <p className="font-mono text-xs uppercase tracking-widest text-foreground-muted">
                  Focus
                </p>
                <p className="mt-1 text-sm text-foreground/80">{siteConfig.education.focus}</p>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="flex min-h-screen flex-col justify-center border-t border-black/5 px-6 py-24 dark:border-white/5">
        <div className="mx-auto w-full max-w-5xl">
          <Reveal>
            <h2 className="font-mono text-xs uppercase tracking-widest text-foreground-muted">
              Achievements
            </h2>
            <ul className="mt-8 flex flex-col gap-4">
              {achievements.map((item) => (
                <li
                  key={item}
                  className="flex gap-3 text-base leading-relaxed text-foreground/80"
                >
                  <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
                  {item}
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </section>
    </div>
  );
}
