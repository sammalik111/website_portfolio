import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const badgeVariants = cva(
  "inline-flex items-center rounded-full px-3 py-1 text-[13px] font-medium tracking-[-0.01em] transition-colors",
  {
    variants: {
      variant: {
        default:
          "bg-[hsl(var(--primary)/0.1)] text-[hsl(var(--primary))]",
        outline:
          "bg-[hsl(var(--foreground)/0.05)] text-[hsl(var(--foreground)/0.75)]",
      },
    },
    defaultVariants: {
      variant: "outline",
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
