# LO Target CPU

`lo-target-cpu` is the package for CPU target capability and fallback planning.

It belongs in:

```text
/packages-lo/lo-target-cpu
```

Use this package for:

```text
CPU architecture detection contracts
x86-64 and ARM64 capability descriptions
SIMD feature reports
threading policy
memory limits
CPU fallback reports
CPU AI inference target planning
```

## Boundary

`lo-target-cpu` should not implement kernels directly. Optimized CPU kernel
descriptions belong in `lo-cpu-kernels`; AI model adapters belong in `lo-ai`
and `lo-ai-lowbit`.

## Contracts

The package includes typed contracts for CPU feature probes, SIMD capability,
threading policy, low-bit CPU path checks, fallback selection diagnostics and
calibration reports.

Final rule:

```text
lo-target-cpu decides whether the CPU can run the work.
lo-cpu-kernels describes optimized CPU kernels.
lo-ai-lowbit describes low-bit AI backend inference plans.
```
