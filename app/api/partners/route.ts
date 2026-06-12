import { NextRequest, NextResponse } from "next/server";
import pool from "@/app/lib/db";
import { verifyAuth, unauthorized } from "@/app/lib/auth-server";
import { logActivity } from "@/app/lib/activity";

export async function GET() {
  try {
    const [rows] = await pool.execute("SELECT * FROM partners ORDER BY sort_order ASC, featured DESC, created_at DESC");
    return NextResponse.json({ partners: rows });
  } catch (error) {
    console.error("Partners GET error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  const auth = await verifyAuth(req);
  if (!auth) return unauthorized();

  try {
    const body = await req.json();
    const { name, website, category, featured, status, logo_url, sort_order } = body;

    if (!name) return NextResponse.json({ error: "Name is required" }, { status: 400 });

    const [result] = await pool.execute(
      "INSERT INTO partners (name,website,category,featured,status,logo_url,sort_order) VALUES (?,?,?,?,?,?,?)",
      [name, website || "", category || "Official Partner", featured ? 1 : 0, status || "Active", logo_url ?? null, sort_order ?? 0]
    );

    await logActivity("create", `New partner added: ${name}`, auth.name);

    const insertId = (result as { insertId: number }).insertId;
    const [newRows] = await pool.execute("SELECT * FROM partners WHERE id = ?", [insertId]);
    return NextResponse.json({ partner: (newRows as unknown[])[0] }, { status: 201 });
  } catch (error) {
    console.error("Partners POST error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
