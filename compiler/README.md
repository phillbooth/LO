# LO Prototype Compiler

This folder contains the first runnable LO prototype CLI.

It is not a production compiler. It is a practical v0.1 scaffold that can:

- discover `.lo` source files
- lex `.lo` source into source-mapped tokens
- format `.lo` files with stable two-space indentation
- parse core declarations into AST JSON
- extract `/// @tag` strict comments into AST, source-map and AI-context reports
- run prototype smoke tests for parser, formatter and target diagnostics
- check `undefined`, silent `null`, truthy/falsy conditions and compute-block I/O
- type-check declared type references, generic arity and simple exhaustive matches
- run simple checked `main` scripts through `LO run`
- report planned development serve mode through `LO serve --dev`
- generate JSON Schema drafts and OpenAPI drafts from LO declarations
- generate Strict Global Registry reports with secret redaction
- generate target compatibility summaries for CPU, WASM, GPU, photonic and ternary plans
- require CPU/binary compatibility as the fallback baseline
- generate API, target, security, execution, failure, source-map, map-manifest, AI-context and build-manifest reports
- generate runtime memory/spill reports from `runtime` blocks
- generate Markdown documentation from compiled API, webhook, type, security and deployment contracts
- regenerate `app.ai-guide.md` after successful builds
- write GPU, photonic and ternary planning artefacts

Run from the repository root:

```bash
npm run check
npm run tokens
npm run fmt:check
npm test
npm run schema
npm run openapi
npm run build:examples
npm run verify
node compiler/LO.js run examples/hello.lo
node compiler/LO.js run examples/hello.lo --generate --out .build-dev-run
node compiler/LO.js generate examples --exclude source-map-error.lo --out .build-dev
node compiler/LO.js dev examples/hello.lo --out .build-dev
node compiler/LO.js dev examples/hello.lo --watch --out .build-dev
node compiler/LO.js serve examples --dev
node compiler/LO.js init my-LO-app
node compiler/LO.js explain examples/source-map-error.lo --for-ai
```

The generated `app.bin` and `app.wasm` files are placeholders. They prove the
build layout and report contracts, not native execution.

## Lexer

The lexer lives in `compiler/lexer.js` and emits `app.tokens.json` during build.
Token reports use `schemas/tokens.schema.json` and include the token type, value,
file, line, column, byte offset and length. Lexical errors are surfaced through
the same diagnostics channel as parser and target-checking errors.

Diagnostics now include standard LO codes, levels, categories, recovery
actions, timestamps and structured source locations while preserving the older
`severity`, `errorType`, `problem` and `suggestedFix` fields used by the
prototype tests and reports.

Target planning now includes `app.omni-logic.sim` and optional `omni` targets
for future-compatible logic-width simulation.

Memory-variable checks now warn on explicit `Json.clone()` and reject mutation
through read-only `&Json` parameters.

Development output commands now include `LO generate`, `LO dev`,
`LO dev --watch` and `LO run --generate`. They write reports and docs to
`.build-dev/` by default without producing production binaries or build
manifests.

## Formatter

The formatter lives in `compiler/formatter.js`.

```bash
node compiler/LO.js fmt examples --check
node compiler/LO.js fmt examples
```

The first command reports files that would change. The second rewrites `.lo`
files using two-space indentation, trimmed trailing whitespace and a single final
newline.

## Tests

The prototype test command validates the current examples:

```bash
node compiler/LO.js test examples
```

It checks that `hello.lo` parses as a secure `main` flow, `boot.lo` parses the
project entry and targets, valid examples have no error diagnostics, the
intentional source-map fixture still reports a target compatibility error, and
the examples are formatter-clean. It also includes in-memory negative checks for
unknown types and missing enum match cases.

## Type Checker

The first type checker lives in `compiler/type-checker.js`.

It validates:

- unknown declared type references
- generic arity for `Option`, `Result`, `Array`, `Map`, `Vector`, `Matrix` and related types
- exhaustive `match` cases for enum values, `Option<T>` and `Result<T, E>`

It does not yet infer expression types or validate handler return expressions.

## Strict Comments

The lexer preserves normal `//` comments and `///` documentation comments.
`/// @tag value` comments are treated as strict comments by the prototype.

```LO
/// @purpose Updates an order.
/// @output Result<Order, Error>
/// @effects [database.write]
secure flow updateOrder(order: Order) -> Result<Order, Error>
effects [database.write] {
  return Ok(order)
}
```

The v0.1 compiler extracts strict comments into AST, source-map, security and
AI-context reports. It also reports obvious mismatches, such as `@output` not
matching a flow return type or `@effects` not matching a declared effects list.
Strict comments are not required everywhere yet; v0.1 treats missing strict
comments as a design/linting concern rather than a build error.

## JSON Schema and OpenAPI

The schema generator lives in `compiler/schema-generator.js`.

