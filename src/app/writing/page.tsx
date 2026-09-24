import type { Metadata } from "next";
import Link from "next/link";
import { Reveal } from "@/components/Reveal";
import { posts } from "@/lib/writing";

export const metadata: Metadata = {
  title: "Writing",
};

export default function WritingPage() {
  return (
    <div className="mx-auto max-w-5xl px-6 py-20">
      <div className="flex items-baseline gap-3">
        <span className="h-px w-8 bg-accent" />
        <h1 className="font-mono text-xs uppercase tracking-widest text-foreground/50">
          Writing
        </h1>
      </div>
      <p className="mt-4 max-w-xl text-lg text-foreground/70">
        Notes on specific technical problems I ran into, and how I actually solved them.
      </p>
      <div className="mt-10">
        {posts.map((post, index) => (
          <Reveal key={post.slug} delay={index * 60}>
            <Link
              href={`/writing/${post.slug}`}
              className="group flex flex-col gap-3 border-b border-black/10 py-8 transition-colors first:border-t dark:border-white/10 sm:flex-row sm:items-baseline sm:gap-8"
            >
              <span className="font-mono text-sm text-foreground/30 sm:w-10 sm:shrink-0">
                {String(index + 1).padStart(2, "0")}
              </span>
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <h2 className="text-lg font-semibold tracking-tight transition-colors group-hover:text-accent sm:text-xl">
                    {post.title}
                  </h2>
                  <span
                    aria-hidden
                    className="translate-x-0 text-accent opacity-0 transition-all duration-300 group-hover:translate-x-1 group-hover:opacity-100"
                  >
                    →
                  </span>
                </div>
                <p className="mt-1 text-sm text-foreground/60">{post.excerpt}</p>
                <p className="mt-3 font-mono text-xs text-foreground/40">
                  {new Date(post.date).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "short",
                    day: "numeric",
                  })}
                  {" · "}
                  {post.readingTime}
                </p>
              </div>
            </Link>
          </Reveal>
        ))}
      </div>
    </div>
  );
}
