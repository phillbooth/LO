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
- Added `packages/lo-ai/` for generic AI inference contracts, safety policy and
  AI inference reports.
- Added `packages/lo-bitnet/` for BitNet-style 1.58-bit and ternary AI
  inference contracts.
- Added `packages/lo-target-cpu/` for CPU capability, fallback and execution
  planning contracts.
- Added `packages/lo-cpu-kernels/` for optimized CPU kernel contracts.
- Added a BitNet CPU fallback architecture note.

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
- Expanded `lo-compute` target selection contracts with `cpu.bitnet`,
  `cpu.generic`, AI inference workload planning and compute-auto selection
  reporting.
- Clarified that BitNet ternary model weights are separate from LO `Tri`
  semantics.

### Removed

- Nothing yet.

### Fixed

- Nothing yet.
