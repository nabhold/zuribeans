# Development

Copy `.env.example` to `.env.local`, supply a valid Trade Store API URL and publishable
key, then run `pnpm install --frozen-lockfile && pnpm dev`.

`NEXT_PUBLIC_ENABLED_MARKETS` and `NEXT_PUBLIC_DEFAULT_MARKET` control which markets this
deployment serves (see `docs/adr/0004-market-context-resolution.md`); both must use the
candidate market keys in `src/lib/market/markets.ts` (`zuribeans_ug`, `zuribeans_za`). Visit
`/?market=zuribeans_ug` locally to switch markets — the choice persists in a `zb_market` cookie.

`/login` and `/register` require a reachable Trade instance (`MEDUSA_BACKEND_URL`) to
authenticate against; without one, form submissions redirect back with an error rather than
throwing, and `/account` correctly redirects to `/login` for any visitor with no valid session.
See `docs/adr/0005-buyer-session-storage.md`.

The repository consumes `ghcr.io/nabhold/baobab-dev:1.2.6-frontend` for GitHub
Codespaces and compatible local Dev Containers. Browser-dependent CI uses the
separately published `1.2.6-frontend-e2e` profile.

Run `pnpm format:check`, `pnpm lint`, `pnpm typecheck`, `pnpm test` and `pnpm build`
before submitting a change. The current home-page Playwright journey is intentionally
independent of Trade and runs in CI; Trade-backed browser journeys remain deferred until
a controlled Trade test service is available.
