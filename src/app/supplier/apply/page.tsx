import { redirect } from "next/navigation"
import { getCurrentCustomer } from "@/lib/auth/customer"
import { getSupplierApplicationForCustomer } from "@/lib/supplier/repository"
import { SUPPLIER_CAPABILITY_CATEGORIES } from "@/lib/supplier/categories"
import { submitSupplierApplicationAction, type SupplierApplicationErrorCode } from "./actions"

const errorMessages: Record<SupplierApplicationErrorCode, string> = {
  invalid_input: "Check the form for missing or invalid fields — at least one product is required.",
  already_applied: "You have already submitted a supplier application.",
  failed: "We could not submit your application. Please try again.",
}

const isSupplierApplicationErrorCode = (value: string): value is SupplierApplicationErrorCode =>
  value in errorMessages

const CAPABILITY_SLOTS = [0, 1, 2]
const CERTIFICATION_SLOTS = [0, 1, 2]

const fieldClass = "mt-1 w-full rounded-xl border border-ink/20 bg-white px-3 py-2"
const labelClass = "block text-sm font-semibold"

export default async function SupplierApplyPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string }>
}) {
  const customer = await getCurrentCustomer()
  if (!customer) redirect("/login?next=/supplier/apply")

  const existing = await getSupplierApplicationForCustomer(customer.id)
  if (existing) redirect("/supplier")

  const { error } = await searchParams
  const message = error && isSupplierApplicationErrorCode(error) ? errorMessages[error] : null

  return (
    <section className="mx-auto max-w-3xl px-5 py-20">
      <p className="text-xs font-bold uppercase tracking-[0.25em] text-clay">Sourcing</p>
      <h1 className="mt-4 font-display text-5xl">Supplier application</h1>
      <p className="mt-4 max-w-2xl text-ink/60">
        Submitting this application does not itself approve you to supply Zuribeans — our sourcing
        team reviews every application, and declared capabilities are shown as declared until
        verified.
      </p>
      {message ? (
        <p
          role="alert"
          className="mt-6 rounded-xl bg-clay/10 px-4 py-3 text-sm font-semibold text-clay"
        >
          {message}
        </p>
      ) : null}
      <form action={submitSupplierApplicationAction} className="mt-10 space-y-10">
        <fieldset className="space-y-5">
          <legend className="font-display text-2xl">Organisation</legend>
          <label className={labelClass}>
            Legal name
            <input name="legalName" type="text" required className={fieldClass} />
          </label>
          <div className="grid grid-cols-2 gap-4">
            <label className={labelClass}>
              Registration number
              <input name="registrationNumber" type="text" className={fieldClass} />
            </label>
            <label className={labelClass}>
              Tax identifier
              <input name="taxIdentifier" type="text" className={fieldClass} />
            </label>
          </div>
          <label className={labelClass}>
            Country
            <input
              name="countryCode"
              type="text"
              required
              maxLength={2}
              placeholder="e.g. UG"
              className={fieldClass}
            />
          </label>
        </fieldset>

        <fieldset className="space-y-5">
          <legend className="font-display text-2xl">Primary contact</legend>
          <div className="grid grid-cols-2 gap-4">
            <label className={labelClass}>
              Name
              <input name="contactName" type="text" required className={fieldClass} />
            </label>
            <label className={labelClass}>
              Role
              <input
                name="contactRole"
                type="text"
                required
                placeholder="e.g. Sales, Operations"
                className={fieldClass}
              />
            </label>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <label className={labelClass}>
              Email
              <input name="contactEmail" type="email" required className={fieldClass} />
            </label>
            <label className={labelClass}>
              Phone
              <input name="contactPhone" type="tel" className={fieldClass} />
            </label>
          </div>
        </fieldset>

        <fieldset className="space-y-6">
          <legend className="font-display text-2xl">What can you supply?</legend>
          <p className="text-sm text-ink/60">
            At least one product is required; the other slots are optional.
          </p>
          {CAPABILITY_SLOTS.map((slot) => (
            <div key={slot} className="rounded-2xl border border-ink/15 p-5">
              <p className="font-bold">
                {slot === 0 ? "Product 1 (required)" : `Product ${slot + 1} (optional)`}
              </p>
              <div className="mt-3 grid grid-cols-2 gap-4">
                <label className={labelClass}>
                  Category
                  <select name="capability_category" defaultValue="" className={fieldClass}>
                    <option value="">Select…</option>
                    {SUPPLIER_CAPABILITY_CATEGORIES.map((category) => (
                      <option key={category.key} value={category.key}>
                        {category.label}
                      </option>
                    ))}
                  </select>
                </label>
                <label className={labelClass}>
                  Variety
                  <input name="capability_variety" type="text" className={fieldClass} />
                </label>
                <label className={labelClass}>
                  Grade
                  <input name="capability_grade" type="text" className={fieldClass} />
                </label>
                <label className={labelClass}>
                  Origin country
                  <input
                    name="capability_origin_country"
                    type="text"
                    maxLength={2}
                    placeholder="e.g. UG"
                    className={fieldClass}
                  />
                </label>
                <label className={labelClass}>
                  Indicative capacity
                  <input
                    name="capability_capacity"
                    type="text"
                    placeholder="e.g. 50 tonnes/year"
                    className={fieldClass}
                  />
                </label>
                <label className={labelClass}>
                  Season
                  <input
                    name="capability_season"
                    type="text"
                    placeholder="e.g. October-February"
                    className={fieldClass}
                  />
                </label>
                <label className={labelClass}>
                  Lead time (days)
                  <input
                    name="capability_lead_time_days"
                    type="number"
                    min={0}
                    className={fieldClass}
                  />
                </label>
              </div>
            </div>
          ))}
        </fieldset>

        <fieldset className="space-y-6">
          <legend className="font-display text-2xl">Certifications (optional)</legend>
          {CERTIFICATION_SLOTS.map((slot) => (
            <div key={slot} className="rounded-2xl border border-ink/15 p-5">
              <p className="font-bold">Certification {slot + 1}</p>
              <div className="mt-3 grid grid-cols-2 gap-4">
                <label className={labelClass}>
                  Type
                  <input
                    name="certification_type"
                    type="text"
                    placeholder="e.g. Organic, Fair Trade"
                    className={fieldClass}
                  />
                </label>
                <label className={labelClass}>
                  Issuer
                  <input name="certification_issuer" type="text" className={fieldClass} />
                </label>
                <label className={labelClass}>
                  Reference number
                  <input name="certification_reference" type="text" className={fieldClass} />
                </label>
                <label className={labelClass}>
                  Issued on
                  <input name="certification_issued_on" type="date" className={fieldClass} />
                </label>
                <label className={labelClass}>
                  Expires on
                  <input name="certification_expires_on" type="date" className={fieldClass} />
                </label>
              </div>
            </div>
          ))}
        </fieldset>

        <button type="submit" className="w-full rounded-full bg-ink px-6 py-4 font-bold text-white">
          Submit application
        </button>
      </form>
    </section>
  )
}
