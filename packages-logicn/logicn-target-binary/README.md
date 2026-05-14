# LogicN Target Binary

`logicn-target-binary` is the package for LogicN binary and native target planning.

It belongs in:

```text
/packages-logicn/logicn-target-binary
```

Use this package for:

```text
binary target metadata
native artefact planning
platform triples
ABI requirements
binary report format
native target constraints
```

## Boundary

`logicn-target-binary` should consume compute plans and describe binary/native target
outputs. It should not own LogicN language rules, API kernel policy or photonic
hardware concepts.
