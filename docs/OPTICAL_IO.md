# Optical I/O Optimisation

LogicN should support optical I/O as a data-movement and interconnect optimisation
target.

Intel Silicon Photonics and Optical Compute Interconnect technologies should
not be treated as normal CPUs or as a direct replacement for GPU or photonic
matrix-compute targets. They should be modelled as high-bandwidth, low-latency
optical connectivity for distributed compute, AI infrastructure, memory
pooling, accelerator communication and large-scale data movement.

Intel describes Silicon Photonics as combining silicon integrated circuits with
semiconductor lasers to enable faster data transfer over longer distances than
traditional electronics. Intel's Optical Compute Interconnect, or OCI, is aimed
at multi-terabit optical connectivity for next-generation compute and AI
infrastructure. Intel states that its first-generation OCI chiplet supports
4 Tbps bidirectional connectivity, with a roadmap toward tens of terabits per
second per device, and is designed to be co-packaged with future CPUs, GPUs,
IPUs and other SoCs.

For LogicN, the optimisation area is:

```text
move less data
move data in better batches
place compute closer to data
understand distributed compute topology
report bandwidth, latency and fallback behaviour
```

## Target Model

LogicN should separate these concepts:

```text
photonic_compute
  light used for computation, such as matrix operations or photonic simulation

optical_io
  light used for high-speed data movement and interconnect

photonic_memory
  future optical memory, buffer or pooling concepts
```

`optical_io` should be a compute and deployment planning target, but it is not a
general-purpose compute target by itself.

Example target concept:

```LogicN
target optical_io {
  provider "intel.silicon_photonics"
  mode "interconnect"
  use_for ["ai-cluster", "memory-pooling", "gpu-disaggregation", "data-movement"]
  fallback ["pcie", "ethernet", "standard-network"]
}
```

## Data Movement As A First-Class Cost

The compiler and runtime planning layers should treat data movement as a
first-class cost.

They should estimate:

```text
how much data crosses the interconnect
where compute happens
where data lives
whether data can be streamed
whether data can be compressed
whether compute should move to the data
whether data should move to the compute
whether the result can be reduced before transfer
```

Example report:

```json
{
  "opticalIo": {
    "target": "intel.silicon_photonics.oci",
    "available": true,
    "estimatedTransferGb": 420,
    "largestTransfer": "model.layer.17.weights",
    "recommendations": [
      "Keep tensor batch on accelerator node 2",
      "Use streaming transfer for embeddings",
      "Avoid JSON transfer between compute nodes",
      "Use binary schema-compressed format"
    ]
  }
}
```

## AI And Tensor Workloads

Optical I/O is most relevant to LogicN when workloads involve large data movement:

```text
matrix workloads
tensor workloads
embedding generation
large model inference
distributed model serving
vector search
batch processing
image/video AI pipelines
multi-node AI processing
```

Instead of asking only:

```text
Should this run on CPU or GPU?
```

LogicN should also ask:

```text
Where is the data?
Where is the accelerator?
What is the interconnect?
What is the cost of moving this tensor?
Can the task be split across nodes?
Can the result be reduced before transfer?
```

Example direction:

```LogicN
compute auto classifyImages(batch: ImageBatch) {
  prefer accelerator.ai
  prefer optical_io if data_size > 1gb
  minimise data_movement
  return compact_result
}
```

## Topology-Aware Scheduling

LogicN should be able to generate and use a topology map:

```text
CPU node 1
  -> local RAM
  -> GPU 1
  -> optical link to GPU 2
  -> optical link to memory pool
  -> optical link to storage node
```

This matters because optical I/O makes larger distributed systems more
practical.

Example config direction:

```LogicN
topology auto {
  detect cpu
  detect gpu
  detect accelerator
  detect optical_io
  detect memory_pool
  detect storage
}
```

Then LogicN can decide:

```text
run part A near GPU 1
run part B near GPU 2
keep shared embeddings in memory pool
send only reduced results back to CPU
```

## Efficient Transfer Formats

Over a high-speed optical link, wasteful formats are still wasteful.

Avoid:

```text
Send huge repeated JSON keys across optical link.
```

Prefer:

```text
send schema ID once
send compact binary rows/tensors
send only changed fields
stream in chunks
use columnar batches where useful
use zero-copy read-only views where safe
```

LogicN should support transfer planning for:

```text
schema-compressed JSON
binary typed records
columnar batches
tensor blocks
zero-copy read-only views
streaming pipelines
```

Example direction:

```LogicN
transfer UserEvents over optical_io {
  format schema_compressed
  batch_size auto
  max_latency 5ms
  compress_repeated_keys true
}
```

## Data Locality Rules

