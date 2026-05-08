export interface SecureStringReference {
  readonly kind: "SecureString";
  readonly redacted: true;
}

export type SecuritySeverity = "info" | "warning" | "error" | "critical";

export interface SecurityDiagnostic {
  readonly code: string;
  readonly severity: SecuritySeverity;
  readonly safeMessage: string;
  readonly source?: string;
  readonly suggestedFix?: string;
}

export interface PermissionModel {
  readonly read: readonly string[];
  readonly write: readonly string[];
  readonly environment: readonly string[];
  readonly network: readonly string[];
}

export interface RedactionRule {
  readonly name: string;
  readonly pattern: string;
  readonly replacement: "SecureString(redacted)";
}

export interface SecurityReport {
  readonly diagnostics: readonly SecurityDiagnostic[];
  readonly permissions: PermissionModel;
  readonly redactions: readonly RedactionRule[];
}
