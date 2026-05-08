# LO Config

`lo-config` is the package for LO project configuration, environment mode and
policy loading contracts.

It belongs in:

```text
/packages/lo-config
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

## Boundary

`lo-config` should load and validate configuration. It must not execute app
logic, run tasks, serve HTTP or reveal secrets.

Final rule:

```text
lo-config describes configuration safely.
lo-security protects sensitive values.
consuming packages enforce their own runtime behaviour.
```
