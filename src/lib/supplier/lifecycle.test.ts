import { describe, expect, it } from "vitest"
import { assertSupplierStatusTransition, canTransitionSupplierStatus } from "./lifecycle"

describe("canTransitionSupplierStatus", () => {
  it("allows submitting a draft application", () => {
    expect(canTransitionSupplierStatus("draft", "submitted")).toBe(true)
  })

  it("does not allow skipping straight from draft to approved", () => {
    expect(canTransitionSupplierStatus("draft", "approved")).toBe(false)
  })

  it("allows review to branch into more-information or sample requests", () => {
    expect(canTransitionSupplierStatus("under_review", "more_information_required")).toBe(true)
    expect(canTransitionSupplierStatus("under_review", "sample_required")).toBe(true)
  })

  it("allows returning from more-information/sample requests back to review", () => {
    expect(canTransitionSupplierStatus("more_information_required", "under_review")).toBe(true)
    expect(canTransitionSupplierStatus("sample_required", "under_review")).toBe(true)
  })

  it("allows qualification to resolve into approved or rejected", () => {
    expect(canTransitionSupplierStatus("qualification", "approved")).toBe(true)
    expect(canTransitionSupplierStatus("qualification", "rejected")).toBe(true)
  })

  it("allows active suppliers to be suspended, reactivated, or offboarded", () => {
    expect(canTransitionSupplierStatus("active", "suspended")).toBe(true)
    expect(canTransitionSupplierStatus("suspended", "active")).toBe(true)
    expect(canTransitionSupplierStatus("active", "offboarded")).toBe(true)
    expect(canTransitionSupplierStatus("suspended", "offboarded")).toBe(true)
  })

  it("treats rejected and offboarded as terminal", () => {
    expect(canTransitionSupplierStatus("rejected", "under_review")).toBe(false)
    expect(canTransitionSupplierStatus("offboarded", "active")).toBe(false)
  })
})

describe("assertSupplierStatusTransition", () => {
  it("does not throw for an allowed transition", () => {
    expect(() => assertSupplierStatusTransition("draft", "submitted")).not.toThrow()
  })

  it("throws for a disallowed transition", () => {
    expect(() => assertSupplierStatusTransition("draft", "approved")).toThrow(/cannot transition/i)
  })
})
