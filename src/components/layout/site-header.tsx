import Link from "next/link"

export function SiteHeader() {
  return (
    <header className="border-b border-ink/10 bg-canvas/95">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-5 lg:px-8">
        <Link href="/" className="font-display text-2xl font-semibold tracking-tight">
          ZURIBEANS<span className="text-clay">.</span>
        </Link>
        <nav aria-label="Primary navigation" className="hidden gap-8 text-sm font-medium md:flex">
          <Link href="/products">Green coffee</Link>
          <Link href="/about">Our origin</Link>
          <Link href="/contact">Trade enquiries</Link>
        </nav>
        <div className="flex items-center gap-4 text-sm font-semibold">
          <Link href="/login">Buyer login</Link>
          <Link href="/products" className="rounded-full bg-ink px-5 py-3 text-white">
            View lots
          </Link>
        </div>
      </div>
    </header>
  )
}
