import mongoose from "mongoose";


const restaurantModel = new mongoose.Schema({
    restaurantName: String,
    restaurantemail: String,
    imgPath: String,
    phone: String,
    city: String,
    password: {
        type: String,
        required: true
    }
})

export const restaurantSchema = mongoose.models.restaurants || mongoose.model("restaurants", restaurantModel);