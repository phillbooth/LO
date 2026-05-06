# Backend Language Gap Analysis

This document compares LO against common backend languages and identifies what
those languages support that LO does not currently define as a native language
feature.

Scope:

```text
language design only
not secure app kernel implementation design
not full framework design
not package ecosystem design
not provider integration design
not cloud platform design
```

The goal is not to copy every feature from existing languages. The goal is to
decide what LO should support as a clear, safe backend language for:

```text
normal CPU execution
strict memory-safe application code
three-way logic
future photonic and wavelength compute planning
backwards-compatible evolution
AI-readable source and reports
```

Related documents:

```text
docs/language-rules.md
docs/type-system.md
docs/tri-logic.md
docs/omni-logic.md
docs/logic-widths.md
docs/compiler-backends.md
docs/target-and-capability-model.md
docs/vector-model.md
docs/hybrid-logic-and-wavelength-compute.md
docs/language-supported-primitives.md
docs/language-non-supported-primitives.md
```

---

## Primary Rule Set

LO should be designed around a small set of primary language rules. These rules
should guide future syntax, type-system, compiler, target and documentation
decisions.

```text
1. LO must stay developer friendly.
2. LO must have a clear learning curve.
3. LO must be a strict backend language.
4. LO must be AI-readable by design.
5. LO must be three-way logic aware.
6. LO must be security-first.
7. LO must be optimised for low memory usage.
8. LO must reduce unnecessary compute.
9. LO must be vector-ready.
10. LO must support repetitive AI compute tasks safely.
11. LO must be multi-state logic compatible, including Tri logic<N>.
12. LO must be photonic and wavelength planning ready.
13. LO must remain CPU-compatible by default.
14. LO must be safe through explicit types, effects, permissions, reports and fallback.
15. LO must reduce ransomware-style attack risk through explicit file, network, package and permission controls.
16. LO is not a full framework.
17. LO may define contracts that an optional Secure App Kernel enforces.
```

These rules define what LO should become:

```text
a readable backend language
a safe language for humans and AI tools
a language that can express uncertainty without unsafe nulls
a language that can run normal CPU code today
a language that can plan future vector, AI, photonic and wavelength compute
a language that avoids framework-specific native features
```

### 1. Developer Friendly Syntax and Learning Curve

LO should be strict, but it should not be hard to read.

The language should prefer:

```text
clear keywords
predictable syntax
one obvious way to define common behaviour
small core concepts
explicit public API boundaries
examples that compile
diagnostics that explain the fix
```

LO should avoid:

```text
clever shorthand
large numbers of equivalent spellings
hidden implicit behaviour
syntax that only compiler experts can understand
advanced type tricks in ordinary backend code
```

Strictness should help developers, not punish them. When LO rejects code, the
compiler should explain:

```text
what failed
why it is unsafe or unclear
how to fix it
which source line caused it
which target or permission rule was involved
```

### 2. Strict Backend Language

LO should be suitable for backend systems such as APIs, services, workers,
automation jobs, data pipelines and secure compute tasks.

Core backend language support should include:

```text
typed flows
typed request and response boundaries
typed errors
structured concurrency
streams
files
network boundaries
environment boundaries
secret handling
resource cleanup
module visibility
package approval
runtime profiles
```

Backend framework features should not become native language syntax. Routing,
ORMs, queues, authentication systems, CMS features and cloud deployment belong
in packages, frameworks, tooling or external services.

LO may still define safe application contracts that a separate Secure App
Kernel enforces at runtime. That kernel is a partial framework layer for typed
API boundaries, validation, auth, idempotency, workload controls, jobs and
reports. It is not the same as a full CMS, admin UI, ORM or frontend framework.

### 3. AI-Readable by Design

LO should be easy for AI coding tools to inspect without guessing.

The language should require:

```text
explicit types at public boundaries
explicit mutation
explicit effects
explicit permissions
explicit imports
explicit package use
explicit target fallback
exhaustive match for states
stable diagnostic IDs
source maps
machine-readable compiler reports
secret redaction in generated AI context
```

