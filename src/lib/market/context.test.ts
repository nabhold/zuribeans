import { describe, expect, it } from "vitest"
import { resolveActiveMarket, resolveMarketKey } from "./context"

describe("resolveMarketKey", () => {
  it("returns null when no candidate is supplied", () => {
    expect(resolveMarketKey(null, ["zuribeans_za"])).toBeNull()
    expect(resolveMarketKey(undefined, ["zuribeans_za"])).toBeNull()
    expect(resolveMarketKey("", ["zuribeans_za"])).toBeNull()
  })

  it("returns null for an unrecognised market key", () => {
    expect(resolveMarketKey("not-a-market", ["zuribeans_za"])).toBeNull()
  })

  it("returns null for a recognised but disabled market", () => {
    expect(resolveMarketKey("zuribeans_ug", ["zuribeans_za"])).toBeNull()
  })

  it("returns the candidate when recognised and enabled", () => {
    expect(resolveMarketKey("zuribeans_ug", ["zuribeans_ug", "zuribeans_za"])).toBe("zuribeans_ug")
  })
})

describe("resolveActiveMarket", () => {
  const enabledMarkets = ["zuribeans_ug", "zuribeans_za"] as const

  it("prefers an explicit request over the stored cookie and default", () => {
    expect(
      resolveActiveMarket({
        requested: "zuribeans_ug",
        cookie: "zuribeans_za",
        enabledMarkets,
        defaultMarket: "zuribeans_za",
      }),
    ).toBe("zuribeans_ug")
  })

  it("falls back to the cookie when no request override is present", () => {
    expect(
      resolveActiveMarket({
        requested: null,
        cookie: "zuribeans_ug",
        enabledMarkets,
        defaultMarket: "zuribeans_za",
      }),
    ).toBe("zuribeans_ug")
  })

  it("falls back to the configured default when nothing else resolves", () => {
    expect(
      resolveActiveMarket({
        requested: null,
        cookie: null,
        enabledMarkets,
        defaultMarket: "zuribeans_za",
      }),
    ).toBe("zuribeans_za")
  })

  it("ignores a disabled market from either source and falls through to the default", () => {
    expect(
      resolveActiveMarket({
        requested: "zuribeans_ug",
        cookie: null,
        enabledMarkets: ["zuribeans_za"],
        defaultMarket: "zuribeans_za",
      }),
    ).toBe("zuribeans_za")
  })
})
