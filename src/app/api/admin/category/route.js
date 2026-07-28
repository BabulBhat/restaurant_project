import mongoose from "mongoose";
import { connectToMongo } from "@/app/lib/db";
import { verifyToken } from "@/app/lib/middleware/VerifyToken";
import { CategorySchema } from "@/app/lib/restaurant/CategoryModel";
import { restaurantSchema } from "@/app/lib/restaurant/restaurantsModel";
import { NextResponse } from "next/server";

export async function GET(req) {
  const { searchParams } = new URL(req.url);
  const page = Number(searchParams.get("page")) || 1;
  const limit = Number(searchParams.get("limit")) || 3;

  const start = (page - 1) * limit;
  const end = start + limit;
  const auth = await verifyToken(req);
  const result = await restaurantSchema.findOne({
    restaurantemail: auth.payload.email,
  });
  const restoid = result._id;
  const mainresult = await CategorySchema.find({ resto_id: restoid }).sort({
    categorydate: -1,
  });
  if (!mainresult) {
    return NextResponse.json({ error: "No Records Found" });
  }
  const totalrecords = await CategorySchema.countDocuments();
  const paginationresult = mainresult.slice(start, end);
  const totalpage = Math.ceil(mainresult.length / limit);
  return NextResponse.json({ totalrecords, page, totalpage, paginationresult });
}

// Save Data Category
export async function POST(req, res) {
  const payload = await req.json();
  let success = false;
  const auth = await verifyToken(req);
  await mongoose.connect(connectToMongo);
  const restofind = await restaurantSchema.findOne({
    restaurantemail: auth.payload.email,
  });
  const restoid = restofind._id;
  const newpayload = {
    categoryname: payload,
    resto_id: restoid,
  };
  const category = new CategorySchema(newpayload);
  const result = await category.save();
  if (result) {
    success = true;
  }
  return NextResponse.json({ result, success });
}
