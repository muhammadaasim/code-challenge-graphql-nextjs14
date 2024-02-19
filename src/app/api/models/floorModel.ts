import mongoose, { Schema, model, Model } from 'mongoose';
import { FloorDocument } from '@/app/api/types';

const floorSchema = new Schema<FloorDocument>({
  name: { type: String, required: false, default: '' },
  image: { type: String, required: true },
  machines: [{ type: Schema.Types.ObjectId, ref: 'Machine' }],
});

const floorModel: Model<FloorDocument> =
  mongoose.models.Floor || model<FloorDocument>('Floor', floorSchema);

export default floorModel;
