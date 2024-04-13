import express from 'express';
import dotenv from 'dotenv';
import { UserModel } from '../models/UsersModel.js';
import bcrypt from 'bcrypt';
const router = express.Router();

// Get all users api
router.get('/get-all', async (req, res) => {
  const users = await UserModel.find({});
  return res.status(200).json({ users });
});
// Get user by username api
router.get('/get-by-username', async (req, res) => {
  const { username } = req.query;
  const user = await UserModel.findOne({ username });
  if (!user) {
    return res.status(401).json({ message: 'Invalid user' });
  }
  return res.status(200).json({ user });
});


export { router as UserRouter };
