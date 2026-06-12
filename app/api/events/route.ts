import { NextRequest, NextResponse } from "next/server";
import pool from "@/app/lib/db";
import { verifyAuth, unauthorized } from "@/app/lib/auth-server";
import { logActivity } from "@/app/lib/activity";

export async function GET(req: NextRequest) {
  const auth = await verifyAuth(req);
  if (!auth) return unauthorized();

  const { searchParams } = new URL(req.url);
  const filter = searchParams.get("filter") || "upcoming";

  try {
    let sql = "SELECT * FROM events";
    if (filter === "upcoming") sql += " WHERE start_date >= CURDATE()";
    else if (filter === "past") sql += " WHERE start_date < CURDATE()";
    sql += " ORDER BY start_date ASC";

    const [rows] = await pool.execute(sql);
    return NextResponse.json({ events: rows });
  } catch (error) {
    console.error("Events GET error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  const auth = await verifyAuth(req);
  if (!auth) return unauthorized();

  try {
    const body = await req.json();
    const { title, start_date, end_date, venue, city, registrations, status, description } = body;

    if (!title || !start_date) {
      return NextResponse.json({ error: "Title and start date are required" }, { status: 400 });
    }

    const [result] = await pool.execute(
      "INSERT INTO events (title,start_date,end_date,venue,city,registrations,status,description) VALUES (?,?,?,?,?,?,?,?)",
      [title, start_date, end_date || null, venue || "", city || "", registrations || 0, status || "Draft", description || ""]
    );

    await logActivity("create", `New event created: ${title}`, auth.name);

    const insertId = (result as { insertId: number }).insertId;
    const [newRows] = await pool.execute("SELECT * FROM events WHERE id = ?", [insertId]);
    return NextResponse.json({ event: (newRows as unknown[])[0] }, { status: 201 });
  } catch (error) {
    console.error("Events POST error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
