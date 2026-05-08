# LO Target Photonic

`lo-target-photonic` is the compiler target package for photonic hardware,
photonic simulators and photonic planning output.

Status: early package scaffold. The current package defines boundaries and
initial TypeScript contracts only; it does not provide a real photonic hardware
backend.

It belongs in:

```text
/packages/lo-target-photonic
```

Think of it as:

```text
lo-target-photonic teaches the compiler how to aim code at a photonic target.
```

Use this package for:

```text
photonic backend plans
photonic target capabilities
logic-to-photonic lowering plans
photonic simulation targets
photonic target reports
photonic execution plans
photonic simulation output
hardware mapping files
fallback reports
optical channel layout reports
matrix operation mapping reports
```

`lo-target-photonic` is about where the code is going.

It answers:

```text
Can this flow be mapped to a photonic target?
What photonic target is available?
What operations can run photonically?
What falls back to CPU?
What plan/report should be generated?
What simulator or hardware backend should receive the output?
```

## Target Role

`lo-target-photonic` sits after language checking and compute planning.

```text
.lo source
  ->
lo-core / lo-compiler
  ->
lo-compute
  ->
lo-target-photonic
  ->
photonic plan, simulator output or hardware mapping report
```

The package should accept checked compiler/compute output and decide whether a
flow can be represented as a photonic target plan.

It should be able to return:

```text
photonic-compatible
photonic-simulation-only
fallback-required
unsupported
```

## Boundary

`lo-target-photonic` should use `lo-photonic` concepts such as wavelength,
phase, amplitude, optical signal and optical channel. It should not own the
general photonic vocabulary itself.

`lo-target-photonic` should consume plans from `lo-compute` and concepts from
`lo-photonic`, then produce target-specific outputs.

It should not own:

```text
Tri or Logic<N> semantics
vector/matrix operation semantics
compute target selection policy
photonic vocabulary
runtime API/auth policy
general compiler parsing/checking
```

Those belong in `lo-logic`, `lo-vector`, `lo-compute`, `lo-photonic`,
`lo-app-kernel` and `lo-compiler`.

## Inputs

Expected inputs:

```text
checked flow or IR summary from lo-compiler
compute plan from lo-compute
vector/matrix operation summary from lo-vector
photonic concepts from lo-photonic
target preferences from project config
available target capability map
```

The first implementation should start with planning and reports rather than
hardware execution.

## Outputs

Example outputs:

```text
/build/photonic/app.photonic.plan.json
/build/reports/photonic-target-report.json
/build/reports/photonic-fallback-report.json
/build/reports/photonic-channel-layout-report.json
/build/reports/photonic-matrix-mapping-report.json
```

Example report:

```json
{
  "flow": "multiplyFast",
  "requestedTarget": "photonic",
  "actualTarget": "photonic_sim",
  "fallback": false,
  "channels": [
    { "wavelength": "1550nm" },
    { "wavelength": "1551nm" }
  ],
  "notes": [
    "Generated photonic simulation plan. No physical hardware backend selected."
  ]
}
```

## Target Report Fields

A photonic target report should include:

```text
flow name
requested target
actual target
simulator or backend name
fallback status
fallback target
mapped operations
unsupported operations
optical channels
wavelength layout
precision notes
hardware assumptions
diagnostics
safe suggested fixes
```

## Fallback Rules

Photonic targeting must fail safely.

Rules:

```text
do not silently claim hardware execution
fall back only when fallback is declared
report every fallback decision
require CPU reference verification where precision matters
deny side effects inside photonic compute regions
do not expose secrets or environment values in reports
```

Example source using both packages:

```lo
import vector
import photonic

photonic vector flow multiplyFast(input: Matrix<Float32>) -> Matrix<Float32> {
  compute target photonic fallback cpu {
    return photonic.matmul(input)
  }
}
```

Package roles in that flow:

```text
lo-photonic
  provides photonic.matmul()
  provides photonic modelling types
  understands wavelength/phase/amplitude concepts

lo-target-photonic
  checks whether multiplyFast can target photonic execution
  creates photonic plan/output
  reports unsupported operations
  defines fallback to CPU if needed
```

## Related Packages

| Package | Responsibility |
| --- | --- |
| `lo-photonic` | Photonic types, models, APIs and simulations |
| `lo-target-photonic` | Compiler backend, output target and hardware or simulator mapping |
| `lo-vector` | Vector, matrix, tensor types and operations |
| `lo-compute` | `compute auto`, target selection and fallback planning |
| `lo-target-binary` | Normal CPU/native binary output |
| `lo-target-gpu` | GPU target planning and output contracts |
| `lo-reports` | Shared report schemas and report-writing contracts |

## First Version Scope

The first version should support:

```text
define photonic target capability model
define input contract from lo-compute
define photonic plan output format
define simulation target report format
define unsupported-operation diagnostics
define fallback report format
define optical channel layout report format
define matrix operation mapping report format
add examples
add tests
```

Do not start with:

```text
real hardware execution
vendor SDK integration
automatic deployment to photonic hardware
opaque precision claims
runtime auth/API enforcement
general photonic vocabulary ownership
```

Final rule:

```text
lo-photonic defines photonic concepts.
lo-target-photonic maps compiled LO code to photonic hardware, simulators or plans.
```
