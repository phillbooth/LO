# LO Architecture

This document describes the proposed architecture for **LO / Logic Omni**.

LO is a strict, memory-safe, security-first, JSON-native, API-native and accelerator-aware programming language concept.

The architecture is designed around one main goal:

> One `.lo` source project should be able to produce multiple checked, secure and traceable outputs.

---

## Architecture Summary

LO should be built as a layered system.

```text
.lo source files
   ↓
lexer
   ↓
parser
   ↓
AST
   ↓
type checker
   ↓
memory checker
   ↓
security checker
   ↓
JSON/API contract checker
   ↓
intermediate representation
   ↓
optimiser
   ↓
target planners / emitters
   ↓
build outputs and reports
```

The compiler should support normal CPU execution first, while planning for GPU, WebAssembly, photonic and ternary targets.

---

## Runtime Kernel Boundary

LO core defines the language, compiler checks, type system, effects, memory
safety rules, compute planning and report contracts.

Application runtime enforcement belongs in the optional LO Secure App Kernel:

```text
LO Core
  language/compiler/type system/effects/memory/compute

LO Secure App Kernel
  request lifecycle, validation, security, auth, rate limits, jobs and reports

LO Standard Packages
  HTTP adapters, SQL adapters, Redis queues, OpenAPI generators, JS/WASM generators

LO Full Frameworks
  web frameworks, CMS, admin UI, frontend adapters, ORM and template systems
```

LO core may describe safe API and webhook contracts. The Secure App Kernel is
the layer that receives requests, validates input, applies security policy,
checks auth, controls workload, queues heavy work and routes to typed flows.

The kernel is a partial framework layer, not a full application framework.

---

## Main Architecture Goals

The architecture should support:

```text
strict typing
memory safety
security-first defaults
JSON-native development
API-native development
webhook-safe workflows
source-mapped debugging
AI-readable reports
multi-target output
build-once deploy-many
future accelerator support
```

LO must remain useful without photonic hardware.

---

## High-Level System Diagram

```text
                 ┌────────────────────┐
                 │    .lo source      │
                 │ boot.lo / src/*.lo│
                 └─────────┬──────────┘
                           │
                           ▼
                 ┌────────────────────┐
                 │       Lexer         │
                 └─────────┬──────────┘
                           │
                           ▼
                 ┌────────────────────┐
                 │       Parser        │
                 └─────────┬──────────┘
                           │
                           ▼
                 ┌────────────────────┐
                 │        AST          │
                 └─────────┬──────────┘
                           │
        ┌──────────────────┼──────────────────┐
        ▼                  ▼                  ▼
┌──────────────┐   ┌──────────────┐   ┌──────────────┐
│ Type Checker │   │Memory Checker│   │Security Check│
└──────┬───────┘   └──────┬───────┘   └──────┬───────┘
       └──────────────────┼──────────────────┘
                          ▼
                ┌─────────────────────┐
                │ JSON/API Contract    │
                │ Checker              │
                └──────────┬──────────┘
                           ▼
                ┌─────────────────────┐
                │ LO Intermediate     │
                │ Representation       │
                └──────────┬──────────┘
                           ▼
                ┌─────────────────────┐
                │ Optimiser / Linker   │
                └──────────┬──────────┘
                           ▼
        ┌──────────────────┼──────────────────┐
        ▼                  ▼                  ▼
┌──────────────┐   ┌──────────────┐   ┌──────────────┐
│ CPU Binary   │   │ WASM Output  │   │ GPU Plan     │
└──────────────┘   └──────────────┘   └──────────────┘
        ▼                  ▼                  ▼
┌──────────────┐   ┌──────────────┐   ┌──────────────┐
│ Photonic Plan│   │ Ternary Sim  │   │ Reports      │
└──────────────┘   └──────────────┘   └──────────────┘
```

---

## Repository Architecture

Recommended repository structure:

