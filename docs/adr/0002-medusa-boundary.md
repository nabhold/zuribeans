# ADR 0002: Medusa adapter boundary

## Status

Accepted

## Decision

SDK construction and Store API calls remain under `src/lib/medusa`. React components
consume storefront view models. Customer-specific data is dynamic and private.

## Consequences

SDK upgrades are isolated. Components cannot silently become commerce services.
