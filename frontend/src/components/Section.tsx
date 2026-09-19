import type { ReactNode } from "react";
import { Reveal } from "@/components/Reveal";

/**
 * Every section shares this layout: the number and title sit in the left margin (pinned
 * while you read the section on wide screens) and the content fills the right column.
 */
export function Section({
  id,
  number,
  title,
  children,
}: {
  id: string;
  number: string;
  title: string;
  children: ReactNode;
}) {
  return (
    <section id={id} className="border-t">
      <div className="mx-auto grid max-w-5xl gap-8 px-6 py-16 md:grid-cols-[13rem_minmax(0,1fr)] md:gap-12 md:py-24">
        <Reveal>
          <div className="md:sticky md:top-24">
            <div className="text-sm font-medium text-primary">{number}</div>
            <h2 className="mt-1 font-serif text-4xl tracking-tight">{title}</h2>
          </div>
        </Reveal>
        <div>{children}</div>
      </div>
    </section>
  );
}
