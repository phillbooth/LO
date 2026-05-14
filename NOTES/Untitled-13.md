update documentation / add packages

Yes — that is exactly the kind of feature that would make LogicN feel more “enterprise runtime aware” rather than just a normal language.

Instead of requiring this everywhere:

```LogicN
use logicn-target-coreml with {
  compute: "all"
  prefer: "neural_engine"
  fallback: ["gpu", "cpu"]
  requireOnDevice: true
  allowNetwork: false
}
```

LogicN could allow the developer to write a **default auto policy** once in `boot.lln`.

## Better concept: auto compute discovery

```LogicN
boot compute {
  mode: auto

  prefer: [
    apple.neural_engine,
    microsoft.bitnet,
    gpu,
    cpu
  ]

  fallback: auto

  requireOnDevice: true
  allowNetwork: false

  cache {
    enabled: true
    saveToGit: false
    location: ".lln/cache/compute-profile.json"
    recheck: "periodic"
    recheckEvery: "7 days"
    recheckOn: [
      "hardware_changed",
      "os_updated",
      "LogicN_version_changed",
      "driver_changed",
      "model_changed",
      "manual_command"
    ]
  }
}
```

Then normal LogicN code could stay clean:

```LogicN
task classifyImage(image: Image) -> ImageClass
  compute auto
{
  return model "./models/classifier.logicn-model"(image)
}
```

LogicN would work out the best available target.

---

# How it should work

## First run

On the first run, LogicN performs a hardware/runtime pass:

```text
1. Detect OS
2. Detect CPU
3. Detect GPU
4. Detect Apple Core ML / Neural Engine availability
5. Detect Microsoft BitNet runtime support
6. Detect CUDA / ROCm / Metal / DirectML / Vulkan / WebGPU
7. Check memory
8. Check supported precision
9. Check model compatibility
10. Run small benchmark probes
11. Save local compute profile
```

The first run may be slower, but that is fine.

Output:

```text
LogicN compute discovery started...
Apple Core ML: available
Apple Neural Engine: preferred through Core ML
GPU Metal: available
CPU: available
BitNet runtime: not available
Selected default AI target: apple.coreml.all
Saved local profile: .lln/cache/compute-profile.json
```

Apple’s Core ML route fits this idea because Core ML can use CPU, GPU and Neural Engine, and Apple exposes compute-unit choices such as using all available compute units. ([Apple Developer][1])

---

# Important: do not save this to Git

You are right: this should **not** be saved in Git.

Because each machine is different:

```text
developer MacBook
Windows laptop
Linux server
DigitalOcean droplet
AWS Graviton
Azure GPU VM
Apple Silicon build machine
on-prem server
```

So LogicN should generate local machine files like:

```text
.lln/cache/compute-profile.json
.lln/cache/hardware-profile.json
.lln/cache/model-plan.json
.lln/cache/benchmark-lite.json
```

And `.gitignore` should include:

```gitignore
.lln/cache/
.lln/local/
.lln/runtime/
*.logicn-profile.json
```

The repo should only save the **policy**, not the discovered machine result.

---

# What should be in Git

This belongs in Git:

```text
boot.lln
LogicN.config
package policies
model requirements
security policy
allowed targets
fallback policy
```

Example:

```LogicN
boot compute {
  mode: auto
  allowTargets: [
    apple.coreml,
    microsoft.bitnet,
    gpu,
    cpu
  ]
  denyTargets: [
    cloud_ai
  ]
  requireOnDevice: true
}
```

This means:

```text
The project says what is allowed.
The machine decides what is available.
LogicN chooses the best safe option.
```

That is the right separation.

---

# What should not be in Git

This should stay local:

```json
{
  "machineId": "local-generated",
  "os": "macOS",
  "cpu": "Apple Silicon",
  "coreml": true,
  "neuralEngine": "available-through-coreml",
  "metal": true,
  "memoryGb": 16,
  "selectedTarget": "apple.coreml.all",
  "lastChecked": "2026-05-10T13:00:00Z"
}
```

This should not be committed because it may expose:

```text
hardware details
driver versions
OS version
available memory
server type
local paths
security-sensitive environment details
```

---

# Production behaviour

This is where the idea becomes powerful.

When LogicN is deployed to production, it should not assume the development computer profile.

Production run:

```bash
LogicN run --env production
```

LogicN detects the server:

