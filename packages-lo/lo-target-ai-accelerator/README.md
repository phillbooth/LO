# LO Target AI Accelerator

`lo-target-ai-accelerator` is the package for NPU, TPU, AI-chip and related
accelerator target planning contracts.

It belongs in:

```text
/packages-lo/lo-target-ai-accelerator
```

Use this package for:

```text
NPU target capability reports
TPU target capability reports
AI accelerator target planning
passive accelerator backend profiles
framework adapter planning
precision support reports
memory limit reports
HBM and accelerator memory reports
multi-card topology reports
model operation mapping plans
fallback reports
```

## Boundary

This package plans AI accelerator targets. It does not define neural network
models, tensor shapes, generic AI safety policy or CPU fallback kernels.

AI accelerator support should stay passive and vendor-neutral. LO source should
prefer `ai_accelerator`, not a vendor name such as `gaudi`.

Vendor devices should be represented as backend profiles selected by config,
adapter policy or capability detection:

```text
ai_accelerator
  backend profile intel.gaudi3.hl338
```

## Intel Gaudi Profile

Intel Gaudi 3 should be represented as an AI accelerator backend profile, not as
a CPU or GPU target and not as permanent LO syntax.

The first implementation should use controlled adapters over existing framework
ecosystems such as PyTorch, vLLM, Hugging Face, DeepSpeed, TensorFlow and
PyTorch Lightning where available.

Gaudi-style profile reports should include:

```text
backend profile id
selected framework adapter
selected precision
fallback precision
HBM budget
host-to-accelerator transfer warnings
multi-card topology
fallback target
```

Related packages:

| Package | Responsibility |
|---|---|
| `lo-neural` | Neural model, layer, inference and training contracts |
| `lo-vector` | Vector, matrix and tensor shape contracts |
| `lo-ai` | Generic AI inference safety and report contracts |
| `lo-compute` | Target selection and fallback planning |
| `lo-target-cpu` | CPU fallback target planning |
| `lo-target-gpu` | GPU target planning |
| `lo-lowbit-ai` | Low-bit AI backend selection |
| `lo-target-photonic` | Future photonic target planning |
| `lo-benchmark` | Generic AI accelerator benchmark diagnostics |

Final rule:

```text
lo-target-ai-accelerator maps suitable AI workloads to NPU/TPU/AI-chip plans.
Vendor-specific devices are passive backend profiles, not language syntax.
It does not make any accelerator mandatory for LO.
CPU-compatible fallback remains the baseline.
```
