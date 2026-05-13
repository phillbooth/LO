# LO Neural

`lo-ai-neural` is the package for neural-network model, layer, inference and
training boundary contracts.

It belongs in:

```text
/packages-lo/lo-ai-neural
```

Use this package for:

```text
Model
Layer
Activation
LossFunction
Optimizer
Gradient
Embedding
InferenceResult
TrainingResult
neural model reports
training limits
inference limits
```

## Boundary

Neural networks are not normal app syntax and should not be hard-coded into
`lo-core`.

`lo-ai-neural` may consume vector, matrix and tensor contracts from `lo-core-vector`.
It may consume compute planning from `lo-core-compute`, AI safety/report contracts
from `lo-ai`, and low-bit backend references from `lo-ai-lowbit`.

It must not own:

```text
basic LO language syntax
generic AI prompt/response contracts
low-bit backend implementation
CPU/GPU/NPU/photonic target output
security or payment authorization policy
```

## Example Direction

```lo
use neural
use vector

model TextClassifier {
  input Tensor<Float32, Shape<768>>

  layers {
    dense units 128 activation relu
    dense units 3 activation softmax
  }

  output Distribution<Category>
}
```

Inference stays typed and reported:

```lo
secure compute flow moderateText(input: Text) -> Result<ModerationDecision, AiError> {
  compute auto {
    prefer ai_accelerator
    prefer gpu
    fallback cpu
  }

  let result: ClassificationResult = neural.infer("moderation-model", input)
  return policy.moderation.decide(result)
}
```

AI output is untrusted by default. A neural model result must be routed through
deterministic policy before security, payment or access-control decisions.

Final rule:

```text
lo-ai-neural defines neural workloads.
lo-core-vector defines tensor shapes.
lo-core-compute chooses target plans.
target packages map plans to hardware or fallback outputs.
```
