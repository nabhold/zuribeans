# Development

Copy `.env.example` to `.env.local`, supply a valid Trade Store API URL and publishable
key, then run `pnpm install --frozen-lockfile && pnpm dev`.

The repository declares Shared's `frontend` profile. That baobab-dev image has not yet
been published and the current full image uses Node 24, outside this application's
Medusa-compatible Node 20–22 range. Codespaces temporarily uses the official Node 20
Dev Container. Replace it with the pinned baobab-dev frontend image when published.

Run `pnpm format:check`, `pnpm lint`, `pnpm typecheck`, `pnpm test` and `pnpm build`
before submitting a change. Playwright is prepared under `tests/e2e`, but CI should add
it only with a reachable Trade test service.
