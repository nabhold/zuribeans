import { describe, expect, it } from "vitest"
import { registerSchema } from "./register"

const validInput = {
  email: "buyer@example.com",
  password: "correct-horse",
  confirmPassword: "correct-horse",
  firstName: "Amara",
  lastName: "Okafor",
  companyName: "Okafor Roasters",
}

describe("registerSchema", () => {
  it("accepts a complete, matching submission", () => {
    expect(registerSchema.safeParse(validInput).success).toBe(true)
  })

  it("rejects mismatched passwords", () => {
    const result = registerSchema.safeParse({ ...validInput, confirmPassword: "different" })
    expect(result.success).toBe(false)
  })

  it("rejects a missing company name", () => {
    const result = registerSchema.safeParse({ ...validInput, companyName: "" })
    expect(result.success).toBe(false)
  })

  it("rejects malformed boundary input", () => {
    expect(
      registerSchema.safeParse({ ...validInput, email: "wrong", password: "short" }).success,
    ).toBe(false)
  })
})
