# Interoperability

LO should interoperate with existing systems without weakening its core safety rules.

## Planned Areas

```text
JSON
REST APIs
webhooks
OpenAPI
XML
GraphQL
environment variables
native bindings
foreign package calls
generated clients
```

## Rule

Interop boundaries should be explicit, typed, permission-checked and reported.

## Kernel and Driver Boundary

Kernel modules, operating-system drivers, privileged native bindings, vendor SDK
driver bindings and raw hardware access are not normal interoperability work.

They are last-stage, blocked by default and require explicit maintainer or
project permission before design, examples, bindings or implementation are
added.
