import "server-only"
import { headers } from "next/headers"
import { getMarketEnvironment } from "@/lib/configuration/environment"
import { MARKET_HEADER_NAME } from "./constants"
import { getMarket, isZuribeansMarketKey, ZURIBEANS_MARKETS, type ZuribeansMarket } from "./markets"

export type MarketContext = {
  active: ZuribeansMarket
  /** Markets enabled for this deployment, in declared order — for market switchers. */
  enabled: ZuribeansMarket[]
}

/**
 * Reads the market `middleware.ts` already resolved for this request. Never
 * re-derives it from query/cookie here: the middleware is the single place
 * request precedence is decided, so a Server Component always sees the same
 * market the response headers and page markup will agree on.
 */
export const getMarketContext = async (): Promise<MarketContext> => {
  const env = getMarketEnvironment()
  const headerList = await headers()
  const headerValue = headerList.get(MARKET_HEADER_NAME)
  const marketKey =
    headerValue &&
    isZuribeansMarketKey(headerValue) &&
    env.NEXT_PUBLIC_ENABLED_MARKETS.includes(headerValue)
      ? headerValue
      : env.NEXT_PUBLIC_DEFAULT_MARKET

  return {
    active: getMarket(marketKey),
    enabled: ZURIBEANS_MARKETS.filter((market) =>
      env.NEXT_PUBLIC_ENABLED_MARKETS.includes(market.marketKey),
    ),
  }
}
