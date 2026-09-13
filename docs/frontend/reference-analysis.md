# ZuriBeans frontend reference analysis

Status: Gate 1 complete  
Reviewed: 2026-09-13

## Method

The reference repositories were inspected at fixed revisions so later upstream changes cannot
silently alter this assessment.

| Reference          | Revision                                   | Primary inspection scope                                                                                                             |
| ------------------ | ------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------ |
| Medusa B2B Starter | `9c4e3bf41dcecd86d548fcce937cc8a05f950b44` | Storefront routes, company/approval/quote data boundaries, bulk variant ordering, account navigation, loading states, tables.        |
| Medusa DTC Starter | `bd2441acc18359533758fbf4db5bc80129055d2e` | Catalogue, PDP, cart, checkout, order, navigation, image, Server Action and responsive patterns.                                     |
| Vercel Commerce    | `3761e52e60df9c6a316e067dbfd7032e494d3634` | RSC composition, provider adapter isolation, cache tags, Suspense, optimistic cart, image and navigation performance.                |
| Spree Storefront   | `2ad6ad5bd1bcc055467064bd57cf20ab5f711c88` | Country/locale routing, wholesale gating, server-only APIs, SEO, account/checkout composition, responsive components, observability. |
| shadcn/ui          | `2b3e6d4f8d9161fe5c19340dc383aade392012dd` | Owned component-source model, composable primitives, accessible interaction patterns, tokens and data-display building blocks.       |

The deprecated `medusajs/b2b-starter-medusa` and `medusajs/nextjs-starter-medusa` repositories
were not used as the primary sources where their maintained successors exist. Their prior patterns
were considered only when the current repositories retained the same intent.

## Controlling rule

The references solve interaction and presentation problems. They do not own ZuriBeans tenants,
legal entities, market identity, pricing authority, inventory ownership, authentication authority,
supplier qualification, ERP projections, or canonical mapping. Any reference component that
assumes its own backend extension is unusable until Baobab publishes an equivalent contract.

## Adoption records

