export interface Wavelength {
  readonly nanometers: number;
}

export interface Phase {
  readonly degrees: number;
}

export interface Amplitude {
  readonly value: number;
}

export interface OpticalSignal {
  readonly wavelength: Wavelength;
  readonly phase: Phase;
  readonly amplitude: Amplitude;
}

export interface OpticalChannel {
  readonly name: string;
  readonly signal: OpticalSignal;
}

export interface PhotonicMapping {
  readonly logicPackage: "@lo/core-logic";
  readonly logicName: string;
  readonly states: readonly {
    readonly state: string;
    readonly signal: OpticalSignal;
  }[];
}
