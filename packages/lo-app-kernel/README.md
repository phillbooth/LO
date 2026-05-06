# LO Secure App Kernel

The LO Secure App Kernel is the optional partial framework layer for LO
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
LO Core
  strict types, flows, effects, memory safety, compute planning, compiler reports

LO Standard Library
  Json, Xml, SafeHtml, File, Stream, Request, Response, DateTime, Money, SecureString

LO Secure App Kernel
  optional runtime layer for APIs, routing, validation, auth, rate limits, jobs and reports

Full Frameworks
  CMS, admin panels, UI systems, templates, ORM, page builders and frontend adapters
```

Final rule:

```text
LO the language defines safety.
LO the kernel enforces safe runtime boundaries.
Frameworks provide opinions and user-facing structure.
```

## Responsibilities

- Typed API request and response boundaries.
- Runtime enforcement of `boot.lo` security policy.
- Strict input validation before handlers run.
- Auth provider boundaries for bearer tokens, JWT, OAuth2/OIDC, DPoP, mTLS,
  API keys, webhook signatures and capability tokens.
- Idempotency and replay protection policy.
- Workload control for rate limits, concurrency limits, memory budgets,
  timeouts, queue handoff and backpressure.
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
