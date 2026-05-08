# LO BitNet

`lo-bitnet` is the package for BitNet-style 1.58-bit and ternary AI inference
contracts.

It belongs in:

```text
/packages/lo-bitnet
```

Use this package for:

```text
BitNet model metadata
GGUF model references
1.58-bit and ternary quantization declarations
CPU BitNet inference adapter contracts
thread, timeout and memory limits
BitNet inference reports
BitNet-specific safety limits
```

## BitNet Role

BitNet is useful to LO as an optional CPU AI inference backend when GPU, NPU or
other accelerators are unavailable or not allowed. The official `bitnet.cpp`
project describes optimized 1-bit/1.58-bit inference for CPU and GPU, with the
initial release focused on CPU inference.

Reference sources:

- https://github.com/microsoft/BitNet
- https://github.com/microsoft/BitNet/blob/main/src/README.md
- https://arxiv.org/abs/2402.17764

## Boundary

`lo-bitnet` does not define LO `Tri` semantics. BitNet ternary weights are AI
model weights; LO `Tri` and `Logic<N>` belong in `lo-logic`.

`lo-bitnet` should not own generic AI contracts, CPU feature detection or kernel
implementations. Those belong in `lo-ai`, `lo-target-cpu` and
`lo-cpu-kernels`.

Final rule:

```text
lo-bitnet adapts BitNet-style AI inference.
lo-ai defines generic AI inference contracts.
lo-logic defines language-level ternary logic.
```
