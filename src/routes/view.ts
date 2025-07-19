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

// Add this inside your existing router file

// GET /api/view/vehicle/:id

router.get('/vehicle/:id', async (_req, res) => {
  const { id } = _req.params;
  try {
    const vehicle = await Vehicle.findById(id).populate('createdBy', 'name email');
    res.status(200).json(vehicle);
  } catch (err) {
    console.error(`Error fetching vehicle by ID (${id}):`, err);
    res.status(500).json({ message: 'Failed to fetch vehicle details', error: err });
  }
});


// router.get('/vehicle/:id', async (req: Request, res: Response) => {
//   const { id } = req.params;

//   try {
//     const vehicle = await Vehicle.findById(id).populate('createdBy', 'name email');

//     if (!vehicle) {
//       return res.status(404).json({ message: 'Vehicle not found' });
//     }

//     res.status(200).json(vehicle);
//   } catch (err) {
//     console.error(`Error fetching vehicle by ID (${id}):`, err);
//     res.status(500).json({ message: 'Failed to fetch vehicle details', error: err });
//   }
// });

// GET /api/view/search/vehicle
router.get('/search/vehicle', async (req, res) => {
  const { q } = req.query;
  
  if (!q || typeof q !== 'string') {
    return res.status(400).json({ message: 'Search query is required' });
  }

  try {
    const searchRegex = new RegExp(q, 'i'); // Case-insensitive search
    
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

// GET /api/view/search/property
router.get('/search/property', async (req, res) => {
  const { q } = req.query;
  
  if (!q || typeof q !== 'string') {
    return res.status(400).json({ message: 'Search query is required' });
  }

  try {
    const searchRegex = new RegExp(q, 'i'); // Case-insensitive search
    
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
