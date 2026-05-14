# Package Layout

## Purpose

This document describes the proposed split between normal app/vendor packages
and reusable LO packages.

The current beta workspace has moved LO packages under `packages-lo/`. The
`packages/` directory is reserved for normal app/vendor package space.

## Proposed App Layout

```text
my-lo-app/
|-- package.json
|-- package-lo.json
|-- lo.lock.json
|-- boot.lo
|-- main.lo
|-- packages/
|   `-- normal app/vendor packages
`-- packages-lo/
    |-- .git
    |-- lo-core/
    |-- lo-core-compiler/
    |-- lo-core-runtime/
    |-- lo-core-security/
    `-- lo-framework-example-app/
```

## Package Responsibilities

`package.json` remains the host ecosystem manifest. In a Node-hosted app, it
should describe normal npm dependencies, scripts and app tooling.

`package-lo.json` should become the LO package manifest. It should describe LO
language, runtime, compiler, security and app-kernel dependencies. It should
support explicit profiles such as:

```text
runtime
development
staging
low_latency
benchmark
```

Finance, electrical and OT profiles are archived post-v2 planning and must not
be active v1 package profiles.

`lo.lock.json` should lock LO package versions, source refs, checksums, selected
profiles and dependency graph metadata. It should be deterministic and safe to
commit when it contains no secrets.

`packages/` should be for normal app/vendor packages used by the host
ecosystem.

`packages-lo/` is for LO packages. It may later be a Git submodule or
standalone nested repository, but that must be intentional. In this beta repo it
also contains `lo-framework-example-app/`, a clearly named example/template app package.

## Production Resolution Rule

Production installs must not fetch every LO package by default.

The resolver should install only packages required by the selected profile:

```text
runtime       minimal runtime/compiler/app-kernel requirements
development   graph, diagnostics, generators and test helpers
benchmark     benchmark packages, never implicit in production
```

Development and staging packages should be excluded unless explicitly selected.

Production boot/profile defaults must disable development-only and benchmark
packages. This is a rule, not only a resolver optimisation.

Default-disabled production package families include:

```text
lo-tools-benchmark
lo-devtools-*
```

If a production build includes a default-disabled package, `boot.lo` or
`package-lo.json` must declare an explicit production package override with a
reason, and preferably an expiry. The override must be reported. Without the
override, startup/build validation must fail.

Example object-shaped policy:

```json
{
  "production": {
    "packageOverrides": [
      {
        "path": "packages-lo/lo-tools-benchmark",
        "reason": "One-off production hardware validation before launch.",
        "expires": "2026-06-01"
      }
    ]
  }
}
```

## Migration Rule

Do not add root `package-lo.json` or `lo.lock.json` as decorative files. Add
them only when their schemas and resolver behaviour are documented and tested.

Current beta work may add new experimental LO packages under `packages-lo/` as
long as documentation states their status clearly.
