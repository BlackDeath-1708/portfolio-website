import type { Metadata } from "next";
import { ContactForm } from "@/components/ContactForm";
import { Reveal } from "@/components/Reveal";
import { siteConfig } from "@/lib/site-config";

export const metadata: Metadata = {
  title: "Contact",
};

export default function ContactPage() {
  return (
    <div className="mx-auto max-w-5xl px-6 py-20">
      <div className="flex items-baseline gap-3">
        <span className="h-px w-8 bg-accent" />
        <h1 className="font-mono text-xs uppercase tracking-widest text-foreground/50">
          Contact
        </h1>
      </div>
      <p className="mt-6 max-w-xl text-2xl leading-snug font-medium tracking-tight sm:text-3xl">
        Let&apos;s build something meaningful.
      </p>
      <p className="mt-4 max-w-xl text-foreground/70">{siteConfig.openTo}.</p>
      <div className="mt-3 flex items-center gap-2 font-mono text-xs text-foreground/40">
        <span className="status-dot" />
        {siteConfig.location}
      </div>

      <Reveal>
        <ContactForm />
      </Reveal>

      <Reveal className="mt-16 border-t border-black/10 pt-10 dark:border-white/10">
        <h2 className="font-mono text-xs uppercase tracking-widest text-foreground/50">
          Or reach out directly
        </h2>
        <div className="mt-5 flex flex-col gap-3 text-sm font-medium sm:flex-row sm:flex-wrap">
          <a
            href={`mailto:${siteConfig.email}`}
            className="w-fit rounded-full bg-accent px-5 py-2.5 text-accent-foreground transition-opacity hover:opacity-90"
          >
            {siteConfig.email}
          </a>
          <a
            href={siteConfig.github}
            target="_blank"
            rel="noopener noreferrer"
            className="w-fit rounded-full border border-black/10 px-5 py-2.5 transition-colors hover:border-accent/40 dark:border-white/10"
          >
            GitHub
          </a>
          <a
            href={siteConfig.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="w-fit rounded-full border border-black/10 px-5 py-2.5 transition-colors hover:border-accent/40 dark:border-white/10"
          >
            LinkedIn
          </a>
          <a
            href={siteConfig.resumeUrl}
            download
            className="w-fit rounded-full border border-black/10 px-5 py-2.5 transition-colors hover:border-accent/40 dark:border-white/10"
          >
            Download résumé
          </a>
        </div>
      </Reveal>
    </div>
  );
}
