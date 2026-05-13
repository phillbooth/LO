# LO App Template

### LO, short for Logic Omni

```text
Designed to be backwards compatible with binary while supporting photonic Tri logic.

Easy to code and learn for Humans

AI friendly syntax and mapping
```

This repository is a starter workspace for building a bespoke application with
LO.

A strict, memory-safe, 
security-first programming
language concept for API-heavy, JSON-native, 
AI-readable and accelerator-aware
software. This workspace keeps the LO language package, compiler/runtime
contracts, secure application kernel, developer tooling and app source in clear
package boundaries while the project is still being shaped.

## Status

LO is currently a language-design and v0.1 beta prototype project. It is not a
stable release, and package versions use beta prerelease identifiers until the
toolchain, package boundaries and documentation contracts are release-ready.

The mature language introduction lives in:

```text
packages-lo/lo-core/README.md
```

The root of this repository is the workspace entry point. Use it to understand
how LO packages, app files, tooling, reports and generated project graph outputs
fit together.

The practical baseline is CPU-compatible checked execution and deterministic
developer tooling. GPU, generic AI accelerator, low-bit AI, optical I/O,
photonic compute, ternary and Omni-logic support are package contracts, planning
layers or simulation/report artefacts until real backends exist.

Generated notes, planning documents and AI-suggested structures are advisory.
When they conflict, the repository structure, `AGENTS.md`, `lo.workspace.json`,
package READMEs/TODOs and docs in this workspace take precedence. Roadmap
version labels may move when that improves staging, but package ownership rules
should not be overridden by generated documents.

## Core Ideas

LO is designed around:

```text
strict typing
explicit missing values
explicit errors
memory safety
security-first defaults
typed JSON and API contracts
source maps and machine-readable reports
AI-readable project context
CPU compatibility by default
optical I/O and data-movement awareness
optional accelerator planning
optional AI inference packages
```

LO avoids:

```text
undefined
silent null
truthy/falsy conditions
implicit type coercion
hidden exceptions as the default error model
raw pointers in normal code
compiled secrets
silent target fallback
framework-specific language syntax
mandatory future hardware
```

LO explicitly supports `optical_io` as a future data-movement and interconnect
planning target. Intel Silicon Photonics and OCI-style devices should be treated
as high-speed optical I/O for distributed compute, AI clusters, accelerator
communication and memory pooling, not as normal CPUs or a direct replacement for
photonic compute targets.

LO also supports `ai_accelerator` as a generic accelerator planning target.
Vendor devices such as Intel Gaudi 3 should be passive backend profiles selected
by config, adapter policy or capability detection. They should not become
permanent LO syntax such as `target gaudi`.

## Quick Start

From the repository root:

```powershell
cd C:\laragon\www\LO
```

Generate or refresh the project graph:

```powershell
node packages-lo\lo-core-cli\dist\index.js graph --out build\graph
```

Inspect task automation with a dry run:

```powershell
node packages-lo\lo-core-cli\dist\index.js task buildApi --file packages-lo\lo-core-tasks\examples\tasks.lo --dry-run
```

Run the package tests that currently have executable coverage:

```powershell
npm.cmd --prefix packages-lo\lo-devtools-project-graph test
npm.cmd --prefix packages-lo\lo-core-tasks test
npm.cmd --prefix packages-lo\lo-core-cli test
```

For the prototype LO core compiler, work from `packages-lo/lo-core/` and see that
package README for the supported commands.

## Project Structure

