# LO Core

LO, short for Logic Omni, is a strict, memory-safe, security-first programming
language concept for API-heavy, JSON-native, AI-readable and accelerator-aware
software.

This package contains the LO core language design, prototype compiler, examples,
schemas and detailed language documentation.

## Status

LO is currently a language-design and v0.1 prototype project.

The prototype CLI lives in `compiler/lo.js`. It can parse and check the
documented LO subset, run simple `.lo` files, generate reports, emit placeholder
build artefacts, and produce AI-readable context.

Useful commands from this package root:

```bash
npm run check
npm test
npm run build:examples
npm run verify -- build/examples
npm run generate:dev
npm run dev
node compiler/lo.js run examples/hello.lo --generate
```

The prototype is not a production compiler. CPU-compatible checked execution is
the practical baseline. GPU, photonic, ternary and Omni-logic outputs are
planning, simulation or compatibility-report artefacts until real backends exist.

## Layer Boundary

LO core is the language, compiler and standard safety contract. It may define
syntax, type-checking rules and report contracts, but specialised package
semantics should live in sibling packages.

Package ownership:

```text
packages/lo-core/
  Bool, Option, Result, basic flow syntax, basic type rules, compiler contracts

packages/lo-compiler/
  lexer, parser, AST, checker pipeline, IR, diagnostics, source maps, compiler reports

packages/lo-runtime/
  checked execution, compiled execution, effect dispatch, runtime errors, runtime reports

packages/lo-security/
  SecureString helpers, redaction primitives, permission models, security reports

packages/lo-config/
  project config, environment modes, config validation, production policy loading

packages/lo-reports/
  shared report metadata, diagnostics, schemas and writer contracts

packages/lo-logic/
  Tri, Logic<N>, Decision, RiskLevel, Omni logic, truth tables, logic reports

packages/lo-vector/
  Vector<T, N>, lanes, dimensions, vector operations and vector reports

packages/lo-compute/
  compute planning, capabilities, budgets, offload and target selection

packages/lo-ai/
  generic AI inference contracts, model metadata, safety policy, AI reports

packages/lo-bitnet/
  BitNet-style 1.58-bit / ternary AI model references and CPU inference plans

packages/lo-photonic/
  Wavelength, Phase, Amplitude, OpticalSignal, OpticalChannel

packages/lo-target-cpu/
  CPU capability detection, SIMD features, threading and fallback reports

packages/lo-cpu-kernels/
  optimized CPU kernel contracts for vector, matrix, low-bit and ternary work

packages/lo-target-binary/
  binary/native target planning and artefact metadata

packages/lo-target-wasm/
  WebAssembly target planning, module metadata and import/export contracts

packages/lo-target-gpu/
  GPU target planning, kernel mapping, precision and data movement reports

packages/lo-target-photonic/
  photonic backend target plans using lo-photonic concepts
```

Detailed package-boundary guidance lives in
`docs/package-boundaries.md`.

Runtime enforcement for application request handling belongs in the optional LO
Secure App Kernel package in the surrounding workspace:

```text
packages/lo-app-kernel/
```

HTTP API serving belongs in the built-in API server package:

```text
packages/lo-api-server/
```

The intended layering is:

```text
LO Core
  language, compiler, type system, effects, memory safety, compute planning, reports

LO Compiler / Runtime / Security / Config / Reports
  compiler pipeline, execution, shared security, configuration and report contracts

LO Logic / Vector / Compute / AI / Photonic / Target Packages
  specialised LO concepts and target planning outside the core language package

LO Standard Library
  Json, Xml, SafeHtml, File, Stream, Request, Response, DateTime, Money, SecureString

LO Secure App Kernel
  optional runtime layer for APIs, validation, auth, rate limits, jobs and reports

LO API Server
  built-in HTTP API server that loads route manifests and calls the app kernel

Full Frameworks
  CMS, admin panels, UI systems, templates, ORM, page builders and frontend adapters
```

LO core may define syntax, checks and reports for safe API, webhook, job and
security contracts. The Secure App Kernel enforces those contracts at runtime
when an application opts into it. `lo-api-server` provides the default HTTP
transport for API services by loading route manifests, normalising requests and
passing them to the kernel. Full frameworks provide opinionated application
structure above or beside the kernel.

LO core must not become a Laravel, Django, React or WordPress-style framework.

## Core Goals

LO should provide:

```text
strict typing
explicit missing values
explicit errors
memory safety
security-first defaults
typed JSON decoding
API and webhook contracts
source maps
machine-readable reports
AI-readable project context
multi-target planning
CPU compatibility by default
AI inference as an optional package layer
GPU planning
photonic planning
ternary and Omni-logic simulation
```

LO should avoid:

