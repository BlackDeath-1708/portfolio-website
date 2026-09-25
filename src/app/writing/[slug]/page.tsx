import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import ReactMarkdown from "react-markdown";
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
  const post = posts.find((p) => p.slug === slug);

  if (!post) {
    notFound();
  }

  return (
    <div className="mx-auto max-w-3xl px-6 py-20">
      <Link
        href="/writing"
        className="font-mono text-xs uppercase tracking-widest text-foreground-muted transition-colors hover:text-accent"
      >
        ← All writing
      </Link>

      <h1 className="mt-6 text-3xl font-bold tracking-tight sm:text-4xl">{post.title}</h1>
      <p className="mt-3 font-mono text-xs text-foreground-muted">
        {new Date(post.date).toLocaleDateString("en-US", {
          year: "numeric",
          month: "short",
          day: "numeric",
        })}
        {" · "}
        {post.readingTime}
      </p>

      <div className="prose prose-neutral dark:prose-invert prose-headings:font-semibold prose-a:text-accent mt-10 max-w-2xl">
        <ReactMarkdown>{post.content}</ReactMarkdown>
      </div>
    </div>
  );
}
