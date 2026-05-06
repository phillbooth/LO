# LO Documentation

This directory contains detailed LO language, compiler, runtime and target design documents.

Root files such as `README.md`, `SPEC.md`, `DESIGN.md`, `ARCHITECTURE.md` and `OMNI_LOGIC.md` should act as entry points. Detailed subject documents should live here.

For the runnable v0.1 prototype, start with the repository-root
`GETTING_STARTED.md`, `compiler/README.md` and `examples/README.md`.

## Core Language

```text
pending-additions.md
pending-LO-additions.md
feature-status.md
language-rules.md
language-supported-primitives.md
language-non-supported-primitives.md
backend-language-gap-analysis.md
syntax.md
sytax/
dart-flutter-target.md
device-capability-boundaries.md
javascript-typescript-framework-targets.md
safe-pattern-matching-and-regex.md
tri-logic
type-system.md
lessons-from-rust.md
modules-and-visibility.md
standard-library.md
package-use-registry.md
contracts.md
glossary.md
```

## Logic and Targets

```text
omni-logic.md
logic-widths.md
logic-targets.md
hybrid-logic-and-wavelength-compute.md
hardware-feature-detection-and-security.md
target-and-capability-model.md
vector-model.md
vectorised-dataset-syntax.md
simple-vector-and-compute-auto.md
backend-compute-support-targets.md
compiler-backends.md
kernel-and-driver-boundary.md
```

## Safety and Diagnostics

```text
memory-safety.md
memory-and-variable-use.md
memory-error-correction.md
memory-pressure-and-disk-spill.md
warnings-and-diagnostics.md
system-health-warnings.md
disk-memory-and-cache-warnings.md
error-codes.md
auth-token-verification-boundaries.md
security-model.md
ransomware-resistant-design.md
strict-global-registry.md
dependencies.md
```

## API and Interop

```text
json-native-design.md
lazy-compact-json.md
api-native-design.md
api-duplicate-detection-and-idempotency.md
api-data-security-and-load-control.md
auth-token-verification-boundaries.md
webhooks.md
frontend-compilation-js-wasm.md
browser-dom-and-web-platform-primitives.md
dart-flutter-target.md
device-capability-boundaries.md
javascript-typescript-framework-targets.md
xml-support.md
graphql-support.md
search-and-translation-provider-boundaries.md
text-ai-package-boundaries-and-compute-auto.md
image-ai-package-boundaries-and-compute-auto.md
video-package-boundaries-and-compute-auto.md
interoperability.md
LO-vs-python-and-generated-outputs.md
```

## Tooling

```text
run-and-compile-modes.md
startup-validation.md
security-first-build-system.md
debug-console.md
pure-flow-caching.md
primary-lane-and-offload-nodes.md
ai-token-reduction.md
testing.md
observability.md
```

## Per-Syntax Reference

The `docs/sytax/` folder contains one-file-per-feature syntax notes.

When adding or changing LO syntax, update both the relevant design document and
the matching file under `docs/sytax/`.

The `docs/sytax-examples/` folder contains matching good/bad usage examples for
each syntax feature. Update it at the same time as `docs/sytax/`.

## Generated Build Documentation

The prototype writes generated documentation under the selected build output
directory, usually `build/examples/docs/` for production-style example builds
or `.build-dev/docs/` for development generation.

```text
api-guide.md
webhook-guide.md
type-reference.md
global-registry-guide.md
security-guide.md
runtime-guide.md
memory-pressure-guide.md
run-compile-mode-guide.md
deployment-guide.md
ai-summary.md
docs-manifest.json
```

These generated files describe the checked source and build reports. They are
separate from the hand-written design documents in this directory.
