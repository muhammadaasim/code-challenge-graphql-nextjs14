export interface IMachine {
  id: string;
  name: string;
  x?: number;
  y?: number;
  state: string | null;
}

export interface IMachineInput {
  name: string;
  x?: number;
  y?: number;
  state: string | null;
}

export interface IMachineUpdateInput {
  name?: string;
  x?: number;
  y?: number;
  state?: string | null;
}
