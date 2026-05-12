# LO Package Collection

`packages-lo/` is the proposed home for reusable LO packages when the workspace
is split from ordinary app/vendor packages.

Current beta rule:

```text
packages/       current mixed workspace packages and app package
packages-lo/    proposed LO package collection for beta package experiments
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

`packages-lo/` may later become its own Git repository or submodule. It should
not be created as a nested repository accidentally.

## Production Boundary

Production app installs should only fetch LO packages required by the selected
runtime profile. Development-only packages, staging packages, diagnostics,
generators and experimental packages should require an explicit development or
staging profile.

## Current Packages

- `lo-finance/` - grouped beta planning package for finance types, FIX,
  market-data, audit, risk, pricing and related finance-package contracts.
