import mongoose from "mongoose";
import { connectToMongo } from "@/app/lib/db";
import { restaurantSchema } from "@/app/lib/restaurant/restaurantsModel";
import { NextResponse } from "next/server";


export async function PUT(req, res) {
    const params = await res.params;
    const id = params.id;
    await mongoose.connect(connectToMongo)
    let success = false;
    const payload = await req.json();
    const result = await restaurantSchema.findByIdAndUpdate(id, payload, {
        returnDocument: 'after',
        runValidators: true
    });
    if (result) {
        success = true;
    }
    return NextResponse.json({ result, success })
}


