# LO Low-Bit AI

`lo-lowbit-ai` is the package for low-bit AI inference contracts.

It belongs in:

```text
/packages-lo/lo-lowbit-ai
```

Use this package for:

```text
low-bit AI model metadata
1-bit, 1.58-bit, 2-bit, 3-bit and 4-bit model references
ternary model weight declarations
generic backend adapter contracts
BitNet backend compatibility
CPU reference fallback contracts
thread, timeout and memory limits
low-bit AI inference reports
low-bit AI safety diagnostics
```

## Backend Role

LO syntax should name the intent, not one implementation:

```text
compute target low_bit_ai
compute target ternary_ai
compute auto { prefer low_bit_ai fallback cpu }
```

Backends can then be selected by configuration or runtime planning:

```text
bitnet
cpu_reference
future_standard
ternary_native
gpu_kernel
npu_kernel
```

BitNet is useful as a current backend for compatible 1.58-bit / ternary models,
but it must not become a language feature or target name.

Reference sources:

- https://github.com/microsoft/BitNet
- https://github.com/microsoft/BitNet/blob/main/src/README.md
- https://arxiv.org/abs/2402.17764

## Boundary

`lo-lowbit-ai` does not define LO `Tri` semantics. Low-bit and ternary AI
weights are model weights; LO `Tri` and `Logic<N>` belong in `lo-logic`.

`lo-lowbit-ai` should not own generic AI contracts, CPU feature detection or
kernel implementations. Those belong in `lo-ai`, `lo-target-cpu` and
`lo-cpu-kernels`.

## Contracts

The package includes typed contracts for model references, backend adapter
compatibility, runtime limits, benchmark samples, validation diagnostics and
inference reports.

Final rule:

```text
lo-lowbit-ai adapts low-bit AI inference.
bitnet is one backend inside lo-lowbit-ai.
lo-ai defines generic AI inference contracts.
lo-logic defines language-level ternary logic.
```