```text
undefined
silent null
truthy/falsy conditions
implicit type coercion
hidden exceptions as the default error model
raw pointers in normal code
compiled secrets
silent target fallback
framework-specific native syntax
mandatory future hardware
```

## Backend Language Roadmap

The backend language gap analysis identifies the highest-value additions for
LO core:

| Priority | Direction |
|---|---|
| 1 | Language editions and compatibility rules |
| 2 | Final `Bool`, `Tri`, `Decision` and `Logic<N>` conversion rules |
| 3 | Algebraic variants, sealed state and exhaustive `match` |
| 4 | Generic constraints, traits or protocols |
| 5 | Structured concurrency, cancellation and streams |
| 6 | Deterministic resource cleanup |
| 7 | Safe compile-time metadata and attributes |
| 8 | C ABI and foreign-call boundaries |
| 9 | Matrix/vector shape rules with scalar fallback |
| 10 | Stable diagnostics and AI report schemas |

Detailed analysis lives in `docs/backend-language-gap-analysis.md`.

## File Extension

LO source files use `.lo`.

Examples:

```text
boot.lo
main.lo
order-service.lo
fraud-check.lo
payment-webhook.lo
```

The recommended project entry file is `boot.lo`. Simple scripts may use
`main.lo` or a single named `.lo` file.

## Example Script

```LO
secure flow main() -> Result<Void, Error> {
  print("hello from LO")
  return Ok()
}
```

Run:

```bash
node compiler/lo.js run examples/hello.lo
```

Short scripts should still use secure defaults:

```text
strict types enabled
memory safety enabled
undefined denied
silent null denied
unsafe denied
source maps enabled
CPU target enabled
```

## Example API Contract

```LO
api OrdersApi {
  POST "/orders" {
    request CreateOrderRequest
    response CreateOrderResponse
    errors [ValidationError, PaymentError]
    timeout 5s
    max_body_size 1mb
    handler createOrder
  }
}

secure flow createOrder(input: CreateOrderRequest) -> Result<CreateOrderResponse, ApiError>
effects [database.write] {
  ...
}
```

LO core checks the contract. A kernel-backed runtime can enforce request
validation, auth, limits, idempotency and typed handler dispatch.

The built-in `lo-api-server` package can serve the compiled API route manifest
over HTTP, but it should not own auth policy, business logic, persistence,
frontend rendering or framework conventions.

## Example Compute Block

```LO
data = readFile("./data.json")

compute target best verify cpu_reference {
  prefer photonic
  fallback gpu
  fallback cpu

  result = fraudModel(data)
}
```

Compute blocks should contain pure compute work. I/O should happen outside the
compute block and be passed in as strict typed data.

## Repository Structure

This package is the LO core package root.

```text
lo-core/
|-- README.md
|-- ABOUT.md
|-- CONCEPT.md
|-- SPEC.md
|-- COMPATIBILITY.md
|-- REQUIREMENTS.md
|-- DESIGN.md
|-- ARCHITECTURE.md
|-- SECURITY.md
|-- AI-INSTRUCTIONS.md
|-- GETTING_STARTED.md
|-- ROADMAP.md
|-- TASKS.md
|-- CHANGELOG.md
|-- package.json
|-- compiler/
|   `-- prototype CLI, parser, checker and report generation
|-- examples/
|   `-- LO example source files
|-- grammar/
|   `-- grammar and token definitions
|-- schemas/
|   `-- report and generated schema contracts
|-- docs/
|   `-- detailed language design documents
`-- build/
    `-- generated build artefacts
```

Generated folders such as `build/` and `.build-dev/` are ignored by default.

## Build Outputs

LO builds should be able to produce:

```text
app.bin
app.wasm
app.gpu.plan
app.photonic.plan
app.ternary.sim
app.omni-logic.sim
app.openapi.json
app.api-report.json
app.security-report.json
app.target-report.json
app.precision-report.json
app.memory-report.json
app.execution-report.json
app.failure-report.json
app.source-map.json
app.map-manifest.json
app.ai-guide.md
app.ai-context.json
app.build-manifest.json
```

Compiled artefacts are not secrets. Real secrets must remain outside compiled
files in environment variables, secret managers or deployment configuration.

## AI Support

LO should reduce the amount of source code that developers need to paste into AI
tools.

```bash
node compiler/lo.js ai-context examples --out build/examples
node compiler/lo.js explain examples/source-map-error.lo --for-ai
```

AI reports must be compact, deterministic, source-mapped and free of secrets.

## Non-Goals

LO core should not:

```text
replace every programming language
require photonic hardware
provide a full MVC framework
provide a CMS or admin dashboard
provide frontend component syntax
make JSON loosely typed
make unsafe memory normal
hide errors behind runtime magic
compile secrets into output files
```

## Licence

LO / Logic Omni is licensed under the Apache License 2.0. See `LICENSE`,
`LICENCE.md` and `NOTICE.md`.
