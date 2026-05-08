export type AiTaskKind =
  | "text-generation"
  | "summarisation"
  | "classification"
  | "embedding"
  | "reranking"
  | "tool-planning";

export type AiOutputTrust = "untrusted" | "policy-reviewed" | "trusted-local";

export type AiModelFormat =
  | "gguf"
  | "onnx"
  | "safetensors"
  | "native"
  | "remote";

export type AiInferenceTarget =
  | "gpu"
  | "npu"
  | "cpu.bitnet"
  | "cpu.generic"
  | "wasm"
  | "remote"
  | "plan-only";

export type AiDiagnosticSeverity = "info" | "warning" | "error";

export interface AiDiagnostic {
  readonly code: string;
  readonly severity: AiDiagnosticSeverity;
  readonly message: string;
  readonly path?: string;
  readonly suggestedFix?: string;
}

export interface AiMemoryEstimate {
  readonly modelBytes: number;
  readonly contextBytes: number;
  readonly workingBytes: number;
  readonly totalBytes: number;
}

export interface AiModelCapability {
  readonly task: AiTaskKind;
  readonly maxContextTokens: number;
  readonly maxOutputTokens: number;
  readonly supportsStreaming: boolean;
  readonly supportedTargets: readonly AiInferenceTarget[];
}

export interface AiModelDescriptor {
  readonly name: string;
  readonly format: AiModelFormat;
  readonly source: "local-file" | "local-directory" | "registry" | "remote-api";
  readonly capabilities: readonly AiModelCapability[];
  readonly memoryEstimate?: AiMemoryEstimate;
  readonly safetyPolicy: AiSafetyPolicy;
}

export interface AiPrompt {
  readonly input: string;
  readonly system?: string;
  readonly metadata?: Readonly<Record<string, string>>;
}

export interface AiGenerationOptions {
  readonly maxOutputTokens: number;
  readonly contextTokens: number;
  readonly temperature?: number;
  readonly timeoutMs: number;
  readonly stream: boolean;
}

export interface AiSafetyPolicy {
  readonly outputTrust: AiOutputTrust;
  readonly allowSecurityDecisions: boolean;
  readonly requireHumanReviewForHighImpact: boolean;
  readonly redactSecretsFromPrompts: boolean;
  readonly logPrompts: boolean;
}

export interface AiInferenceRequest {
  readonly model: AiModelDescriptor;
  readonly prompt: AiPrompt;
  readonly task: AiTaskKind;
  readonly targetPreference: readonly AiInferenceTarget[];
  readonly options: AiGenerationOptions;
}

export interface AiInferenceResponse {
  readonly text: string;
  readonly finishReason: "stop" | "length" | "timeout" | "error";
  readonly outputTrust: AiOutputTrust;
  readonly diagnostics: readonly AiDiagnostic[];
}

export interface AiInferenceReport {
  readonly modelName: string;
  readonly task: AiTaskKind;
  readonly requestedTargets: readonly AiInferenceTarget[];
  readonly selectedTarget: AiInferenceTarget;
  readonly fallbackUsed: boolean;
  readonly memoryEstimate?: AiMemoryEstimate;
  readonly diagnostics: readonly AiDiagnostic[];
}

export const DEFAULT_AI_SAFETY_POLICY: AiSafetyPolicy = {
  outputTrust: "untrusted",
  allowSecurityDecisions: false,
  requireHumanReviewForHighImpact: true,
  redactSecretsFromPrompts: true,
  logPrompts: false,
};

export function defineAiSafetyPolicy(
  policy: Partial<AiSafetyPolicy> = {},
): AiSafetyPolicy {
  return {
    outputTrust: policy.outputTrust ?? DEFAULT_AI_SAFETY_POLICY.outputTrust,
    allowSecurityDecisions:
      policy.allowSecurityDecisions ??
      DEFAULT_AI_SAFETY_POLICY.allowSecurityDecisions,
    requireHumanReviewForHighImpact:
      policy.requireHumanReviewForHighImpact ??
      DEFAULT_AI_SAFETY_POLICY.requireHumanReviewForHighImpact,
    redactSecretsFromPrompts:
      policy.redactSecretsFromPrompts ??
      DEFAULT_AI_SAFETY_POLICY.redactSecretsFromPrompts,
    logPrompts: policy.logPrompts ?? DEFAULT_AI_SAFETY_POLICY.logPrompts,
  };
}

export function validateAiInferenceRequest(
  request: AiInferenceRequest,
): readonly AiDiagnostic[] {
  const diagnostics: AiDiagnostic[] = [];

  if (request.options.maxOutputTokens <= 0) {
    diagnostics.push({
      code: "LO_AI_MAX_OUTPUT_TOKENS_REQUIRED",
      severity: "error",
      message: "AI inference requires a positive max output token limit.",
      path: "options.maxOutputTokens",
    });
  }

  if (request.options.contextTokens <= 0) {
    diagnostics.push({
      code: "LO_AI_CONTEXT_TOKENS_REQUIRED",
      severity: "error",
      message: "AI inference requires a positive context token limit.",
      path: "options.contextTokens",
    });
  }

  if (request.options.timeoutMs <= 0) {
    diagnostics.push({
      code: "LO_AI_TIMEOUT_REQUIRED",
      severity: "error",
      message: "AI inference requires a positive timeout.",
      path: "options.timeoutMs",
    });
  }

  if (request.model.safetyPolicy.allowSecurityDecisions) {
    diagnostics.push({
      code: "LO_AI_SECURITY_DECISION_NOT_ALLOWED",
      severity: "error",
      message:
        "AI output must not directly make security or high-impact decisions.",
      path: "model.safetyPolicy.allowSecurityDecisions",
      suggestedFix:
        "Route AI output through deterministic application policy before acting.",
    });
  }

  return diagnostics;
}
