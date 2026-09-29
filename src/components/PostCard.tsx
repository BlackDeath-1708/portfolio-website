import Link from "next/link";
import { Badge } from "@/components/Badge";
import { eyebrow } from "@/components/ui/styles";
import type { Post } from "@/lib/writing";

export const formatPostDate = (iso: string) =>
  new Date(iso).toLocaleDateString("en-US", { year: "numeric", month: "short", day: "numeric" });

/** Editorial post card: topic, title, excerpt, tags, date and read time. */
export function PostCard({ post }: { post: Post }) {
  return (
    <article className="group card relative flex h-full flex-col p-7 transition-[border-color,transform] duration-300 hover:-translate-y-1 hover:border-accent/40 has-[a:focus-visible]:outline-2 has-[a:focus-visible]:outline-offset-4 has-[a:focus-visible]:outline-accent">
      <div className="flex items-center justify-between">
        <p className={`${eyebrow} text-accent`}>{post.topic}</p>
        <p className="font-mono text-[11px] text-foreground-muted">{post.readingTime} read</p>
      </div>
      <h3 className="mt-5 text-2xl leading-snug font-semibold tracking-tight">
        <Link href={`/writing/${post.slug}`} className="after:absolute after:inset-0 focus-visible:outline-none">
          {post.title}
        </Link>
      </h3>
      <p className="mt-3 text-sm leading-relaxed text-foreground/65">{post.excerpt}</p>
      <div className="mt-auto flex flex-wrap items-center justify-between gap-4 pt-8">
        <ul className="flex flex-wrap gap-1.5">
          {post.tags.map((tag) => (
            <li key={tag}>
              <Badge>{tag}</Badge>
            </li>
          ))}
        </ul>
        <span className="font-mono text-[11px] text-foreground-muted">
          <time dateTime={post.date}>{formatPostDate(post.date)}</time>
          <span aria-hidden className="ml-3 inline-block text-accent transition-transform group-hover:translate-x-1">
            →
          </span>
        </span>
      </div>
    </article>
  );
}