```text
LO-app/
|-- AGENTS.md
|-- package-lo.json          # proposed future LO package manifest
|-- lo.lock.json             # proposed future LO package lockfile
|-- docs/
|-- build/
|   `-- graph/
|-- packages/               # normal app/vendor package space
|-- packages-lo/
|   |-- lo-core/
|   |-- lo-core-compiler/
|   |-- lo-core-runtime/
|   |-- lo-core-security/
|   |-- lo-core-config/
|   |-- lo-core-reports/
|   |-- lo-core-logic/
|   |-- lo-core-vector/
|   |-- lo-core-compute/
|   |-- lo-ai/
|   |-- lo-ai-lowbit/
|   |-- lo-ai-agent/
|   |-- lo-ai-neural/
|   |-- lo-ai-neuromorphic/
|   |-- lo-core-photonic/
|   |-- lo-target-cpu/
|   |-- lo-cpu-kernels/
|   |-- lo-target-binary/
|   |-- lo-target-wasm/
|   |-- lo-target-gpu/
|   |-- lo-target-ai-accelerator/
|   |-- lo-target-photonic/
|   |-- lo-framework-app-kernel/
|   |-- lo-framework-api-server/
|   |-- lo-core-cli/
|   |-- lo-core-tasks/
|   |-- lo-tools-benchmark/
|   |-- lo-devtools-project-graph/
|   |-- lo-finance-core/
|   |-- lo-framework-example-app/
`-- tools/
```

## Package Map

- `packages-lo/lo-core/` - LO language rules, syntax, type system, prototype
  compiler notes, memory safety model, Structured Await, examples and core
  documentation.
- `packages-lo/lo-core-compiler/` - compiler pipeline contracts for lexer, parser, AST,
  checkers, IR, diagnostics, source maps and compiler reports.
- `packages-lo/lo-core-runtime/` - execution contracts for checked or compiled
  LO code, including Structured Await scopes, cancellation and timeout
  enforcement.
- `packages-lo/lo-core-security/` - reusable security primitives, redaction,
  permissions, crypto policy and security reports.
- `packages-lo/lo-core-config/` - project configuration, environment mode and production
  strictness contracts.
- `packages-lo/lo-core-reports/` - shared report schemas and report-writing
  contracts, including async/concurrency, storage and build-cache report shapes.
- `packages-lo/lo-core-logic/` - `Tri`, `Logic<N>`, Decision, RiskLevel and future Omni
  logic concepts.
- `packages-lo/lo-core-vector/` - vector, matrix, tensor, lane, dimension and numeric
  operation concepts.
- `packages-lo/lo-core-compute/` - compute planning, capabilities, effects, budgets and
  target selection.
- `packages-lo/lo-ai/` - generic AI inference contracts, model metadata, safety
  policy and AI reports.
- `packages-lo/lo-ai-lowbit/` - low-bit and ternary AI inference contracts, with
  BitNet represented as one optional backend rather than LO syntax.
- `packages-lo/lo-ai-agent/` - supervised AI agent, tool permission, task group,
  merge policy and agent report contracts.
- `packages-lo/lo-ai-neural/` - neural model, layer, inference and training boundary
  contracts.
- `packages-lo/lo-ai-neuromorphic/` - spike, event-signal and spiking model
  contracts.
- `packages-lo/lo-core-photonic/` - photonic and wavelength concepts, simulation and
  logic-to-light mapping contracts.
- `packages-lo/lo-target-cpu/` - CPU capability detection, threading, memory limits
  and fallback planning.
- `packages-lo/lo-cpu-kernels/` - optimized CPU kernel contracts for vector,
  matrix, low-bit and ternary workloads.
- `packages-lo/lo-target-binary/` - binary/native target planning and artefact
  metadata.
- `packages-lo/lo-target-wasm/` - WebAssembly target planning and module metadata.
- `packages-lo/lo-target-gpu/` - GPU target planning, kernel mapping and data
  movement reports.
- `packages-lo/lo-target-ai-accelerator/` - NPU, TPU, AI-chip and passive
  accelerator backend profile planning contracts.
- `packages-lo/lo-target-photonic/` - photonic backend target planning and
  optical I/O interconnect planning that uses `lo-core-photonic`.
- `packages-lo/lo-framework-app-kernel/` - optional secure application kernel for typed API
  boundaries, validation, auth, rate limits, jobs and runtime reports.
