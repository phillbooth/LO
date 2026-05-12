# Package Naming

## Purpose

This document records package naming rules after moving LO packages from
`packages/` into `packages-lo/`.

## Current Rule

```text
packages/       normal app/vendor package space
packages-lo/    LO language, runtime, tooling, target and domain packages
```

The generic `app/` folder was renamed to `lo-example-app/` because a plain
`app` name is ambiguous inside the LO package collection.

## Naming Prefixes

Use these prefixes consistently:

```text
lo-target-*   where code runs or compiles to
lo-io-*       how data moves
lo-ai-*       AI-specific models, tasks or AI workload abstractions
lo-kernel-*   low-level execution kernels
lo-app-*      runtime/application framework layer
```

## Names To Keep

Keep these names because their responsibilities are clear:

```text
lo-core
lo-cli
lo-compiler
lo-runtime
lo-compute
lo-logic
lo-vector
lo-security
lo-reports
lo-project-graph
lo-target-binary
lo-target-cpu
lo-target-gpu
lo-target-photonic
lo-target-wasm
lo-photonic
lo-app-kernel
lo-api-server
lo-tasks
lo-benchmark
lo-finance
```

`lo-target-binary` means native/binary target planning. It should not be
renamed to `lo-io-binary`, because binary target output and binary data I/O are
different concerns.

`lo-target-photonic` means photonic backend target planning. It should not be
renamed to `lo-io-photonic`, because photonic target planning and photonic I/O
are different concerns.

## Candidate Renames

These names are candidates for a later staged migration:

| Current | Candidate | Reason |
|---|---|---|
| `lo-target-ai-accelerator` | `lo-target-ai` | Shorter target name for NPU, TPU, Gaudi and related AI targets. |
| `lo-cpu-kernels` | `lo-kernel-cpu` | Better if the package owns low-level CPU execution kernels. |
| `lo-lowbit-ai` | `lo-ai-lowbit` | Groups AI packages by prefix. |
| `lo-neural` | `lo-ai-neural` | Makes neural workload ownership visibly AI-related. |
| `lo-neuromorphic` | `lo-ai-neuromorphic` | Groups future AI compute models by prefix. |

Do not apply these renames casually. A rename must update:

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

## I/O Packages To Add Later

Add these as new packages when their contracts are needed:

```text
lo-io
lo-io-binary
lo-io-network
lo-io-storage
lo-io-optical
lo-io-photonic
```

Suggested meanings:

```text
lo-io-network    TCP, UDP, HTTP, TLS, QUIC and WebSocket data movement
lo-io-storage    files, SSD, NVMe, object storage and stream storage
lo-io-binary     binary data formats, binary parsing and binary streams
lo-io-optical    fibre and optical network I/O
lo-io-photonic   photonic interconnect, silicon photonics and optical compute I/O
```

These should not replace target packages.
