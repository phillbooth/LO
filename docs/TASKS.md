# Tasks

## Phase 1: Planning

- [x] Update workspace documentation for the `packages-lo/lo-core/` language package move
- [x] Mark the current workspace version as beta rather than a stable release
- [x] Document that maintained repo structure takes precedence over generated
  document suggestions
- [x] Document the proposed `package-lo.json`, `lo.lock.json` and
  `packages-lo/` package split
- [x] Add grouped `packages-lo/lo-finance-core` beta package scaffold
- [x] Add F# comparison and LO positioning guidance
- [x] Split partial framework guidance into `packages-lo/lo-framework-app-kernel/`
- [x] Add LO logic, compute type and secure runtime future-support proposal
- [x] Add `packages-lo/lo-framework-api-server/` HTTP API serving package documentation
- [x] Add Rust financial markets design note
- [x] Add optical I/O and Intel Silicon Photonics design note
- [x] Add passive AI accelerator and Intel Gaudi profile design note
- [x] Complete `docs/REQUIREMENTS.md`
- [x] Complete `docs/DESIGN.md`
- [ ] Complete `docs/ARCHITECTURE.md`
- [ ] Complete `docs/SECURITY.md`

## Phase 2: App Setup

- [ ] Create app entry files in `packages-lo/lo-framework-example-app/`
- [ ] Add app config
- [ ] Add environment schema
- [ ] Add basic route/module structure

## Phase 3: Core Features

- [ ] Add feature 1
- [ ] Add feature 2
- [ ] Add feature 3

## Phase 4: Testing

- [x] Add app-kernel hello-world checked Run Mode test
- [x] Add app-kernel vector, sum, decimal and JSON checked Run Mode fixtures
- [x] Add package scaffolds for `lo-core-cli`, `lo-core-tasks`, `lo-core-logic` and
  `lo-photonic`
- [x] Add package scaffolds for `lo-core-vector`, `lo-core-compute`,
  `lo-target-binary` and `lo-target-photonic`
- [x] Add package scaffolds for `lo-core-compiler`, `lo-core-runtime`, `lo-core-security`,
  `lo-core-config`, `lo-core-reports`, `lo-target-wasm` and `lo-target-gpu`
- [x] Add package scaffolds for `lo-ai`, `lo-ai-lowbit`, `lo-target-cpu` and
  `lo-cpu-kernels`
- [x] Add package scaffold for `lo-ai-agent`
- [x] Add package scaffolds for `lo-ai-neural`, `lo-ai-neuromorphic` and
  `lo-target-ai-accelerator`
- [x] Add package scaffold for `lo-devtools-project-graph`
- [x] Add package scaffold for `lo-tools-benchmark`
- [x] Add TODO documents for `lo-framework-api-server` and `lo-framework-app-kernel`
- [x] Add README and TODO documents for `packages-lo/lo-framework-example-app`
- [ ] Add unit tests
- [ ] Add integration tests
- [ ] Add manual test checklist
- [ ] Confirm error handling

## Phase 5: Deployment

- [ ] Complete deployment documentation
- [ ] Configure environment variables
- [ ] Build the app
- [ ] Deploy to staging
- [ ] Deploy to production

## Phase 6: Tooling Packages

- [ ] Implement `lo-core-cli` command integrations
- [x] Add `lo task` CLI integration with `lo-core-tasks`
- [x] Implement `lo-core-tasks` task file loading
- [x] Implement `lo-core-tasks` dependency graph and cycle detection
- [x] Add CLI and task runner tests
- [x] Add report generation for CLI and task runs
- [x] Add filesystem and environment permission checks for `lo-core-tasks`
- [x] Define `lo-devtools-project-graph` project knowledge graph contracts
- [x] Define backend-neutral `lo-devtools-project-graph` backend policy contracts
- [x] Add LO-native `lo-devtools-project-graph` workspace mapping support
- [x] Add `lo graph` query, explain and path support
- [x] Define `lo-tools-benchmark` benchmark and diagnostics contracts
- [ ] Implement `lo benchmark` runner integration
- [ ] Add light benchmark report generation
- [ ] Add benchmark privacy/shareable payload checks

## Phase 7: Logic and Photonic Packages

