# Tasks

## Phase 1: Planning

- [x] Update workspace documentation for the `packages/lo-core/` language package move
- [x] Split partial framework guidance into `packages/lo-app-kernel/`
- [x] Add LO logic, compute type and secure runtime future-support proposal
- [x] Add `packages/lo-api-server/` HTTP API serving package documentation
- [ ] Complete `docs/REQUIREMENTS.md`
- [ ] Complete `docs/DESIGN.md`
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
- [x] Add package scaffolds for `lo-ai`, `lo-bitnet`, `lo-target-cpu` and
  `lo-cpu-kernels`
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
- [ ] Implement `lo-tasks` task file loading
- [ ] Implement `lo-tasks` dependency graph and cycle detection
- [ ] Add CLI and task runner tests
- [ ] Add report generation for CLI and task runs

## Phase 7: Logic and Photonic Packages

- [ ] Define `lo-logic` syntax and reports for `Tri`, `Logic<N>` and Omni
- [ ] Define `lo-photonic` wavelength, phase and amplitude model
- [ ] Define photonic mappings from `lo-logic`
- [ ] Add examples and tests for logic and photonic package boundaries
- [ ] Define `lo-vector` vector value and operation rules
- [ ] Define `lo-compute` compute planning and target selection rules
- [ ] Define `lo-ai` generic AI inference and safety policy contracts
- [ ] Define `lo-bitnet` CPU fallback contracts for 1.58-bit AI inference
- [ ] Define `lo-target-cpu` CPU capability and fallback report contracts
- [ ] Define `lo-cpu-kernels` low-bit CPU kernel planning contracts
- [ ] Define `lo-target-binary` binary/native target plans
- [ ] Define `lo-target-wasm` WebAssembly target plans
- [ ] Define `lo-target-gpu` GPU target plans
- [ ] Define `lo-target-photonic` photonic backend target plans

## Phase 8: Core Infrastructure Packages

- [ ] Define `lo-compiler` compiler pipeline contracts
- [ ] Define `lo-runtime` execution contracts
- [ ] Define `lo-security` primitives, redaction and permission models
- [x] Define `lo-config` project config and environment mode contracts
- [ ] Define `lo-reports` shared report schemas

## Phase 9: Repository Split

- [ ] Decide when `packages/` is stable enough to become a reusable package
  repository
- [ ] Split `packages/` into its own Git repository
- [ ] Mount `packages/` in framework repositories as a submodule or explicit
  nested repository
- [ ] Document package import workflow for different frameworks
- [ ] Add release/versioning rules for reusable LO packages
