# LO Compute

`lo-compute` is the package for LO compute planning concepts.

It belongs in:

```text
/packages-lo/lo-compute
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
AI accelerator selection
low-bit AI fallback planning
optical I/O data-movement planning
topology-aware placement planning
compute reports
```

## Boundary

`lo-compute` should describe how work can be planned across targets. It should
not own target-specific binary output, AI model formats, CPU kernels or
photonic mapping.

`optical_io` is a data-movement and interconnect target, not a compute device
that runs application code by itself. LO uses it to estimate transfer cost,
prefer data locality, choose efficient transfer formats and report fallback to
PCIe, Ethernet or standard network paths.

For AI inference, `lo-compute` may express preference and fallback order such
as:

```text
prefer gpu
prefer ai_accelerator
fallback npu
fallback low_bit_ai
fallback cpu.generic
```

For distributed tensor or AI workloads, `lo-compute` may express interconnect
preference:

```text
prefer gpu
prefer optical_io for large tensor transfer
fallback ethernet
fallback cpu.generic
```

The actual AI model contracts belong in `lo-ai`, low-bit AI backend support
belongs in `lo-lowbit-ai`, CPU capability planning belongs in `lo-target-cpu`,
and optimized CPU kernel contracts belong in `lo-cpu-kernels`.

## Contracts

The package includes typed contracts for compute capabilities, budgets, target
selection, compute-auto fallback reports, offload stages, data movement totals
and aggregate compute reports.

Final rule:

```text
lo-compute plans work.
lo-ai describes AI inference.
lo-lowbit-ai describes low-bit AI backend inference.
lo-target-ai-accelerator describes passive accelerator backend profiles.
lo-target-binary emits binary/native target plans.
lo-target-photonic emits photonic target plans and optical I/O reports.
```
