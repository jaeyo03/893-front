import * as React from "react";
import { cn } from "@/lib/utils";

function Skeleton({
  className,
  height,
  width,
  ...props
}: React.HTMLAttributes<HTMLDivElement> & { height?: string|number; width?: string | number }) {
  return (
    <div
      className={cn("animate-pulse rounded-md bg-primary/10", className)}
      style={{ height: height ?? "auto", width}}
      {...props}
    />
  );
}

export { Skeleton };