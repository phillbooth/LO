# BitNet CPU Fallback

## Summary

LO can use BitNet as an optional local AI inference backend when GPU, NPU or
other accelerator targets are unavailable. This should improve CPU fallback for
compatible 1-bit/1.58-bit models, but it is not a general CPU optimizer for all
LLMs.

Primary references:

- https://github.com/microsoft/BitNet
- https://github.com/microsoft/BitNet/blob/main/src/README.md
- https://arxiv.org/abs/2402.17764

## Package Split

```text
lo-ai
  generic AI inference contracts, model metadata, safety policy and reports

lo-bitnet
  BitNet-style 1.58-bit / ternary model references and CPU inference plans

lo-target-cpu
  CPU feature, SIMD, threading, memory and fallback capability contracts

lo-cpu-kernels
  optimized CPU kernel contracts for GEMM, GEMV, matrix and low-bit work

lo-compute
  target preference, fallback and target selection reports
```

This keeps BitNet out of `lo-core`. LO core can define compute block syntax and
report contracts later, but model runtimes and CPU kernels stay in sibling
packages.

## Compute Policy

Recommended target order for AI inference:

```text
prefer gpu
fallback npu
fallback cpu.bitnet
fallback cpu.generic
report true
```

Selection rules:

```text
1. Use GPU or NPU when available, permitted and compatible with the model.
2. Use cpu.bitnet when the model is BitNet-compatible and CPU capability checks pass.
3. Use cpu.generic only when a normal CPU backend is acceptable.
4. Reject the plan if fallback is required and no compatible backend exists.
5. Always emit a target selection report.
```

## Safety Rules

AI inference declarations should include:

```text
model path
model format
quantization
context token limit
output token limit
memory estimate
thread limit
timeout
selected target report
```

AI output is untrusted by default. It must not directly approve payments,
grant access, change security policy or make other high-impact decisions.
Deterministic application policy must decide how AI output is used.

## Ternary Boundary

BitNet b1.58 uses ternary model weights. LO `Tri` also uses a three-state value
shape, but the meaning is different:

```text
lo-logic
  language-level Tri, Logic<N>, Decision and Omni semantics

lo-bitnet
  model-level ternary weights for AI inference
```

Do not make `lo-logic` depend on BitNet.

## Report Shape

```json
{
  "flow": "summariseText",
  "requested": "compute auto",
  "selectedTarget": "cpu.bitnet",
  "reason": "GPU unavailable; model supports BitNet b1.58 CPU inference",
  "model": "BitNet-b1.58-2B-4T",
  "quantization": "i2_s",
  "embeddingQuantization": "q6_k",
  "threads": 8,
  "fallback": true,
  "warnings": []
}
```

## Improved Recommendation

Use BitNet where it is strongest: local CPU inference for compatible low-bit AI
models. Keep the CPU target and CPU kernel packages generic so non-BitNet
matrix/vector work can still benefit from CPU-specific planning later.
