# Error Codes

This document indexes the first planned LO diagnostic code ranges.

## Ranges

```text
LO-WARN-MEM-*      memory warnings
LO-ERR-MEM-*       recoverable memory errors
LO-FATAL-MEM-*     unrecoverable memory errors
LO-WARN-DISK-*     disk warnings
LO-ERR-DISK-*      disk errors
LO-FATAL-DISK-*    unrecoverable disk errors
LO-WARN-CACHE-*    cache warnings
LO-ERR-CACHE-*     cache errors
LO-WARN-LOGIC-*    logic-width warnings
LO-ERR-LOGIC-*     logic-width errors
LO-WARN-TARGET-*   target support warnings
LO-ERR-TARGET-*    target support errors
```

## Core Codes

```text
LO-WARN-MEM-001: Cached memory limit reached. Cache entry moved to general memory.
LO-ERR-MEM-001: Memory integrity check failed. Runtime restored previous checkpoint.
LO-FATAL-MEM-001: Memory corruption detected and recovery failed.
LO-WARN-DISK-001: Available disk space is low.
LO-ERR-DISK-001: Failed to write spill file.
LO-FATAL-DISK-001: Disk unavailable and no safe memory fallback exists.
LO-WARN-LOGIC-001: Target does not natively support requested logic width. Using simulation.
LO-ERR-LOGIC-001: Requested logic width is unsupported by selected target.
LO-WARN-TARGET-003: Accelerator target unavailable. Falling back to CPU.
LO-ERR-TARGET-001: Selected target is not installed.
```

## Prototype Codes

The current prototype emits these standardised codes for implemented checks:

```text
LO-ERR-TARGET-002
LO-WARN-TARGET-003
LO-WARN-LOGIC-001
LO-ERR-LOGIC-001
LO-WARN-DISK-003
LO-ERR-DISK-001
LO-WARN-MEM-002
LO-WARN-MEM-005
LO-ERR-MEM-006
LO-ERR-TYPE-001
LO-ERR-TYPE-002
LO-ERR-TYPE-003
LO-ERR-NULL-001
LO-ERR-NULL-002
LO-WARN-BUILD-002
LO-ERR-SEC-001
LO-WARN-SEC-002
LO-WARN-API-001
```
