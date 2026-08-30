import mongoose from "mongoose";
import { connectToMongo } from "@/app/lib/db";
import { NextResponse } from "next/server";
import { FoodSchema } from "@/app/lib/restaurant/FoodsModel";
import { jwtVerify } from "jose";
import { restaurantSchema } from "@/app/lib/restaurant/restaurantsModel";
import { verifyToken } from "@/app/lib/middleware/VerifyToken";
import { CategorySchema } from "@/app/lib/restaurant/CategoryModel";

const SECRET = new TextEncoder().encode(process.env.NEXT_JWT);

export async function GET(req) {
  const { searchParams } = new URL(req.url);
  const page = Number(searchParams.get("page")) || 1;
  const limit = Number(searchParams.get("limit")) || 5;

  const start = (page - 1) * limit;
  const end = start + limit;

  const auth = await verifyToken(req);
  await mongoose.connect(connectToMongo);
  const restoresult = await restaurantSchema.findOne({
    restaurantemail: auth.payload.email,
  });

  const foods = await FoodSchema.find({resto_id: restoresult._id}).populate("category").sort({ createdAt: -1 });
  const categorys_id = await CategorySchema.find({ resto_id: restoresult._id });
  // console.log(foods);
  if (!foods) {
    return NextResponse.json({ error: "No Records Found" });
  }

  const totalrecords = await FoodSchema.countDocuments();
  const paginationresult = foods.slice(start, end);
  
  const totalpage = Math.ceil(foods.length / limit);

  return NextResponse.json({
    totalrecords,
    paginationresult,
    page,
    totalpage,
    categorys_id,
  });
}

export async function POST(req) {
  const data = await req.json();
  let success = false;
  await mongoose.connect(connectToMongo);
  if (!data) {
    return NextResponse.json({ error: "Food Not Found." });
  }
  // console.log(data);

  const auth = await verifyToken(req);
  const restofind = await restaurantSchema.findOne({
    restaurantemail: auth.payload.email,
  });
  const restoid = restofind._id;

  const foodcategory = await CategorySchema.findOne({
    _id: data.category._id,
  });

  const { name, quantity, price, foodimg, description } = data;
  const newpayload = {
    name: name,
    category: foodcategory._id,
    quantity: quantity,
    price: price,
    foodimg: foodimg,
    description: description,
    resto_id: restoid,
  };
  const food = new FoodSchema(newpayload);
  const tempresult = await food.save();
  if (tempresult) {
    success = true;
  }

  // Populate Category After Saving
  const result = await FoodSchema.findById(tempresult._id).populate("category");
  return NextResponse.json({ result, success });
}
