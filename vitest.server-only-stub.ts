// Vitest runs "server-only" code in Node directly (that's the point of an
// integration test), so the package's client-bundle guard doesn't apply —
// alias it to a no-op here rather than in application code.
export {}
