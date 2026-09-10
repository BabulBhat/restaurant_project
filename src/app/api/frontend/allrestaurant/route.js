import mongoose from "mongoose";
import { NextResponse } from "next/server";
import { connectToMongo } from "@/app/lib/db";
import { restaurantSchema } from "@/app/lib/restaurant/restaurantsModel";

export async function GET(req) {
  const userdataHeader = req.headers.get("userdata");
  const userdata = JSON.parse(userdataHeader);
  let success = false;
  await mongoose.connect(connectToMongo);
  let result = await restaurantSchema.find({ city: userdata });
  if (result) {
    success: true;
  }
  return NextResponse.json({ result, success });
}
