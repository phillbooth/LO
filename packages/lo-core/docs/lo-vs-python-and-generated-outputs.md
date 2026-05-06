# LO Compared with Python and Generated Build Outputs

This document explains where **LO / Logic Omni** could sensibly offer advantages over Python, and lists the generated outputs that LO should produce during a successful build.

LO is not intended to replace Python for every use case. Python is excellent for scripting, automation, data science, education, AI experimentation and fast development.

LO should be positioned differently:

```text
Python is excellent for fast development and ecosystem access.

LO should be better for strict, compiled, memory-safe, security-first,
API-heavy, JSON-heavy and accelerator-aware systems.
```

---

## Summary

LO should focus on areas where Python is less naturally suited:

```text
single binary deployment
strict typing by default
explicit memory behaviour
large JSON memory control
security-first APIs and webhooks
compiler-generated reports
AI-readable project summaries
source-mapped build outputs
GPU / photonic / ternary target planning
self-documenting successful builds
```

The strongest LO idea is not simply:

```text
LO is faster than Python.
```

The stronger idea is:

```text
LO produces compiled, checked, documented and explainable software.
```

---

## Practical LO Advantage

Python usually relies on:

```text
interpreter
virtual environment
runtime packages
framework conventions
third-party type checking
third-party documentation tooling
third-party security tooling
```

LO should aim to make many of these concerns first-class.

A successful LO build should be able to generate:

```text
compiled output
source maps
security reports
API reports
target reports
memory reports
AI guides
map manifests
generated documentation
build manifests
```

This means LO can make the application easier to:

```text
deploy
audit
debug
explain
review
document
optimise
share with AI tools
```

---

## What LO Could Sensibly Do Better Than Python

### 1. Single Deployable Binary

LO should be able to compile a project into a deployable binary.

Example:

```bash
LO build --mode release
```

Possible output:

```text
build/app.bin
```

This gives LO a deployment model closer to Go or Rust.

Python can be packaged, but it usually depends on a Python runtime, environment management and dependency packaging.

---

### 2. Strict Types by Default

LO should reject loose type behaviour.

Bad:

```LO
let total = "10" + 5
```

Good:

```LO
let total: Int = toInt("10") + 5
```

Python can use type hints, but they are not enforced in the same way by the runtime.

LO should make strict typing part of the language contract.

---

### 3. Explicit Large Value Memory Behaviour

LO should avoid hidden copies of large values.

Example:

```LO
secure flow handleWebhook(req: Request) -> Result<Response, WebhookError> {
  let payload: Json = req.json()

  verifySignature(&payload)
  processEvent(&payload)

  return JsonResponse({ "received": true })
}
```

Expected memory behaviour:

```text
payload loaded once
payload borrowed by read-only reference
no repeated 500kb copies
payload cleaned up when the owning flow ends
```

LO should require explicit copying:

```LO
let copy: Json = payload.clone()
```

This makes memory-heavy behaviour visible.

---

### 4. Lazy Compact JSON

LO should support memory-aware JSON handling.

For small JSON:

```json
{
  "id": "foo",
  "name": "moo"
}
```

LO should keep the normal representation.

For dataset-style JSON:

```json
[
  { "id": "1", "name": "A", "status": "active" },
  { "id": "2", "name": "B", "status": "active" },
  { "id": "3", "name": "C", "status": "active" }
]
```

LO can detect repeated node shapes:

```text
id, name, status
```

and internally use a compact schema-backed representation.

Example internal idea:

```text
schema:
  1 = id
  2 = name
  3 = status

rows:
  ["1", "A", "active"]
  ["2", "B", "active"]
  ["3", "C", "active"]
```

This would reduce memory for large JSON datasets, repeated API payloads, batch imports and webhook batches.

---

### 5. API and Webhook Contracts as First-Class Language Features

LO should make API and webhook contracts part of the language.

Example:

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
```

This can generate:

```text
OpenAPI output
API guide
API report
schema files
AI context
security report
```

Python frameworks can do some of this, but LO can make it part of the compiler and build model.

---

### 6. Security Reports

LO should detect and report security problems.

Examples:

```text
SecureString logged
webhook missing HMAC verification
API route missing timeout
large JSON cloned repeatedly
unknown payment state mapped to ALOw
cache storing secrets
compute block using file/network access
```

This should be included in:

```text
build/app.security-report.json
```

---

### 7. AI Token Reduction

LO should reduce AI token use by generating compact project summaries.

Instead of asking an AI assistant to read every source file, LO should generate:

```text
app.ai-guide.md
app.ai-context.json
app.failure-report.json
app.source-map.json
app.map-manifest.json
app.tokens.json
```

Core rule:

```text
Do not make AI read the whole project.
Make LO generate compact, trusted summaries from the code that actually compiled.
```

This is one of LO's strongest differentiators.

---

## Generated Outputs Listed by LO

A successful LO build should be able to generate the foLOwing outputs.

```text
build/
├── app.bin
├── app.wasm
├── app.gpu.plan
├── app.photonic.plan
├── app.ternary.sim
├── app.openapi.json
├── app.api-report.json
├── app.target-report.json
├── app.security-report.json
├── app.failure-report.json
├── app.source-map.json
├── app.map-manifest.json
├── app.ai-guide.md
├── app.ai-context.json
├── app.build-manifest.json
└── docs/
    ├── api-guide.md
    ├── webhook-guide.md
    ├── type-reference.md
    ├── security-guide.md
    ├── deployment-guide.md
    ├── ai-summary.md
    └── docs-manifest.json
