import { ProductCard } from "@/components/commerce/product-card"
import { listProducts } from "@/lib/medusa/products"

export const dynamic = "force-dynamic"

export default async function ProductsPage() {
  const products = await listProducts()
  return (
    <section className="mx-auto max-w-7xl px-5 py-16 lg:px-8">
      <p className="text-xs font-bold uppercase tracking-[0.25em] text-clay">Current catalogue</p>
      <div className="mt-4 flex items-end justify-between gap-8">
        <h1 className="font-display text-5xl md:text-7xl">Available coffee lots</h1>
        <p className="hidden max-w-sm text-sm text-ink/60 md:block">
          Availability is supplied live by Baobab Trade. Approved buyers receive their applicable
          commercial terms.
        </p>
      </div>
      {products.length ? (
        <div className="mt-14 grid gap-x-7 gap-y-14 sm:grid-cols-2 lg:grid-cols-3">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      ) : (
        <div className="mt-14 rounded-3xl border border-ink/15 p-10">
          <h2 className="font-display text-3xl">No lots are published for this market.</h2>
          <p className="mt-3 text-ink/60">Contact our trade desk for upcoming availability.</p>
        </div>
      )}
    </section>
  )
}
