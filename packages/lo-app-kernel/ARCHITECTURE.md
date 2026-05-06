# Secure App Kernel Architecture

## Overview

The Secure App Kernel is an optional runtime foundation for LO applications. It
connects checked LO declarations to runtime adapters without turning LO into a
full application framework.

## Runtime Pipeline

```text
adapter request
  -> request normalisation
  -> security policy check
  -> auth verification
  -> body limits and content-type check
  -> typed decode and validation
  -> idempotency and replay check
  -> workload limits
  -> typed flow handler
  -> typed response encode
  -> reports and audit events
```

Handlers should receive typed values, not unsafe raw JSON, unless a route
explicitly opts into raw access and accepts the security consequences.

## Kernel Modules

```text
request lifecycle
validation
security policy
auth providers
idempotency
replay protection
load control
jobs
queues
error handling
reports
adapter contracts
```

## Adapter Boundary

The kernel defines contracts. Concrete implementations belong in packages:

```text
HTTP adapter for Node
native server adapter
WASM edge adapter
Redis queue adapter
SQS queue adapter
Pub/Sub queue adapter
RabbitMQ queue adapter
Kafka queue adapter
SQL idempotency store adapter
OpenAPI generator package
```

## Framework Boundary

Full frameworks may build on the kernel, but the kernel must stay opinion-light.
It should not define page layouts, CMS data models, admin panels, frontend
component syntax, mandatory ORM conventions or theme systems.
