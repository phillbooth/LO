# LogicN Reports

`logicn-core-reports` is the package for shared LogicN report schemas and report-writing
contracts.

It belongs in:

```text
/packages-logicn/logicn-core-reports
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
storage and build-cache report contracts
task report contracts
processing report contracts
AI guide report contracts
report writer interface
JSON serialization helper
```

## Boundary

`logicn-core-reports` should define shared report shapes and writer contracts. It should
not own package-specific analysis.

```text
compiler analysis -> logicn-core-compiler
security checks   -> logicn-core-security / logicn-core-compiler
runtime events    -> logicn-core-runtime
task execution    -> logicn-core-tasks
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
StorageReport
BuildCacheReport
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
`logicn-core-reports` only owns the shared shape.

Storage and build-cache reports are for conservative performance planning. They
record optional storage facts, unknown-storage fallback, recommended bounded
cache mode, cache hits, misses, bypasses, evictions and invalidations. Cache
reports must make clear that cached data is not required for correctness and
that secrets or sensitive payloads are denied by default.

Final rule:

```text
logicn-core-reports owns shared report shapes.
Owning packages produce their own facts and diagnostics.
Report output must stay deterministic and safe to inspect.
```
