export type Tri = -1 | 0 | 1;

export interface LogicState<N extends number> {
  readonly width: N;
  readonly state: number;
}

export interface LogicDefinition<N extends number> {
  readonly name: string;
  readonly width: N;
  readonly states: readonly string[];
}

export interface TruthTableRow<N extends number> {
  readonly inputs: readonly LogicState<N>[];
  readonly output: LogicState<N>;
}

export interface LogicReport<N extends number> {
  readonly logic: LogicDefinition<N>;
  readonly truthTable: readonly TruthTableRow<N>[];
  readonly warnings: readonly string[];
}
