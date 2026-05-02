# API-Native Design

LO should make APIs a first-class language and compiler concern.

## Goals

```text
typed requests
typed responses
route contracts
webhook contracts
OpenAPI generation
JSON schema generation
timeouts
retries
rate limits
structured diagnostics
```

## Rule

API code should be source-mapped, contract-checked and explainable through generated reports.

## Service, API and Webhook Boundaries

`service`, `api` and `webhook` blocks solve different problems.

```text
service = runtime server boundary
api     = typed HTTP contract boundary
webhook = secured inbound event boundary
```

Use `service` when code owns a listener, port, server lifecycle, health route or mount table.

Use `api` when code defines normal request/response routes with typed requests, typed responses, route parameters, query parameters, errors and OpenAPI output.

Use `webhook` when code receives event callbacks from an external provider and must enforce signature verification, replay protection, idempotency and tight payload limits.

Compiler rules:

```text
Only service blocks may define listen.
API blocks must not define listener ownership.
Webhook blocks must not be treated as general API route groups.
Webhook blocks require security defaults unless explicitly compiled in development mode.
Service blocks may mount api and webhook blocks.
API and webhook blocks must generate report entries with distinct kinds.
```

Example relationship:

```LO
service ApiServer {
  listen port env.int("APP_PORT", default: 8080)
  mount OrdersApi
  mount PaymentWebhook
}

api OrdersApi {
  POST "/orders" {
    request CreateOrderRequest
    response CreateOrderResponse
    handler createOrder
  }
}

webhook PaymentWebhook {
  path "/webhooks/payment"
  method POST
  idempotency_key json.path("$.id")
  handler handlePaymentWebhook
}
```

## Query Params, Middleware and Auth

API routes should declare query parameters separately from path parameters.

```LO
GET "/orders" {
  query {
    status: Option<OrderStatus>
    limit: Int
  }

  response Array<OrderResponse>
  handler listOrders
}
```

Middleware should be named, ordered and reportable.

```LO
middleware [
  request_id,
  audit_log,
  rate_limit("orders-list"),
  auth.required(UserSession)
]
```

Authentication hooks should return explicit `Result<AuthContext, AuthError>` values and should not silently attach unaudited global user state.

```LO
auth required UserSession using authenticateRequest
```

Rate limits should be source-mapped and included in API/security reports.

```LO
rate_limit {
  key request.ip
  limit 100
  window 1m
  on_exceeded TooManyRequests
}
```

## Generated Client SDK Scope

Generated client SDKs should be contract wrappers, not full application frameworks.

Allowed generated SDK scope:

```text
typed request and response models
route methods
query and path parameter binding
JSON encode/decode helpers
timeout and retry policy metadata
source-map links back to the API contract
```

Out of scope for generated SDKs:

```text
business logic
secret storage
UI code
database access
server middleware implementation
provider-specific auth flows unless declared in the API contract
```
