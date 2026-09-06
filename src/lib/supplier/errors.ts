/** Postgres SQLSTATE 23505 (unique_violation), as thrown by the `postgres` driver. */
export const isUniqueConstraintViolation = (error: unknown): boolean =>
  typeof error === "object" &&
  error !== null &&
  "code" in error &&
  (error as { code?: unknown }).code === "23505"
