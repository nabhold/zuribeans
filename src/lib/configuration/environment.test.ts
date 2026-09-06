import { afterEach, beforeEach, describe, expect, it } from "vitest"
import { getPublicEnvironment } from "./environment"

const baseEnv = {
  NEXT_PUBLIC_MEDUSA_PUBLISHABLE_KEY: "pk_test",
  NEXT_PUBLIC_SITE_URL: "http://localhost:3000",
}

const originalEnv = { ...process.env }

beforeEach(() => {
  process.env = { ...originalEnv }
  delete process.env.NEXT_PUBLIC_ENABLED_MARKETS
  delete process.env.NEXT_PUBLIC_DEFAULT_MARKET
  Object.assign(process.env, baseEnv)
})

afterEach(() => {
  process.env = { ...originalEnv }
})

describe("getPublicEnvironment", () => {
  it("defaults to both launch markets with South Africa as default", () => {
    const env = getPublicEnvironment()
    expect(env.NEXT_PUBLIC_ENABLED_MARKETS).toEqual(["zuribeans_ug", "zuribeans_za"])
    expect(env.NEXT_PUBLIC_DEFAULT_MARKET).toBe("zuribeans_za")
  })

  it("parses a restricted enabled-markets list", () => {
    process.env.NEXT_PUBLIC_ENABLED_MARKETS = "zuribeans_ug"
    process.env.NEXT_PUBLIC_DEFAULT_MARKET = "zuribeans_ug"
    const env = getPublicEnvironment()
    expect(env.NEXT_PUBLIC_ENABLED_MARKETS).toEqual(["zuribeans_ug"])
  })

  it("rejects an unknown market key", () => {
    process.env.NEXT_PUBLIC_ENABLED_MARKETS = "zuribeans_ug,not-a-market"
    expect(() => getPublicEnvironment()).toThrow()
  })

  it("rejects a default market that is not in the enabled-markets list", () => {
    process.env.NEXT_PUBLIC_ENABLED_MARKETS = "zuribeans_ug"
    process.env.NEXT_PUBLIC_DEFAULT_MARKET = "zuribeans_za"
    expect(() => getPublicEnvironment()).toThrow()
  })
})
