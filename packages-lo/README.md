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

## Naming

Package names follow the family-prefix rule documented in
`../docs/PACKAGE_NAMING.md`.

Use:

```text
lo-[family]-[purpose]
```

Development-only packages should use `lo-devtools-*` or `lo-tools-*` so they are
not mistaken for production runtime dependencies.

## Current Packages

- `lo-core/` - LO language rules, syntax, type system, examples and core docs.
- `lo-core-compiler/` - compiler pipeline contracts.
- `lo-core-runtime/` - execution contracts for checked or compiled LO code.
- `lo-core-security/` - security primitives, redaction, permissions and reports.
- `lo-core-config/` - project config and environment mode contracts.
- `lo-core-reports/` - shared report schemas and report-writing contracts.
- `lo-core-logic/` - `Tri`, `Logic<N>`, Decision, RiskLevel and Omni logic.
- `lo-core-vector/` - vector, matrix, tensor and numeric operation concepts.
- `lo-core-compute/` - compute planning, capabilities, effects and target selection.
- `lo-core-cli/` - developer command tooling.
- `lo-core-tasks/` - safe typed project automation.
- `lo-ai/` - generic AI inference contracts and AI safety policy.
- `lo-ai-agent/` - supervised AI agent and tool-permission contracts.
- `lo-ai-lowbit/` - low-bit and ternary AI backend contracts.
- `lo-ai-neural/` - neural workload contracts.
- `lo-ai-neuromorphic/` - spike and event-signal workload contracts.
- `lo-photonic/` - photonic concepts, models, APIs and simulations.
- `lo-target-*` - compiler/output target packages.
- `lo-cpu-kernels/` - optimized CPU kernel contracts.
- `lo-framework-app-kernel/` - optional secure application kernel.
- `lo-framework-api-server/` - built-in HTTP API transport package.
- `lo-framework-example-app/` - minimal example/template app package.
- `lo-devtools-project-graph/` - development-only project graph tooling.
- `lo-tools-benchmark/` - benchmark and diagnostic tooling.
- `lo-finance-core/` - grouped beta planning package for finance contracts.
