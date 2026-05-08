# LO Runtime

`lo-runtime` is the future execution engine for checked or compiled LO code.

It belongs in:

```text
/packages/lo-runtime
```

Use this package for:

```text
checked LO execution
compiled LO execution contracts
runtime memory policy
effect dispatch
runtime error handling
target fallback execution
runtime reports
```

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
