export type EnvironmentMode = "development" | "test" | "staging" | "production";

export interface ProjectConfig {
  readonly name: string;
  readonly version: string;
  readonly root: string;
  readonly entryFiles: readonly string[];
}

export interface EnvironmentConfig {
  readonly mode: EnvironmentMode;
  readonly variables: readonly string[];
  readonly secrets: readonly string[];
}

export interface ConfigDiagnostic {
  readonly code: string;
  readonly message: string;
  readonly severity: "warning" | "error";
}

export interface ConfigLoadResult {
  readonly project?: ProjectConfig;
  readonly environment?: EnvironmentConfig;
  readonly diagnostics: readonly ConfigDiagnostic[];
}
