// controllers/adminController.ts
import { Response } from 'express';
import Property from '../models/property';
import Vehicle, { IVehicle } from '../models/vehicle';
import { AuthenticatedRequest } from '../middleware/authMiddleware';
import { Document, Types } from 'mongoose';

export const createProperty = async (req: AuthenticatedRequest, res: Response) => {
  try {
    const newProperty = new Property({ ...req.body, createdBy: req.user?._id });
    const saved = await newProperty.save();
    res.status(201).json(saved);
  } catch (err) {
    res.status(500).json({ message: 'Error creating property', error: err });
  }
};

export const createVehicle = async (req: AuthenticatedRequest, res: Response) => {
  try {
    // Type assertion: tell TS these are multer-s3 uploaded files
    const files = req.files as Express.MulterS3.File[];

    const imageUrls = files.map(file => file.location);

    const vehicle = await Vehicle.create({
      ...req.body,
      images: imageUrls,
    });

    res.status(201).json(vehicle);
  } catch (error) {
    res.status(500).json({ message: 'Error creating vehicle', error });
  }
};



export const getAllProperties = async (req: AuthenticatedRequest, res: Response) => {
  try {
    const properties = await Property.find().populate('createdBy', 'name email');
    res.status(200).json(properties);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching properties', error: err });
  }
};

export const getAllVehicles = async (req: AuthenticatedRequest, res: Response) => {
  try {
    const vehicles = await Vehicle.find().populate('createdBy', 'name email');
    res.status(200).json(vehicles);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching vehicles', error: err });
  }
};
