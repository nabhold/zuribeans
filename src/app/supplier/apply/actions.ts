"use server"

import { redirect } from "next/navigation"
import { getCurrentCustomer } from "@/lib/auth/customer"
import { isUniqueConstraintViolation } from "@/lib/supplier/errors"
import { submitSupplierApplication } from "@/lib/supplier/repository"
import { supplierApplicationSchema } from "@/lib/validation/supplier-application"
import { buildSupplierApplicationInput } from "@/lib/validation/supplier-application-form"

export type SupplierApplicationErrorCode = "invalid_input" | "already_applied" | "failed"

export async function submitSupplierApplicationAction(formData: FormData): Promise<void> {
  const customer = await getCurrentCustomer()
  if (!customer) redirect("/login?next=/supplier/apply")

  const parsed = supplierApplicationSchema.safeParse(buildSupplierApplicationInput(formData))
  if (!parsed.success) {
    redirect("/supplier/apply?error=invalid_input")
  }

  // See src/app/login/actions.ts for why the redirect happens outside this
  // try/catch rather than on the happy path within it.
  let outcome: "ok" | "already_applied" | "failed" = "failed"
  try {
    await submitSupplierApplication(customer.id, parsed.data)
    outcome = "ok"
  } catch (error) {
    outcome = isUniqueConstraintViolation(error) ? "already_applied" : "failed"
  }

  if (outcome !== "ok") {
    redirect(`/supplier/apply?error=${outcome}`)
  }

  redirect("/supplier")
}
