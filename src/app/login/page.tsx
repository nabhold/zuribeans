import { loginSchema } from "@/lib/validation/login"

export default function LoginPage() {
  return (
    <section className="mx-auto max-w-lg px-5 py-20">
      <p className="text-xs font-bold uppercase tracking-[0.25em] text-clay">Trade account</p>
      <h1 className="mt-4 font-display text-5xl">Buyer login</h1>
      <p className="mt-4 text-ink/60">
        Authentication will use Medusa customer identity. No separate Zuribeans identity store is
        created.
      </p>
      <form className="mt-10 space-y-5">
        <label className="block font-bold">
          Business email
          <input
            name="email"
            type="email"
            autoComplete="email"
            className="mt-2 w-full rounded-xl border border-ink/20 bg-white px-4 py-3"
          />
        </label>
        <label className="block font-bold">
          Password
          <input
            name="password"
            type="password"
            autoComplete="current-password"
            minLength={loginSchema.shape.password.minLength ?? 8}
            className="mt-2 w-full rounded-xl border border-ink/20 bg-white px-4 py-3"
          />
        </label>
        <button
          type="submit"
          disabled
          className="w-full rounded-full bg-ink px-6 py-4 font-bold text-white disabled:opacity-45"
        >
          Sign in when Trade auth is configured
        </button>
      </form>
    </section>
  )
}
