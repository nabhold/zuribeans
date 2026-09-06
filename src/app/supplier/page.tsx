import Link from "next/link"
import { redirect } from "next/navigation"
import { getCurrentCustomer } from "@/lib/auth/customer"
import { getSupplierApplicationForCustomer } from "@/lib/supplier/repository"
import type { SupplierStatus } from "@/lib/supplier/lifecycle"

const STATUS_LABELS: Record<SupplierStatus, string> = {
  draft: "Draft — not yet submitted",
  submitted: "Submitted — awaiting review",
  under_review: "Under review",
  more_information_required: "More information requested",
  sample_required: "Sample requested",
  qualification: "In qualification",
  approved: "Approved",
  rejected: "Not approved",
  active: "Active supplier",
  suspended: "Suspended",
  offboarded: "Offboarded",
}

export default async function SupplierDashboardPage() {
  const customer = await getCurrentCustomer()
  if (!customer) redirect("/login?next=/supplier")

  const application = await getSupplierApplicationForCustomer(customer.id)

  if (!application) {
    return (
      <div className="rounded-3xl border border-ink/15 p-8">
        <h2 className="font-display text-2xl">You have not applied to become a supplier yet</h2>
        <p className="mt-3 max-w-2xl text-ink/60">
          Tell us what you can supply — product, origin, capacity and any certifications — and our
          sourcing team will review your application.
        </p>
        <Link
          href="/supplier/apply"
          className="mt-6 inline-block rounded-full bg-ink px-6 py-3 font-bold text-white"
        >
          Start your supplier application
        </Link>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="rounded-3xl border border-ink/15 p-8">
        <p className="text-xs font-bold uppercase tracking-[0.25em] text-clay">
          Application status
        </p>
        <h2 className="mt-2 font-display text-3xl">
          {STATUS_LABELS[application.organisation.status as SupplierStatus]}
        </h2>
        <p className="mt-3 max-w-2xl text-ink/60">
          Declared capabilities become verified only once our sourcing team confirms them — shown
          below as declared until then.
        </p>
      </div>
      <div className="rounded-3xl border border-ink/15 p-8">
        <h3 className="font-display text-xl">Declared capabilities</h3>
        <ul className="mt-4 space-y-3">
          {application.capabilities.map((capability) => (
            <li key={capability.id} className="rounded-2xl bg-sand/60 p-4">
              <p className="font-bold capitalize">{capability.productCategory}</p>
              <p className="text-sm text-ink/60">
                {[capability.variety, capability.grade, capability.originCountryCode]
                  .filter(Boolean)
                  .join(" · ") || "No further detail supplied"}
              </p>
              <p className="mt-1 text-xs font-semibold uppercase tracking-wide text-clay">
                {capability.verificationStatus === "verified"
                  ? "Verified"
                  : "Declared, not yet verified"}
              </p>
            </li>
          ))}
        </ul>
      </div>
      {application.certifications.length > 0 ? (
        <div className="rounded-3xl border border-ink/15 p-8">
          <h3 className="font-display text-xl">Certifications</h3>
          <ul className="mt-4 space-y-3">
            {application.certifications.map((certification) => (
              <li key={certification.id} className="rounded-2xl bg-sand/60 p-4">
                <p className="font-bold">{certification.certificationType}</p>
                <p className="text-sm text-ink/60">
                  {[certification.issuer, certification.referenceNumber]
                    .filter(Boolean)
                    .join(" · ") || "No further detail supplied"}
                </p>
                <p className="mt-1 text-xs font-semibold uppercase tracking-wide text-clay">
                  {certification.verificationStatus === "verified"
                    ? "Verified"
                    : "Declared, not yet verified"}
                </p>
              </li>
            ))}
          </ul>
        </div>
      ) : null}
    </div>
  )
}
