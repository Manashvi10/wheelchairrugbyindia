import { NextRequest, NextResponse } from "next/server";
import pool from "@/app/lib/db";
import { verifyAuth, unauthorized } from "@/app/lib/auth-server";

// GET — public (for homepage)
export async function GET() {
  try {
    const [rows] = await pool.execute(
      "SELECT id, name, role, quote_text, avatar_url, rating, status, sort_order FROM testimonials ORDER BY sort_order ASC, id ASC"
    );
    return NextResponse.json({ testimonials: rows });
  } catch {
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

// POST — JWT protected (admin adds testimonial)
export async function POST(req: NextRequest) {
  const auth = await verifyAuth(req);
  if (!auth) return unauthorized();

  try {
    const { name, role, quote_text, avatar_url, rating = 5, status = "pending", sort_order = 0 } = await req.json();
    if (!name || !quote_text) return NextResponse.json({ error: "name and quote_text required" }, { status: 400 });

    const [result] = await pool.execute(
      "INSERT INTO testimonials (name, role, quote_text, avatar_url, rating, status, sort_order) VALUES (?, ?, ?, ?, ?, ?, ?)",
      [name, role ?? null, quote_text, avatar_url ?? null, rating, status, sort_order]
    );
    return NextResponse.json({ success: true, id: (result as { insertId: number }).insertId });
  } catch {
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
