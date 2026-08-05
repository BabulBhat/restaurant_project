import mongoose from "mongoose";
import { connectToMongo } from "@/app/lib/db";
import { NextResponse } from "next/server";
import { CategorySchema } from "@/app/lib/restaurant/CategoryModel";

export async function GET(req, { params }) {
  const { id } = await params;
  await mongoose.connect(connectToMongo);
  const result = await CategorySchema.findById({ _id: id });
  return NextResponse.json(result);
}

export async function PUT(req, { params }) {
  const payload = await req.json();
  const { id } = await params;
  await mongoose.connect(connectToMongo);
  const result = await CategorySchema.findByIdAndUpdate(id, payload, {
    returnDocument: "after",
    runValidators: true,
  });
  if (!result) {
    return NextResponse.json("Category Not Found...");
  }
  return NextResponse.json(result);
}

export async function DELETE(req, { params }) {
  try {
    const { id } = await params;
    await mongoose.connect(connectToMongo);
    const result = await CategorySchema.findByIdAndDelete(id);
    if (!result) {
      return NextResponse.json(
        { message: "Category Not Found" },
        { status: 404 },
      );
    }
    return NextResponse.json(
      { result },
      { message: "Category Delete Successfully" },
      { status: 200 },
    );
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
