import { GraduationCap } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { SectionHeader } from "@/components/SectionHeader";
import { education } from "@/data/resume";

export function Education() {
  return (
    <section id="education" className="mx-auto max-w-5xl px-4 py-24">
      <SectionHeader tag="Credentials" title="Education" />

      <Card className="mx-auto max-w-2xl">
        <CardHeader className="flex-row items-center gap-4">
          <div className="glass flex size-14 items-center justify-center rounded-2xl">
            <GraduationCap className="size-6 text-[hsl(var(--primary))]" />
          </div>
          <div>
            <div className="text-xl font-bold">{education.school}</div>
            <div className="font-medium text-[hsl(var(--primary))]">{education.degree}</div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="mb-3 text-sm text-[hsl(var(--muted-foreground))]">
            {education.dates}
          </div>
          <div className="flex flex-wrap gap-2">
            {education.coursework.map((course) => (
              <Badge key={course} variant="outline">
                {course}
              </Badge>
            ))}
          </div>
        </CardContent>
      </Card>
    </section>
  );
}
