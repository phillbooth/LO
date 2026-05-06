# LO Pending Additions

This document collects LO ideas that should be added to the documentation or checked against the current repository.

The purpose is to avoid losing important concepts while the LO language and documentation structure is being refined.

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

Status: documented in `docs/run-and-compile-modes.md`; prototype support exists for `LO run --generate`, `LO generate`, `LO dev` and `LO dev --watch`.

LO should be able to generate useful outputs even when the project is not fully compiled.

A full production compile should still generate the complete build artefacts, but development mode should also be able to generate reports, guides and documentation from checked source.

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

Rule:

```text
Generated explanation should not require a production compile.
Production artefacts require a compile.
```

---

## 2. Unified Development Command

Status: prototype support exists for a checked generate-and-run cycle, including `LO dev --watch` for re-running that cycle when `.lo` files change.

Recommended command:

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

## 2B. Safe Pattern Matching and Regex

Status: documented in `docs/safe-pattern-matching-and-regex.md` and
`docs/sytax/patterns-and-regex.md`, with usage examples in
`docs/sytax-examples/patterns-and-regex.md`; parser support, safe engine
integration, UnsafeRegex production gates, pattern reports and denied-feature
diagnostics remain pending.

Core rule:

```text
Pattern is safe, fast and default.
UnsafeRegex is advanced, explicit and audited.
Default regex must be bounded and ReDoS-resistant.
```

Pending implementation examples:

```text
parse Pattern declarations
parse pattern_policy
parse unsafe regex blocks
parse pattern_set blocks
define denied feature diagnostics
define compile-inside-loop warnings
define pattern report schema
define pattern map-manifest entries
define UnsafeRegex production gates
integrate or wrap a safe pattern engine
```

Documentation rule:

```text
When pattern syntax changes, update docs/sytax/patterns-and-regex.md.
When pattern examples change, update docs/sytax-examples/patterns-and-regex.md.
```

---

## 3. AI Token Reduction

Status: documented in `docs/ai-token-reduction.md`; prototype includes `LO ai-context`, `LO explain --for-ai` and token reports.

Core idea:

```text
Do not make AI read the whole project.
Make LO generate compact, trusted summaries from the code that actually compiled or checked successfully.
```

AI-friendly generated files:

```text
app.ai-guide.md
app.ai-context.json
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

---

## 4. Memory and Variable Use

Status: documented in `docs/memory-and-variable-use.md`; prototype has initial `Json.clone()` and read-only `&Json` mutation diagnostics.

Core rule:

```text
LO should avoid hidden copies of large values.
```

Goals:

```text
no global variable dependency
no repeated 500kb copies
safe local lifetime
fast read-only sharing
explicit copies only
better memory control
```

---

## 5. Lazy Compact JSON

Status: documented in `docs/lazy-compact-json.md`; compiler/linter checks and memory report schema remain pending.

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

---

## 6. Pure Flow Caching

Status: documented in `docs/pure-flow-caching.md`; deeper compiler support remains pending.

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

---

## 7. Memory Pressure and Disk Spill

Status: documented in `docs/memory-pressure-and-disk-spill.md`; prototype emits memory and runtime reports.

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

---

## 8. Omni Logic

Status: documented in `OMNI_LOGIC.md`, `docs/omni-logic.md`, `docs/logic-widths.md` and `docs/logic-targets.md`; prototype has initial logic mode/width checks.

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

---

## 9. Strict Global Registry

Status: documented in `docs/strict-global-registry.md`; prototype parses globals and emits global reports.

Core rule:

```text
Local by default.
Global by declaration.
Mutable only by controlled state.
Secrets always protected.
```

---

## 10. Strict Comments

Status: documented in `docs/strict-comments.md`; prototype extracts strict comments and reports mismatches.

Core rule:

```text
Strict comments are checked intent.
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

---

## 11A. Primary Lane and Offload Nodes

Status: documented in `docs/primary-lane-and-offload-nodes.md`; compiler/runtime syntax and budget checks remain pending.

Core rule:

