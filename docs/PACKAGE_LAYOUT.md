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
    |-- lo-compiler/
    |-- lo-runtime/
    |-- lo-security/
    |-- lo-finance/
    `-- lo-example-app/
```

## Package Responsibilities

`package.json` remains the host ecosystem manifest. In a Node-hosted app, it
should describe normal npm dependencies, scripts and app tooling.

`package-lo.json` should become the LO package manifest. It should describe LO
language, runtime, compiler, security, app-kernel and domain package
dependencies. It should support explicit profiles such as:

```text
runtime
development
staging
finance
low_latency
benchmark
```

`lo.lock.json` should lock LO package versions, source refs, checksums, selected
profiles and dependency graph metadata. It should be deterministic and safe to
commit when it contains no secrets.

`packages/` should be for normal app/vendor packages used by the host
ecosystem.

`packages-lo/` is for LO packages. It may later be a Git submodule or
standalone nested repository, but that must be intentional. In this beta repo it
also contains `lo-example-app/`, a clearly named example/template app package.

## Production Resolution Rule

Production installs must not fetch every LO package by default.

The resolver should install only packages required by the selected profile:

```text
runtime       minimal runtime/compiler/app-kernel requirements
development   graph, diagnostics, generators and test helpers
finance       finance package contracts selected by the app
benchmark     benchmark packages, never implicit in production
```

Development and staging packages should be excluded unless explicitly selected.

## Migration Rule

Do not add root `package-lo.json` or `lo.lock.json` as decorative files. Add
them only when their schemas and resolver behaviour are documented and tested.

Current beta work may add new experimental LO packages under `packages-lo/` as
long as documentation states their status clearly.
