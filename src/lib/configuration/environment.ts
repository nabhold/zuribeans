import { z } from "zod"
import { isZuribeansMarketKey, type ZuribeansMarketKey } from "@/lib/market/markets"

const enabledMarketsSchema = z
  .string()
  .default("zuribeans_ug,zuribeans_za")
  .transform((value) =>
    value
      .split(",")
      .map((entry) => entry.trim())
      .filter(Boolean),
  )
  .superRefine((markets, ctx) => {
    if (markets.length === 0) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "NEXT_PUBLIC_ENABLED_MARKETS must not be empty.",
      })
      return
    }
    for (const market of markets) {
      if (!isZuribeansMarketKey(market)) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: `Unknown market key "${market}" in NEXT_PUBLIC_ENABLED_MARKETS.`,
        })
      }
    }
  })
  .transform((markets) => markets as ZuribeansMarketKey[])

const defaultMarketSchema = z
  .string()
  .default("zuribeans_za")
  .superRefine((value, ctx) => {
    if (!isZuribeansMarketKey(value)) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: `Unknown market key "${value}" in NEXT_PUBLIC_DEFAULT_MARKET.`,
      })
    }
  })
  .transform((value) => value as ZuribeansMarketKey)

/**
 * Market resolution (the root layout, on every page, via
 * src/lib/market/request.ts) must not require Medusa credentials to be
 * configured — a marketing page has no Medusa dependency, and the Foundation
 * image-build gate (nabhold/shared's reusable workflow) builds this
 * Dockerfile with no build-args at all, relying on ARG defaults only. Keep
 * this schema independent of `publicSchema` below rather than folding it in.
 */
const marketSchema = z
  .object({
    NEXT_PUBLIC_ENABLED_MARKETS: enabledMarketsSchema,
    NEXT_PUBLIC_DEFAULT_MARKET: defaultMarketSchema,
  })
  .refine((env) => env.NEXT_PUBLIC_ENABLED_MARKETS.includes(env.NEXT_PUBLIC_DEFAULT_MARKET), {
    message: "NEXT_PUBLIC_DEFAULT_MARKET must be one of NEXT_PUBLIC_ENABLED_MARKETS.",
    path: ["NEXT_PUBLIC_DEFAULT_MARKET"],
  })

const publicSchema = z
  .object({
    NEXT_PUBLIC_MEDUSA_PUBLISHABLE_KEY: z.string().min(1),
    NEXT_PUBLIC_SITE_URL: z.string().url(),
  })
  .and(marketSchema)

const serverSchema = z
  .object({
    MEDUSA_BACKEND_URL: z.string().url(),
  })
  .and(publicSchema)

export const getMarketEnvironment = () => marketSchema.parse(process.env)
export const getPublicEnvironment = () => publicSchema.parse(process.env)
export const getServerEnvironment = () => serverSchema.parse(process.env)
