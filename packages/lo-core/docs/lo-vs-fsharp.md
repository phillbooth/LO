# LO vs F#

## Position

LO should not claim to be better than F#.

F# is a mature .NET language with production tooling, broad documentation,
library access through .NET and NuGet, async support, options, discriminated
unions, pattern matching, records, deployment paths and strong interop.

LO is currently a beta language-design and prototype project. Its credible
position is different:

```text
F# helps developers write correct functional .NET software.

LO should help developers and AI tools write secure, inspectable,
target-aware backend software where errors, permissions, data movement,
memory, fallback and reports are visible by design.
```

## Honest Comparison

| Area | F# Today | LO Direction |
|---|---|---|
| Maturity | Production .NET language with mature docs, tools and libraries. | Beta prototype and language-design project. |
| Safety | Strong type system, immutable bindings by default, options, DUs and pattern matching. | Security-first defaults, explicit effects, permissions, reports and no silent fallback. |
| Speed | Mature .NET runtime, JIT/AOT options and optimized library ecosystem. | Future target-aware planning, CPU baseline, memory/target/fallback reports. |
| Developer experience | Concise and powerful, with a functional-first learning curve. | Backend/API-shaped explicit syntax, diagnostics and one obvious safe path. |
| AI readability | AI tools can read F#, but F# was not designed around AI context files. | Source maps, machine-readable reports, project graphs and redacted AI context by design. |
| Ecosystem | .NET/NuGet ecosystem. | LO still needs compiler, runtime, package manager, IDE tooling and real apps. |

## What F# Already Has

Microsoft documents F# as a .NET language for building applications, with
guides for language features, tooling, web development, machine learning,
deployment and JavaScript options.

F# language strengths include:

```text
immutable let bindings by default
type inference
type-safe formatting
discriminated unions
pattern matching
Option values
records
async programming
.NET interop
```

The F# tour describes `let` bindings as immutable by default, explains type
inference from return values, covers discriminated unions and options, and
documents arrays as fixed-size mutable collections backed by contiguous memory.
.NET Native AOT also provides ahead-of-time deployment paths, with analyzers and
documented limitations.

References:

- https://learn.microsoft.com/en-us/dotnet/fsharp/
- https://learn.microsoft.com/en-us/dotnet/fsharp/tour
- https://learn.microsoft.com/en-us/dotnet/core/deploying/native-aot/

## Where LO Can Compete

LO should compete by making backend risk visible:

```text
effects
permissions
secret access
network access
filesystem access
target selection
fallback decisions
memory pressure
source-mapped runtime errors
redacted security reports
AI-readable project maps
```

F# can model many of these through libraries and types. LO's goal should be to
make them part of the normal language, compiler, runtime and report workflow.

## Security Differentiators

LO should make unsafe behaviour difficult to express accidentally:

```text
no undefined
no silent null
no truthy/falsy logic
no implicit type coercion
no hidden errors as the default model
no compiled secrets
no unreported target fallback
no secret logging by default
```

Security-sensitive decisions should prefer explicit decision states over weak
booleans:

```lo
enum Decision {
  Allow
  Deny
  Review
}
```

Routes, flows and jobs should expose their effects and permissions:

```lo
secure flow createOrder(input: CreateOrderRequest) -> Result<OrderResponse, OrderError>
  effects [database.write, payment.authorise]
  permissions [orders.create]
{
  ...
}
```

This is the comparison point that matters: not whether LO has a type system,
but whether LO can emit useful evidence about what code is allowed to do.

## Speed Position

LO should not claim speed superiority over F# during beta.

The credible performance claim is:

```text
LO makes performance decisions visible, reportable and target-aware.
```

That means reports for:

```text
memory usage
hidden copies
target selection
fallback reason
precision policy
data movement
CPU reference checks
runtime limits
```

This can later help finance, API, AI, scientific and compliance-heavy systems
where understanding why a target was selected matters as much as raw throughput.

## AI Readability

LO's strongest unique opportunity is not syntax alone. It is the full context
surface for AI and developers:

```text
AGENTS.md package boundaries
lo.workspace.json package map
project graph JSON
AI map
source maps
diagnostic IDs
security reports
runtime reports
target reports
redaction rules
```

The aim is for an AI assistant or reviewer to answer:

```text
What files can this flow read?
What secrets can it access?
What APIs can this route call?
What package introduced network access?
Was target fallback used?
Where did a runtime error originate in source?
```

## Missing Essentials

LO still needs implementation maturity before it can seriously compete with F#
in production:

```text
production compiler
stable parser, AST, checker and IR
runtime execution model
native, binary or WASM backend
standard library
package manager and lockfile
IDE/LSP support
debugger and source maps
test framework
exhaustive match and sealed variants
generics, traits or protocols
structured concurrency
deterministic cleanup
safe FFI / C ABI boundary
database support packages
real HTTP/API server implementation
security audit reports that run
benchmarks
compiling examples
governance and compatibility policy
```

This list should guide roadmap work. It is more important than adding exotic
targets before the baseline compiler, runtime, standard library and package
system are dependable.

## Recommended Public Positioning

Use:

```text
F# is a mature functional-first .NET language.
LO is a security-first, AI-readable, target-aware backend language concept
designed for strict APIs, explicit effects, typed data, safe reports and future
compute targets.
```

Avoid:

```text
LO is better than F#.
LO is faster than F#.
LO is production-ready.
LO replaces .NET.
```
