export type BitNetWeightSet = "ternary-b1.58";

export type BitNetQuantization = "i2_s" | "tl1" | "tl2";

export type BitNetEmbeddingQuantization = "none" | "f16" | "q6_k";

export type BitNetKernelFamily = "i2_s" | "tl1" | "tl2" | "auto";

export type BitNetRuntimeKind =
  | "bitnet.cpp"
  | "native-addon"
  | "external-process"
  | "plan-only";

export type BitNetDiagnosticSeverity = "warning" | "error";

export interface BitNetDiagnostic {
  readonly code: string;
  readonly severity: BitNetDiagnosticSeverity;
  readonly message: string;
  readonly path?: string;
}

export interface BitNetModelReference {
  readonly name: string;
  readonly path: string;
  readonly format: "gguf";
  readonly weightSet: BitNetWeightSet;
  readonly quantization: BitNetQuantization;
  readonly embeddingQuantization: BitNetEmbeddingQuantization;
  readonly parameterCount?: string;
  readonly maxContextTokens: number;
  readonly maxOutputTokens: number;
  readonly memoryEstimateBytes: number;
}

export interface BitNetCpuRuntimeLimits {
  readonly threads: number;
  readonly timeoutMs: number;
  readonly maxPromptTokens: number;
  readonly maxOutputTokens: number;
  readonly memoryLimitBytes: number;
}

export interface BitNetCpuInferencePlan {
  readonly model: BitNetModelReference;
  readonly runtime: BitNetRuntimeKind;
  readonly kernelFamily: BitNetKernelFamily;
  readonly limits: BitNetCpuRuntimeLimits;
  readonly fallbackReason?: string;
  readonly report: true;
}

export interface BitNetInferenceReport {
  readonly modelName: string;
  readonly selectedTarget: "cpu.bitnet";
  readonly runtime: BitNetRuntimeKind;
  readonly quantization: BitNetQuantization;
  readonly embeddingQuantization: BitNetEmbeddingQuantization;
  readonly threads: number;
  readonly fallback: boolean;
  readonly diagnostics: readonly BitNetDiagnostic[];
}

export function createBitNetCpuInferencePlan(
  model: BitNetModelReference,
  limits: BitNetCpuRuntimeLimits,
  options: {
    readonly runtime?: BitNetRuntimeKind;
    readonly kernelFamily?: BitNetKernelFamily;
    readonly fallbackReason?: string;
  } = {},
): BitNetCpuInferencePlan {
  return {
    model,
    runtime: options.runtime ?? "plan-only",
    kernelFamily: options.kernelFamily ?? "auto",
    limits,
    ...(options.fallbackReason === undefined
      ? {}
      : { fallbackReason: options.fallbackReason }),
    report: true,
  };
}

export function validateBitNetCpuInferencePlan(
  plan: BitNetCpuInferencePlan,
): readonly BitNetDiagnostic[] {
  const diagnostics: BitNetDiagnostic[] = [];

  if (plan.model.path.trim().length === 0) {
    diagnostics.push({
      code: "LO_BITNET_MODEL_PATH_REQUIRED",
      severity: "error",
      message: "BitNet inference requires an explicit local model path.",
      path: "model.path",
    });
  }

  if (plan.limits.maxOutputTokens <= 0) {
    diagnostics.push({
      code: "LO_BITNET_MAX_OUTPUT_TOKENS_REQUIRED",
      severity: "error",
      message: "BitNet inference requires a positive max output token limit.",
      path: "limits.maxOutputTokens",
    });
  }

  if (plan.limits.threads <= 0) {
    diagnostics.push({
      code: "LO_BITNET_THREAD_LIMIT_REQUIRED",
      severity: "error",
      message: "BitNet inference requires a positive thread limit.",
      path: "limits.threads",
    });
  }

  if (plan.limits.timeoutMs <= 0) {
    diagnostics.push({
      code: "LO_BITNET_TIMEOUT_REQUIRED",
      severity: "error",
      message: "BitNet inference requires a positive timeout.",
      path: "limits.timeoutMs",
    });
  }

  if (plan.model.memoryEstimateBytes > plan.limits.memoryLimitBytes) {
    diagnostics.push({
      code: "LO_BITNET_MEMORY_LIMIT_EXCEEDED",
      severity: "error",
      message: "BitNet model memory estimate exceeds the configured limit.",
      path: "limits.memoryLimitBytes",
    });
  }

  if (plan.model.maxOutputTokens > plan.limits.maxOutputTokens) {
    diagnostics.push({
      code: "LO_BITNET_MODEL_OUTPUT_LIMIT_EXCEEDS_RUNTIME_LIMIT",
      severity: "warning",
      message:
        "BitNet model output capacity is higher than the runtime output limit.",
      path: "model.maxOutputTokens",
    });
  }

  return diagnostics;
}
