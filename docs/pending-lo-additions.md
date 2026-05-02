# LO Pending Additions

This document collects LO ideas that should be added to the documentation or
checked against the current repository.

The purpose is to avoid losing important concepts while the LO language and
documentation structure is being refined.

Status note:

```text
This file is a planning snapshot.
The live rolling tracker is docs/pending-additions.md.
```

---

## Summary

LO already has a strong concept around:

```text
strict types
memory safety
security-first design
JSON-native APIs
AI-friendly reports
source maps
compile and run modes
future GPU / photonic / ternary targets
```

The foLOwing items should be added, reviewed or confirmed in the repository.

---

## 1. Generated Outputs in Run Mode

Status: documented in `docs/run-and-compile-modes.md`; prototype support exists
for `LO run --generate`, `LO generate`, `LO dev` and `LO dev --watch`.

LO should be able to generate useful outputs even when the project is not
fully compiled.

A full production compile should still generate the complete build artefacts,
but development mode should also be able to generate reports, guides and
documentation from checked source.

Suggested commands:

```bash
LO run
LO run --generate
LO generate
LO dev
LO dev --watch
LO build
LO build --mode release
```

Current prototype command examples:

```bash
node compiler/LO.js run examples/hello.lo --generate --out .build-dev-run
node compiler/LO.js generate examples --exclude source-map-error.lo --out .build-dev
<<<<<<< Updated upstream
node compiler/LO.js dev examples/heLO.lo --out .build-dev
node compiler/LO.js dev examples/heLO.lo --watch --out .build-dev
=======
node compiler/LO.js dev examples/hello.lo --out .build-dev
>>>>>>> Stashed changes
node compiler/LO.js build examples --exclude source-map-error.lo --out build/examples
```

Command behaviour:

| Command | Runs App | Generates Docs/Reports | Produces Binary |
|---|---:|---:|---:|
| `LO run` | Yes | Optional | No |
| `LO run --generate` | Yes | Yes | No |
| `LO generate` | No | Yes | No |
| `LO dev` | Yes | Yes | No |
| `LO dev --watch` | Yes | Yes | No |
| `LO build` | Optional | Yes | Yes |
| `LO build --mode release` | No / optional | Yes | Yes |

Development generated outputs:

```text
.build-dev/
|-- app.ai-guide.md
|-- app.ai-context.json
|-- app.ai-context.md
|-- app.api-report.json
|-- app.failure-report.json
|-- app.global-report.json
|-- app.map-manifest.json
|-- app.memory-report.json
|-- app.openapi.json
|-- app.schemas.json
|-- app.security-report.json
|-- app.source-map.json
|-- app.tokens.json
`-- docs/
    |-- ai-summary.md
    |-- api-guide.md
    |-- deployment-guide.md
    |-- docs-manifest.json
    |-- global-registry-guide.md
    |-- memory-pressure-guide.md
    |-- run-compile-mode-guide.md
    |-- runtime-guide.md
    |-- security-guide.md
    |-- type-reference.md
    `-- webhook-guide.md
```

These are development outputs. They should explain the checked source without
requiring a production binary.

Production generated outputs:

```text
build/
|-- app.bin
|-- app.wasm
|-- app.browser.js
|-- app.gpu.plan
|-- app.photonic.plan
|-- app.ternary.sim
|-- app.omni-logic.sim
|-- app.openapi.json
|-- app.schemas.json
|-- app.api-report.json
|-- app.global-report.json
|-- app.runtime-report.json
|-- app.memory-report.json
|-- app.execution-report.json
|-- app.precision-report.json
|-- app.target-report.json
|-- app.security-report.json
|-- app.failure-report.json
|-- app.source-map.json
|-- app.map-manifest.json
|-- app.tokens.json
|-- app.ai-guide.md
|-- app.ai-context.json
|-- app.ai-context.md
|-- app.build-manifest.json
`-- docs/
    |-- ai-summary.md
    |-- api-guide.md
    |-- deployment-guide.md
    |-- docs-manifest.json
    |-- global-registry-guide.md
    |-- memory-pressure-guide.md
    |-- run-compile-mode-guide.md
    |-- runtime-guide.md
    |-- security-guide.md
    |-- type-reference.md
    `-- webhook-guide.md
```

Rule:

