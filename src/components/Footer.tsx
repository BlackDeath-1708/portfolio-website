"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { siteConfig } from "@/lib/site-config";
import { isForcedDarkRoute } from "@/lib/theme-routes";

const linkClass = "transition-colors hover:text-accent";

export function Footer() {
  const year = new Date().getFullYear();
  const forceDark = isForcedDarkRoute(usePathname());

  return (
    <footer data-theme={forceDark ? "dark" : undefined} className="border-t border-line">
      <div className="mx-auto flex max-w-6xl flex-col gap-6 px-6 py-10 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <Link href="/" className="text-sm font-semibold tracking-tight">
            {siteConfig.name}
          </Link>
          <p className="mt-1 font-mono text-xs tracking-wider text-foreground-muted uppercase">
            {siteConfig.positioning}
          </p>
        </div>
        <div className="flex flex-col gap-3 font-mono text-xs text-foreground-muted sm:items-end">
          <div className="flex gap-6">
            <a href={siteConfig.github} target="_blank" rel="noopener noreferrer" className={linkClass}>
              GitHub
            </a>
            <a href={siteConfig.linkedin} target="_blank" rel="noopener noreferrer" className={linkClass}>
              LinkedIn
            </a>
            <a href={`mailto:${siteConfig.email}`} className={linkClass}>
              Email
            </a>
          </div>
          <p>© {year}</p>
        </div>
      </div>
    </footer>
  );
}
