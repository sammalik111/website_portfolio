import { Mail, Github, Linkedin } from "lucide-react";
import { profile } from "@/data/resume";

export function Footer() {
  return (
    <footer id="contact" className="px-4 pb-16 pt-8">
      <div className="glass glass-specular mx-auto max-w-4xl rounded-[2rem] p-10 text-center">
        <h3 className="text-gradient text-3xl font-extrabold">Let's build something.</h3>
        <p className="mx-auto mt-3 max-w-md text-[hsl(var(--muted-foreground))]">
          Open to full-stack, backend, and fintech-adjacent engineering roles.
        </p>
        <div className="mt-6 flex justify-center gap-3">
          <a
            href={`mailto:${profile.email}`}
            className="glass glass-hover flex size-12 items-center justify-center rounded-full"
            aria-label="Email"
          >
            <Mail className="size-5" />
          </a>
          <a
            href={profile.linkedin}
            target="_blank"
            rel="noreferrer"
            className="glass glass-hover flex size-12 items-center justify-center rounded-full"
            aria-label="LinkedIn"
          >
            <Linkedin className="size-5" />
          </a>
          <a
            href={profile.github}
            target="_blank"
            rel="noreferrer"
            className="glass glass-hover flex size-12 items-center justify-center rounded-full"
            aria-label="GitHub"
          >
            <Github className="size-5" />
          </a>
        </div>
        <p className="mt-8 text-xs text-[hsl(var(--muted-foreground))]">
          © {new Date().getFullYear()} {profile.name}
        </p>
      </div>
    </footer>
  );
}
