import { Entry } from "@/components/Entry";
import { Section } from "@/components/Section";
import { useResume } from "@/data/ResumeProvider";

export function Projects() {
  const { projects } = useResume();
  if (projects.length === 0) return null;

  return (
    <Section id="projects" title="Projects">
      {projects.map((project) => (
        <Entry
          key={project.title}
          meta={project.dates ?? project.role}
          title={project.title}
          href={project.link}
          subtitle={project.dates ? project.role : undefined}
          description={project.summary ?? project.bullets[0]}
          tags={project.tech}
          links={project.repo ? [{ label: "Source", href: project.repo }] : []}
        />
      ))}
    </Section>
  );
}