```text
Generated explanation should not require a production compile.
Production artefacts require a compile.
```

---

## 2. Unified Development Command

Status: documented in `docs/run-and-compile-modes.md`; prototype support exists
for one checked `LO dev` cycle and `LO dev --watch` can re-run that cycle when
`.lo` files change.

LO should have a single command for development.

Recommended:

```bash
LO dev
```

This should:

```text
check source
generate development outputs
update AI guide
update API docs
update schemas
run the app
watch for changes if requested
```

Prototype watch mode:

```bash
LO dev --watch
```

Suggested `LO dev` flow:

```text
read boot.lo
parse source files
type-check source
security-check source
check strict comments
check API/webhook contracts
generate development reports
generate AI guide
generate docs
run application
watch for changes if enabled
```

---

## 2A. Startup Validation

Status: documented in `docs/startup-validation.md`; full startup report,
environment validation, route/security policy checks and package permission
checks remain pending.

Core rule:

```text
LO must validate the project before main() runs.
```

Startup order:

```text
1. Read boot.lo
2. Validate project config
3. Validate imports and packages
4. Validate globals, env vars and secrets
5. Validate security policy
6. Validate routes/webhooks
7. Validate memory/vector/json policies
8. Load entry file
9. Run main()
```

---

## 3. AI Token Reduction

Status: documented in `docs/ai-token-reduction.md`; prototype support exists
for `LO ai-context`, `LO explain --for-ai` and `LO tokens`.

Core idea:

```text
Do not make AI read the whole project.
Make LO generate compact, trusted summaries from the code that actually compiled or checked successfully.
```

AI-friendly generated files:

```text
app.ai-guide.md
app.ai-context.json
app.ai-context.md
app.failure-report.json
app.source-map.json
app.map-manifest.json
app.tokens.json
app.api-report.json
app.security-report.json
```

Suggested commands:

```bash
LO ai-context
LO explain --for-ai
LO tokens
LO summarize
LO changed
```

Suggested config:

```LO
ai_context {
  token_budget 4000
  include_changed_files true
  include_routes true
  include_types true
  include_security_summary true
  include_strict_comments true
  exclude_generated_files true
  redact_secrets true
}
```

---

## 4. Memory and Variable Use

Status: documented in `docs/memory-and-variable-use.md`; prototype diagnostics
exist for explicit `Json.clone()` warnings and mutation through read-only
`&Json` parameters.

Core rule:

```text
LO should avoid hidden copies of large values.
```

Large immutable values such as JSON payloads should be passed by safe read-only
reference. They should remain local to the owning flow and be cleaned up when
no longer needed.

If a value must be modified, LO should use explicit mutation rules or
copy-on-write.

If a full copy is required, the developer must call:

```LO
clone()
```

explicitly.

Goals:

```text
no global variable dependency
no repeated 500kb copies
safe local lifetime
fast read-only sharing
explicit copies only
better memory control
```

Example:

```LO
secure flow handleWebhook(req: Request) -> Result<Response, WebhookError> {
  let payload: Json = req.json()

  verifySignature(&payload)
  let eventType: String = json.pick<String>(&payload, "$.type")
  processEvent(&payload)

  return JsonResponse({ "received": true })
}
```

Expected memory behaviour:

```text
payload loaded once
payload borrowed by read-only reference
no repeated 500kb copies
payload cleaned up when handleWebhook ends
```

---

## 5. Lazy Compact JSON

Status: documented in `docs/lazy-compact-json.md`; compiler/linter support
remains pending.

Core rule:

```text
Small JSON stays simple.
Read-only JSON is borrowed.
Dataset-style JSON can use repeated node shape optimisation.
Modified or duplicated JSON is checked before copying.
Compact only when the saving is worthwhile.
Patch instead of duplicating.
Stream when very large.
Keep compact format internal.
```

Compact conversion should be considered when:

```text
JSON is modified
JSON is duplicated
JSON is patched
JSON is redacted into a new value
JSON is transformed into another structure
JSON has repeated dataset-like node shapes
JSON is repeatedly accessed in memory-heavy ways
JSON exceeds a configured node threshold and would otherwise be copied
```

Repeated node shape example:

```json
[
  { "id": "1", "name": "A", "status": "active" },
  { "id": "2", "name": "B", "status": "active" },
  { "id": "3", "name": "C", "status": "active" }
]
```