| Reference       | Pattern                                              | ZuriBeans need                         | Decision                      | Reason                                                                                           | Dependency                                                     | Risk/control                                                                   |
| --------------- | ---------------------------------------------------- | -------------------------------------- | ----------------------------- | ------------------------------------------------------------------------------------------------ | -------------------------------------------------------------- | ------------------------------------------------------------------------------ |
| Medusa B2B      | Account dashboard with section navigation            | Efficient professional buyer workspace | Adapt                         | Information architecture is valuable; its backend company model is not authoritative here.       | Trade buyer-company contracts                                  | Render only implemented/pending sections; no fake counts or records.           |
| Medusa B2B      | Company card, employees, invites and roles           | Organisation/team management           | Defer                         | UI depends directly on starter-specific company endpoints and role assumptions.                  | Trade company/member/role APIs plus IAM entitlement mapping    | A shell may imply a capability that does not exist; keep visibly unavailable.  |
| Medusa B2B      | Spending limits and cart approvals                   | Purchasing governance                  | Defer                         | Business rules belong to Trade and Control Plane authorization, not the browser.                 | Published approval and authority contracts                     | Never reproduce approval evaluation client-side.                               |
| Medusa B2B      | Quote overview, status badge and conversation layout | RFQ/quotation clarity                  | Adapt after contract          | Table/status/message composition is strong, but its quote module defines the workflow.           | Baobab Trade RFQ/quotation contract                            | Map canonical statuses explicitly; reject unknown states safely.               |
| Medusa B2B      | Product variant table with quantity cells            | B2B bulk ordering                      | Adapt                         | Dense rows are better than consumer cards for procurement.                                       | Entitled catalogue, price, inventory and cart validation       | Server must revalidate MOQ, eligibility, price and stock.                      |
| Medusa B2B      | Previously purchased list                            | Repeat ordering                        | Adapt after contract          | High-value B2B shortcut.                                                                         | Buyer-specific order history                                   | Private/no-store data; never leak through public product cache.                |
| Medusa B2B      | Loading files and granular Suspense                  | Perceived performance                  | Adopt                         | Allows the shell and stable context to render while private/remote data loads.                   | None                                                           | Avoid excessive boundaries that cause layout movement.                         |
| Medusa DTC      | Product grid, category and collection composition    | Public discovery                       | Adapt                         | Useful baseline, but ZuriBeans needs specification/table views and multi-product language.       | Public Trade catalogue                                         | Do not import consumer merchandising assumptions.                              |
| Medusa DTC      | PDP image gallery, options and product facts         | Better product evaluation              | Adapt                         | Media and facts improve decisions; B2B fields must dominate the hierarchy.                       | Normalized Trade product metadata                              | Do not infer grade, origin, certification or availability.                     |
| Medusa DTC      | Server-side cart and checkout actions                | Purchasing implementation              | Defer pending verification    | Correct architectural direction, but launch entitlement and market configuration are not proven. | Trade cart/checkout contracts and test service                 | Authenticated is not approved; no ordering before entitlement.                 |
| Medusa DTC      | Country-code URL segment                             | Stable market-specific URLs            | Evaluate through ADR          | Enables caching and canonical market URLs.                                                       | Control Plane Market model and SEO decision                    | Current candidate keys are not canonical IDs; URL migration affects all links. |
| Vercel Commerce | `lib/<provider>` adapter behind stable app models    | Engine isolation                       | Adopt                         | Matches existing `src/lib/medusa` boundary.                                                      | None                                                           | Prevent raw provider types escaping into domain components.                    |
| Vercel Commerce | RSC-first navigation and catalogue                   | Minimal client JavaScript              | Adopt                         | Consistent with current source and performance target.                                           | None                                                           | Interactive islands must remain small and justified.                           |
| Vercel Commerce | Tagged cache and revalidation webhook                | Efficient public catalogue             | Adapt after contract          | Appropriate only when market is part of the key and Trade can trigger invalidation.              | Trade revalidation/event contract                              | Stale availability and cross-market leakage.                                   |
| Vercel Commerce | Suspended cart/search elements                       | Fast navigation                        | Adapt                         | Supports progressive rendering without making the whole shell client-rendered.                   | None                                                           | Use stable skeleton dimensions to protect CLS.                                 |
| Vercel Commerce | Shopify model/API structure                          | Commerce domain                        | Reject                        | Provider-specific and conflicts with Medusa/Baobab authority.                                    | N/A                                                            | No Shopify types, fragments or mutations enter this repository.                |
| Spree           | Market as country/currency/locale URL context        | Multi-market experience                | Evaluate through ADR          | Strong model for crawlability and explicit context.                                              | Canonical market decision                                      | Do not copy Spree Market IDs or assume one country equals one Baobab market.   |
| Spree           | Server-only SDK and httpOnly auth/cart cookies       | Token security                         | Adopt conceptually            | Reinforces the existing server-only Medusa session boundary.                                     | Current auth, future IAM                                       | Cookie lifetimes and revocation must follow the authoritative provider.        |
| Spree           | Wholesale approval gating                            | Pending versus approved UX             | Adapt                         | Matches ZuriBeans requirement to separate identity from trading status.                          | Trade entitlement contract                                     | Never derive approval from login/customer existence.                           |
| Spree           | SEO components and JSON-LD separation                | Public search quality                  | Adapt                         | Reusable metadata builders reduce inconsistent route metadata.                                   | Valid public product data                                      | Product schema must not claim offers/prices unavailable publicly.              |
| Spree           | Sentry-specific implementation                       | Observability                          | Reject as a direct dependency | Provider choice has not been accepted.                                                           | Observability ADR/provider                                     | Prepare neutral reporting seams; do not add a vendor incidentally.             |
| shadcn/ui       | Copy-owned source primitives                         | Customizable design system             | Adopt                         | ZuriBeans keeps ownership and can apply tokens without vendor components in pages.               | Minimal Radix dependencies only where behaviour justifies them | Copying every primitive creates unused code and dependency sprawl.             |
| shadcn/ui       | Accessible Dialog/Sheet/Dropdown patterns            | Mobile nav and overlays                | Adapt                         | Correct focus and dismissal behaviour are costly to hand-roll.                                   | Mature primitive package if adopted                            | Bundle only used primitives; test keyboard and screen reader behaviour.        |
| shadcn/ui       | Data table composition                               | Buyer/supplier procurement data        | Adapt                         | Suitable for desktop procurement workflows with responsive alternatives.                         | Real domain data contracts                                     | TanStack/Table is not automatically required for simple server tables.         |
| shadcn/ui       | Generic visual defaults                              | ZuriBeans brand                        | Reject                        | The final estate must not resemble a starter dashboard.                                          | N/A                                                            | ZuriBeans tokens and domain composition remain authoritative.                  |

