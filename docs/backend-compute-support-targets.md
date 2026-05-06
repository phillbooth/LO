# LO Backend Compute Support Targets

This document tracks compute targets and hardware capability areas that **LO / Logic Omni** should cater for when designing `compute auto`, target reports, runtime capability detection, compiler backends and future compute APIs.

LO source files use the `.lo` extension. Examples in this document use `.lo` syntax.

The purpose is not to assume every LO implementation can support every target. The purpose is to keep the backend model broad enough that CPU, GPU, AI accelerators, photonic accelerators and memory/interconnect hardware can be represented as separate but connected parts of the compute stack.

References for background context:

```text
Photonic matrix multiplication and photonic acceleration:
https://www.nature.com/articles/s41377-022-00717-8

AWS Graviton:
https://aws.amazon.com/ec2/graviton/

Google Axion:
https://cloud.google.com/products/axion

Intel Xeon:
https://www.intel.com/content/www/us/en/products/details/processors/xeon.html

AMD EPYC:
https://www.amd.com/en/products/processors/server/epyc.html

NVIDIA Grace:
https://www.nvidia.com/en-gb/data-center/grace-cpu/

Google Cloud TPU:
https://cloud.google.com/tpu

AWS Trainium:
https://aws.amazon.com/ai/machine-learning/trainium/

AWS Inferentia:
https://aws.amazon.com/ai/machine-learning/inferentia/
```

---

## Core Model

Beginner-friendly code should use:

```lo
compute auto {
  use best available target
  preserve correctness
  report chosen hardware
  fallback safely
}
```

Advanced users may request specific target chains:

```lo
compute target gpu fallback cpu {
  ...
}
```

```lo
compute target ai_accelerator fallback gpu fallback cpu {
  ...
}
```

```lo
compute target photonic_mzi fallback ai_accelerator fallback gpu fallback cpu {
  ...
}
```

The backend should select the best target based on:

```text
workload type
operation type
data size
shape information
precision requirements
hardware availability
data movement cost
energy/cost policy
security policy
fallback policy
verification requirements
```

---

## Compute Layers

LO should model compute as layers, not as competing hardware families.

```text
CPU                 = control, OS, security, exact logic, APIs, files, fallback
GPU                 = parallel maths, simulation, graphics, matrix/vector work
AI accelerator      = tensor/model training and inference where available
Photonic accelerator = optical matrix/signal workloads where suitable
Memory/interconnect = data movement, bandwidth, topology and scheduling
```

The CPU remains the final safe fallback unless a policy explicitly denies CPU fallback.

---

## Photonic Compute Support

Photonic chips should be treated as specialised accelerators, not general-purpose CPUs.

LO should cater for these photonic target names:

```text
photonic_auto
photonic_mzi
photonic_wdm
photonic_ring
photonic_crossbar
photonic_interconnect
photonic_signal
```

Target discovery should report:

```text
device availability
photonic type
driver/runtime version
firmware version
calibration state
thermal state
supported precision
supported matrix/vector dimensions
supported wavelength/channel counts
health status
fallback reason if unavailable
```

MZI support should cater for:

```text
Mach-Zehnder interferometer mesh support
optical phase control
interference-based weighting
matrix/vector multiplication mapping
calibration of MZI paths
temperature drift correction
error/tolerance reporting
```

WDM support should cater for:

```text
wavelength-division multiplexing
multiple light wavelengths/channels
parallel optical data movement
channel allocation
wavelength collision/error detection
```

Good photonic candidates:

```text
matrix multiplication
vector multiplication
linear algebra kernels
neural network dense layers
signal processing
large vector transforms
Fourier-like transforms where hardware supports them
optical preprocessing before electronic compute
```

Poor photonic candidates:

```text
API routing
JSON parsing
database access
file I/O
payment logic
security decisions
exact accounting
secret handling
```

Fallback rules:

```text
photonic -> GPU
photonic -> AI accelerator
photonic -> CPU vector
photonic -> CPU
```

Fallback should occur if the photonic target is unavailable, calibration fails, precision is insufficient, the workload is unsuitable or data movement cost is too high.

---

## CPU Support

Regular binary CPUs remain the main control layer.

LO should cater for:

```text
cpu
safe_cpu
cloud_cpu
server_cpu
cpu_x86_64
cpu_arm64
cpu_riscv64
```

CPU target discovery should report:

```text
architecture
cloud/server CPU family
virtualised CPU features
core and thread counts
memory limits
SIMD/vector capabilities
NUMA topology
cache information where available
memory bandwidth where available
power/thermal information where available
```

CPU responsibilities:

```text
operating system control
process management
file system access
environment variables
network sockets
logging
permissions
security policy enforcement
business logic
Decimal money calculations
date/time handling
string processing
JSON processing
database queries
authentication and authorisation
API request validation
CPU fallback for accelerators
```

