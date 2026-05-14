# LO Compiler TODO

V1 freeze rule: the compiler package should prioritise the parser, AST,
diagnostics and checker pipeline for the frozen core syntax subset before
adding post-v1 targets or domain package syntax.

```text
[x] Create /packages-lo/lo-core-compiler
[x] Add README.md
[x] Add TODO.md
[x] Add package metadata
[x] Add initial typed exports
[ ] Define compiler input contract
[ ] Define lexer contract
[ ] Define parser contract
[ ] Define AST contract
[ ] Define symbol table contract
[ ] Define checker pipeline contract
[ ] Define IR contract
[ ] Define target handoff contract
[ ] Define diagnostic format
[ ] Define source-map contract
[ ] Define compiler report output
[ ] Parse at least 20 v1 .lo examples
[ ] Reject post-v1 syntax with clear diagnostics
[ ] Add examples
[ ] Add tests
```
