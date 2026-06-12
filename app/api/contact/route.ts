import { NextRequest, NextResponse } from "next/server";
import pool from "@/app/lib/db";
import { verifyAuth, unauthorized } from "@/app/lib/auth-server";

export async function GET(req: NextRequest) {
  const auth = await verifyAuth(req);
  if (!auth) return unauthorized();

  try {
    const [rows] = await pool.execute(
      "SELECT * FROM contact_messages ORDER BY is_read ASC, created_at DESC"
    );
    return NextResponse.json({ messages: rows });
  } catch (error) {
    console.error("Contact GET error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
