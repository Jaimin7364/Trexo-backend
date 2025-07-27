import express from 'express';
import { verifyToken } from '../middleware/authMiddleware';
import { createProperty, createVehicle} from '../controllers/sell';
import upload from '../middleware/upload';


const router = express.Router();

// ✅ Admin-only routes
router.post('/property', verifyToken, createProperty);
// router.post('/vehicle', verifyToken, createVehicle);
router.post('/vehicle', verifyToken, upload.array('images', 5), createVehicle);
// (Optional) View all (admin dashboard)
export default router;
