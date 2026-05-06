# LO JavaScript, TypeScript and Framework Target Support

Status: Draft.

This document defines how LO should support Node.js, React, Angular and similar
JavaScript/TypeScript frameworks without becoming those frameworks.

LO is a programming language and compiler/toolchain. React, Angular, Node.js,
Express, Fastify, Next-style frameworks, Vite, Webpack and Angular CLI are
external runtimes, frameworks or build tools. LO should generate safe code,
types, schemas, reports and bindings that those tools can consume.

Reference facts checked against official Node, React and Angular documentation
on 2026-05-06:

```text
Node.js fully supports ECMAScript modules and documents ESM as the standard JS module format.
Node.js worker threads are useful for CPU-intensive JavaScript work.
Node worker data transfer can involve ArrayBuffer, SharedArrayBuffer, cloning and transfer safety.
React has Server Components, Server Functions and client/server directives.
Angular uses standalone components and documents signals as a modern reactivity model.
```

References:

```text
https://nodejs.org/api/esm.html
https://nodejs.org/api/worker_threads.html
https://react.dev/reference/rsc/server-components
https://react.dev/reference/rsc/server-functions
https://angular.dev/guide/components
https://angular.dev/guide/signals
```

---

## Core Rule

```text
LO can compile to, interop with, validate, secure and document framework-facing code.
The framework still owns UI, routing, components and app structure.
```

LO core should provide:

```text
targets
types
effects
safety checks
schemas
source maps
generated bindings
package reports
framework adapter metadata
```

Frameworks and packages should provide:

```text
React components
Angular components
JSX syntax
Angular decorators
client-side routers
virtual DOM
state management
template engines
Next/Nuxt-style app frameworks
Express/Fastify server conventions
```

---

## Targets

Recommended target layers:

```text
target javascript        = generated JavaScript module output
target typescript        = generated TypeScript or declaration output
target node              = Node-compatible JavaScript/WASM output
target browser           = browser-compatible JavaScript/WASM output
target wasm              = WebAssembly output with JS bridge
target react-adapter     = optional generated React-friendly wrappers
target angular-adapter   = optional generated Angular-friendly wrappers
target worker            = browser/Node worker-compatible compute output
```

The first practical framework target should be:

```text
LO logic/types/API contracts -> ESM JavaScript + TypeScript declarations + schemas
```

LO should not generate React or Angular components as a required core feature.

---

## JavaScript and TypeScript Output

Example direction:

```LO
target javascript {
  module esm
  typescript_declarations true
  source_maps true
}
```

Useful outputs:

```text
app.js
app.d.ts
app.js.map
app.source-map.json
app.ai-guide.md
```

For Node and modern bundlers, ESM should be the preferred module output. CommonJS
may be a compatibility option, but it should not be the primary framework-facing
target.

---

## WebAssembly Output

LO should support WASM for browser and Node use.

Example direction:

```LO
target wasm {
  runtime browser_node
  js_bridge true
  source_maps true
}
```

Use cases:

```text
fast validation
data parsing
image/audio/video preprocessing
vector maths
safe compute blocks
shared browser/server logic
```

Generated WASM should include a JavaScript/TypeScript bridge where needed:

```text
app.wasm
app.wasm.d.ts
app.wasm.loader.js
app.wasm.map
wasm-bridge-report.json
```

---

## Type Declarations and Schemas

LO should generate TypeScript declarations from LO types.

Example LO:

```LO
type UserProfile {
  id: UserId
  name: String
  email: Email
}
```

Generated TypeScript direction:

```ts
export interface UserProfile {
  id: string;
  name: string;
  email: string;
}
```

LO should also generate JSON Schema and OpenAPI where relevant:

```text
create-order.schema.json
openapi.json
types.d.ts
```

These outputs help:

```text
React forms
Angular forms
Node API clients
validation libraries
OpenAPI clients
AI coding assistants
```

---

## Framework Boundary Markers

LO should support metadata that describes where exported code may run.

Client-safe example:

```LO
export client_safe pure flow calculateVat(subtotal: Money) -> Money {
  return subtotal * 0.20
}
```

Meaning:

```text
safe to run in browser
pure
no secrets
no database
no filesystem
can be exported to JS/WASM
```

Server-only example:

```LO
export server_only secure flow createOrder(req: Request) -> Result<Response, ApiError>
effects [database.write, network.inbound] {
  ...
}
```

Rules:

```text
client_safe exports cannot use secrets, filesystem, database or server-only effects.
server_only exports cannot be emitted into browser bundles.
worker_safe exports must be structured-clone/transfer safe.
framework adapters must respect export markers.
```

