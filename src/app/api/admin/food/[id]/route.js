import mongoose from "mongoose";
import { connectToMongo } from "@/app/lib/db";
import { NextResponse } from "next/server";
import { FoodSchema } from "@/app/lib/FoodsModel";

export async function DELETE(req, res) {
    const { id } = await res.params;
    await mongoose.connect(connectToMongo)
    const result = await FoodSchema.findByIdAndDelete({ _id: id })
    return NextResponse.json(result);
}