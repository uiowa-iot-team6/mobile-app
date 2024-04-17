import express from 'express';
import {FoodRecordModel} from '../models/food.js';
import { UserModel } from '../models/UsersModel.js';
const router = express.Router();

router.post('/create-manually', async (req, res) => {
    const {username, fdcId, description, servingSize, servingSizeUnit, servingsConsumed, foodNutrients} = req.body;
    const user = await UserModel.findOne({username});
    if (!user) {
        return res.status(401).json({message: 'Invalid user'});
    }
    const food = new FoodRecordModel({
        fdcId,
        description,
        servingSize,
        servingSizeUnit,
        servingsConsumed,
        foodNutrients,
        associatedUser: user._id,
    })
    await food.save();
    res.status(201).json({food});
});

router.get('/get-by-username', async (req, res) => {
    const {username} = req.query;
    console.log("Hello")
    const user = await UserModel.findOne({username});
    if (!user) {
        return res.status(401).json({message: 'Invalid user'});
    }
    //find food by associated user id
    const food = await FoodRecordModel.find({associatedUser: user._id});
    return res.status(201).json({food})
});

router.get('/get-by-username-and-description', async (req, res) => {
    const {username, description} = req.query;
    const user = await UserModel.findOne({username})
    if (!user) {
        return res.status(401).json({message: 'Invalid user'});
    }
    //find food by associated user id and description
    const food = await FoodRecordModel.find({associatedUser: user._id, description});
})

export {router as foodRouter}
