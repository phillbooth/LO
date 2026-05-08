export type CpuKernelOperation =
  | "gemm"
  | "gemv"
  | "dot"
  | "matmul"
  | "ternary_matmul"
  | "embedding_lookup"
  | "low_bit_decode";

export type CpuKernelDataType =
  | "f32"
  | "f16"
  | "bf16"
  | "i8"
  | "i2_s"
  | "ternary";

export type CpuKernelFeature =
  | "threaded"
  | "tiled"
  | "cache-aware"
  | "simd"
  | "lookup-table"
  | "embedding-quantized";

export interface CpuKernelTilePlan {
  readonly rows: number;
  readonly columns: number;
  readonly depth: number;
}

export interface CpuKernelPlan {
  readonly name: string;
  readonly operation: CpuKernelOperation;
  readonly inputType: CpuKernelDataType;
  readonly outputType: CpuKernelDataType;
  readonly requiredFeatures: readonly CpuKernelFeature[];
  readonly tile?: CpuKernelTilePlan;
  readonly threads: number;
}

export interface CpuKernelBenchmark {
  readonly planName: string;
  readonly tokensPerSecond?: number;
  readonly operationsPerSecond?: number;
  readonly memoryBytesPerSecond?: number;
  readonly energyJoules?: number;
}

export interface CpuKernelReport {
  readonly plans: readonly CpuKernelPlan[];
  readonly benchmarks: readonly CpuKernelBenchmark[];
  readonly warnings: readonly string[];
}

export function requiresLowBitKernel(plan: CpuKernelPlan): boolean {
  return (
    plan.inputType === "i2_s" ||
    plan.inputType === "ternary" ||
    plan.operation === "ternary_matmul" ||
    plan.operation === "low_bit_decode"
  );
}
