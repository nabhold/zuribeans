import { describe, expect, it } from "vitest"
import { toSafeRelativePath } from "./safe-redirect"

describe("toSafeRelativePath", () => {
  it("accepts an ordinary relative path", () => {
    expect(toSafeRelativePath("/supplier/apply")).toBe("/supplier/apply")
  })

  it("rejects null/undefined/empty", () => {
    expect(toSafeRelativePath(null)).toBeNull()
    expect(toSafeRelativePath(undefined)).toBeNull()
    expect(toSafeRelativePath("")).toBeNull()
  })

  it("rejects a protocol-relative path (open-redirect vector)", () => {
    expect(toSafeRelativePath("//evil.example.com")).toBeNull()
  })

  it("rejects a backslash-prefixed path (browsers may treat as protocol-relative)", () => {
    expect(toSafeRelativePath("/\\evil.example.com")).toBeNull()
  })

  it("rejects an absolute URL", () => {
    expect(toSafeRelativePath("https://evil.example.com")).toBeNull()
  })

  it("rejects a path with no leading slash", () => {
    expect(toSafeRelativePath("supplier/apply")).toBeNull()
  })
})
