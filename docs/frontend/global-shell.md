# ZuriBeans global shell

Status: Gate 4 implemented  
Reviewed: 2026-09-13

The global shell provides a sticky server-rendered brand header, desktop navigation, isolated mobile
navigation client island, pathname-preserving market switcher, session-presence account link, skip
link, main landmark, and structured footer.

## Boundaries

- Session presence changes the account link label only. It is not proof of a valid identity or an
  approved trading account; protected layouts still validate the customer with Medusa.
- Market selection receives normalized `MarketContext` and writes no independent client state. The
  existing server proxy remains authoritative.
- The mobile menu is the only new global interactive island. It uses the owned native-dialog
  primitive and contains no data integration.
- Footer statements avoid invented addresses, certifications, warehouses, policies and regulatory
  claims.

## Responsive behaviour

- Below the wide-navigation breakpoint, the full primary navigation, market selector and portal
  entries move into one accessible modal menu.
- The brand and menu trigger remain available at narrow widths.
- Footer groups stack on mobile and expand into four columns where space permits.

## Accessibility

- The home brand has an explicit accessible name and its decorative stop is hidden.
- The menu trigger identifies a dialog; the native modal handles focus containment and Escape.
- The skip link becomes fixed and visible on focus and targets a focusable main landmark.
- Navigation landmarks have distinct labels.

## Performance

The shell adds no external library, font, image, global context, or upstream request. Checking only
for the presence of the httpOnly session cookie avoids calling Medusa from every public route.
