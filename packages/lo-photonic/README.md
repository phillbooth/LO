# LO Photonic

`lo-photonic` is the package for photonic concepts, types, models and APIs.

It belongs in:

```text
/packages/lo-photonic
```

Think of it as:

```text
lo-photonic teaches LO what photonic computing means.
```

Use this package for:

```text
Wavelength
Phase
Amplitude
OpticalSignal
OpticalChannel
PhotonicMode
PhotonicPlan
Mach-Zehnder models
wavelength-division multiplexing models
optical matrix multiplication models
photonic simulation
logic-to-light mapping
```

`lo-photonic` is about what the developer can express.

It answers:

```text
What is a wavelength?
What is a phase?
What is an optical signal?
How do we model photonic compute?
How do we describe photonic matrix operations?
How do we simulate photonic behaviour?
```

## Boundary

`lo-photonic` must not own `Tri`, `Logic<N>` or Omni logic semantics. Those
belong in `lo-logic`.

`lo-photonic` must not own compiler backend output, hardware mapping files,
target reports or fallback decisions. Those belong in `lo-target-photonic`.

Photonic may map logic states to light properties:

```text
Decision.Deny   -> phase 180deg
Decision.Review -> amplitude 0
Decision.Allow  -> phase 0deg
```

Example signal:

```lo
import photonic

let signal: OpticalSignal = photonic.signal {
  wavelength 1550 nm
  phase 90 deg
  amplitude 0.75
}
```

Example model:

```lo
photonic model MatrixMultiply {
  channels {
    wavelength 1550 nm
    wavelength 1551 nm
    wavelength 1552 nm
  }
}
```

Used together with the target package:

```lo
import vector
import photonic

photonic vector flow multiplyFast(input: Matrix<Float32>) -> Matrix<Float32> {
  compute target photonic fallback cpu {
    return photonic.matmul(input)
  }
}
```

In that example, `lo-photonic` provides `photonic.matmul()` and the modelling
types. `lo-target-photonic` checks whether the flow can target photonic
execution and generates the target plan/report.

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
lo-logic handles the logic model.
lo-photonic handles what photonic means.
lo-target-photonic handles how LO outputs to photonic systems.
```
