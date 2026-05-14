# API

## API Serving Model

LogicN API serving is split across three layers:

```text
LogicN Core
  defines API contracts, types, diagnostics and generated reports

LogicN App Kernel
  enforces validation, auth, rate limits, idempotency and typed handler dispatch

logicn-framework-api-server
  serves HTTP, loads route manifests and passes normalised requests to the kernel
```

`logicn-framework-api-server` is the default built-in HTTP API server package for simple LogicN API
services. Bespoke frameworks can use it directly, use `logicn-framework-app-kernel` directly,
or later use adapter packages such as Express, Fastify, Lambda or Cloudflare
Workers.

## Runtime Flow

```text
HTTP request
  -> logicn-framework-api-server
  -> logicn-framework-app-kernel
  -> LogicN runtime / typed LogicN flow
  -> logicn-framework-app-kernel
  -> logicn-framework-api-server
  -> HTTP response
```

## Boundaries

`logicn-framework-api-server` owns:

```text
HTTP listener
request normalisation
route manifest loading
server-level body limits
server timeouts
safe response writing
health endpoint
safe server logs
runtime report files
graceful shutdown
```

`logicn-framework-app-kernel` owns:

```text
route matching policy
typed request decoding
auth and scopes
idempotency
webhook replay protection
rate-limit policy
memory budget policy
effect policy
typed handler execution
audit reports
```

LogicN Core owns:

```text
language syntax
API contract checks
schema generation
OpenAPI generation
source maps
diagnostics
security report contracts
```

## Non-Goals

`logicn-framework-api-server` must not become:

```text
a full web framework
a CMS
an ORM
a template engine
a frontend router
a React/Angular/Vue component system
a middleware marketplace
business logic
payment provider logic
email provider logic
```

Those belong in packages, frameworks or application code.

## First Practical Target

The first version should focus on:

```text
load route manifest
start HTTP server
match method and path
normalise request
pass request to app kernel handler
write typed response
return safe errors
support health endpoint
support body size limit
support request timeout
write simple logs
write basic reports
```