LogicN should be able to express that certain data should stay close to certain
compute.

Example:

```LogicN
data ModelWeights {
  size large
  locality accelerator
  movement avoid
}
```

Or:

```LogicN
task runInference(input: TensorBatch) {
  prefer data_locality
  avoid moving ModelWeights
  move inputBatch instead
  return small ResultBatch
}
```

Optical I/O is fast, but moving huge data unnecessarily still wastes power,
time and shared interconnect capacity.

## Reports

LogicN should produce optical I/O reports when a workload or deployment profile uses
high-speed interconnect planning.

Possible reports:

```text
app.optical-io-report.json
app.interconnect-report.json
app.data-movement-report.json
app.topology-report.json
app.compute-placement-report.json
```

Report fields:

```text
detected interconnect
provider and backend
bandwidth estimate
latency estimate
fallback path
data moved per task
largest transfers
serialization format
compression used
remote memory used
accelerator placement
security/encryption status
warnings and suggested fixes
```

Example:

```json
{
  "interconnect": {
    "type": "optical_io",
    "provider": "intel",
    "mode": "oci",
    "fallback": "pcie-or-ethernet",
    "warnings": [
      {
        "message": "Large JSON transfer detected. Use schemaCompressed or tensorBinary."
      }
    ]
  }
}
```

## Deployment Profiles

Optical I/O is mainly a cloud and data-centre scale feature. LogicN should support
deployment profiles that understand this.

Example profiles:

```text
desktop
server
cloud
ai-cluster
optical-cluster
edge
```

Example direction:

```LogicN
deployment ai_cluster {
  require high_bandwidth_interconnect
  prefer optical_io
  allow gpu_disaggregation
  allow memory_pooling
  deny unsafe_remote_memory
}
```

If optical I/O is not available:

```text
Warning:
optical_io requested but not detected.
Falling back to ethernet.
Expected data movement cost increased.
```

## Remote Memory Safety

If LogicN supports memory pooling or remote accelerator memory, it must be secure.

Remote memory should not be treated like normal local RAM. LogicN should require:

```text
typed remote memory
bounds checks
encryption policy
access policy
failure handling
timeout rules
fallback rules
audit logging
```

Example direction:

```LogicN
remote memory EmbeddingPool {
  access read_only
  encryption required
  max_read 20gb
  timeout 100ms
  fallback local_cache
}
```

## Benchmarks

`logicn-tools-benchmark` should eventually include:

```bash
LogicN benchmark --target optical_io
```

It should test:

```text
small message latency
large tensor transfer
schema-compressed JSON transfer
binary record transfer
streaming throughput
remote memory read
multi-node reduce
fallback performance
```

Example output:

```json
{
  "benchmark": "optical_io_light",
  "results": {
    "latencyUs": 8.7,
    "throughputGbps": 3520,
    "schemaCompressedJsonGbps": 880,
    "tensorBinaryGbps": 3100,
    "fallbackDetected": false
  }
}
```

## Security Rules

Optical I/O should not bypass LogicN security policy.

Rules:

```text
remote memory is not local memory
remote accelerator buffers require access policy
cross-node transfers require reportable encryption policy
fallback paths must be reported
secret-bearing payloads must be redacted from reports
unsafe remote memory must be denied by default
interconnect topology must not expose private hostnames in shareable reports
```

## Package Ownership

Recommended ownership:

```text
logicn-core-compute
  optical_io target selection and data-movement cost planning

logicn-target-photonic
  photonic compute target planning plus optical I/O/interconnect planning reports

logicn-core-vector
  tensor, matrix and batch shape information used for transfer estimates

logicn-core-security
  remote memory, encryption and redaction policy

logicn-core-reports
  shared report metadata and report-writing contracts

logicn-tools-benchmark
  optical_io benchmark target and fallback diagnostics
```

## Conclusion

LogicN can make the best of Intel Silicon Photonics by becoming interconnect-aware.

Not just:

```text
CPU vs GPU vs photonic
```

But:

```text
Where is the data?
Where is the compute?
How expensive is movement?
Can optical I/O reduce the bottleneck?
Can LogicN report and optimise that automatically?
```

That would make LogicN more forward-looking than a normal language because most
languages do not understand the cost of moving data across CPUs, GPUs,
accelerators, memory pools and data-centre fabrics.

## References

- Intel Silicon Photonics: <https://www.intel.com/content/www/us/en/products/details/network-io/silicon-photonics.html>
- Intel OCI chiplet blog: <https://community.intel.com/t5/Blogs/Tech-Innovation/Artificial-Intelligence-AI/Intel-Shows-OCI-Optical-I-O-Chiplet-Co-packaged-with-CPU-at/post/1582541>
