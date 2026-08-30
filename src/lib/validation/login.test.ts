import { describe, expect, it } from "vitest"
import { loginSchema } from "./login"
describe("loginSchema", () => {
  it("accepts a business email and sufficiently long password", () => {
    expect(
      loginSchema.safeParse({ email: "buyer@example.com", password: "correct-horse" }).success,
    ).toBe(true)
  })
  it("rejects malformed boundary input", () => {
    expect(loginSchema.safeParse({ email: "wrong", password: "short" }).success).toBe(false)
  })
})
