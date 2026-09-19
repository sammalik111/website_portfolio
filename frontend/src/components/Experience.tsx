import { Entry } from "@/components/Entry";
import { Section } from "@/components/Section";
import { useResume } from "@/data/ResumeProvider";

export function Experience() {
  const { experience } = useResume();
  if (experience.length === 0) return null;

  return (
    <Section id="experience" title="Experience">
      {experience.map((job) => (
        <Entry
          key={`${job.company}-${job.dates ?? job.title}`}
          meta={job.dates}
          title={job.company}
          subtitle={[job.title, job.location].filter(Boolean).join(" · ")}
          bullets={job.bullets}
          tags={job.skills}
        />
      ))}
    </Section>
  );
}
