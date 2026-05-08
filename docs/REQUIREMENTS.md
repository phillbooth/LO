# Requirements

## App Summary

Describe the application here.

## Problem

Describe the problem this app solves.

## Users

| User Type | Description |
|---|---|
| User | Standard application user |
| Admin | Manages application data and settings |

## Core Requirements

- [ ] Requirement 1
- [ ] Requirement 2
- [ ] Requirement 3

## User Features

- [ ] Users can...
- [ ] Users can...
- [ ] Users can...

## Admin Features

- [ ] Admins can...
- [ ] Admins can...
- [ ] Admins can...

## Non-Functional Requirements

- The app must be secure.
- The app must validate input.
- The app must handle errors safely.
- The app must not expose secrets.
- The app must be maintainable.
- The app must be documented.

## Workspace Requirements

- The LO language core must live in `packages/lo-core/`.
- Compiler pipeline contracts must live in `packages/lo-compiler/`.
- Runtime execution contracts must live in `packages/lo-runtime/`.
- Shared security primitives must live in `packages/lo-security/`.
- Project configuration contracts must live in `packages/lo-config/`.
- Shared report contracts must live in `packages/lo-reports/`.
- LO multi-state logic concepts such as `Tri`, `Logic<N>` and future Omni
  logic must live in `packages/lo-logic/`.
- LO vector value, lane and operation concepts must live in
  `packages/lo-vector/`.
- LO compute planning, capability, budget and target selection concepts must
  live in `packages/lo-compute/`.
- Generic AI inference contracts, model metadata, safety policy and AI reports
  must live in `packages/lo-ai/`.
- BitNet-style 1.58-bit and ternary AI inference contracts must live in
  `packages/lo-bitnet/`.
- Photonic and wavelength hardware concepts must live in
  `packages/lo-photonic/`.
- CPU target planning, feature detection and fallback reports must live in
  `packages/lo-target-cpu/`.
- Optimized CPU kernel contracts must live in `packages/lo-cpu-kernels/`.
- Binary/native target planning must live in `packages/lo-target-binary/`.
- WebAssembly target planning must live in `packages/lo-target-wasm/`.
- GPU target planning must live in `packages/lo-target-gpu/`.
- Photonic backend target planning must live in
  `packages/lo-target-photonic/`.
- The optional LO Secure App Kernel must live in `packages/lo-app-kernel/`.
- The built-in LO HTTP API server must live in `packages/lo-api-server/`.
- The LO developer CLI must live in `packages/lo-cli/`.
- Safe LO project automation must live in `packages/lo-tasks/`.
- Bespoke app source must live in `packages/app/`.
- App documentation must live in `docs/`.
- Language documentation must stay within `packages/lo-core/`.
- Full framework features must stay outside `packages/lo-core/` and
  `packages/lo-app-kernel/`.
- Current development may use one root Git repository while package boundaries
  are still being shaped.
- Later, `packages/` may become its own Git repository so the LO packages can
  be imported into different frameworks.
- If `packages/` has its own `.git`, it must be added intentionally as a
  submodule or standalone nested repository, and the framework root must treat
  it as an external dependency.

## Secure App Kernel Requirements

- The kernel may define typed API boundaries, validation, auth policy,
  rate-limit policy, idempotency, replay protection, jobs and runtime reports.
- The kernel must receive raw requests and pass only typed, validated values to
  LO handlers unless unsafe raw access is explicitly declared.
- The kernel must enforce `boot.lo` security policy at runtime where a runtime
  adapter is present.
- The kernel must support adapter boundaries for HTTP servers, queue backends,
  storage backends and identity providers.
- The kernel must not include CMS features, admin dashboards, page builders,
  mandatory ORM design, mandatory template engines or frontend framework syntax.
- The kernel package must support a non-compiled checked Run Mode smoke test
  for validating simple `.lo` execution during framework development.

## API Server Requirements

- `lo-api-server` must be an HTTP serving package, not a full web framework.
- `lo-api-server` must load route manifests generated from LO API contracts.
- `lo-api-server` must normalise HTTP requests before passing them to
  `lo-app-kernel`.
- `lo-api-server` must enforce server-level limits such as body size, timeout,
  connection shutdown and safe response writing.
- `lo-api-server` must ask `lo-app-kernel` for auth, validation, idempotency and
  typed route execution decisions.
- `lo-api-server` must redact secrets, bearer tokens, cookies and SecureString
  values from logs and reports.
