# LO Package Collection

`packages-lo/` is the home for reusable LO packages in this beta workspace.
It is split from ordinary app/vendor packages.

Current beta rule:

```text
packages/       normal app/vendor package space
packages-lo/    LO package collection and beta LO package experiments
```

The long-term direction is:

```text
my-lo-app/
|-- package.json       normal app/runtime ecosystem dependencies
|-- package-lo.json    LO package manifest
|-- lo.lock.json       locked LO package graph
|-- packages/          normal vendor/app packages
|-- packages-lo/       LO packages, optionally a nested Git repository
|-- boot.lo
`-- main.lo
```

`packages-lo/` may later become its own Git repository or submodule. If a
`.git` directory is added, it must be intentional and documented.

## Production Boundary

Production app installs should only fetch LO packages required by the selected
runtime profile. Development-only packages, staging packages, diagnostics,
generators and experimental packages should require an explicit development or
staging profile.

## Current Packages

- `lo-example-app/` - minimal example/template app package for this workspace.
- `lo-finance/` - grouped beta planning package for finance types, FIX,
  market-data, audit, risk, pricing and related finance-package contracts.
- Core language, compiler, runtime, security, target, tooling and report
  packages live here as `lo-*` directories.
