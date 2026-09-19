import { Entry } from "@/components/Entry";
import { Section } from "@/components/Section";
import { resume } from "@/data/resume";

export function Experience() {
  const { experience } = resume;
  if (experience.length === 0) return null;

  return (
    <Section id="experience" title="Experience">
      <div className="space-y-6">
        {experience.map((job) => (
          <Entry
            key={`${job.company}-${job.dates ?? job.title}`}
            title={job.company}
            meta={job.dates}
            subtitle={[job.title, job.location].filter(Boolean).join(" · ")}
            bullets={job.bullets}
            tags={job.skills}
          />
        ))}
      </div>
    </Section>
  );
}
