# LO Neuromorphic

`lo-ai-neuromorphic` is the package for neuromorphic and spiking event model
contracts.

It belongs in:

```text
/packages-lo/lo-ai-neuromorphic
```

Use this package for:

```text
Spike
SpikeTrain
EventSignal<T>
SpikingModel
NeuromorphicPlan
neuromorphic reports
event-driven inference plans
```

## Boundary

Neuromorphic support is related to neural computing, but it is not the same as
normal tensor neural networks.

```text
lo-ai-neural
  tensors, weights, layers, inference, training

lo-ai-neuromorphic
  spikes, events, event-driven spiking models
```

`lo-ai-neuromorphic` should consume compute target planning from `lo-core-compute` and
target output planning from future accelerator packages. It must not own normal
neural-network layer definitions or LO core syntax.

Final rule:

```text
lo-ai-neuromorphic owns spiking/event concepts.
lo-ai-neural owns tensor neural network concepts.
target packages own hardware-specific plans.
```