```text
LO/
├── README.md
├── ABOUT.md
├── CONCEPT.md
├── LICENSE
├── LICENCE.md
├── NOTICE.md
├── REQUIREMENTS.md
├── DESIGN.md
├── TASKS.md
├── TODO.md
├── ROADMAP.md
├── ARCHITECTURE.md
├── SECURITY.md
├── CONTRIBUTING.md
├── CODE_OF_CONDUCT.md
├── AI-INSTRUCTIONS.md
├── CHANGELOG.md
├── GETTING_STARTED.md
├── DEMO_hello_WORLD.md
├── GIT.md
├── COMPILED_APP_GIT.md
├── .env.example
├── .gitignore
│
├── examples/
│   ├── hello.lo
│   ├── boot.lo
│   ├── api-orders.lo
│   ├── payment-webhook.lo
│   ├── json-decode.lo
│   ├── rollback.lo
│   ├── compute-block.lo
│   └── ternary-decision.lo
│
├── compiler/
│   ├── lexer/
│   ├── parser/
│   ├── ast/
│   ├── symbols/
│   ├── type-checker/
│   ├── memory-checker/
│   ├── security-checker/
│   ├── effect-checker/
│   ├── api-checker/
│   ├── ir/
│   ├── optimiser/
│   ├── linker/
│   ├── targets/
│   ├── reports/
│   └── source-maps/
│
├── runtime/
│   ├── memory/
│   ├── errors/
│   ├── json/
│   ├── api/
│   ├── webhooks/
│   ├── concurrency/
│   ├── rollback/
│   ├── security/
│   └── environment/
│
├── tooling/
│   ├── cli/
│   ├── formatter/
│   ├── linter/
│   ├── language-server/
│   ├── vscode-extension/
│   └── playground/
│
├── docs/
│   ├── language-rules.md
│   ├── syntax.md
│   ├── type-system.md
│   ├── memory-safety.md
│   ├── security-model.md
│   ├── json-native-design.md
│   ├── api-native-design.md
│   ├── webhooks.md
│   ├── concurrency.md
│   ├── compute-blocks.md
│   ├── gpu-target.md
│   ├── photonic-target.md
│   ├── ternary-logic.md
│   ├── source-maps.md
│   ├── compiler-reports.md
│   ├── ai-context.md
│   ├── deployment.md
│   ├── package-system.md
│   ├── dependencies.md
│   └── glossary.md
│
├── tests/
│   ├── parser/
│   ├── type-checker/
│   ├── memory/
│   ├── security/
│   ├── json/
│   ├── api/
│   ├── reports/
│   ├── source-maps/
│   └── targets/
│
└── build/
```

---

## User Project Architecture

A normal LO application should look like this:

```text
my-LO-app/
├── boot.lo
├── LO.config
├── LO.lock
├── .env.example
├── .gitignore
│
├── src/
│   ├── main.lo
│   ├── routes.lo
│   └── services/
│       ├── order-service.lo
│       ├── payment-service.lo
│       └── fraud-service.lo
│
├── app/
│   ├── controllers/
│   ├── models/
│   ├── views/
│   ├── middleware/
│   └── services/
│
├── components/
├── packages/
├── vendor/
├── config/
├── public/
├── storage/
├── tests/
└── build/
```

---

## Script Architecture

LO must also support short scripts.

Example:

```text
hello.lo
```

Command:

```bash
LO run hello.lo
```

Short scripts should not require a full MVC-style structure.

Secure defaults should apply automatically:

```text
strict types enabled
memory safety enabled
undefined denied
silent null denied
unsafe denied
source maps enabled
CPU target enabled
```

---

## Project Entry Architecture

The default entry file should be:

```text
boot.lo
```

`boot.lo` should define:

```text
project name
language version
entry source file
targets
security rules
permissions
build settings
imports
```

Example:

