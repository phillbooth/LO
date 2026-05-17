# Rules: Unsupported Legacy Patterns

LogicN should avoid legacy patterns that hide behavior, weaken contracts or make
security difficult to review.

## Not Core

```text
global mutable state
raw object dumps
silent missing values
truthy/falsy branch behavior
implicit coercion
monkey patching
undeclared effects
silent target fallback
raw model public responses
hidden runtime mutation
unsafe native calls in normal app code
```

## Safer Alternatives

```text
typed globals through strict registry
secret-safe reports
Option<T>
Bool-only conditions
explicit conversions
adapters and pipelines
effect declarations
fallback reports
response contracts
signed hotfix packages
interop native with explicit ABI and audit reports
```

## v1 Scope

Document and diagnose the patterns most likely to cause security or application
boundary failures.
