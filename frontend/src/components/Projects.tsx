import { Entry } from "@/components/Entry";
import { resume } from "@/data/resume";

export function Projects() {
  return (
    <div className="divide-y divide-[hsl(var(--border))]">
      {resume.projects.map((project) => (
        <Entry
          key={project.title}
          title={project.title}
          href={project.link}
          meta={project.dates}
          subtitle={project.role}
          description={project.summary ?? project.bullets[0]}
          tags={project.tech}
          links={project.repo ? [{ label: "Source", href: project.repo }] : []}
        />
      ))}
    </div>
  );
}