AI readability is not just documentation. It should be part of the language and
compiler contract.

### 4. Three-Way and Multi-State Logic

LO should treat uncertainty as a first-class language concern.

Required logic model:

```text
Bool      = true / false
Tri       = true / false / unknown
Decision  = domain state such as Allow / Deny / Review
Logic<N>  = future multi-state logic
```

LO should never silently convert:

```text
Tri to Bool
Decision to Bool
Logic<N> to a smaller logic width
unknown to allow
review to allow
```

Any conversion that loses meaning must name the policy and produce a reportable
compiler decision.

### 5. Security-First Design

Security should be part of normal LO syntax, not an afterthought.

LO should make these visible:

```text
effects
permissions
secrets
unsafe behaviour
imports
package use
network access
file access
environment access
target capabilities
fallback behaviour
```

The default should be:

```text
deny unsafe behaviour
deny accidental global mutation
deny secret leakage into logs, reports or AI context
deny raw hardware or driver access
deny silent fallback where correctness or security changes
```

Ransomware-style attacks cannot be prevented by language design alone, but LO
should reduce the risk by making dangerous behaviour explicit and auditable.

LO should require clear permission boundaries for:

```text
recursive file access
bulk file writes
file deletion
file encryption
network download and execution
process spawning
package install scripts
access to secrets and credentials
```

The compiler and runtime reports should flag code or packages that combine risky
capabilities, such as broad file write access plus network access plus process
execution.

### 6. Low Memory Usage

LO should make memory behaviour visible and predictable.

The language should prefer:

```text
immutable values by default
explicit mutation
borrowed views where safe
copy-on-write where useful
explicit clone
explicit deep copy
streaming over full buffering
chunked file and network processing
memory pressure reports
safe spill policies
```

Large values, repeated datasets, vectors, JSON payloads and AI inputs should not
silently create expensive copies.

### 7. Reduced Compute and Vector Readiness

LO should reduce unnecessary computation before asking for more hardware.

The compiler should support:

```text
pure compute blocks
constant folding where safe
common repeated-work detection
vector syntax for independent repeated work
scalar fallback
target compatibility reports
precision reports
fallback reports
```

Vector readiness should not make normal backend code harder to read. LO should
remain scalar-first and vector-aware.

### 8. Repetitive AI Compute Tasks

LO should support repetitive AI compute tasks as language-visible compute
patterns, without becoming an AI framework.

Good language-level support:

```text
vectors
matrices
tensors as typed data shapes
batch compute blocks
pure scoring functions
target preferences
CPU fallback
GPU planning
photonic planning
memory limits
precision reports
```

Not native language features:

```text
model hosting
model training platforms
prompt orchestration frameworks
provider-specific AI APIs
vector databases
image generation engines
agent frameworks
```

LO should provide safe primitives that AI packages and compute backends can use.

### 9. Photonic and Wavelength Planning

Photonic and wavelength support should be planned into the language without
making photonic hardware required.

Rules:

```text
CPU execution remains the baseline.
Photonic targets are future planning targets.
Wavelength compute is pure compute only.
Business logic, security decisions and IO stay exact.
Accelerator results must return to strict LO values.
Fallback must be explicit and reported.
CPU reference verification should be available where practical.
```

Normal LO code should stay readable even when the compiler can plan a pure
compute block for vector, GPU, photonic or wavelength execution.

---

## Current LO Position

The existing docs define LO as:

```text
strictly typed
memory safe
immutable by default
explicit about mutation
explicit about missing values
explicit about errors
explicit about effects and permissions
JSON-native and API-aware
target-aware
scalar-first and vector-aware
CPU-compatible by default
future-compatible with Tri, Logic<N>, photonic planning and wavelength planning
AI-readable through generated reports and source maps
```

The docs also set an important boundary:

```text
LO should be a programming language first.
Specialist systems should belong in packages, drivers, frameworks, tooling or external services.
```

For application runtime safety, the boundary is:

```text
LO core defines safety.
LO Secure App Kernel enforces safe runtime boundaries.
Full frameworks provide opinions and user-facing structure.
```

