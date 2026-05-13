export type NeuralTask =
  | "classification"
  | "generation"
  | "embedding"
  | "regression"
  | "segmentation"
  | "detection";

export type ActivationFunction =
  | "relu"
  | "gelu"
  | "sigmoid"
  | "tanh"
  | "softmax"
  | "linear";

export type LossFunction =
  | "cross_entropy"
  | "mean_squared_error"
  | "contrastive"
  | "custom";

export type OptimizerName = "sgd" | "adam" | "adamw" | "rmsprop" | "custom";

export interface TensorShapeRef {
  readonly dimensions: readonly number[];
}

export interface NeuralTensorRef {
  readonly elementType: string;
  readonly shape: TensorShapeRef;
}

export interface NeuralLayer {
  readonly name: string;
  readonly kind:
    | "dense"
    | "convolution"
    | "pooling"
    | "attention"
    | "embedding"
    | "normalization"
    | "dropout"
    | "custom";
  readonly input: NeuralTensorRef;
  readonly output: NeuralTensorRef;
  readonly activation?: ActivationFunction;
}

export interface NeuralModelDefinition {
  readonly name: string;
  readonly task: NeuralTask;
  readonly inputs: readonly NeuralTensorRef[];
  readonly outputs: readonly NeuralTensorRef[];
  readonly layers: readonly NeuralLayer[];
}

export interface NeuralInferencePlan {
  readonly flow: string;
  readonly model: string;
  readonly targetPreference: readonly string[];
  readonly maxMemoryBytes: number;
  readonly timeoutMs: number;
  readonly outputTrusted: false;
}

export interface NeuralTrainingPlan {
  readonly flow: string;
  readonly model: string;
  readonly dataset: string;
  readonly loss: LossFunction;
  readonly optimizer: OptimizerName;
  readonly epochs: number;
  readonly batchSize: number;
  readonly maxMemoryBytes: number;
  readonly timeoutMs: number;
  readonly dataPolicy: string;
}

export interface NeuralReport {
  readonly model: string;
  readonly task: NeuralTask;
  readonly inferencePlans: readonly NeuralInferencePlan[];
  readonly trainingPlans: readonly NeuralTrainingPlan[];
  readonly warnings: readonly string[];
}