- [ ] Define `lo-core-logic` syntax and reports for `Tri`, `Logic<N>` and Omni
- [ ] Define `lo-photonic` wavelength, phase and amplitude model
- [ ] Define photonic mappings from `lo-core-logic`
- [ ] Add examples and tests for logic and photonic package boundaries
- [x] Define `lo-core-vector` vector, matrix and tensor value contracts
- [x] Define `lo-ai-agent` supervised AI agent orchestration contracts
- [x] Define `lo-ai-neural` neural-network workload contracts
- [x] Define `lo-ai-neuromorphic` spiking/event workload contracts
- [x] Define `lo-core-compute` compute planning and target selection rules
- [x] Define `lo-ai` generic AI inference and safety policy contracts
- [x] Define `lo-ai-lowbit` backend contracts for low-bit AI inference
- [x] Define `lo-target-cpu` CPU capability and fallback report contracts
- [x] Define `lo-cpu-kernels` low-bit CPU kernel planning contracts
- [ ] Define `lo-target-binary` binary/native target plans
- [ ] Define `lo-target-wasm` WebAssembly target plans
- [ ] Define `lo-target-gpu` GPU target plans
- [x] Define `lo-target-ai-accelerator` target planning contracts
- [x] Define Intel Gaudi 3 as a passive AI accelerator backend profile
- [x] Define `optical_io` as a high-speed interconnect/data-movement target
- [ ] Define `lo-target-photonic` photonic backend target plans

## Phase 8: Core Infrastructure Packages

- [ ] Define `lo-core-compiler` compiler pipeline contracts
- [ ] Define `lo-core-runtime` execution contracts
- [ ] Define standard library baseline for JSON, HTTP, files, streams, crypto
  policy, dates, money and safe strings
- [ ] Define IDE/LSP, debugger, source-map and test-framework roadmap
- [ ] Define exhaustive match, sealed variant, generic constraint and protocol
  requirements for production-readiness
- [x] Define resilient flow controlled recovery and processing report direction
- [x] Define `lo-core-security` primitives, redaction and permission models
- [x] Define `lo-core-config` project config and environment mode contracts
- [x] Define `lo-core-reports` shared report schemas

## Phase 9: Package Collection Split

- [x] Move LO packages from `packages/` into `packages-lo/`
- [x] Rename ambiguous app package folder to `packages-lo/lo-framework-example-app`
- [x] Document package naming rules and staged rename candidates
- [ ] Decide when `packages-lo/` is stable enough to become a reusable package
  repository
- [ ] Define `package-lo.json` schema for LO package dependencies and profiles
- [ ] Define `lo.lock.json` schema for locked LO package refs, checksums and
  selected profiles
- [x] Use `lo-devtools-*` and `lo-tools-*` naming for development-only package
  families instead of a generic developer bucket
- [ ] Define production versus development package resolution rules so
  production apps do not download staging packages by default
- [ ] Split `packages-lo/` into its own Git repository
- [ ] Mount `packages-lo/` in framework repositories as a submodule or explicit
  nested repository
- [ ] Document package import workflow for different frameworks
- [ ] Add release/versioning rules for reusable LO packages
- [ ] Decide whether to rename `lo-target-ai-accelerator` to `lo-target-ai`
- [ ] Decide whether to rename `lo-cpu-kernels` to `lo-kernel-cpu`
- [ ] Decide whether to rename `lo-ai-lowbit`, `lo-ai-neural` and
  `lo-ai-neuromorphic` under the `lo-ai-*` naming family
- [ ] Define first `lo-io-*` package contracts without replacing target
  packages

## Phase 10: Finance Packages

- [x] Add grouped `lo-finance-core` package planning area
- [ ] Define `lo-finance-core-math` deterministic decimal and money contracts
- [ ] Define `lo-finance-core-calendar` exchange calendar and trading session
  contracts
- [ ] Define `lo-finance-core-market-data` quote, trade, order book, candle and
  replay contracts
- [ ] Define `lo-finance-core-fix` FIX dictionary, validation and session contracts
- [ ] Define `lo-finance-core-audit` evidence, hash-chain, reconstruction and
  redacted bundle contracts
- [ ] Decide when finance contracts should split into standalone packages
