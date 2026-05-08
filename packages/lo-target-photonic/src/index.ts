export type PhotonicActualTarget =
  | "photonic_hardware"
  | "photonic_sim"
  | "photonic_plan"
  | "cpu_fallback"
  | "unsupported";

export type PhotonicTargetStatus =
  | "photonic-compatible"
  | "photonic-simulation-only"
  | "fallback-required"
  | "unsupported";

export type PhotonicOperationKind =
  | "matrix-multiply"
  | "vector-transform"
  | "logic-mapping"
  | "signal-routing"
  | "unsupported";

export interface PhotonicTargetCapability {
  readonly name: string;
  readonly kind: "hardware" | "simulator" | "plan-only";
  readonly supportedWavelengthsNm: readonly number[];
  readonly supportsPhaseControl: boolean;
  readonly supportsAmplitudeControl: boolean;
  readonly supportedOperations: readonly PhotonicOperationKind[];
  readonly precisionModel: "digital-reference" | "analogue-estimate" | "vendor-reported";
}

export interface PhotonicTargetInput {
  readonly flow: string;
  readonly requestedTarget: "photonic";
  readonly fallbackTargets: readonly string[];
  readonly operations: readonly PhotonicOperationKind[];
  readonly requiredWavelengthsNm: readonly number[];
  readonly requiresCpuReference: boolean;
  readonly sourcePackageVersions: {
    readonly compiler?: string;
    readonly compute?: string;
    readonly photonic?: string;
    readonly vector?: string;
  };
}

export interface PhotonicLoweringPlan {
  readonly flow: string;
  readonly targetCapability: string;
  readonly status: PhotonicTargetStatus;
  readonly mappedOperations: readonly PhotonicOperationMapping[];
  readonly unsupportedOperations: readonly UnsupportedPhotonicOperation[];
}

export interface PhotonicOperationMapping {
  readonly operation: PhotonicOperationKind;
  readonly sourceOperation: string;
  readonly targetOperation: string;
  readonly channels: readonly OpticalChannelLayout[];
}

export interface UnsupportedPhotonicOperation {
  readonly operation: string;
  readonly reason: string;
  readonly suggestedFallback: string;
}

export interface PhotonicSimulationTarget {
  readonly name: string;
  readonly simulator: string;
  readonly version?: string;
  readonly supportedCapabilities: readonly string[];
}

export interface PhotonicExecutionPlan {
  readonly flow: string;
  readonly requestedTarget: "photonic";
  readonly actualTarget: PhotonicActualTarget;
  readonly status: PhotonicTargetStatus;
  readonly targetCapability: string;
  readonly loweringPlan: PhotonicLoweringPlan;
  readonly outputFiles: readonly string[];
}

export interface PhotonicHardwareMappingFile {
  readonly path: string;
  readonly format: "json" | "vendor-specific" | "plan-only";
  readonly targetCapability: string;
  readonly generatedFor: string;
}

export interface PhotonicFallbackReport {
  readonly flow: string;
  readonly fallbackRequired: boolean;
  readonly fallbackTarget?: string;
  readonly reasons: readonly string[];
}

export interface OpticalChannelLayout {
  readonly channelId: string;
  readonly wavelengthNm: number;
  readonly phaseDegrees?: number;
  readonly amplitude?: number;
}

export interface OpticalChannelLayoutReport {
  readonly flow: string;
  readonly channels: readonly OpticalChannelLayout[];
  readonly warnings: readonly string[];
}

export interface MatrixOperationMappingReport {
  readonly flow: string;
  readonly operation: "matrix-multiply";
  readonly inputShape: readonly number[];
  readonly outputShape: readonly number[];
  readonly channelLayout: readonly OpticalChannelLayout[];
  readonly precisionNotes: readonly string[];
}

export interface PhotonicTargetReport {
  readonly capabilities: readonly PhotonicTargetCapability[];
  readonly executionPlans: readonly PhotonicExecutionPlan[];
  readonly fallbackReports: readonly PhotonicFallbackReport[];
  readonly channelLayoutReports: readonly OpticalChannelLayoutReport[];
  readonly matrixMappingReports: readonly MatrixOperationMappingReport[];
  readonly warnings: readonly string[];
  readonly diagnostics: readonly {
    readonly code: string;
    readonly safeMessage: string;
    readonly suggestedFix?: string;
  }[];
}
