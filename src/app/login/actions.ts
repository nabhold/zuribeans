"use server"

import { redirect } from "next/navigation"
import { createMedusaClient } from "@/lib/medusa/client"
import { loginSchema } from "@/lib/validation/login"

export type LoginErrorCode = "invalid_input" | "invalid_credentials"

export async function loginAction(formData: FormData): Promise<void> {
  const parsed = loginSchema.safeParse({
    email: formData.get("email"),
    password: formData.get("password"),
  })

  if (!parsed.success) {
    redirect("/login?error=invalid_input")
  }

  const sdk = createMedusaClient()

  // `redirect()` throws internally to interrupt rendering, so the success
  // path must redirect outside this try/catch — redirecting from inside
  // would be caught below and reported as a failed login.
  let succeeded = false
  try {
    const result = await sdk.auth.login("customer", "emailpass", parsed.data)
    succeeded = typeof result === "string"
  } catch {
    succeeded = false
  }

  if (!succeeded) {
    redirect("/login?error=invalid_credentials")
  }

  redirect("/account")
}
