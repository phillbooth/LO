# Requirements

## Scope

This repository is a LO application template and package workspace. It does not
yet define one specific product domain. Requirements in this file describe what
the template, package boundaries and developer tooling must provide so a
bespoke application can be built on top of LO safely.

Product-specific requirements belong in this file once an app domain is chosen.
Until then, `packages/app/` remains a minimal app area and feature placeholders
must not be treated as implemented app functionality.

## Template Goals

- Provide a clear workspace for LO language, compiler/runtime contracts,
  security primitives, tooling packages and bespoke app code.
- Keep language documentation in `packages/lo-core/` and app/workspace
  documentation in `docs/`.
- Support CPU-compatible checked execution and deterministic reports as the
  practical baseline.
- Keep GPU, photonic, low-bit AI and other accelerator support optional and
  backend-neutral.
- Support neural-network workloads through typed packages and target planning,
  not by making neural networks part of normal app syntax.
- Support parallel AI agents only as supervised, bounded, permissioned,
  cancelable and reportable workloads.
- Support controlled recovery for batch/data flows while stopping safely on
  unsafe system or runtime integrity failures.
- Give AI coding tools enough generated context to understand package ownership
  without replacing compiler, runtime, security or test checks.
- Provide safe task automation with explicit effects, permissions and reports.

## Users

| User Type | Description |
|---|---|
| App developer | Builds bespoke application source in `packages/app/` using LO packages. |
| Package maintainer | Evolves reusable LO package contracts under `packages/`. |
| Security reviewer | Reviews policy, secret handling, reports and package boundaries. |
| AI coding assistant | Uses `AGENTS.md` and `build/graph` to navigate the project safely. |
| Future app user | End user of the bespoke app once a product domain is defined. |
| Future app admin | Operational/admin user once a product domain is defined. |

## Core Workspace Requirements

- The root README must introduce LO, the workspace layout, current tooling and
  package boundaries.
- `AGENTS.md` must tell AI tools how to use the project graph and where package
  responsibilities live.
- `lo.workspace.json` must identify the package paths and documentation roots
  used by tooling.
- Generated project graph outputs must be refreshable from the repository root.
- The workspace must keep generated compiler output out of Git unless a file is
  intentionally committed as an example or report artefact.
- The workspace must keep secrets out of source control.
- Package READMEs and TODOs must describe package responsibility and remaining
  implementation work.

## App Requirements

The app package must remain deliberately small until a product domain is chosen.

- Bespoke app source must live in `packages/app/`.
- App routes, modules, tests and app configuration must stay in `packages/app/`
  or app-specific docs.
- App-specific requirements must be added to this document before implementing
  product features.
- App source must use explicit validation, explicit error handling and safe
  configuration references.
- App features must not be implemented inside `packages/lo-core/`.
- App features must not turn `packages/lo-app-kernel/` into a full framework,
  CMS, admin dashboard, ORM or frontend framework.

## Non-Functional Requirements

- The template must be secure by default.
- The template must validate external input at typed boundaries.
- Errors must be explicit and safely reportable.
- CLI and task output must redact secrets, bearer tokens, cookies, private keys
  and `SecureString` values.
- Runtime configuration must stay separate from compiled output.
- Build and report artefacts must identify selected targets and fallback
  reasons where relevant.
- Documentation must be updated when architecture, requirements, security, API,
  deployment or package behavior changes.

## Workspace Package Requirements

- The LO language core must live in `packages/lo-core/`.
- Compiler pipeline contracts must live in `packages/lo-compiler/`.
- Runtime execution contracts must live in `packages/lo-runtime/`.
- Shared security primitives must live in `packages/lo-security/`.
- Project configuration contracts must live in `packages/lo-config/`.
- Shared report contracts must live in `packages/lo-reports/`.
- LO multi-state logic concepts such as `Tri`, `Logic<N>` and future Omni logic
  must live in `packages/lo-logic/`.
- LO vector value, lane and operation concepts must live in
  `packages/lo-vector/`.
- LO compute planning, capability, budget and target selection concepts must
  live in `packages/lo-compute/`.
- Generic AI inference contracts, model metadata, safety policy and AI reports
  must live in `packages/lo-ai/`.
- Low-bit and ternary AI inference contracts must live in
  `packages/lo-lowbit-ai/`, with BitNet represented only as a backend.
- Supervised AI agent definitions, tool permissions, task groups, merge
  policies and reports must live in `packages/lo-agent/`.
- Neural-network model, layer, inference and training boundary contracts must
  live in `packages/lo-neural/`.
- Neuromorphic spike, event-signal and spiking model contracts must live in
  `packages/lo-neuromorphic/`.
- Photonic and wavelength hardware concepts must live in
  `packages/lo-photonic/`.
- CPU target planning, feature detection and fallback reports must live in
  `packages/lo-target-cpu/`.
- Optimized CPU kernel contracts must live in `packages/lo-cpu-kernels/`.
- Binary/native target planning must live in `packages/lo-target-binary/`.
- WebAssembly target planning must live in `packages/lo-target-wasm/`.
- GPU target planning must live in `packages/lo-target-gpu/`.
- AI accelerator target planning for NPU, TPU and AI-chip backends must live in
  `packages/lo-target-ai-accelerator/`.