That means gaps should be split into three categories:

| Category | Meaning |
|---|---|
| Core LO candidate | Belongs in the language because it affects safety, typing, logic, memory, effects, compilation or compatibility |
| Standard library or package candidate | Useful for backend work, but should not become native syntax |
| Avoid as native LO | Conflicts with strictness, security, portability, AI readability or long-term stability |

---

## What LO Should Add for a Backend Language

These are language-level additions or clarifications that would make LO stronger
without turning it into a framework.

| Area | Why LO Needs It | Recommended LO Position |
|---|---|---|
| Language editions | Backwards-compatible evolution needs a stable way to introduce new rules | Add `edition` or `language version` to project/source metadata |
| Compatibility policy | Existing docs mention fallback and stability, but not a full compatibility contract | Add a dedicated `COMPATIBILITY.md` or equivalent docs page |
| Deprecation model | Mature languages need safe migration paths | Add warnings, fix suggestions and edition-gated removals |
| Stable ABI/FFI boundary | Backend languages must call existing C, C++, Rust, JVM, .NET and system libraries | Keep explicit, typed, permission-checked FFI as planned |
| Generics constraints | Rust, Java, C#, Scala, Swift, Kotlin and Go all need bounded generic APIs | Define trait/interface/protocol-style constraints clearly |
| Sum types and sealed variants | Rust, Swift, Kotlin, Scala and ML-style languages make state safer | Treat enums/algebraic variants and exhaustive `match` as core |
| Type classes or protocols | Needed for generic numeric, vector, serialization and target-compatible code | Add a simple explicit constraint model, avoid hidden implicit magic |
| Compile-time constants | C, C++, Rust, Java, C# and Go support constant expressions for layout and performance | Add safe `const` evaluation with no IO, network or secrets |
| Async streams | Backend services need streaming IO, not just request/response flows | Add typed async iterator or stream primitives |
| Cancellation and timeouts | Go, Kotlin, C#, Java and JS backend systems need cancellation as a first-class concern | Make cancellation part of structured concurrency |
| Resource management | C++, Rust, C#, Java, Swift and Go all have cleanup patterns | Add deterministic cleanup syntax or scope-based resource guards |
| Reflection boundary | Java, C#, Python, JS and PHP are productive partly because metadata is inspectable | Support limited compile-time metadata, avoid unrestricted runtime reflection by default |
| Macro/codegen boundary | Lisp, Rust, Scala and C++ show the value and risk of metaprogramming | Prefer hygienic, typed compile-time transforms or generators with reports |
| Numeric model | Julia, MATLAB, R, C, C++ and Rust have strong numeric options | Define checked, wrapping, saturating and target-specific arithmetic explicitly |
| Matrix/tensor shapes | Julia, MATLAB, R and scientific Python make numeric programming productive | Add shape-aware vector/matrix types where practical, with scalar fallback |
| Logic width conversion | LO already has `Bool`, `Tri` and possible `Logic<N>` | Require explicit conversion policies and report lossy conversions |
| Photonic compute block rules | LO docs describe future photonic/wavelength planning | Keep photonic code as pure compute only, with CPU reference verification |
| Backend module visibility | Java, C#, Rust, Swift, Kotlin and Scala all have mature visibility controls | Finalise `private`, `module`, `package`, `public` rules |
| Package version rules | Backend languages depend on stable dependency resolution | Keep `use` package registry versioning and hashes outside native syntax where possible |
| Diagnostics schema | AI-friendly coding needs stable compiler output | Standardise diagnostic IDs, machine-readable explanations and source maps |

---

## What LO Should Not Add Natively

These features exist in some listed languages, but they would make LO less safe,
less portable or harder for AI tools to understand.

