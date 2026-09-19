import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { SectionHeader } from "@/components/SectionHeader";
import { experience } from "@/data/resume";

export function Experience() {
  return (
    <section id="experience" className="mx-auto max-w-5xl px-4 py-24">
      <SectionHeader
        tag="Career"
        title="Professional Experience"
        description="Where I've built and shipped production software."
      />

      <div className="relative space-y-8 border-l border-[hsl(var(--foreground)/0.12)] pl-8">
        {experience.map((job) => (
          <div key={job.company} className="relative">
            <span className="absolute -left-[calc(2rem+5px)] top-2 size-3 rounded-full bg-[hsl(var(--primary))] shadow-[0_0_16px_hsl(var(--primary)/0.7)]" />
            <Card>
              <CardHeader className="flex-row flex-wrap items-start justify-between gap-3">
                <div>
                  <div className="text-xl font-bold">{job.title}</div>
                  <div className="font-medium text-[hsl(var(--primary))]">
                    {job.company} · {job.location}
                  </div>
                </div>
                <Badge variant="outline">{job.dates}</Badge>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm leading-relaxed text-[hsl(var(--muted-foreground))]">
                  {job.bullets.map((bullet, i) => (
                    <li key={i} className="flex gap-2">
                      <span className="mt-2 size-1 shrink-0 rounded-full bg-[hsl(var(--primary))]" />
                      {bullet}
                    </li>
                  ))}
                </ul>
                <div className="mt-4 flex flex-wrap gap-2">
                  {job.skills.map((skill) => (
                    <Badge key={skill}>{skill}</Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        ))}
      </div>
    </section>
  );
}
