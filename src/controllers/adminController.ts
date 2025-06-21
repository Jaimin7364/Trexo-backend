// controllers/adminController.ts
import { Response } from 'express';
import Property from '../models/property';
import Vehicle from '../models/vehicle';
import { AuthenticatedRequest } from '../middleware/authMiddleware';

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
    const newVehicle = new Vehicle({ ...req.body, createdBy: req.user?._id });
    const saved = await newVehicle.save();
    res.status(201).json(saved);
  } catch (err) {
    res.status(500).json({ message: 'Error creating vehicle', error: err });
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