```LO
project "OrderRiskDemo"

language {
  name "LO"
  version "0.1"
  compatibility "stable"
}

entry "./src/main.lo"

targets {
  binary {
    enabled true
    platform "linux-x64"
    output "./build/release/app.bin"
  }

  wasm {
    enabled true
    output "./build/release/app.wasm"
  }

  gpu {
    enabled true
    mode "plan"
    check true
    fallback "binary"
    output "./build/release/app.gpu.plan"
  }

  photonic {
    enabled true
    mode "plan"
    check true
    fallback "gpu"
    output "./build/release/app.photonic.plan"
  }

  ternary {
    enabled true
    mode "simulation"
    output "./build/release/app.ternary.sim"
  }
}
```

---

## Compiler Architecture

The compiler should be modular.

Recommended compiler components:

```text
lexer
parser
AST builder
symbol table
type checker
memory checker
security checker
effect checker
JSON/API contract checker
IR generator
optimiser
linker
target planner
target emitter
source-map generator
report generator
AI context generator
```

---

## Lexer

The lexer reads `.lo` source text and produces tokens.

Input:

```LO
let total: Int = 10
```

Output:

```text
LET
IDENTIFIER(total)
COLON
IDENTIFIER(Int)
EQUALS
INT_LITERAL(10)
```

The lexer should track:

```text
file
line
column
token type
token value
```

This is required for source maps and good error messages.

---

## Parser

The parser turns tokens into an AST.

The parser should understand:

```text
project blocks
language blocks
target blocks
security blocks
permission blocks
imports
types
enums
flows
secure flows
pure flows
match expressions
if expressions
wait-until blocks
parallel blocks
channel blocks
worker blocks
rollback blocks
compute blocks
api blocks
webhook blocks
client blocks
json policies
```

Parser errors should include:

```text
file
line
column
expected syntax
suggested fix where possible
```

---

## AST Architecture

The AST is the structured representation of LO source.

Example AST node types:

```text
ProjectNode
ImportNode
TypeNode
EnumNode
FlowNode
SecureFlowNode
PureFlowNode
ParameterNode
ReturnTypeNode
MatchNode
IfNode
ResultNode
OptionNode
ComputeBlockNode
ApiBlockNode
WebhookBlockNode
JsonPolicyNode
RollbackNode
ParallelNode
ChannelNode
WorkerNode
```

The AST should preserve source locations.

Example:

```json
{
  "nodeType": "FlowNode",
  "name": "processOrder",
  "source": {
    "file": "src/order-service.lo",
    "line": 12,
    "column": 1
  }
}
```

---

## Symbol Table

The symbol table tracks known names.

It should track:

```text
types
flows
variables
imports
packages
routes
webhooks
channels
workers
targets
permissions
effects
```

This aLOws the compiler to detect:

```text
unknown variables
duplicate names
invalid imports
wrong function calls
invalid route handlers
missing types
```

---

## Type Checker

The type checker enforces strict typing.

It should reject:

```text
implicit string/number conversion
truthy/falsy logic
unhandled Option values
unhandled Result values
invalid JSON decode targets
invalid route handler types
invalid matrix shapes
invalid money currency operations
```

Example invalid code:

```LO
let total = "10" + 5
```

Error:

```text
Type error:
Cannot add String and Int.

Original source:
  src/main.lo:8:13

Suggestion:
  Convert the String explicitly using toInt().
```

---

## Memory Checker

The memory checker enforces memory safety.

It should protect against:

```text
use-after-free
double free
dangling references
out-of-bounds access
unsafe shared mutation
data races
uninitialised variables
```

Possible approach:

```text
ownership by default
borrowing for temporary access
immutable by default
explicit mutability
safe references
bounds-checked collections
```

Unsafe memory access should be denied by default.

---

## Security Checker

The security checker enforces project security rules.

It should check:

```text
unsafe usage
secret logging
environment access
file access
network access
native bindings
package permissions
webhook verification
API timeout policies
JSON safety policies
```

Example:

```LO
print(env.secret("API_KEY"))
```

Error:

```text
Security error:
SecureString cannot be printed.

Original source:
  src/main.lo:14:7

Suggestion:
  Do not log secrets. Use safe redaction if required.
```