- `packages-lo/lo-framework-api-server/` - built-in HTTP API transport that delegates typed
  execution and policy decisions to `lo-framework-app-kernel`.
- `packages-lo/lo-core-cli/` - developer command tooling for graph, tasks, future check,
  build, run, serve, reports, routes and security commands.
- `packages-lo/lo-core-tasks/` - safe typed project automation with declared effects,
  permissions, dependency planning and reports.
- `packages-lo/lo-tools-benchmark/` - development diagnostics and benchmark contracts
  for logic, CPU/GPU/low-bit fallback, privacy-safe reports and comparisons.
- `packages-lo/lo-devtools-project-graph/` - project graph contracts and mapper for package,
  document, policy and report relationships.
- `packages-lo/lo-framework-example-app/` - bespoke application source, routes, modules, tests and app
  configuration.
- `packages-lo/lo-finance-core/` - grouped beta package area for finance maths,
  market data, FIX, audit, risk, pricing and desktop interoperability contracts.
- `docs/` - app/workspace requirements, architecture, security, deployment,
  decisions, changelog and operational documentation.

## Layering

```text
LO Core
  language, type system, effects, memory safety, Structured Await,
  storage-aware performance rules and core reports

LO Compiler / Runtime / Security / Config / Reports
  compiler pipeline, execution, shared security, configuration and report contracts

LO Logic / Vector / Compute / AI / Neural / Photonic / Target Packages
  specialised concepts and target planning outside the core language package

LO Secure App Kernel
  optional runtime layer for API validation, auth, rate limits, jobs and reports

LO API Server
  HTTP transport that normalises requests and calls the app kernel

LO CLI / Tasks / Project Graph
  developer tooling, safe automation, benchmarks and AI-readable project maps

LO Finance
  optional domain package contracts for finance maths, market data, FIX, audit,
  risk, pricing and financial desktop interoperability

Full Frameworks
  CMS, admin UI, page builders, ORMs, template engines and frontend adapters
```

Important boundary rules:

- `lo-core` defines the language. It must not become a web framework.
- `lo-framework-app-kernel` is an optional secure application boundary. It must not become
  a CMS, admin dashboard, ORM or frontend framework.
- `lo-framework-api-server` serves HTTP and delegates typed policy decisions.
- `lo-ai`, `lo-ai-agent`, `lo-ai-neural`, `lo-ai-neuromorphic` and `lo-ai-lowbit` are
  optional AI package layers, not core syntax.
- Parallel agents must be supervised, bounded, permissioned and reportable.
- BitNet is a backend option inside low-bit AI, not a language feature.
- AI accelerators, GPUs, optical I/O and photonic chipsets are optional targets.
  CPU and binary-compatible fallback remain the baseline.
- `ai_accelerator` is the public LO target category. Intel Gaudi and similar
  hardware are backend profiles selected by policy and reported after planning.
- `optical_io` means high-speed interconnect/data movement planning. It is not a
  claim that Intel Silicon Photonics or OCI devices are general-purpose CPUs.
- `lo-tools-benchmark` is development diagnostics. It must not auto-run in production
  and must report skipped targets and fallbacks without exposing private machine
  or project data.
- `lo-devtools-project-graph` explains the repository. It does not enforce compiler,
  runtime or security rules.
- Development-only packages should remain outside production package
  resolution. Use `lo-devtools-*` for development-only inspection, graph,
  scaffold and assistant-context packages, and `lo-tools-*` for broader
  diagnostics or benchmark utilities that may run in development or staging.
- Finance packages are domain packages. They must not become LO core syntax or
  imply that LO beta is ready to run live exchange, HFT, broker-dealer,
  clearing, settlement or custody systems.

## Package Layout Direction

The proposed long-term split is documented in `docs/PACKAGE_LAYOUT.md`:

```text
package.json       normal app/runtime ecosystem dependencies
package-lo.json    LO package manifest
lo.lock.json       deterministic LO package lockfile
packages/          normal app/vendor packages
packages-lo/       LO packages, optionally a nested repository
```

