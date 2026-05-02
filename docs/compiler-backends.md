# Compiler Backends

LO should compile through a checked intermediate representation before backend output.

## Planned Backends

```text
cpu binary
WebAssembly
GPU plan
photonic plan
ternary simulation
omni-logic simulation
wavelength compute plan
```

## Prototype Output

The v0.1 prototype emits `app.omni-logic.sim` as a planning artefact for configurable logic-width simulation.

Wavelength compute is documented as a future analogue photonic planning target
in `docs/hybrid-logic-and-wavelength-compute.md`; the v0.1 prototype does not
emit a wavelength backend artefact.

## First Practical Implementation Target

The first practical LO implementation target is a checked interpreter/prototype running on Node.js.

This target exists to prove syntax, safety checks, diagnostics, reports and developer workflow before committing to native, WASM, GPU or hardware-specific backends.

Implementation order:

```text
1. Node.js-hosted lexer, parser, checker and simple run mode.
2. Development reports, source maps, AI context and generated guides.
3. JavaScript/browser output for browser-safe LO code.
4. WebAssembly output for isolated compute-heavy frontend/backend code.
5. Native/CPU backend once IR, memory rules and security rules stabilise.
6. GPU, photonic, wavelength and omni-logic backends as planning/report targets first.
```

This means early LO should run through a checked interpreter/prototype first, not compile directly to WASM or a native binary as the first production path.

The final long-term compiler implementation language remains a separate decision.

## Backend Rules

```text
CPU compatibility remains the baseline.
Accelerator backends must report fallback.
Logic width support must be reported as a target capability.
Unsupported operations must produce source-mapped diagnostics.
Generated reports should describe precision, fallback and target risk.
Wavelength and analogue compute must declare tolerance, fallback and CPU-reference verification policy.
```

## Kernel and Driver Backend Boundary

Kernel and driver development is not part of normal backend planning.

Rule:

```text
kernel modules are blocked by default
operating-system drivers are blocked by default
privileged device access is blocked by default
raw hardware access is blocked by default
vendor SDK driver bindings are blocked by default
```

Any backend work that crosses into kernel, driver, privileged runtime or direct
device-control territory must wait until late-stage design and requires explicit
maintainer or project permission before design or implementation starts.
