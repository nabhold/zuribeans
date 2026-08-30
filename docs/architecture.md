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

## Known organisational mismatch

Shared ADR-0001 describes Zuribeans as B2C/Astro. The current approved direction is B2B and
Next.js. Shared must be amended through its governance process; this repository records the
mismatch rather than claiming it does not exist.
