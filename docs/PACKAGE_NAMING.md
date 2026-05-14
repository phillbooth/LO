# Package Naming

## Purpose

This document defines the package naming scheme for `packages-lo/`.

```text
packages/       normal app/vendor package space
packages-lo/    LO language, runtime, tooling, target and domain packages
```

Use grouped names so package purpose is visible from the directory alone.

## Naming Rule

Use:

```text
lo-[family]-[purpose]
```

Ungrouped names are allowed only for stable root packages whose responsibility is
already clear:

```text
lo-core
lo-ai
```

`lo-core` is the language root. `lo-ai` is the generic AI contract root.
`lo-core-photonic` is the photonic concept/model root, not a compiler target.

When a core package has both a grouped `lo-core-*` name and an older ungrouped
name, keep the grouped `lo-core-*` package as canonical. Merge any unique source,
tests, manifests or current generated artifacts into the grouped package, then
remove the stale ungrouped package folder.

## Package Families

| Family | Meaning | Examples |
|---|---|---|
| `lo-core-*` | Core language, toolchain, runtime and safe developer automation | `lo-core-compiler`, `lo-core-runtime`, `lo-core-security`, `lo-core-cli`, `lo-core-tasks` |
| `lo-ai-*` | AI workload, model, agent and AI compute-model packages | `lo-ai-agent`, `lo-ai-neural`, `lo-ai-neuromorphic`, `lo-ai-lowbit` |
| `lo-target-*` | Compiler/output targets and backend planning | `lo-target-cpu`, `lo-target-gpu`, `lo-target-wasm`, `lo-target-photonic` |
| `lo-cpu-*` | CPU implementation and optimized kernel packages | `lo-cpu-kernels`, future `lo-cpu-photonic-sim` |
| `lo-gpu-*` | GPU implementation and optimized kernel packages | future `lo-gpu-kernels` |
| `lo-framework-*` | Optional framework, server and app boundary packages | `lo-framework-app-kernel`, `lo-framework-api-server`, `lo-framework-example-app` |
| `lo-devtools-*` | Development-only tools not needed by production installs | `lo-devtools-project-graph` |
| `lo-tools-*` | Tools that may run in development or staging but are not core runtime packages | `lo-tools-benchmark` |
| `lo-finance-*` | Finance domain package family | `lo-finance-core` |
| `lo-electrical-*` | Electrical infrastructure domain package family | `lo-electrical-core` |
| `lo-ot-*` | Operational-technology integration package family | `lo-ot-core`, future `lo-ot-opcua` |
| `lo-database-*` | Database domain package family | future package family |
| `lo-industrial-*` | Industrial domain package family | future package family |
| `lo-science-*` | Science domain package family | future package family |
| `lo-manufacturing-*` | Manufacturing domain package family | future package family |

## Current Package Names

```text
lo-core
lo-core-cli
lo-core-compiler
lo-core-compute
lo-core-config
lo-core-logic
lo-core-photonic
lo-core-reports
lo-core-runtime
lo-core-security
lo-core-tasks
lo-core-vector
lo-ai
lo-ai-agent
lo-ai-lowbit
lo-ai-neural
lo-ai-neuromorphic
lo-target-ai-accelerator
lo-target-binary
lo-target-cpu
lo-target-gpu
lo-target-photonic
lo-target-wasm
lo-cpu-kernels
lo-framework-app-kernel
lo-framework-api-server
lo-framework-example-app
lo-devtools-project-graph
lo-tools-benchmark
```

Archived post-v2 domain package names:

```text
lo-finance-core
lo-electrical-core
lo-ot-core
```

These packages are preserved under `C:\laragon\www\LO_Archive\packages-lo\`
and must not be part of the active v1 build graph.

## Devtools Rule

Packages needed only by developers should use `lo-devtools-*` when they inspect,
map, scaffold or explain the project. They should not be production runtime
dependencies.

Use `lo-tools-*` for broader utilities such as benchmark runners, diagnostics or
release tooling that may run in development or staging.

Production profiles must not enable `lo-devtools-*` or `lo-tools-benchmark` by
default. A production build that includes one of these packages requires an
explicit production package override with a reason and report output.

## Target Rule

`lo-target-*` packages describe where compiled LO code is going.

Do not rename target packages to I/O packages. For example, `lo-target-binary`
means native or binary output planning. `lo-target-photonic` means compiler
mapping to photonic hardware, simulators or plans.

I/O packages can be added later for data movement:

```text
lo-io-network
lo-io-storage
lo-io-binary
lo-io-optical
lo-io-photonic
```

These should not replace compiler target packages.

## Photonic Rule

Use these names for photonic work:

```text
lo-core-photonic      photonic concepts, types, models, APIs and simulations
lo-target-photonic    compiler target planning for photonic hardware, simulators or plans
lo-cpu-photonic-sim   future CPU implementation package for photonic simulation
lo-cpu-photonic-kernels future CPU kernels for photonic-style numerical simulation
```

Do not use `lo-core-potonic`; that is a typo. Do not use a bare
`lo-photonic` package name under the grouped naming scheme. Do not use
`lo-cpu-photonic` for the general concept package, because CPU packages should
own CPU implementations or kernels, not photonic vocabulary.

## Rename Checklist

When renaming a package, update:

```text
directory paths
package.json names
lo.workspace.json
docs and examples
tests
imports and relative paths
generated project graph outputs
changelog and migration notes
```
