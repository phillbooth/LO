# Disk, Memory and Cache Warnings

LO should use standard codes for disk, memory and cache health.

## Disk Warnings

```text
LO-WARN-DISK-001: Available disk space is low.
LO-WARN-DISK-002: Disk write speed is below expected threshold.
LO-WARN-DISK-003: Disk spill mode enabled due to memory pressure.
LO-ERR-DISK-001: Failed to write spill file.
LO-ERR-DISK-002: Failed to read spill file.
LO-FATAL-DISK-001: Disk unavailable and no safe memory fallback exists.
```

## Memory Warnings

```text
LO-WARN-MEM-001: Cached memory limit reached. Cache entry moved to general memory.
LO-WARN-MEM-002: General memory pressure detected.
LO-WARN-MEM-003: Memory spill to disk started.
LO-WARN-MEM-004: Memory checkpoint created due to risk threshold.
LO-ERR-MEM-001: Memory integrity check failed. Runtime restored previous checkpoint.
LO-ERR-MEM-002: Memory limit exceeded and recovery was required.
LO-FATAL-MEM-001: Memory corruption detected and recovery failed.
```

## Cache Warnings

```text
LO-WARN-CACHE-001: Cached function memory limit reached.
LO-WARN-CACHE-002: Cache entry demoted to general memory.
LO-WARN-CACHE-003: Cache entry spilled to disk.
LO-ERR-CACHE-001: Cache restore failed.
LO-ERR-CACHE-002: Cache checksum mismatch.
```

Cache warnings must not hide correctness failures. If a cache cannot be used safely, LO should compute without the cache where possible and report the recovery action.
