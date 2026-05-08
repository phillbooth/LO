export interface CompilerInput {
  readonly projectRoot: string;
  readonly entryFiles: readonly string[];
}

export interface SourceLocation {
  readonly file: string;
  readonly line: number;
  readonly column: number;
}

export interface CompilerDiagnostic {
  readonly code: string;
  readonly message: string;
  readonly location?: SourceLocation;
  readonly severity: "info" | "warning" | "error";
}

export interface CompilerResult {
  readonly ok: boolean;
  readonly diagnostics: readonly CompilerDiagnostic[];
  readonly reports: readonly string[];
}
