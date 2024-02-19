import mongoose, { Model, Schema } from 'mongoose';
import { MachineDocument } from '@/app/api/types';

const machineSchema = new Schema<MachineDocument>({
  name: { type: String, required: true },
  state: { type: String, required: false },
  x: { type: Number, required: false, default: 0 },
  y: { type: Number, required: false, default: 0 },
});

export const machineModel: Model<MachineDocument> =
  mongoose.models.Machine ||
  mongoose.model<MachineDocument>('Machine', machineSchema);

export default machineModel;
