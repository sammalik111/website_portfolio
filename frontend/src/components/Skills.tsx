import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { SectionHeader } from "@/components/SectionHeader";
import { skills } from "@/data/resume";

export function Skills() {
  return (
    <section id="skills" className="mx-auto max-w-5xl px-4 py-24">
      <SectionHeader
        tag="Arsenal"
        title="Skills & Technologies"
        description="Languages, frameworks, and infrastructure I work in day to day."
      />

      <div className="grid gap-6 sm:grid-cols-2">
        {skills.map((group) => (
          <Card key={group.category}>
            <CardHeader>
              <CardTitle>{group.category}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2">
                {group.items.map((item) => (
                  <Badge key={item} variant="outline">
                    {item}
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
}
