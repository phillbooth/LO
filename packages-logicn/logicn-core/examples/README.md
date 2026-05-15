# LogicN Examples

These examples are source fixtures for the prototype CLI, package tests and
documentation. The directory currently contains 21 `.lln` fixtures covering the
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

## Contract Examples

LogicN contracts are source declarations that tools can validate, report and
explain. In the current examples, contracts are represented by:

- typed request/response records such as `ContractOrderRequest` and
  `ContractOrderResponse`
- API route declarations such as `api OrdersApi` in `api-orders.lln`
- flow signatures such as
  `secure flow createContractOrder(...) -> Result<..., ...>`
- explicit effects such as `effects [database.write]`
- strict comments such as `/// @purpose`, `/// @input`, `/// @output`,
  `/// @request`, `/// @response` and `/// @effects`

The focused example is `contracts.lln`. It shows how typed data shapes, a secure
flow contract, recoverable errors, strict comments and effect declarations fit
together. `api-orders.lln` shows the route-level API contract form.

Current fixtures:

- `ai-context.lln`
- `api-orders.lln`
- `boot.lln`
- `browser-form.lln`
- `compute-block.lln`
- `contracts.lln` - typed flow contract with strict comments, `Result` errors and effects
- `decision.lln`
- `gpu-plan.lln`
- `hello.lln`
- `json-decode.lln`
- `logic-review-scale.lln`
- `option.lln`
- `parallel-api-calls.lln`
- `payment-webhook.lln`
- `photonic-plan.lln`
- `result.lln` - `Result<T, E>` return and `match result { Ok(...) ... Err(...) ... }`
- `rollback.lln`
- `source-map-error.lln`
- `strict-types.lln`
- `ternary-sim.lln`
- `workers.lln`
