import { Reveal } from "@/components/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { getRepos } from "@/lib/github";
import { siteConfig } from "@/lib/site-config";

export async function OpenSource() {
  const { repos, isLive } = await getRepos();

  return (
    <section aria-labelledby="oss-title" className="mx-auto max-w-6xl px-6 py-16 sm:py-24">
      <Reveal>
        <SectionHeading
          id="oss-title"
          index="07"
          label="Open source"
          title="Read the code."
          description={
            isLive
              ? "Public repositories behind the projects above, with live metadata from GitHub."
              : "Public repositories behind the projects above."
          }
          action={{ label: "GitHub profile", href: siteConfig.github }}
        />
      </Reveal>
      <ul className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {repos.map((repo, i) => (
          <li key={repo.url}>
            <Reveal delay={i * 60} className="h-full">
              <a
                href={repo.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group card flex h-full flex-col p-5 transition-colors hover:border-accent/40"
              >
                <div className="flex items-center gap-2">
                  <svg viewBox="0 0 16 16" className="h-4 w-4 text-foreground-muted" fill="currentColor" aria-hidden>
                    <path d="M2 2.5A2.5 2.5 0 014.5 0h8.75a.75.75 0 01.75.75v12.5a.75.75 0 01-.75.75h-2.5a.75.75 0 010-1.5h1.75v-2h-8a1 1 0 00-.714 1.7.75.75 0 11-1.072 1.05A2.495 2.495 0 012 11.5v-9zm10.5-1h-8a1 1 0 00-1 1v6.708A2.486 2.486 0 014.5 9h8V1.5z" />
                  </svg>
                  <h3 className="truncate font-mono text-sm font-medium transition-colors group-hover:text-accent">
                    {repo.name}
                  </h3>
                  <span aria-hidden className="ml-auto text-foreground-muted">
                    ↗
                  </span>
                </div>
                <p className="mt-3 text-sm leading-relaxed text-foreground/65">{repo.description}</p>
                <div className="mt-auto flex items-center gap-4 pt-5 font-mono text-[11px] text-foreground-muted">
                  {repo.language && (
                    <span className="flex items-center gap-1.5">
                      <span className="h-2 w-2 rounded-full bg-accent" aria-hidden />
                      {repo.language}
                    </span>
                  )}
                  {repo.stars !== null && repo.stars > 0 && (
                    <span>
                      ★ {repo.stars}
                      <span className="sr-only"> stars</span>
                    </span>
                  )}
                </div>
              </a>
            </Reveal>
          </li>
        ))}
      </ul>
    </section>
  );
}
