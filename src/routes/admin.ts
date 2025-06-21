import express from 'express';
import { verifyToken, isAdmin } from '../middleware/authMiddleware';
import { createProperty, createVehicle, getAllProperties, getAllVehicles } from '../controllers/adminController';


const router = express.Router();

// ✅ Admin-only routes
router.post('/property', verifyToken, isAdmin, createProperty);
router.post('/vehicle', verifyToken, isAdmin, createVehicle);

// (Optional) View all (admin dashboard)

router.get('/properties', getAllProperties,verifyToken,isAdmin);
router.get('/vehicles', getAllVehicles,verifyToken,isAdmin);
export default router;
