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

const publicSchema = z
  .object({
    NEXT_PUBLIC_MEDUSA_PUBLISHABLE_KEY: z.string().min(1),
    NEXT_PUBLIC_SITE_URL: z.string().url(),
    NEXT_PUBLIC_ENABLED_MARKETS: enabledMarketsSchema,
    NEXT_PUBLIC_DEFAULT_MARKET: defaultMarketSchema,
  })
  .refine((env) => env.NEXT_PUBLIC_ENABLED_MARKETS.includes(env.NEXT_PUBLIC_DEFAULT_MARKET), {
    message: "NEXT_PUBLIC_DEFAULT_MARKET must be one of NEXT_PUBLIC_ENABLED_MARKETS.",
    path: ["NEXT_PUBLIC_DEFAULT_MARKET"],
  })

const serverSchema = z
  .object({
    MEDUSA_BACKEND_URL: z.string().url(),
  })
  .and(publicSchema)

export const getPublicEnvironment = () => publicSchema.parse(process.env)
export const getServerEnvironment = () => serverSchema.parse(process.env)
