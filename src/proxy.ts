import { NextResponse, type NextRequest } from "next/server"
import { getMarketEnvironment } from "@/lib/configuration/environment"
import {
  CORRELATION_HEADER_NAME,
  MARKET_COOKIE_NAME,
  MARKET_HEADER_NAME,
} from "@/lib/market/constants"
import { resolveActiveMarket } from "@/lib/market/context"

/**
 * Resolves the explicit Baobab market context for every request (see
 * docs/adr/0004-market-context-resolution.md) and stamps a correlation id.
 * Neither is ever forwarded to Baobab Trade as a request header here: Trade
 * does not define a storefront-facing context contract for either, so this
 * proxy only threads them through Server Components and structured logs.
 */
export function proxy(request: NextRequest) {
  const env = getMarketEnvironment()

  const activeMarket = resolveActiveMarket({
    requested: request.nextUrl.searchParams.get("market"),
    cookie: request.cookies.get(MARKET_COOKIE_NAME)?.value ?? null,
    enabledMarkets: env.NEXT_PUBLIC_ENABLED_MARKETS,
    defaultMarket: env.NEXT_PUBLIC_DEFAULT_MARKET,
  })

  const correlationId = request.headers.get(CORRELATION_HEADER_NAME) ?? crypto.randomUUID()

  const requestHeaders = new Headers(request.headers)
  requestHeaders.set(MARKET_HEADER_NAME, activeMarket)
  requestHeaders.set(CORRELATION_HEADER_NAME, correlationId)

  const response = NextResponse.next({ request: { headers: requestHeaders } })
  response.headers.set(CORRELATION_HEADER_NAME, correlationId)

  if (request.cookies.get(MARKET_COOKIE_NAME)?.value !== activeMarket) {
    response.cookies.set(MARKET_COOKIE_NAME, activeMarket, {
      path: "/",
      sameSite: "lax",
      maxAge: 60 * 60 * 24 * 365,
    })
  }

  return response
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
}
