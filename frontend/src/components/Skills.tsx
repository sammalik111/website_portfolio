import { Badge } from "@/components/ui/badge";
import { resume } from "@/data/resume";

export function Skills() {
  return (
    <div className="divide-y divide-[hsl(var(--border))]">
      {resume.skills.map((group) => (
        <div
          key={group.category}
          className="grid gap-3 py-6 first:pt-0 last:pb-0 sm:grid-cols-[9rem_minmax(0,1fr)] sm:gap-8"
        >
          <h3 className="text-[15px] font-semibold tracking-tight">{group.category}</h3>
          <div className="flex flex-wrap gap-1.5">
            {group.items.map((item, i) => (
              <Badge key={`${item}-${i}`}>{item}</Badge>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