```text
DigitalOcean App Platform
Linux container
CPU only
No GPU
No Apple Neural Engine
No BitNet runtime
Memory limit: 1GB
Selected target: cpu.safe
```

Then LogicN creates a production-local profile:

```text
.lln/cache/compute-profile.production.json
```

Or, in a container/serverless environment, it could use:

```text
/tmp/LogicN/compute-profile.json
```

because some cloud filesystems are ephemeral.

---

# Periodic recheck

Yes, LogicN should periodically recheck.

Reasons:

```text
OS update
driver update
GPU added
cloud instance changed
container moved
Apple Core ML version changed
BitNet runtime updated
model changed
LogicN compiler updated
memory limit changed
production scaling changed
```

Example:

```LogicN
cache {
  enabled: true
  recheckEvery: "7 days"

  forceRecheckOn: [
    "LogicN_version_changed",
    "package_version_changed",
    "model_hash_changed",
    "os_version_changed",
    "driver_changed",
    "hardware_changed"
  ]
}
```

Manual command:

```bash
LogicN compute detect
LogicN compute detect --force
LogicN compute report
LogicN compute clean
```

---

# Add a light benchmark pass

LogicN should not just detect hardware. It should run a **small safe benchmark**.

Example:

```text
matrix multiply small
embedding test
image inference test
JSON validation test
stream parsing test
decimal maths test
memory copy test
```

The benchmark should be quick, maybe under 10–30 seconds by default.

```LogicN
boot benchmark {
  mode: light
  maxDuration: "30 seconds"
  runOnFirstInstall: true
  runOnTargetChange: true
}
```

This avoids LogicN choosing a bad target just because it exists.

For example:

```text
GPU exists, but CPU is faster for this small model.
Neural Engine exists, but model is not compatible.
BitNet exists, but model is not a BitNet model.
CPU has AVX512 and beats fallback GPU path.
```

Microsoft’s `bitnet.cpp` is a good example of why this matters: it is aimed at 1-bit / 1.58-bit LLM inference and currently focuses on optimized CPU/GPU kernels, with NPU support described as coming next. ([GitHub][2])

So LogicN should treat BitNet as:

```text
available only when the model/runtime actually matches
```

not as a general AI accelerator.

---

# Suggested LogicN package structure

```text
packages/logicn-compute-auto/
packages/logicn-compute-detect/
packages/logicn-compute-cache/
packages/logicn-compute-benchmark/
packages/logicn-target-apple/
packages/logicn-target-coreml/
packages/logicn-target-metal/
packages/logicn-target-bitnet/
packages/logicn-target-directml/
packages/logicn-target-cuda/
packages/logicn-target-rocm/
packages/logicn-target-cpu/
packages/logicn-runtime-profile/
```

For your naming style, I would use:

```text
logicn-compute-auto
logicn-compute-detect
logicn-compute-cache
logicn-target-coreml
logicn-target-bitnet
```

Rather than putting everything directly into `boot.lln`.

---

# Better default boot file

A clean default could be:

```LogicN
boot app {
  name: "my-logicn-app"
  mode: Env("LOGICN_ENV", default: "development")
}

boot security {
  default: deny
  allowNetwork: false
  allowCloudAI: false
}

boot compute {
  mode: auto

  targets {
    allow: [
      apple.coreml,
      apple.metal,
      microsoft.bitnet,
      cuda,
      rocm,
      directml,
      webgpu,
      cpu
    ]

    deny: [
      cloud_ai
    ]
  }

  preference {
    ai: auto
    tensor: auto
    json: cpu
    crypto: cpu
    network: cpu
  }

  fallback {
    enabled: true
    order: auto
    requireSafeFallback: true
  }

  discovery {
    runOnFirstStart: true
    runOnProductionStart: true
    runWhenChanged: true
  }

  cache {
    enabled: true
    git: false
    path: ".lln/cache/compute-profile.json"
    recheckEvery: "7 days"
  }

  report {
    enabled: true
    write: ".lln/reports/compute-report.json"
  }
}
```

The important idea is this:

```text
AI/tensor tasks can auto-select accelerator.
JSON/security/network/crypto stay CPU by default.
```

That prevents LogicN from doing unsafe or pointless acceleration.

---

# Task-level override still needed

Even with auto boot settings, LogicN should still allow a task to override the default.

Example:

