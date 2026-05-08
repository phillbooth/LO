export type ReportSeverity = "info" | "warning" | "error" | "critical";

export interface ReportMetadata {
  readonly name: string;
  readonly version: string;
  readonly generatedAt: string;
}

export interface ReportDiagnostic {
  readonly code: string;
  readonly severity: ReportSeverity;
  readonly message: string;
}

export interface LoReport {
  readonly metadata: ReportMetadata;
  readonly diagnostics: readonly ReportDiagnostic[];
  readonly warnings: readonly string[];
}
