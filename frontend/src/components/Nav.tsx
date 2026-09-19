import { ThemeToggle } from "@/components/ThemeToggle";
import { useResume } from "@/data/ResumeProvider";

export function Nav() {
  const { profile, experience, projects, skills, education, volunteering } = useResume();

  // Only link to sections that actually render, since the content can now change without a redeploy.
  const links = [
    { href: "#experience", label: "Experience", show: experience.length > 0 },
    { href: "#projects", label: "Projects", show: projects.length > 0 },
    { href: "#skills", label: "Skills", show: skills.length > 0 },
    { href: "#education", label: "Education", show: education.length + volunteering.length > 0 },
  ].filter((link) => link.show);

  return (
    <header className="surface-bar fixed inset-x-0 top-0 z-50">
      <nav className="mx-auto flex h-14 max-w-3xl items-center justify-between px-6">
        <a href="#hero" className="text-[15px] font-semibold tracking-tight">
          {profile.name}
        </a>
        <div className="flex items-center gap-5">
          <div className="hidden items-center gap-5 sm:flex">
            {links.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-sm text-muted-foreground transition-colors hover:text-foreground"
              >
                {link.label}
              </a>
            ))}
          </div>
          <ThemeToggle />
        </div>
      </nav>
    </header>
  );
}
