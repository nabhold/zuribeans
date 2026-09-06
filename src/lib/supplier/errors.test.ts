import { describe, expect, it } from "vitest"
import { isUniqueConstraintViolation } from "./errors"

describe("isUniqueConstraintViolation", () => {
  it("recognises a Postgres unique_violation error", () => {
    expect(isUniqueConstraintViolation({ code: "23505" })).toBe(true)
  })

  it("rejects other Postgres error codes", () => {
    expect(isUniqueConstraintViolation({ code: "23502" })).toBe(false)
  })

  it("rejects non-error values", () => {
    expect(isUniqueConstraintViolation(null)).toBe(false)
    expect(isUniqueConstraintViolation(undefined)).toBe(false)
    expect(isUniqueConstraintViolation("plain string")).toBe(false)
    expect(isUniqueConstraintViolation(new Error("boom"))).toBe(false)
  })
})
