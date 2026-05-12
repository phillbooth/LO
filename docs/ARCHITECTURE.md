# Architecture

## Overview

This workspace separates the LO language core from the bespoke app that uses it.
Language documentation, compiler notes, examples and schemas live in
`packages-lo/lo-core/`. Compiler pipeline contracts live in
`packages-lo/lo-compiler/`. Runtime execution contracts live in
`packages-lo/lo-runtime/`. Security primitives live in `packages-lo/lo-security/`.
Configuration and shared reports live in `packages-lo/lo-config/` and
`packages-lo/lo-reports/`. Multi-state logic concepts live in `packages-lo/lo-logic/`.
Vector concepts live in `packages-lo/lo-vector/`. Compute planning concepts live in
`packages-lo/lo-compute/`. Generic AI inference contracts live in
`packages-lo/lo-ai/`, and low-bit/ternary AI inference support lives in
`packages-lo/lo-lowbit-ai/`. Supervised AI agent contracts live in
`packages-lo/lo-agent/`. Neural-network workload contracts live in
`packages-lo/lo-neural/`, and neuromorphic spike/event contracts live in
`packages-lo/lo-neuromorphic/`. BitNet is one optional backend for low-bit AI.
Photonic and wavelength concepts live in
`packages-lo/lo-photonic/`. CPU target planning lives in
`packages-lo/lo-target-cpu/`, optimized CPU kernel contracts live in
`packages-lo/lo-cpu-kernels/`, and binary/native target planning lives in
`packages-lo/lo-target-binary/`, WebAssembly target planning lives in
`packages-lo/lo-target-wasm/`, GPU target planning lives in
`packages-lo/lo-target-gpu/`, AI accelerator target planning lives in
`packages-lo/lo-target-ai-accelerator/` with passive backend profiles for devices
such as Intel Gaudi 3, and photonic target backend planning lives in
`packages-lo/lo-target-photonic/`, including optical I/O interconnect planning as a
data-movement target. The
optional Secure App Kernel design lives in `packages-lo/lo-app-kernel/`. The
built-in HTTP API server package lives in `packages-lo/lo-api-server/`. Developer command
tooling lives in `packages-lo/lo-cli/`, and safe project automation lives in
`packages-lo/lo-tasks/`. Development benchmark diagnostics live in
`packages-lo/lo-benchmark/`. Project knowledge graph tooling lives in
`packages-lo/lo-project-graph/`. App source and build configuration live in
`packages-lo/lo-example-app/`. Beta finance package planning lives in
`packages-lo/lo-finance/`. App planning and operational documentation live in `docs/`. A
future development-only package collection may live outside the production
package tree as `packages-lo/lo-developer/`; it should be used for staging,
experiments, diagnostics and generators that production applications should not
download by default.

## Main Structure

Current single-repository structure:

```text
LO-app/
|-- docs/
|-- packages/               # normal app/vendor package space
|-- packages-lo/
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
|   |-- lo-lowbit-ai/
|   |-- lo-agent/
|   |-- lo-neural/
|   |-- lo-neuromorphic/
|   |-- lo-photonic/
|   |-- lo-target-cpu/
|   |-- lo-cpu-kernels/
|   |-- lo-target-binary/
|   |-- lo-target-wasm/
|   |-- lo-target-gpu/
|   |-- lo-target-ai-accelerator/
|   |-- lo-target-photonic/
|   |-- lo-app-kernel/
|   |-- lo-api-server/
|   |-- lo-cli/
|   |-- lo-tasks/
|   |-- lo-benchmark/
|   |-- lo-project-graph/
|   |-- lo-finance/
|   |-- lo-example-app/
|   `-- lo-developer/
`-- tools/
```

Future split-repository structure:

```text
light-framework/
|-- .git
|-- packages/
|   `-- normal app/vendor packages
|-- packages-lo/
|   |-- .git
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
|   |-- lo-lowbit-ai/
|   |-- lo-agent/
|   |-- lo-neural/
|   |-- lo-neuromorphic/
|   |-- lo-photonic/
|   |-- lo-target-cpu/
|   |-- lo-cpu-kernels/
|   |-- lo-target-binary/
|   |-- lo-target-wasm/
|   |-- lo-target-gpu/
|   |-- lo-target-ai-accelerator/
|   |-- lo-target-photonic/
|   |-- lo-app-kernel/
|   |-- lo-api-server/
|   |-- lo-cli/
|   |-- lo-tasks/
|   |-- lo-benchmark/
|   |-- lo-project-graph/
|   |-- lo-finance/
|   `-- lo-example-app/
|-- app/
`-- framework files
```

In the current and future structure, `packages-lo/` is the reusable LO package repository that
can be imported by multiple frameworks. It should be mounted intentionally, for
example as a Git submodule or standalone nested repository. The framework root
remains its own repository. `packages/` is reserved for normal app/vendor
packages from the host ecosystem.

`packages-lo/lo-developer/` is a proposed separate developer-package repository
or optional mount. It must not be required by production runtime installs. It
may contain staging packages, experiments, development diagnostics, benchmark
helpers, generators and migration tools after the package registry supports
production and development package classes.

The proposed long-term application layout separates host ecosystem dependencies
from LO dependencies:

```text
package.json
package-lo.json
lo.lock.json
packages/
packages-lo/
```

`package-lo.json` should describe selected LO packages and profiles.
`lo.lock.json` should lock versions, source refs, checksums and profile
selection. This is a planned package-management boundary; current beta tooling
does not yet resolve LO packages from those files.

## Package Layers

```text
LO Core
  language/compiler/type system/effects/memory/compute

