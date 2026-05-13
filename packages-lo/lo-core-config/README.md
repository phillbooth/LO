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
```

## Contracts

`lo-core-config` exposes typed contracts for:

- `ProjectConfig` - project name, version, root, entry files, package
  references, targets and documentation/tool paths.
- `EnvironmentConfig` - the active mode plus public and secret environment
  variable references.
- `ProductionStrictnessPolicy` - production checks for strict project mode,
  missing required variables and unsafe secret defaults.
- `RuntimeConfigHandoff` - the safe object passed to runtime consumers after
  config validation.
- `ConfigDiagnostic` - structured warnings and errors with stable codes,
  paths and optional suggested fixes.

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

## Boundary

`lo-core-config` should load and validate configuration. It must not execute app
logic, run tasks, serve HTTP or reveal secrets.

Final rule:

```text
lo-core-config describes configuration safely.
lo-core-security protects sensitive values.
consuming packages enforce their own runtime behaviour.
```
