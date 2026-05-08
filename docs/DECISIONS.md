# Decisions

This file records important project decisions.

## Decision Template

### Decision Title

**Date:** YYYY-MM-DD

**Status:** Proposed / Accepted / Rejected / Replaced

**Context:**

Describe the situation.

**Decision:**

Describe the decision.

**Reason:**

Explain why this decision was made.

**Consequences:**

Describe the impact of the decision.

---

## Decisions

### Keep BitNet as an Optional CPU AI Backend

**Date:** 2026-05-08

**Status:** Accepted

**Context:**

Microsoft BitNet provides optimized 1-bit/1.58-bit LLM inference, with
CPU-focused support that is useful when GPU, NPU or other accelerators are not
available. BitNet b1.58 uses ternary weights, which resembles LO `Tri` values
but does not have the same language-level meaning.

**Decision:**

LO will model BitNet as an optional AI inference backend through `lo-bitnet`,
not as part of `lo-core` or `lo-logic`. Generic AI inference contracts belong
in `lo-ai`. CPU fallback planning belongs in `lo-target-cpu`, and optimized CPU
kernel contracts belong in `lo-cpu-kernels`.

**Reason:**

This keeps LO CPU/binary compatible by default while allowing a faster local AI
path for compatible low-bit models. It also preserves clean boundaries:
language semantics stay in `lo-core` and `lo-logic`, while AI inference and CPU
kernel concerns live in dedicated packages.

**Consequences:**

Compute policies may select `cpu.bitnet` as an AI inference fallback and must
report why it was selected. AI output remains untrusted by default and cannot
directly authorize high-impact actions.
