# LogicN Vector

`logicn-core-vector` is the package for LogicN vector value and vector operation concepts.

It belongs in:

```text
/packages-logicn/logicn-core-vector
```

Use this package for:

```text
Vector<T, N>
Matrix<T, R, C>
Tensor<T, Shape>
Shape
Batch<T>
Float16 / Float32 / Float64 numeric element contracts
Int8 and quantized numeric element contracts
vector dimensions
vector lanes
vector operations
tensor operations
vector safety rules
vector capability reports
vector lowering hints
```

## Pure Numeric Work

Use `logicn-core-vector` for pure numeric value shapes used by compute-heavy flows:

```LogicN
pure vector flow normalize(input: Vector<Float32, 768>) -> Vector<Float32, 768> {
  return vector.normalize(input)
}
```

Neural-network packages may consume vector, matrix and tensor contracts from
`logicn-core-vector`, but they should not redefine those shapes themselves.

## Boundary

`logicn-core-vector` should not own compute target selection. That belongs in
`logicn-core-compute`.

`logicn-core-vector` should not own photonic representation. That belongs in
`logicn-core-photonic` and `logicn-target-photonic`.

`logicn-core-vector` should not own neural-network layers, training, inference or model
metadata. Those belong in `logicn-ai-neural` and `logicn-ai`.

Final rule:

```text
logicn-core-vector describes vector, matrix and tensor values and operations.
logicn-core-compute decides how compute work can be planned.
target packages decide how planned work is emitted.
```
