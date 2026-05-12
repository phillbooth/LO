# Tasks

## Phase 1: Planning

- [x] Update workspace documentation for the `packages/lo-core/` language package move
- [x] Mark the current workspace version as beta rather than a stable release
- [x] Document that maintained repo structure takes precedence over generated
  document suggestions
- [x] Document the proposed `package-lo.json`, `lo.lock.json` and
  `packages-lo/` package split
- [x] Add grouped `packages-lo/lo-finance` beta package scaffold
- [x] Split partial framework guidance into `packages/lo-app-kernel/`
- [x] Add LO logic, compute type and secure runtime future-support proposal
- [x] Add `packages/lo-api-server/` HTTP API serving package documentation
- [x] Add Rust financial markets design note
- [x] Add optical I/O and Intel Silicon Photonics design note
- [x] Add passive AI accelerator and Intel Gaudi profile design note
- [x] Complete `docs/REQUIREMENTS.md`
- [x] Complete `docs/DESIGN.md`
- [ ] Complete `docs/ARCHITECTURE.md`
- [ ] Complete `docs/SECURITY.md`

## Phase 2: App Setup

- [ ] Create app entry files in `packages/app/`
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
- [x] Add package scaffolds for `lo-cli`, `lo-tasks`, `lo-logic` and
  `lo-photonic`
- [x] Add package scaffolds for `lo-vector`, `lo-compute`,
  `lo-target-binary` and `lo-target-photonic`
- [x] Add package scaffolds for `lo-compiler`, `lo-runtime`, `lo-security`,
  `lo-config`, `lo-reports`, `lo-target-wasm` and `lo-target-gpu`
- [x] Add package scaffolds for `lo-ai`, `lo-lowbit-ai`, `lo-target-cpu` and
  `lo-cpu-kernels`
- [x] Add package scaffold for `lo-agent`
- [x] Add package scaffolds for `lo-neural`, `lo-neuromorphic` and
  `lo-target-ai-accelerator`
- [x] Add package scaffold for `lo-project-graph`
- [x] Add package scaffold for `lo-benchmark`
- [x] Add TODO documents for `lo-api-server` and `lo-app-kernel`
- [x] Add README and TODO documents for `packages/app`
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

- [ ] Implement `lo-cli` command integrations
- [x] Add `lo task` CLI integration with `lo-tasks`
- [x] Implement `lo-tasks` task file loading
- [x] Implement `lo-tasks` dependency graph and cycle detection
- [x] Add CLI and task runner tests
- [x] Add report generation for CLI and task runs
- [x] Add filesystem and environment permission checks for `lo-tasks`
- [x] Define `lo-project-graph` project knowledge graph contracts
- [x] Define backend-neutral `lo-project-graph` backend policy contracts
- [x] Add LO-native `lo-project-graph` workspace mapping support
- [x] Add `lo graph` query, explain and path support
- [x] Define `lo-benchmark` benchmark and diagnostics contracts
- [ ] Implement `lo benchmark` runner integration
- [ ] Add light benchmark report generation
- [ ] Add benchmark privacy/shareable payload checks

## Phase 7: Logic and Photonic Packages

- [ ] Define `lo-logic` syntax and reports for `Tri`, `Logic<N>` and Omni
- [ ] Define `lo-photonic` wavelength, phase and amplitude model
- [ ] Define photonic mappings from `lo-logic`
- [ ] Add examples and tests for logic and photonic package boundaries
- [x] Define `lo-vector` vector, matrix and tensor value contracts
- [x] Define `lo-agent` supervised AI agent orchestration contracts
- [x] Define `lo-neural` neural-network workload contracts
- [x] Define `lo-neuromorphic` spiking/event workload contracts
- [x] Define `lo-compute` compute planning and target selection rules
- [x] Define `lo-ai` generic AI inference and safety policy contracts
- [x] Define `lo-lowbit-ai` backend contracts for low-bit AI inference
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

- [ ] Define `lo-compiler` compiler pipeline contracts
- [ ] Define `lo-runtime` execution contracts
- [x] Define resilient flow controlled recovery and processing report direction
- [x] Define `lo-security` primitives, redaction and permission models
- [x] Define `lo-config` project config and environment mode contracts
- [x] Define `lo-reports` shared report schemas

## Phase 9: Repository Split

- [ ] Decide when `packages/` is stable enough to become a reusable package
  repository
- [ ] Define `package-lo.json` schema for LO package dependencies and profiles
- [ ] Define `lo.lock.json` schema for locked LO package refs, checksums and
  selected profiles
- [ ] Decide whether development-only packages should live under
  `packages-lo/lo-developer/` or another explicit dev package mount
- [ ] Define production versus development package resolution rules so
  production apps do not download staging packages by default
- [ ] Split `packages/` into its own Git repository
- [ ] Mount `packages/` in framework repositories as a submodule or explicit
  nested repository
- [ ] Document package import workflow for different frameworks
- [ ] Add release/versioning rules for reusable LO packages

## Phase 10: Finance Packages

- [x] Add grouped `lo-finance` package planning area
- [ ] Define `lo-finance-math` deterministic decimal and money contracts
- [ ] Define `lo-finance-calendar` exchange calendar and trading session
  contracts
- [ ] Define `lo-finance-market-data` quote, trade, order book, candle and
  replay contracts
- [ ] Define `lo-finance-fix` FIX dictionary, validation and session contracts
- [ ] Define `lo-finance-audit` evidence, hash-chain, reconstruction and
  redacted bundle contracts
- [ ] Decide when finance contracts should split into standalone packages
