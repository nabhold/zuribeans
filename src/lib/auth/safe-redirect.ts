/**
 * Validates a post-login redirect target. Only ever redirect to a value
 * that passes this — an unvalidated `next` param is an open-redirect
 * vector (e.g. `//evil.com` or `/\evil.com`, both of which some browsers
 * treat as protocol-relative).
 */
export const toSafeRelativePath = (value: string | null | undefined): string | null => {
  if (!value) return null
  return /^\/[^/\\]/.test(value) ? value : null
}
