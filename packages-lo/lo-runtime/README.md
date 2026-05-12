# LO Runtime

`lo-runtime` is the future execution engine for checked or compiled LO code.

It belongs in:

```text
/packages-lo/lo-runtime
```

Use this package for:

```text
checked LO execution
compiled LO execution contracts
runtime memory policy
effect dispatch
runtime error handling
resilient flow supervision
retry scheduling
checkpoint and resume hooks
target fallback execution
runtime reports
```

## Controlled Recovery

`lo-runtime` should distinguish item/data failures from system/runtime failures.

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

`lo-runtime` executes LO code. It is not the secure application boundary.

```text
lo-runtime
  executes checked or compiled LO code

lo-app-kernel
  validates requests, checks auth, controls idempotency, rate limits, jobs and API policy
```

Final rule:

```text
lo-runtime runs LO.
lo-app-kernel governs application/API runtime boundaries.
```