```text
Primary lane stays responsive.
Offload nodes handle bounded background work.
CPU and memory budgets are explicit.
Failures are reported.
Security-critical work stays on the primary lane unless explicitly and safely awaited.
```

Purpose:

```text
Main task stays on the primary CPU lane.
Repetitive/background/heavy tasks are pushed to smaller worker CPU nodes.
The compiler/runtime controls how much CPU those workers are aLOwed to use.
```

---

## 11B. Frontend Compilation Targets

Status: documented in `docs/frontend-compilation-js-wasm.md`; browser target syntax, JavaScript output and hybrid WebAssembly wrapper support remain pending.

Core model:

```text
JavaScript target for browser interaction.
WebAssembly target for heavy compute.
Hybrid target for real-world frontend apps.
```

Browser output must block server-only imports, private environment access and secrets because compiled frontend code is public.

---

## 11B.1. Browser, DOM and Web Platform Primitives

Status: documented in `docs/browser-dom-and-web-platform-primitives.md`;
SafeHtml, DOM effects, browser permission policy, fetch/storage/cookie policy,
push/service worker primitives, browser security reports and AI guide summaries
remain pending.

Core rule:

```text
LO provides safe browser/web primitives.
Frameworks provide UI structure and developer opinions.
Browsers provide the actual Web APIs.
```

Pending implementation examples:

```text
define SafeHtml and safe HTML policy schema
define dom.read/dom.write effect checking
define browser permission policy schema
define browser fetch/storage/cookie policy schemas
define typed browser event syntax
define typed form validation syntax
define push notification and service worker report schemas
define browser security report schema
define browser map-manifest entries
define AI guide browser summary output
```

---

## 11C. Hybrid Scalar + Vector Model

Status: documented in `docs/vector-model.md` and
`docs/vectorised-dataset-syntax.md`; parser support, scalar fallback lowering,
security checks and vector reports remain pending.

Core rule:

```text
Scalar-first for workflows and side effects.
Vector-aware for repeated safe calculations.
Pure vector blocks by default.
Side effects blocked by default.
Scalar fallback for backwards compatibility.
Compiler reports every vector decision.
```

Tagline:

```text
LO is scalar-first, vector-aware, and security-first.
```

Dataset syntax direction:

```text
Use `vectorize rows { ... }` where row data becomes typed vector columns.
Use `pure vector flow` when an entire flow is vector-preferred.
Use `pure vector required flow` when vectorisation must succeed.
```

---

## 11C.0. Simple Vector Syntax and Compute Auto

Status: documented in `docs/simple-vector-and-compute-auto.md`; parser support, target selection implementation and runtime hardware detection remain pending.

Core rule:

```text
Keep normal code simple.
Hide hardware-specific vector details behind type aliases, models and reports.
Use `compute auto` to choose the best available safe target.
Report fallback and precision decisions.
```

Syntax direction:

```text
pure vector flow
pure vector float flow
pure vector decimal flow
pure vector required flow
compute auto
compute target photonic_mzi required
```

Pending implementation examples:

```text
parse compute auto
parse pure vector float/decimal/required modifiers
load boot.lo compute preference order
emit compute auto target selection reports
emit AI guide compute auto summaries
detect photonic_mzi target capability
```

---

## 11C.1. Hybrid Logic and Wavelength Compute

Status: documented in `docs/hybrid-logic-and-wavelength-compute.md`; compiler
support, target reports, wavelength syntax and analogue precision schemas remain
pending.

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

## 11C.2. Hardware Feature Detection and Security

Status: documented in `docs/hardware-feature-detection-and-security.md`;
backend probing, target selection rules, runtime enforcement and report schemas
remain pending.

Core rule:

```text
LO source stays clean.
Compiler detects hardware features.
Build output selects the best safe target.
Fallback is always available.
Reports explain what was used.
```

Recommended early focus:

```text
CPU vectorisation for dataset analysis
GPU tensor planning for AI/vector workloads
control-flow protection where available
secret memory protection strategy
confidential deployment reports
hardware feature reporting in app.target-report.json
```

