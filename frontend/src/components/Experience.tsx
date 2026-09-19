import { Entry } from "@/components/Entry";
import { resume } from "@/data/resume";

export function Experience() {
  return (
    <div>
      {resume.experience.map((job) => (
        <Entry
          key={`${job.company}-${job.dates ?? job.title}`}
          variant="timeline"
          title={job.company}
          meta={job.dates}
          subtitle={[job.title, job.location].filter(Boolean).join(" · ")}
          bullets={job.bullets}
          tags={job.skills}
        />
      ))}
    </div>
  );
}
