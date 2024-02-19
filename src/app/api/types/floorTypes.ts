import { Types, Document } from 'mongoose';

export type Floor = {
  _id: Types.ObjectId;
  name: string;
  image: string;
  machines: Types.ObjectId[];
};

export type FloorInput = Omit<Floor, '_id'> & {
  machineIds?: Types.ObjectId[];
};

export type FloorDocument = Document &
  Pick<Floor, 'name' | 'image' | 'machines'>;
