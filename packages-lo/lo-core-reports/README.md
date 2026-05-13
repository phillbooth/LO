# LO Reports

`lo-core-reports` is the package for shared LO report schemas and report-writing
contracts.

It belongs in:

```text
/packages-lo/lo-core-reports
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
async/concurrency report contracts
task report contracts
processing report contracts
AI guide report contracts
report writer interface
JSON serialization helper
```

## Boundary

`lo-core-reports` should define shared report shapes and writer contracts. It should
not own package-specific analysis.

```text
compiler analysis -> lo-core-compiler
security checks   -> lo-core-security / lo-core-compiler
runtime events    -> lo-core-runtime
task execution    -> lo-core-tasks
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
AsyncReport
AwaitSiteReport
AwaitGroupReport
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

Async reports are for Structured Await analysis. They record await points,
await groups, race blocks, stream blocks, queue awaits, missing timeout counts,
unscoped task counts, background task counts, structured-concurrency status and
source locations. Compiler, runtime and kernel packages produce the facts;
`lo-core-reports` only owns the shared shape.

Final rule:

```text
lo-core-reports owns shared report shapes.
Owning packages produce their own facts and diagnostics.
Report output must stay deterministic and safe to inspect.
```
