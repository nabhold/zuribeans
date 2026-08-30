import "server-only"
import Medusa from "@medusajs/js-sdk"
import { getServerEnvironment } from "@/lib/configuration/environment"

export const createMedusaClient = () => {
  const environment = getServerEnvironment()
  return new Medusa({
    baseUrl: environment.MEDUSA_BACKEND_URL,
    publishableKey: environment.NEXT_PUBLIC_MEDUSA_PUBLISHABLE_KEY,
    debug: process.env.NODE_ENV === "development",
  })
}
