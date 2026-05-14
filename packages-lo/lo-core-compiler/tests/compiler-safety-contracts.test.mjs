import assert from "node:assert/strict";
import { describe, it } from "node:test";

import { validateCoreSyntaxSafety } from "../dist/index.js";

describe("lo-core-compiler syntax safety contracts", () => {
  it("rejects Tri values used directly as branch conditions", () => {
    const result = validateCoreSyntaxSafety({
      file: "branch.lo",
      text: `
pure flow check(signal: Tri) -> Bool {
  if signal {
    return true
  }
  return false
}
`,
    });

    assert.equal(result.ok, false);
    assert.equal(
      result.diagnostics.some(
        (diagnostic) =>
          diagnostic.code === "LO_COMPILER_TRI_BRANCH_CONDITION",
      ),
      true,
    );
  });

  it("rejects implicit Tri, Decision and Bool boundary assignments", () => {
    const result = validateCoreSyntaxSafety({
      file: "assignment.lo",
      text: `
secure flow decide(signal: Tri, decision: Decision) -> Decision {
  let allowed: Bool = signal
  let direct: Decision = signal
  let state: Tri = decision
  return Review
}
`,
    });

    assert.equal(result.ok, false);
    assert.equal(
      result.diagnostics.filter(
        (diagnostic) =>
          diagnostic.code === "LO_COMPILER_UNSAFE_LOGIC_ASSIGNMENT",
      ).length,
      3,
    );
  });

  it("rejects non-exhaustive Tri matches", () => {
    const result = validateCoreSyntaxSafety({
      file: "match.lo",
      text: `
pure flow signalAllowed(signal: Tri) -> Bool {
  match signal {
    Positive => return true
    Negative => return false
  }
}
`,
    });

    assert.equal(result.ok, false);
    assert.equal(
      result.diagnostics.some(
        (diagnostic) =>
          diagnostic.code === "LO_COMPILER_TRI_MATCH_NOT_EXHAUSTIVE" &&
          diagnostic.message.includes("Neutral"),
      ),
      true,
    );
  });

  it("treats unknown_as true as an error in secure flows", () => {
    const result = validateCoreSyntaxSafety({
      file: "secure-policy.lo",
      text: `
secure flow canAccess(signal: Tri) -> Bool {
  return tri.toBool(signal, unknown_as: true)
}
`,
    });

    assert.equal(result.ok, false);
    assert.equal(
      result.diagnostics.find(
        (diagnostic) =>
          diagnostic.code === "LO_COMPILER_TRI_UNKNOWN_AS_TRUE",
      )?.severity,
      "error",
    );
  });

  it("blocks secret literals and unsafe dynamic execution", () => {
    const result = validateCoreSyntaxSafety({
      file: "secrets.lo",
      text: `
flow load() -> Bool {
  let api_key = "live-secret"
  eval("danger")
  return true
}
`,
    });

    assert.equal(result.ok, false);
    assert.equal(
      result.diagnostics.some(
        (diagnostic) => diagnostic.code === "LO_COMPILER_SECRET_LITERAL",
      ),
      true,
    );
    assert.equal(
      result.diagnostics.some(
        (diagnostic) =>
          diagnostic.code === "LO_COMPILER_UNSAFE_DYNAMIC_CODE",
      ),
      true,
    );
  });

  it("accepts explicit exhaustive Tri handling", () => {
    const result = validateCoreSyntaxSafety({
      file: "safe.lo",
      text: `
secure flow riskToDecision(signal: Tri) -> Decision {
  match signal {
    Positive => Deny
    Neutral => Review
    Negative => Allow
  }
}
`,
    });

    assert.equal(result.ok, true);
    assert.equal(result.diagnostics.length, 0);
  });
});