---

## Effect Checker

The effect checker checks what a flow is aLOwed to do.

Example:

```LO
pure flow calculateTax(amount: Money<GBP>) -> Money<GBP> {
  return amount * 0.20
}
```

This should not be aLOwed inside a pure flow:

```LO
let now = time.now()
```

because it reads external state.

Effects may include:

```text
file.read
file.write
network.inbound
network.outbound
database.read
database.write
environment.read
time.read
random.read
secret.read
```

---

## JSON/API Contract Checker

The JSON/API checker validates API and webhook declarations.

It should check:

```text
request type exists
response type exists
handler exists
handler accepts correct request type
handler returns correct response type
webhook has security config
webhook has idempotency policy
payload size limits exist
JSON policies are valid
OpenAPI output can be generated
```

Example error:

```text
API contract error:
POST /orders expects CreateOrderResponse.
Handler createOrder returns Order.

Original source:
  src/routes.lo:18:5

Suggestion:
  Return JsonResponse<CreateOrderResponse>.
```

---

## Intermediate Representation

LO should lower source code into an intermediate representation.

Pipeline:

```text
.lo source
   ↓
AST
   ↓
checked IR
   ↓
optimised IR
   ↓
target outputs
```

The IR should be:

```text
typed
security-checked
source-mapped
target-aware
machine-readable
stable enough for future backends
```

The IR aLOws LO to support multiple outputs without duplicating the whole compiler.

---

## Optimiser

The optimiser should work on checked IR.

Possible optimisation steps:

```text
remove unused code
inline safe flows
simplify constant expressions
optimise JSON decoding
combine route tables
optimise pure compute blocks
prepare matrix/tensor operations for target planners
compress linked modules
```

Optimisation must preserve source-map traceability.

---

## Linker

The linker combines modules and packages.

It should handle:

```text
imports
packages
vendor bindings
runtime modules
generated validators
generated API routes
generated schemas
target-specific runtime components
```

The linker should produce consistent build outputs.

---

## Target Architecture

LO should support these target categories:

```text
binary
wasm
gpu-plan
photonic-plan
ternary-sim
```

Future targets may include:

```text
gpu-native
photonic-native
ternary-native
llvm
mlir
onnx
```

---

## CPU Binary Target

The CPU binary target is the most important practical target.

Output:

```text
app.bin
```

This target should support:

```text
normal control flow
API runtime
webhook runtime
JSON parsing
workers
channels
file access
network access
database access
rollback runtime
security checks
```

The first prototype may be interpreted before true binary output exists.

---

## WebAssembly Target

The WASM target should support portable execution.

Output:

```text
app.wasm
```

Possible uses:

```text
browser execution
edge functions
sandboxed server modules
plugin systems
portable compute modules
```

---

## GPU Target

GPU should be a first-class accelerator target.

Early output:

```text
app.gpu.plan
```

The GPU plan should explain:

```text
which compute blocks can run on GPU
which operations are supported
which operations failed
which fallback will be used
precision requirements
memory requirements
```

Future GPU output may target:

```text
CUDA
ROCm
WebGPU
Vulkan compute
MLIR GPU dialects
```

---

## Photonic Target

Photonic should begin as a planning target.

Early output:

```text
app.photonic.plan
```

The photonic plan should explain:

```text
matrix operations suitable for photonic execution
tensor operations suitable for photonic execution
unsupported operations
precision constraints
fallback targets
hardware assumptions
```

Real photonic backends should be added later only when hardware access and vendor tooling are realistic.

---

## Ternary Simulation Target

Ternary / 3-way logic should begin as a simulation target.

Output:

```text
app.ternary.sim
```

This should help test:

```text
Decision logic
Tri logic
Allow / Deny / Review flows
Positive / Neutral / Negative states
uncertainty handling
model confidence logic
```

---

## Compute Block Planner

The compute planner analyses `compute` blocks.

Example:

```LO
compute target best {
  prefer photonic
  fallback gpu
  fallback cpu

  score = fraudModel(features)
}
```

