import { Entry } from "@/components/Entry";
import { Section } from "@/components/Section";
import { resume } from "@/data/resume";

export function Projects() {
  const { projects } = resume;
  if (projects.length === 0) return null;

  return (
    <Section id="projects" title="Projects">
      <div className="grid gap-6 md:grid-cols-2">
        {projects.map((project, i) => (
          <Entry
            key={project.title}
            // The first project is the featured one and spans the full width.
            className={i === 0 ? "md:col-span-2" : undefined}
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
    </Section>
  );
}
