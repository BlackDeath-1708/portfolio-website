import { PostCard } from "@/components/PostCard";
import { Reveal } from "@/components/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { posts } from "@/lib/writing";

export function ThinkingInPublic() {
  return (
    <section aria-labelledby="writing-title" className="mx-auto max-w-6xl px-6 py-16 sm:py-24">
      <Reveal>
        <SectionHeading
          id="writing-title"
          index="06"
          label="Writing"
          title="Thinking in public."
          description="Notes on specific technical problems I ran into, and how I actually solved them."
          action={{ label: "All writing", href: "/writing" }}
        />
      </Reveal>
      <div className="mt-12 grid gap-5 md:grid-cols-2">
        {posts.map((post, i) => (
          <Reveal key={post.slug} delay={i * 80}>
            <PostCard post={post} />
          </Reveal>
        ))}
      </div>
    </section>
  );
}
