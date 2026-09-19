import { Entry } from "@/components/Entry";
import { Section } from "@/components/Section";
import { resume } from "@/data/resume";

export function Skills() {
  const { skills } = resume;
  if (skills.length === 0) return null;

  return (
    <Section id="skills" title="Skills">
      {skills.map((group) => (
        <Entry key={group.category} meta={group.category} description={group.items.join(", ")} />
      ))}
    </Section>
  );
}
