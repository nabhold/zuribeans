# ADR 0003: Temporary Codespaces image

## Status

Accepted with expiry

## Decision

Use the official Node 22 Dev Container until baobab-dev publishes its declared frontend
target. Node 22.14 satisfies both Medusa and pnpm 11.24; the current Node 24 full image
falls outside this repository's supported range.

## Exit criterion

Switch to a pinned `nabhold/baobab-dev` frontend image as soon as that image exists and
satisfies the Shared development-environment declaration.
