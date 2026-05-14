# Changelog

All notable changes to this app should be documented here.

## [Unreleased]

### Added

- Added `logicn-core-logic` Tri helpers, explicit Tri-to-Bool conversion policy,
  LogicN definition validation, truth-table validation and contract tests.
- Added an initial `logicn-core-compiler` core syntax safety scan for unsafe
  Tri/Decision/Bool conversions, non-exhaustive Tri matches, risky secure-flow
  unknown handling, raw secret literals and unsafe dynamic execution patterns.
- Added `logicn-core-security` validation for redaction rules and permission models,
  including fail-closed malformed redaction handling, deny precedence and
  diagnostics for default-allow or wildcard-allow permissions.
- Added `logicn-core-config` host package manifest boundary validation so
  `package.json` remains NPM/host tooling and LogicN package graph fields stay in
  future `package-logicn.json`/`logicn.lock.json` manifests.
- Documented the completed move of LogicN packages from `packages/` to
  `packages-logicn/`, with `packages/` reserved for normal app/vendor package
  space.
- Added `docs/PACKAGE_NAMING.md` with naming prefix rules, staged rename
  candidates and future `logicn-io-*` package guidance.
- Documented the current workspace as a beta prototype rather than a stable
  release.
- Documented repository-maintained structure as authoritative over generated
  document suggestions, while allowing roadmap version labels to move.
- Added `logicn-devtools-*` and `logicn-tools-*` naming for development-only, staging,
  diagnostic and experimental packages that production applications should not
  download by default.
- Added `docs/PACKAGE_LAYOUT.md` for the proposed `package-logicn.json`,
  `logicn.lock.json`, `packages/` and `packages-logicn/` split.
- Added `docs/FINANCE_PACKAGES.md` and `packages-logicn/logicn-finance-core/` as a grouped
  beta finance package area covering finance maths, market data, FIX, audit,
  risk, pricing and desktop interoperability boundaries.
- Added `packages-logicn/logicn-core/docs/logicn-vs-fsharp.md` to position LogicN honestly against
  F# as a beta, security-first, AI-readable and target-aware backend language
  concept rather than a production .NET competitor.
- Initial documentation structure.
- Added `packages-logicn/logicn-framework-app-kernel/` as the optional partial framework
  layer for secure runtime boundaries.
- Added a checked Run Mode hello-world test fixture for the app kernel package.
- Added the LogicN logic, compute type and secure runtime future-support proposal.
- Removed active legacy extension warning comments from LogicN core documentation.
- Added `packages-logicn/logicn-framework-api-server/` documentation as the built-in HTTP API
  serving layer for LogicN App Kernel.
- Added `packages-logicn/logicn-core-cli/` as the LogicN developer command-line package scaffold.
- Added `packages-logicn/logicn-core-tasks/` as the safe typed project automation package
  scaffold.
- Added `packages-logicn/logicn-core-logic/` for `Tri`, `LogicN` and future Omni logic.
- Added `packages-logicn/logicn-core-photonic/` for photonic and wavelength hardware concepts.
- Added `packages-logicn/logicn-core-vector/` for vector value, lane and operation concepts.
- Added `packages-logicn/logicn-core-compute/` for compute planning and target selection
  concepts.
- Added `packages-logicn/logicn-target-binary/` for binary/native target planning.
- Added `packages-logicn/logicn-target-wasm/` for WebAssembly target planning.
- Added `packages-logicn/logicn-target-gpu/` for GPU target planning.
- Added `packages-logicn/logicn-target-photonic/` for photonic backend target planning.
- Added `packages-logicn/logicn-core-compiler/` for compiler pipeline contracts.
- Added `packages-logicn/logicn-core-runtime/` for checked and compiled execution contracts.
- Added `packages-logicn/logicn-core-security/` for reusable security primitives and report
  contracts.
- Added `packages-logicn/logicn-core-config/` for project configuration and environment mode
  contracts.
- Added `packages-logicn/logicn-core-reports/` for shared report schemas and report-writing
  contracts.
- Added TODO documents for `packages-logicn/logicn-framework-api-server/` and
  `packages-logicn/logicn-framework-app-kernel/`.
- Added README and TODO documents for `packages-logicn/logicn-framework-example-app/`.
- Added CLI and task runner requirements in
  `packages-logicn/logicn-core-cli-and-logicn-core-tasks-requirements.md`.
- Added `logicn-core-config` project config parsing, environment mode loading,
  production strictness policy, safe environment variable references, runtime
  handoff contracts, examples and tests.
- Added `logicn-core-reports` shared report metadata, diagnostic summaries, build,
  security, target, runtime, task and AI guide report contracts with examples
  and tests.