- Photonic backend target planning must live in
  `packages/lo-target-photonic/`.
- The optional LO Secure App Kernel must live in `packages/lo-app-kernel/`.
- The built-in LO HTTP API server must live in `packages/lo-api-server/`.
- The LO developer CLI must live in `packages/lo-cli/`.
- Safe LO project automation must live in `packages/lo-tasks/`.
- LO project knowledge graph tooling must live in `packages/lo-project-graph/`.
- Bespoke app source must live in `packages/app/`.
- App documentation must live in `docs/`.
- Language documentation must stay within `packages/lo-core/`.
- Full framework features must stay outside `packages/lo-core/` and
  `packages/lo-app-kernel/`.
- Current development may use one root Git repository while package boundaries
  are still being shaped.
- Later, `packages/` may become its own Git repository so the LO packages can be
  imported into different frameworks.
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
- The kernel package must support a non-compiled checked Run Mode smoke test for
  validating simple `.lo` execution during framework development.

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
- `lo graph` must generate project graph JSON, Markdown report, AI map and HTML
  outputs.
- `lo task` must load task files, list tasks, resolve dependencies, detect
  cycles, support dry-run planning and write task reports.
- `lo-tasks` must provide safe, typed project automation with declared effects
  and permissions.
- `lo-tasks` must validate filesystem permissions as safe repository-relative
  paths.
- `lo-tasks` must validate environment permissions as explicit variable names.
- `lo-tasks` must deny raw shell execution by default.
- Unsafe shell support, if added later, must be explicit, permissioned,
  timeout-limited, reported and redacted.
- Both packages must redact secrets, bearer tokens, cookies, `SecureString`
  values and private key material from output and reports.

## Project Graph Requirements

- `lo-project-graph` must own project knowledge graph contracts for packages,
  documents, flows, types, effects, policies, reports, targets and decisions.
- Project graph tooling must be optional developer tooling and must not be
  required to compile or run LO applications.
- Project graph output may explain security and architecture relationships, but
  it must not replace compiler checks, runtime policy enforcement or security
  reports.
- Project graph scans must redact secrets by default.
- Project graph syntax and CLI commands must stay backend-neutral; `lo graph`
  must not become `lo graphify`.
- Graphify or any future graph tool must be represented as a swappable backend
  selected by policy, not as LO language syntax.
- Git-sourced project graph backends must be explicitly allowed and pinned to a
  commit, tag or versioned ref.
- Model-assisted extraction for documents, PDFs, images, audio or video must be
  opt-in and reported.
- Project graph outputs should include JSON, human-readable report and AI map
  paths so assistants can query project relationships without rereading every
  file.
- The native project graph mapper should map workspace packages, package docs,
  exported TypeScript contracts, package metadata, project docs and generated
  graph report outputs.

## Logic and Photonic Package Requirements

- `lo-logic` must own `Tri`, `Logic<N>`, future Omni logic, multi-state truth
  tables, conversion rules and logic reports.
- `lo-photonic` must own wavelength, phase, amplitude, optical signal, optical
  channel, photonic simulation and photonic target planning concepts.
- `lo-photonic` may map logic states from `lo-logic` to photonic
  representations, but it must not own the logic semantics.
- `lo-vector` must own vector values, dimensions, lanes, vector operation rules
  and vector reports.
- `lo-vector` must also own matrix, tensor, shape and numeric element contracts
  used by neural and compute workloads.
- `lo-compute` must own compute planning, capability, budget, offload and target
  selection concepts.
- `lo-ai` must own generic AI inference contracts, prompt/response shapes, model
  capability metadata, memory estimates, safety policy and AI reports.
- `lo-agent` must own typed agent definitions, tool permissions, agent limits,
  supervised task group plans, merge policies and agent reports.
- `lo-neural` must own neural-network model definitions, layers, activations,
  inference boundaries, training boundaries and neural reports.
- `lo-neuromorphic` must own spikes, spike trains, event signals, spiking model
  contracts and neuromorphic reports.
- `lo-lowbit-ai` must own low-bit and ternary model references, GGUF metadata,
  quantization declarations, backend selection, CPU inference limits and low-bit
  AI inference reports.
- `lo-target-binary` must own binary/native target planning and artefact
  metadata.
- `lo-target-cpu` must own CPU capability, feature, thread, memory and fallback
  planning contracts.
- `lo-cpu-kernels` must own CPU kernel contracts for GEMM, GEMV, vector dot
  products, matrix multiplication, low-bit operations, ternary operations,
  tiling and threading plans.
- `lo-target-wasm` must own WebAssembly target planning, module metadata and
  import/export contracts.
- `lo-target-gpu` must own GPU target planning, kernel mapping, precision and
  data movement reports.
- `lo-target-ai-accelerator` must own NPU, TPU, AI-chip capability reports,
  precision support, model operation mapping plans and accelerator fallback
  reports.
