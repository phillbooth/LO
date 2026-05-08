# LO AI

`lo-ai` is the package for generic AI inference contracts.

It belongs in:

```text
/packages/lo-ai
```

Use this package for:

```text
AI model metadata
prompt and response contracts
inference options
model capability declarations
memory estimates
AI safety policy
AI inference reports
target-neutral generation contracts
```

## Boundary

`lo-ai` should not own a model runtime, kernel implementation, GPU backend or
BitNet-specific model format. Those belong in target or adapter packages.

AI output is untrusted by default. Application policy must decide whether and
how model output can influence business decisions.

Final rule:

```text
lo-ai describes AI inference.
lo-bitnet adapts BitNet-style models.
lo-compute and target packages choose where work runs.
```
