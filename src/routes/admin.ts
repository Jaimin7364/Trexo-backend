import express from 'express';
import { verifyToken, isAdmin } from '../middleware/authMiddleware';
import { createProperty, createVehicle, getAllProperties, getAllVehicles } from '../controllers/adminController';


const router = express.Router();

// ✅ Admin-only routes
router.post('/property', createProperty);
router.post('/vehicle', createVehicle);

// (Optional) View all (admin dashboard)


export default router;
