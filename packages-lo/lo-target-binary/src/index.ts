export interface BinaryTarget {
  readonly triple: string;
  readonly os: string;
  readonly architecture: string;
  readonly abi?: string;
}

export interface BinaryArtefact {
  readonly path: string;
  readonly target: BinaryTarget;
  readonly format: "executable" | "library" | "object";
}

export interface BinaryTargetReport {
  readonly artefacts: readonly BinaryArtefact[];
  readonly warnings: readonly string[];
}
