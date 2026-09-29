"use client";

import { usePathname } from "next/navigation";
import { siteConfig } from "@/lib/site-config";
import { isForcedDarkRoute } from "@/lib/theme-routes";

export function Footer() {
  const year = new Date().getFullYear();
  const forceDark = isForcedDarkRoute(usePathname());

  return (
    <footer
      data-theme={forceDark ? "dark" : undefined}
      className="border-t border-black/10 dark:border-white/10"
    >
      <div className="mx-auto flex max-w-5xl flex-wrap items-center justify-between gap-4 px-6 py-8 font-mono text-xs text-foreground-muted">
        <p>
          © {year} {siteConfig.name}
        </p>
        <div className="flex gap-6">
          <a
            href={siteConfig.github}
            target="_blank"
            rel="noopener noreferrer"
            className="transition-colors hover:text-accent"
          >
            GitHub
          </a>
          <a
            href={siteConfig.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="transition-colors hover:text-accent"
          >
            LinkedIn
          </a>
          <a
            href={`mailto:${siteConfig.email}`}
            className="transition-colors hover:text-accent"
          >
            Email
          </a>
        </div>
      </div>
    </footer>
  );
}
