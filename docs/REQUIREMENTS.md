# Requirements

## Scope

This repository is a LogicN application template and package workspace. It does not
yet define one specific product domain. Requirements in this file describe what
the template, package boundaries and developer tooling must provide so a
bespoke application can be built on top of LogicN safely.

Product-specific requirements belong in this file once an app domain is chosen.
Until then, `packages-logicn/logicn-framework-example-app/` remains a minimal app area and feature placeholders
must not be treated as implemented app functionality.

## Template Goals

- Provide a clear workspace for LogicN language, compiler/runtime contracts,
  security primitives, tooling packages and bespoke app code.
- Keep language documentation in `packages-logicn/logicn-core/` and app/workspace
  documentation in `docs/`.
- Support CPU-compatible checked execution and deterministic reports as the
  practical baseline.
- Keep v1 target support limited to CPU and WASM. GPU, photonic, low-bit AI,
  AI accelerator, optical I/O and other accelerator support are post-v1 planning
  unless needed to explain core type-system semantics.
- Support neural-network workloads through typed packages and target planning,
  not by making neural networks part of normal app syntax.
- Support parallel AI agents only as supervised, bounded, permissioned,
  cancelable and reportable workloads.
- Support LogicN Structured Await as the normal concurrency model: synchronous-looking
  waits with scoped child work, typed effects, timeouts, cancellation and reports
  instead of exposed future/promise plumbing.
- Support controlled recovery for batch/data flows while stopping safely on
  unsafe system or runtime integrity failures.
- Support storage-aware performance planning without claiming direct support for
  SSD, NVMe, M.2 or other hardware. Storage detection must be optional,
  reportable and safe when unknown.
- Give AI coding tools enough generated context to understand package ownership
  without replacing compiler, runtime, security or test checks.
- Provide safe task automation with explicit effects, permissions and reports.

## V1 Language Requirements

- The v1 surface must freeze around core syntax, the core type system,
  `Result<T, E>`, `Option<T>`, the memory-safety model, CPU target support and
  WASM target support.
- Everything beyond CPU and WASM targets must be labelled post-v1 unless it is
  necessary to define the core type system.
- LogicN must not claim to be faster than C#, Python, C or C++ until the compiler,
  memory model and benchmark methodology exist. Current performance wording
  must be framed as a goal or opportunity, not a measured fact.
- Memory safety must be tied to an explicit mechanism. The current candidate is
  hybrid ownership: immutable sharing by default, one active mutable owner,
  read-only and mutable borrows, explicit moves for resources, bounds-checked
  collections and no raw pointers in normal application code.
- Recoverable errors must be explicit in syntax and types through
  `Result<T, E>` or an equivalent typed result form. Hidden exceptions must not
  be the default application error model.
- Missing values must use `Option<T>` or another explicit typed missing-value
  form, not unchecked null.
- `Tri` must not silently convert to `Bool`. Branch conditions must require
  `Bool`; `Tri` values must use exhaustive `match` or an explicit conversion
  policy such as `unknown_as: false`, `unknown_as: error` or equivalent.
- AI-readable must mean concrete compiler/tooling properties: regular grammar,
  explicit effects, explicit imports, typed errors, source maps, stable
  diagnostics and machine-readable reports. It must not be a vague marketing
  label.
- Before adding more active packages, the project must include at least 20 real
  `.lln` example programs covering basic, intermediate and advanced syntax.

## Users

| User Type | Description |
|---|---|
| App developer | Builds bespoke application source in `packages-logicn/logicn-framework-example-app/` using LogicN packages. |
| Package maintainer | Evolves reusable LogicN package contracts under `packages-logicn/`. |
| Security reviewer | Reviews policy, secret handling, reports and package boundaries. |
| AI coding assistant | Uses `AGENTS.md` and `build/graph` to navigate the project safely. |
| Future app user | End user of the bespoke app once a product domain is defined. |
| Future app admin | Operational/admin user once a product domain is defined. |

## Core Workspace Requirements

- The root README must introduce LogicN, the workspace layout, current tooling and
  package boundaries.
