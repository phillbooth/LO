export type CpuArchitecture = "x86_64" | "arm64" | "wasm32" | "unknown";

export type CpuSimdFeature =
  | "sse4_2"
  | "avx2"
  | "avx512"
  | "neon"
  | "dotprod"
  | "sve";

export type CpuWorkloadClass =
  | "scalar"
  | "vector"
  | "matrix"
  | "low-bit-ai"
  | "io-bound";

export interface CpuThreadingPolicy {
  readonly maxThreads: number;
  readonly pinThreads: boolean;
  readonly allowBackgroundThreads: boolean;
}

export interface CpuTargetCapability {
  readonly architecture: CpuArchitecture;
  readonly logicalCores: number;
  readonly simd: readonly CpuSimdFeature[];
  readonly memoryBytes?: number;
  readonly supportsNativeBinary: boolean;
  readonly supportsLowBitKernels: boolean;
}

export interface CpuTargetPlan {
  readonly workload: CpuWorkloadClass;
  readonly requiredFeatures: readonly CpuSimdFeature[];
  readonly threading: CpuThreadingPolicy;
  readonly memoryLimitBytes?: number;
  readonly fallbackOf?: string;
}

export interface CpuTargetReport {
  readonly capability: CpuTargetCapability;
  readonly plans: readonly CpuTargetPlan[];
  readonly selectedPlan?: CpuTargetPlan;
  readonly warnings: readonly string[];
}

export function supportsCpuFeatures(
  capability: CpuTargetCapability,
  requiredFeatures: readonly CpuSimdFeature[],
): boolean {
  return requiredFeatures.every((feature) => capability.simd.includes(feature));
}

export function canUseLowBitCpuPath(
  capability: CpuTargetCapability,
): boolean {
  if (!capability.supportsLowBitKernels) {
    return false;
  }

  if (capability.architecture === "x86_64") {
    return capability.simd.includes("avx2");
  }

  if (capability.architecture === "arm64") {
    return capability.simd.includes("neon");
  }

  return false;
}
