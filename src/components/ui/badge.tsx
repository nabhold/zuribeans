import type { HTMLAttributes } from "react"
import { classNames } from "@/lib/ui/classnames"

type BadgeTone = "neutral" | "success" | "warning" | "danger" | "info"

const tones: Record<BadgeTone, string> = {
  neutral: "bg-surface-muted text-muted-strong",
  success: "bg-success-soft text-success-strong",
  warning: "bg-warning-soft text-warning-strong",
  danger: "bg-danger-soft text-danger-strong",
  info: "bg-info-soft text-info-strong",
}

export function Badge({
  tone = "neutral",
  className,
  ...props
}: HTMLAttributes<HTMLSpanElement> & { tone?: BadgeTone }) {
  return (
    <span
      className={classNames(
        "inline-flex items-center rounded-full px-2.5 py-1 text-xs font-semibold leading-none",
        tones[tone],
        className,
      )}
      {...props}
    />
  )
}
