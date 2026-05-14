# Architecture

## Overview

This workspace separates the LO language core from the bespoke app that uses it.
Language documentation, compiler notes, examples and schemas live in
`packages-lo/lo-core/`. Compiler pipeline contracts live in
`packages-lo/lo-core-compiler/`. Runtime execution contracts live in
`packages-lo/lo-core-runtime/`. Security primitives live in `packages-lo/lo-core-security/`.
Configuration and shared reports live in `packages-lo/lo-core-config/` and
`packages-lo/lo-core-reports/`. Multi-state logic concepts live in `packages-lo/lo-core-logic/`.
Vector concepts live in `packages-lo/lo-core-vector/`. Compute planning concepts live in
`packages-lo/lo-core-compute/`. Generic AI inference contracts live in
`packages-lo/lo-ai/`, and low-bit/ternary AI inference support lives in
`packages-lo/lo-ai-lowbit/`. Supervised AI agent contracts live in
`packages-lo/lo-ai-agent/`. Neural-network workload contracts live in
`packages-lo/lo-ai-neural/`, and neuromorphic spike/event contracts live in
`packages-lo/lo-ai-neuromorphic/`. BitNet is one optional backend for low-bit AI.
Photonic and wavelength concepts live in
`packages-lo/lo-core-photonic/`. CPU target planning lives in
`packages-lo/lo-target-cpu/`, optimized CPU kernel contracts live in
`packages-lo/lo-cpu-kernels/`, and binary/native target planning lives in
`packages-lo/lo-target-binary/`, WebAssembly target planning lives in
`packages-lo/lo-target-wasm/`, GPU target planning lives in
`packages-lo/lo-target-gpu/`, AI accelerator target planning lives in
`packages-lo/lo-target-ai-accelerator/` with passive backend profiles for devices
such as Intel Gaudi 3, and photonic target backend planning lives in
`packages-lo/lo-target-photonic/`, including optical I/O interconnect planning as a
data-movement target. The
optional Secure App Kernel design lives in `packages-lo/lo-framework-app-kernel/`. The
built-in HTTP API server package lives in `packages-lo/lo-framework-api-server/`. Developer command
tooling lives in `packages-lo/lo-core-cli/`, and safe project automation lives in
`packages-lo/lo-core-tasks/`. Development benchmark diagnostics live in
`packages-lo/lo-tools-benchmark/`. Project knowledge graph tooling lives in
`packages-lo/lo-devtools-project-graph/`. App source and build configuration live in
`packages-lo/lo-framework-example-app/`. Finance, electrical and
operational-technology package planning is archived outside the active
workspace under `C:\laragon\www\LO_Archive\packages-lo\` and is not part of the
v1 build graph. App planning and operational documentation live in `docs/`.
Development-only packages should use `lo-devtools-*` or
`lo-tools-*` names and must not be resolved by production applications by
default.

## V1 Surface Freeze

The v1 architecture is frozen around a small language surface:

```text
core syntax
core type system
Result / Option error and missing-value handling
the memory-safety model
CPU target support
WASM target support
compiler, runtime, security, config, reports, CLI and task tooling
```

Everything beyond CPU and WASM targets is post-v1 unless it directly specifies
core type-system semantics. AI, GPU, AI accelerator, photonic, optical I/O,
finance, electrical, OT and other domain-specific packages must not define the
v1 language surface. They may remain as archived or clearly labelled post-v1
planning only.

The v1 priority order is:

```text
1. Finalise syntax and grammar.
2. Commit to the memory model.
3. Define Bool, Tri, Decision, Option and Result semantics.
4. Write at least 20 real LO example programs.
5. Build a working parser for that subset.
6. Only then expand package targets or domain packages.
```

The working execution plan for these gates lives in
`docs/CORE_FOUNDATION_ROADMAP.md`.

The current compiler package includes an interim syntax safety scan for the
highest-risk v1 core cases while the real parser and checker are pending. It
flags direct Tri branch conditions, implicit Tri/Decision/Bool assignments,
non-exhaustive Tri matches, `unknown_as: true` in secure flows, raw secret-like
literals and unsafe dynamic execution calls. This scan is advisory compiler
infrastructure, not a substitute for the future AST-based checker.

## Main Structure

Current single-repository structure:

```text
LO-app/
|-- docs/
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
|   |-- lo-framework-example-app/
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
|   `-- lo-framework-example-app/
|-- app/
`-- framework files
```

In the current and future structure, `packages-lo/` is the reusable LO package repository that
can be imported by multiple frameworks. It should be mounted intentionally, for
example as a Git submodule or standalone nested repository. The framework root
remains its own repository. `packages/` is reserved for normal app/vendor
packages from the host ecosystem.

`lo-devtools-*` packages are development-only inspection and assistant-context
packages. `lo-tools-*` packages are broader diagnostics, benchmark or release
utilities that may run in development or staging. Neither family should be
required by production runtime installs.

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

`package.json` and NPM remain host ecosystem tooling only. In the current beta,
they may run JavaScript/TypeScript prototype checks, host adapter tests and
generated JS/TS interop packaging. They must not define the LO package graph,
runtime profiles, compiler target policy or production package overrides.
`lo-core-config` owns validation for this boundary so package resolution policy
does not leak into normal NPM manifests.

## Package Layers

```text
LO Core
  language/compiler/type system/effects/memory/compute

