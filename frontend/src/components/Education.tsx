import { Entry } from "@/components/Entry";
import { Section } from "@/components/Section";
import { resume } from "@/data/resume";

export function Education() {
  const { education, volunteering } = resume;
  if (education.length === 0 && volunteering.length === 0) return null;

  return (
    <Section id="education" title="Education & community">
      {education.map((entry) => (
        <Entry
          key={entry.school}
          meta={entry.dates}
          title={entry.school}
          subtitle={[entry.degree, entry.focus].filter(Boolean).join(" · ")}
          tags={entry.coursework}
        />
      ))}
      {volunteering.map((entry) => (
        <Entry
          key={entry.organization}
          meta={entry.dates}
          title={entry.organization}
          subtitle={entry.role}
          description={entry.description}
        />
      ))}
    </Section>
  );
}
