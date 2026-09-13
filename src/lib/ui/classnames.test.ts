import { describe, expect, it } from "vitest"
import { classNames } from "./classnames"

describe("classNames", () => {
  it("joins present class names without adding false values", () => {
    expect(classNames("base", false, undefined, "active", null)).toBe("base active")
  })
})
