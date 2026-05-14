# LO Logic

`lo-core-logic` is the package for LO multi-state logic concepts.

It belongs in:

```text
/packages-lo/lo-core-logic
```

Use this package for:

```text
Tri
Logic<N>
Decision
RiskLevel
Omni logic
multi-state logic
conversion rules
truth tables
logic reports
```

## Safety Contracts

`lo-core-logic` treats logic values as explicit finite states. The package
provides helpers for:

```text
Tri constants: -1 false, 0 unknown, 1 true
tri.not / tri.and / tri.or / tri.nor
explicit Tri -> Bool conversion policy
Logic<N> definition validation
logic state bounds checks
truth table validation and reports
```

Failure and exploit cases that must be blocked:

```text
unknown silently becoming true or Allow
invalid state indexes escaping a declared width
duplicate state names making reports ambiguous
incomplete or duplicate truth table rows hiding unhandled states
Logic<N> definitions whose state count does not match their width
```

`triToBool` requires a policy such as `unknown_as_false`,
`unknown_as_true` or `unknown_as_error`. Security-sensitive callers should use
`unknown_as_error` or `unknown_as_false`; they must not allow unknown values to
become access grants by default.

## Boundary

`Tri` is a language-level logic model. `Omni` is a wider logic model. Photonic
support is a hardware or compute mapping.

Some low-bit AI backends, including BitNet-style ternary models, also use
`-1`, `0` and `+1`, but they are model weights for AI inference, not LO logic
truth semantics. Low-bit AI backend integration belongs in `lo-ai-lowbit`.

Final rule:

```text
lo-core-logic handles Tri, Logic<N> and Omni.
lo-ai-lowbit handles low-bit and ternary model weights.
lo-core-photonic handles how logic may be represented using light.
```

## Naming Decision

Use `lo-core-logic`, not `lo-tri`.

`lo-tri` is too narrow because LO may support `Tri`, `Logic<4>`, `Logic<5>`,
`Logic<N>`, `Decision`, `RiskLevel`, Omni logic and multi-state compute.
