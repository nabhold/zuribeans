import type { HTMLAttributes, ReactNode } from "react"
import { classNames } from "@/lib/ui/classnames"

type AlertTone = "info" | "success" | "warning" | "danger"

const tones: Record<AlertTone, string> = {
  info: "border-info/25 bg-info-soft text-info-strong",
  success: "border-success/25 bg-success-soft text-success-strong",
  warning: "border-warning/25 bg-warning-soft text-warning-strong",
  danger: "border-danger/25 bg-danger-soft text-danger-strong",
}

export function Alert({
  title,
  tone = "info",
  children,
  className,
  ...props
}: HTMLAttributes<HTMLDivElement> & { title: string; tone?: AlertTone; children?: ReactNode }) {
  return (
    <div
      role={tone === "danger" ? "alert" : "status"}
      className={classNames("rounded-control border p-4", tones[tone], className)}
      {...props}
    >
      <p className="font-semibold">{title}</p>
      {children ? <div className="mt-1 text-sm leading-6">{children}</div> : null}
    </div>
  )
}
