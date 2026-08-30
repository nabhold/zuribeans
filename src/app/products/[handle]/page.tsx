import { notFound } from "next/navigation"
import { retrieveProduct } from "@/lib/medusa/products"

export const dynamic = "force-dynamic"

export default async function ProductPage({ params }: { params: Promise<{ handle: string }> }) {
  const { handle } = await params
  const product = await retrieveProduct(handle)
  if (!product) notFound()
  return (
    <article className="mx-auto grid max-w-7xl gap-12 px-5 py-16 lg:grid-cols-2 lg:px-8">
      <div className="aspect-square rounded-[2.5rem] bg-[radial-gradient(circle_at_35%_25%,#d9b88d,transparent_30%),linear-gradient(145deg,#526a4f,#172219)]" />
      <div className="self-center">
        <p className="text-xs font-bold uppercase tracking-[0.25em] text-clay">
          {product.origin || "African origin"}
        </p>
        <h1 className="mt-5 font-display text-6xl">{product.title}</h1>
        <p className="mt-6 max-w-xl text-lg leading-8 text-ink/65">
          {product.description ||
            product.subtitle ||
            "Full trade specifications are available to approved buyers."}
        </p>
        <div className="mt-8 rounded-3xl bg-white/60 p-6">
          <p className="font-bold">Buyer-specific terms</p>
          <p className="mt-2 text-sm text-ink/60">
            Sign in to request current pricing, minimum quantities and logistics terms. Zuribeans
            does not calculate commercial terms in the browser.
          </p>
          <a
            href="/login"
            className="mt-5 inline-block rounded-full bg-ink px-6 py-3 font-bold text-white"
          >
            Buyer login
          </a>
        </div>
      </div>
    </article>
  )
}