The planner should decide:

```text
can this run on photonic?
can this run on GPU?
can this run on CPU?
what operations are unsupported?
what fallback path is selected?
what report should be generated?
```

Unsupported example:

```LO
compute target photonic {
  result = readFile("./data.txt")
}
```

Error:

```text
Target error:
readFile cannot run inside a photonic compute block.

Suggestion:
Move file reading outside the compute block.
```

---

## Runtime Architecture

The runtime should provide safe execution support.

Runtime modules:

```text
memory runtime
error runtime
JSON runtime
API runtime
webhook runtime
concurrency runtime
rollback runtime
security runtime
environment runtime
logging runtime
target fallback runtime
```

---

## JSON Runtime

The JSON runtime should support:

```text
typed JSON decoding
raw JSON access
streaming JSON
partial JSON decoding
JSON Lines
canonical JSON output
schema validation
safe redaction
payload size limits
depth limits
duplicate key policy
```

---

## API Runtime

The API runtime should support:

```text
routing
typed request decoding
typed response encoding
middleware
timeouts
cancellation
rate limiting
structured logging
OpenAPI-generated validation
```

---

## Webhook Runtime

The webhook runtime should support:

```text
HMAC verification
signature timestamp checks
max age checks
payload size limits
idempotency keys
replay protection
duplicate event detection
safe JSON decoding
dead-letter queues
```

---

## Concurrency Runtime

The concurrency runtime should support:

```text
tasks
await
parallel blocks
timeouts
cancellation
channels
workers
worker pools
backpressure
dead-letter queues
safe shared state
```

---

## Rollback Runtime

The rollback runtime should support:

```text
checkpoints
restore actions
rollback handlers
compensating actions
audit trails
non-reversible action warnings
```

Rollback should not pretend every action can be undone.

External side effects should declare whether they are reversible.

---

## Security Runtime

The security runtime should support:

```text
SecureString
secret redaction
permission enforcement
environment access control
safe logging
package permission checks
native binding restrictions
```

---

## Environment Runtime

The environment runtime should load configuration from outside compiled files.

Sources may include:

```text
.env for local development
environment variables
container secrets
cloud secrets managers
deployment platform secrets
```

Example:

```LO
let port: Int = env.int("APP_PORT", default: 8080)
let apiKey: SecureString = env.secret("API_KEY")
```

---

## Build Output Architecture

