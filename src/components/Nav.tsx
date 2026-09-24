import Link from "next/link";
import { siteConfig } from "@/lib/site-config";

export function Nav() {
  return (
    <header className="sticky top-0 z-20 border-b border-black/10 bg-background/75 backdrop-blur-md dark:border-white/10">
      <div className="mx-auto flex max-w-5xl flex-wrap items-center justify-between gap-4 px-6 py-4">
        <Link
          href="/"
          aria-label={`SV. — ${siteConfig.name}, Home`}
          className="font-mono text-sm font-semibold tracking-tight"
        >
          SV<span className="text-accent">.</span>
        </Link>
        <nav aria-label="Primary" className="flex gap-6 font-mono text-xs uppercase tracking-widest">
          {siteConfig.nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-foreground/60 transition-colors hover:text-accent focus-visible:text-accent"
            >
              {item.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}
