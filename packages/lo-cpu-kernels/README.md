# LO CPU Kernels

`lo-cpu-kernels` is the package for optimized CPU kernel contracts.

It belongs in:

```text
/packages/lo-cpu-kernels
```

Use this package for:

```text
GEMM and GEMV kernel descriptions
vector dot product plans
matrix multiplication plans
low-bit operation contracts
ternary operation contracts
threading and tiling plans
cache-aware block sizes
embedding quantization planning
kernel benchmark reports
```

## Boundary

`lo-cpu-kernels` describes CPU kernels and their constraints. It should not own
AI model metadata, target selection policy or LO language syntax.

Final rule:

```text
lo-cpu-kernels describes optimized CPU kernels.
lo-target-cpu describes CPU capability and fallback selection.
lo-bitnet chooses BitNet-compatible kernel requirements.
```
