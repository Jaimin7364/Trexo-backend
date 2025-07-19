import express, { Request, Response } from 'express';
import Property from '../models/property';
import Vehicle from '../models/vehicle';

const router = express.Router();

// GET /api/search/vehicle
router.get('/vehicle', async (req: Request, res: Response) => {
  const { q } = req.query;
  
  if (!q || typeof q !== 'string') {
    return res.status(400).json({ message: 'Search query is required' });
  }

  try {
    const searchRegex = new RegExp(q, 'i');
    
    const vehicles = await Vehicle.find({
      $or: [
        { name: { $regex: searchRegex } },
        { model: { $regex: searchRegex } },
        { fuelType: { $regex: searchRegex } },
        { transmission: { $regex: searchRegex } },
        { location: { $regex: searchRegex } },
        { rto: { $regex: searchRegex } }
      ]
    }).populate('createdBy', 'name email').limit(20);

    res.status(200).json(vehicles);
  } catch (err) {
    console.error('Error searching vehicles:', err);
    res.status(500).json({ message: 'Failed to search vehicles', error: err });
  }
});

// GET /api/search/property
router.get('/property', async (req: Request, res: Response) => {
  const { q } = req.query;
  
  if (!q || typeof q !== 'string') {
    return res.status(400).json({ message: 'Search query is required' });
  }

  try {
    const searchRegex = new RegExp(q, 'i');
    
    const properties = await Property.find({
      $or: [
        { title: { $regex: searchRegex } },
        { location: { $regex: searchRegex } },
        { description: { $regex: searchRegex } },
        { tags: { $in: [searchRegex] } }
      ]
    }).populate('createdBy', 'name email').limit(20);

    res.status(200).json(properties);
  } catch (err) {
    console.error('Error searching properties:', err);
    res.status(500).json({ message: 'Failed to search properties', error: err });
  }
});

export default router;
