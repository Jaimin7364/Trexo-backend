import { Router, Request, Response } from 'express';
import { isAdmin, verifyToken } from '../middleware/authMiddleware';
import { getAllUsers } from '../controllers/adminController';

const router = Router();

router.get('/users', verifyToken, isAdmin, async (req: Request, res: Response, next) => {
  try {
	await getAllUsers(req, res);
  } catch (err) {
	next(err);
  }
});
export default router;