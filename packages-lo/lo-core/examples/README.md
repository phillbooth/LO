# LO Examples

These examples are source fixtures for the prototype CLI and documentation.

Run from the repository root:

```bash
node compiler/lo.js check examples --exclude source-map-error.lo
node compiler/lo.js build examples --exclude source-map-error.lo --out build/examples
node compiler/lo.js verify build/examples
```

`source-map-error.lo` intentionally contains an invalid compute-block file read
so `LO explain --for-ai` can demonstrate target compatibility diagnostics.

```bash
node compiler/lo.js explain examples/source-map-error.lo --for-ai
```
