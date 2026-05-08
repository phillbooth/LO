# Changelog

All notable changes to this app should be documented here.

## [Unreleased]

### Added

- Initial documentation structure.
- Added `packages/lo-app-kernel/` as the optional partial framework
  layer for secure runtime boundaries.
- Added a checked Run Mode hello-world test fixture for the app kernel package.
- Added the LO logic, compute type and secure runtime future-support proposal.
- Removed active legacy extension warning comments from LO core documentation.
- Added `packages/lo-api-server/` documentation as the built-in HTTP API
  serving layer for LO App Kernel.
- Added `packages/lo-cli/` as the LO developer command-line package scaffold.
- Added `packages/lo-tasks/` as the safe typed project automation package
  scaffold.
- Added `packages/lo-logic/` for `Tri`, `Logic<N>` and future Omni logic.
- Added `packages/lo-photonic/` for photonic and wavelength hardware concepts.
- Added `packages/lo-vector/` for vector value, lane and operation concepts.
- Added `packages/lo-compute/` for compute planning and target selection
  concepts.
- Added `packages/lo-target-binary/` for binary/native target planning.
- Added `packages/lo-target-wasm/` for WebAssembly target planning.
- Added `packages/lo-target-gpu/` for GPU target planning.
- Added `packages/lo-target-photonic/` for photonic backend target planning.
- Added `packages/lo-compiler/` for compiler pipeline contracts.
- Added `packages/lo-runtime/` for checked and compiled execution contracts.
- Added `packages/lo-security/` for reusable security primitives and report
  contracts.
- Added `packages/lo-config/` for project configuration and environment mode
  contracts.
- Added `packages/lo-reports/` for shared report schemas and report-writing
  contracts.
- Added TODO documents for `packages/lo-api-server/` and
  `packages/lo-app-kernel/`.
- Added README and TODO documents for `packages/app/`.
- Added CLI and task runner requirements in
  `packages/lo-cli-and-lo-tasks-requirements.md`.
- Added `lo-config` project config parsing, environment mode loading,
  production strictness policy, safe environment variable references, runtime
  handoff contracts, examples and tests.
- Added `lo-reports` shared report metadata, diagnostic summaries, build,
  security, target, runtime, task and AI guide report contracts with examples
  and tests.
- Added `lo-security` SecureString references, redaction helpers, permission
  decisions, safe token/cookie/header references, crypto policy validation,
  security reports, examples and tests.
- Added `packages/lo-ai/` for generic AI inference contracts, safety policy and
  AI inference reports.
- Added `packages/lo-lowbit-ai/` for low-bit and ternary AI inference contracts,
  with BitNet represented as an optional backend.
- Added `packages/lo-target-cpu/` for CPU capability, fallback and execution
  planning contracts.
- Added `packages/lo-cpu-kernels/` for optimized CPU kernel contracts.
- Added a low-bit AI backend architecture note.
- Added `packages/lo-project-graph/` for project knowledge graph contracts,
  graph scan policy, output manifests and AI assistant map support.
- Added local `node packages\lo-cli\dist\index.js graph --out build\graph`
  run instructions for project graph generation.
- Added AI-facing instructions to consult and regenerate `build\graph` project
  graph outputs when graph data is missing or stale.
- Added `lo task` CLI integration for loading `tasks.lo`, listing tasks,
  resolving dependency order and running dry-run task plans.
- Added `lo-tasks` task file parsing, dependency resolution, cycle detection
  and tests.
- Added task run report generation for `lo task`, writing
  `build/reports/task-report.json` by default with `--report-out` and
  `--no-report` controls.
- Added `lo-tasks` filesystem and environment permission validation, including
  safe relative path checks and explicit environment variable permissions.

### Changed

- Updated workspace documentation and configuration to use `packages/lo-core/`
  for the LO language package.
- Renamed the legacy language install script to `install-lo.sh`.
- Clarified that LO core is the language/compiler layer, while the Secure App
  Kernel is the optional runtime layer and full frameworks remain separate.
- Clarified that `lo-api-server` serves HTTP and delegates validation, auth and
  typed execution to `lo-app-kernel`.
- Documented the future split-repository layout where `packages/` can become
  its own reusable Git repository imported by multiple frameworks.
- Added simple `console.log("...")` output support to LO core checked Run Mode.
- Expanded `lo-compute` target selection contracts with `low_bit_ai`,
  `cpu.generic`, AI inference workload planning and compute-auto selection
  reporting.
- Clarified that BitNet ternary model weights are separate from LO `Tri`
  semantics.
- Reworked low-bit AI target naming so LO source uses generic `low_bit_ai` and
  `ternary_ai` targets instead of backend-specific BitNet syntax.
- Completed initial `lo-ai`, `lo-lowbit-ai`, `lo-target-cpu` and
  `lo-cpu-kernels` contracts with validation helpers, examples and tests.
- Completed initial `lo-compute` offload planning reports, low-bit AI fallback
  example and test coverage.
- Added a placeholder `lo graph` CLI command entry for future project graph
  generation and querying.
- Implemented the initial `lo graph` command to generate project graph JSON and
  a Markdown graph report from `lo.workspace.json`.
- Clarified that project graph syntax and CLI commands are backend-neutral, with
  Graphify treated as an optional swappable backend rather than LO syntax.
- Expanded `lo-project-graph` with a LO-native workspace scanner that maps
  packages, documents, exported TypeScript contracts, package references and
  generated graph report outputs.
- Added graph query, explain and path helpers to `lo-project-graph` and exposed
  them through `lo graph query`, `lo graph explain` and `lo graph path`.

### Removed

- Nothing yet.

### Fixed

- Nothing yet.
