import { jwtVerify, type JWTPayload } from "jose";
import { NextRequest, NextResponse } from "next/server";

const JWT_SECRET = new TextEncoder().encode(process.env.JWT_SECRET!);

export interface AuthPayload extends JWTPayload {
  id: number;
  name: string;
  email: string;
  role: string;
}

export async function verifyAuth(req: NextRequest): Promise<AuthPayload | null> {
  const token = req.cookies.get("wrfi_token")?.value;
  if (!token) return null;
  try {
    const { payload } = await jwtVerify(token, JWT_SECRET);
    return payload as AuthPayload;
  } catch {
    return null;
  }
}

export const unauthorized = () =>
  NextResponse.json({ error: "Unauthorized" }, { status: 401 });