Repeated shape:

```text
id, name, status
```

Internal compact concept:

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

Suggested policy:

```LO
json_policy {
  max_body_size 1mb
  max_depth 32
  duplicate_keys "deny"

  compact {
    mode "lazy"

    node_threshold 1000
    repeated_key_threshold 5
    min_saving "20%"

    trigger [
      "modified",
      "duplicated",
      "patched",
      "copy_pressure",
      "repeated_node_shapes"
    ]

    repeated_node_shapes {
      enabled true
      min_shape_reuse 5
      min_matching_keys 3
      min_dataset_nodes 100
      min_saving "20%"
    }

    key_interning true
    string_interning true
    shape_detection true
    copy_on_write true
  }
}
```

---

## 6. Pure Flow Caching

Status: documented in `docs/pure-flow-caching.md`; compiler checks remain
pending.

Core rule:

```text
Only deterministic, side-effect-free flows can be cached automatically.
```

Cache limit rule:

```text
calculate the result
return the result
do not store it in cache
record cache bypass
recommend better settings if useful
```

Example:

```LO
pure flow normalisePostcode(postcode: String) -> String
cache {
  scope process
  max_entries 10000
  memory_limit 8mb
  eviction "least_recently_used"

  on_limit {
    action "bypass_cache"
    report true
    recommend_increase true
  }
} {
  return postcode.trim().uppercase().replace(" ", "")
}
```

---

## 7. Memory Pressure and Disk Spill

Status: documented in `docs/memory-pressure-and-disk-spill.md`; prototype
runtime and memory reports exist.

Memory pressure ladder:

```text
1. Free short-lived finished values.
2. Evict eligible caches.
3. Bypass cache storage.
4. Apply backpressure to queues and channels.
5. Spill approved data to disk if configured.
6. Reject new work safely.
7. Fail gracefully before uncontrolled out-of-memory.
```

Spill rule:

```text
Only approved non-secret data may spill to disk.
```

ALOwed:

```text
large JSON stream buffers
dead-letter queue events
temporary batch-processing data
build cache data
non-secret pure-flow cache entries
large sort/transform intermediate data
```

Denied:

```text
SecureString values
API keys
payment tokens
session secrets
private keys
raw unredacted webhook payloads
live request context
database connections
file handles
network sockets
```

---

## 8. Omni Logic

Status: documented in `OMNI_LOGIC.md`, `docs/omni-logic.md`,
`docs/logic-widths.md` and `docs/logic-targets.md`; prototype emits
Omni-logic planning artefacts.

Core model:

```text
Bool       = two-state logic
Tri        = three-state logic
Decision   = business/security three-state logic
Logic<N>   = future multi-state logic
```

Rule:

```text
Do not hard-code three states into the language core.
Make three-way logic a standard logic domain.
Make multi-state logic a first-class extension point.
```

Example:

```LO
logic RiskLevel {
  VeryLow
  Low
  Review
  High
  Critical
}
```

---

## 9. Strict Global Registry

Status: documented in `docs/strict-global-registry.md`; prototype parsing,
global reports, generated registry docs and secret redaction checks exist.

Core rule:

```text
Local by default.
Global by declaration.
Mutable only by controlled state.
Secrets always protected.
```

Example:

```LO
globals {
  const APP_NAME: String = "OrderRiskDemo"
  const APP_VERSION: String = "0.1.0"

  config APP_PORT: Int = env.int("APP_PORT", default: 8080)
  config API_TIMEOUT: Duration = 5s

  secret PAYMENT_WEBHOOK_SECRET: SecureString = env.secret("PAYMENT_WEBHOOK_SECRET")
}
```

---

## 10. Strict Comments

Status: documented in `docs/strict-comments.md`; prototype extraction and basic
mismatch diagnostics exist.

Core rule:

```text
Strict comments are checked intent.
```

Example:

```LO
/// @purpose Handles payment provider webhook events.
/// @security HMAC must be verified before JSON decoding.
/// @effects [network.inbound, database.write]
/// @idempotency Required using $.id
/// @ai-risk Do not process event data before signature verification.
webhook PaymentWebhook {
  path "/webhooks/payment"
  method POST

  security {
    hmac_header "Payment-Signature"
    secret env.secret("PAYMENT_WEBHOOK_SECRET")
    max_age 5m
    max_body_size 512kb
    replay_protection true
  }

  idempotency_key json.path("$.id")
  handler handlePaymentWebhook
}
```