LO Compiler
  parser, checker pipeline, IR, diagnostics, source maps and compiler reports

LO Runtime
  execution engine for compiled or checked LO code

LO Security
  SecureString helpers, redaction, permission models and security report contracts

LO Config
  project configuration, environment modes and production policy loading

LO Reports
  shared report schemas and report-writing contracts

LO Logic
  Tri, Logic<N>, Decision, RiskLevel, Omni logic and multi-state truth tables

LO Vector
  vector values, dimensions, lanes, operations and vector reports

LO Compute
  compute planning, capabilities, budgets, effects and target selection

LO AI
  target-neutral AI inference, model metadata, safety policy and reports

LO Low-Bit AI
  low-bit / ternary model references, backend selection and CPU inference plans

LO Agent
  supervised AI agent definitions, tool permissions, task groups and reports

LO Neural
  neural models, layers, inference and training boundary contracts

LO Neuromorphic
  spike trains, event signals and spiking model contracts

LO Photonic
  wavelength, phase, amplitude, optical channels and logic-to-light mapping

LO Target CPU
  CPU capabilities, SIMD features, memory limits, threading and fallback reports

LO CPU Kernels
  GEMM, GEMV, vector, matrix, low-bit and ternary CPU kernel contracts

LO Target Binary
  binary/native target planning, platform triples, ABI constraints and artefacts

LO Target WASM
  WebAssembly target planning, module metadata and import/export contracts

LO Target GPU
  GPU target planning, kernel mapping, precision and data movement reports

LO Target AI Accelerator
  NPU, TPU, AI-chip and passive backend profiles, precision and operation plans

LO Target Photonic
  photonic backend target plans and optical I/O interconnect planning

LO Secure App Kernel
  request lifecycle, validation, security, auth, rate limits, jobs and reports

LO API Server
  HTTP listening, request normalisation, route manifest loading, safe responses

LO CLI
  developer commands for check, build, run, serve, reports, routes and tasks

LO Tasks
  safe typed project automation with declared effects and permissions

LO Benchmark
  development diagnostics for logic, CPU, GPU, low-bit fallback and safe reports

LO Project Graph
  project graph maps for packages, docs, policies, reports and AI assistance

LO Developer Packages
  optional staging, diagnostics, generators and experiments outside production
  install paths

LO Finance
  finance maths, market data, FIX, audit, compliance, risk, pricing and FDC3
  package contracts

LO Standard Packages
  HTTP adapters, SQL adapters, Redis queue, OpenAPI generator, JS/WASM generators

LO Full Frameworks
  web frameworks, CMS, admin UI, frontend adapters, ORM and template systems
