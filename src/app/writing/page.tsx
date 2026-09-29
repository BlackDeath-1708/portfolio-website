import type { Metadata } from "next";
import { PostCard } from "@/components/PostCard";
import { Reveal } from "@/components/Reveal";
import { PageHeader } from "@/components/ui/PageHeader";
import { posts } from "@/lib/writing";

export const metadata: Metadata = {
  title: "Writing",
  description:
    "Notes on specific technical problems I ran into while building security tooling, and how I actually solved them.",
};

export default function WritingPage() {
  return (
    <>
      <PageHeader
        label="Writing"
        title="Thinking in public."
        lead="Notes on specific technical problems I ran into, and how I actually solved them."
      />
      <section aria-label="Posts" className="mx-auto grid max-w-6xl gap-5 px-6 pb-24 sm:pb-32 md:grid-cols-2">
        {posts.map((post, i) => (
          <Reveal key={post.slug} delay={i * 80}>
            <PostCard post={post} />
          </Reveal>
        ))}
      </section>
    </>
  );
}
