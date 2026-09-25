import type { Metadata } from "next";
import { ContactForm } from "@/components/ContactForm";
import { Magnetic } from "@/components/Magnetic";
import { Reveal } from "@/components/Reveal";
import { siteConfig } from "@/lib/site-config";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Get in touch about software engineering, cybersecurity, or research opportunities.",
};

export default function ContactPage() {
  return (
    <div className="mx-auto max-w-5xl px-6 py-20">
      <div className="flex items-baseline gap-3">
        <span className="h-px w-8 bg-accent" />
        <h1 className="font-mono text-xs uppercase tracking-widest text-foreground-muted">
          Contact
        </h1>
      </div>
      <p className="mt-6 max-w-xl text-2xl leading-snug font-medium tracking-tight sm:text-3xl">
        Let&apos;s build something meaningful.
      </p>
      <p className="mt-4 max-w-xl text-foreground/70">{siteConfig.openTo}.</p>
      <p className="mt-2 max-w-xl text-sm text-foreground-muted">
        This site leans security-heavy because that&apos;s where my deepest work is, but I&apos;m
        applying just as seriously to general Software Engineering (SDE) roles — not only
        security-focused ones.
      </p>
      <div className="mt-3 flex items-center gap-2 font-mono text-xs text-foreground-muted">
        <span className="status-dot" />
        {siteConfig.location}
      </div>

      <Reveal>
        <ContactForm />
      </Reveal>

      <Reveal className="mt-16 border-t border-black/10 pt-10 dark:border-white/10">
        <h2 className="font-mono text-xs uppercase tracking-widest text-foreground-muted">
          Or reach out directly
        </h2>
        <div className="mt-5 flex flex-col gap-3 text-sm font-medium sm:flex-row sm:flex-wrap">
          <Magnetic>
            <a
              href={`mailto:${siteConfig.email}`}
              className="inline-block w-fit rounded-full bg-accent px-5 py-2.5 text-accent-foreground transition-opacity hover:opacity-90"
            >
              {siteConfig.email}
            </a>
          </Magnetic>
          <Magnetic>
            <a
              href={siteConfig.github}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block w-fit rounded-full border border-black/10 px-5 py-2.5 transition-colors hover:border-accent/40 dark:border-white/10"
            >
              GitHub
            </a>
          </Magnetic>
          <Magnetic>
            <a
              href={siteConfig.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block w-fit rounded-full border border-black/10 px-5 py-2.5 transition-colors hover:border-accent/40 dark:border-white/10"
            >
              LinkedIn
            </a>
          </Magnetic>
          <Magnetic>
            <a
              href={siteConfig.resumeUrl}
              download
              className="inline-block w-fit rounded-full border border-black/10 px-5 py-2.5 transition-colors hover:border-accent/40 dark:border-white/10"
            >
              Download résumé
            </a>
          </Magnetic>
        </div>
      </Reveal>
    </div>
  );
}
