# Omni-Logic Design

LO should be Omni-logic compatible from the start.

Omni-logic means LO can describe and report logic behaviour through a general logic-width abstraction instead of hard-coding every system as ternary-only.

## Design Goals

```text
support binary CPU logic today
support ternary simulation as a first-class feature
leave room for quaternary and wider multi-state logic
report target support clearly
avoid source, schema and compiler names that block expansion
```

## Conceptual Syntax

Initial syntax may allow named modes:

```LO
logic mode ternary

state false
state unknown
state true
```

Future-compatible syntax should also allow explicit widths:

```LO
logic width 5

state false
state low
state unknown
state high
state true
```

## Compatibility Rule

The compiler should treat logic mode as a program requirement and target capability.

```text
program requested width = source requirement
target supported width  = backend capability
fallback                = compiler/runtime policy
```

If the target cannot support the requested width, LO must warn, error or fail according to the declared fallback policy.

## Naming Rule

Prefer:

```text
logic-state
logic-width
logic-mode
logic-target
omni-logic
multi-state
```

Avoid:

```text
ternary-only
three-way-only
photonic-only
```
