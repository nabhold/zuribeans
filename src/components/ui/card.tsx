import type { HTMLAttributes } from "react"
import { classNames } from "@/lib/ui/classnames"

export function Card({ className, ...props }: HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={classNames(
        "rounded-panel border border-line bg-surface-raised p-6 shadow-panel",
        className,
      )}
      {...props}
    />
  )
}
