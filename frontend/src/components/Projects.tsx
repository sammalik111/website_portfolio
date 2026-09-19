import { ExternalLink, Sparkles } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { SectionHeader } from "@/components/SectionHeader";
import { featuredProject, additionalProjects } from "@/data/resume";

export function Projects() {
  return (
    <section id="projects" className="mx-auto max-w-5xl px-4 py-24">
      <SectionHeader
        tag="Portfolio"
        title="Featured Work"
        description="A flagship build, plus earlier projects along the way."
      />

      <Card className="mb-10 overflow-hidden">
        <CardHeader className="flex-row flex-wrap items-start justify-between gap-3">
          <div>
            <div className="mb-1 flex items-center gap-2 text-sm font-semibold text-[hsl(var(--accent))]">
              <Sparkles className="size-4" /> Featured
            </div>
            <div className="text-2xl font-bold">{featuredProject.title}</div>
            <div className="font-medium text-[hsl(var(--primary))]">
              {featuredProject.role} · {featuredProject.location}
            </div>
          </div>
          <Badge variant="outline">{featuredProject.dates}</Badge>
        </CardHeader>
        <CardContent>
          <ul className="space-y-2 text-sm leading-relaxed text-[hsl(var(--muted-foreground))]">
            {featuredProject.bullets.map((bullet, i) => (
              <li key={i} className="flex gap-2">
                <span className="mt-2 size-1 shrink-0 rounded-full bg-[hsl(var(--accent))]" />
                {bullet}
              </li>
            ))}
          </ul>
          <div className="mt-4 flex flex-wrap items-center gap-2">
            {featuredProject.tech.map((tech) => (
              <Badge key={tech} variant="accent">
                {tech}
              </Badge>
            ))}
            {featuredProject.link ? (
              <a
                href={featuredProject.link}
                target="_blank"
                rel="noreferrer"
                className="ml-auto inline-flex items-center gap-1.5 text-sm font-semibold text-[hsl(var(--primary))] hover:underline"
              >
                Visit site <ExternalLink className="size-3.5" />
              </a>
            ) : null}
          </div>
        </CardContent>
      </Card>

      <div className="grid gap-6 sm:grid-cols-2">
        {additionalProjects.map((project) => (
          <Card key={project.title}>
            <CardHeader>
              <div className="text-lg font-bold">{project.title}</div>
              <div className="text-sm font-medium text-[hsl(var(--primary))]">
                {project.role}
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-sm leading-relaxed text-[hsl(var(--muted-foreground))]">
                {project.bullets[0]}
              </p>
              <div className="mt-4 flex flex-wrap items-center gap-2">
                {project.tech.map((tech) => (
                  <Badge key={tech} variant="outline">
                    {tech}
                  </Badge>
                ))}
                {project.link ? (
                  <a
                    href={project.link}
                    target="_blank"
                    rel="noreferrer"
                    className="ml-auto inline-flex items-center gap-1.5 text-sm font-semibold text-[hsl(var(--primary))] hover:underline"
                  >
                    View <ExternalLink className="size-3.5" />
                  </a>
                ) : null}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
}
