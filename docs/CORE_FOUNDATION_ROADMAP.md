# Core Foundation Roadmap

## Purpose

This roadmap keeps LO focused on the language foundation before expanding
packages, domains or advanced targets.

V1 must prove the core language first:

```text
syntax
type system
memory model
parser
checker
examples
CPU execution
WASM target planning
reports
```

Anything outside that list is post-v1 unless it is needed to define core
semantics.

## Hard Scope Rules

- Do not add active domain packages before the v1 parser and checker are
  working.
- Do not add new active hardware targets beyond CPU and WASM.
- Do not make speed claims until there is an implemented compiler, memory model
  and repeatable benchmark method.
- Do not treat AI-readable as a slogan. It must mean regular grammar, explicit
  effects/imports, typed errors, source maps, stable diagnostics and
  machine-readable reports.
- Do not expose future/package complexity as normal language syntax.

## Phase 0: Workspace Freeze

Goal: keep the repo from drifting while the core is being specified.

Deliverables:

- Active `lo.workspace.json` packages limited to core, tooling, framework
  boundary packages and CPU/WASM target planning.
- Finance, electrical and OT packages archived outside the active workspace.
- GPU, AI accelerator, photonic, optical I/O and domain work labelled post-v1.
- Project graph regenerated with no archived domain package nodes.

Exit criteria:

- `lo.workspace.json` active targets are `cpu` and `wasm`.
- Generated graph reflects the active workspace only.
- Docs agree that v1 is foundation-first.

## Phase 1: V1 Syntax Freeze

Goal: define enough syntax to write real programs and reject everything else
cleanly.

Deliverables:

- A short grammar for the v1 subset.
- Canonical syntax for modules/imports, types, variants/enums, functions,
  `pure flow`, `secure flow`, `let`, `mut`, `match`, `return`, `Result`,
  `Option`, effects and errors.
- Clear diagnostics for post-v1 syntax.
- Formatting rules for the v1 subset.

Exit criteria:

- The grammar can parse the v1 example set.
- Unsupported syntax fails with clear diagnostics.
- There is one preferred spelling for each core construct.

## Phase 2: Example Corpus

Goal: make the language concrete before adding more design documents.

Deliverables:

- At least 20 real `.lo` examples:
  - 5 basic examples: variables, functions, records, simple `Result`, simple
    `Option`.
  - 5 type-system examples: variants/enums, exhaustive `match`, `Tri`, explicit
    conversions, generics if included in v1.
  - 5 API/JSON examples: typed decode, validation, explicit errors, safe
    response shape, webhook-style input.
  - 3 memory examples: borrow, move/resource cleanup, rejected unsafe mutation.
  - 2 concurrency examples: scoped `await` and timeout policy if Structured
    Await stays in v1.
- A manifest listing which examples are v1 and which are post-v1 drafts.

Exit criteria:

- Examples are parseable or intentionally marked as rejected fixtures.
- Each example demonstrates one language rule.
- No example depends on archived domain packages or post-v1 targets.

## Phase 3: Memory Model Commitment

Goal: make memory safety a mechanism, not a claim.

Deliverables:

- Final v1 memory model decision.
- If using the current hybrid ownership model, document:
  - immutable sharing rules
  - one active mutable owner
  - read-only borrows
  - mutable borrows
  - move semantics for resources
  - borrow escape rules
  - bounds checks
  - raw pointer ban in normal code
  - explicit unsafe boundary for future FFI
- Compiler diagnostics for the memory rules supported by v1.

Exit criteria:

- The checker can reject at least the basic unsafe memory examples.
- Documentation says exactly what is enforced now and what is future work.
- Performance wording is consistent with the chosen model.

## Phase 4: Parser And AST

Goal: replace design-only syntax with a working parser.

Deliverables:

- Lexer for the v1 subset.
- Parser for the v1 subset.
- Stable AST shape.
- Source spans for diagnostics and source maps.
- Parser tests for every v1 example.
- Rejection tests for post-v1 syntax.

Exit criteria:

- `lo-core` test suite parses the v1 example corpus.
- Parser output is deterministic.
- Error messages include file, line, column and suggested fixes where practical.

## Phase 5: Type And Effect Checker

Goal: prove the safety model before expanding features.

Deliverables:

- Name resolution and symbol table.
- Type checking for primitives, records, variants/enums, functions, `Result`,
  `Option`, `Tri` and `Bool`.
- Exhaustive `match` checks.
- Explicit `Tri` to `Bool` conversion rules.
- Basic effect checks: pure code cannot perform I/O or `await`.
- Initial memory checks for mutability, borrow and move rules.

Exit criteria:

- Incorrect examples fail for the expected reason.
- `Result` and `Option` cannot be silently ignored where v1 requires handling.
- `Tri` cannot feed a branch condition without explicit policy.

## Phase 6: Runtime And Reports

Goal: make the smallest useful execution path observable.

Deliverables:

- CPU-compatible checked execution for the v1 subset.
- WASM target planning report, not necessarily full WASM codegen.
- Build/check report with syntax, type, effect and memory diagnostics.
- Source map output for checked examples.
- AI-readable project summary generated from parser/checker facts.

Exit criteria:

- The CLI can check the v1 example corpus.
- Reports are deterministic and redact sensitive data.
- WASM work is honestly reported as planning unless real output exists.

## Deferred Until After Foundation

These remain post-v1 or later until the foundation phases pass:

```text
finance packages
electrical packages
OT packages
GPU target
AI accelerator target
photonic target
optical I/O target
native benchmark claims
full framework features
ORM/CMS/admin UI
production package registry
```

## Near-Term Work Order

1. Create the v1 grammar draft.
2. Audit existing `.lo` examples and classify them as v1 or post-v1.
3. Add enough examples to reach the 20-example corpus.
4. Implement parser tests around that corpus.
5. Finalise the memory model document.
6. Implement type/effect/memory checker slices against the examples.
7. Generate reports from real checker facts.
