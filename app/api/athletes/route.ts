import { NextRequest, NextResponse } from "next/server";
import pool from "@/app/lib/db";
import { verifyAuth, unauthorized } from "@/app/lib/auth-server";
import { logActivity } from "@/app/lib/activity";

export async function GET(req: NextRequest) {
  const auth = await verifyAuth(req);
  if (!auth) return unauthorized();

  const { searchParams } = new URL(req.url);
  const q = searchParams.get("q") || "";
  const status = searchParams.get("status") || "";

  try {
    let sql = "SELECT * FROM athletes WHERE 1=1";
    const params: string[] = [];

    if (q) {
      sql += " AND (name LIKE ? OR state LIKE ? OR athlete_id LIKE ?)";
      const like = `%${q}%`;
      params.push(like, like, like);
    }
    if (status) {
      sql += " AND status = ?";
      params.push(status);
    }
    sql += " ORDER BY created_at DESC";

    const [rows] = await pool.execute(sql, params);
    return NextResponse.json({ athletes: rows });
  } catch (error) {
    console.error("Athletes GET error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  const auth = await verifyAuth(req);
  if (!auth) return unauthorized();

  try {
    const body = await req.json();
    const { name, state, city, category, position, status, featured, achievements, bio, joined_date } = body;

    if (!name) {
      return NextResponse.json({ error: "Name is required" }, { status: 400 });
    }

    const [countRows] = await pool.execute("SELECT COUNT(*) as c FROM athletes");
    const count = ((countRows as Record<string, unknown>[])[0]?.c as number) ?? 0;
    const athlete_id = `ATH-${String(count + 1).padStart(3, "0")}`;

    const [result] = await pool.execute(
      "INSERT INTO athletes (athlete_id,name,state,city,category,position,status,featured,achievements,bio,joined_date) VALUES (?,?,?,?,?,?,?,?,?,?,?)",
      [athlete_id, name, state || "", city || "", category || "1.0", position || "Low Pointer",
        status || "Active", featured ? 1 : 0, achievements || 0, bio || "", joined_date || null]
    );

    await logActivity("create", `New athlete profile: ${name} added`, auth.name);

    const insertId = (result as { insertId: number }).insertId;
    const [newRows] = await pool.execute("SELECT * FROM athletes WHERE id = ?", [insertId]);
    return NextResponse.json({ athlete: (newRows as unknown[])[0] }, { status: 201 });
  } catch (error) {
    console.error("Athletes POST error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
