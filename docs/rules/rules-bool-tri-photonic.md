# Rules: Bool, Tri And Photonic Logic

## Purpose

Keep ordinary branching, multi-state logic and future physical logic planning
separate.

## Rules

- `Bool` is for ordinary true/false branch conditions.
- `Tri` represents `True`, `False` and `Unknown`.
- `Decision` represents policy states such as allow, deny and review.
- `Tri` must not silently become `Bool`.
- Photonic planning must not change source meaning.
- Future hardware targets must preserve fallback and report behavior.

## Security Rules

Security decisions should not collapse unknown states into allow. Unknown must
be handled explicitly.

## v1 Scope

Bool-only conditions, explicit `Tri` and `Decision` matching, and target
planning reports for future logic targets.
