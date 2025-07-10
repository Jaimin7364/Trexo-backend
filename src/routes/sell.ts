import express from 'express';
import { verifyToken } from '../middleware/authMiddleware';
import { createProperty, createVehicle} from '../controllers/sell';


const router = express.Router();

// ✅ Admin-only routes
router.post('/property', verifyToken, createProperty);
router.post('/vehicle', verifyToken, createVehicle);

// (Optional) View all (admin dashboard)
export default router;
