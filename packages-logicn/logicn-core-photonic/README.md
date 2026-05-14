# LogicN Photonic

`logicn-core-photonic` is the package for photonic concepts, types, models and APIs.

It belongs in:

```text
/packages-logicn/logicn-core-photonic
```

Think of it as:

```text
logicn-core-photonic teaches LogicN what photonic computing means.
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

`logicn-core-photonic` is about what the developer can express.

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

`logicn-core-photonic` must not own `Tri`, `LogicN` or Omni logic semantics. Those
belong in `logicn-core-logic`.

`logicn-core-photonic` must not own compiler backend output, hardware mapping files,
target reports or fallback decisions. Those belong in `logicn-target-photonic`.

Photonic may map logic states to light properties:

```text
Tri.Negative / -1 -> phase 180deg
Tri.Neutral  /  0 -> amplitude 0
Tri.Positive / +1 -> phase 0deg

Decision.Deny   -> phase 180deg
Decision.Review -> amplitude 0
Decision.Allow  -> phase 0deg
```

This is a representation mapping, not ownership of `Tri`. The truth semantics
for `-1`, `0` and `+1` stay in `logicn-core-logic`.

Example signal:

```LogicN
import photonic

let signal: OpticalSignal = photonic.signal {
  wavelength 1550 nm
  phase 90 deg
  amplitude 0.75
}
```

Example model:

```LogicN
photonic model MatrixMultiply {
  channels {
    wavelength 1550 nm
    wavelength 1551 nm
    wavelength 1552 nm
  }
}
```

Used together with the target package:

```LogicN
import vector
import photonic

photonic vector flow multiplyFast(input: Matrix<Float32>) -> Matrix<Float32> {
  compute target photonic fallback cpu {
    return photonic.matmul(input)
  }
}
```

In that example, `logicn-core-photonic` provides `photonic.matmul()` and the modelling
types. `logicn-target-photonic` checks whether the flow can target photonic
execution and generates the target plan/report.

## Related Packages

| Package | Responsibility |
| --- | --- |
| `logicn-core-photonic` | Photonic types, models, APIs and simulations |
| `logicn-target-photonic` | Compiler backend, output target and hardware or simulator mapping |
| `logicn-core-vector` | Vector, matrix, tensor types and operations |
| `logicn-core-compute` | `compute auto`, target selection and fallback planning |
| `logicn-target-binary` | Normal CPU/native binary output |
| `logicn-ai-neural` | Neural model, layer, inference and training boundaries |
| `logicn-target-ai-accelerator` | NPU, TPU and AI-chip target planning |

Final rule:

```text
logicn-core-logic handles the logic model.
logicn-core-photonic handles what photonic means.
logicn-target-photonic handles how LogicN outputs to photonic systems.
```
