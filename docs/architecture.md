# Architecture

Zuribeans is a customer-facing B2B digital estate. It owns presentation, branding,
navigation, content composition and buying journeys. Baobab Trade owns commerce.

## Runtime flow

Customer requests reach Next.js. Server Components call application-level functions in
`src/lib/medusa`; that adapter calls Medusa's Store API with the storefront publishable
key. Components never call Medusa directly. ERP and Pulse are not browser dependencies.

## Data behaviour

| Data                    | Rendering and cache rule                                                          |
| ----------------------- | --------------------------------------------------------------------------------- |
| Marketing content       | Static/server rendered                                                            |
| Public catalogue        | Server rendered; revalidation may be added after catalogue volatility is measured |
| Availability            | Dynamic or short-lived                                                            |
| Buyer pricing           | Authenticated, private and never placed in a shared cache                         |
| Cart, account, checkout | Dynamic and private                                                               |

## B2B capability ownership

Medusa-native products, customers, customer groups, sales channels, price lists, carts and
orders must be used first. Company hierarchies, quotation workflows, saved lists, purchasing
approval and credit terms require Trade contracts before frontend implementation. ERP
documents normally flow through Trade rather than direct browser-to-ERP calls.

## Market context

Zuribeans supports Uganda and South Africa from the outset (see
`docs/adr/0004-market-context-resolution.md`). `src/proxy.ts` resolves one active market per
request — an explicit `?market=` query param, then the visitor's `zb_market` cookie, then the
deployment's configured default (`NEXT_PUBLIC_DEFAULT_MARKET`) — and exposes it to Server
Components via `src/lib/market/request.ts`. The resolved market's `countryCode` is passed to
Medusa's Store API as pricing context (`country_code`); nothing about a market is ever
hardcoded into a component. `src/lib/market/markets.ts` mirrors the exact candidate
`marketKey`s Trade already bootstraps (`zuribeans_ug`, `zuribeans_za`) rather than inventing a
parallel identifier; see the gap this still leaves open below.

## Remaining upstream gaps (see `contracts.lock.yaml`)

- Trade has not published company accounts, quotation, saved-list or approval-flow contracts,
  so buyer organisations, RFQs and contract pricing remain out of scope here until they exist.
- Control Plane has not registered or activated real Market records, so the market keys above
  are candidates pinned to Trade's own bootstrap config, not resolved `market_id`s. Reconcile
  them once Control Plane's `market.market` table is implemented.
- Control Plane's Digital Estate representation is a stub (tenant/name/domain/status only);
  richer estate registration (business model, markets, capability bindings) needs an ADR in
  `nabhold/baobab-cp` before this repository can consume it.

The organisational classification mismatch this document used to record (Shared ADR-0001
describing Zuribeans as B2C/Astro) has been resolved upstream: Shared now classifies Zuribeans
as B2B/Next.js in both ADR-0001 and `contracts/legal-entity/registry.yaml`.
