# LO Package Boundaries

This document explains which LO concepts belong in `lo-core` and which concepts
belong in sibling packages.

`lo-core` should stay focused on the language, compiler-facing syntax, core type
rules, safety model, report contracts and examples needed to describe the
language.

It should not absorb every future LO package.

## Package Ownership

```text
packages-lo/lo-core
  Bool
  Option
  Result
  basic flow syntax
  basic type rules
  effects syntax
  compiler diagnostics
  report contracts
  language examples

packages-lo/lo-compiler
  lexer
  parser
  AST
  checker pipeline
  IR
  diagnostics
  source maps
  compiler reports

packages-lo/lo-runtime
  checked execution
  compiled execution
  effect dispatch
  runtime memory policy
  runtime error handling
  runtime reports

packages-lo/lo-security
  SecureString helper model
  redaction primitives
  permission model types
  security diagnostics
  security report contracts

packages-lo/lo-config
  project config shape
  environment modes
  config validation diagnostics
  production policy loading

packages-lo/lo-reports
  shared report metadata
  shared diagnostics
  report schema contracts
  processing report contracts
  report writer contracts

packages-lo/lo-logic
  Tri
  Logic<N>
  Decision
  RiskLevel
  Omni logic
  multi-state logic rules
  conversion rules
  truth tables
  logic reports

packages-lo/lo-vector
  Vector<T, N>
  Matrix<T, R, C>
  Tensor<T, Shape>
  Shape
  numeric element contracts
  vector dimensions
  vector lanes
  vector operations
  tensor operations
  vector safety rules
  vector reports

packages-lo/lo-compute
  compute planning
  compute capabilities
  compute budgets
  offload planning
  fallback planning
  target selection
  compute reports

packages-lo/lo-ai
  AI model metadata
  prompt and response contracts
  inference options
  AI safety policy
  AI inference reports

packages-lo/lo-lowbit-ai
  low-bit model references
  GGUF model metadata
  low-bit and ternary quantization declarations
  backend selection contracts
  CPU low-bit inference plans
  low-bit inference reports

packages-lo/lo-agent
  agent definitions
  agent tool permissions
  agent limits
  supervised task group plans
  merge policies
  agent reports

packages-lo/lo-neural
  neural model definitions
  neural layers
  activation functions
  inference boundaries
  training boundaries
  neural reports

packages-lo/lo-neuromorphic
  Spike
  SpikeTrain
  EventSignal<T>
  spiking model contracts
  neuromorphic reports

packages-lo/lo-photonic
  Wavelength
  Phase
  Amplitude
  OpticalSignal
  OpticalChannel
  photonic simulation concepts
  logic-to-light vocabulary

packages-lo/lo-target-cpu
  CPU architecture metadata
  SIMD capability reports
  threading policy
  memory limits
  CPU fallback reports

packages-lo/lo-cpu-kernels
  GEMM and GEMV kernel contracts
  vector and matrix kernel plans
  low-bit operation contracts
  ternary operation contracts
  tiling and threading plans

packages-lo/lo-target-binary
  binary target metadata
  native artefact planning
  platform triples
  ABI requirements
  binary target reports

packages-lo/lo-target-wasm
  WASM target metadata
  WASM module output planning
  import/export contracts
  WASM target reports

packages-lo/lo-target-gpu
  GPU target capabilities
  GPU plan output
  kernel mapping plans
  precision and data movement reports

packages-lo/lo-target-ai-accelerator
  NPU and TPU target capabilities
  AI-chip target planning
  passive accelerator backend profiles
  precision compatibility reports
  accelerator memory and topology reports
  model operation mapping plans
  accelerator fallback reports

packages-lo/lo-target-photonic
  photonic backend target plans
  optical I/O interconnect plans
  photonic target capabilities
  optical interconnect capabilities
  logic-to-photonic lowering plans
  data movement reports
  photonic target reports

packages-lo/lo-app-kernel
  typed API boundary enforcement
  validation policy
  auth policy
  rate-limit policy
  idempotency and replay protection
  queue/job contracts
  runtime and audit reports

packages-lo/lo-api-server
  HTTP listening
  request normalisation
  route manifest loading
  server-level limits
  safe HTTP responses

packages-lo/lo-cli
  developer commands
  check/build/run/serve/report commands
  safe output formatting
  task command dispatch

packages-lo/lo-tasks
  safe project automation
  task effects and permissions
  dry run mode
  task reports
  unsafe shell gates

packages-lo/lo-benchmark
  benchmark configuration
  benchmark task definitions
  light/full/stress benchmark modes
  target fallback diagnostics
  privacy-safe benchmark reports
  shareable benchmark payload contracts

packages-lo/lo-project-graph
  project graph nodes and relationships
  package ownership maps
  documentation and decision links
  graph output manifests
  AI assistant map contracts
```

