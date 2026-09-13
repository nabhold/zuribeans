import type { HTMLAttributes, TableHTMLAttributes, ThHTMLAttributes, TdHTMLAttributes } from "react"
import { classNames } from "@/lib/ui/classnames"

export function TableContainer({ className, ...props }: HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={classNames("overflow-x-auto rounded-panel border border-line", className)}
      {...props}
    />
  )
}

export function Table({ className, ...props }: TableHTMLAttributes<HTMLTableElement>) {
  return (
    <table
      className={classNames("w-full border-collapse text-left text-sm", className)}
      {...props}
    />
  )
}

export function TableHeaderCell({ className, ...props }: ThHTMLAttributes<HTMLTableCellElement>) {
  return (
    <th
      className={classNames(
        "bg-surface-muted px-4 py-3 font-semibold text-muted-strong",
        className,
      )}
      {...props}
    />
  )
}

export function TableCell({ className, ...props }: TdHTMLAttributes<HTMLTableCellElement>) {
  return (
    <td className={classNames("border-t border-line px-4 py-3 align-top", className)} {...props} />
  )
}
