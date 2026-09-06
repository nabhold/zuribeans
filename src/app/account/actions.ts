"use server"

import { redirect } from "next/navigation"
import { createMedusaClient } from "@/lib/medusa/client"

export async function logoutAction(): Promise<void> {
  const sdk = createMedusaClient()
  await sdk.auth.logout()
  redirect("/")
}
