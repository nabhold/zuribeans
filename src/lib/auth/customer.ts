import "server-only"
import type { HttpTypes } from "@medusajs/types"
import { createMedusaClient } from "@/lib/medusa/client"

/**
 * Returns the signed-in customer, or null if there is no valid session.
 * A missing/expired/invalid session token is an expected outcome here, not
 * an error condition — Medusa's `/store/customers/me` simply 401s, and that
 * is exactly how an unauthenticated visitor looks.
 */
export const getCurrentCustomer = async (): Promise<HttpTypes.StoreCustomer | null> => {
  const sdk = createMedusaClient()
  try {
    const { customer } = await sdk.store.customer.retrieve()
    return customer
  } catch {
    return null
  }
}
