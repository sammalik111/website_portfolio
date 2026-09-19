import { ThemeToggle } from "@/components/ThemeToggle";
import { sections } from "@/components/sections";
import { resume } from "@/data/resume";

export function Nav() {
  return (
    <header className="surface-bar fixed inset-x-0 top-0 z-50">
      <nav className="mx-auto flex h-14 max-w-5xl items-center justify-between px-6">
        <a href="#hero" className="text-[15px] font-semibold tracking-tight">
          {resume.profile.name}
        </a>
        <div className="flex items-center gap-6">
          <div className="hidden items-center gap-6 sm:flex">
            {sections.map((section) => (
              <a
                key={section.id}
                href={`#${section.id}`}
                className="text-sm text-muted-foreground transition-colors hover:text-foreground"
              >
                {section.title}
              </a>
            ))}
          </div>
          <ThemeToggle />
        </div>
      </nav>
    </header>
  );
}
