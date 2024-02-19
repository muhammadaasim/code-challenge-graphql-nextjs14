import { Types, Document, ObjectId } from 'mongoose';

export type Machine = {
  _id: Types.ObjectId | ObjectId;
  name: string;
  state?: string | null;
  x?: number;
  y?: number;
  floors: Types.ObjectId[];
};

export type MachineInput = Omit<Machine, '_id' | 'floors'>;

export type MachineDocument = Document &
  Pick<Machine, 'name' | 'state' | 'x' | 'y'>;
