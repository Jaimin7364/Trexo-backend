import mongoose, { Schema, Document } from 'mongoose';

export interface IVehicle {
  name: string;
  model: string;
  price: number;
  description: string;
  tags: string[];
  imageUrls: string[]; // ✅ Multiple images
  extraInfo?: Record<string, any>;
  createdBy: mongoose.Types.ObjectId;
}

const vehicleSchema = new Schema<IVehicle>(
  {
    name: { type: String, required: true },
    model: { type: String, required: true },
    price: { type: Number, required: true },
    description: { type: String, required: true },
    tags: [{ type: String }],
    imageUrls: {
      type: [String],
      validate: [arrayLimit, '{PATH} exceeds the limit of 5'],
      required: true,
    },
    extraInfo: {
      type: Schema.Types.Mixed,
      default: {},
    },
    createdBy: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
  },
  { timestamps: true }
);

function arrayLimit(val: string[]) {
  return val.length <= 5;
}

export default mongoose.model<IVehicle>('Vehicle', vehicleSchema);
