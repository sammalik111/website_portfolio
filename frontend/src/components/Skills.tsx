import { Badge } from "@/components/ui/badge";
import { Reveal } from "@/components/Reveal";
import { Section } from "@/components/Section";
import { resume } from "@/data/resume";

export function Skills() {
  const { skills } = resume;
  if (skills.length === 0) return null;

  return (
    <Section id="skills" title="Skills">
      <Reveal>
        <div className="surface divide-y divide-[hsl(var(--border))] rounded-[var(--radius)]">
          {skills.map((group) => (
            <div
              key={group.category}
              className="grid gap-3 px-6 py-5 md:grid-cols-[12rem_1fr] md:gap-8 md:px-8"
            >
              <h3 className="font-medium">{group.category}</h3>
              <div className="flex flex-wrap gap-1.5">
                {group.items.map((item, i) => (
                  <Badge key={`${item}-${i}`}>{item}</Badge>
                ))}
              </div>
            </div>
          ))}
        </div>
      </Reveal>
    </Section>
  );
}
