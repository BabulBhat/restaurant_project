import { jwtVerify } from "jose";
const SECRET = new TextEncoder().encode(process.env.NEXT_JWT);
export async function verifyToken(req) {
    try {
        const resto_id = await req.headers;
        const authHeader = resto_id.get('authorization');
        if (!authHeader || !authHeader.startsWith('babul ')) {
            return NextResponse.json({ error: 'Access Denied. Missing or malformed token.' })
        }
        const token = authHeader.split(' ')[1];
        const { payload } = await jwtVerify(token, SECRET);
        return { payload, error: null };
    } catch (error) {
        if (error.code === 'ERR_JWT_EXPIRED') {
            return { error: 'TOKEN_EXPIRED', status: 401 };
        }
        return { error: 'INVALID_TOKEN', status: 401 };
    }
}