```

---

## Output Explanation

| Output | Purpose |
|---|---|
| `app.bin` | Normal CPU binary output |
| `app.wasm` | WebAssembly output |
| `app.gpu.plan` | GPU execution plan or future GPU target output |
| `app.photonic.plan` | Photonic execution plan or future photonic target output |
| `app.ternary.sim` | Ternary / 3-way simulation output |
| `app.openapi.json` | Generated OpenAPI contract for API projects |
| `app.api-report.json` | API route, schema and contract report |
| `app.target-report.json` | Explains target checks, failures and fallbacks |
| `app.security-report.json` | Explains security checks and project rules |
| `app.failure-report.json` | Explains compile, runtime or target failures |
| `app.source-map.json` | Maps compiled errors back to original `.lo` files and lines |
| `app.map-manifest.json` | Maps source files, routes, webhooks, types and compute blocks to generated artefacts |
| `app.ai-guide.md` | Generated AI guide for the exact successful build |
| `app.ai-context.json` | Compact AI-readable project context |
| `app.build-manifest.json` | Build version, hashes, targets and deployment metadata |
| `docs/api-guide.md` | Generated API documentation |
| `docs/webhook-guide.md` | Generated webhook documentation |
| `docs/type-reference.md` | Generated type reference |
| `docs/security-guide.md` | Generated security guide |
| `docs/deployment-guide.md` | Generated deployment guide |
| `docs/ai-summary.md` | Generated AI-friendly summary |
| `docs/docs-manifest.json` | Manifest of generated documentation |

---

## Why These Outputs Matter

These outputs make LO different from many scripting-first languages.

A compiled LO application should not just produce an executable.

It should also produce:

```text
proof of what was built
proof of what was checked
documentation for what was exposed
source maps for debugging
AI context for support
security reports for review
target reports for deployment
```

This supports the LO principle:

```text
If LO can compile it, LO should be able to explain it.
```

---

## AI Guide Rule

The AI guide should only update after a successful compile.

Recommended rule:

```text
If the code compiles, the AI guide should describe the code that actually compiled.
```

Failed builds should generate:

```text
app.failure-report.json
```

and optionally:

```text
app.ai-failure-guide.md
```

but should not overwrite the last valid AI guide unless the project explicitly aLOws it.

---

## Compared with Python

Python can do many things through frameworks, packages and tooling.

LO should aim to provide more of these features directly through the language/compiler.

| Capability | Python | LO Aim |
|---|---|---|
| Quick scripting | Excellent | Supported through `LO run` |
| Strict type enforcement | Optional tooling | Built-in |
| Single binary deployment | Not natural | Core production target |
| Source-mapped compiled errors | Not central | Core requirement |
| API contract generation | Framework-dependent | First-class |
| Webhook security checks | Framework/custom | First-class |
| AI context generation | Manual/custom | Build output |
| Large JSON copy control | Manual discipline | Language/toolchain rule |
| Target planning | External libraries | Compiler reports |
| Security reports | External tooling | Build output |

---

## What LO Should Not Claim

LO should not claim:

```text
LO replaces Python everywhere.
LO is better than Python for all use cases.
LO has Python's ecosystem.
LO has production-ready photonic hardware support today.
LO automatically makes all software secure.
```

Better claim:

```text
LO is designed for developers who want Python/Ruby-style readability,
but with strict types, memory-safe compiled deployment,
built-in API/security reports, AI-friendly project summaries,
and future accelerator planning.
```

---

## Best LO Positioning

LO should be positioned as:

```text
A strict, memory-safe, security-first language for JSON/API-heavy systems,
compiled deployment, generated documentation, AI-readable build outputs
and future accelerator-aware workloads.
```

The strongest differentiator is:

```text
LO makes compiled software self-explaining.
```

A successful build should produce:

```text
the executable
the source maps
the reports
the API docs
the security evidence
the target explanation
the AI guide
```

That is a sensible and practical difference from Python.
