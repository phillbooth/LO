export type ComputeTarget =
  | "cpu"
  | "cpu.generic"
  | "cpu.bitnet"
  | "wasm"
  | "binary"
  | "vector"
  | "gpu"
  | "npu"
  | "photonic";

export type ComputeWorkloadKind =
  | "general"
  | "vector"
  | "matrix"
  | "ai-inference"
  | "io-bound";

export interface ComputeCapability {
  readonly target: ComputeTarget;
  readonly features: readonly string[];
  readonly available: boolean;
}

export interface ComputeBudget {
  readonly memoryBytes?: number;
  readonly timeoutMs?: number;
  readonly parallelism?: number;
  readonly maxTokens?: number;
}

export interface ComputePlan {
  readonly name: string;
  readonly workload: ComputeWorkloadKind;
  readonly preferredTarget: ComputeTarget;
  readonly fallbackTargets: readonly ComputeTarget[];
  readonly budget?: ComputeBudget;
  readonly requiredCapabilities: readonly string[];
  readonly reportTargetSelection: boolean;
}

export interface ComputeAutoPolicy {
  readonly workload: ComputeWorkloadKind;
  readonly prefer: readonly ComputeTarget[];
  readonly fallbackRequired: boolean;
  readonly report: boolean;
}

export interface ComputeTargetSelection {
  readonly requested: "compute auto" | ComputeTarget;
  readonly selectedTarget: ComputeTarget;
  readonly reason: string;
  readonly fallback: boolean;
  readonly satisfied: boolean;
  readonly warnings: readonly string[];
}

export interface ComputeReport {
  readonly plans: readonly ComputePlan[];
  readonly capabilities: readonly ComputeCapability[];
  readonly selections: readonly ComputeTargetSelection[];
  readonly warnings: readonly string[];
}

export function selectComputeTarget(
  policy: ComputeAutoPolicy,
  capabilities: readonly ComputeCapability[],
): ComputeTargetSelection {
  for (const target of policy.prefer) {
    const capability = capabilities.find((item) => item.target === target);
    if (capability?.available === true) {
      return {
        requested: "compute auto",
        selectedTarget: target,
        reason: "Target is available and appears first in preference order.",
        fallback: target !== policy.prefer[0],
        satisfied: true,
        warnings: [],
      };
    }
  }

  const firstPreference = policy.prefer[0] ?? "cpu.generic";

  return {
    requested: "compute auto",
    selectedTarget: firstPreference,
    reason: policy.fallbackRequired
      ? "No preferred compute target is available."
      : "No preferred compute target is available; using first preference as a plan-only target.",
    fallback: true,
    satisfied: !policy.fallbackRequired,
    warnings: [
      policy.fallbackRequired
        ? "Required compute fallback could not be satisfied."
        : "Compute target selection is plan-only.",
    ],
  };
}