- Added `logicn-core-security` SecureString references, redaction helpers, permission
  decisions, safe token/cookie/header references, crypto policy validation,
  security reports, examples and tests.
- Added `packages-logicn/logicn-ai/` for generic AI inference contracts, safety policy and
  AI inference reports.
- Added `packages-logicn/logicn-ai-lowbit/` for low-bit and ternary AI inference contracts,
  with BitNet represented as an optional backend.
- Added `packages-logicn/logicn-target-cpu/` for CPU capability, fallback and execution
  planning contracts.
- Added `packages-logicn/logicn-cpu-kernels/` for optimized CPU kernel contracts.
- Added a low-bit AI backend architecture note.
- Added `packages-logicn/logicn-devtools-project-graph/` for project knowledge graph contracts,
  graph scan policy, output manifests and AI assistant map support.
- Added local `node packages-logicn\logicn-core-cli\dist\index.js graph --out build\graph`
  run instructions for project graph generation.
- Added AI-facing instructions to consult and regenerate `build\graph` project
  graph outputs when graph data is missing or stale.
- Added `LogicN task` CLI integration for loading `tasks.lln`, listing tasks,
  resolving dependency order and running dry-run task plans.
- Added `logicn-core-tasks` task file parsing, dependency resolution, cycle detection
  and tests.
- Added task run report generation for `LogicN task`, writing
  `build/reports/task-report.json` by default with `--report-out` and
  `--no-report` controls.
- Added `logicn-core-tasks` filesystem and environment permission validation, including
  safe relative path checks and explicit environment variable permissions.
- Expanded the root `README.md` into a full workspace introduction covering LogicN
  status, core goals, package boundaries, current tooling, project graph and
  task automation.
- Reworked `docs/REQUIREMENTS.md` from app placeholders into complete
  template, package boundary, tooling, security and success requirements.
- Reworked `docs/DESIGN.md` from generic UI placeholders into a template and
  developer-experience design guide for docs, tooling, reports and future app
  UX boundaries.
- Added `packages-logicn/logicn-ai-neural/` for neural model, layer, inference and training
  boundary contracts.
- Added `packages-logicn/logicn-ai-neuromorphic/` for spike, event-signal and spiking model
  contracts.
- Added `packages-logicn/logicn-target-ai-accelerator/` for NPU, TPU and AI-chip target
  planning contracts.
- Added `docs/NEURAL_ACCELERATOR_PACKAGES.md` to document neural,
  neuromorphic, low-bit, AI accelerator and photonic package boundaries.
- Expanded `logicn-core-vector` with matrix, tensor, shape and numeric element contract
  placeholders.
- Added `packages-logicn/logicn-ai-agent/` for supervised AI agent, tool permission, task
  group, merge policy and report contracts.
- Added `packages-logicn/logicn-ai-agent-parallel-compute.md` documenting parallel AI agents,
  CPU/GPU compute separation, supervised task groups, target fallback and agent
  safety rules.
- Added `docs/RESILIENT_FLOWS.md` documenting controlled recovery, resilient
  flows, retries, quarantine, checkpoints, memory/system failure policy and
  partial success reporting.
- Added `logicn-core-reports` processing report contracts for resilient/batch flows.
- Added `packages-logicn/logicn-tools-benchmark/` for LogicN benchmark and diagnostics contracts,
  including light/full modes, target fallback checks, privacy-safe reports and
  optional future sharing payloads.
- Added a placeholder `LogicN benchmark` CLI command entry for the future benchmark
  runner.
- Added `docs/RUST_FINANCIAL_MARKETS.md` covering Rust's role in financial
  market systems and the related design lessons for LogicN.
- Added `docs/OPTICAL_IO.md` documenting `optical_io` as a high-speed
  interconnect/data-movement target for Intel Silicon Photonics and OCI-style
  systems, distinct from photonic compute.
- Added `docs/AI_ACCELERATOR_TARGETS.md` documenting passive AI accelerator
  target profiles, with Intel Gaudi 3 represented as a backend profile rather
  than LogicN syntax.
- Added LogicN Structured Await documentation across core language, runtime,
  app-kernel and workspace docs, covering `await all`, `await race`, scoped
  cancellation, mandatory timeout policy, stream backpressure, queue handoff and
  async/concurrency reports.
- Added typed async/concurrency report contracts to `logicn-core-reports`.
- Added conservative storage-aware performance documentation covering SSD/NVMe/M.2
  wording, unknown-storage fallback, incremental build/IDE index planning,
  streaming large files, read-only mapping, cache bypass and cache safety rules.
