# Changelog

All notable changes to this app should be documented here.

## [Unreleased]

### Added

- Added `lo-core-logic` Tri helpers, explicit Tri-to-Bool conversion policy,
  Logic<N> definition validation, truth-table validation and contract tests.
- Added an initial `lo-core-compiler` core syntax safety scan for unsafe
  Tri/Decision/Bool conversions, non-exhaustive Tri matches, risky secure-flow
  unknown handling, raw secret literals and unsafe dynamic execution patterns.
- Added `lo-core-security` validation for redaction rules and permission models,
  including fail-closed malformed redaction handling, deny precedence and
  diagnostics for default-allow or wildcard-allow permissions.
- Added `lo-core-config` host package manifest boundary validation so
  `package.json` remains NPM/host tooling and LO package graph fields stay in
  future `package-lo.json`/`lo.lock.json` manifests.
- Documented the completed move of LO packages from `packages/` to
  `packages-lo/`, with `packages/` reserved for normal app/vendor package
  space.
- Added `docs/PACKAGE_NAMING.md` with naming prefix rules, staged rename
  candidates and future `lo-io-*` package guidance.
- Documented the current workspace as a beta prototype rather than a stable
  release.
- Documented repository-maintained structure as authoritative over generated
  document suggestions, while allowing roadmap version labels to move.
- Added `lo-devtools-*` and `lo-tools-*` naming for development-only, staging,
  diagnostic and experimental packages that production applications should not
  download by default.
- Added `docs/PACKAGE_LAYOUT.md` for the proposed `package-lo.json`,
  `lo.lock.json`, `packages/` and `packages-lo/` split.
- Added `docs/FINANCE_PACKAGES.md` and `packages-lo/lo-finance-core/` as a grouped
  beta finance package area covering finance maths, market data, FIX, audit,
  risk, pricing and desktop interoperability boundaries.
- Added `packages-lo/lo-core/docs/lo-vs-fsharp.md` to position LO honestly against
  F# as a beta, security-first, AI-readable and target-aware backend language
  concept rather than a production .NET competitor.
- Initial documentation structure.
- Added `packages-lo/lo-framework-app-kernel/` as the optional partial framework
  layer for secure runtime boundaries.
- Added a checked Run Mode hello-world test fixture for the app kernel package.
- Added the LO logic, compute type and secure runtime future-support proposal.
- Removed active legacy extension warning comments from LO core documentation.
- Added `packages-lo/lo-framework-api-server/` documentation as the built-in HTTP API
  serving layer for LO App Kernel.
- Added `packages-lo/lo-core-cli/` as the LO developer command-line package scaffold.
- Added `packages-lo/lo-core-tasks/` as the safe typed project automation package
  scaffold.
- Added `packages-lo/lo-core-logic/` for `Tri`, `Logic<N>` and future Omni logic.
- Added `packages-lo/lo-core-photonic/` for photonic and wavelength hardware concepts.
- Added `packages-lo/lo-core-vector/` for vector value, lane and operation concepts.
- Added `packages-lo/lo-core-compute/` for compute planning and target selection
  concepts.
- Added `packages-lo/lo-target-binary/` for binary/native target planning.
- Added `packages-lo/lo-target-wasm/` for WebAssembly target planning.
- Added `packages-lo/lo-target-gpu/` for GPU target planning.
- Added `packages-lo/lo-target-photonic/` for photonic backend target planning.
- Added `packages-lo/lo-core-compiler/` for compiler pipeline contracts.
- Added `packages-lo/lo-core-runtime/` for checked and compiled execution contracts.
- Added `packages-lo/lo-core-security/` for reusable security primitives and report
  contracts.
- Added `packages-lo/lo-core-config/` for project configuration and environment mode
  contracts.
- Added `packages-lo/lo-core-reports/` for shared report schemas and report-writing
  contracts.
- Added TODO documents for `packages-lo/lo-framework-api-server/` and
  `packages-lo/lo-framework-app-kernel/`.
- Added README and TODO documents for `packages-lo/lo-framework-example-app/`.
- Added CLI and task runner requirements in
  `packages-lo/lo-core-cli-and-lo-core-tasks-requirements.md`.
- Added `lo-core-config` project config parsing, environment mode loading,
  production strictness policy, safe environment variable references, runtime
  handoff contracts, examples and tests.
- Added `lo-core-reports` shared report metadata, diagnostic summaries, build,
  security, target, runtime, task and AI guide report contracts with examples
  and tests.
