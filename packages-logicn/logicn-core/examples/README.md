# LogicN Examples

These examples are source fixtures for the prototype CLI and documentation.

Run from the repository root:

```bash
node compiler/logicn.js check examples --exclude source-map-error.lln
node compiler/logicn.js build examples --exclude source-map-error.lln --out build/examples
node compiler/logicn.js verify build/examples
```

`source-map-error.lln` intentionally contains an invalid compute-block file read
so `LogicN explain --for-ai` can demonstrate target compatibility diagnostics.

```bash
node compiler/logicn.js explain examples/source-map-error.lln --for-ai
```
