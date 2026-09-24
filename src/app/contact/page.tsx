import type { Metadata } from "next";
import { siteConfig } from "@/lib/site-config";

export const metadata: Metadata = {
  title: "Contact",
};

export default function ContactPage() {
  return (
    <div className="mx-auto max-w-3xl px-6 py-16">
      <h1 className="text-2xl font-semibold tracking-tight">Contact</h1>
      <p className="mt-4 max-w-xl text-foreground/80">
        Best way to reach me is email — I&apos;m also on GitHub if you want to see more of my
        work.
      </p>

      <div className="mt-8 flex flex-col gap-3 text-sm font-medium">
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
    </div>
  );
}
