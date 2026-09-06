import Link from "next/link"
import { registerAction, type RegisterErrorCode } from "./actions"

const errorMessages: Record<RegisterErrorCode, string> = {
  invalid_input: "Check the form for missing or invalid fields.",
  email_taken: "An account with this email already exists. Try signing in instead.",
  failed: "We could not create your account. Please try again.",
}

const isRegisterErrorCode = (value: string): value is RegisterErrorCode => value in errorMessages

export default async function RegisterPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string }>
}) {
  const { error } = await searchParams
  const message = error && isRegisterErrorCode(error) ? errorMessages[error] : null

  return (
    <section className="mx-auto max-w-lg px-5 py-20">
      <p className="text-xs font-bold uppercase tracking-[0.25em] text-clay">Trade account</p>
      <h1 className="mt-4 font-display text-5xl">Create a buyer login</h1>
      <p className="mt-4 text-ink/60">
        This creates your personal sign-in. It does not yet approve your organisation for trading —
        our trade desk reviews and activates commercial access separately, and we will notify you by
        email once that review is complete.
      </p>
      {message ? (
        <p
          role="alert"
          className="mt-6 rounded-xl bg-clay/10 px-4 py-3 text-sm font-semibold text-clay"
        >
          {message}
        </p>
      ) : null}
      <form action={registerAction} className="mt-10 space-y-5">
        <label className="block font-bold">
          Company name
          <input
            name="companyName"
            type="text"
            required
            autoComplete="organization"
            className="mt-2 w-full rounded-xl border border-ink/20 bg-white px-4 py-3"
          />
        </label>
        <div className="grid grid-cols-2 gap-4">
          <label className="block font-bold">
            First name
            <input
              name="firstName"
              type="text"
              required
              autoComplete="given-name"
              className="mt-2 w-full rounded-xl border border-ink/20 bg-white px-4 py-3"
            />
          </label>
          <label className="block font-bold">
            Last name
            <input
              name="lastName"
              type="text"
              required
              autoComplete="family-name"
              className="mt-2 w-full rounded-xl border border-ink/20 bg-white px-4 py-3"
            />
          </label>
        </div>
        <label className="block font-bold">
          Business email
          <input
            name="email"
            type="email"
            required
            autoComplete="email"
            className="mt-2 w-full rounded-xl border border-ink/20 bg-white px-4 py-3"
          />
        </label>
        <label className="block font-bold">
          Password
          <input
            name="password"
            type="password"
            required
            minLength={8}
            autoComplete="new-password"
            className="mt-2 w-full rounded-xl border border-ink/20 bg-white px-4 py-3"
          />
        </label>
        <label className="block font-bold">
          Confirm password
          <input
            name="confirmPassword"
            type="password"
            required
            minLength={8}
            autoComplete="new-password"
            className="mt-2 w-full rounded-xl border border-ink/20 bg-white px-4 py-3"
          />
        </label>
        <button type="submit" className="w-full rounded-full bg-ink px-6 py-4 font-bold text-white">
          Create account
        </button>
      </form>
      <p className="mt-6 text-sm text-ink/60">
        Already have a login?{" "}
        <Link href="/login" className="font-bold text-ink underline">
          Sign in
        </Link>
      </p>
    </section>
  )
}
