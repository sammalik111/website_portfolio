import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const badgeVariants = cva(
  "inline-flex items-center rounded-full border px-3 py-1 text-xs font-medium transition-colors",
  {
    variants: {
      variant: {
        default:
          "border-[hsl(var(--primary)/0.3)] bg-[hsl(var(--primary)/0.12)] text-[hsl(var(--primary))]",
        outline:
          "border-[hsl(var(--foreground)/0.15)] bg-[hsl(var(--foreground)/0.04)] text-[hsl(var(--muted-foreground))]",
        accent:
          "border-[hsl(var(--accent)/0.35)] bg-[hsl(var(--accent)/0.14)] text-[hsl(var(--accent))]",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  },
);

function Badge({
  className,
  variant,
  ...props
}: React.ComponentProps<"span"> & VariantProps<typeof badgeVariants>) {
  return (
    <span
      data-slot="badge"
      className={cn(badgeVariants({ variant }), className)}
      {...props}
    />
  );
}

export { Badge, badgeVariants };
