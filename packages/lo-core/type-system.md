# LO Type System

This document describes the proposed type system for **LO / Logic Omni**.

LO is a strict, memory-safe, security-first, JSON-native, API-native and accelerator-aware programming language concept.

The type system should prevent common mistakes before runtime, especially in JSON/API systems, security-sensitive workflows, maths-heavy code and multi-target compilation.

---

## Type System Summary

LO should be:

```text
strictly typed
memory safe
explicit about missing values
explicit about errors
safe for JSON decoding
safe for API contracts
safe for money and dates
safe for concurrency
aware of maths shapes
aware of target compatibility
```

The type system should reject unsafe or ambiguous code early.

---

## Core Rule

LO should not allow loose type behaviour.

Invalid:

```LO
let total = "10" + 5
```

Valid:

```LO
let total: Int = toInt("10") + 5
```

Conversions must be explicit.

---

## Primitive Types

Initial primitive types:

```text
Void
Bool
Int
Float
Decimal
String
SecureString
Char
Bytes
```

Sized numeric spellings:

```text
Int8
Int16
Int32
Int64
UInt8
UInt16
UInt32
UInt64
Float16
Float32
Float64
```

Default numeric policy:

```text
Int     = checked signed 64-bit integer unless a sized integer is written.
Float   = Float64 unless Float16 or Float32 is written.
Decimal = exact base-10 decimal for financial and JSON/API decimal values.
```

Sized numeric types are explicit. They should be used for binary formats, FFI boundaries, protocol fields, GPU/vector layouts and memory-sensitive data structures.

Implicit narrowing is not allowed.

---

## Void

`Void` represents no meaningful return value.

Example:

```LO
secure flow main() -> Result<Void, Error> {
  print("hello from LO")
  return Ok()
}
```

---

## Bool

`Bool` is only for true/false values.

Example:

```LO
let enabled: Bool = true
```

Only `Bool` should be aLOwed in `if` conditions.

Valid:

```LO
if enabled == true {
  start()
}
```

Invalid:

```LO
if customer {
  process(customer)
}
```

Use `Option<T>` and `match` for missing values.

---

## Int

`Int` represents whole numbers and defaults to a checked signed 64-bit integer.

Example:

```LO
let count: Int = 10
```

Use sized integers when layout or protocol compatibility matters:

```LO
let retryCount: Int32 = 3
let packetSize: UInt16 = 512
```

String-to-int conversion must be explicit:

```LO
let count: Int = toInt("10")
```

Overflow should be checked. Wrapping arithmetic must use an explicit wrapping operation or target policy.

---

## Float

`Float` represents floating-point numbers and defaults to `Float64`.

Example:

```LO
let score: Float = 0.87
```

Use explicit float sizes when layout, target capability or accelerator planning matters:

```LO
let weight: Float32 = 0.25
let activation: Float16 = 0.5
```

Floating-point values should not be used for money.

Use:

```LO
Money<Currency>
```

or:

```LO
Decimal
```

for money-like calculations.

---

## Decimal

`Decimal` is intended for precise base-10 decimal values.

Example:

```LO
let rate: Decimal = 19.99
```

Use `Decimal` or `Money<Currency>` when exact decimal behaviour matters.

Decimal rules:

```text
Decimal arithmetic should be deterministic across supported targets.
Decimal values should not silently convert to Float.
Decimal scale and rounding policy must be explicit at financial/API boundaries.
JSON decimal decoding should preserve decimal text where possible before validation.
```

---

## String

`String` represents normal text.

Example:

```LO
let name: String = "LO"
```

Strings should not be used for secrets.

Use:

```LO
SecureString
```

for secret values.

---

## SecureString

`SecureString` represents secret text.

Example:

```LO
let apiKey: SecureString = env.secret("API_KEY")
```

Rules:

```text
SecureString cannot be printed by default.
SecureString cannot be logged by default.
SecureString cannot be accidentally converted to String.
SecureString should be redacted in reports.
SecureString should be cleared from memory where possible.
```

Invalid:

```LO
print(apiKey)
```

Valid:

```LO
log.info("API key loaded", { key: redact(apiKey) })
```

---

## Bytes

`Bytes` represents raw binary data.

Example:

```LO
let body: Bytes = req.body
```

Bytes should be bounds checked and memory safe.

---

## Collection Types

Core collection types:

```text
Array<T>
Map<K, V>
Set<T>
```

Examples:

```LO
let items: Array<OrderItem> = []
let headers: Map<String, String> = req.headers
let tags: Set<String> = Set()
```

Collections should be bounds checked.

Invalid:

```LO
let first = items[999]
```

if the index is out of range.

The runtime should fail safely with source-mapped errors.

---

## Option Type

`Option<T>` represents a value that may be missing.

States:

```text
Some(value)
None
```

Example:

```LO
let customer: Option<Customer> = findCustomer(customerId)
```

Handle with `match`:

```LO
match customer {
  Some(c) => processCustomer(c)
  None => return Review("Customer missing")
}
```

LO should not use JavaScript-style `undefined`.

LO should avoid silent `null`.

---

## Result Type

`Result<T, E>` represents success or failure.

States:

```text
Ok(value)
Err(error)
```

Example:

```LO
flow loadOrder(id: OrderId) -> Result<Order, OrderError> {
  let order: Option<Order> = database.findOrder(id)

  match order {
    Some(o) => return Ok(o)
    None => return Err(OrderError.NotFound)
  }
}
```

Unhandled `Result` values should fail compilation or produce a strong warning.

---

## Decision Type

`Decision` is used for 3-way business and security logic.

Recommended definition:

```LO
enum Decision {
  ALOw
  Deny
  Review
}
```

Use cases:

```text
fraud checks
payment checks
access control
risk decisions
AI confidence routing
manual review workflows
policy enforcement
```

Example:

```LO
secure flow checkPayment(status: PaymentStatus) -> Decision {
  match status {
    Paid => ALOw
    Failed => Deny
    Pending => Review
    Unknown => Review
  }
}
```

Use `Decision`, not `Bool`, when uncertainty is possible.

---

## Tri Type

`Tri` is for lower-level 3-way logic.

Canonical states:

```text
Positive
Neutral
Negative
```

`Tri` is value-level, not policy-level. It represents mathematical, signal, model-state or target-facing ternary state.

Example:

```LO
pure flow signalState(score: Float) -> Tri {
  match score {
    score > 0.1 => Positive
    score < -0.1 => Negative
    _ => Neutral
  }
}
```

Guidance:

```text
Bool      = true / false
Decision  = Allow / Deny / Review
Tri       = Positive / Neutral / Negative
Option    = Some / None
Result    = Ok / Err
```

`Decision` should be preferred for business logic.

`Tri` should be used for maths, ternary simulation, signal processing and model-state logic.

---

## Decision and Tri Boundary

`Decision` and `Tri` are both 3-state concepts, but they are not interchangeable.

Use `Decision` when the value controls a human, business, security or policy outcome.

```text
ALOw  = proceed
Deny   = block
Review = defer to manual review, policy review or a safer fallback
```

Use `Tri` when the value describes a measured, computed or modelled state.

```text
Positive = above baseline, active, true-like or high signal
Neutral  = at baseline, unknown, balanced or no clear signal
Negative = below baseline, inactive, false-like or low signal
```

Compiler rules:

```text
Decision must not implicitly convert to Tri.
Tri must not implicitly convert to Decision.
Decision.Review must not be treated as Tri.Neutral without an explicit policy.
Tri.Neutral must not be treated as Decision.Review without an explicit policy.
Comparisons between Decision and Tri are type errors.
Assignments between Decision and Tri are type errors.
```

Allowed conversions must be named and policy-bearing.

Example:

```LO
secure flow riskToDecision(signal: Tri) -> Decision {
  match signal {
    Positive => Deny
    Neutral => Review
    Negative => ALOw
  }
}
```

This keeps business policy out of low-level ternary logic and keeps target-facing ternary values from silently making security decisions.

---

## Enum Types

Enums define fixed states.

Example:

```LO
enum PaymentStatus {
  Paid
  Unpaid
  Pending
  Failed
  Refunded
  Unknown
}
```

Enums should be handled exhaustively with `match`.

Example:

```LO
match status {
  Paid => ALOw
  Unpaid => Review
  Pending => Review
  Failed => Deny
  Refunded => Review
  Unknown => Review
}
```

---

## Type Definitions

Example:

```LO
type Customer {
  id: CustomerId
  name: String
  email: Option<Email>
}
```

Types should be clear and explicit.

---

## Type Aliases

LO may support type aliases.

Example:

```LO
type CustomerId = String
type OrderId = String
type Email = String
```

Later versions may support stronger branded types to avoid mixing IDs.

Example:

```LO
brand CustomerId: String
brand OrderId: String
```

