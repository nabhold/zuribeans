import "server-only"
import { drizzle } from "drizzle-orm/postgres-js"
import postgres from "postgres"
import * as schema from "./schema"

/**
 * Estate-owned Postgres — never the Baobab Trade/ERP/CMS databases (see
 * docs/adr/0006-supplier-registration-data-ownership.md). One pooled
 * connection per server process, not per request: unlike the Medusa client,
 * there is no per-visitor secret bound to this connection.
 */
let queryClient: ReturnType<typeof postgres> | undefined

const getQueryClient = () => {
  if (!queryClient) {
    const url = process.env.SUPPLIER_DB_URL
    if (!url) {
      throw new Error("SUPPLIER_DB_URL is not configured.")
    }
    queryClient = postgres(url, { max: 5 })
  }
  return queryClient
}

export const getDb = () => drizzle(getQueryClient(), { schema })
