# LO Compute

`lo-compute` is the package for LO compute planning concepts.

It belongs in:

```text
/packages/lo-compute
```

Use this package for:

```text
compute plans
compute capabilities
compute budgets
compute effects
target selection
offload planning
fallback planning
CPU BitNet fallback planning
compute reports
```

## Boundary

`lo-compute` should describe how work can be planned across targets. It should
not own target-specific binary output, AI model formats, CPU kernels or
photonic mapping.

For AI inference, `lo-compute` may express preference and fallback order such
as:

```text
prefer gpu
fallback npu
fallback cpu.bitnet
fallback cpu.generic
```

The actual AI model contracts belong in `lo-ai`, BitNet-specific model support
belongs in `lo-bitnet`, CPU capability planning belongs in `lo-target-cpu`, and
optimized CPU kernel contracts belong in `lo-cpu-kernels`.

Final rule:

```text
lo-compute plans work.
lo-ai describes AI inference.
lo-bitnet describes BitNet-specific inference.
lo-target-binary emits binary/native target plans.
lo-target-photonic emits photonic target plans.
```
