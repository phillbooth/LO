export type AiAcceleratorKind =
  | "npu"
  | "tpu"
  | "ane"
  | "dsp"
  | "ai-chip"
  | "inference-accelerator"
  | "training-accelerator"
  | "plan-only";

export type AiAcceleratorWorkloadKind =
  | "llm_inference"
  | "llm_finetuning"
  | "rag"
  | "embedding"
  | "multimodal"
  | "image_video_preprocess"
  | "tensor_batching";

export type AiAcceleratorPrecision =
  | "FP8"
  | "BF16"
  | "FP16"
  | "TF32"
  | "FP32";

export type AiAcceleratorFramework =
  | "pytorch"
  | "vllm"
  | "hugging-face"
  | "deepspeed"
  | "tensorflow"
  | "pytorch-lightning"
  | "adapter-only";

export type AiAcceleratorTopology =
  | "single-card"
  | "pooled_1x4"
  | "pooled_2x4"
  | "independent_4x1"
  | "unknown";

export interface AiAcceleratorMemoryProfile {
  readonly hbmBytes?: number;
  readonly onDieSramBytes?: number;
  readonly hbmBandwidthBytesPerSecond?: number;
  readonly pooledHbmBytes?: number;
  readonly avoidHostTransfers: boolean;
}

export interface AiAcceleratorBackendProfile {
  readonly id: string;
  readonly vendor: string;
  readonly device: string;
  readonly kind: AiAcceleratorKind;
  readonly passiveProfile: true;
  readonly preferredWorkloads: readonly AiAcceleratorWorkloadKind[];
  readonly supportedPrecisions: readonly AiAcceleratorPrecision[];
  readonly frameworks: readonly AiAcceleratorFramework[];
  readonly memory: AiAcceleratorMemoryProfile;
  readonly topologies: readonly AiAcceleratorTopology[];
}

export interface AiAcceleratorCapability {
  readonly name: string;
  readonly kind: AiAcceleratorKind;
  readonly vendor?: string;
  readonly supportedPrecisions: readonly string[];
  readonly maxMemoryBytes?: number;
  readonly features: readonly string[];
  readonly backendProfileId?: string;
  readonly topology?: AiAcceleratorTopology;
}

export interface AiAcceleratorPlan {
  readonly flow: string;
  readonly model: string;
  readonly accelerator: "ai_accelerator";
  readonly backendProfileId?: string;
  readonly operations: readonly string[];
  readonly workload?: AiAcceleratorWorkloadKind;
  readonly framework?: AiAcceleratorFramework;
  readonly precision?: AiAcceleratorPrecision | "auto";
  readonly fallbackPrecision?: AiAcceleratorPrecision;
  readonly fallback: "cpu" | "gpu" | "low_bit_ai" | "reject";
}

export interface AiAcceleratorReport {
  readonly backendProfiles?: readonly AiAcceleratorBackendProfile[];
  readonly capabilities: readonly AiAcceleratorCapability[];
  readonly plans: readonly AiAcceleratorPlan[];
  readonly warnings: readonly string[];
}

export const INTEL_GAUDI3_HL338_PROFILE: AiAcceleratorBackendProfile = {
  id: "intel.gaudi3.hl338",
  vendor: "intel",
  device: "Intel Gaudi 3 PCIe HL-338",
  kind: "inference-accelerator",
  passiveProfile: true,
  preferredWorkloads: [
    "llm_inference",
    "llm_finetuning",
    "rag",
    "embedding",
    "multimodal",
    "image_video_preprocess",
    "tensor_batching",
  ],
  supportedPrecisions: ["FP8", "BF16", "FP16", "TF32", "FP32"],
  frameworks: [
    "pytorch",
    "vllm",
    "hugging-face",
    "deepspeed",
    "tensorflow",
    "pytorch-lightning",
  ],
  memory: {
    hbmBytes: 128 * 1024 ** 3,
    onDieSramBytes: 96 * 1024 ** 2,
    hbmBandwidthBytesPerSecond: 3.7 * 1000 ** 4,
    avoidHostTransfers: true,
  },
  topologies: ["single-card", "pooled_1x4", "pooled_2x4", "independent_4x1"],
};