CPU vector/SIMD support should cater for:

```text
AVX
AVX2
AVX-512
Arm NEON
Arm SVE
future RISC-V vector support
vectorised loops
parallel CPU execution
thread pools
```

---

## GPU Support

GPU targets are the general parallel compute layer.

LO should cater for:

```text
gpu
gpu_cuda
gpu_rocm
gpu_vulkan
gpu_directx
gpu_metal
webgpu
opencl
```

GPU target discovery should report:

```text
available devices
vendor
driver version
runtime version
firmware version where available
device memory
compute capability
supported precision
supported APIs
memory pressure
thermal status
power status
health status
multi-device topology
failure/reset state
```

Good GPU candidates:

```text
parallel loops
vector maths
matrix maths
simulation
image/video processing
physics workloads
scientific workloads
batch processing
AI inference
AI training
```

---

## AI Accelerator Support

LO should model dedicated AI accelerators separately from generic GPUs.

Target names:

```text
ai_accelerator
tpu
trainium
inferentia
npu
ai_asic
edge_ai
accelerator_auto
```

AI accelerator support should cater for:

```text
AI training
AI inference
transformer acceleration
tensor operations
quantised model execution
large language model inference
embeddings
recommendation models
vision models
speech models
model loading
model compilation
tensor graph optimisation
kernel fusion
batch scheduling
streaming inference
token-by-token inference
model fallback
model explain/report output
```

Precision support should include where available:

```text
Float64
Float32
Float16
BFloat16
FP8
INT8
INT4
quantised model formats
mixed precision
Float16 input with Float32 accumulation
```

---

## Hybrid CPU/GPU and Memory/Interconnect Support

LO should cater for hybrid systems where CPU, GPU and memory are tightly connected.

Target names:

```text
hybrid_cpu_gpu
unified_memory
memory_interconnect
optical_interconnect
```

Hybrid support should report:

```text
unified memory availability
shared address space support
CPU/GPU scheduling policy
data transfer cost
coherent memory support
HBM availability
NUMA topology
PCIe bandwidth
NVLink-style interconnect
Infinity-Fabric-style interconnect
optical interconnect capability
memory bandwidth profile
```

The backend should minimise data movement and explain when moving data outweighs accelerator benefit.

---

## Compute Auto Selection

For `compute auto`, LO should evaluate:

```text
is the flow pure?
does the block use numeric/vector/matrix/tensor work?
is the operation suitable for an accelerator?
are shapes known, inferred or bounded?
is precision acceptable?
is the target available?
is target setup/calibration healthy?
is data movement cost acceptable?
is fallback allowed?
is CPU verification required?
does security policy allow this target?
```

Suggested priority can be configured in `boot.lo`:

```lo
compute {
  target_selection "auto"

  prefer [
    photonic_mzi,
    ai_accelerator,
    gpu,
    cpu_vector,
    cpu
  ]

  fallback true
}
```

Selection should be reportable:

```json
{
  "computeTargetSelection": {
    "flow": "scoreFraud",
    "source": "src/risk/fraud.lo:8",
    "computeMode": "auto",
    "selectedTarget": "gpu",
    "preferredTarget": "photonic_mzi",
    "fallbackUsed": true,
    "fallbackReason": "photonic_mzi runtime not available",
    "checkedTargets": [
      "photonic_mzi",
      "ai_accelerator",
      "gpu",
      "cpu_vector",
      "cpu"
    ]
  }
}
```

---

## Security Rules

Accelerator compute must not bypass LO safety.

Rules:

```text
compute auto cannot perform file I/O
compute auto cannot perform database I/O
compute auto cannot call APIs
compute auto cannot handle secrets unless explicitly allowed
compute auto cannot make final security decisions directly
photonic targets cannot run business side effects
AI accelerator targets cannot silently change precision
fallback must be reported
unsupported targets must fail safely
target reports must be source-mapped
```

---

## TODO Implications

This document expands the backend design scope. The following should remain open until implemented or specified in detail:

```text
target discovery for photonic variants
target discovery for AI accelerator variants
target discovery for memory/interconnect hardware
compute auto parser support
boot.lo compute preference parser support
target capability report schema expansion
precision/tolerance report schema
data movement cost reporting
photonic calibration/health reporting
AI model runtime report schema
memory/interconnect report schema
```

---

## Final Principle

LO should make the common path simple and the advanced path explicit.

Final rule:

```text
CPU controls and validates.
GPU parallelises.
AI accelerators specialise model work.
Photonic accelerators specialise suitable optical matrix/signal work.
Memory/interconnect planning prevents data movement from becoming invisible.
compute auto chooses, verifies, reports and falls back safely.
```
