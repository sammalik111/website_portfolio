import { useState } from "react";
import { ArrowUpRight } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Reveal } from "@/components/Reveal";
import { cn } from "@/lib/utils";

export type EntryProps = {
  title: string;
  /** Makes the title an external link. */
  href?: string;
  /** Small blue label above the title, e.g. dates. */
  meta?: string;
  subtitle?: string;
  description?: string;
  bullets?: string[];
  /** How many bullets show before the "show more" toggle. */
  visibleBullets?: number;
  tags?: string[];
  links?: { label: string; href: string }[];
  /**
   * "timeline" hangs each entry off a vertical line with a dot (jobs, schools);
   * "list" separates entries with dividers (needs `divide-y` on the parent).
   */
  variant?: "timeline" | "list";
};

const wrapper = {
  timeline: "relative border-l pb-14 pl-8 last:border-transparent last:pb-0",
  list: "py-8 first:pt-0 last:pb-0",
};

/** One entry in a section. No boxes: separation comes from spacing, the timeline, or dividers. */
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
  variant = "list",
}: EntryProps) {
  const [expanded, setExpanded] = useState(false);
  const hidden = Math.max(bullets.length - visibleBullets, 0);
  const shown = expanded ? bullets : bullets.slice(0, visibleBullets);

  return (
    <Reveal className={wrapper[variant]}>
      {variant === "timeline" ? (
        <span
          aria-hidden
          className={cn(
            "absolute -left-[6.5px] size-3 rounded-full border-2 border-primary bg-background",
            meta ? "top-1" : "top-2.5",
          )}
        />
      ) : null}

      <article>
        {meta ? (
          <div className="text-xs font-medium uppercase tracking-wider text-primary">{meta}</div>
        ) : null}
        <h3 className={cn("text-xl font-semibold tracking-tight", meta && "mt-1")}>
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
        {subtitle ? <div className="mt-0.5 text-[15px] text-muted-foreground">{subtitle}</div> : null}

        {description ? (
          <p className="mt-3 text-[15px] leading-7 text-foreground/85">{description}</p>
        ) : null}

        {shown.length > 0 ? (
          <ul className="mt-4 list-disc space-y-2.5 pl-5 text-[15px] leading-7 text-foreground/85 marker:text-muted-foreground">
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
            className="mt-4 text-sm font-medium text-primary hover:underline"
          >
            {expanded ? "Show less" : `Show ${hidden} more`}
          </button>
        ) : null}

        {tags.length > 0 ? (
          <div className="mt-5 flex flex-wrap gap-1.5">
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
