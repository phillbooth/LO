# LO Compiler

`lo-compiler` is the future compiler package for LO parser, checker, IR,
diagnostics and report generation.

It belongs in:

```text
/packages/lo-compiler
```

Use this package for:

```text
lexer
parser
AST
symbol table
type checker
effect checker
security checker integration
memory checker
IR generation
optimiser
linker
diagnostics
compiler reports
source maps
AI context output
```

## Boundary

`lo-core` owns language documentation, grammar contracts and core safety rules.
`lo-compiler` should own the implementation-oriented compiler pipeline.

Target-specific output belongs in target packages such as `lo-target-binary`,
`lo-target-wasm`, `lo-target-gpu` and `lo-target-photonic`.

Final rule:

```text
lo-core defines the language contract.
lo-compiler implements compiler pipeline contracts.
target packages own target-specific output.
```
