import "server-only"
import Medusa from "@medusajs/js-sdk"
import { getServerEnvironment } from "@/lib/configuration/environment"
import { cookieAuthStorage } from "@/lib/auth/session-storage"

/**
 * One client per request, never reused across requests: the JWT storage
 * below reads/writes the current request's cookies, so a shared/cached
 * client would leak one visitor's session into another's request.
 */
export const createMedusaClient = () => {
  const environment = getServerEnvironment()
  return new Medusa({
    baseUrl: environment.MEDUSA_BACKEND_URL,
    publishableKey: environment.NEXT_PUBLIC_MEDUSA_PUBLISHABLE_KEY,
    debug: process.env.NODE_ENV === "development",
    auth: {
      type: "jwt",
      jwtTokenStorageMethod: "custom",
      storage: cookieAuthStorage,
    },
  })
}