- Added typed storage and build-cache report contracts to `logicn-core-reports`.
- Added production boot/profile rules that default-disable benchmark and
  development-only packages such as `logicn-tools-benchmark` and `logicn-devtools-*`,
  with explicit reported production package overrides required when policy
  allows them.
- Added `docs/ELECTRICAL_INFRASTRUCTURE.md`, `packages-logicn/logicn-electrical-core/`
  and `packages-logicn/logicn-ot-core/` for electrical infrastructure and
  operational-technology package planning, with explicit safety boundaries
  against replacing certified protection equipment, PLC safety systems, SCADA
  products or qualified electrical engineering judgement.
- Added an explicit v1 surface freeze around core syntax, core type-system
  semantics, the memory-safety model, CPU target support and WASM target support.
- Added `docs/CORE_FOUNDATION_ROADMAP.md` to sequence foundation work before
  package, domain or advanced-target expansion.

### Changed

- Renamed the generic `packages-logicn/app/` folder to
  `packages-logicn/logicn-framework-example-app/` so the package collection does not contain an
  ambiguous `app` package name.
- Updated workspace documentation and configuration to use `packages-logicn/logicn-core/`
  for the LogicN language package.
- Renamed the legacy language install script to `install-LogicN.sh`.
- Clarified that LogicN core is the language/compiler layer, while the Secure App
  Kernel is the optional runtime layer and full frameworks remain separate.
- Clarified that `logicn-framework-api-server` serves HTTP and delegates validation, auth and
  typed execution to `logicn-framework-app-kernel`.
- Documented the future split-repository layout where `packages-logicn/` can become
  its own reusable Git repository imported by multiple frameworks.
- Added simple `console.log("...")` output support to LogicN core checked Run Mode.
- Expanded `logicn-core-compute` target selection contracts with `low_bit_ai`,
  `cpu.generic`, AI inference workload planning and compute-auto selection
  reporting.
- Clarified that BitNet ternary model weights are separate from LogicN `Tri`
  semantics.
- Reworked low-bit AI target naming so LogicN source uses generic `low_bit_ai` and
  `ternary_ai` targets instead of backend-specific BitNet syntax.
- Completed initial `logicn-ai`, `logicn-ai-lowbit`, `logicn-target-cpu` and
  `logicn-cpu-kernels` contracts with validation helpers, examples and tests.
- Completed initial `logicn-core-compute` offload planning reports, low-bit AI fallback
  example and test coverage.
- Added a placeholder `LogicN graph` CLI command entry for future project graph
  generation and querying.
- Implemented the initial `LogicN graph` command to generate project graph JSON and
  a Markdown graph report from `logicn.workspace.json`.
- Clarified that project graph syntax and CLI commands are backend-neutral, with
  Graphify treated as an optional swappable backend rather than LogicN syntax.
- Expanded `logicn-devtools-project-graph` with a logicn-native workspace scanner that maps
  packages, documents, exported TypeScript contracts, package references and
  generated graph report outputs.
- Added graph query, explain and path helpers to `logicn-devtools-project-graph` and exposed
  them through `LogicN graph query`, `LogicN graph explain` and `LogicN graph path`.
- Updated workspace package mapping so `logicn-tools-benchmark` is tracked by the project
  graph and package registry.
- Added `optical_io` to compute, benchmark and photonic target planning
  contracts as an interconnect-aware data movement target.
- Added generic `ai_accelerator` planning support and an Intel Gaudi 3 backend
  profile to AI accelerator, compute and benchmark contracts.
- Narrowed the active workspace target list to `cpu` and `wasm`, with GPU, AI
  accelerator, photonic, optical I/O, low-bit AI and other advanced target work
  labelled post-v1 unless needed by core type-system semantics.
- Clarified that LogicN must not make measured speed claims over C#, Python, C or
  C++ until the compiler, memory model and benchmark methodology exist.
- Defined AI-readable as concrete syntax/tooling properties: regular grammar,
  explicit effects/imports, typed errors, source maps, stable diagnostics and
  machine-readable reports.

### Removed

- Removed stale generated-output-only duplicate package folders
  `packages-logicn/logicn-cli/`, `packages-logicn/logicn-compute/` and
  `packages-logicn/logicn-config/` after confirming the canonical `logicn-core-*` packages
  contain the current source, tests, manifests and newer contracts.
- Moved `packages-logicn/logicn-finance-core/`, `packages-logicn/logicn-electrical-core/` and
  `packages-logicn/logicn-ot-core/` to `C:\laragon\www\LogicN_Archive\packages-logicn\` and
  removed them from active workspace package resolution.

### Fixed

- Nothing yet.