---

## 11. LO Compared with Python

Status: documented in `docs/LO-vs-python-and-generated-outputs.md`.

Best positioning:

```text
LO is designed for developers who want Python/Ruby-style readability,
but with strict types, memory-safe compiled deployment,
built-in API/security reports, AI-friendly project summaries,
and future accelerator planning.
```

LO differentiators:

```text
single binary deployment
strict types by default
explicit large value memory behaviour
Lazy Compact JSON
API/webhook contracts
security reports
AI token reduction
source maps
target reports
generated docs
```

---

## 11A. Kernel and Driver Development Boundary

Status: documented in `docs/kernel-and-driver-boundary.md`.

Core rule:

```text
Kernel and driver development is last-stage LO work.
It requires explicit maintainer or project permission.
It is not part of normal application, compiler prototype or target-planning work.
```

Blocked unless explicitly approved:

```text
kernel modules
operating-system drivers
privileged runtimes
raw hardware access
vendor SDK driver bindings
unsafe native bindings for devices
direct accelerator driver control
```

Docs and examples should not imply that LO already supports kernel or driver
development.

---

## 12. Missing Formal Language Files

Status: the original formal documentation bundle now exists. Remaining work is
depth, not file creation.

Present files include:

```text
SPEC.md
GOVERNANCE.md
COMPATIBILITY.md
docs/contracts.md
docs/modules-and-visibility.md
docs/standard-library.md
docs/error-codes.md
docs/compiler-backends.md
docs/testing.md
docs/observability.md
docs/interoperability.md
docs/kernel-and-driver-boundary.md
docs/xml-support.md
docs/graphql-support.md
```

Highest priority expansion:

```text
SPEC.md
docs/contracts.md
docs/modules-and-visibility.md
docs/standard-library.md
docs/package-use-registry.md
docs/vectorised-dataset-syntax.md
```

---

## 13. SPEC.md

Status: file exists. It should be expanded into official LO language rules.

It should include:

```text
keywords
file structure
comments
strict comments
types
flows
modules
imports
visibility
errors
effects
contracts
logic domains
compute blocks
API blocks
webhook blocks
run mode
compile mode
compiler reports
```

---

## 13A. Flow Keyword Rationale

Status: documented in `docs/syntax.md` and `docs/glossary.md`.

Core rule:

```text
In LO, a flow is the language's version of a function, but with extra meaning for security, effects, reports, rollback, AI context and target optimisation.
```

Reason:

```text
function = generic function
flow     = checked unit of behaviour that LO can analyse, map, report, secure, optimise and compile
```

Recommended syntax:

```LO
pure flow calculateVat(subtotal: Decimal) -> Decimal {
  return subtotal * 0.20
}

secure flow createOrder(req: Request) -> Result<Response, ApiError>
effects [network.inbound, database.write] {
  ...
}
```

---

## 14. Error Codes

Status: documented in `docs/error-codes.md`; prototype diagnostics include
standard LO codes, levels, categories, recovery actions and source locations.

Example families:

```text
LO-TYPE-001
LO-SEC-001
LO-JSON-001
LO-API-001
LO-WEBHOOK-001
LO-DOC-001
LO-CACHE-001
LO-MEM-001
LO-TARGET-001
LO-LOGIC-001
```

---

## 15. Contracts

Status: documented in `docs/contracts.md`; compiler checks remain pending.

Example:

```LO
secure flow shipOrder(order: Order) -> Result<Shipment, ShipmentError>
requires order.payment.status == Paid
ensures result.status == Shipped
effects [database.write, network.outbound] {
  ...
}
```

---

## 16. Modules and Visibility

Status: documented in `docs/modules-and-visibility.md`; package `import` vs
`use` direction is documented in `docs/package-use-registry.md`; compiler
support remains pending.

Possible model:

```text
module
export
internal
private
trait
impl
```

Example:

```LO
module Orders {
  export type Order {
    id: OrderId
    status: OrderStatus
  }

  export secure flow create(input: CreateOrderRequest) -> Result<Order, OrderError> {
    ...
  }

  internal flow calculateRisk(order: Order) -> RiskScore {
    ...
  }
}
```

