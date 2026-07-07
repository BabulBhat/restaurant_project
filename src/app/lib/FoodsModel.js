import mongoose from "mongoose";

const FoodModel = new mongoose.Schema({
    name: String,
    price: String,
    foodimg: String,
    description: String,
    addFooddate: {
        type: Date,
        default: Date.now,
    },
    resto_id : mongoose.Schema.Types.ObjectId
})

export const FoodSchema = mongoose.models.foods || mongoose.model('foods', FoodModel);