| Feature | Found In | LO Recommendation |
|---|---|---|
| Loose implicit type coercion | JavaScript, PHP, C, C++ | Avoid |
| Truthy/falsy conditions for non-bool values | Python, JavaScript, PHP, C, C++ | Avoid; only `Bool` in conditions |
| Null as an ordinary unchecked value | Java, C#, JavaScript, PHP, C/C++ pointers | Avoid; prefer `Option<T>` and explicit null handling |
| Hidden exceptions as the main error model | Java, Python, C#, JavaScript, PHP | Avoid as the default; use `Result<T, Error>` |
| Raw pointers in normal code | C, C++, unsafe Rust, Swift unsafe APIs | Block by default |
| Arbitrary global mutation | C, C++, Python, JavaScript, PHP | Avoid; require registered global state |
| Unrestricted runtime reflection | Java, C#, Python, JS, PHP | Avoid by default; allow limited metadata where safe |
| Monkey patching | Python, Ruby-like systems, JavaScript prototypes | Avoid |
| Implicit imports or ambient authority | PHP, JavaScript, Python scripts | Avoid; imports, packages and effects must be explicit |
| Vendor-specific accelerator syntax | C++ extensions, CUDA-style ecosystems | Avoid in core; use target capabilities and backend reports |
| Framework-native language constructs | PHP web globals, Rails-like conventions, Spring-like annotations | Avoid in core language |

---

## Language-by-Language Gaps

### Python

Python supports:

```text
dynamic typing
duck typing
interactive REPL workflow
generators and async generators
decorators
metaclasses
runtime introspection
dynamic module loading
large scientific and AI package ecosystem
```

LO does not currently support unrestricted dynamic typing, metaclasses, monkey
patching or broad runtime introspection.

LO should consider:

```text
typed generators
async streams
safe decorators or attributes
limited compile-time metadata
good REPL/check workflow
```

LO should avoid:

```text
runtime monkey patching
implicit duck typing
truthy/falsy control flow
unchecked dynamic imports
```

### R

R supports:

```text
native vectorised data operations
data frames as a central programming model
formula syntax for statistics
missing-value-aware calculations
interactive analysis
statistical modelling primitives
```

LO does not currently define data frames, formula syntax or native statistics
as language features.

LO should consider:

```text
shape-aware vectors and matrices
typed missing-value handling
dataset-oriented iteration syntax
safe scalar fallback for vector code
```

LO should keep statistics, modelling and plotting in packages.

### Rust

Rust supports:

```text
ownership and borrowing
lifetimes
traits
algebraic enums
pattern matching
zero-cost abstractions
macros
unsafe blocks
Cargo-style package workflow
```

LO already aligns with Rust on memory safety, explicit errors and exhaustive
matching, but does not currently define a complete ownership, trait, macro or
unsafe model.

LO should consider:

```text
simple ownership and borrowing rules
trait/protocol constraints
algebraic variants
typed hygienic macros or compile-time generators
explicit unsafe blocks blocked by default
```

### Julia

Julia supports:

```text
multiple dispatch
powerful numeric generics
high-performance JIT execution
native complex numbers and linear algebra culture
macros
interactive scientific workflow
```

LO does not currently define multiple dispatch, a JIT model or native scientific
language syntax.

LO should consider:

```text
generic numeric constraints
shape-aware matrix/vector types
target-compatible numeric policies
compile-time specialisation where predictable
```

LO should avoid unrestricted multiple dispatch if it makes call resolution hard
for humans, compilers or AI tools to inspect.

### Java / JAVA

Java supports:

```text
JVM portability
interfaces
annotations
reflection
checked exceptions
threads and virtual threads
class loaders
stable bytecode compatibility
large enterprise ecosystem
```

LO does not currently define a VM bytecode, class-loader model, annotation
system, reflection model or checked exception system.

LO should consider:

```text
stable IR/versioning rules
interface-like contracts
safe annotations or attributes
structured concurrency
clear binary/package compatibility policy
```

LO should avoid Java-style hidden framework magic through unrestricted runtime
reflection and annotation processing.

### C++

C++ supports:

```text
manual memory control
RAII
templates
operator overloading
move semantics
multiple inheritance
low-level layout control
inline assembly and vendor intrinsics
```

LO does not support raw pointer programming, unrestricted templates, operator
overloading or direct hardware intrinsics as normal language features.

LO should consider:

```text
scope-based resource cleanup
safe generic specialisation
explicit layout types for FFI and binary protocols
target reports for vendor acceleration
```

