import { Entry } from "@/components/Entry";
import { resume } from "@/data/resume";

export function Education() {
  const { education, volunteering } = resume;

  return (
    <div>
      {education.map((entry) => (
        <Entry
          key={entry.school}
          variant="timeline"
          title={entry.school}
          meta={entry.dates}
          subtitle={[entry.degree, entry.focus].filter(Boolean).join(" · ")}
          tags={entry.coursework}
        />
      ))}
      {volunteering.map((entry) => (
        <Entry
          key={entry.organization}
          variant="timeline"
          title={entry.organization}
          meta={["Volunteering", entry.dates].filter(Boolean).join(" · ")}
          subtitle={entry.role}
          description={entry.description}
        />
      ))}
    </div>
  );
}
