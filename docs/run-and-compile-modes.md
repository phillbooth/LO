# LO Run Mode and Compile Mode

This document describes the proposed Run Mode and Compile Mode design for LO /
Logic Omni.

LO should be easy to run during development, while still offering full
production benefits when compiled.

## Summary

```text
Run Mode      = quick execution for scripts, learning and development
Compile Mode  = full production build with reports, manifests and target outputs
```

Core idea:

```text
LO should be easy to run like PHP, Ruby or JavaScript during development,
but should compile like Rust or Go for production.
```

## Core Principle

```text
LO can run directly, but it becomes fully LO when it is checked, compiled,
mapped, reported and documented.
```

Run Mode should be convenient. Compile Mode should be complete.

## First Implementation Target

The first practical implementation target is checked Run Mode on the Node.js prototype.

This means the earliest useful LO should:

```text
parse .lo files
type-check the supported subset
run simple checked scripts
generate diagnostics with source locations
generate development reports and AI context
avoid native, WASM or accelerator code generation as the first hard dependency
```

Compile Mode can emit placeholder target artefacts and reports while the compiler IR and backend strategy mature.

The first production-grade backend should not be chosen until parser, type checking, startup validation, memory rules, security rules and report schemas are stable enough to preserve LO's safety guarantees.

## Execution Modes

| Mode | Purpose | Typical Command |
|---|---|---|
| `run` | Run a single script or project directly | `LO run hello.lo` |
| `run --generate` | Run and generate development docs/reports | `LO run --generate` |
| `generate` | Generate development docs/reports without running | `LO generate` |
| `dev` | Check, generate and run in development mode | `LO dev` |
| `dev --watch` | Check, generate, run and watch for changes | `LO dev --watch` |
| `serve` | Run a local API/web app in development mode | `LO serve --dev` |
| `check` | Validate without building output | `LO check` |
| `build` | Compile and generate full build artefacts | `LO build` |
| `build --release` | Production build | `LO build --mode release` |

## Run Mode

Run Mode aLOws LO source files to be executed directly.

```bash
LO run hello.lo
```

Run Mode is useful for small scripts, learning LO, local development, quick
tests, API prototypes, webhook testing, developer experiments and command-line
tools.

Run Mode must still enforce:

```text
strict types
no undefined
no silent null
explicit errors
SecureString rules
basic security checks
basic source location errors
```

## Checked Run Mode

Before execution, LO should:

```text
read boot.lo
validate project config
validate imports and packages
validate globals, env vars and secrets
validate security policy
validate routes/webhooks
validate memory/vector/json policies
parse source
type-check source
security-check source
validate imports
validate strict comments where required
validate API/webhook contracts where relevant
run if valid
```

This gives a PHP-like workflow without losing LO's safety identity.

`main()` should not run until startup validation has passed. Detailed startup
validation planning lives in `docs/startup-validation.md`.

## Development Serve Mode

LO should support a development server mode:

```bash
LO serve --dev
```

This mode is for API development, webhook development, local testing,
MVC-style application development, hot reload and quick route testing.

The v0.1 prototype plans this mode but does not start a production HTTP runtime.

## Unified Development Command

LO should have a single command for development:

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

Suggested flow:

```text
read boot.lo
run startup validation
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

## Cached Run Mode

For faster development and server execution, LO may support cached IR or
bytecode:

```text
.lo source
    -> parse
    -> type/security check
    -> cached LO IR or bytecode
    -> runtime executes cached version
```

## Compile Mode

Compile Mode builds the project into production-ready outputs.

```bash
node compiler/LO.js build examples --exclude source-map-error.lo --out build/examples
```

`LO build --mode release --target all` remains the intended future production
CLI shape. The v0.1 prototype currently writes a production-style build
directory with placeholder target outputs, reports, docs and a build manifest.

Compile Mode is for production deployment, release builds, CI/CD pipelines,
security review, API documentation, AI guide generation, target compatibility
checks, deterministic builds, auditing and rollback.

Compile Mode should run the same startup validation checks at build time before
compiling or writing production artefacts.

## Development Generated Outputs

Generated explanation should not require a production compile.

In Run Mode or Dev Mode, LO may generate development outputs:

```text
.build-dev/
|-- app.ai-guide.md
|-- app.api-report.json
|-- app.global-report.json
|-- app.memory-report.json
|-- app.openapi.json
|-- app.schemas.json
|-- app.security-report.json
|-- app.failure-report.json
|-- app.source-map.json
|-- app.map-manifest.json
|-- app.tokens.json
|-- app.ai-context.json
|-- app.ai-context.md
`-- docs/
    |-- api-guide.md
    |-- webhook-guide.md
    |-- type-reference.md
    |-- global-registry-guide.md
    |-- security-guide.md
    |-- runtime-guide.md
    |-- memory-pressure-guide.md
    |-- run-compile-mode-guide.md
    |-- deployment-guide.md
    |-- ai-summary.md
    `-- docs-manifest.json
```

These outputs should explain checked source without requiring a production binary.

## Production Generated Outputs

Production artefacts require Compile Mode.

## Compile Mode Outputs

Compile Mode should produce:

```text
app.bin
app.wasm
app.gpu.plan
app.photonic.plan
app.ternary.sim
app.omni-logic.sim
app.openapi.json
app.schemas.json
app.api-report.json
app.global-report.json
app.runtime-report.json
app.memory-report.json
app.execution-report.json
app.precision-report.json
app.security-report.json
app.target-report.json
app.failure-report.json
app.source-map.json
app.map-manifest.json
app.tokens.json
app.ai-guide.md
app.ai-context.json
app.ai-context.md
app.build-manifest.json
docs/docs-manifest.json
```

## Suggested Workflow

```text
Use LO run while developing.
Use LO check before committing.
Use LO build before deployment.
Use LO build --mode release for production.
```

## AI Guide Rule

Every successful compile should be able to generate an AI guide.

```text
If the code compiles, the AI guide should describe the code that actually compiled.
```

The AI guide should update only after a successful compile. Failed builds should
write `app.failure-report.json` without overwriting the last valid AI guide
unless explicitly configured.

## boot.lo Configuration

```LO
runtime {
  run_mode "checked"
  cache_ir true
  hot_reload true
}

build {
  mode "release"
  deterministic true
  source_maps true
  reports true
  map_manifest true
  documentation true
  ai_context true
  ai_guide true
}
```

## Run Mode vs Compile Mode

| Feature | Run Mode | Compile Mode |
|---|---:|---:|
| Run small scripts | Yes | Yes |
| Local development | Yes | Yes |
| Hot reload | Yes | No / optional |
| Development docs/reports | Optional / dev mode | Yes |
| Strict type checking | Yes | Yes |
| Security checks | Basic / full depending mode | Full |
| CPU binary output | No | Yes |
| WASM output | No | Yes |
| GPU plan | Optional | Yes |
| Photonic plan | Optional | Yes |
| Ternary simulation | Optional | Yes |
| Source maps | Basic | Full |
| Map manifest | No / optional | Yes |
| Security report | Optional | Yes |
| Target report | Optional | Yes |
| API guide | Optional | Yes |
| AI guide | Optional | Yes |
| Build manifest | No | Yes |
| Deterministic build hashes | No | Yes |
| Production deployment | Not recommended | Recommended |

## Production Recommendation

Production should use Compile Mode:

```text
build once
generate reports
generate manifest
verify artefact
deploy same artefact to many servers
load secrets at runtime
```

Do not compile real secrets into the output.

## Final Rule

```text
Run fast while developing.
Generate explanations while checking.
Compile fully before deploying.
```
