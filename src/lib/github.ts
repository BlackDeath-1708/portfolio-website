import { projects } from "@/lib/projects";
import { siteConfig } from "@/lib/site-config";

export type Repo = {
  name: string;
  description: string;
  /** null when GitHub reports no primary language. */
  language: string | null;
  /** null when live GitHub data was unavailable — never guessed. */
  stars: number | null;
  url: string;
};

type LiveRepo = { url: string; language: string | null; stars: number };

const REVALIDATE_SECONDS = 60 * 60 * 24;
const REQUEST_TIMEOUT_MS = 5000;
const MAX_REPOS = 6;

const githubUser = new URL(siteConfig.github).pathname.replace(/\//g, "");

/** Curated list: the portfolio's own projects that have a public repository. */
const curated: Repo[] = projects
  .filter((project) => project.repoUrl)
  .slice(0, MAX_REPOS)
  .map((project) => ({
    name: new URL(project.repoUrl as string).pathname.split("/").pop() ?? project.slug,
    description: project.summary,
    language: project.stack[0],
    stars: null,
    url: project.repoUrl as string,
  }));

function parseLiveRepos(data: unknown): LiveRepo[] {
  if (!Array.isArray(data)) return [];
  return data.flatMap((item: unknown) => {
    if (typeof item !== "object" || item === null) return [];
    const { html_url, language, stargazers_count } = item as Record<string, unknown>;
    if (typeof html_url !== "string" || typeof stargazers_count !== "number") return [];
    return [{ url: html_url.toLowerCase(), language: typeof language === "string" ? language : null, stars: stargazers_count }];
  });
}

/**
 * Curated repos enriched with live language/star data from the GitHub API
 * (revalidated daily). Falls back to the curated list on any failure.
 */
export async function getRepos(): Promise<{ repos: Repo[]; isLive: boolean }> {
  try {
    const response = await fetch(`https://api.github.com/users/${githubUser}/repos?per_page=100`, {
      headers: { Accept: "application/vnd.github+json" },
      next: { revalidate: REVALIDATE_SECONDS },
      signal: AbortSignal.timeout(REQUEST_TIMEOUT_MS),
    });
    if (!response.ok) return { repos: curated, isLive: false };

    const live = new Map(parseLiveRepos(await response.json()).map((repo) => [repo.url, repo]));
    if (live.size === 0) return { repos: curated, isLive: false };

    const repos = curated.map((repo) => {
      const match = live.get(repo.url.toLowerCase());
      return match ? { ...repo, language: match.language, stars: match.stars } : repo;
    });
    return { repos, isLive: true };
  } catch {
    return { repos: curated, isLive: false };
  }
}
