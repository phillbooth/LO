# LO AI

`lo-ai` is the package for generic AI inference contracts.

It belongs in:

```text
/packages-lo/lo-ai
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
low-bit backend model formats. Those belong in target or adapter packages.

AI output is untrusted by default. Application policy must decide whether and
how model output can influence business decisions.

## Contracts

The package includes typed contracts for model registry entries, model
capabilities, prompt/options validation, target preference selection and
inference reports.

Final rule:

```text
lo-ai describes AI inference.
lo-ai-lowbit adapts low-bit model backends.
lo-core-compute and target packages choose where work runs.
```
