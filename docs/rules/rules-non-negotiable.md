# Rules: Non-Negotiable

These rules define behavior LogicN must not silently weaken.

## Rules

- Only `Bool` controls ordinary conditions.
- `Tri` and `Decision` require explicit handling.
- Missing values use `Option<T>` or another explicit typed form.
- Recoverable errors use `Result<T, E>` or an equivalent typed result form.
- Public routes must not return raw internal models.
- Secrets redact by default.
- Effects must be declared.
- Package authority must be explicit.
- Native interop must be explicit, permissioned and reportable.
- Runtime mutation and monkey patching are forbidden in normal code.
- Target fallback must be declared and reported.
- Generated AI content starts untrusted.

## v1 Scope

These rules should be reflected in examples, diagnostics, reports and framework
docs before the framework surface expands.
