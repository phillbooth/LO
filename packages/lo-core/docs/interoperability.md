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
JavaScript ESM modules
TypeScript declarations
Node packages
React adapter packages
Angular adapter packages
browser/Node WASM bridges
worker modules
Dart packages
Flutter packages
Dart Uint8List byte interop
Flutter plugin and FFI boundaries
Flutter platform channels
Pigeon-style typed platform APIs
device capability packages
mobile platform APIs
sensor/native hardware bindings
text AI packages
LLM/model providers
Python NLP package interop
```

## Rule

Interop boundaries should be explicit, typed, permission-checked and reported.

Dart and Flutter interop should use normal LO types in portable code and expose
target-specific types only at explicit boundaries.

Rule:

```text
Bytes is portable LO byte data.
Dart.Uint8List is Dart/Flutter-specific interop data.
Conversions must be explicit, source-mapped and reported.
```

Flutter platform channels and FFI are interop boundaries, not core device API
features.

Rule:

```text
Platform-channel contracts must declare permissions and error mapping.
FFI bindings must declare platform support and native memory ownership.
Unsupported Flutter targets must be reported, not silently generated.
```

Device capability interop should stay package/platform based.

Rule:

```text
Camera, microphone, Bluetooth, GPS/location, sensors, notifications and media
features are not core LO APIs.
Packages and platform bindings provide those capabilities.
LO provides permissions, effects, safe buffers, streams, native boundary checks
and reports.
```

JavaScript/TypeScript framework interop should use generated modules,
declarations, schemas and adapter manifests.

Rule:

```text
ESM should be the preferred JavaScript module output for modern framework interop.
TypeScript declarations should describe generated JS/WASM APIs.
React and Angular adapters should be optional package/generator outputs.
client_safe, server_only and worker_safe markers must control what adapters expose.
Worker outputs must report structured-clone, transfer and shared-memory decisions.
```

Text AI interop should remain package/provider based.

Rule:

```text
Text generation, summarisation, embeddings, moderation, translation, document AI
and NLP tasks are not core LO APIs.
Packages and providers expose those capabilities.
LO provides typed boundaries, permissions, safe secrets, text validation,
redaction policy, prompt safety policy, compute-auto reports and source maps.
```

## Kernel and Driver Boundary

Kernel modules, operating-system drivers, privileged native bindings, vendor SDK
driver bindings and raw hardware access are not normal interoperability work.

They are last-stage, blocked by default and require explicit maintainer or
project permission before design, examples, bindings or implementation are
added.