- `AGENTS.md` must tell AI tools how to use the project graph and where package
  responsibilities live.
- `logicn.workspace.json` must identify the package paths and documentation roots
  used by tooling.
- Generated project graph outputs must be refreshable from the repository root.
- The workspace must keep generated compiler output out of Git unless a file is
  intentionally committed as an example or report artefact.
- The workspace must keep secrets out of source control.
- Package READMEs and TODOs must describe package responsibility and remaining
  implementation work.
- This workspace is a beta prototype, not a stable release. Version metadata
  must use beta prerelease identifiers until release criteria are explicitly
  met.
- The future LogicN package split should be documented before implementation:
  `package.json` for normal app/vendor packages, `package-logicn.json` for LogicN
  package dependencies, `logicn.lock.json` for locked LogicN package graphs,
  `packages/` for normal vendor packages and `packages-logicn/` for LogicN packages.
- NPM and `package.json` must remain host ecosystem tooling only. They may run
  current JavaScript/TypeScript prototype checks and package generated JS/TS
  interop, but they must not define LogicN package graph resolution, LogicN runtime
  profiles, LogicN compiler target policy or LogicN production package overrides.
- Generated documents and AI-suggested structures are advisory. Repository
  package boundaries, `AGENTS.md`, `logicn.workspace.json`, package READMEs/TODOs
  and maintained docs take precedence when suggestions conflict.

## App Requirements

The app package must remain deliberately small until a product domain is chosen.

- Bespoke app source must live in `packages-logicn/logicn-framework-example-app/`.
- App routes, modules, tests and app configuration must stay in `packages-logicn/logicn-framework-example-app/`
  or app-specific docs.
- App-specific requirements must be added to this document before implementing
  product features.
- App source must use explicit validation, explicit error handling and safe
  configuration references.
- App features must not be implemented inside `packages-logicn/logicn-core/`.
- App features must not turn `packages-logicn/logicn-framework-app-kernel/` into a full framework,
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

- The LogicN language core must live in `packages-logicn/logicn-core/`.
- Compiler pipeline contracts must live in `packages-logicn/logicn-core-compiler/`.
- Runtime execution contracts must live in `packages-logicn/logicn-core-runtime/`.
- Shared security primitives must live in `packages-logicn/logicn-core-security/`.
- Project configuration contracts must live in `packages-logicn/logicn-core-config/`.
- Shared report contracts must live in `packages-logicn/logicn-core-reports/`.
- LogicN multi-state logic concepts such as `Tri`, `LogicN` and future Omni logic
  must live in `packages-logicn/logicn-core-logic/`.
- LogicN vector value, lane and operation concepts must live in
  `packages-logicn/logicn-core-vector/`.
- LogicN compute planning, capability, budget and target selection concepts must
  live in `packages-logicn/logicn-core-compute/`.
- Generic AI inference contracts, model metadata, safety policy and AI reports
  must live in `packages-logicn/logicn-ai/`.
- Low-bit and ternary AI inference contracts must live in
  `packages-logicn/logicn-ai-lowbit/`, with BitNet represented only as a backend.
- Supervised AI agent definitions, tool permissions, task groups, merge
  policies and reports must live in `packages-logicn/logicn-ai-agent/`.
- Neural-network model, layer, inference and training boundary contracts must
  live in `packages-logicn/logicn-ai-neural/`.
- Neuromorphic spike, event-signal and spiking model contracts must live in
  `packages-logicn/logicn-ai-neuromorphic/`.
- Photonic and wavelength hardware concepts must live in
  `packages-logicn/logicn-core-photonic/`.
- CPU target planning, feature detection and fallback reports must live in
  `packages-logicn/logicn-target-cpu/`.
- Optimized CPU kernel contracts must live in `packages-logicn/logicn-cpu-kernels/`.
- Binary/native target planning must live in `packages-logicn/logicn-target-binary/`.
- WebAssembly target planning must live in `packages-logicn/logicn-target-wasm/`.
- GPU target planning must live in `packages-logicn/logicn-target-gpu/`.
- AI accelerator target planning for NPU, TPU and AI-chip backends must live in
  `packages-logicn/logicn-target-ai-accelerator/`.
