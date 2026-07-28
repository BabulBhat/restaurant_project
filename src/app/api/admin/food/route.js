import mongoose from "mongoose";
import { connectToMongo } from "@/app/lib/db";
import { NextResponse } from "next/server";
import { FoodSchema } from "@/app/lib/restaurant/FoodsModel";
import { jwtVerify } from "jose";
import { restaurantSchema } from "@/app/lib/restaurant/restaurantsModel";
import { verifyToken } from "@/app/lib/middleware/VerifyToken";

const SECRET = new TextEncoder().encode(process.env.NEXT_JWT);

export async function GET(req) {
    const auth = await verifyToken(req)
    await mongoose.connect(connectToMongo)
    const restoresult = await restaurantSchema.findOne({ restaurantemail: auth.payload.email });
    const result = await FoodSchema.find({ resto_id: restoresult._id });
    if (!result) {
        return NextResponse.json({ error: "No Records Found" })
    }
    return NextResponse.json({ result })
}

export async function POST(req) {
    const data = await req.json();
    let success = false;
    await mongoose.connect(connectToMongo)
    if (!data) {
        return NextResponse.json({ error: "Food Not Found." })
    }
    const auth = await verifyToken(req)
    const restofind = await restaurantSchema.findOne({ restaurantemail: auth.payload.email })
    const restoid = restofind._id;
    const { name, price, foodimg, description } = data;
    const newpayload = {
        name: name,
        price: price,
        foodimg: foodimg,
        description: description,
        resto_id: restoid
    }
    const food = new FoodSchema(newpayload);
    const result = await food.save();
    if (result) {
        success = true;
    }
    return NextResponse.json({ result, success })
}