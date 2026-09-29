import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import ReactMarkdown from "react-markdown";
import { Badge } from "@/components/Badge";
import { formatPostDate } from "@/components/PostCard";
import { SplitReveal } from "@/components/SplitReveal";
import { eyebrow } from "@/components/ui/styles";
import { posts } from "@/lib/writing";

type Props = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return posts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = posts.find((p) => p.slug === slug);
  if (!post) return { title: "Post not found" };
  return { title: post.title, description: post.excerpt };
}

export default async function WritingDetailPage({ params }: Props) {
  const { slug } = await params;
  const index = posts.findIndex((p) => p.slug === slug);
  if (index === -1) notFound();

  const post = posts[index];
  const others = posts.filter((p) => p.slug !== post.slug);

  return (
    <article className="mx-auto max-w-3xl px-6 pt-36 pb-24 sm:pt-44">
      <Link href="/writing" className={`${eyebrow} text-foreground-muted transition-colors hover:text-accent`}>
        ← All writing
      </Link>

      <header className="mt-8 border-b border-line pb-10">
        <p className={`${eyebrow} text-accent`}>{post.topic}</p>
        <h1 className="mt-4 text-4xl leading-[1.1] font-semibold tracking-tight sm:text-5xl">
          <SplitReveal text={post.title} />
        </h1>
        <p className="mt-5 text-lg leading-relaxed text-foreground/70">{post.excerpt}</p>
        <div className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-3">
          <p className="font-mono text-xs text-foreground-muted">
            <time dateTime={post.date}>{formatPostDate(post.date)}</time> · {post.readingTime} read
          </p>
          <ul className="flex flex-wrap gap-1.5">
            {post.tags.map((tag) => (
              <li key={tag}>
                <Badge>{tag}</Badge>
              </li>
            ))}
          </ul>
        </div>
      </header>

      <div className="prose prose-neutral dark:prose-invert prose-lg prose-headings:font-semibold prose-headings:tracking-tight prose-a:text-accent prose-code:text-accent prose-pre:border prose-pre:border-line prose-pre:bg-surface mt-10 max-w-none">
        <ReactMarkdown>{post.content}</ReactMarkdown>
      </div>

      {others.length > 0 && (
        <nav aria-label="More writing" className="mt-20 border-t border-line pt-10">
          <p className={`${eyebrow} text-foreground-muted`}>Keep reading</p>
          <ul className="mt-4 flex flex-col gap-3">
            {others.map((other) => (
              <li key={other.slug}>
                <Link
                  href={`/writing/${other.slug}`}
                  className="group card flex items-center justify-between gap-4 p-5 transition-colors hover:border-accent/40"
                >
                  <span className="font-medium transition-colors group-hover:text-accent">{other.title}</span>
                  <span aria-hidden className="text-accent transition-transform group-hover:translate-x-1">
                    →
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      )}
    </article>
  );
}