This would prevent accidentally passing an `OrderId` where a `CustomerId` is expected.

---

## Money Type

Money should be typed by currency.

Example:

```LO
let amount: Money<GBP> = Money(100.00)
let tax: Money<GBP> = Money(20.00)

let total: Money<GBP> = amount + tax
```

Invalid:

```LO
let amount: Money<GBP> = Money(100.00)
let tax: Money<USD> = Money(20.00)

let total = amount + tax
```

Expected compiler error:

```text
Cannot add Money<GBP> and Money<USD>.
Convert currency explicitly before adding.
```

This prevents financial mistakes.

---

## Currency Type

Currencies should be explicit.

Examples:

```text
GBP
USD
EUR
JPY
```

Currency conversion should be explicit because exchange rates are external and time-dependent.

Example:

```LO
let usd: Money<USD> = convert(amount, to: USD, rate: exchangeRate)
```

---

## Timestamp and Duration

Example:

```LO
let createdAt: Timestamp = now()
let timeout: Duration = 5s
```

Durations may support:

```text
ms
s
m
h
d
```

Examples:

```LO
let retryDelay: Duration = 500ms
let apiTimeout: Duration = 5s
let webhookMaxAge: Duration = 5m
```

---

## Json Type

LO should include a `Json` type.

Related types:

```text
Json
JsonObject
JsonArray
JsonString
JsonNumber
JsonBool
JsonNull
```

Raw JSON example:

```LO
let raw: Json = req.json()
let eventType: String = raw.path("$.type").asString()
```

Typed JSON should be preferred for production.

```LO
let input: CreateOrderRequest = json.decode<CreateOrderRequest>(req.body)
```

---

## Typed JSON Decoding

Given:

```LO
type CreateOrderRequest {
  customerId: CustomerId
  items: Array<OrderItem>
  currency: Currency
}
```

Decode:

```LO
let input: CreateOrderRequest = json.decode<CreateOrderRequest>(req.body)
```

If the JSON does not match the type, LO should return a source-mapped validation error.

---

## JSON Null Handling

JSON may contain `null`, but LO should not allow silent null behaviour.

If a JSON field may be null, it should decode into:

```LO
Option<T>
```

Example:

```LO
type CustomerPayload {
  email: Option<Email>
}
```

Invalid if `email` may be missing or null:

```LO
type CustomerPayload {
  email: Email
}
```

unless the JSON policy rejects null and missing values.

---

## Arrays and Bounds

Arrays should be memory safe.

Example:

```LO
let first: OrderItem = items[0]
```

If the index may be missing, safer syntax may return `Option<T>`:

```LO
let first: Option<OrderItem> = items.get(0)
```

Direct indexing may fail safely if out of bounds.

---

## Matrix Type

LO should support matrix types for maths-heavy workloads.

Example:

```LO
let weights: Matrix<1024, 1024, Float16>
```

Shape:

```text
Matrix<Rows, Columns, Type>
```

---

## Vector Type

Example:

```LO
let input: Vector<1024, Float16>
```

Shape:

```text
Vector<Length, Type>
```

---

## Tensor Type

Possible syntax:

```LO
let image: Tensor<[1, 224, 224, 3], Float32>
```

Tensor shapes should be checked where possible.

---

## Compile-Time Shape Checking

Invalid:

```LO
Matrix<128, 256, Float32> * Matrix<128, 64, Float32>
```

Valid:

```LO
Matrix<128, 256, Float32> * Matrix<256, 64, Float32>
```

The compiler should catch incompatible matrix operations before runtime where possible.

---

## Target-Aware Types

Some types may only be valid on certain targets.

Example:

```text
Matrix<1024, 1024, Float16> may be suitable for GPU/photonic planning.
FileHandle may only be suitable for CPU.
SecureString should not be sent to GPU/photonic compute blocks.
```

The type checker and target checker should work together.

---

## Compute-Compatible Types

Compute blocks should usually aLOw:

```text
Int
Float
Decimal where supported
Vector<N, T>
Matrix<R, C, T>
Tensor<Shape, T>
model input/output types
```

Compute blocks should reject:

```text
FileHandle
DatabaseConnection
HttpRequest
SecureString
EnvironmentSecret
mutable global state
```

---

## API Request Types

API requests should be typed.

Example:

```LO
type CreateOrderRequest {
  customerId: CustomerId
  items: Array<OrderItem>
  currency: Currency
}
```

Used in API contract:

```LO
api OrdersApi {
  POST "/orders" {
    request CreateOrderRequest
    response CreateOrderResponse
    handler createOrder
  }
}
```