Recommended output:

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
├── app.ai-context.json
└── app.build-manifest.json
```

---

## Build Manifest

The build manifest should describe the build.

Example:

```json
{
  "project": "order-risk-demo",
  "version": "0.1.0",
  "language": "LO",
  "compiler": "0.1.0",
  "mode": "release",
  "targets": ["binary", "wasm", "gpu-plan", "photonic-plan"],
  "sourceHash": "sha256:...",
  "binaryHash": "sha256:...",
  "createdAt": "2026-05-02T09:00:00Z"
}
```

The manifest helps with:

```text
deployment
rollback
verification
auditing
multi-server release control
```

---

## Source Map Architecture

LO must support source maps.

Source maps should connect generated output to original source.

They should include:

```text
original file
original line
original column
flow/function name
target output
compiled location
build stage
optimisation stage
```

Source maps should be used by:

```text
LO explain
LO explain --for-ai
runtime error reporting
debug tools
CI reports
AI assistants
```

---

## Report Architecture

LO should generate JSON reports.

Important reports:

```text
app.failure-report.json
app.security-report.json
app.target-report.json
app.api-report.json
app.ai-context.json
```

Reports should be:

```text
machine-readable
human-readable where possible
source-mapped
stable
compact
useful for CI
useful for AI assistants
```

---

## AI Context Architecture

LO should generate compact AI context.

Command:

```bash
LO ai-context
```

Outputs:

```text
build/app.ai-context.json
build/app.ai-context.md
```

The AI context should include:

```text
project name
entry file
source file summary
route summary
webhook summary
type summary
permission summary
target summary
error summary
changed file summary
suggested next actions
```

This helps reduce AI token use.

---

## AI Explain Architecture

LO should support:

```bash
LO explain --for-ai
```

This command should produce compact structured output.

Example:

```json
{
  "errorType": "TargetCompatibilityError",
  "target": "photonic",
  "file": "src/fraud-check.lo",
  "line": 18,
  "column": 12,
  "problem": "readFile cannot run inside a photonic compute block.",
  "why": "Photonic targets only support approved maths, tensor, matrix and model operations.",
  "suggestedFix": "Move readFile outside the compute block and pass parsed data into the model."
}
```

---

## CLI Architecture

Suggested CLI commands:

```bash
LO init
LO run
LO build
LO check
LO test
LO fmt
LO lint
LO explain
LO explain --for-ai
LO verify
LO targets
LO ai-context
LO schema
LO openapi
```

---

## Formatter Architecture

The formatter should provide one official style.

Command:

```bash
LO fmt
```

The formatter should help:

```text
human readability
AI readability
consistent documentation
smaller diffs
fewer style debates
```

---

## Linter Architecture

The linter should detect unsafe or weak patterns.

Command:

```bash
LO lint
```

Example checks:

```text
webhook without idempotency
API route without timeout
JSON endpoint without max body size
secret converted to String
compute block contains unsupported I/O
unused imports
non-exhaustive match
overly broad permissions
```

---

## Package Architecture

LO should eventually support packages.

Recommended package folders:

```text
packages/ = LO ecosystem packages
vendor/   = external third-party code
```

Lockfile:

```text
LO.lock
```

The lockfile should record:

```text
dependency names
versions
hashes
licences
permissions
target compatibility
```

---

## Deployment Architecture

LO should support build-once, deploy-many.

Deployment flow:

```text
1. Build once
2. Generate build manifest
3. Generate hashes
4. Verify artefact
5. Upload artefact
6. Deploy same artefact to many servers
7. Each server loads its own environment variables
8. Health check
9. Roll back if needed
```

Compiled output must not contain secrets.

---

## Git Architecture

LO should have two Git guides.

```text
GIT.md
```

Purpose:

```text
Git workflow for the LO language repository itself.
```

```text
COMPILED_APP_GIT.md
```

Purpose:

```text
Git and deployment guidance for applications built with LO.
```

This separates language development from app deployment.

---

## Debug Architecture

Debug builds should include:

```text
detailed source maps
IR output
symbols
security reports
target reports
failure reports
AI context files
```

Release builds should include:

```text
optimised output
build manifest
security report
target report
separate source maps if enabled
stripped symbols where appropriate
```

---

## Decompilation Architecture

LO should assume compiled output can be reverse engineered.

Therefore:

```text
compiled files are not secret
secrets must remain outside compiled files
source maps should be controlled
release builds may strip symbols
artefacts may be signed
hashes should be generated
```

---

## Version 0.1 Architecture Scope

Version 0.1 should focus on architecture documentation and early prototypes.

Required:

```text
grammar draft
AST draft
parser prototype
interpreter prototype
source-map schema
report schemas
AI context schema
example .lo files
```

Not required:

```text
real native binary compiler
real GPU backend
real photonic backend
real package manager
production runtime
formal verification
```

---

## Future Architecture Scope

Future versions may add:

```text
LLVM backend
MLIR backend
WASM backend
GPU backend
ONNX import/export
photonic vendor backend
ternary native backend
package manager
language server
VS Code extension
web playground
debugger
deployment tooling
formal verification tools
```

---

## Final Architecture Principle

The LO architecture should keep the language practical and future-ready.

Immediate value:

```text
strict types
memory safety
JSON-native development
API-native development
source maps
security reports
AI-readable context
normal CPU compatibility
```

Future value:

```text
GPU planning
photonic planning
ternary simulation
multi-target compilation
accelerator-aware compute blocks
```

The architecture should make LO useful before future hardware becomes common.