---

## 17. Standard Library

Status: documented in `docs/standard-library.md`; contents remain draft.

Suggested modules:

```text
std.json
std.xml
std.graphql
std.http
std.crypto
std.env
std.log
std.time
std.math
std.matrix
std.file
std.database
std.queue
std.testing
std.security
```

---

## 18. Repository Structure Clarification

Status: captured in `COMPATIBILITY.md`.

The Git repository itself represents the LO package root.

Equivalent intended path:

```text
packages/LO/
```

But inside this repository, paths should be root-relative.

Correct:

```text
compiler/LO.js
examples/hello.lo
schemas/ai-context.schema.json
docs/type-system.md
```

Incorrect inside this repository:

```text
packages/LO/compiler/LO.js
packages/LO/examples/hello.lo
packages/LO/schemas/ai-context.schema.json
```

---

## 19. TODO.md Updates

Status: updated for current known files. Remaining TODOs should track
implementation depth, not document existence.

Pending implementation examples:

```text
borrow escape checks
Lazy Compact JSON compiler/linter checks
Lazy Compact JSON memory report schema
contracts compiler checks
modules and visibility compiler model
standard library specification detail
package registry parser support
vectorised dataset parser support
hybrid wavelength target planning
```

---

## 20. CHANGELOG.md Updates

Status: the changelog tracks added documents, prototype milestones and recent
documentation refreshes. Keep adding entries under `[Unreleased]`.

Recent concepts to keep represented:

```text
generated outputs in Run Mode and Dev Mode
unified LO dev command
startup validation before main()
AI token reduction
memory and variable use model
Lazy Compact JSON
Pure Flow Caching
Memory Pressure and Disk Spill
Omni Logic
LO vs Python positioning
Package Use Registry
Vectorised Dataset Syntax
Hybrid Logic and Wavelength Compute
```

---

## 21. Package Use Registry

Status: documented in `docs/package-use-registry.md`; parser support, package
registry validation, package permission checks and package reports remain
pending.

Core rule:

```text
Import local files.
Use approved packages.
Register packages in boot.lo.
Use packages explicitly in source files.
Report package permissions, hashes, usage and loading behaviour.
```

---

## 22. Vectorised Dataset Syntax

Status: documented in `docs/vectorised-dataset-syntax.md`; parser support,
type inference, vector reports and AI guide integration remain pending.

Core rule:

```text
Use `vectorize` where rows become columns.
Use `pure vector flow` when the whole flow is vector-preferred.
Use `pure vector required flow` only when vectorisation must succeed.
```

---

## 23. Hybrid Logic and Wavelength Compute

Status: documented in `docs/hybrid-logic-and-wavelength-compute.md` and
summarised in `README.md`; target planning docs are linked, while compiler
support remains pending.

Core rule:

```text
Use exact logic where correctness matters.
Use vector/accelerator logic where performance matters.
Use three-way logic where uncertainty matters.
Use wavelength logic only for suitable pure maths.
```

Safety direction:

```text
wavelength logic cannot perform file, network or database I/O
wavelength logic cannot handle secrets
wavelength logic cannot make final security decisions directly
analogue results must return to strict typed LO values
precision and tolerance must be declared
fallback must be declared
```

---

## 24. Hardware Feature Detection and Security

Status: documented in `docs/hardware-feature-detection-and-security.md`.

Core rule:

```text
LO source stays clean.
Compiler detects hardware features.
Build output selects the best safe target.
Fallback is always available.
Reports explain what was used.
```

Best practical early focus:

```text
CPU vectorisation for dataset analysis
GPU tensor planning for AI and vector workloads
control-flow protection where available
secret memory protection strategy
confidential deployment reports
GPU confidential compute policy
hardware feature reporting in app.target-report.json
```

This should remain target-planning and reporting work until real backends and
host capability probing exist.

---

## Final Principle

LO should become more than a language that runs code.

It should become a language/toolchain that can:

```text
run quickly during development
compile for production
generate trusted explanations
reduce AI token use
avoid hidden memory costs
handle JSON efficiently
produce security reports
produce source maps
produce API documentation
prepare for future compute targets
```

Final rule:

```text
Run fast while developing.
Generate explanations while checking.
Compile fully before deploying.
```
