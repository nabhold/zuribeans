import { z } from "zod"

const publicSchema = z.object({
  NEXT_PUBLIC_MEDUSA_PUBLISHABLE_KEY: z.string().min(1),
  NEXT_PUBLIC_SITE_URL: z.string().url(),
  NEXT_PUBLIC_MARKET: z.string().min(2).default("za"),
})

const serverSchema = publicSchema.extend({
  MEDUSA_BACKEND_URL: z.string().url(),
})

export const getPublicEnvironment = () => publicSchema.parse(process.env)
export const getServerEnvironment = () => serverSchema.parse(process.env)
