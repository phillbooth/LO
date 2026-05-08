# LO Target Photonic

`lo-target-photonic` is the compiler target package for photonic hardware,
photonic simulators and photonic planning output.

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

## Boundary

`lo-target-photonic` should use `lo-photonic` concepts such as wavelength,
phase, amplitude, optical signal and optical channel. It should not own the
general photonic vocabulary itself.

`lo-target-photonic` should consume plans from `lo-compute` and concepts from
`lo-photonic`, then produce target-specific outputs.

Example outputs:

```text
/build/photonic/app.photonic.plan.json
/build/reports/photonic-target-report.json
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

Final rule:

```text
lo-photonic defines photonic concepts.
lo-target-photonic maps compiled LO code to photonic hardware, simulators or plans.
```
