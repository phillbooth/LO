# LO Runtime

`lo-core-runtime` is the future execution engine for checked or compiled LO code.

It belongs in:

```text
/packages-lo/lo-core-runtime
```

Use this package for:

```text
checked LO execution
compiled LO execution contracts
runtime memory policy
effect dispatch
runtime error handling
resilient flow supervision
structured await scheduling
cancellation propagation
timeout enforcement
retry scheduling
checkpoint and resume hooks
target fallback execution
runtime reports
```

## Structured Await Runtime

`lo-core-runtime` should execute the lower-level mechanics behind LO Structured
Await while keeping those mechanics out of normal application code.

Runtime responsibilities include:

```text
create request/job/task scopes
schedule await all child work inside the parent scope
enforce await and await-group timeouts
propagate cancellation to unfinished children
apply race policies such as firstSuccess and firstResult
apply stream backpressure and max in-flight limits
emit runtime facts for async/concurrency reports
release resources when scopes end
```

The runtime may use futures, tasks, schedulers or polling internally, but those
types should remain package/runtime author APIs rather than the default LO
developer model.

## Controlled Recovery

`lo-core-runtime` should distinguish item/data failures from system/runtime failures.

```text
item/data failure:
  may continue only when a resilient flow declares the policy

system/runtime failure:
  stop or restart safely, cancel children, release resources and report
```

Memory corruption, unsafe native failures and runtime integrity failures should
not continue blindly. Memory pressure can use controlled recovery such as
streaming mode, reduced batch size, backpressure, checkpointing or target
fallback.

## Boundary

`lo-core-runtime` executes LO code. It is not the secure application boundary.

```text
lo-core-runtime
  executes checked or compiled LO code and Structured Await scopes

lo-framework-app-kernel
  validates requests, checks auth, controls idempotency, rate limits, jobs and API policy
```

Final rule:

```text
lo-core-runtime runs LO.
lo-framework-app-kernel governs application/API runtime boundaries.
```
