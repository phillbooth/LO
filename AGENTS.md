# AGENTS.md

## Purpose

This file gives guidance to AI coding tools working on this repository.

## Project Type

This is a LogicN application template.

The repository contains:

- LogicN language/package files in `packages-logicn/logicn-core/`
- Active reusable LogicN package collection files in `packages-logicn/`
- LogicN secure runtime kernel design files in `packages-logicn/logicn-framework-app-kernel/`
- Bespoke app files in `packages-logicn/logicn-framework-example-app/`
- App documentation in `docs/`
- Helper scripts and generators in `tools/`

## Important Rules

- Do not place app-specific documentation inside `packages-logicn/logicn-core/`.
- Do not place full-framework, CMS, admin UI, ORM or frontend framework design inside `packages-logicn/logicn-core/`.
- Do not place LogicN language documentation inside `docs/`.
- Do not treat `packages-logicn/` as production-installed by default; use it for
  explicit LogicN package collection planning only.
- Finance, electrical and OT package planning is archived under
  `C:\laragon\www\LogicN_Archive\packages-logicn\` and must not be treated as part of
  the active v1 build graph.
- Keep the repository root clean.
- Do not commit secrets.
- Do not invent LogicN syntax without documenting it.
- Update relevant docs when changing architecture, requirements, security, API or deployment behaviour.

## Project Graph for AI Tools

Use the generated project graph to understand package ownership, docs, reports
and relationships before making broad architecture or package changes.

Primary graph outputs:

- `build/graph/logicn-devtools-project-graph.json`
- `build/graph/LogicN_GRAPH_REPORT.md`
- `build/graph/logicn-ai-map.md`
- `build/graph/logicn-devtools-project-graph.html`

If `build/graph/logicn-devtools-project-graph.json` is missing, or if the graph appears out
of date after changes to `AGENTS.md`, `logicn.workspace.json`, `docs/`, package
READMEs, package TODOs, package manifests or package source contracts, run from
the repository root:

```powershell
node packages-logicn\logicn-core-cli\dist\index.js graph --out build\graph
```

Use graph query commands when package ownership or relationships are unclear:

```powershell
node packages-logicn\logicn-core-cli\dist\index.js graph query logicn-core-security --out build\graph
node packages-logicn\logicn-core-cli\dist\index.js graph explain package:logicn-core-security --out build\graph
node packages-logicn\logicn-core-cli\dist\index.js graph path package:logicn-devtools-project-graph report:project-graph --out build\graph
```

The project graph is advisory. It helps AI and humans navigate the repository,
but it does not replace compiler checks, security rules, tests or package
boundary instructions in this file.

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

### `packages-logicn/logicn-core/`

Use for:

- LogicN language rules
- syntax
- type system
- compiler notes
- memory safety model
- examples
- standard library notes

### `packages-logicn/logicn-framework-app-kernel/`

Use for:

- optional LogicN Secure App Kernel design
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

### `packages-logicn/logicn-framework-example-app/`

Use for:

- the actual app source
- app routes
- app modules
- app tests
- app build output
- app config

### `packages-logicn/`

Use for:

- proposed reusable LogicN package collection layout
- active core package and tooling package planning
- archived package references that point outside this workspace
- future nested repository or submodule planning

Do not use for:

- normal npm/vendor app packages
- app-specific source, except the current template `logicn-framework-example-app/`
- secrets
- production-only packages that have not been selected by a LogicN package profile

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
