import * as React from "react";
import { ChevronRight } from "lucide-react";

import { cn } from "@/lib/utils";

/** Apple-style "Learn more ›" inline link. */
function TextLink({ className, children, ...props }: React.ComponentProps<"a">) {
  return (
    <a
      data-slot="text-link"
      className={cn(
        "group/link inline-flex items-center gap-0.5 text-[17px] text-[hsl(var(--primary))] outline-none hover:underline focus-visible:underline",
        className,
      )}
      {...props}
    >
      {children}
      <ChevronRight className="size-4 transition-transform duration-300 group-hover/link:translate-x-0.5" />
    </a>
  );
}

export { TextLink };
