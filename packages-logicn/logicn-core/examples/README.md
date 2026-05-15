# LogicN Examples

These examples are source fixtures for the prototype CLI, package tests and
documentation. The directory currently contains 20 `.lln` fixtures covering the
v1 syntax subset and target/report planning examples.

Run from `packages-logicn/logicn-core`:

```bash
node compiler/logicn.js check examples --exclude source-map-error.lln
node compiler/logicn.js build examples --exclude source-map-error.lln --out build/examples
node compiler/logicn.js verify build/examples
```

`source-map-error.lln` intentionally contains an invalid compute-block file read
so `LogicN explain --for-ai` can demonstrate target compatibility diagnostics.

```bash
node compiler/logicn.js explain examples/source-map-error.lln --for-ai
```

Current fixtures:

- `ai-context.lln`
- `api-orders.lln`
- `boot.lln`
- `browser-form.lln`
- `compute-block.lln`
- `decision.lln`
- `gpu-plan.lln`
- `hello.lln`
- `json-decode.lln`
- `logic-review-scale.lln`
- `option.lln`
- `parallel-api-calls.lln`
- `payment-webhook.lln`
- `photonic-plan.lln`
- `result.lln`
- `rollback.lln`
- `source-map-error.lln`
- `strict-types.lln`
- `ternary-sim.lln`
- `workers.lln`
