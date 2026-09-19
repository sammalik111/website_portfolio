import { Entry } from "@/components/Entry";
import { Section } from "@/components/Section";
import { resume } from "@/data/resume";

export function Education() {
  const { education, volunteering } = resume;
  if (education.length === 0 && volunteering.length === 0) return null;

  return (
    <Section id="education" title="Education & community">
      <div className="space-y-6">
        {education.map((entry) => (
          <Entry
            key={entry.school}
            title={entry.school}
            meta={entry.dates}
            subtitle={[entry.degree, entry.focus].filter(Boolean).join(" · ")}
            tags={entry.coursework}
          />
        ))}
        {volunteering.map((entry) => (
          <Entry
            key={entry.organization}
            title={entry.organization}
            meta={entry.dates}
            subtitle={entry.role}
            description={entry.description}
          />
        ))}
      </div>
    </Section>
  );
}
