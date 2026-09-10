import { connectToMongo } from "@/app/lib/db";
import { CategorySchema } from "@/app/lib/restaurant/CategoryModel";
import { restaurantSchema } from "@/app/lib/restaurant/restaurantsModel";
import mongoose from "mongoose";
import { NextResponse } from "next/server";

export async function GET(req) {
  const userdataHeader = req.headers.get("userdata");
  const userdata = JSON.parse(userdataHeader);
  // console.log(userdata);
  
  let success = false;
  await mongoose.connect(connectToMongo);
  let result = await restaurantSchema.find({ city: userdata });

  const restaurants_Category = await Promise.all(
    result.map(async (item) => {
      const category = await CategorySchema.find({
        resto_id: item._id,
      });
      
      const found_resturant_categorywise = await restaurantSchema.find({_id: item._id})
      console.log(found_resturant_categorywise);
      return category;
    }),
  );

  // flat() is a JavaScript array method used to remove nested arrays and create a single-level array.
  const categories = restaurants_Category.flat();
  // console.log(categories);

  
  
  
  return NextResponse.json(categories);
}
