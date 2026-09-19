import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";

const links = [
  { href: "#experience", label: "Experience" },
  { href: "#projects", label: "Projects" },
  { href: "#skills", label: "Skills" },
  { href: "#education", label: "Education" },
];

export function Nav() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header className="fixed inset-x-0 top-0 z-50 flex justify-center px-4 pt-4">
      <nav
        className={`glass flex w-full max-w-3xl items-center justify-between rounded-full px-5 py-3 transition-shadow duration-500 ${
          scrolled ? "shadow-[0_8px_40px_-8px_hsl(222_80%_2%/0.7)]" : ""
        }`}
      >
        <a href="#hero" className="text-gradient text-lg font-extrabold tracking-tight">
          SM
        </a>
        <div className="hidden items-center gap-1 md:flex">
          {links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="rounded-full px-4 py-2 text-sm font-medium text-[hsl(var(--muted-foreground))] transition-colors hover:bg-[hsl(var(--foreground)/0.08)] hover:text-[hsl(var(--foreground))]"
            >
              {link.label}
            </a>
          ))}
        </div>
        <Button asChild size="sm">
          <a href="#contact">Contact</a>
        </Button>
      </nav>
    </header>
  );
}
