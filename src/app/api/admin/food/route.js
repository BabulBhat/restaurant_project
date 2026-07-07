import mongoose from "mongoose";
import { connectToMongo } from "@/app/lib/db";
import { NextResponse } from "next/server";
import { FoodSchema } from "@/app/lib/FoodsModel";
import { jwtVerify } from "jose";
import { restaurantSchema } from "@/app/lib/restaurant/restaurantsModel";

const SECRET = new TextEncoder().encode(process.env.NEXT_JWT);

export async function GET(req) {
    const headerfood = await req.headers;
    const auth = headerfood.get('authorization')
    if (!auth || !auth.startsWith('babul ')) {
        return NextResponse.json({ error: 'Access Denied. Missing or malformed token.' })
    }
    const token = auth.split(" ")[1];
    const { payload } = await jwtVerify(token, SECRET)
    await mongoose.connect(connectToMongo)
    const restoresult = await restaurantSchema.findOne({ restaurantemail: payload.email });
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
    const { tokenresto } = data;
    if (!tokenresto || !tokenresto.startsWith('babul ')) {
        return NextResponse.json({ error: 'Access Denied. Missing or malformed.' })
    }
    const token = tokenresto.split(" ")[1];
    const { payload } = await jwtVerify(token, SECRET)
    const restofind = await restaurantSchema.findOne({ restaurantemail: payload.email })
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