- `lo-target-photonic` must own photonic backend target planning and may use
  `lo-photonic` concepts.

## Compiler, Runtime, Security, Config and Report Requirements

- `lo-compiler` must own compiler pipeline contracts for lexing, parsing, AST,
  checkers, IR, diagnostics, source maps and compiler reports.
- `lo-runtime` must own execution contracts for checked and compiled LO code.
- `lo-security` must own reusable security primitives, redaction rules,
  permission models, security diagnostics and security report contracts.
- Security primitives must represent sensitive values as redacted references in
  reports and diagnostics, not as raw secret values.
- Security helpers must provide reusable redaction, safe token/cookie/header
  references, permission decisions and cryptographic policy validation.
- `lo-config` must own project config, environment mode and policy loading
  contracts.
- `lo-config` must represent environment variables as safe references by name
  and metadata; it must not expose secret values in diagnostics or runtime
  handoff objects.
- `lo-config` must provide production strictness checks for strict project mode,
  required environment variables and unsafe secret defaults.
- `lo-reports` must own shared report schemas and report-writing contracts.
- Shared report contracts must include common metadata, generator metadata,
  diagnostic summaries and typed build, security, target, runtime, task and AI
  guide report shapes.
- Shared report contracts must include processing report shapes for resilient
  flows, partial success, retries, quarantined items and failure summaries.

## Resilient Flow Requirements

- `resilient flow` must mean controlled recovery, not silent error ignoring.
- Item-level failures may continue only when the flow declares an explicit
  recovery policy.
- System/runtime failures such as memory corruption, unsafe native failure or
  runtime integrity failure must stop the affected flow or restart safely under
  supervision.
- Recoverable item failures must be classified, recorded and reported.
- Retry must apply only to errors marked retryable.
- Quarantined items must be retained safely for review rather than discarded.
- Long-running resilient flows should support checkpoint and resume where safe.
- Security-sensitive workflows should fail fast or use transactions, rollback,
  idempotency and hold-for-review policy instead of continuing.
- Recovery reports must include total, success, failed, retried, quarantined,
  stopped and failure-type summary fields.

## AI and Low-Bit Backend Requirements

- AI inference must be target-neutral at the `lo-ai` layer.
- AI agents must declare input type, output type, tools, effects, permissions,
  memory budget, timeout, rate limits and failure behaviour.
- Parallel agents must run inside supervised task groups, queues, worker pools
  or equivalent runtime supervision.
- Agent outputs may inform decisions but must not directly authorize security,
  payment, access-control or deployment decisions.
- Neural-network support must live in `lo-neural`, not `lo-core`.
- Neural workloads must use tensor shapes from `lo-vector`, compute planning
  from `lo-compute` and safety/report contracts from `lo-ai`.
- Training flows must declare dataset reference, data policy, loss function,
  optimizer, epochs, batch size, memory limit and timeout.
- Neuromorphic support must live in `lo-neuromorphic`, separate from normal
  tensor neural networks.
- Low-bit AI support must be optional and must not be required by `lo-core`.
- LO source syntax must use generic targets such as `low_bit_ai` and
  `ternary_ai`, not a backend name such as BitNet.
- BitNet should be treated as one optional backend for compatible low-bit AI
  inference when GPU, NPU or other accelerator targets are unavailable or not
  permitted.
- BitNet ternary weights and other model weight formats must not be treated as
  LO `Tri` truth semantics.
- AI inference declarations must include explicit model reference, context
  limit, output token limit, timeout, thread limit and memory estimate.
- AI output must be untrusted by default and must not directly authorize
  security, payment, access-control or other high-impact decisions.
- Compute target selection reports must record when `low_bit_ai` or
  `ternary_ai` was selected, which backend was used and why higher-preference
  targets were not selected.
- AI accelerator and photonic targets must be optional. CPU-compatible fallback
  must remain the baseline for LO developer workflows.

## Runtime Naming Requirement

- `lo-app-kernel` must remain the secure application boundary package.
- A future `lo-runtime` package, if added, should be the LO execution engine for
  compiled or checked LO code.
- `lo-app-kernel` must not be renamed to `lo-runtime`, because API policy and
  code execution are separate responsibilities.

## Out of Scope

- Product-specific app features before a product domain is selected.
- Full-framework behavior inside `lo-core` or `lo-app-kernel`.
- Mandatory ORM, CMS, admin UI, template engine or frontend framework design.
- Treating project graph output as a security or compiler authority.
- Treating BitNet, Graphify or any named backend as LO language syntax.
- Treating neural networks, neuromorphic models or AI accelerators as mandatory
  core language features.
- Requiring future hardware for the baseline LO developer workflow.

## Success Criteria

- The root README and package docs explain the workspace clearly.
- Package boundaries are explicit and enforced through documentation and tests
  where code exists.
- Project graph outputs can be regenerated and used by AI tools.
- `lo task` can load, validate, dry-run and report safe task plans.
- Secrets are never committed or emitted in reports.
- A future app can add domain requirements without moving language or framework
  responsibilities into the wrong package.
