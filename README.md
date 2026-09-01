# Zuribeans

Zuribeans is the independently deployable B2B digital estate of the Zuribeans operating
company. It owns the customer experience and consumes commerce from
`nabhold/baobab-trade` through Medusa's Store API.

## Boundaries

- Baobab Trade owns products, prices, customers, carts, orders, inventory and fulfilment.
- Baobab ERP and Pulse are reached through backend engine integrations, not from browsers.
- Baobab Control Plane remains authoritative for platform governance.
- `nabhold/shared` owns canonical contracts and standards.
- `nabhold/infrastructure` owns production deployment and secret injection.

## First vertical slice

The initial application provides a branded home page, live server-rendered catalogue,
product detail, buyer-login boundary, health endpoint, SEO metadata, sitemap, robots policy
and accessible responsive components. Login remains visibly unavailable until the Trade
customer-auth contract and market configuration are verified.

## Start locally

```bash
cp .env.example .env.local
corepack enable
pnpm install --frozen-lockfile
pnpm dev
```

See `docs/architecture.md`, `docs/development.md` and
`docs/medusa-integration.md`.

## Foundation 4

Codespaces uses `ghcr.io/nabhold/baobab-dev:1.2.6-frontend`. The SHA-pinned
Foundation gate validates contract compatibility and reproducibility and scans
source, dependencies, secrets, configuration, and the deployable image.
