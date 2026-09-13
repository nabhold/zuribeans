import "server-only"
import { cookies } from "next/headers"

const SESSION_COOKIE_NAME = "zb_session"
const SESSION_MAX_AGE_SECONDS = 60 * 60 * 24 * 7

export const hasCustomerSession = async (): Promise<boolean> => {
  const store = await cookies()
  return store.has(SESSION_COOKIE_NAME)
}

/**
 * Backs the Medusa SDK's JWT storage with an httpOnly cookie instead of
 * browser storage, so the customer session token never reaches client-side
 * JavaScript. Read in Server Components (getItem); written only from Server
 * Actions/Route Handlers (setItem/removeItem), which is where login,
 * register and logout run — Next.js rejects cookie writes anywhere else.
 */
export const cookieAuthStorage = {
  getItem: async (): Promise<string | null> => {
    const store = await cookies()
    return store.get(SESSION_COOKIE_NAME)?.value ?? null
  },
  setItem: async (_key: string, value: string): Promise<void> => {
    const store = await cookies()
    store.set(SESSION_COOKIE_NAME, value, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: SESSION_MAX_AGE_SECONDS,
    })
  },
  removeItem: async (): Promise<void> => {
    const store = await cookies()
    store.delete(SESSION_COOKIE_NAME)
  },
}