---

## API Response Types

Example:

```LO
type CreateOrderResponse {
  id: OrderId
  decision: Decision
  status: OrderStatus
}
```

Handlers should return the declared response type.

---

## Error Types

Errors should be typed.

Example:

```LO
enum OrderError {
  NotFound
  InvalidStatus
  PaymentFailed
  StockUnavailable
}
```

Use with:

```LO
Result<Order, OrderError>
```

---

## Validation Errors

LO may include structured validation errors.

Example:

```LO
enum ValidationError {
  MissingField(field: String)
  InvalidType(field: String)
  InvalidFormat(field: String)
}
```

This is useful for JSON and API errors.

---

## Type Inference

LO may support limited type inference.

Example:

```LO
let count = 10
```

The compiler can infer:

```text
Int
```

However, public API boundaries should prefer explicit types.

Recommended explicit types for:

```text
flow parameters
flow return values
API request types
API response types
JSON decode targets
compute block inputs
security-sensitive values
```

---

## Function Parameters

Parameters should be typed.

Example:

```LO
flow add(a: Int, b: Int) -> Int {
  return a + b
}
```

Untyped parameters should not be aLOwed in strict mode.

---

## Return Types

Return types should be explicit.

Example:

```LO
flow getName() -> String {
  return "LO"
}
```

Fallible return:

```LO
flow getOrder(id: OrderId) -> Result<Order, OrderError> {
  ...
}
```

---

## Generic Types

LO should support generics.

Examples:

```LO
Option<Customer>
Result<Order, OrderError>
Array<OrderItem>
Map<String, String>
Matrix<128, 256, Float32>
```

---

## Exhaustive Match Checking

Given:

```LO
enum PaymentStatus {
  Paid
  Pending
  Failed
  Unknown
}
```

This is incomplete:

```LO
match status {
  Paid => ALOw
  Failed => Deny
}
```

Compiler should report missing cases:

```text
Pending
Unknown
```

---

## Pattern Matching Option

Example:

```LO
match customer {
  Some(c) => process(c)
  None => return Review("Customer missing")
}
```

---

## Pattern Matching Result

Example:

```LO
match result {
  Ok(order) => return Ok(order)
  Err(error) => return Err(error)
}
```

---

## No Any by Default

LO should avoid a broad `Any` type by default.

If a dynamic escape hatch exists, it should be explicit and restricted.

Possible future type:

```LO
Dynamic
```

But it should be discouraged in production systems.

---

## No Untyped JSON by Default

JSON may be dynamic at the boundary, but production logic should decode into strict types.

ALOwed:

```LO
let raw: Json = req.json()
```

Preferred:

```LO
let input: CreateOrderRequest = json.decode<CreateOrderRequest>(req.body)
```

---

## Type Safety and AI Tools

The type system should help AI assistants.

Compiler reports should include:

```text
expected type
actual type
source file
line
column
suggested fix
safe example
```

Example:

```json
{
  "errorType": "TypeError",
  "file": "src/main.lo",
  "line": 2,
  "column": 15,
  "expected": "Int",
  "actual": "String",
  "problem": "Cannot add String and Int.",
  "suggestedFix": "Use toInt() to convert the String explicitly."
}
```

---

## Type Safety and Source Maps

Type errors should map to the original `.lo` file.

Example:

```text
Type error:
Cannot add String and Int.

Original source:
  src/main.lo:2:20

Suggestion:
  Convert the String explicitly using toInt().
```

---

## Type System Non-Goals

LO should not include:

```text
JavaScript-style undefined
silent null
implicit type coercion
truthy/falsy checks
untyped production JSON
unsafe raw pointers in normal code
hidden exceptions as the main error system
```

---

## Open Type System Questions

```text
Should Money<Currency> be built in or standard library?
Should Decision be built in or standard library?
Should JSON null decode automatically to None?
Should direct array indexing return T or Option<T>?
Should LO include branded types for IDs?
Should LO allow a restricted Dynamic type?
Should matrix/tensor shapes be fully compile-time from version 1?
```

---

## Final Type System Principle

The LO type system should make unsafe assumptions visible.

It should help developers avoid:

```text
missing values
unhandled errors
wrong JSON shapes
wrong API responses
money mistakes
unsafe boolean decisions
matrix shape errors
secret leakage
target-incompatible compute blocks
```

The type system should make LO safer, clearer and easier to debug before code reaches runtime.