LO should avoid making low-level hardware access a normal backend-language
feature.

### C

C supports:

```text
stable ABI
raw pointers
manual memory management
struct layout control
preprocessor macros
direct system calls
portable compiler targets
```

LO does not currently define a stable ABI, C header generation, manual memory
management or preprocessor-style macros.

LO should consider:

```text
C ABI import/export boundary
explicit layout structs
safe foreign calls with effects and permissions
generated headers or bindings
```

LO should avoid C-style unchecked pointer arithmetic in normal code.

### C#

C# supports:

```text
properties
attributes
LINQ
async/await
iterators
nullable reference annotations
generics with constraints
reflection
managed runtime interoperability
```

LO does not currently define properties, LINQ-style query syntax, attributes or
managed runtime reflection.

LO should consider:

```text
typed query/comprehension syntax only if it stays simple
async streams
metadata attributes
generic constraints
nullable safety rules
```

### Scala

Scala supports:

```text
functional and object-oriented programming
traits
case classes
pattern matching
implicit parameters and givens
higher-kinded types
JVM interoperability
actor-style concurrency through libraries
```

LO does not currently define higher-kinded types, implicit resolution or full
functional typeclass machinery.

LO should consider:

```text
sealed variants
traits/protocols
pattern matching
explicit typeclass-style constraints
```

LO should avoid heavy implicit resolution because it can make code harder for
developers and AI tools to trace.

### MATLAB

MATLAB supports:

```text
matrix-first programming
native complex numbers
numeric toolboxes
interactive numeric environment
plotting workflow
array broadcasting
```

LO does not currently define matrix-first semantics, complex numbers or plotting
as native language features.

LO should consider:

```text
matrix and tensor shape types
broadcasting rules only where explicit
complex numbers as standard-library numeric types
compute target reporting for matrix operations
```

Toolboxes and plotting should remain packages.

### JavaScript Backend

JavaScript supports:

```text
dynamic objects
prototype inheritance
event loop
Promises
async/await
closures
JSON-native object literals
runtime reflection
loose coercion
```

LO does not support prototype mutation, loose coercion, truthy/falsy control
flow or unrestricted dynamic object mutation.

LO should consider:

```text
async/await
event-loop-compatible backend runtime target
typed JSON object syntax
safe dynamic records only when explicitly typed
```

LO should avoid JavaScript's implicit conversions.

### TypeScript Backend

TypeScript supports:

```text
structural typing
union and intersection types
type narrowing
mapped and conditional types
decorators
compile-to-JavaScript backend deployment
```

LO does not currently define structural typing, conditional types or mapped
types.

LO should consider:

```text
sum types
type narrowing through match/if checks
interfaces or protocols
generated TypeScript declarations for interop
```

LO should be careful with advanced type-level programming because it can become
hard to read and hard for AI tools to explain.

### Lisp

Lisp supports:

```text
homoiconic code-as-data
macros
symbolic programming
REPL-driven development
dynamic language extension
simple core syntax
```

LO does not currently define code-as-data or macros.

LO should consider:

```text
hygienic typed macros
compile-time transforms with generated reports
AI-readable expansion output
```

LO should avoid arbitrary source rewriting that hides behaviour from source maps
and security reports.

### Prolog

Prolog supports:

```text
logic programming
facts and rules
unification
backtracking
constraint solving
declarative query style
```

LO's `Tri` and `Logic<N>` are not the same as Prolog logic programming. LO does
not currently define unification, facts, rules or backtracking.

LO should consider:

```text
declarative rules as a package or DSL
typed decision tables
exhaustive match for business decisions
```

LO should not make full Prolog-style backtracking a core backend feature unless
there is a strong safety and debugging model.

### Swift

Swift supports:

```text
protocols
value types
optionals
pattern matching
actors
async/await
structured concurrency
automatic reference counting
```

LO already aligns with optionals and explicit missing values, but does not
currently define protocols, actors or a complete concurrency model.

LO should consider:

