import express from 'express';
import Property from '../models/property';
import Vehicle from '../models/vehicle';

const router = express.Router();

// GET /api/view/property
router.get('/property', async (_req, res) => {
  try {
    const properties = await Property.find().populate('createdBy', 'name email');
    res.status(200).json(properties);
  } catch (err) {
    console.error('Error fetching properties:', err);
    res.status(500).json({ message: 'Failed to fetch properties', error: err });
  }
});

// GET /api/view/vehicle
router.get('/vehicle', async (_req, res) => {
  try {
    const vehicles = await Vehicle.find().populate('createdBy', 'name email');
    res.status(200).json(vehicles);
  } catch (err) {
    console.error('Error fetching vehicles:', err);
    res.status(500).json({ message: 'Failed to fetch vehicles', error: err });
  }
});
// GET /api/view/property/:id
// router.get('/property/:id', async (req: Request, res: Response) => {
//   const { id } = req.params;
//   try {
//     const property = await Property.findById(id).populate('createdBy', 'name email');
//     if (!property) {
//       return res.status(404).json({ message: 'Property not found' });
//     }
//     res.status(200).json(property);
//   } catch (err) {
//     console.error(`Error fetching property with ID ${id}:`, err);
//     res.status(500).json({ message: 'Failed to fetch property', error: err });
//   }
// });  
export default router;
