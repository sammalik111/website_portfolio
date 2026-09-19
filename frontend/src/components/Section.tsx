import type { ReactNode } from "react";
import { Reveal } from "@/components/Reveal";

/** Every content section shares this width, spacing, and heading style. */
export function Section({
  id,
  title,
  children,
}: {
  id: string;
  title: string;
  children: ReactNode;
}) {
  return (
    <section id={id} className="mx-auto w-full max-w-3xl px-6 py-12 md:py-16">
      <Reveal>
        <h2 className="mb-8 border-b pb-3 text-sm font-semibold uppercase tracking-[0.08em] text-muted-foreground">
          {title}
        </h2>
      </Reveal>
      <div className="space-y-10">{children}</div>
    </section>
  );
}
