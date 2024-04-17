import mongoose, { Schema } from "mongoose";

export const FoodNutrientSchema = new Schema({
    nutrientName: String,
    value: Number,
    unitName: String,
    nutrientNumber: String,
    nutrientId: Number,
});

export const FoodRecordSchema = new Schema({
    fdcId: String,
    description: String,
    servingSize: String,
    servingSizeUnit: String,
    servingsConsumed: Number,
    foodNutrients: [FoodNutrientSchema],
    associatedUser:  { type: Schema.Types.ObjectId, ref: 'users' },
    date: { type: Date, default: Date.now }
});

export const FoodRecordModel = mongoose.model("foodrecords", FoodRecordSchema);