## Component mapping

| ZuriBeans component family | Reference insight                                 | Intended implementation                                                                |
| -------------------------- | ------------------------------------------------- | -------------------------------------------------------------------------------------- |
| `ui`                       | shadcn source ownership and accessibility         | Small owned primitives, token driven, no domain knowledge.                             |
| `layout` / `navigation`    | Vercel RSC shell; Spree responsive navigation     | Server shell with tiny client islands only for disclosure behaviour.                   |
| `commerce`                 | DTC catalogue/PDP; Vercel adapter; B2B dense rows | Normalized product view models supporting both card and table presentation.            |
| `buyer`                    | B2B account and approval information architecture | Pending-state-first shell until real company/entitlement contracts exist.              |
| `supplier`                 | ZuriBeans implementation only                     | Preserve ADR-0006 lifecycle; borrow visual primitives, never supplier domain logic.    |
| `trade`                    | B2B status/table composition                      | Feature-gated RFQ, quote, shipment and document surfaces after contracts.              |
| `forms`                    | shadcn field patterns; DTC server actions         | Semantic server forms with summaries, descriptions, field errors and pending feedback. |
| `data-display`             | B2B and shadcn tables/badges                      | Responsive table-to-list compositions with canonical status mapping.                   |
| `marketing`                | Vercel performance discipline                     | Server-rendered sections using local typed content until CMS contracts exist.          |

## Performance conclusions

1. Preserve RSC and server data access as the default.
2. Keep provider SDKs behind server-only adapters and return ZuriBeans view models.
3. Introduce Suspense at remote-data boundaries, not around every decorative section.
4. Avoid global cart, modal, and menu contexts until a real interaction requires them.
5. Do not copy starter mega-menus, carousels, animation packages, recommendation rails, or
   analytics bundles by default.
6. Public catalogue caching requires a market-scoped key and explicit invalidation policy.
7. Private buyer/supplier data remains dynamic and excluded from shared caches.
8. Images require explicit aspect ratio, responsive `sizes`, correct alternative text, and
   priority only for the actual LCP asset.

## Customization conclusions

The reference starters organize large features effectively, but copying their entire module trees
would import backend assumptions and hundreds of components. ZuriBeans should keep a smaller
dependency direction:

`tokens → primitives → composites → domain components → routes`

Page routes must compose domain components and application services; they must not contain copied
provider calls, repeated brand utilities, or template-owned abstractions. A primitive is added only
when an implemented route needs it.

## Gate 1 decision

Proceed with a ZuriBeans-specific information architecture and owned design system. Immediately
adopt server-first composition, normalized adapter models, responsive data presentation, accessible
owned primitives, explicit empty/error/loading states, and performance-conscious image handling.
Defer company, approval, quote, cart, checkout, order, shipment, invoice, and payment behaviour
until their Baobab contracts and launch entitlements are verified.