```text
protocol-style constraints
actors or isolated state where useful
structured concurrency
scope-based cleanup
```

### Kotlin

Kotlin supports:

```text
null safety
sealed classes
data classes
coroutines
extension functions
smart casts
JVM interoperability
```

LO aligns with null safety and explicit state, but does not currently define
sealed classes, coroutines, extension functions or JVM interop.

LO should consider:

```text
sealed variants
data records
typed async flows
safe extension methods if they remain explicit
```

### Go

Go supports:

```text
goroutines
channels
interfaces
simple package model
fast compilation
static binaries
defer for cleanup
context cancellation
```

LO does not currently define goroutine-like concurrency, channels, defer or
static binary output.

LO should consider:

```text
structured concurrency
typed channels with backpressure
scope cleanup
context/cancellation propagation
native CPU backend after the prototype stabilises
```

### PHP

PHP supports:

```text
web request lifecycle as a common deployment model
dynamic arrays
loose typing options
attributes
runtime reflection
simple server deployment
large web package ecosystem
```

LO does not support loose arrays, loose typing or web globals as native language
features.

LO should consider:

```text
simple backend entry points
typed request/response contracts
safe attributes
easy deployment reports
```

LO should keep framework-style routing, templating, ORM and CMS features out of
the core language.

---

## Three-Way Logic and Photonic Support

Most listed languages do not natively support three-way logic or photonic logic
as a language-level concept. They can simulate it with enums, integers, nullable
values, packages or hardware-specific libraries.

LO's advantage should be:

```text
Bool for exact two-state logic
Tri for true / false / unknown
Decision types for domain choices such as Allow / Deny / Review
Logic<N> for future multi-state logic
explicit logic-width conversion
source-mapped diagnostics for lossy conversion
CPU fallback as the baseline
photonic and wavelength targets as pure compute planning targets
CPU reference verification for accelerator results
```

Important rule:

```text
Photonic support should not infect normal backend code.
```

Normal backend code should still read like normal LO:

```text
flows
types
matches
results
effects
permissions
streams
modules
```

The compiler should decide whether a pure numeric, vector or matrix block can
be planned for CPU vector, GPU, photonic, ternary simulation or wavelength
compute.

---

## Backwards Compatibility Requirements

LO should define backwards compatibility early because it wants to support
future photonic and multi-state targets without breaking normal applications.

Recommended compatibility rules:

```text
1. CPU execution remains the baseline for ordinary backend code.
2. New target backends must not change source meaning.
3. Vector, photonic and wavelength acceleration must have scalar or CPU fallback unless explicitly disabled.
4. Logic-width conversion must be explicit when it can lose meaning.
5. New syntax should be edition-gated when it changes parsing or semantics.
6. Deprecations should produce diagnostics before removals.
7. Generated reports should include compiler version, language edition, target, fallback and warning IDs.
8. Package versions and hashes should be recorded for reproducible builds.
9. AI context files must use stable identifiers and must not contain secrets.
10. Runtime reflection or code generation must not bypass source maps, effects or security reports.
```

Suggested project metadata:

```LO
boot {
  language {
    edition "2026"
    compatibility "stable"
  }

  target server {
    output native
    fallback cpu
  }
}
```

---

## AI-Friendly Language Requirements

LO should stay understandable to AI tools by keeping syntax and semantics
predictable.

Recommended rules:

```text
one obvious way to define a flow
explicit types at public boundaries
explicit effects
explicit imports and package use
explicit mutation
explicit missing-value handling
explicit error handling
exhaustive match for variants and logic states
stable diagnostic IDs
machine-readable reports
source maps for generated outputs
AI summaries that redact secrets
limited metaprogramming with expansion reports
```

Features that reduce AI readability:

```text
implicit imports
implicit conversions
implicit typeclass resolution
monkey patching
unrestricted reflection
runtime source rewriting
ambient global state
framework magic hidden behind annotations
```

---

## Priority Recommendations

The highest-value language work is:

