import { useState } from "react";
import { ArrowUpRight } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Reveal } from "@/components/Reveal";
import { cn } from "@/lib/utils";

export type EntryProps = {
  title: string;
  /** Makes the title an external link. */
  href?: string;
  /** Right-aligned in the header, e.g. dates. */
  meta?: string;
  subtitle?: string;
  description?: string;
  bullets?: string[];
  /** How many bullets show before the "show more" toggle. */
  visibleBullets?: number;
  tags?: string[];
  links?: { label: string; href: string }[];
  className?: string;
};

/** The one card layout used by experience, projects, education, and volunteering. */
export function Entry({
  title,
  href,
  meta,
  subtitle,
  description,
  bullets = [],
  visibleBullets = 2,
  tags = [],
  links = [],
  className,
}: EntryProps) {
  const [expanded, setExpanded] = useState(false);
  const hidden = Math.max(bullets.length - visibleBullets, 0);
  const shown = expanded ? bullets : bullets.slice(0, visibleBullets);

  return (
    <Reveal className={cn("h-full", className)}>
      <article className="surface flex h-full flex-col rounded-[var(--radius)] p-6 md:p-8">
        <header className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1">
          <h3 className="text-xl font-semibold tracking-tight">
            {href ? (
              <a
                href={href}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1 transition-colors hover:text-primary"
              >
                {title}
                <ArrowUpRight className="size-4" />
              </a>
            ) : (
              title
            )}
          </h3>
          {meta ? <span className="text-sm text-muted-foreground">{meta}</span> : null}
        </header>
        {subtitle ? <div className="mt-1 text-[15px] text-muted-foreground">{subtitle}</div> : null}

        {description ? (
          <p className="mt-4 text-[15px] leading-7 text-foreground/85">{description}</p>
        ) : null}

        {shown.length > 0 ? (
          <ul className="mt-5 list-disc space-y-3 pl-5 text-[15px] leading-7 text-foreground/85 marker:text-muted-foreground">
            {shown.map((bullet, i) => (
              <li key={i}>{bullet}</li>
            ))}
          </ul>
        ) : null}
        {hidden > 0 ? (
          <button
            type="button"
            onClick={() => setExpanded((v) => !v)}
            aria-expanded={expanded}
            className="mt-4 self-start text-sm font-medium text-primary hover:underline"
          >
            {expanded ? "Show less" : `Show ${hidden} more`}
          </button>
        ) : null}

        {tags.length > 0 ? (
          <div className="mt-auto flex flex-wrap gap-1.5 pt-6">
            {tags.map((tag) => (
              <Badge key={tag}>{tag}</Badge>
            ))}
          </div>
        ) : null}

        {links.length > 0 ? (
          <div className="mt-4 flex flex-wrap gap-x-5 gap-y-1 text-sm">
            {links.map((link) => (
              <a
                key={link.href}
                href={link.href}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1 font-medium text-primary hover:underline"
              >
                {link.label}
                <ArrowUpRight className="size-3.5" />
              </a>
            ))}
          </div>
        ) : null}
      </article>
    </Reveal>
  );
}
