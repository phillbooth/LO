# AGENTS.md

## Purpose

This file gives guidance to AI coding tools working on this repository.

## Project Type

This is a LO application template.

The repository contains:

- LO language/package files in `packages/lo-core/`
- LO secure runtime kernel design files in `packages/lo-app-kernel/`
- Bespoke app files in `packages/app/`
- App documentation in `docs/`
- Helper scripts and generators in `tools/`

## Important Rules

- Do not place app-specific documentation inside `packages/lo-core/`.
- Do not place full-framework, CMS, admin UI, ORM or frontend framework design inside `packages/lo-core/`.
- Do not place LO language documentation inside `docs/`.
- Keep the repository root clean.
- Do not commit secrets.
- Do not invent LO syntax without documenting it.
- Update relevant docs when changing architecture, requirements, security, API or deployment behaviour.

## Coding Rules

- Use strict typing.
- Handle undefined values explicitly.
- Handle errors explicitly.
- Keep files focused.
- Prefer small modules over large files.
- Keep compiler output out of Git unless specifically required.

## Documentation Rules

When adding or changing features, update:

- `docs/REQUIREMENTS.md`
- `docs/ARCHITECTURE.md`
- `docs/TASKS.md`
- `docs/CHANGELOG.md`

## Security Rules

- Never store real secrets in source control.
- Use `.env.example` for placeholder environment variables.
- Validate inputs.
- Avoid unsafe dynamic code execution.
- Keep runtime configuration separate from compiled output.

## Package Boundaries

### `packages/lo-core/`

Use for:

- LO language rules
- syntax
- type system
- compiler notes
- memory safety model
- examples
- standard library notes

### `packages/lo-app-kernel/`

Use for:

- optional LO Secure App Kernel design
- request lifecycle policy
- typed API boundary enforcement
- validation, auth and rate-limit policy
- idempotency and replay protection policy
- queue/job contracts
- runtime and audit reports

Do not use for:

- CMS features
- admin dashboards
- page builders
- mandatory ORM design
- mandatory template engines
- React, Angular or other frontend framework syntax

### `packages/app/`

Use for:

- the actual app source
- app routes
- app modules
- app tests
- app build output
- app config

### `docs/`

Use for:

- requirements
- design
- architecture
- security
- API
- database
- deployment
- decisions
- changelog

### `tools/`

Use for:

- helper scripts
- generators
- local build utilities