| Priority | Recommendation | Reason |
|---|---|---|
| 1 | Define language editions and compatibility rules | Needed before the language grows |
| 2 | Finalise `Bool`, `Tri`, `Decision` and `Logic<N>` conversion rules | Core to three-way and future photonic logic |
| 3 | Define algebraic variants, sealed state and exhaustive `match` | Common strength in Rust, Swift, Kotlin and Scala |
| 4 | Define generic constraints / traits / protocols | Needed for safe reusable backend and numeric code |
| 5 | Define structured concurrency, cancellation and streams | Needed for backend services |
| 6 | Define deterministic resource cleanup | Needed for files, sockets, locks and FFI |
| 7 | Define safe compile-time metadata and attributes | Useful without adopting unsafe reflection |
| 8 | Define C ABI and foreign-call boundaries | Needed for real backend interoperability |
| 9 | Define matrix/vector shape rules and scalar fallback | Needed for AI, numeric and photonic planning |
| 10 | Standardise diagnostics and AI report schemas | Keeps LO understandable for tools |

---

## Suggested Documentation Updates

These recommendations should not stay isolated in this analysis file. They
should be reflected across the core project documents as follows:

| Recommendation | Primary Docs To Update | Notes |
|---|---|---|
| Language editions and compatibility | `COMPATIBILITY.md`, `REQUIREMENTS.md`, `SPEC.md` | Edition changes must be explicit and source-mapped |
| Logic conversion rules | `docs/tri-logic.md`, `docs/logic-widths.md`, `REQUIREMENTS.md` | Lossy conversion must require named policy |
| Algebraic variants and exhaustive match | `docs/type-system.md`, `docs/language-rules.md`, `REQUIREMENTS.md` | Variants are core safety, not framework syntax |
| Generic constraints and protocols | `docs/type-system.md`, `SPEC.md`, `REQUIREMENTS.md` | Constraints should be explicit, not implicit magic |
| Structured concurrency and streams | `docs/language-rules.md`, `REQUIREMENTS.md` | Cancellation and timeout propagation are backend essentials |
| Deterministic cleanup | `docs/memory-safety.md`, `REQUIREMENTS.md` | Needed for files, sockets, FFI handles and locks |
| Compile-time metadata and attributes | `SPEC.md`, `AI-INSTRUCTIONS.md`, `REQUIREMENTS.md` | Metadata must not bypass reports or source maps |
| C ABI and FFI boundary | `docs/target-and-capability-model.md`, `SECURITY.md`, `REQUIREMENTS.md` | Foreign calls require permissions and explicit effects |
| Matrix/vector shape rules | `docs/vector-model.md`, `docs/type-system.md`, `REQUIREMENTS.md` | Scalar fallback and target reports are mandatory |
| Diagnostics and AI report schemas | `docs/error-codes.md`, `schemas/`, `AI-INSTRUCTIONS.md` | Reports must stay compact, stable and secret-safe |

Recommended implementation order:

```text
1. Write the compatibility and edition rules.
2. Finalise logic state and conversion semantics.
3. Tighten type-system requirements around variants, match and constraints.
4. Define concurrency, stream and cleanup primitives.
5. Define metadata, FFI and shape rules after the core safety model is stable.
6. Keep diagnostics and AI report schemas updated with each language feature.
```

---

## Final Design Position

LO should not try to become Python, Rust, Java, C#, Go, Julia or TypeScript.

LO should take the safest language-level lessons:

```text
Rust's explicit safety
Go's operational simplicity
Swift/Kotlin's null safety and sealed state
Java/C#'s mature backend contracts and metadata
Julia/MATLAB/R's numeric awareness
TypeScript's typed API modelling
Lisp's controlled compile-time extension
Prolog's declarative decision clarity where useful
C's ABI reality
C++'s resource-management discipline without normalising unsafe code
```

LO's unique direction should remain:

```text
developer friendly syntax
clear learning curve
strict backend language
AI-readable by design
three-way logic aware
security-first design
optimised for low memory usage
reduced compute by default
vector-ready
multi-state logic compatible
photonic and wavelength planning ready
CPU-compatible by default
safe through explicit types, effects, permissions, reports and fallback
support for repetitive AI compute tasks through safe primitives
```
