# ADR 0003: Temporary Codespaces image

## Status

Accepted with expiry

## Decision

Use the official Node 20 Dev Container until baobab-dev publishes its declared frontend
target. Do not use the current Node 24 full image because Medusa's supported Node range
for this repository ends below Node 23.

## Exit criterion

Switch to a pinned `nabhold/baobab-dev` frontend image as soon as that image exists and
satisfies the Shared development-environment declaration.