```

The Secure App Kernel is a partial framework layer. It enforces safe runtime
boundaries, but it must not become a full Laravel, Django, React or WordPress
style framework.

`lo-api-server` is the built-in HTTP transport package for API services. It
serves HTTP, loads route manifests, applies server-level limits and passes
normalised requests into `lo-app-kernel`. It must not own auth decisions,
business logic, ORM design, CMS features or frontend rendering.

`lo-cli` is the developer command tool. It coordinates compiler, runtime, API
server and task packages, but it must not own application behaviour.

`lo-tasks` is the safe automation layer. It runs typed tasks with declared
effects and permissions. Raw shell is disabled by default and should only exist
later as explicit unsafe compatibility.

`lo-benchmark` is developer diagnostics. It should test correctness,
predictability, target fallback and privacy-safe reporting across normal
machines, CPU-only systems, GPU systems and future accelerator targets. It must
not run automatically in production, and light mode must stay bounded so it is
safe for ordinary development machines.

`lo-project-graph` is developer tooling for architecture inspection and AI
assistant context. It may generate graph JSON, an HTML view, a graph report and
an AI map, but it must not become a source of truth for compiler validation,
runtime enforcement or security decisions.

Developer-only packages should be resolved through an explicit development
profile. Production lockfiles, runtime package manifests and application
deployments should not pull `packages-lo/lo-developer/` unless a maintainer
opts into a development or staging mode.

`lo-finance` is a domain package group. Early work should define deterministic
finance maths, market-data types, FIX integration contracts, audit evidence,
calendar/session rules and risk/pricing boundaries. It must not make LO a live
exchange engine, HFT engine, broker-dealer platform, settlement system,
clearing system or custody platform.

`lo-logic` owns logic semantics such as `Tri`, `Logic<N>` and Omni. `lo-photonic`
owns photonic representation and target planning. Photonic mappings may consume
logic states, but logic semantics stay in `lo-logic`.

`lo-vector` owns vector, matrix and tensor value concepts. `lo-compute` owns
compute planning and target selection. `lo-ai` owns generic AI inference
contracts and safety policy. `lo-agent` owns supervised AI agent definitions,
tool permissions, task groups, merge policies and reports. `lo-neural` owns
neural-network model, layer, inference and training boundaries.
`lo-neuromorphic` owns spike/event-driven model contracts. `lo-lowbit-ai` owns
low-bit and ternary model references, backend selection and CPU inference
plans. `lo-target-cpu` owns CPU capability and fallback planning, while
`lo-cpu-kernels` owns optimized CPU kernel contracts. `lo-target-binary`,
`lo-target-wasm`, `lo-target-gpu`, `lo-target-ai-accelerator` and
`lo-target-photonic` own target-specific planning for binary/native,
WebAssembly, GPU, AI accelerator, optical I/O and photonic backends.
`lo-benchmark` may consume these packages to test target behavior, but target
capability semantics stay in the target packages.

AI accelerator support is passive and vendor-neutral. LO source should prefer
`ai_accelerator`; concrete devices such as Intel Gaudi 3 are backend profiles in
`lo-target-ai-accelerator`, selected by config, adapter policy or capability
detection. The first practical integration path should use controlled adapters
over existing AI frameworks rather than a native LO compiler backend. Reports
should record backend profile, framework adapter, precision, memory tier,
topology and fallback.

Optical I/O is different from photonic compute. LO should model Intel Silicon
Photonics and OCI-style devices as high-bandwidth interconnects for moving data
between CPUs, GPUs, accelerators, memory pools and storage. They are not a
photonic CPU target. `lo-compute` owns the `optical_io` target selection and
data-movement cost model, while `lo-target-photonic` owns optical I/O planning
reports, topology hints, fallback paths and transfer-format recommendations.
This lets LO optimize data locality, tensor streaming, schema-compressed
transfers, accelerator placement and remote memory safety without pretending
that optical I/O performs normal application computation.

Neural networks are typed compute workloads, not normal app syntax. LO can
define model, inference and training boundaries through `lo-neural`, while
tensor shapes stay in `lo-vector` and target selection stays in `lo-compute`.
Parallel AI agents are supervised orchestration workloads, not uncontrolled
background processes. Agent control, tool permissions and merge policies belong
in `lo-agent`; structured concurrency and cancellation belong in `lo-runtime`;
heavy inference or vector work should still go through `compute flow` and
`lo-compute`.
Low-bit AI is a CPU fallback path for AI inference, not a core language feature.
When a compute policy requests AI inference, LO can prefer AI accelerator, GPU
or NPU targets and fall back to `low_bit_ai` or CPU when the model, backend and
capability checks pass. BitNet may be selected as the backend today, but LO
source syntax should remain generic so future low-bit standards can replace it.
Target selection reports must record the selected backend, fallback reason,
token and memory limits, thread limit and warnings.

`lo-security` owns shared security primitives and report contracts. Runtime auth
and API policy enforcement remain in `lo-app-kernel`. `lo-config` owns
configuration loading contracts, and `lo-reports` owns shared report shapes.

`lo-config` validates project configuration, resolves environment modes and
produces runtime handoff objects with structured diagnostics. It represents
environment variables by safe references only: names, required flags, secret
flags, scopes and optional non-secret defaults. Production strictness policy
checks belong here, while secret protection and redaction remain in
`lo-security`.

Controlled recovery belongs across language, runtime and report layers.
`lo-core` may describe resilient flow syntax direction, but `lo-runtime` owns
supervision, cancellation, retry scheduling and checkpoint/resume hooks.
`lo-reports` owns processing report shapes for partial success, retries,
quarantine and failure summaries. `lo-app-kernel` should still prefer
transactions, rollback, idempotency and hold-for-review for security-sensitive
API workflows.

`lo-app-kernel` should not be renamed to `lo-runtime`. A future `lo-runtime`
package should execute compiled or checked LO code. The app kernel should
remain the secure application/API boundary that controls validation, auth,
idempotency, limits, jobs and runtime reports.

## Repository Boundaries

The current template keeps all files in one root Git repository while the
package boundaries are still being shaped.

Later, split reusable LO packages into their own `packages-lo/` repository:

```text
light-framework/.git
light-framework/packages-lo/.git
```

This is appropriate when the same packages need to be imported into different
framework repositories. At that point, the root framework repository should
treat `packages-lo/` as an external dependency, not as ordinary tracked child
files.

## Checked Run Smoke Tests

The framework layer can be exercised without compiling by running LO core
checked Run Mode against `.lo` test fixtures.

```text
packages-lo/lo-app-kernel/tests/
`-- hello-world.lo
```

The current smoke test runs through the LO core prototype:

```bash
npm.cmd --prefix packages-lo/lo-app-kernel run test:hello
```
