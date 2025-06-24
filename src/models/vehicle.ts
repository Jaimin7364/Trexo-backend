import mongoose, { Schema, Document } from 'mongoose';

export interface IVehicle {
  name: string;
  model: string;
  price: number;
  description: string;
  imageUrls: string[];
  tags: string[];
  location: string; // 🌍 Added
  fuelType?: string;
  transmission?: string;
  registrationYear?: number;
  kmDriven?: number;
  owner?: string;
  rto?: string;
  color?: string;
  mileage?: string;
  seatingCapacity?: number;
  bodyType?: string;
  airbags?: number;
  abs?: boolean;
  infotainmentSystem?: boolean;
  ac?: string;
  rearParkingCamera?: boolean;
  sunroof?: boolean;
  alloyWheels?: boolean;
  batteryHealth?: string;
  tireCondition?: string;
  brakeCondition?: string;
  engineCondition?: string;
  steering?: string;
  suspension?: string;
  insurance?: boolean; // newly added
  createdBy: mongoose.Types.ObjectId;
}

const vehicleSchema = new Schema<IVehicle>(
  {
    name: { type: String, required: true },
    model: { type: String, required: true },
    price: { type: Number, required: true },
    description: { type: String, required: true },
    imageUrls: {
      type: [String],
      required: true,
      validate: [(val: string[]) => val.length <= 5, '{PATH} exceeds limit of 5'],
    },
    tags: [{ type: String }],

    location: { type: String, required: true }, // ✅ New field

    fuelType: { type: String },
    transmission: { type: String },
    registrationYear: { type: Number },
    kmDriven: { type: Number },
    owner: { type: String },
    rto: { type: String },
    color: { type: String },
    mileage: { type: String },
    seatingCapacity: { type: Number },
    bodyType: { type: String },
    airbags: { type: Number },
    abs: { type: Boolean },
    infotainmentSystem: { type: Boolean },
    ac: { type: String },
    rearParkingCamera: { type: Boolean },
    sunroof: { type: Boolean },
    alloyWheels: { type: Boolean },
    batteryHealth: { type: String },
    tireCondition: { type: String },
    brakeCondition: { type: String },
    engineCondition: { type: String },
    steering: { type: String },
    suspension: { type: String },

    insurance: { type: Boolean, default: false },

    createdBy: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
  },
  { timestamps: true }
);

export default mongoose.model<IVehicle>('Vehicle', vehicleSchema);
