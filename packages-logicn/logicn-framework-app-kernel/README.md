# LogicN Secure App Kernel

The LogicN Secure App Kernel is the optional partial framework layer for LogicN
applications. It is not a full web framework.

Its job is to enforce safe runtime boundaries that the language and compiler can
describe:

```text
receive requests
validate input
apply security policy
rate-limit traffic
decode typed data
control memory
route to typed flows
handle errors
queue heavy work
generate reports
```

## Position

```text
LogicN Core
  strict types, flows, effects, memory safety, compute planning, compiler reports

LogicN Standard Library
  Json, Xml, SafeHtml, File, Stream, Request, Response, DateTime, Money, SecureString

LogicN Secure App Kernel
  optional runtime layer for APIs, routing, validation, auth, rate limits, jobs and reports

Full Frameworks
  CMS, admin panels, UI systems, templates, ORM, page builders and frontend adapters
```

Final rule:

```text
LogicN the language defines safety.
LogicN the kernel enforces safe runtime boundaries.
Frameworks provide opinions and user-facing structure.
```

## Responsibilities

- Typed API request and response boundaries.
- Runtime enforcement of `boot.lln` security policy.
- Strict input validation before handlers run.
- Deny-by-default application effects for file, network, database, shell, AI,
  GPU and interop access unless declared by policy.
- Network policy consumption from `logicn-core-network`, including inbound
  ports, outbound host allowlists, TLS requirements, raw socket restrictions,
  timeout policy and backpressure.
- Production gates for auth, rate limits, typed input, secret-safe logging,
  unsafe interop, raw SQL and shell execution.
- Auth provider boundaries for bearer tokens, JWT, OAuth2/OIDC, DPoP, mTLS,
  API keys, webhook signatures and capability tokens.
- Idempotency and replay protection policy.
- Workload control for rate limits, concurrency limits, memory budgets,
  timeouts, queue handoff and backpressure.
- Request-scoped Structured Await policy for `await all`, `await race`,
  cancellation, external wait timeouts and bounded stream processing.
- Standard job contracts and queue-driver boundaries.
- Runtime reports for APIs, auth, idempotency, memory, load control, data and
  target behaviour.

## Non-Goals

The kernel must not include:

```text
CMS
admin dashboard
page builder
theme system
React clone
Angular clone
mandatory template engine
mandatory ORM
search engine
media editor
AI platform
```

Those belong in packages or full frameworks built on top of the kernel.

## Reports

Kernel-enabled builds should be able to generate:

```text
app.api-manifest.json
app.security-report.json
app.auth-report.json
app.idempotency-report.json
app.memory-report.json
app.load-control-report.json
app.data-report.json
app.target-report.json
app.ai-guide.md
app.map-manifest.json
```

## Checked Test Run

The kernel package can run checked fixtures through LogicN core Run Mode. This is
not a compiled build.

```bash
npm.cmd --prefix packages-logicn/logicn-framework-app-kernel test
```

Current fixtures cover:

```text
hello-world.lln
vector-function.lln
sum.lln
decimal-sum.lln
json-return.lln
```

The hello-world fixture uses:

```LogicN
secure flow main() -> Result<Void, Error> {
  console.log("hello from LogicN app kernel test")
  return Ok()
}
```
