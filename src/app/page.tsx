import Link from "next/link";
import { FeaturedWork } from "@/components/home/FeaturedWork";
import { Hero } from "@/components/home/Hero";
import { Reveal } from "@/components/Reveal";
import { posts } from "@/lib/writing";

export default function Home() {
  return (
    <div>
      <Hero />

      <FeaturedWork />

      <section className="mx-auto max-w-5xl border-t border-black/10 px-6 py-20 dark:border-white/10">
        <Reveal>
          <div className="flex items-baseline justify-between gap-3">
            <div className="flex items-baseline gap-3">
              <span className="h-px w-8 bg-accent" />
              <h2 className="font-mono text-xs uppercase tracking-widest text-foreground-muted">
                Recent writing
              </h2>
            </div>
            <Link
              href="/writing"
              className="font-mono text-xs uppercase tracking-widest text-foreground-muted transition-colors hover:text-accent"
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