- Added `lo-core-security` SecureString references, redaction helpers, permission
  decisions, safe token/cookie/header references, crypto policy validation,
  security reports, examples and tests.
- Added `packages-lo/lo-ai/` for generic AI inference contracts, safety policy and
  AI inference reports.
- Added `packages-lo/lo-ai-lowbit/` for low-bit and ternary AI inference contracts,
  with BitNet represented as an optional backend.
- Added `packages-lo/lo-target-cpu/` for CPU capability, fallback and execution
  planning contracts.
- Added `packages-lo/lo-cpu-kernels/` for optimized CPU kernel contracts.
- Added a low-bit AI backend architecture note.
- Added `packages-lo/lo-devtools-project-graph/` for project knowledge graph contracts,
  graph scan policy, output manifests and AI assistant map support.
- Added local `node packages-lo\lo-core-cli\dist\index.js graph --out build\graph`
  run instructions for project graph generation.
- Added AI-facing instructions to consult and regenerate `build\graph` project
  graph outputs when graph data is missing or stale.
- Added `lo task` CLI integration for loading `tasks.lo`, listing tasks,
  resolving dependency order and running dry-run task plans.
- Added `lo-core-tasks` task file parsing, dependency resolution, cycle detection
  and tests.
- Added task run report generation for `lo task`, writing
  `build/reports/task-report.json` by default with `--report-out` and
  `--no-report` controls.
- Added `lo-core-tasks` filesystem and environment permission validation, including
  safe relative path checks and explicit environment variable permissions.
- Expanded the root `README.md` into a full workspace introduction covering LO
  status, core goals, package boundaries, current tooling, project graph and
  task automation.
- Reworked `docs/REQUIREMENTS.md` from app placeholders into complete
  template, package boundary, tooling, security and success requirements.
- Reworked `docs/DESIGN.md` from generic UI placeholders into a template and
  developer-experience design guide for docs, tooling, reports and future app
  UX boundaries.
- Added `packages-lo/lo-ai-neural/` for neural model, layer, inference and training
  boundary contracts.
- Added `packages-lo/lo-ai-neuromorphic/` for spike, event-signal and spiking model
  contracts.
- Added `packages-lo/lo-target-ai-accelerator/` for NPU, TPU and AI-chip target
  planning contracts.
- Added `docs/NEURAL_ACCELERATOR_PACKAGES.md` to document neural,
  neuromorphic, low-bit, AI accelerator and photonic package boundaries.
- Expanded `lo-core-vector` with matrix, tensor, shape and numeric element contract
  placeholders.
- Added `packages-lo/lo-ai-agent/` for supervised AI agent, tool permission, task
  group, merge policy and report contracts.
- Added `packages-lo/lo-ai-agent-parallel-compute.md` documenting parallel AI agents,
  CPU/GPU compute separation, supervised task groups, target fallback and agent
  safety rules.
- Added `docs/RESILIENT_FLOWS.md` documenting controlled recovery, resilient
  flows, retries, quarantine, checkpoints, memory/system failure policy and
  partial success reporting.
- Added `lo-core-reports` processing report contracts for resilient/batch flows.
- Added `packages-lo/lo-tools-benchmark/` for LO benchmark and diagnostics contracts,
  including light/full modes, target fallback checks, privacy-safe reports and
  optional future sharing payloads.
- Added a placeholder `lo benchmark` CLI command entry for the future benchmark
  runner.
- Added `docs/RUST_FINANCIAL_MARKETS.md` covering Rust's role in financial
  market systems and the related design lessons for LO.
- Added `docs/OPTICAL_IO.md` documenting `optical_io` as a high-speed
  interconnect/data-movement target for Intel Silicon Photonics and OCI-style
  systems, distinct from photonic compute.
- Added `docs/AI_ACCELERATOR_TARGETS.md` documenting passive AI accelerator
  target profiles, with Intel Gaudi 3 represented as a backend profile rather
  than LO syntax.
- Added LO Structured Await documentation across core language, runtime,
  app-kernel and workspace docs, covering `await all`, `await race`, scoped
  cancellation, mandatory timeout policy, stream backpressure, queue handoff and
  async/concurrency reports.
- Added typed async/concurrency report contracts to `lo-core-reports`.
- Added conservative storage-aware performance documentation covering SSD/NVMe/M.2
  wording, unknown-storage fallback, incremental build/IDE index planning,
  streaming large files, read-only mapping, cache bypass and cache safety rules.
