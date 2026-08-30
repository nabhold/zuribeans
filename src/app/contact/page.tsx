export default function ContactPage() {
  return (
    <section className="mx-auto max-w-4xl px-5 py-20">
      <p className="text-xs font-bold uppercase tracking-[0.25em] text-clay">Trade enquiries</p>
      <h1 className="mt-5 font-display text-6xl">Tell us what you need to source.</h1>
      <p className="mt-6 max-w-xl text-lg text-ink/65">
        The enquiry workflow is presentation-only until its destination contract is approved. No
        customer data is silently posted to an invented service.
      </p>
      <a
        className="mt-8 inline-block rounded-full bg-ink px-7 py-4 font-bold text-white"
        href="mailto:trade@zuribeans.com"
      >
        Email the trade desk
      </a>
    </section>
  )
}
