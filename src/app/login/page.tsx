import Link from "next/link"
import { loginSchema } from "@/lib/validation/login"
import { toSafeRelativePath } from "@/lib/auth/safe-redirect"
import { loginAction, type LoginErrorCode } from "./actions"

const errorMessages: Record<LoginErrorCode, string> = {
  invalid_input: "Enter a valid business email and password.",
  invalid_credentials: "That email and password combination is not recognised.",
}

const isLoginErrorCode = (value: string): value is LoginErrorCode => value in errorMessages

export default async function LoginPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string; next?: string }>
}) {
  const { error, next: rawNext } = await searchParams
  const message = error && isLoginErrorCode(error) ? errorMessages[error] : null
  const next = toSafeRelativePath(rawNext) ?? "/account"

  return (
    <section className="mx-auto max-w-lg px-5 py-20">
      <p className="text-xs font-bold uppercase tracking-[0.25em] text-clay">Trade account</p>
      <h1 className="mt-4 font-display text-5xl">Buyer login</h1>
      <p className="mt-4 text-ink/60">
        Authentication uses Medusa customer identity. No separate Zuribeans identity store is
        created.
      </p>
      {message ? (
        <p
          role="alert"
          className="mt-6 rounded-xl bg-clay/10 px-4 py-3 text-sm font-semibold text-clay"
        >
          {message}
        </p>
      ) : null}
      <form action={loginAction} className="mt-10 space-y-5">
        <input type="hidden" name="next" value={next} />
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
            autoComplete="current-password"
            minLength={loginSchema.shape.password.minLength ?? 8}
            className="mt-2 w-full rounded-xl border border-ink/20 bg-white px-4 py-3"
          />
        </label>
        <button type="submit" className="w-full rounded-full bg-ink px-6 py-4 font-bold text-white">
          Sign in
        </button>
      </form>
      <p className="mt-6 text-sm text-ink/60">
        New buyer or supplier?{" "}
        <Link
          href={`/register?next=${encodeURIComponent(next)}`}
          className="font-bold text-ink underline"
        >
          Create a Zuribeans login
        </Link>
      </p>
    </section>
  )
}
