import Link from "next/link";
import { eyebrow } from "@/components/ui/styles";

type Props = {
  index: string;
  label: string;
  title: string;
  description?: string;
  action?: { label: string; href: string };
  id?: string;
};

/** Numbered section header: mono index/label, display title, optional lead and link. */
export function SectionHeading({ index, label, title, description, action, id }: Props) {
  return (
    <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
      <div className="max-w-2xl">
        <p className={`${eyebrow} flex items-center gap-3 text-foreground-muted`}>
          <span className="text-accent">{index}</span>
          <span className="h-px w-6 bg-line" />
          {label}
        </p>
        <h2 id={id} className="mt-4 text-3xl font-semibold tracking-tight sm:text-4xl">
          {title}
        </h2>
        {description && <p className="mt-4 text-base leading-relaxed text-foreground/65">{description}</p>}
      </div>
      {action && (
        <Link
          href={action.href}
          className={`${eyebrow} shrink-0 text-foreground-muted transition-colors hover:text-accent`}
        >
          {action.label} →
        </Link>
      )}
    </div>
  );
}
