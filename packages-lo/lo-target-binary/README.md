# LO Target Binary

`lo-target-binary` is the package for LO binary and native target planning.

It belongs in:

```text
/packages-lo/lo-target-binary
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

`lo-target-binary` should consume compute plans and describe binary/native target
outputs. It should not own LO language rules, API kernel policy or photonic
hardware concepts.
