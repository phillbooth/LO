# LO App Template

This repository is a starter template for building a bespoke application using LO.

The project is split into package areas:

- `packages/lo-core/` - the LO language package, compiler rules, syntax notes and examples.
- `packages/lo-compiler/` - compiler pipeline contracts for parser, checkers, IR, diagnostics and reports.
- `packages/lo-runtime/` - execution engine contracts for checked or compiled LO code.
- `packages/lo-security/` - reusable security primitives, redaction, permissions and security reports.
- `packages/lo-config/` - project configuration, environment mode and policy loading contracts.
- `packages/lo-reports/` - shared LO report schemas and report-writing contracts.
- `packages/lo-logic/` - LO multi-state logic concepts such as `Tri`, `Logic<N>` and future Omni logic.
- `packages/lo-vector/` - vector value, vector operation and vector report concepts.
- `packages/lo-compute/` - compute planning concepts shared across CPU, WASM, vector and hardware targets.
- `packages/lo-ai/` - generic AI inference contracts, model metadata, safety policy and reports.
- `packages/lo-bitnet/` - BitNet-style 1.58-bit and ternary AI inference contracts.
- `packages/lo-photonic/` - photonic and wavelength hardware concepts and mappings.
- `packages/lo-target-cpu/` - CPU target capability, fallback and execution planning contracts.
- `packages/lo-cpu-kernels/` - optimized CPU kernel contracts for low-bit, vector and matrix workloads.
- `packages/lo-target-binary/` - binary/native target planning and artefact metadata.
- `packages/lo-target-wasm/` - WebAssembly target planning and output contracts.
- `packages/lo-target-gpu/` - GPU target planning and output contracts.
- `packages/lo-target-photonic/` - photonic target backend planning that uses `lo-photonic`.
- `packages/lo-app-kernel/` - the optional secure runtime foundation for typed APIs, validation, auth, workload controls, jobs and reports.
- `packages/lo-api-server/` - the built-in HTTP API serving package for LO App Kernel.
- `packages/lo-cli/` - developer command tooling for checking, building, serving, reporting and task execution.
- `packages/lo-tasks/` - safe typed project automation and task execution.
- `packages/app/` - the bespoke application built with LO.
- `docs/` - app-specific planning, requirements, architecture and deployment notes.

## Project Structure

```text
LO-app/
|-- docs/
|-- packages/
|   |-- lo-core/
|   |-- lo-compiler/
|   |-- lo-runtime/
|   |-- lo-security/
|   |-- lo-config/
|   |-- lo-reports/
|   |-- lo-logic/
|   |-- lo-vector/
|   |-- lo-compute/
|   |-- lo-ai/
|   |-- lo-bitnet/
|   |-- lo-photonic/
|   |-- lo-target-cpu/
|   |-- lo-cpu-kernels/
|   |-- lo-target-binary/
|   |-- lo-target-wasm/
|   |-- lo-target-gpu/
|   |-- lo-target-photonic/
|   |-- lo-app-kernel/
|   |-- lo-api-server/
|   |-- lo-cli/
|   |-- lo-tasks/
|   `-- app/
`-- tools/
```

## Layering

```text
LO Core
  language, compiler, type system, effects, memory safety, compute planning

LO Compiler
  parser, checker pipeline, IR, diagnostics, source maps and compiler reports

LO Runtime
  execution engine for checked or compiled LO code, separate from the app kernel

LO Security
  SecureString helpers, redaction, permissions, diagnostics and security reports

LO Config and Reports
  project configuration, environment modes and shared report schemas

LO Logic
  Tri, Logic<N>, Decision, RiskLevel, Omni logic and multi-state truth tables

LO Vector
  vector values, dimensions, lanes, operations and vector reports

LO Compute
  compute planning, capabilities, effects, budgets and target selection

LO AI
  generic AI inference contracts, safety policy, memory estimates and reports

LO BitNet
  BitNet-style 1.58-bit / ternary model metadata and CPU inference plans

LO Photonic
  wavelength, phase, amplitude, optical channels and photonic target mapping

LO Target CPU and CPU Kernels
  CPU capability detection, fallback planning, SIMD, threading and low-bit kernels

LO Target Packages
  CPU, binary/native, WASM, GPU and photonic backend planning

LO Standard Library
  Json, Xml, SafeHtml, File, Stream, Request, Response, DateTime, Money, SecureString

LO Secure App Kernel
  optional runtime layer for APIs, routing, validation, auth, rate limits, jobs and reports

Full Frameworks
  CMS, admin UI, UI systems, templates, ORM, page builders and frontend adapters
```

## Git Layout

Current development uses one Git repository at the framework root:

```text
E:/projects/LO/.git
```

The intended future split is:

```text
light-framework/
|-- .git
|-- packages/
|   `-- .git
`-- app/framework files
```

Use that layout only when `packages/` becomes a reusable package collection that
is imported by different frameworks.

Recommended implementation:

```text
light-framework/.git
packages/.git
```

with `packages/` added to the framework as an intentional Git submodule or
standalone nested repository. Do not create `packages/.git` accidentally inside
the current app template, because the parent repository will not track package
contents in the normal way once `packages/` is its own repository.
