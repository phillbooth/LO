# LO Concurrency

This document defines the LO core language contract for structured concurrency.

Status: draft language and compiler contract. Runtime scheduling and execution
details belong in `packages-lo/lo-core-runtime/`. API workload controls, queue handoff,
rate limits and request cancellation policy belong in `packages-lo/lo-framework-app-kernel/`.

## Purpose

LO concurrency should make asynchronous work explicit, bounded and reportable.

It should support:

```text
async tasks
await
parallel blocks
timeouts
cancellation
channels
workers
worker pools
backpressure
dead-letter queues
safe shared state
```

## Core Rule

```text
Concurrency must be structured.
Effects must be declared.
Cancellation must be visible.
Shared mutable state must be controlled.
Failures must be typed and source-mapped.
```

LO should avoid:

```text
unbounded background work
hidden shared mutation
silent task failures
unreported cancellation
unbounded queues
data races
secret leakage in concurrent logs
```

## Async Tasks

Example:

```lo
task fetchCustomer = async getCustomer(order.customerId)
task fetchStock = async getStock(order.items)

let customer = await fetchCustomer
let stock = await fetchStock
```

Compiler checks should include:

```text
await target exists
await is used only where async work is allowed
task result type is handled
task failure type is handled
effects are allowed in the current flow
```

## Parallel Blocks

Example:

```lo
parallel {
  customer = await CustomersApi.get(input.customerId)
  stock = await StockApi.check(input.items)
  risk = await RiskApi.score(input)
} timeout 5s catch error {
  return Err(ApiError.ExternalServiceFailed(error))
}
```

Compiler checks should include:

```text
timeout exists for external work
effects are declared
shared writes are rejected unless explicitly controlled
all branch errors are handled
cancellation path is source-mapped
```

## Channels

Example:

```lo
channel orders: Channel<OrderEvent> {
  buffer 1000
  overflow "reject"
  dead_letter "./storage/dead/orders.jsonl"
}
```

Channel declarations should define:

```text
item type
buffer limit
overflow behaviour
dead-letter policy where relevant
effect permissions for storage or network handoff
```

Allowed overflow policies may include:

```text
reject
wait
drop_oldest
drop_newest
dead_letter
scale_worker
```

Production builds should warn or fail on unbounded channels.

## Workers

Example:

```lo
worker OrderWorker count 8 {
  for event in orders {
    processOrderEvent(event)
  }
}
```

Worker checks should include:

```text
worker count is bounded
input channel exists
handler effects are declared
shared state is controlled
errors are handled or dead-lettered
shutdown path is defined
```

## Safe Shared State

Shared mutable state must be explicit.

Recommended rule:

```text
immutable by default
local mutation by declaration
shared mutation only through controlled state
```

Compiler diagnostics should reject:

```text
unsynchronised shared mutation
capturing mutable references across tasks
borrowing values beyond their safe lifetime
printing SecureString values from concurrent workers
```

## Reports

LO should generate concurrency-related report entries in:

```text
app.security-report.json
app.runtime-report.json
app.memory-report.json
app.failure-report.json
app.ai-context.json
```

Report entries should include:

```text
async tasks
parallel blocks
channels
workers
timeouts
cancellation paths
backpressure policy
dead-letter policy
shared state warnings
source locations
```

## Package Boundaries

```text
lo-core
  syntax, compiler checks and report contracts

lo-core-runtime
  execution, scheduling, cancellation propagation and runtime errors

lo-framework-app-kernel
  API workload controls, queue handoff, request cancellation and rate limits

lo-core-tasks
  safe project automation tasks, not application async runtime
```

Final rule:

```text
lo-core defines structured concurrency contracts.
lo-core-runtime executes them.
lo-framework-app-kernel applies API/runtime policy around them.
```
