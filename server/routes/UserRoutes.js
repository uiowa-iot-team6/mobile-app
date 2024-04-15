import express from 'express';
import dotenv from 'dotenv';
import { UserModel } from '../models/UsersModel.js';
import bcrypt from 'bcrypt';
const router = express.Router();

const SALT_ROUNDS = 10;

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

//update goals
router.put('/update-goals', async (req, res) => {
  const {username, weightGoal, carbsGoal, proteinGoal, fatGoal} = req.body;
  const user = await UserModel.findOne({ username });
  if (!user) {
      return res.status(401).json({ message: 'Invalid user' });
  }
  await UserModel.findOneAndUpdate( { username }, { weightGoal, carbsGoal, proteinGoal, fatGoal });
  return res.status(201).json({user, message: "User updated successfully"})
})

//Update rmr
router.put('/update-rmr', async (req, res) => {
  const {username, rmr} = req.body;
  const user = await UserModel.findOne({username})
  if(!user){
    return res.status(401).json({ message: 'Invalid user' });
  }
  await UserModel.findOneAndUpdate({username},{rmr})
  return res.status(201).json({user, message: "User updated successfully"})
})

//update password
router.put('/update-password', async (req, res) => {
  const {username, password} = req.body
  const user = await UserModel.findOne({username})
  if(!user){
    return res.status(401).json({ message: 'Invalid user' });
  }
  const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);
  await UserModel.findOneAndUpdate({username},{password: hashedPassword})
  return res.status(201).json({user, message: "User updated successfully"})
})

//name
router.put('/update-names', async (req, res) => {
  const {username, firstname, lastname} = req.body
  const user = await UserModel.findOne({username})
  if(!user){
    return res.status(401).json({ message: 'Invalid user' });
  }
  await UserModel.findOneAndUpdate({username},{firstname, lastname})
  return res.status(201).json({user, message: "User updated successfully"})
})

export { router as UserRouter };