- Photonic backend target planning must live in
  `packages-logicn/logicn-target-photonic/`.
- The optional LogicN Secure App Kernel must live in `packages-logicn/logicn-framework-app-kernel/`.
- The built-in LogicN HTTP API server must live in `packages-logicn/logicn-framework-api-server/`.
- The LogicN developer CLI must live in `packages-logicn/logicn-core-cli/`.
- Safe LogicN project automation must live in `packages-logicn/logicn-core-tasks/`.
- LogicN benchmark and diagnostics tooling must live in `packages-logicn/logicn-tools-benchmark/`.
- LogicN project knowledge graph tooling must live in `packages-logicn/logicn-devtools-project-graph/`.
- Bespoke app source must live in `packages-logicn/logicn-framework-example-app/`.
- App documentation must live in `docs/`.
- Language documentation must stay within `packages-logicn/logicn-core/`.
- Full framework features must stay outside `packages-logicn/logicn-core/` and
  `packages-logicn/logicn-framework-app-kernel/`.
- Current development may use one root Git repository while package boundaries
  are still being shaped.
- Later, `packages-logicn/` may become its own Git repository so the LogicN packages can be
  imported into different frameworks.
- If `packages-logicn/` has its own `.git`, it must be added intentionally as a
  submodule or standalone nested repository, and the framework root must treat
  it as an external dependency.
- Development-only packages must use `logicn-devtools-*` or `logicn-tools-*` names for
  staging packages, diagnostics, generators and experiments.
- Development-only packages must be excluded from production package resolution
  and production downloads unless a maintainer explicitly opts into a
  development or staging profile.
- Production boot/profile defaults must disable development-only and benchmark
  packages such as `logicn-devtools-*` and `logicn-tools-benchmark`.
- A production build that includes a default-disabled package must declare an
  explicit production package override with a reason, and the override must be
  visible in config/build/security/deployment reports. Without that override,
  startup or build validation must fail.
- The exact developer package folder name remains provisional, but its boundary
  must stay separate from production runtime package manifests.