---

## 11C.3. Backend Compute Support Targets

Status: documented in `docs/backend-compute-support-targets.md`; target discovery, capability maps, parser support and expanded target reports remain pending.

The backend target catalogue includes:

```text
CPU and CPU SIMD/vector targets
GPU targets and APIs
AI accelerators such as TPU, Trainium, Inferentia and NPU-style targets
photonic targets such as photonic_mzi, photonic_wdm and photonic_interconnect
hybrid CPU/GPU and memory/interconnect targets
```

Pending implementation examples:

```text
parse compute auto
parse target chains with ai_accelerator and memory_interconnect
detect CPU/GPU/AI/photonic target capabilities
report target calibration/health/precision/fallback status
estimate data movement cost
expand app.target-report.json schema for backend target catalogue
```

---

## 11D. Target and Capability Model

Status: documented in `docs/target-and-capability-model.md`; feature status labels, browser target syntax, capability block syntax, import classification, browser import blocking and target/capability reporting have initial prototype support.

Core rule:

```text
Target decides capability.
Capability decides aLOwed imports.
ALOwed imports decide what code may compile.
Fallback decides what happens when the preferred target cannot run the code.
Reports explain every decision.
```

Recommended next milestone:

```text
expand browser target checks into compiled examples and JavaScript output
```

---

## 11D.1. Kernel and Driver Development Boundary

Status: documented in `docs/kernel-and-driver-boundary.md`; implementation work
is blocked by default.

Core rule:

```text
Do kernel and driver work last.
Do it only with explicit maintainer or project permission.
Do not start design, examples, code, bindings or backend work for it by default.
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

Recommended next milestone:

```text
keep documenting native bindings as denied by default
do not add kernel or driver work to early prototype milestones
```

---

## 11E. Package Use Registry

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

Syntax direction:

```text
import "./types.lo"
use std.json
use GraphQL

