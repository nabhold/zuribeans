/**
 * The full supplier lifecycle. Only draft -> submitted is exercised by this
 * increment's application code; the rest is defined and tested now so a
 * future staff qualification surface has a real state machine to call
 * rather than inventing one under time pressure later.
 */
export type SupplierStatus =
  | "draft"
  | "submitted"
  | "under_review"
  | "more_information_required"
  | "sample_required"
  | "qualification"
  | "approved"
  | "rejected"
  | "active"
  | "suspended"
  | "offboarded"

const ALLOWED_TRANSITIONS: Record<SupplierStatus, readonly SupplierStatus[]> = {
  draft: ["submitted"],
  submitted: ["under_review"],
  under_review: ["more_information_required", "sample_required", "qualification", "rejected"],
  more_information_required: ["under_review"],
  sample_required: ["under_review"],
  qualification: ["approved", "rejected"],
  approved: ["active"],
  rejected: [],
  active: ["suspended", "offboarded"],
  suspended: ["active", "offboarded"],
  offboarded: [],
}

export const canTransitionSupplierStatus = (from: SupplierStatus, to: SupplierStatus): boolean =>
  ALLOWED_TRANSITIONS[from].includes(to)

export const assertSupplierStatusTransition = (from: SupplierStatus, to: SupplierStatus): void => {
  if (!canTransitionSupplierStatus(from, to)) {
    throw new Error(`Cannot transition a supplier application from "${from}" to "${to}".`)
  }
}
