import { Moon, Sun } from "lucide-react";
import { Button } from "@/components/ui/button";

export function ThemeToggle() {
  function toggle() {
    const isDark = document.documentElement.classList.toggle("dark");
    try {
      localStorage.setItem("theme", isDark ? "dark" : "light");
    } catch {
      // Storage unavailable (private mode); the toggle still works for this session.
    }
  }

  return (
    <Button variant="ghost" size="icon" className="size-9" onClick={toggle} aria-label="Toggle theme">
      <Moon className="dark:hidden" />
      <Sun className="hidden dark:block" />
    </Button>
  );
}