packages {
  use GraphQL from "./vendor/graphql" {
    version "1.4.2"
  }
}
```

---

## 11E.1. Search and Translation Provider Boundaries

Status: documented in `docs/search-and-translation-provider-boundaries.md`;
package-defined effects, provider policy schemas, redaction schemas,
rate-limit enforcement and package report schemas remain pending.

Core rule:

```text
Search and translation are not native LO language features.
Search and translation are package/provider/framework areas.
LO provides safe typed boundaries, effects, permissions, limits and reports.
```

Pending implementation examples:

```text
define package-defined effect registration
define search provider package report schema
define translation provider package report schema
define provider redaction policy schema
define provider rate-limit policy schema
define AI guide provider-boundary summaries
add provider-boundary examples after package parser support exists
```

---

## 11E.2. Video Package Boundaries and Compute Auto

Status: documented in `docs/video-package-boundaries-and-compute-auto.md`;
video package effects, browser/runtime media permissions, privacy reports,
memory reports, target stage reports and package report schemas remain
pending.

Core rule:

```text
Video processing is not a native LO language feature.
Video processing is a package/provider/framework/runtime area.
LO provides safe file, stream, effect, permission, privacy, memory and compute boundaries.
```

Pending implementation examples:

```text
define video package effect registration
define camera/screen/media runtime permission policy schema
define video privacy report schema
define video memory report schema
define video package target-stage report schema
define video package map-manifest entries
define video AI guide package summary output
add video package examples after package parser support exists
```

---

## 11E.3. Image AI Package Boundaries and Compute Auto

Status: documented in `docs/image-ai-package-boundaries-and-compute-auto.md`;
image package effects, image policy schemas, decoder sandbox rules, image
memory/security/target/precision reports and package report schemas remain
pending.

Core rule:

```text
Image AI tasks are not native LO language features.
Image AI is a package/provider/framework area.
LO provides safe file, stream, effect, permission, memory and compute boundaries.
```

Pending implementation examples:

```text
define image package effect registration
define image policy and validation schema
define image decoder sandbox policy schema
define image memory report schema
define image security report schema
define image package target and precision report schemas
define image package map-manifest entries
define AI guide image package summary output
add image package examples after package parser support exists
```

---

## 11F. Security-First Build System

Status: documented in `docs/security-first-build-system.md`; `LO build --with-tests`, `LO build --strict`, test reports and AI suggestions remain pending.

Core rule:

```text
LO does not compile unsafe code silently.
LO checks, tests, explains, reports, and suggests before producing output.
```

Recommended build pipeline:

```text
parse
type-check
check imports and target rules
run security checks
run memory checks
run vector/offload safety checks
run tests when configured
generate reports
generate suggestions
compile output
```

---

## 11F.1. Debug Console

Status: documented in `docs/debug-console.md`; compiler diagnostics, console reports, production stripping and runtime debugger integration remain pending.

Core rule:

```text
Console debugging should be simple in development.
Console debugging should be structured, source-mapped and redacted.
Production builds should warn, strip or restrict debug console calls.
```

Important defaults:

```text
SecureString values are redacted.
Large JSON is summarised.
console.scope is development/debug only by default.
```

---

## 11G. Lessons From Rust

Status: documented in `docs/lessons-from-rust.md`; graph ownership, draft/secure modes, recursion reports, trusted modules and FFI syntax remain pending.

Core rule:

```text
Do not make developers choose between safety and productivity.
Make safe patterns easier than unsafe patterns.
```

Priority foLOw-up areas:

```text
target and capability model
graph ownership model
draft vs secure mode
compiler security/test/suggestion engine
hybrid scalar + vector model
explicit clone and memory reports
trusted low-level modules
interop generator
```

---

## 12. Missing Formal Language Files

Status:

```text
SPEC.md                                      added
GOVERNANCE.md                                added
COMPATIBILITY.md                             added
docs/contracts.md                            added
docs/modules-and-visibility.md               added
docs/standard-library.md                     added
docs/error-codes.md                          added
docs/compiler-backends.md                    added
docs/testing.md                              added
docs/observability.md                        added
docs/interoperability.md                     added
docs/xml-support.md                          added
docs/graphql-support.md                      added
```

Highest priority formal files are now present, but many still need deeper specification detail.

---

## 13. SPEC.md

Status: added; needs expansion toward an official language specification.

`SPEC.md` should define the official LO language rules.

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

Status: documented in `docs/error-codes.md`; prototype emits standard LO warning/error/fatal code format.

Example families:

```text
LO-WARN-MEM-001
LO-ERR-MEM-001
LO-FATAL-MEM-001
LO-WARN-TARGET-001
LO-ERR-LOGIC-001
```

---

## 15. Contracts

Status: documented in `docs/contracts.md`; compiler support remains pending.

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

Status: documented in `docs/modules-and-visibility.md`; compiler support remains pending.

Possible model:

```text
module
export
internal
private
trait
impl
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

Inside this repository, paths should be root-relative.

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

Status: updated for current known files. Remaining TODOs should track implementation depth, not just document existence.

Pending implementation examples:

```text
LO dev command
LO generate command
borrow escape checks
Lazy Compact JSON compiler/linter checks
Lazy Compact JSON memory report schema
contracts compiler checks
modules and visibility compiler model
standard library specification detail
```

---

## 20. CHANGELOG.md Updates

Status: updated under `[Unreleased]`.

Future changelog updates should distinguish:

```text
documented concept
prototype compiler behaviour
generated report output
schema change
breaking language change
```

---

## 21. Ransomware-Resistant Design

Status: documented in `docs/ransomware-resistant-design.md`; compiler/runtime enforcement remains pending.

The model covers:

```text
file access allowlists
protected paths
ransomware guard mass-operation limits
backup protection
package file/network/shell permissions
shell default deny
destructive database action controls
upload folder protections
ransomware audit reports
security report, AI guide, map manifest and build manifest integration
```

Pending implementation examples:

```text
parse ransomware_guard policy
enforce protected paths
emit ransomware-risk-report.json
add security-audit --ransomware command
add runtime mass write/rename/delete detection
integrate ransomware checks into security reports
```

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
