import assert from "node:assert/strict";
import { describe, it } from "node:test";

import {
  createSafeCookieReference,
  createSafeHeaderReference,
  createSafeTokenReference,
  createSecureStringReference,
  createSecurityDiagnostic,
  createSecurityReport,
  decidePermission,
  definePermissionModel,
  redactText,
  validateCryptographicPolicy,
  validatePermissionModel,
  validateRedactionRule,
} from "../dist/index.js";

describe("logicn-core-security contracts", () => {
  it("creates SecureString references without exposing values", () => {
    const secret = createSecureStringReference("LogicN_APP_SECRET", {
      classification: "credential",
      fingerprint: "sha256:example",
    });

    assert.equal(secret.kind, "SecureString");
    assert.equal(secret.redacted, true);
    assert.equal(Object.hasOwn(secret, "value"), false);
  });

  it("redacts bearer tokens and credential assignments", () => {
    const result = redactText(
      "Authorization: Bearer abc.def.ghi api_key=super-secret",
    );

    assert.equal(result.redacted, true);
    assert.match(result.text, /Bearer SecureString\(redacted\)/);
    assert.match(result.text, /api_key=SecureString\(redacted\)/);
    assert.doesNotMatch(result.text, /super-secret/);
  });

  it("denies permissions by default and allows explicit grants", () => {
    const model = definePermissionModel([
      {
        action: "read",
        resource: "config:public",
        effect: "allow",
        reason: "Public config is safe to read.",
      },
    ]);

    assert.equal(
      decidePermission(model, "read", "config:public").allowed,
      true,
    );
    assert.equal(decidePermission(model, "write", "config:public").allowed, false);
  });

  it("gives deny grants precedence over broad allows", () => {
    const model = definePermissionModel([
      {
        action: "network",
        resource: "*",
        effect: "allow",
      },
      {
        action: "network",
        resource: "https://metadata.internal",
        effect: "deny",
        reason: "Metadata endpoints must not be reachable by default.",
      },
    ]);
    const diagnostics = validatePermissionModel(model);

    assert.equal(
      decidePermission(model, "network", "https://metadata.internal").allowed,
      false,
    );
    assert.equal(
      diagnostics.some(
        (diagnostic) =>
          diagnostic.code === "LogicN_SECURITY_PERMISSION_WILDCARD_ALLOW",
      ),
      true,
    );
  });

  it("reports default-allow permission models as critical", () => {
    const diagnostics = validatePermissionModel(
      definePermissionModel([], "allow"),
    );

    assert.equal(diagnostics[0]?.severity, "critical");
    assert.equal(
      diagnostics[0]?.code,
      "LogicN_SECURITY_PERMISSION_DEFAULT_ALLOW",
    );
  });

  it("models tokens, cookies and sensitive headers as redacted references", () => {
    const token = createSafeTokenReference("SESSION_TOKEN", ["api"]);
    const cookie = createSafeCookieReference("LogicN_session", {
      sameSite: "strict",
    });
    const header = createSafeHeaderReference("Authorization", "Bearer secret");

    assert.equal(token.value.redacted, true);
    assert.equal(cookie.httpOnly, true);
    assert.equal(cookie.sameSite, "strict");
    assert.equal(typeof header.value, "object");
  });

  it("validates cryptographic policies and security reports", () => {
    const diagnostics = validateCryptographicPolicy({
      allowedAlgorithms: ["aes-256-gcm"],
      deniedAlgorithms: ["md5"],
      requireAuthenticatedEncryption: false,
      requirePasswordHashingMemoryCost: true,
      minimumKeyBits: 64,
    });
    const report = createSecurityReport({
      diagnostics: [
        ...diagnostics,
        createSecurityDiagnostic(
          "LogicN_SECURITY_SECRET_REDACTED",
          "info",
          "Secret value was redacted.",
        ),
      ],
      redactedSecrets: 1,
      blockedOperations: ["secret.print"],
      generatedAt: "2026-05-08T00:00:00.000Z",
    });

    assert.equal(diagnostics[0]?.code, "LogicN_SECURITY_CRYPTO_KEY_TOO_SMALL");
    assert.equal(report.status, "error");
    assert.equal(report.redactedSecrets, 1);
    assert.equal(report.warnings.length, 1);
  });

  it("fails closed when a redaction rule is malformed", () => {
    const result = redactText("token=secret", [
      {
        name: "bad-rule",
        pattern: "[",
        replacement: "SecureString(redacted)",
        classification: "token",
      },
    ]);

    assert.equal(result.redacted, true);
    assert.equal(result.text, "SecureString(redacted-redaction-rule-error)");
    assert.equal(result.diagnostics?.[0]?.severity, "error");
  });

  it("rejects redaction replacements that can re-emit sensitive context", () => {
    const diagnostics = validateRedactionRule({
      name: "leaky-rule",
      pattern: "token=[^\\s]+",
      replacement: "$&",
      classification: "token",
    });

    assert.equal(
      diagnostics.some(
        (diagnostic) =>
          diagnostic.code ===
          "LogicN_SECURITY_REDACTION_REPLACEMENT_CAN_LEAK_CONTEXT",
      ),
      true,
    );
  });
});