```bash
node compiler/LO.js schema examples/api-orders.lo
node compiler/LO.js schema examples/api-orders.lo --type CreateOrderRequest
node compiler/LO.js openapi examples/api-orders.lo
```

Builds write `app.schemas.json` and `app.openapi.json`. The JSON Schema output
is a draft contract for LO type declarations and includes custom types in
`$defs`.

## Build Verification

Build manifests include target outputs, report files and SHA-256 hashes for
every generated artefact except the manifest itself.

```bash
node compiler/LO.js verify build/examples
node compiler/LO.js verify build/examples/app.build-manifest.json
```

Verification checks that artefacts exist, hashes match and JSON reports parse.

## Map Manifest and Generated Docs

Builds write `app.map-manifest.json` and generated documentation under
`docs/`. The map manifest explains how source files, routes, webhooks, types,
flows and compute blocks map into generated outputs.

Generated docs currently include:

```text
docs/api-guide.md
docs/webhook-guide.md
docs/type-reference.md
docs/global-registry-guide.md
docs/security-guide.md
docs/runtime-guide.md
docs/memory-pressure-guide.md
docs/run-compile-mode-guide.md
docs/deployment-guide.md
docs/ai-summary.md
docs/docs-manifest.json
```

The `boot.lo` `build` block may declare `require_outputs`; when
`fail_on_missing_output true` is set, the build fails if a required artefact is
not generated.

## AI Guide

Successful builds write `app.ai-guide.md` when the `ai_guide` block is enabled.
The guide is generated from the same AST, reports, strict comments, source maps
and target summaries used by the build.

The prototype only updates the AI guide after an error-free build. A failed
build may still write `app.failure-report.json`, but it does not overwrite the
last valid AI guide. The guide hash is recorded in `app.build-manifest.json`.

The AI guide foLOws these build explanation principles:

```text
If LO can compile it, LO should be able to explain it.
If the code compiles, the AI guide should describe the code that actually compiled.
Compiled code should always come with generated explanation.
```

## Runtime Report

`runtime` blocks in `boot.lo` are extracted into `app.runtime-report.json` and
`docs/runtime-guide.md`.

The prototype records memory soft/hard limits, ordered pressure actions and
spill policy. Spill storage is treated as aLOw-list only; secret and request
context types such as `SecureString`, `SessionToken`, `PaymentToken` and
`PrivateKey` should remain denied from spill.

## Memory Report

`app.memory-report.json` and `docs/memory-pressure-guide.md` describe the
broader memory model derived from the runtime policy. They cover the memory
pressure ladder, cache bypass semantics, queue/channel pressure expectations,
JSON stream spill expectations, approved spill data, denied spill data and
recommendations.

The key cache rule is that a cache limit does not change correctness: calculate
and return the result, then bypass cache storage and report the bypass.

## Execution Report

`app.execution-report.json` and `docs/run-compile-mode-guide.md` describe Run
Mode, Serve Mode and Compile Mode policy. Run Mode is checked execution for
small scripts and development. Compile Mode is the production path that writes
target outputs, reports, manifests, generated docs and AI guides.

The v0.1 `LO run` command executes simple checked `main` scripts with
`print("...")` output. The v0.1 `LO serve --dev` command reports the planned
development runtime state; it does not start a production HTTP server.

## Global Report

`globals` blocks in `boot.lo` are extracted into `app.global-report.json` and
`docs/global-registry-guide.md`.

The prototype records `const`, `config`, `secret` and `state` declarations.
Secret values are redacted. Secret globals must use `SecureString`, duplicate
global names are rejected and direct printing/logging of registered secrets is
reported as an error.

## Target Planning

`LO targets` emits the target compatibility report used by
`app.target-report.json`.

```bash
node compiler/LO.js targets examples
```

The report includes declared targets, compute blocks, fallback coverage,
unsupported operations and source locations for each compute block. GPU and
photonic outputs remain plan-only in this prototype; binary CPU output is the
compatibility baseline.

`compute target ... verify cpu_reference` marks a compute block for CPU-reference
verification where practical. Builds also write `app.precision-report.json`,
which tracks practical accelerator risks such as signal noise, precision loss,
analogue drift, calibration errors, thermal effects, target mismatch, wrong
fallback target, rounding differences and hardware-specific behaviour.

The precision report also records an error-correction policy: detect divergence,
measure precision difference, retry transient target errors, fall back through
declared targets, use CPU reference output when available, and fail closed when
tolerance or confidence rules are violated.

## AI Context

`LO ai-context` writes compact JSON and Markdown summaries for AI tools:

```bash
node compiler/LO.js ai-context examples --out build/examples
```

The JSON report includes source file hashes, changed-file status when Git is
available, route/type/flow summaries, strict comment summaries, target
compatibility summary, security summary, diagnostics and suggested next actions.
