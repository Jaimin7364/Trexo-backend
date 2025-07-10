import express from 'express';
import { Request, Response } from 'express';
import User from '../models/User';

const router = express.Router();

export const getAllUsers = async (req: Request, res: Response) => {
  try {
    const users = await User.find({}, '_id name email');

    return res.status(200).json(users);
  } catch (err) {
    return res.status(500).json({ error: 'Server error', details: err });
  }
};

export default router;