- Finance, electrical and OT package planning must stay archived outside the
  active workspace under `C:\laragon\www\LogicN_Archive\packages-logicn\` until post-v2
  package planning resumes.
- Finance, electrical and OT packages must not be part of active v1 package
  resolution, build graph generation, compiler targets or runtime profiles.
- Any future restoration of finance, electrical or OT packages must require a
  design review because these domains carry regulatory, protocol correctness,
  safety and cybersecurity requirements beyond the v1 language scope.
- Package naming must follow `docs/PACKAGE_NAMING.md`: `logicn-target-*` for where
  code runs or compiles to, `logicn-io-*` for how data moves, `logicn-ai-*` for
  AI-specific workloads, `logicn-kernel-*` for low-level execution kernels and
  `logicn-app-*` for runtime/application framework layers.
- `logicn-target-binary` and `logicn-target-photonic` must not be renamed to I/O
  package names; binary and photonic I/O should be added later as separate
  `logicn-io-*` packages.

## Archived Electrical and OT Package Requirements

These requirements are preserved as post-v2 archive notes. They do not apply to
the active v1 build graph.

- `logicn-electrical-core` must be a domain package group, not core LogicN syntax.
- `logicn-ot-core` must be an operational-technology integration package group, not
  core LogicN syntax and not a SCADA, PLC or safety controller product.
- LogicN electrical support must be positioned as modelling, validation,
  monitoring, workflow and audit support. It must not replace circuit breakers,
  relays, protective devices, PLC safety systems, grid protection, certified
  controllers or qualified electrical design.
- Early electrical contracts must start with asset models, telemetry ingestion,
  alerts, reports, capacity checks, maintenance schedules, energy reports, OT
  network policy and protection setting record/audit evidence.
- Early electrical contracts must avoid direct breaker control, relay protection
  replacement, PLC replacement, safety interlock control, unsupervised
  switching and real-time grid control.
- Electrical asset models may cover panels, circuits, breakers, cables, loads,
  meters, transformers, inverters, batteries, EV chargers, UPS, generators,
  relays and sensors.
- Electrical telemetry may cover voltage, current, power, power factor,
  frequency, phase imbalance, harmonics, temperature, breaker state, relay
  state, battery state of charge, solar generation, EV charger demand and UPS
  load.
- Electrical control policy must be deny-by-default. Reading telemetry,
  creating alerts and opening maintenance work orders are lower risk. Changing
  setpoints, switching load and breaker operations are high risk and must
  require explicit policy, approval, signed jobs, audit and suitable local
  safety interlocks.
- Protection setting support must manage records, versions, approvals, test
  evidence, rollback plans and compatibility reports. It must not replace
  protection relay behaviour.
- OT packages may define adapter boundaries for OPC UA, IEC 61850, Modbus, MQTT
  and SCADA connectors, but concrete protocol stacks and vendor integrations
  should remain package-specific and permissioned.
- OT security must require read-only defaults, network segmentation, host
  allowlists, signed commands, operator approval, mTLS where appropriate, no
  arbitrary scripts, no undeclared package network access and audit of all
  control attempts.
- Electrical and OT reports must avoid raw secrets, unnecessary personal data
  and unsafe control payloads.

## Archived Finance Package Requirements

These requirements are preserved as post-v2 archive notes. They do not apply to
the active v1 build graph.

- `logicn-finance-core` must be a domain package group, not core LogicN syntax.
- Finance support must start with typed data, deterministic maths, validation,
  audit, replay and integration contracts rather than live trading systems.
- Finance maths must disallow float money by default, require explicit rounding
  mode and make rounding decisions reportable.
- Market-data contracts must model instruments, exchanges, sessions, quotes,
  trades, order book levels, candles, snapshots, source metadata and replayable
  event streams.
- FIX support must be defined as an integration package boundary for message
  dictionaries, validation, session state, sequence numbers, heartbeats, resend
  requests, rejects, execution reports, order cancel/replace and persistence
  policy.
- Finance audit must support immutable event references, message hashes, order
  lifecycle reconstruction, risk decision reports, permission decision reports
  and redacted evidence bundles.
- Risk and pricing package work must wait until finance maths, market data and
  audit contracts are stable enough to support them.
- LogicN finance packages may wrap mature C++, Java, Python or TypeScript finance
  ecosystems through controlled interop, but wrappers must declare memory
  isolation, credential policy, network permissions, audit requirements and
  fallback behaviour.
- Early LogicN finance work must not claim to implement a full stock exchange,
  HFT engine, broker-dealer platform, settlement system, clearing system,
  custody platform or regulated trading-advice engine.

## Secure App Kernel Requirements

- The kernel may define typed API boundaries, validation, auth policy,
  rate-limit policy, idempotency, replay protection, jobs and runtime reports.
- The kernel must receive raw requests and pass only typed, validated values to
  LogicN handlers unless unsafe raw access is explicitly declared.
- The kernel must enforce `boot.lln` security policy at runtime where a runtime
  adapter is present.
- The kernel must support adapter boundaries for HTTP servers, queue backends,
  storage backends and identity providers.
- The kernel must not include CMS features, admin dashboards, page builders,
  mandatory ORM design, mandatory template engines or frontend framework syntax.
- The kernel package must support a non-compiled checked Run Mode smoke test for
  validating simple `.lln` execution during framework development.

## API Server Requirements

- `logicn-framework-api-server` must be an HTTP serving package, not a full web framework.
- `logicn-framework-api-server` must load route manifests generated from LogicN API contracts.
- `logicn-framework-api-server` must normalise HTTP requests before passing them to
  `logicn-framework-app-kernel`.
- `logicn-framework-api-server` must enforce server-level limits such as body size, timeout,
  connection shutdown and safe response writing.
- `logicn-framework-api-server` must ask `logicn-framework-app-kernel` for auth, validation, idempotency and
  typed route execution decisions.
- `logicn-framework-api-server` must redact secrets, bearer tokens, cookies and SecureString
  values from logs and reports.
- Bespoke frameworks may either use `logicn-framework-api-server` or call `logicn-framework-app-kernel`
  directly from their own HTTP layer.

## CLI and Task Requirements

- `logicn-core-cli` must provide developer commands for checking, building, running,
  serving, reporting, route inspection, security checks and task execution.
- `logicn-core-cli` may coordinate `logicn-core`, future compiler/runtime packages,
  `logicn-framework-api-server` and `logicn-core-tasks`, but must not contain application behaviour.
- `LogicN graph` must generate project graph JSON, Markdown report, AI map and HTML
  outputs.
- `LogicN task` must load task files, list tasks, resolve dependencies, detect
  cycles, support dry-run planning and write task reports.
- `logicn-core-tasks` must provide safe, typed project automation with declared effects
  and permissions.
- `logicn-core-tasks` must validate filesystem permissions as safe repository-relative
  paths.
- `logicn-core-tasks` must validate environment permissions as explicit variable names.
- `logicn-core-tasks` must deny raw shell execution by default.
- Unsafe shell support, if added later, must be explicit, permissioned,
  timeout-limited, reported and redacted.
- Both packages must redact secrets, bearer tokens, cookies, `SecureString`
  values and private key material from output and reports.

## Benchmark Requirements

- `logicn-tools-benchmark` must own benchmark configuration, task definitions, result
  types, score categories, privacy policy and report payload contracts.
- Benchmarking must prioritize correctness, fallback behavior and safe
  execution before raw speed.
- Light mode must be the default and must be bounded by total runtime, per-test
  runtime and safe memory limits.
- Full and stress modes must be explicit opt-in modes and must not run
  automatically.
- Benchmark runs must be manual, CI-explicit or development-only major-version
  checks. They must never auto-run in production.
- `logicn-tools-benchmark` must be disabled by default in production boot/package
  profiles. Even if explicitly overridden for a production validation window,
  it must not auto-run.
- GPU, low-bit AI and future accelerator tests must be optional and must report
  skipped or fallback status when unsupported.
- Public benchmark names and LogicN syntax must stay backend-neutral. BitNet may be
  selected as a low-bit backend, but benchmark categories should use
  `low_bit_ai`, `ternary_ai` or `quantized_ai`.
- Benchmark reports must omit hostname, username, project path, environment
  variables, secrets, private repo names and raw benchmark input data.
- Future benchmark sharing must be opt-in and must prepare an anonymous payload
  by default.
- Hash and byte-processing tests must be framed as generated-data throughput,
  checksum or validation tests, not password cracking, token guessing or
  malicious brute forcing.
- MD5, if benchmarked, must be labelled as a legacy checksum throughput test and
  not a secure-hashing recommendation.

## Project Graph Requirements

- `logicn-devtools-project-graph` must own project knowledge graph contracts for packages,
  documents, flows, types, effects, policies, reports, targets and decisions.
- Project graph tooling must be optional developer tooling and must not be
  required to compile or run LogicN applications.
- Project graph output may explain security and architecture relationships, but
  it must not replace compiler checks, runtime policy enforcement or security
  reports.
- Project graph scans must redact secrets by default.
- Project graph syntax and CLI commands must stay backend-neutral; `LogicN graph`
  must not become `LogicN graphify`.
- Graphify or any future graph tool must be represented as a swappable backend
  selected by policy, not as LogicN language syntax.
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

- `logicn-core-logic` must own `Tri`, `LogicN`, future Omni logic, multi-state truth
  tables, conversion rules and logic reports.
- `logicn-core-logic` must validate declared logic widths, state names, state
  indexes and truth-table coverage so malformed or incomplete logic definitions
  cannot silently become accepted semantics.
- `Tri` conversion helpers must require an explicit unknown policy. Unknown
  values must never become `true`, `Allow` or other grant states through an
  implicit conversion.
- `logicn-core-photonic` must own wavelength, phase, amplitude, optical signal,
  optical channel, photonic modelling and photonic simulation concepts.
- `logicn-core-photonic` may map logic states from `logicn-core-logic` to photonic
  representations, but it must not own the logic semantics.
- `logicn-core-vector` must own vector values, dimensions, lanes, vector operation rules
  and vector reports.
- `logicn-core-vector` must also own matrix, tensor, shape and numeric element contracts
  used by neural and compute workloads.
- `logicn-core-compute` must own compute planning, capability, budget, offload and target
  selection concepts.
- `logicn-ai` must own generic AI inference contracts, prompt/response shapes, model
  capability metadata, memory estimates, safety policy and AI reports.
- `logicn-ai-agent` must own typed agent definitions, tool permissions, agent limits,
  supervised task group plans, merge policies and agent reports.
- `logicn-ai-neural` must own neural-network model definitions, layers, activations,
  inference boundaries, training boundaries and neural reports.
- `logicn-ai-neuromorphic` must own spikes, spike trains, event signals, spiking model
  contracts and neuromorphic reports.
- `logicn-ai-lowbit` must own low-bit and ternary model references, GGUF metadata,
  quantization declarations, backend selection, CPU inference limits and low-bit
  AI inference reports.
- `logicn-target-binary` must own binary/native target planning and artefact
  metadata.
- `logicn-target-cpu` must own CPU capability, feature, thread, memory and fallback
  planning contracts.
- `logicn-cpu-kernels` must own CPU kernel contracts for GEMM, GEMV, vector dot
  products, matrix multiplication, low-bit operations, ternary operations,
  tiling and threading plans.
- `logicn-target-wasm` must own WebAssembly target planning, module metadata and
  import/export contracts.
- `logicn-target-gpu` must own GPU target planning, kernel mapping, precision and
  data movement reports.
- `logicn-target-ai-accelerator` must own NPU, TPU, AI-chip capability reports,
  precision support, model operation mapping plans and accelerator fallback
  reports.
- AI accelerator support must be passive and vendor-neutral. LogicN source syntax
  should use `ai_accelerator`, not vendor-specific targets such as `gaudi`.
- Vendor devices such as Intel Gaudi 3 must be represented as backend profiles
  selected by config, adapter policy or capability detection.
- AI accelerator profiles must report preferred workloads, supported
  precisions, memory tiers, framework adapters, topology, fallback target and
  warnings.
- Intel Gaudi 3 should be documented as an AI accelerator profile for LLM
  inference, fine-tuning, RAG, embeddings, multimodal AI and tensor batching,
  not as a normal CPU or GPU.
- First AI accelerator implementations should prefer controlled adapters over
  existing ecosystems such as PyTorch, vLLM, Hugging Face, DeepSpeed,
  TensorFlow or PyTorch Lightning before native backend work.
- `logicn-target-photonic` must own photonic backend target planning and may use
  `logicn-core-photonic` concepts.
- `optical_io` must be treated as a high-speed data-movement and interconnect
  target, not as a normal CPU, GPU or photonic compute target.
- Intel Silicon Photonics and OCI-style devices must be documented as optical
  connectivity for distributed compute, AI infrastructure, accelerator
  communication, GPU disaggregation and memory pooling.
- `logicn-core-compute` must model data movement as a first-class cost for optical I/O
  planning, including transfer size, data locality, target placement, fallback
  path and serialization format.
- Optical I/O reports must include detected interconnect, provider, bandwidth
  estimate, latency estimate, fallback path, largest transfers, compression or
  binary format use, remote memory status and security/encryption policy.
- Remote memory or memory-pool access over optical I/O must require typed access
  policy, bounds checks, timeout handling, fallback rules, audit logging and
  redacted reports.
- `logicn-tools-benchmark` should support a future `optical_io` benchmark target for
  latency, throughput, tensor transfer, schema-compressed transfer, remote
  memory read and fallback diagnostics.

## Compiler, Runtime, Security, Config and Report Requirements

- `logicn-core-compiler` must own compiler pipeline contracts for lexing, parsing, AST,
  checkers, IR, diagnostics, source maps and compiler reports.
- Until the full parser/checker exists, `logicn-core-compiler` must provide a
  conservative syntax safety scan for the frozen v1 core risks: direct Tri
  branch conditions, implicit Tri/Decision/Bool boundary assignments,
  non-exhaustive Tri matches, risky secure-flow unknown conversion, raw
  secret-like literals and unsafe dynamic execution forms.
- `logicn-core-runtime` must own execution contracts for checked and compiled LogicN code.
- `logicn-core-security` must own reusable security primitives, redaction rules,
  permission models, security diagnostics and security report contracts.
- Security primitives must represent sensitive values as redacted references in
  reports and diagnostics, not as raw secret values.
- Security helpers must provide reusable redaction, safe token/cookie/header
  references, permission decisions and cryptographic policy validation.
- Redaction helpers must fail closed by default when a rule is malformed, an
  input exceeds configured redaction limits or a replacement could re-emit the
  matched secret or surrounding context.
- Permission decisions must deny by default and must give matching deny grants
  precedence over matching allow grants. Default-allow and wildcard-allow
  models must be reportable diagnostics.
- `logicn-core-config` must own project config, environment mode and policy loading
  contracts.
- `logicn-core-config` must represent environment variables as safe references by name
  and metadata; it must not expose secret values in diagnostics or runtime
  handoff objects.
- `logicn-core-config` must provide production strictness checks for strict project mode,
  required environment variables and unsafe secret defaults.
- `logicn-core-config` must enforce production-disabled package defaults for
  development-only and benchmark packages, while supporting explicit reported
  production package overrides when policy allows them.
- `logicn-core-config` must validate the boundary between host package manifests
  and LogicN package manifests. LogicN package graph keys must not be accepted from
  `package.json`; they belong in `package-logicn.json`, `logicn.lock.json` or explicit
  LogicN config once those schemas exist.
- `logicn-core-reports` must own shared report schemas and report-writing contracts.
- Shared report contracts must include common metadata, generator metadata,
  diagnostic summaries and typed build, security, target, runtime, task and AI
  guide report shapes.
- Shared report contracts must include async/concurrency report shapes for
  Structured Await, including await sites, groups, missing timeout counts,
  unscoped task counts and structured-concurrency status.
- Shared report contracts should include storage and build-cache planning shapes
  for detected storage facts, unknown-storage fallback, conservative cache mode,
  cache hits, misses, bypasses, evictions and invalidations.
- Shared report contracts must include processing report shapes for resilient
  flows, partial success, retries, quarantined items and failure summaries.

## Storage-Aware Performance Requirements

- LogicN must not claim to support M.2, NVMe, SSDs or storage controllers directly.
  Operating systems, drivers, firmware and hardware controllers own physical
  storage access.
- LogicN may detect storage capability where available and use it to guide
  incremental compilation, IDE indexing, project graph scanning, large-file
  processing, JSON streaming, asset pipelines and diagnostics.
- Storage detection must degrade to `unknown` in containers, virtual machines,
  cloud volumes, network storage or restricted environments.
- Cache behavior must be conservative by default: bounded, rebuildable,
  content-addressed where practical, safe to bypass and safe to delete.
- Only deterministic, non-secret, rebuildable data may be cached automatically.
- LogicN must not automatically cache secrets, raw sensitive payloads, authorization
  decisions, non-deterministic results, database query results or external API
  responses.
- Application-level caching of database/API data must require explicit
  app/framework policy.
- Build and IDE caches must be invalidated by relevant source, config, package
  lock, tool version and policy changes.
- Large file and large JSON workflows should prefer streaming, bounded batches,
  read-only views and explicit clone/copy-on-write rules.
- Reports should show storage kind when known, unknown-storage fallback,
  recommended conservative cache mode, cache use, cache bypass and invalidation
  reasons.

## Structured Await Requirements

- LogicN must support `await` for effect-declared waits, but must not expose
  futures, promises, pinning, executors or manual polling as the normal
  application model.
- LogicN must support grouped waits through `await all`, race waits through
  `await race`, bounded stream processing through `await stream`, queue handoff
  through declared queue/job contracts and retry through explicit retry policy.
- Every task must belong to a scope. When a scope ends, unfinished child work
  must be cancelled, completed or handed off according to explicit policy.
- Pure functions must not use `await`.
- Awaiting external network or database work must require timeout policy in
  production profiles.
- Cancellation must be a normal declared policy, with modes such as
  `cancelOnError`, `waitForAll`, `firstSuccess`, `firstResult`,
  `timeoutCancel` and `manualCancel`.
- Hidden background work must be denied by default. Work that outlives a
  request must use a typed, reportable queue/job contract.
- Streams must declare bounded concurrency, backpressure policy and maximum
  in-flight work.
- Compiler diagnostics should warn when independent sequential awaits could use
  `await all`.
- Build and runtime reports should expose async behavior through deterministic
  async, await, concurrency, timeout and queue report entries.

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

- AI inference must be target-neutral at the `logicn-ai` layer.
- AI agents must declare input type, output type, tools, effects, permissions,
  memory budget, timeout, rate limits and failure behaviour.
- Parallel agents must run inside supervised task groups, queues, worker pools
  or equivalent runtime supervision.
- Agent outputs may inform decisions but must not directly authorize security,
  payment, access-control or deployment decisions.
- Neural-network support must live in `logicn-ai-neural`, not `logicn-core`.
- Neural workloads must use tensor shapes from `logicn-core-vector`, compute planning
  from `logicn-core-compute` and safety/report contracts from `logicn-ai`.
- Training flows must declare dataset reference, data policy, loss function,
  optimizer, epochs, batch size, memory limit and timeout.
- Neuromorphic support must live in `logicn-ai-neuromorphic`, separate from normal
  tensor neural networks.
- Low-bit AI support must be optional and must not be required by `logicn-core`.
- LogicN source syntax must use generic targets such as `low_bit_ai` and
  `ternary_ai`, not a backend name such as BitNet.
- BitNet should be treated as one optional backend for compatible low-bit AI
  inference when GPU, NPU or other accelerator targets are unavailable or not
  permitted.
- BitNet ternary weights and other model weight formats must not be treated as
  LogicN `Tri` truth semantics.
- AI inference declarations must include explicit model reference, context
  limit, output token limit, timeout, thread limit and memory estimate.
- AI output must be untrusted by default and must not directly authorize
  security, payment, access-control or other high-impact decisions.
- Compute target selection reports must record when `low_bit_ai` or
  `ternary_ai` was selected, which backend was used and why higher-preference
  targets were not selected.
- AI accelerator and photonic targets must be optional. CPU-compatible fallback
  must remain the baseline for LogicN developer workflows.

## Runtime Naming Requirement

- `logicn-framework-app-kernel` must remain the secure application boundary package.
- A future `logicn-core-runtime` package, if added, should be the LogicN execution engine for
  compiled or checked LogicN code.
- `logicn-framework-app-kernel` must not be renamed to `logicn-core-runtime`, because API policy and
  code execution are separate responsibilities.

## Out of Scope

- Product-specific app features before a product domain is selected.
- Full-framework behavior inside `logicn-core` or `logicn-framework-app-kernel`.
- Mandatory ORM, CMS, admin UI, template engine or frontend framework design.
- Treating project graph output as a security or compiler authority.
- Treating BitNet, Graphify or any named backend as LogicN language syntax.
- Treating neural networks, neuromorphic models or AI accelerators as mandatory
  core language features.
- Requiring future hardware for the baseline LogicN developer workflow.

## Success Criteria

- The root README and package docs explain the workspace clearly.
- Package boundaries are explicit and enforced through documentation and tests
  where code exists.
- Project graph outputs can be regenerated and used by AI tools.
- `LogicN task` can load, validate, dry-run and report safe task plans.
- Secrets are never committed or emitted in reports.
- A future app can add domain requirements without moving language or framework
  responsibilities into the wrong package.
