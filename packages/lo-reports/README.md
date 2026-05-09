# LO Reports

`lo-reports` is the package for shared LO report schemas and report-writing
contracts.

It belongs in:

```text
/packages/lo-reports
```

Use this package for:

```text
report metadata
report severity
diagnostic summary contracts
build report contracts
security report contracts
target report contracts
runtime report contracts
task report contracts
processing report contracts
AI guide report contracts
report writer interface
JSON serialization helper
```

## Boundary

`lo-reports` should define shared report shapes and writer contracts. It should
not own package-specific analysis.

```text
compiler analysis -> lo-compiler
security checks   -> lo-security / lo-compiler
runtime events    -> lo-runtime
task execution    -> lo-tasks
target analysis   -> target packages
```

## Contracts

The package defines:

```text
ReportMetadata
ReportGenerator
ReportDiagnostic
DiagnosticSummary
BuildReport
SecurityReport
TargetReport
RuntimeReport
TaskReport
ProcessingReport
BatchResultReport
AiGuideReport
CustomReport
ReportWriter
```

Use these contracts to keep package-specific reports consistent while leaving
the actual analysis in the owning package.

Processing reports are for resilient/batch flows that can continue after
item-level failures. They record totals, successes, failures, retries,
quarantined items, checkpoints and failure-type summaries. They must not be used
to hide system/runtime integrity failures.

Final rule:

```text
lo-reports owns shared report shapes.
Owning packages produce their own facts and diagnostics.
Report output must stay deterministic and safe to inspect.
```