---

## Safe Server and Client Split

Bad:

```LO
export client_safe secure flow getSecret() -> SecureString
effects [secret.read] {
  return env.secret("API_KEY")
}
```

Expected diagnostic:

```text
client_export_forbidden_effect
```

Good:

```LO
export server_only secure flow getSecretHash() -> Result<String, Error>
effects [secret.read] {
  ...
}
```

This matters for React Server Components, Server Functions and framework-level
client/server boundaries. LO should make the boundary visible before generated
code reaches a bundler.

---

## React Adapter Output

LO should not become React, but optional generators can produce React-friendly
outputs.

Examples:

```text
TypeScript types
React hook wrappers
fetch clients
form schemas
Zod-like validation schemas
OpenAPI clients
WASM loader
```

LO source stays framework-neutral:

```LO
api OrdersApi {
  POST "/orders" {
    request CreateOrderRequest
    response CreateOrderResponse
    handler createOrder
  }
}
```

Possible generated hook:

```ts
export function useOrderApi() {
  return {
    createOrder,
    getOrder
  };
}
```

This should be a generator/package output, not required LO syntax.

---

## Angular Adapter Output

LO should not hard-code Angular into the language, but optional generators can
produce Angular-friendly outputs.

Examples:

```text
Angular service
Angular typed client
Angular form model
Angular validators
Signal-friendly store wrapper
RxJS Observable wrappers
```

Possible generated Angular service:

```ts
@Injectable({ providedIn: 'root' })
export class OrdersApiClient {
  createOrder(req: CreateOrderRequest): Observable<CreateOrderResponse> {
    ...
  }
}
```

This should remain adapter output. Angular components, decorators, templates,
routing and app architecture stay in Angular.

---

## Node Target

LO should support Node as a runtime target.

Example direction:

```LO
target node {
  module esm
  version ">=22"
  workers true
  source_maps true
}
```

Useful support:

```text
Node ESM output
WASM loader
worker-thread compatible compute modules
typed API clients
Express/Fastify adapter packages
database driver packages
queue packages
```

Node adapters should remain packages. LO core should expose typed, effect-checked
logic and generated bindings.

---

## Worker and Background Compute Output

For Node and browser frameworks, LO can generate worker-safe compute modules.

Example direction:

```LO
export worker_safe pure vector float flow createEmbedding(text: Text) -> TextEmbedding {
  compute auto {
    return TextEmbeddingModel.encode(text)
  }
}
```

Generated outputs:

```text
embedding.worker.js
embedding.worker.d.ts
embedding.wasm
worker-bridge-report.json
```

Worker safety rules:

```text
worker_safe exports cannot capture non-transfer-safe state.
worker_safe exports cannot use DOM, secret, database or uncontrolled filesystem effects.
ArrayBuffer and SharedArrayBuffer transfer/clone behaviour must be reported.
Generated worker modules must avoid blocking the browser main thread or Node event loop.
```

---

## Build Tool Integration

LO should generate metadata for tools such as Vite, Webpack, Angular CLI,
Next-style frameworks and Node apps.

Example output:

```json
{
  "loBuild": {
    "outputs": {
      "esm": "dist/lo/app.js",
      "types": "dist/lo/app.d.ts",
      "wasm": "dist/lo/app.wasm",
      "schemas": "dist/lo/schemas"
    }
  }
}
```

Recommended report:

```text
framework-adapter-manifest.json
```

This lets framework plugins consume LO outputs without guessing generated paths.

---

## Source Maps and Error Mapping

LO must map generated runtime errors back to `.lo` source.

Example:

```text
Browser error:
  Validation failed.

Source:
  src/forms/contact.lo:12
```

Outputs:

```text
app.source-map.json
app.js.map
app.wasm.map
```

---

## Framework-Safe Package Mode

LO packages should declare where exports can run.

Example direction:

```LO
package VatTools {
  targets [browser, node, server, wasm]

  exports {
    client_safe calculateVat
    server_only saveInvoice
    worker_safe createEmbedding
  }
}
```

This prevents accidental misuse by generated framework adapters.

---

## What Must Stay Out of Core LO

```text
React components
Angular components
JSX syntax as a required core feature
Angular decorators
client-side router
virtual DOM
state management framework
template engine
Next/Nuxt-style app framework
Express/Fastify framework conventions
Vite/Webpack plugin implementation details
```

These belong in packages, generators, framework adapters or external tools.

