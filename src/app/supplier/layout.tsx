import { requireCustomer } from "@/lib/auth/require-customer"
import { logoutAction } from "@/app/account/actions"

export default async function SupplierLayout({ children }: { children: React.ReactNode }) {
  const customer = await requireCustomer("/supplier")

  return (
    <section className="mx-auto max-w-5xl px-5 py-16 lg:px-8">
      <div className="flex items-center justify-between border-b border-ink/10 pb-6">
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.25em] text-clay">
            Supplier account
          </p>
          <h1 className="mt-2 font-display text-4xl">{customer.email}</h1>
        </div>
        <form action={logoutAction}>
          <button
            type="submit"
            className="rounded-full border border-ink/20 px-5 py-2 text-sm font-semibold"
          >
            Sign out
          </button>
        </form>
      </div>
      <div className="mt-10">{children}</div>
    </section>
  )
}
