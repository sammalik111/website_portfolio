import { Reveal } from "@/components/Reveal";
import { useResume } from "@/data/ResumeProvider";

export function Footer() {
  const { profile } = useResume();

  const links = [
    profile.email && { label: profile.email, href: `mailto:${profile.email}` },
    profile.phone && { label: profile.phone, href: `tel:${profile.phone.replace(/[^\d+]/g, "")}` },
    profile.linkedin && { label: "LinkedIn", href: profile.linkedin },
    profile.github && { label: "GitHub", href: profile.github },
  ].filter((link): link is { label: string; href: string } => Boolean(link));

  return (
    <footer id="contact" className="mx-auto w-full max-w-3xl px-6 pb-10 pt-12 md:pt-16">
      <Reveal>
        <div className="border-t pt-10">
          <h2 className="text-2xl font-semibold tracking-tight">Get in touch</h2>
          <p className="mt-2 text-muted-foreground">
            Open to full-stack, backend, and fintech-adjacent engineering roles.
          </p>
          <div className="mt-5 flex flex-wrap gap-x-6 gap-y-2 text-[15px]">
            {links.map((link) => (
              <a
                key={link.href}
                href={link.href}
                {...(link.href.startsWith("http") ? { target: "_blank", rel: "noreferrer" } : {})}
                className="font-medium text-primary hover:underline"
              >
                {link.label}
              </a>
            ))}
          </div>
          <p className="mt-10 text-xs text-muted-foreground">
            © {new Date().getFullYear()} {profile.name}
          </p>
        </div>
      </Reveal>
    </footer>
  );
}