- Added typed storage and build-cache report contracts to `lo-core-reports`.
- Added production boot/profile rules that default-disable benchmark and
  development-only packages such as `lo-tools-benchmark` and `lo-devtools-*`,
  with explicit reported production package overrides required when policy
  allows them.
- Added `docs/ELECTRICAL_INFRASTRUCTURE.md`, `packages-lo/lo-electrical-core/`
  and `packages-lo/lo-ot-core/` for electrical infrastructure and
  operational-technology package planning, with explicit safety boundaries
  against replacing certified protection equipment, PLC safety systems, SCADA
  products or qualified electrical engineering judgement.
- Added an explicit v1 surface freeze around core syntax, core type-system
  semantics, the memory-safety model, CPU target support and WASM target support.
- Added `docs/CORE_FOUNDATION_ROADMAP.md` to sequence foundation work before
  package, domain or advanced-target expansion.

### Changed

- Renamed the generic `packages-lo/app/` folder to
  `packages-lo/lo-framework-example-app/` so the package collection does not contain an
  ambiguous `app` package name.
- Updated workspace documentation and configuration to use `packages-lo/lo-core/`
  for the LO language package.
- Renamed the legacy language install script to `install-lo.sh`.
- Clarified that LO core is the language/compiler layer, while the Secure App
  Kernel is the optional runtime layer and full frameworks remain separate.
- Clarified that `lo-framework-api-server` serves HTTP and delegates validation, auth and
  typed execution to `lo-framework-app-kernel`.
- Documented the future split-repository layout where `packages-lo/` can become
  its own reusable Git repository imported by multiple frameworks.
- Added simple `console.log("...")` output support to LO core checked Run Mode.
- Expanded `lo-core-compute` target selection contracts with `low_bit_ai`,
  `cpu.generic`, AI inference workload planning and compute-auto selection
  reporting.
- Clarified that BitNet ternary model weights are separate from LO `Tri`
  semantics.
- Reworked low-bit AI target naming so LO source uses generic `low_bit_ai` and
  `ternary_ai` targets instead of backend-specific BitNet syntax.
- Completed initial `lo-ai`, `lo-ai-lowbit`, `lo-target-cpu` and
  `lo-cpu-kernels` contracts with validation helpers, examples and tests.
- Completed initial `lo-core-compute` offload planning reports, low-bit AI fallback
  example and test coverage.
- Added a placeholder `lo graph` CLI command entry for future project graph
  generation and querying.
- Implemented the initial `lo graph` command to generate project graph JSON and
  a Markdown graph report from `lo.workspace.json`.
- Clarified that project graph syntax and CLI commands are backend-neutral, with
  Graphify treated as an optional swappable backend rather than LO syntax.
- Expanded `lo-devtools-project-graph` with a LO-native workspace scanner that maps
  packages, documents, exported TypeScript contracts, package references and
  generated graph report outputs.
- Added graph query, explain and path helpers to `lo-devtools-project-graph` and exposed
  them through `lo graph query`, `lo graph explain` and `lo graph path`.
- Updated workspace package mapping so `lo-tools-benchmark` is tracked by the project
  graph and package registry.
- Added `optical_io` to compute, benchmark and photonic target planning
  contracts as an interconnect-aware data movement target.
- Added generic `ai_accelerator` planning support and an Intel Gaudi 3 backend
  profile to AI accelerator, compute and benchmark contracts.
- Narrowed the active workspace target list to `cpu` and `wasm`, with GPU, AI
  accelerator, photonic, optical I/O, low-bit AI and other advanced target work
  labelled post-v1 unless needed by core type-system semantics.
- Clarified that LO must not make measured speed claims over C#, Python, C or
  C++ until the compiler, memory model and benchmark methodology exist.
- Defined AI-readable as concrete syntax/tooling properties: regular grammar,
  explicit effects/imports, typed errors, source maps, stable diagnostics and
  machine-readable reports.

### Removed

- Removed stale generated-output-only duplicate package folders
  `packages-lo/lo-cli/`, `packages-lo/lo-compute/` and
  `packages-lo/lo-config/` after confirming the canonical `lo-core-*` packages
  contain the current source, tests, manifests and newer contracts.
- Moved `packages-lo/lo-finance-core/`, `packages-lo/lo-electrical-core/` and
  `packages-lo/lo-ot-core/` to `C:\laragon\www\LO_Archive\packages-lo\` and
  removed them from active workspace package resolution.

### Fixed

- Nothing yet.
