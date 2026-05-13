# LO Vector

`lo-core-vector` is the package for LO vector value and vector operation concepts.

It belongs in:

```text
/packages-lo/lo-core-vector
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

Use `lo-core-vector` for pure numeric value shapes used by compute-heavy flows:

```lo
pure vector flow normalize(input: Vector<Float32, 768>) -> Vector<Float32, 768> {
  return vector.normalize(input)
}
```

Neural-network packages may consume vector, matrix and tensor contracts from
`lo-core-vector`, but they should not redefine those shapes themselves.

## Boundary

`lo-core-vector` should not own compute target selection. That belongs in
`lo-core-compute`.

`lo-core-vector` should not own photonic representation. That belongs in
`lo-photonic` and `lo-target-photonic`.

`lo-core-vector` should not own neural-network layers, training, inference or model
metadata. Those belong in `lo-ai-neural` and `lo-ai`.

Final rule:

```text
lo-core-vector describes vector, matrix and tensor values and operations.
lo-core-compute decides how compute work can be planned.
target packages decide how planned work is emitted.
```
