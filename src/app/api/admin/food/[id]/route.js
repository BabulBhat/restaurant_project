import { NextResponse } from "next/server";
import mongoose from "mongoose";
import { connectToMongo } from "@/app/lib/db";
import { FoodSchema } from "@/app/lib/restaurant/FoodsModel";


export async function GET(req, { params }) {
    await mongoose.connect(connectToMongo);
    const { id } = await params;
    const result = await FoodSchema.findById(id)
    return NextResponse.json(result)
}

export async function DELETE(req, { params }) {
    const { id } = await params;
    await mongoose.connect(connectToMongo)
    const result = await FoodSchema.findByIdAndDelete({ _id: id });
    const del_id = result._id;
    return NextResponse.json({ message: "Delete Successfully", del_id });
}

export async function PUT(req, { params }) {
    try {
        await mongoose.connect(connectToMongo)
        const payload = await req.json();
        const { id } = await params;
        const update_Food = await FoodSchema.findByIdAndUpdate(
            id,
            payload,
            { returnDocument: 'after', runValidators: true }
        )

        if (!update_Food) {
            return NextResponse.json({ error: "Food Item Not Found" })
        }
        return NextResponse.json(update_Food);
    } catch (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}