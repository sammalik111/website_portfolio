import type { ReactNode } from "react";
import { Reveal } from "@/components/Reveal";

/** Every content section shares this width, spacing, divider, and heading style. */
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
    <section id={id} className="border-t">
      <div className="mx-auto w-full max-w-4xl px-6 py-16 md:py-24">
        <Reveal>
          <h2 className="mb-10 text-3xl font-semibold tracking-tight md:text-4xl">{title}</h2>
        </Reveal>
        {children}
      </div>
    </section>
  );
}
