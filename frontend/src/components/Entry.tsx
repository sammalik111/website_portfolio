import { useState } from "react";
import { ArrowUpRight } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Reveal } from "@/components/Reveal";

export type EntryProps = {
  /** Left column: dates or a category label. */
  meta?: string;
  title?: string;
  /** Makes the title an external link. */
  href?: string;
  subtitle?: string;
  description?: string;
  bullets?: string[];
  /** How many bullets show before the "show more" toggle. */
  visibleBullets?: number;
  tags?: string[];
  links?: { label: string; href: string }[];
};

/** The one row layout used by experience, projects, education, and skills. */
export function Entry({
  meta,
  title,
  href,
  subtitle,
  description,
  bullets = [],
  visibleBullets = 2,
  tags = [],
  links = [],
}: EntryProps) {
  const [expanded, setExpanded] = useState(false);
  const hidden = Math.max(bullets.length - visibleBullets, 0);
  const shown = expanded ? bullets : bullets.slice(0, visibleBullets);

  return (
    <Reveal>
      <article className="grid gap-1.5 md:grid-cols-[10rem_1fr] md:gap-8">
        <div className="text-sm leading-6 text-muted-foreground">{meta}</div>

        <div>
          {title ? (
            <h3 className="text-lg font-semibold leading-snug tracking-tight">
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
          ) : null}
          {subtitle ? <div className="text-muted-foreground">{subtitle}</div> : null}

          {description ? (
            <p className={title ? "mt-2 text-foreground/85" : "text-foreground/85"}>{description}</p>
          ) : null}

          {shown.length > 0 ? (
            <ul className="mt-3 list-disc space-y-2 pl-5 text-foreground/85 marker:text-muted-foreground">
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
              className="mt-3 text-sm font-medium text-primary hover:underline"
            >
              {expanded ? "Show less" : `Show ${hidden} more`}
            </button>
          ) : null}

          {tags.length > 0 ? (
            <div className="mt-4 flex flex-wrap gap-1.5">
              {tags.map((tag) => (
                <Badge key={tag}>{tag}</Badge>
              ))}
            </div>
          ) : null}

          {links.length > 0 ? (
            <div className="mt-3 flex flex-wrap gap-x-5 gap-y-1 text-sm">
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
        </div>
      </article>
    </Reveal>
  );
}
