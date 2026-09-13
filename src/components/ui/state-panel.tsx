import type { ReactNode } from "react"
import { ButtonLink } from "./button"

type StatePanelProps = {
  eyebrow?: string
  title: string
  description: string
  action?: { href: string; label: string }
  children?: ReactNode
}

function StatePanel({ eyebrow, title, description, action, children }: StatePanelProps) {
  return (
    <section className="rounded-panel border border-line bg-surface-raised p-8 md:p-10">
      {eyebrow ? <p className="eyebrow">{eyebrow}</p> : null}
      <h2 className="mt-2 font-display text-3xl text-balance">{title}</h2>
      <p className="mt-3 max-w-2xl leading-7 text-muted">{description}</p>
      {children}
      {action ? (
        <ButtonLink href={action.href} className="mt-6">
          {action.label}
        </ButtonLink>
      ) : null}
    </section>
  )
}

export const EmptyState = (props: StatePanelProps) => (
  <StatePanel eyebrow="Nothing here yet" {...props} />
)
export const ErrorState = (props: StatePanelProps) => (
  <StatePanel eyebrow="Unable to load" {...props} />
)
export const RestrictedState = (props: StatePanelProps) => (
  <StatePanel eyebrow="Access restricted" {...props} />
)
