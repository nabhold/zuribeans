import { isZuribeansMarketKey, type ZuribeansMarketKey } from "./markets"

/**
 * Resolves one candidate value (a query param or cookie) to an enabled
 * market key, or `null` if it is absent, unrecognised, or disabled for this
 * deployment. Never falls back silently to a hardcoded market here — callers
 * decide the default explicitly via `resolveActiveMarket`.
 */
export const resolveMarketKey = (
  candidate: string | null | undefined,
  enabledMarkets: readonly ZuribeansMarketKey[],
): ZuribeansMarketKey | null => {
  if (!candidate) return null
  if (!isZuribeansMarketKey(candidate)) return null
  return enabledMarkets.includes(candidate) ? candidate : null
}

/**
 * Explicit market precedence for a request: an explicit `?market=` request
 * always wins (so a shared link is authoritative), then the visitor's prior
 * choice (cookie), then the deployment's configured default. A request must
 * always resolve to one enabled market — there is no "no market" state.
 */
export const resolveActiveMarket = (options: {
  requested: string | null | undefined
  cookie: string | null | undefined
  enabledMarkets: readonly ZuribeansMarketKey[]
  defaultMarket: ZuribeansMarketKey
}): ZuribeansMarketKey =>
  resolveMarketKey(options.requested, options.enabledMarkets) ??
  resolveMarketKey(options.cookie, options.enabledMarkets) ??
  options.defaultMarket
