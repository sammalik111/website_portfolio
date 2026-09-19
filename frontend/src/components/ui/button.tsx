import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-full font-medium tracking-[-0.01em] transition-all duration-300 active:scale-[0.98] disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg]:size-4 outline-none focus-visible:ring-2 focus-visible:ring-[hsl(var(--ring))] focus-visible:ring-offset-2 focus-visible:ring-offset-[hsl(var(--background))]",
  {
    variants: {
      variant: {
        default:
          "bg-[hsl(var(--action))] text-white shadow-sm hover:brightness-110",
        outline:
          "surface text-[hsl(var(--foreground))] hover:bg-[hsl(var(--foreground)/0.04)]",
        ghost:
          "text-[hsl(var(--foreground))] hover:bg-[hsl(var(--foreground)/0.06)]",
        link: "text-[hsl(var(--primary))] underline-offset-4 hover:underline",
      },
      size: {
        default: "h-11 px-6 text-[15px]",
        sm: "h-8 px-4 text-[13px]",
        lg: "h-12 px-7 text-[17px]",
        icon: "size-11",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

function Button({
  className,
  variant,
  size,
  asChild = false,
  ...props
}: React.ComponentProps<"button"> &
  VariantProps<typeof buttonVariants> & { asChild?: boolean }) {
  const Comp = asChild ? Slot : "button";
  return (
    <Comp
      data-slot="button"
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  );
}

export { Button, buttonVariants };
