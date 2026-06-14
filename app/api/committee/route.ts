import { NextRequest, NextResponse } from "next/server";
import pool from "@/app/lib/db";
import { verifyAuth, unauthorized } from "@/app/lib/auth-server";

export async function GET() {
  try {
    const [rows] = await pool.execute(
      "SELECT * FROM committee_members ORDER BY sort_order ASC, id ASC"
    );
    return NextResponse.json({ members: rows });
  } catch {
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  const auth = await verifyAuth(req);
  if (!auth) return unauthorized();
  try {
    const { name, designation, bio, image_url, linkedin_url, sort_order = 0, is_active = 1 } = await req.json();
    if (!name || !designation) return NextResponse.json({ error: "name and designation required" }, { status: 400 });
    const [result] = await pool.execute(
      "INSERT INTO committee_members (name, designation, bio, image_url, linkedin_url, sort_order, is_active) VALUES (?, ?, ?, ?, ?, ?, ?)",
      [name, designation, bio ?? null, image_url ?? null, linkedin_url ?? null, sort_order, is_active]
    );
    return NextResponse.json({ success: true, id: (result as { insertId: number }).insertId }, { status: 201 });
  } catch {
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
