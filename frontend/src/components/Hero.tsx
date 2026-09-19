import { Mail, Phone, Github, Linkedin, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { profile, stats } from "@/data/resume";

export function Hero() {
  return (
    <section
      id="hero"
      className="bg-mesh relative flex min-h-screen items-center overflow-hidden px-4 pb-16 pt-32"
    >
      <div
        aria-hidden
        className="animate-float absolute -left-24 top-24 size-72 rounded-full bg-[hsl(var(--primary)/0.25)] blur-3xl"
      />
      <div
        aria-hidden
        className="animate-float absolute -right-16 bottom-24 size-96 rounded-full bg-[hsl(var(--accent)/0.2)] blur-3xl"
        style={{ animationDelay: "-4s" }}
      />

      <div className="relative mx-auto grid w-full max-w-6xl grid-cols-1 items-center gap-12 lg:grid-cols-[1.2fr_1fr]">
        <div>
          <div className="glass mb-6 inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-sm">
            <span className="size-2 rounded-full bg-emerald-400 shadow-[0_0_12px_theme(colors.emerald.400)]" />
            Open to new opportunities
          </div>
          <h1 className="text-5xl font-extrabold leading-[1.05] tracking-tight sm:text-6xl">
            <span className="text-gradient">{profile.name}</span>
          </h1>
          <p className="mt-3 text-xl font-semibold text-[hsl(var(--muted-foreground))]">
            {profile.role}
          </p>
          <p className="mt-6 max-w-xl text-base leading-relaxed text-[hsl(var(--muted-foreground))]">
            {profile.summary}
          </p>

          <div className="mt-8 grid max-w-md grid-cols-3 gap-3">
            {stats.map((stat) => (
              <div key={stat.label} className="glass rounded-2xl px-3 py-4 text-center">
                <div className="text-gradient text-2xl font-extrabold">{stat.value}</div>
                <div className="mt-1 text-xs text-[hsl(var(--muted-foreground))]">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>

          <div className="mt-8 flex flex-wrap gap-3">
            <Button asChild size="lg">
              <a href="#contact">
                Get in touch <ArrowRight className="size-4" />
              </a>
            </Button>
            <Button asChild variant="glass" size="lg">
              <a href="#projects">View my work</a>
            </Button>
          </div>
        </div>

        <div className="glass glass-specular animate-float rounded-[2rem] p-8" style={{ animationDelay: "-2s" }}>
          <Avatar className="mx-auto size-32 ring-2 ring-[hsl(var(--primary)/0.4)]">
            <AvatarImage src="/avatar.jpg" alt={profile.name} />
            <AvatarFallback>SM</AvatarFallback>
          </Avatar>
          <div className="mt-5 text-center">
            <div className="text-xl font-bold">{profile.name}</div>
            <div className="text-[hsl(var(--primary))]">{profile.role}</div>
          </div>

          <div className="mt-6 flex flex-col gap-2">
            <a
              href={`mailto:${profile.email}`}
              className="flex items-center gap-3 rounded-xl bg-[hsl(var(--foreground)/0.05)] px-3 py-2.5 text-sm transition-colors hover:bg-[hsl(var(--primary)/0.12)]"
            >
              <Mail className="size-4 text-[hsl(var(--primary))]" /> {profile.email}
            </a>
            <a
              href={`tel:${profile.phone.replace(/[^\d+]/g, "")}`}
              className="flex items-center gap-3 rounded-xl bg-[hsl(var(--foreground)/0.05)] px-3 py-2.5 text-sm transition-colors hover:bg-[hsl(var(--primary)/0.12)]"
            >
              <Phone className="size-4 text-[hsl(var(--primary))]" /> {profile.phone}
            </a>
          </div>

          <div className="mt-6 flex justify-center gap-3">
            <a
              href={profile.linkedin}
              target="_blank"
              rel="noreferrer"
              className="glass glass-hover flex size-11 items-center justify-center rounded-full"
              aria-label="LinkedIn"
            >
              <Linkedin className="size-5" />
            </a>
            <a
              href={profile.github}
              target="_blank"
              rel="noreferrer"
              className="glass glass-hover flex size-11 items-center justify-center rounded-full"
              aria-label="GitHub"
            >
              <Github className="size-5" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
