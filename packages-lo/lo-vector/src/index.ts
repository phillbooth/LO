export interface VectorDimension {
  readonly lanes: number;
}

export type NumericElementType =
  | "Float16"
  | "Float32"
  | "Float64"
  | "Int8"
  | "Int16"
  | "Int32"
  | "UInt8"
  | "LowBit"
  | "Quantized";

export interface VectorType {
  readonly elementType: string;
  readonly dimension: VectorDimension;
}

export interface MatrixShape {
  readonly rows: number;
  readonly columns: number;
}

export interface MatrixType {
  readonly elementType: NumericElementType | string;
  readonly shape: MatrixShape;
}

export interface TensorShape {
  readonly dimensions: readonly number[];
}

export interface TensorType {
  readonly elementType: NumericElementType | string;
  readonly shape: TensorShape;
}

export interface QuantizedType {
  readonly sourceElementType: NumericElementType | string;
  readonly bits: number;
  readonly scheme: "symmetric" | "asymmetric" | "ternary" | "low-bit";
}

export interface VectorOperation {
  readonly name: string;
  readonly inputs: readonly VectorType[];
  readonly output: VectorType;
}

export interface TensorOperation {
  readonly name: string;
  readonly inputs: readonly TensorType[];
  readonly output: TensorType;
  readonly pure: boolean;
}

export interface VectorReport {
  readonly operations: readonly VectorOperation[];
  readonly tensorOperations?: readonly TensorOperation[];
  readonly warnings: readonly string[];
}