- Bespoke frameworks may either use `lo-api-server` or call `lo-app-kernel`
  directly from their own HTTP layer.

## CLI and Task Requirements

- `lo-cli` must provide developer commands for checking, building, running,
  serving, reporting, route inspection, security checks and task execution.
- `lo-cli` may coordinate `lo-core`, future compiler/runtime packages,
  `lo-api-server` and `lo-tasks`, but must not contain application behaviour.
- `lo-tasks` must provide safe, typed project automation with declared effects
  and permissions.
- `lo-tasks` must deny raw shell execution by default.
- Unsafe shell support, if added later, must be explicit, permissioned,
  timeout-limited, reported and redacted.
- Both packages must redact secrets, bearer tokens, cookies, `SecureString`
  values and private key material from output and reports.

## Logic and Photonic Package Requirements

- `lo-logic` must own `Tri`, `Logic<N>`, future Omni logic, multi-state truth
  tables, conversion rules and logic reports.
- `lo-photonic` must own wavelength, phase, amplitude, optical signal, optical
  channel, photonic simulation and photonic target planning concepts.
- `lo-photonic` may map logic states from `lo-logic` to photonic
  representations, but it must not own the logic semantics.
- `lo-vector` must own vector values, dimensions, lanes, vector operation rules
  and vector reports.
- `lo-compute` must own compute planning, capability, budget, offload and
  target selection concepts.
- `lo-ai` must own generic AI inference contracts, prompt/response shapes,
  model capability metadata, memory estimates, safety policy and AI reports.
- `lo-bitnet` must own BitNet-style model references, GGUF metadata,
  1.58-bit/ternary quantization declarations, CPU inference limits and
  BitNet-specific inference reports.
- `lo-target-binary` must own binary/native target planning and artefact
  metadata.
- `lo-target-cpu` must own CPU capability, feature, thread, memory and
  fallback planning contracts.
- `lo-cpu-kernels` must own CPU kernel contracts for GEMM, GEMV, vector dot
  products, matrix multiplication, low-bit operations, ternary operations,
  tiling and threading plans.
- `lo-target-wasm` must own WebAssembly target planning, module metadata and
  import/export contracts.
- `lo-target-gpu` must own GPU target planning, kernel mapping, precision and
  data movement reports.
- `lo-target-photonic` must own photonic backend target planning and may use
  `lo-photonic` concepts.

## Compiler, Runtime, Security, Config and Report Requirements

- `lo-compiler` must own compiler pipeline contracts for lexing, parsing, AST,
  checkers, IR, diagnostics, source maps and compiler reports.
- `lo-runtime` must own execution contracts for checked and compiled LO code.
- `lo-security` must own reusable security primitives, redaction rules,
  permission models, security diagnostics and security report contracts.
- `lo-config` must own project config, environment mode and policy loading
  contracts.
- `lo-config` must represent environment variables as safe references by name
  and metadata; it must not expose secret values in diagnostics or runtime
  handoff objects.
- `lo-config` must provide production strictness checks for strict project
  mode, required environment variables and unsafe secret defaults.
- `lo-reports` must own shared report schemas and report-writing contracts.

## AI and BitNet Requirements

- AI inference must be target-neutral at the `lo-ai` layer.
- BitNet support must be optional and must not be required by `lo-core`.
- BitNet should be treated as a CPU AI inference fallback when GPU, NPU or
  other accelerator targets are unavailable or not permitted.
- BitNet ternary weights must not be treated as LO `Tri` truth semantics.
- AI inference declarations must include explicit model reference, context
  limit, output token limit, timeout, thread limit and memory estimate.
- AI output must be untrusted by default and must not directly authorize
  security, payment, access-control or other high-impact decisions.
- Compute target selection reports must record when `cpu.bitnet` was selected
  as a fallback and why higher-preference targets were not selected.

## Runtime Naming Requirement

- `lo-app-kernel` must remain the secure application boundary package.
- A future `lo-runtime` package, if added, should be the LO execution engine for
  compiled or checked LO code.
- `lo-app-kernel` must not be renamed to `lo-runtime`, because API policy and
  code execution are separate responsibilities.

## Out of Scope

- Item 1
- Item 2
- Item 3

## Success Criteria

- [ ] The app meets the core requirements.
- [ ] The app can be tested.
- [ ] The app can be deployed.
- [ ] The app handles errors safely.
