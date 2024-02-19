import { IMachine } from './Machine';

export interface IFloor {
  id: string;
  name?: string;
  image: string;
  machines: IMachine;
}

export interface IFloorInput {
  name?: string;
  image: string;
  machineIds: string[];
}