LO Compiler
  parser, checker pipeline, core syntax safety scan, IR, diagnostics, source
  maps and compiler reports

LO Runtime
  execution engine for compiled or checked LO code

LO Security
  SecureString helpers, fail-closed redaction, deny-precedence permission models
  and security report contracts

LO Config
  project configuration, environment modes and production policy loading

LO Reports
  shared report schemas and report-writing contracts

LO Logic
  Tri operations, explicit conversion policy, Logic<N> validation, Decision,
  RiskLevel, Omni logic and multi-state truth tables

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

LO Standard Packages
  HTTP adapters, SQL adapters, Redis queue, OpenAPI generator, JS/WASM generators

LO Full Frameworks
  web frameworks, CMS, admin UI, frontend adapters, ORM and template systems
```

The Secure App Kernel is a partial framework layer. It enforces safe runtime
boundaries, but it must not become a full Laravel, Django, React or WordPress
style framework.

`lo-framework-api-server` is the built-in HTTP transport package for API services. It
serves HTTP, loads route manifests, applies server-level limits and passes
normalised requests into `lo-framework-app-kernel`. It must not own auth decisions,
business logic, ORM design, CMS features or frontend rendering.

`lo-core-cli` is the developer command tool. It coordinates compiler, runtime, API
server and task packages, but it must not own application behaviour.

`lo-core-tasks` is the safe automation layer. It runs typed tasks with declared
effects and permissions. Raw shell is disabled by default and should only exist
later as explicit unsafe compatibility.

`lo-tools-benchmark` is developer diagnostics. It should test correctness,
predictability, target fallback and privacy-safe reporting across normal
machines, CPU-only systems, GPU systems and future accelerator targets. It must
not run automatically in production, and light mode must stay bounded so it is
safe for ordinary development machines.

`lo-devtools-project-graph` is developer tooling for architecture inspection and AI
assistant context. It may generate graph JSON, an HTML view, a graph report and
an AI map, but it must not become a source of truth for compiler validation,
runtime enforcement or security decisions.

Developer-only packages should be resolved through an explicit development
profile. Production lockfiles, runtime package manifests and application
deployments should not pull `lo-devtools-*` or development-only `lo-tools-*`
packages unless a maintainer opts into a development or staging mode.
Production boot/profile policy must additionally default-disable
`lo-tools-benchmark` and `lo-devtools-*`. If one is included in a production
build, `lo-core-config` should require an explicit production package override
with a reason and expose that override in the runtime handoff and reports.

Finance, electrical and OT packages are archived post-v2 domain planning. They
must not be part of active v1 package resolution, compiler targets or build
reports. Any future restoration must start with a new design review because
finance and OT/electrical domains carry regulatory, protocol correctness,
safety and cybersecurity requirements beyond the v1 language scope.

`lo-core-logic` owns logic semantics such as `Tri`, `Logic<N>` and Omni.
The first concrete logic contract provides deterministic Tri operations,
explicit Tri-to-Bool conversion policy, Logic<N> definition validation, state
bounds checks and truth-table diagnostics. This blocks common failure modes:
unknown values silently becoming true, malformed widths escaping into reports,
duplicate state names hiding policy errors and incomplete truth tables masking
unhandled states.
`lo-core-photonic` owns photonic concepts, representation models and simulation
vocabulary. Photonic mappings may consume logic states, but logic semantics stay
in `lo-core-logic`, and backend target planning stays in `lo-target-photonic`.

`lo-core-vector` owns vector, matrix and tensor value concepts. `lo-core-compute` owns
compute planning and target selection. `lo-ai` owns generic AI inference
contracts and safety policy. `lo-ai-agent` owns supervised AI agent definitions,
tool permissions, task groups, merge policies and reports. `lo-ai-neural` owns
neural-network model, layer, inference and training boundaries.
`lo-ai-neuromorphic` owns spike/event-driven model contracts. `lo-ai-lowbit` owns
low-bit and ternary model references, backend selection and CPU inference
plans. `lo-target-cpu` owns CPU capability and fallback planning, while
`lo-cpu-kernels` owns optimized CPU kernel contracts. `lo-target-binary`,
`lo-target-wasm`, `lo-target-gpu`, `lo-target-ai-accelerator` and
`lo-target-photonic` own target-specific planning for binary/native,
WebAssembly, GPU, AI accelerator, optical I/O and photonic backends.
`lo-tools-benchmark` may consume these packages to test target behavior, but target
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
photonic CPU target. `lo-core-compute` owns the `optical_io` target selection and
data-movement cost model, while `lo-target-photonic` owns optical I/O planning
reports, topology hints, fallback paths and transfer-format recommendations.
This lets LO optimize data locality, tensor streaming, schema-compressed
transfers, accelerator placement and remote memory safety without pretending
that optical I/O performs normal application computation.

Neural networks are typed compute workloads, not normal app syntax. LO can
define model, inference and training boundaries through `lo-ai-neural`, while
tensor shapes stay in `lo-core-vector` and target selection stays in `lo-core-compute`.
Parallel AI agents are supervised orchestration workloads, not uncontrolled
background processes. Agent control, tool permissions and merge policies belong
in `lo-ai-agent`; structured concurrency and cancellation belong in `lo-core-runtime`;
heavy inference or vector work should still go through `compute flow` and
`lo-core-compute`.
Low-bit AI is a CPU fallback path for AI inference, not a core language feature.
When a compute policy requests AI inference, LO can prefer AI accelerator, GPU
or NPU targets and fall back to `low_bit_ai` or CPU when the model, backend and
capability checks pass. BitNet may be selected as the backend today, but LO
source syntax should remain generic so future low-bit standards can replace it.
Target selection reports must record the selected backend, fallback reason,
token and memory limits, thread limit and warnings.

`lo-core-security` owns shared security primitives and report contracts. Runtime auth
and API policy enforcement remain in `lo-framework-app-kernel`. `lo-core-config` owns
configuration loading contracts, and `lo-core-reports` owns shared report shapes.
Reusable security decisions deny by default, matching deny grants take precedence
over matching allows and permissive default or wildcard models are diagnosed.
Redaction fails closed by default when input or rules cannot be trusted, so
reports do not leak raw secrets because a rule was malformed.

`lo-core-config` validates project configuration, resolves environment modes and
produces runtime handoff objects with structured diagnostics. It represents
environment variables by safe references only: names, required flags, secret
flags, scopes and optional non-secret defaults. Production strictness policy
checks and default-disabled production package checks belong here, while secret
protection and redaction remain in `lo-core-security`.

Controlled recovery belongs across language, runtime and report layers.
`lo-core` may describe resilient flow syntax direction, but `lo-core-runtime` owns
supervision, cancellation, retry scheduling and checkpoint/resume hooks.
`lo-core-reports` owns processing report shapes for partial success, retries,
quarantine and failure summaries. `lo-framework-app-kernel` should still prefer
transactions, rollback, idempotency and hold-for-review for security-sensitive
API workflows.

Structured Await belongs across the same boundaries. `lo-core` owns `await`,
`await all`, `await race`, `await stream`, queue-await syntax, effect checks and
compiler diagnostics. `lo-core-runtime` owns scheduling, scoped child tasks,
timeout enforcement, cancellation propagation, race policy and stream
backpressure. `lo-framework-app-kernel` owns request scopes, route limits,
queue/job handoff policy and audit events. `lo-core-reports` owns shared async
report shapes so compiler, runtime and kernel facts can be emitted consistently.
Normal LO developers should use Structured Await forms rather than direct
future/promise management.

Storage-aware performance is a tooling/runtime concern, not direct hardware
support. `lo-core` owns language rules for streaming large data, read-only
views, explicit clone/copy-on-write and conservative cache semantics.
`lo-core-compiler`, `lo-core-cli` and `lo-devtools-project-graph` may use
storage facts for incremental compilation, IDE indexes and project graph scans.
`lo-core-runtime` may use storage facts for bounded file I/O and safe temporary
storage. `lo-core-reports` owns storage and build-cache report shapes. Hardware
details may be unavailable, so every storage-aware optimization must have an
unknown-storage fallback and must not depend on cache correctness.

`lo-framework-app-kernel` should not be renamed to `lo-core-runtime`. A future `lo-core-runtime`
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
packages-lo/lo-framework-app-kernel/tests/
`-- hello-world.lo
```

The current smoke test runs through the LO core prototype:

```bash
npm.cmd --prefix packages-lo/lo-framework-app-kernel run test:hello
```
