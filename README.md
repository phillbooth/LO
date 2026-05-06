# LO App Template

This repository is a starter template for building a bespoke application using LO.

The project is split into three main areas:

- `packages/lo-core/` - the LO language package, compiler rules, syntax notes and examples.
- `packages/lo-app-kernel/` - the optional secure runtime foundation for typed APIs, validation, auth, workload controls, jobs and reports.
- `packages/app/` - the bespoke application built with LO.
- `docs/` - app-specific planning, requirements, architecture and deployment notes.

## Project Structure

```text
LO-app/
|-- docs/
|-- packages/
|   |-- lo-core/
|   |-- lo-app-kernel/
|   `-- app/
`-- tools/
```

## Layering

```text
LO Core
  language, compiler, type system, effects, memory safety, compute planning

LO Standard Library
  Json, Xml, SafeHtml, File, Stream, Request, Response, DateTime, Money, SecureString

LO Secure App Kernel
  optional runtime layer for APIs, routing, validation, auth, rate limits, jobs and reports

Full Frameworks
  CMS, admin UI, UI systems, templates, ORM, page builders and frontend adapters
```
