import { ArrowUpRight } from "lucide-react";
import { resume } from "@/data/resume";

export function Contact() {
  const { profile } = resume;

  const links = [
    profile.email && { label: profile.email, href: `mailto:${profile.email}` },
    profile.phone && { label: profile.phone, href: `tel:${profile.phone.replace(/[^\d+]/g, "")}` },
    profile.linkedin && { label: "LinkedIn", href: profile.linkedin },
    profile.github && { label: "GitHub", href: profile.github },
  ].filter((link): link is { label: string; href: string } => Boolean(link));

  return (
    <div>
      <p className="max-w-xl text-xl leading-8 text-foreground/85">
        Open to full-stack, backend, and fintech-adjacent engineering roles.
      </p>
      <div className="mt-8 flex flex-wrap gap-x-8 gap-y-3">
        {links.map((link) => (
          <a
            key={link.href}
            href={link.href}
            {...(link.href.startsWith("http") ? { target: "_blank", rel: "noreferrer" } : {})}
            className="inline-flex items-center gap-1 font-medium text-primary hover:underline"
          >
            {link.label}
            {link.href.startsWith("http") ? <ArrowUpRight className="size-4" /> : null}
          </a>
        ))}
      </div>
      <p className="mt-20 text-xs text-muted-foreground">
        © {new Date().getFullYear()} {profile.name}
      </p>
    </div>
  );
}
