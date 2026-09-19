import { FileText, Github, Linkedin, Mail } from "lucide-react";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Reveal } from "@/components/Reveal";
import { resume } from "@/data/resume";

export function Hero() {
  const { profile } = resume;
  const tagline = [profile.role, profile.location].filter(Boolean).join(" · ");

  return (
    <section id="hero" className="mx-auto max-w-5xl px-6 pb-20 pt-32 md:pb-28 md:pt-44">
      <Reveal>
        <div className="flex flex-wrap items-center gap-4">
          <Avatar className="size-14">
            <AvatarImage src="/avatar.jpg" alt={profile.name} />
            <AvatarFallback>SM</AvatarFallback>
          </Avatar>
          <div className="surface inline-flex items-center gap-2 rounded-full px-3 py-1 text-[13px] text-foreground/85">
            <span className="size-2 rounded-full bg-emerald-500" />
            Open to new opportunities
          </div>
        </div>

        <h1 className="mt-8 font-serif text-6xl leading-[1.02] tracking-tight md:text-8xl">
          {profile.name}
        </h1>
        {tagline ? (
          <p className="mt-4 text-xl text-foreground/85 md:text-2xl">{tagline}</p>
        ) : null}
        {profile.summary ? (
          <p className="mt-8 max-w-2xl text-lg leading-8 text-muted-foreground">{profile.summary}</p>
        ) : null}

        <div className="mt-10 flex flex-wrap gap-3">
          {profile.email ? (
            <Button asChild>
              <a href={`mailto:${profile.email}`}>
                <Mail /> Email me
              </a>
            </Button>
          ) : null}
          {profile.resumeUrl ? (
            <Button asChild variant="outline">
              <a href={profile.resumeUrl} target="_blank" rel="noreferrer">
                <FileText /> Resume
              </a>
            </Button>
          ) : null}
          {profile.linkedin ? (
            <Button asChild variant="outline">
              <a href={profile.linkedin} target="_blank" rel="noreferrer">
                <Linkedin /> LinkedIn
              </a>
            </Button>
          ) : null}
          {profile.github ? (
            <Button asChild variant="outline">
              <a href={profile.github} target="_blank" rel="noreferrer">
                <Github /> GitHub
              </a>
            </Button>
          ) : null}
        </div>
      </Reveal>
    </section>
  );
}
