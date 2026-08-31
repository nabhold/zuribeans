# Development

Copy `.env.example` to `.env.local`, supply a valid Trade Store API URL and publishable
key, then run `pnpm install --frozen-lockfile && pnpm dev`.

The repository consumes `ghcr.io/nabhold/baobab-dev:1.2.6-frontend` for GitHub
Codespaces and compatible local Dev Containers. Browser-dependent CI uses the
separately published `1.2.6-frontend-e2e` profile.

Run `pnpm format:check`, `pnpm lint`, `pnpm typecheck`, `pnpm test` and `pnpm build`
before submitting a change. The current home-page Playwright journey is intentionally
independent of Trade and runs in CI; Trade-backed browser journeys remain deferred until
a controlled Trade test service is available.
