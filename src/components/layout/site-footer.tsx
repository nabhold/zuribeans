export function SiteFooter() {
  return (
    <footer className="bg-ink text-white">
      <div className="mx-auto grid max-w-7xl gap-8 px-5 py-12 md:grid-cols-2 lg:px-8">
        <div>
          <p className="font-display text-2xl">Zuribeans.</p>
          <p className="mt-3 max-w-md text-sm text-white/65">
            Traceable African coffee for roasters, importers and hospitality buyers.
          </p>
        </div>
        <p className="self-end text-sm text-white/55 md:text-right">
          Trade availability and pricing are supplied by Baobab Trade.
        </p>
      </div>
    </footer>
  )
}
