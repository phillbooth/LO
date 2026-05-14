# LO Config

`lo-core-config` is the package for LO project configuration, environment mode and
policy loading contracts.

It belongs in:

```text
/packages-lo/lo-core-config
```

Use this package for:

```text
project config shape
environment mode loading
development/test/staging/production policy
config validation diagnostics
runtime config handoff
safe environment variable references
host package manifest boundary checks
```

## Contracts

`lo-core-config` exposes typed contracts for:

- `ProjectConfig` - project name, version, root, entry files, package
  references, targets and documentation/tool paths.
- `EnvironmentConfig` - the active mode plus public and secret environment
  variable references.
- `ProductionStrictnessPolicy` - production checks for strict project mode,
  missing required variables, unsafe secret defaults and production-disabled
  packages.
- `RuntimeConfigHandoff` - the safe object passed to runtime consumers after
  config validation.
- `ConfigDiagnostic` - structured warnings and errors with stable codes,
  paths and optional suggested fixes.
- `HostPackageManifestBoundaryPolicy` - validation that keeps LO package graph
  fields out of host ecosystem manifests such as `package.json`.

Environment variables are represented by name and metadata only. Secret values
must not be loaded into or printed by this package.

## Example

```ts
import { loadConfigFromObjects } from "@lo/core-config";

const result = loadConfigFromObjects({
  project: {
    name: "LO-app",
    version: "0.1.0",
    root: ".",
    entryFiles: ["packages-lo/lo-framework-example-app/src/index.lo"],
    packages: ["packages-lo/lo-core", "packages-lo/lo-core-config", "packages-lo/lo-framework-example-app"],
    strict: true,
    targets: ["cpu", "wasm"],
  },
  environment: {
    mode: "production",
    variables: ["LO_APP_ENV"],
    secrets: ["LO_APP_SECRET"],
  },
  availableEnvironment: {
    LO_APP_ENV: "production",
    LO_APP_SECRET: "set",
  },
});
```

See `examples/project-config.json` for a fuller object-shaped example.

## Production Package Overrides

Production mode must be conservative about optional tooling packages. Packages
such as `lo-tools-benchmark` and `lo-devtools-*` are disabled by default in
production profiles.

Default production rule:

```text
production disables development-only and benchmark packages unless explicitly
overridden with a reason.
```

Example explicit override:

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

Overrides are included in the runtime config handoff as
`activeProductionPackageOverrides` so build, security and deployment reports can
show that production defaults were intentionally changed.

## Host Package Boundary

`package.json` is a host ecosystem manifest for NPM scripts, current
JavaScript/TypeScript prototype tooling and generated JS/TS interop packaging.
It must not define LO package graph keys, runtime profiles, compiler target
policy or production package overrides.

LO package selection belongs in future `package-lo.json` and `lo.lock.json`
schemas once those schemas are implemented.

## Boundary

`lo-core-config` should load and validate configuration. It must not execute app
logic, run tasks, serve HTTP or reveal secrets.

Final rule:

```text
lo-core-config describes configuration safely.
lo-core-security protects sensitive values.
consuming packages enforce their own runtime behaviour.
```
