# Medusa integration

`src/lib/medusa/client.ts` is the only SDK-construction point.
`src/lib/medusa/products.ts` maps Medusa responses into storefront view models.

The first slice uses the standard Store Product API only. It does not manufacture
customer-specific prices, carts or orders locally. Authentication, cart and checkout
must use Medusa customer and commerce APIs once Trade publishes and verifies the required
market configuration.

`NEXT_PUBLIC_MEDUSA_PUBLISHABLE_KEY` is intentionally visible to the storefront and is
not an administrative secret. Admin tokens, database credentials and Trade webhook secrets
must never enter this repository or browser bundles.
