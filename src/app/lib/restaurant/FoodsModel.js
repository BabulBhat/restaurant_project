import mongoose from "mongoose";

const FoodModel = new mongoose.Schema(
  {
    name: String,
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "categorys",
    },
    quantity: String,
    price: String,
    foodimg: String,
    description: String,
    resto_id: mongoose.Schema.Types.ObjectId,
  },
  { timestamps: true },
);

export const FoodSchema =
  mongoose.models.foods || mongoose.model("foods", FoodModel);
