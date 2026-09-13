import type { HTMLAttributes } from "react"
import { classNames } from "@/lib/ui/classnames"

export function Skeleton({ className, ...props }: HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      aria-hidden="true"
      className={classNames(
        "animate-pulse rounded-control bg-surface-muted motion-reduce:animate-none",
        className,
      )}
      {...props}
    />
  )
}
