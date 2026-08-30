import Link from "next/link"

const assurances = ["Traceable lots", "Commercial documentation", "Roaster-ready logistics"]

export default function HomePage() {
  return (
    <>
      <section className="mx-auto grid max-w-7xl gap-10 px-5 py-16 lg:grid-cols-[1.15fr_.85fr] lg:px-8 lg:py-24">
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.25em] text-clay">
            African origin. Trade rigour.
          </p>
          <h1 className="mt-6 max-w-4xl font-display text-6xl leading-[0.98] tracking-tight md:text-8xl">
            Coffee with a clear line back to the source.
          </h1>
          <p className="mt-8 max-w-2xl text-lg leading-8 text-ink/65">
            Zuribeans connects professional buyers with traceable African coffees, practical lot
            information and dependable trade support.
          </p>
          <div className="mt-10 flex flex-wrap gap-4">
            <Link href="/products" className="rounded-full bg-clay px-7 py-4 font-bold text-white">
              Explore available lots
            </Link>
            <Link href="/contact" className="rounded-full border border-ink/20 px-7 py-4 font-bold">
              Discuss your programme
            </Link>
          </div>
        </div>
        <div className="relative min-h-[28rem] overflow-hidden rounded-[2.5rem] bg-[radial-gradient(circle_at_30%_25%,#e9bb83,transparent_25%),radial-gradient(circle_at_70%_70%,#7f946d,transparent_30%),linear-gradient(150deg,#172219,#526a4f)]">
          <div className="absolute bottom-8 left-8 right-8 rounded-3xl border border-white/20 bg-white/10 p-6 text-white backdrop-blur">
            <p className="text-xs font-bold uppercase tracking-[0.2em]">Built for trade buyers</p>
            <p className="mt-3 font-display text-3xl">From sample request to repeat order.</p>
          </div>
        </div>
      </section>
      <section className="border-y border-ink/10 bg-white/40">
        <div className="mx-auto grid max-w-7xl gap-6 px-5 py-10 md:grid-cols-3 lg:px-8">
          {assurances.map((item, index) => (
            <p key={item} className="font-display text-xl">
              <span className="mr-3 text-clay">0{index + 1}</span>
              {item}
            </p>
          ))}
        </div>
      </section>
    </>
  )
}
