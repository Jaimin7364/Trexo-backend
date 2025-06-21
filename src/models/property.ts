import mongoose, { Schema, Document } from 'mongoose';

export interface IProperty extends Document {
  title: string;
  description: string;
  price: number;
  location: string;
  tags: string[];
  imageUrls: string[]; // ✅ Array for multiple images
  extraInfo?: Record<string, any>;
  createdBy: mongoose.Types.ObjectId;
}

const propertySchema = new Schema<IProperty>(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    location: { type: String, required: true },
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

// ✅ Custom validator to limit images to 5
function arrayLimit(val: string[]) {
  return val.length <= 5;
}

export default mongoose.model<IProperty>('Property', propertySchema);
