# LO Package Boundaries

This document explains which LO concepts belong in `lo-core` and which concepts
belong in sibling packages.

`lo-core` should stay focused on the language, compiler-facing syntax, core type
rules, safety model, report contracts and examples needed to describe the
language.

It should not absorb every future LO package.

## Package Ownership

```text
packages/lo-core
  Bool
  Option
  Result
  basic flow syntax
  basic type rules
  effects syntax
  compiler diagnostics
  report contracts
  language examples

packages/lo-compiler
  lexer
  parser
  AST
  checker pipeline
  IR
  diagnostics
  source maps
  compiler reports

packages/lo-runtime
  checked execution
  compiled execution
  effect dispatch
  runtime memory policy
  runtime error handling
  runtime reports

packages/lo-security
  SecureString helper model
  redaction primitives
  permission model types
  security diagnostics
  security report contracts

packages/lo-config
  project config shape
  environment modes
  config validation diagnostics
  production policy loading

packages/lo-reports
  shared report metadata
  shared diagnostics
  report schema contracts
  report writer contracts

packages/lo-logic
  Tri
  Logic<N>
  Decision
  RiskLevel
  Omni logic
  multi-state logic rules
  conversion rules
  truth tables
  logic reports

packages/lo-vector
  Vector<T, N>
  vector dimensions
  vector lanes
  vector operations
  vector safety rules
  vector reports

packages/lo-compute
  compute planning
  compute capabilities
  compute budgets
  offload planning
  fallback planning
  target selection
  compute reports

packages/lo-ai
  AI model metadata
  prompt and response contracts
  inference options
  AI safety policy
  AI inference reports

packages/lo-bitnet
  BitNet model references
  GGUF model metadata
  1.58-bit and ternary quantization declarations
  CPU BitNet inference plans
  BitNet inference reports

packages/lo-photonic
  Wavelength
  Phase
  Amplitude
  OpticalSignal
  OpticalChannel
  photonic simulation concepts
  logic-to-light vocabulary

packages/lo-target-cpu
  CPU architecture metadata
  SIMD capability reports
  threading policy
  memory limits
  CPU fallback reports

packages/lo-cpu-kernels
  GEMM and GEMV kernel contracts
  vector and matrix kernel plans
  low-bit operation contracts
  ternary operation contracts
  tiling and threading plans

packages/lo-target-binary
  binary target metadata
  native artefact planning
  platform triples
  ABI requirements
  binary target reports

packages/lo-target-wasm
  WASM target metadata
  WASM module output planning
  import/export contracts
  WASM target reports

packages/lo-target-gpu
  GPU target capabilities
  GPU plan output
  kernel mapping plans
  precision and data movement reports

packages/lo-target-photonic
  photonic backend target plans
  photonic target capabilities
  logic-to-photonic lowering plans
  photonic target reports

packages/lo-app-kernel
  typed API boundary enforcement
  validation policy
  auth policy
  rate-limit policy
  idempotency and replay protection
  queue/job contracts
  runtime and audit reports

packages/lo-api-server
  HTTP listening
  request normalisation
  route manifest loading
  server-level limits
  safe HTTP responses

packages/lo-cli
  developer commands
  check/build/run/serve/report commands
  safe output formatting
  task command dispatch

packages/lo-tasks
  safe project automation
  task effects and permissions
  dry run mode
  task reports
  unsafe shell gates
```

## Update Rule

When changing a concept, update the owning package first.

Examples:

```text
Tri conversion rule changes
  update packages/lo-logic first
  update lo-core docs only if syntax or compiler checking changes

Vector lane rules
  update packages/lo-vector first
  update lo-core docs only if language syntax changes

Compute target selection
  update packages/lo-compute first
  update lo-core docs only if compute block syntax changes

AI inference contracts
  update packages/lo-ai first
  update lo-core docs only if package registry or effect syntax changes

BitNet CPU fallback
  update packages/lo-bitnet, packages/lo-target-cpu or packages/lo-cpu-kernels first
  update lo-core docs only if compute target syntax or report contracts change

Photonic wavelength model
  update packages/lo-photonic first
  update lo-core docs only if language-level target declarations change

Photonic backend lowering
  update packages/lo-target-photonic first
  update lo-core docs only if target report contracts change

WASM or GPU target backend changes
  update packages/lo-target-wasm or packages/lo-target-gpu first
  update lo-core docs only if target syntax or report contracts change

Security primitive changes
  update packages/lo-security first
  update lo-core docs only if language security syntax or compiler checks change

Runtime execution changes
  update packages/lo-runtime first
  update lo-core docs only if language runtime contracts change

Compiler pipeline changes
  update packages/lo-compiler first
  update lo-core docs only if language contracts or schemas change

Config or report shape changes
  update packages/lo-config or packages/lo-reports first
  update lo-core docs only if compiler output contracts change

CLI command behaviour
  update packages/lo-cli first
  update lo-core docs only if compiler command contracts change

Safe task automation
  update packages/lo-tasks first
  update lo-core docs only if package registry or task syntax changes
```

## Core Reference Policy

`lo-core` may reference sibling packages to explain boundaries, imports and
compiler report contracts.

`lo-core` should avoid owning package implementation details such as:

```text
HTTP server internals
auth provider implementation
task runner execution
photonic hardware backend code
binary emitter implementation
AI model runtime implementation
BitNet adapter implementation
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
light-framework/packages/.git
```

When that split happens, `lo-core` docs should continue to reference sibling
packages by package name and path, but implementation details should remain in
the owning package repository.
