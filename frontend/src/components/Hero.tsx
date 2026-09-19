import { FileText, Github, Linkedin, Mail } from "lucide-react";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Reveal } from "@/components/Reveal";
import { useResume } from "@/data/ResumeProvider";

export function Hero() {
  const { profile } = useResume();
  const tagline = [profile.role, profile.location].filter(Boolean).join(" · ");

  return (
    <section id="hero" className="mx-auto w-full max-w-3xl px-6 pb-8 pt-28 md:pt-36">
      <Reveal>
        <div className="flex items-center gap-5">
          <Avatar className="size-16 md:size-20">
            <AvatarImage src="/avatar.jpg" alt={profile.name} />
            <AvatarFallback>SM</AvatarFallback>
          </Avatar>
          <div>
            <h1 className="text-3xl font-semibold tracking-tight md:text-4xl">{profile.name}</h1>
            {tagline ? <p className="mt-1 text-muted-foreground md:text-lg">{tagline}</p> : null}
          </div>
        </div>

        <div className="surface mt-6 inline-flex items-center gap-2 rounded-full px-3 py-1 text-[13px] text-foreground/85">
          <span className="size-2 rounded-full bg-emerald-500" />
          Open to new opportunities
        </div>

        {profile.summary ? (
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-foreground/85">
            {profile.summary}
          </p>
        ) : null}

        <div className="mt-8 flex flex-wrap gap-3">
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