The current beta has moved LO packages under `packages-lo/`. `packages/` is now
reserved for normal app/vendor package space. `package-lo.json` and
`lo.lock.json` remain planned files; do not rely on them until the manifest,
lockfile and package resolver are implemented.

Package naming guidance lives in `docs/PACKAGE_NAMING.md`. Current packages use
family prefixes such as `lo-core-*`, `lo-ai-*`, `lo-target-*`,
`lo-framework-*`, `lo-devtools-*`, `lo-tools-*` and `lo-finance-*` so their
runtime, developer-tooling or domain role is visible from the directory name.

## Current Tooling

The currently implemented root-level CLI paths are:

```powershell
node packages-lo\lo-core-cli\dist\index.js graph --out build\graph
node packages-lo\lo-core-cli\dist\index.js graph query lo-core-security --out build\graph
node packages-lo\lo-core-cli\dist\index.js graph explain package:lo-core-security --out build\graph
node packages-lo\lo-core-cli\dist\index.js graph path package:lo-devtools-project-graph report:project-graph --out build\graph

node packages-lo\lo-core-cli\dist\index.js task --file packages-lo\lo-core-tasks\examples\tasks.lo
node packages-lo\lo-core-cli\dist\index.js task buildApi --file packages-lo\lo-core-tasks\examples\tasks.lo --dry-run
```

`lo benchmark` is registered as a future command placeholder. Benchmark modes,
report shapes and safety rules are documented in
`packages-lo/lo-tools-benchmark/README.md`; the runnable benchmark runner is still on
the package TODO list.

Once `lo-core-cli` is installed or linked, the intended shorthand is:

```powershell
lo graph --out build\graph
lo task buildApi --dry-run
```

## Project Graph

AI assistants and developers should use the generated project graph to inspect
package ownership and repository relationships:

```text
build/graph/lo-devtools-project-graph.json
build/graph/LO_GRAPH_REPORT.md
build/graph/lo-ai-map.md
build/graph/lo-devtools-project-graph.html
```

If the graph is missing or out of date, regenerate it from the repository root:

```powershell
node packages-lo\lo-core-cli\dist\index.js graph --out build\graph
```

The graph is navigation tooling only. It does not replace the compiler, tests,
security checks or package boundary rules.

## Task Automation

`lo-core-tasks` loads safe task definitions from `tasks.lo` files. Tasks declare
their dependencies, effects and permissions before anything runs.

Example:

```lo
task buildApi {
  depends [generateReports]
  effects [filesystem, compiler, reports]

  permissions {
    read "./src"
    write "./build"
  }
}
```

Current task execution supports loading, listing, dependency ordering, cycle
detection, dry-run planning, permission checks and task report generation.
Built-in operation execution is still future work.

Task reports are written by default to:

```text
build/reports/task-report.json
```

## Documentation Guide

- Use `packages-lo/lo-core/` for language documentation.
- Use package READMEs and TODOs for package-specific contracts and work.
- Use `docs/` for app/workspace requirements, architecture, security,
  deployment, decisions and changelog.
- Use `AGENTS.md` for AI coding tool instructions.
- Update `docs/CHANGELOG.md` when architecture, tooling, package contracts or
  behavior changes.

## Git Layout

Current development uses one root Git repository while package boundaries are
still being shaped.

The intended future split is:

```text
light-framework/
|-- .git
|-- packages/
|   `-- normal app/vendor packages
|-- packages-lo/
|   `-- .git
`-- app/framework files
```

Use that layout only when `packages-lo/` becomes a reusable LO package collection that
is imported by different frameworks.

Recommended implementation:

```text
light-framework/.git
packages-lo/.git
```

with `packages-lo/` added to the framework as an intentional Git submodule or
standalone nested repository. Do not create `packages-lo/.git` accidentally
inside the current app template, because the parent repository will not track
package contents in the normal way once `packages-lo/` is its own repository.