## Update Rule

When changing a concept, update the owning package first.

Examples:

```text
Tri conversion rule changes
  update packages-lo/lo-logic first
  update lo-core docs only if syntax or compiler checking changes

Vector lane rules
  update packages-lo/lo-vector first
  update lo-core docs only if language syntax changes

Compute target selection
  update packages-lo/lo-compute first
  update lo-core docs only if compute block syntax changes

AI inference contracts
  update packages-lo/lo-ai first
  update lo-core docs only if package registry or effect syntax changes

Low-bit AI backend
  update packages-lo/lo-lowbit-ai, packages-lo/lo-target-cpu or packages-lo/lo-cpu-kernels first
  update lo-core docs only if compute target syntax or report contracts change

Parallel AI agent orchestration
  update packages-lo/lo-agent first
  update packages-lo/lo-runtime only if structured concurrency contracts change
  update packages-lo/lo-security only if permission or tool safety contracts change
  update lo-core docs only if async/task_group/spawn syntax changes

Neural model or training boundary changes
  update packages-lo/lo-neural first
  update packages-lo/lo-vector only if tensor shape contracts change
  update lo-core docs only if language-level compute syntax changes

Neuromorphic event or spiking model changes
  update packages-lo/lo-neuromorphic first
  update target packages only if hardware planning changes

AI accelerator target changes
  update packages-lo/lo-target-ai-accelerator first
  update packages-lo/lo-compute only if target selection contracts change

AI accelerator vendor profile changes
  update docs/AI_ACCELERATOR_TARGETS.md and packages-lo/lo-target-ai-accelerator first
  update packages-lo/lo-benchmark only if benchmark target contracts change
  update lo-core docs only if target syntax or package registry contracts change

Photonic wavelength model
  update packages-lo/lo-photonic first
  update lo-core docs only if language-level target declarations change

Photonic backend lowering
  update packages-lo/lo-target-photonic first
  update lo-core docs only if target report contracts change

Optical I/O or interconnect planning
  update docs/OPTICAL_IO.md and packages-lo/lo-target-photonic first
  update packages-lo/lo-compute only if target selection or data movement contracts change
  update packages-lo/lo-benchmark only if benchmark target contracts change
  update lo-core docs only if target syntax or package registry contracts change

WASM or GPU target backend changes
  update packages-lo/lo-target-wasm or packages-lo/lo-target-gpu first
  update lo-core docs only if target syntax or report contracts change

Security primitive changes
  update packages-lo/lo-security first
  update lo-core docs only if language security syntax or compiler checks change

Runtime execution changes
  update packages-lo/lo-runtime first
  update lo-core docs only if language runtime contracts change

Resilient flow or controlled recovery changes
  update docs/RESILIENT_FLOWS.md first for workspace-level policy
  update packages-lo/lo-runtime first for supervision, retry and checkpoint behavior
  update packages-lo/lo-reports first for processing report shape changes
  update lo-core docs only if resilient/recover syntax changes

Compiler pipeline changes
  update packages-lo/lo-compiler first
  update lo-core docs only if language contracts or schemas change

Config or report shape changes
  update packages-lo/lo-config or packages-lo/lo-reports first
  update lo-core docs only if compiler output contracts change

CLI command behaviour
  update packages-lo/lo-cli first
  update lo-core docs only if compiler command contracts change

Safe task automation
  update packages-lo/lo-tasks first
  update lo-core docs only if package registry or task syntax changes

Benchmark diagnostics
  update packages-lo/lo-benchmark first
  update target packages only if capability detection contracts change
  update packages-lo/lo-reports only if shared report schemas change
  update lo-core docs only if benchmark syntax or package registry contracts change

Project knowledge graph tooling
  update packages-lo/lo-project-graph first
  update lo-core docs only if compiler reports or package registry contracts change
```

## Core Reference Policy

`lo-core` may reference sibling packages to explain boundaries, imports and
compiler report contracts.

`lo-core` should avoid owning package implementation details such as:

```text
HTTP server internals
auth provider implementation
task runner execution
benchmark runner implementation
project graph extraction implementation
photonic hardware backend code
binary emitter implementation
AI model runtime implementation
BitNet or other low-bit backend adapter implementation
vector runtime kernels
compute scheduler implementation
CLI command UX details
framework conventions
CMS/admin/frontend features
```

## Future Repository Split

The current workspace may keep packages in one root repository while boundaries
are still changing.

The future layout may split reusable packages into their own repository:

```text
light-framework/.git
light-framework/packages-lo/.git
```

When that split happens, `lo-core` docs should continue to reference sibling
packages by package name and path, but implementation details should remain in
the owning package repository.
