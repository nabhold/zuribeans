import Link from "next/link"

export const metadata = { title: "Become a supplier" }

export default function BecomeASupplierPage() {
  return (
    <section className="mx-auto max-w-3xl px-5 py-20">
      <p className="text-xs font-bold uppercase tracking-[0.25em] text-clay">Sourcing</p>
      <h1 className="mt-4 font-display text-5xl">Become a supplier</h1>
      <p className="mt-6 max-w-2xl text-lg leading-8 text-ink/65">
        Zuribeans sources coffee and vanilla directly from growers, cooperatives and exporters
        across East Africa. If you can supply green coffee or vanilla pods at a commercial scale, we
        would like to hear from you.
      </p>
      <div className="mt-8 rounded-3xl bg-white/60 p-6">
        <p className="font-bold">Before you apply</p>
        <p className="mt-2 text-sm text-ink/60">
          You will need your organisation&apos;s registration details, a primary contact, and
          specifics on what you can supply — product, origin, grade, indicative capacity and any
          certifications. Applications are reviewed by our sourcing team; submitting one does not
          itself approve you to supply. We do not automatically qualify a supplier from an online
          form.
        </p>
      </div>
      <Link
        href="/supplier/apply"
        className="mt-8 inline-block rounded-full bg-ink px-7 py-4 font-bold text-white"
      >
        Start a supplier application
      </Link>
    </section>
  )
}
