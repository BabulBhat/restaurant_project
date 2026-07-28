
import mongoose from "mongoose";
import { connectToMongo } from "@/app/lib/db";
import { restaurantSchema } from "@/app/lib/restaurant/restaurantsModel";
import { jwtVerify, SignJWT } from "jose";
import { NextResponse } from "next/server";
import { verifyToken } from "@/app/lib/middleware/VerifyToken";


const SECRET = new TextEncoder().encode(process.env.NEXT_JWT);
export async function GET(req) {
    const auth = await verifyToken(req)
    if (auth.error) {
        return NextResponse.json({ error: auth.error }, { status: auth.status });
    }    
    await mongoose.connect(connectToMongo)
    const result = await restaurantSchema.findOne({ restaurantemail: auth.payload.email.toLowerCase() });
    if (!result) {
        return NextResponse.json({ error: "Username Or Password Incorrect" })
    }
    return NextResponse.json([result]);

}

export async function POST(req) {
    const payload = await req.json();
    await mongoose.connect(connectToMongo)
    let token = false;
    if (payload.login) {
        const result = await restaurantSchema.findOne({ restaurantemail: payload.email, password: payload.password })
        if (result) {
            let email = result.restaurantemail;
            token = await new SignJWT({ email }).setProtectedHeader({ alg: 'HS256' }).setExpirationTime('2d').sign(SECRET)
        }

    }
    else {
        const resto = new restaurantSchema(payload);
        const result = await resto.save();
        let email = result.restaurantemail;
        token = await new SignJWT({ email }).setProtectedHeader({ alg: 'HS256' }).setExpirationTime('2d').sign(SECRET);

    }


    return NextResponse.json(token)
}