```LogicN
task verifyPayment(input: PaymentRequest) -> Result<PaymentApproved, PaymentError>
  compute cpu.required
{
  validate input
  run fraudRules
  return approve input
}
```

Because some things should never be silently moved to an accelerator.

For example:

```text
security checks
payment approval
authentication
cryptographic signing
audit decisions
permission checks
financial order validation
```

For AI/image tasks:

```LogicN
task classifyDocument(image: Image) -> DocumentClass
  compute auto.ai
{
  return model "./models/document-classifier.logicn-model"(image)
}
```

---

# Discovery report example

```json
{
  "loComputeProfileVersion": "1.0",
  "environment": "production",
  "generatedAt": "2026-05-10T13:00:00Z",
  "saveToGit": false,
  "detected": {
    "os": "linux",
    "cpu": {
      "available": true,
      "features": ["avx2"],
      "memoryGb": 2
    },
    "appleCoreML": {
      "available": false
    },
    "appleNeuralEngine": {
      "available": false
    },
    "bitnet": {
      "available": false
    },
    "gpu": {
      "available": false
    }
  },
  "selected": {
    "ai": "cpu.safe",
    "json": "cpu",
    "crypto": "cpu",
    "network": "cpu"
  },
  "warnings": [
    "No AI accelerator detected.",
    "Using CPU fallback for model inference."
  ]
}
```

On an Apple machine it may become:

```json
{
  "selected": {
    "ai": "apple.coreml.all",
    "image": "apple.coreml.all",
    "tensor": "apple.metal",
    "json": "cpu",
    "crypto": "cpu"
  }
}
```

---

# Why this is better than fixed config

Fixed config:

```text
works on your machine
may fail in production
may choose unavailable hardware
may expose development assumptions
```

Auto profile:

```text
portable
cloud-friendly
safer
hardware-aware
future-proof
better for enterprise deployment
```

This is especially useful if LogicN wants to support:

```text
Apple Neural Engine
BitNet
CUDA
ROCm
DirectML
CPU vector instructions
future photonic targets
future AI accelerators
```

---

# Add strict modes for enterprise

LogicN should support different behaviour by environment.

## Development

```LogicN
compute {
  mode: auto
  missingAccelerator: warn
  profile: development
}
```

## Production

```LogicN
compute {
  mode: auto
  missingAccelerator: warn
  unsafeFallback: error
  profile: production
}
```

## Regulated finance / healthcare

```LogicN
compute {
  mode: locked
  requireApprovedProfile: true
  profileSignature: required
}
```

This is important.

In ordinary production, auto setup is useful.

In regulated finance, the company may want:

```text
detect hardware
generate report
approve profile
lock profile
deploy only approved profile
```

So LogicN should support both:

```text
auto mode
locked approved mode
```

---

# Simple naming idea

You could call this feature:

```text
LogicN Compute Auto Profile
```

Or:

```text
LogicN Runtime Capability Profile
```

Files:

```text
compute-policy.lln        saved in Git
compute-profile.json     local only
compute-report.json      local/report artifact
```

Commands:

```bash
LogicN compute detect
LogicN compute profile
LogicN compute benchmark --light
LogicN compute report
LogicN compute clean
LogicN compute lock --production
```

---

# Best concept summary

Your idea should become a formal LogicN feature:

```text
LogicN should separate compute policy from compute discovery.
```

## Policy is saved in Git

```text
What the app is allowed to use.
What it prefers.
What it must deny.
What fallback is acceptable.
```

## Discovery is local only

```text
What this machine actually has.
What passed benchmark checks.
What target LogicN selected.
When it was last checked.
```

## Runtime uses both

```text
boot policy + local profile = safe automatic target selection
```

That gives LogicN a serious advantage:

```text
write once
run safely on Apple, Windows, Linux, cloud, CPU, GPU, BitNet, future accelerators
without hardcoding the developer machine
```

The core feature should be added as:

```text
packages/logicn-compute-auto
packages/logicn-compute-detect
packages/logicn-compute-cache
packages/logicn-runtime-profile
```

Then Apple Neural Engine and BitNet become target plugins:

```text
packages/logicn-target-coreml
packages/logicn-target-bitnet
```

[1]: https://developer.apple.com/documentation/coreml?utm_source=chatgpt.com "Core ML | Apple Developer Documentation"
[2]: https://github.com/microsoft/BitNet?utm_source=chatgpt.com "microsoft/BitNet: Official inference framework for 1-bit LLMs"
