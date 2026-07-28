import mongoose from "mongoose";
import { NextResponse } from "next/server";
import { connectToMongo } from "@/app/lib/db";
import { restaurantSchema } from "@/app/lib/restaurant/restaurantsModel";

export async function GET(req) {
    const querysearch = await req.nextUrl.searchParams;
    let filter = {}
    let success = false;
    if (querysearch.get('location')) {
        let city = querysearch.get('location')
        filter = { city: { $regex: new RegExp(city, 'i') } }
    }
    await mongoose.connect(connectToMongo)
    let result = await restaurantSchema.find(filter)
    if (result) {
        success: true
    }
    return NextResponse.json({ result, success });
}