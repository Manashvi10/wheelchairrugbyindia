import { NextRequest, NextResponse } from "next/server";
import pool from "@/app/lib/db";
import { verifyAuth, unauthorized } from "@/app/lib/auth-server";
import { logActivity } from "@/app/lib/activity";

export async function PUT(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const auth = await verifyAuth(req);
  if (!auth) return unauthorized();

  const { id } = await params;
  try {
    const body = await req.json();
    const { title, start_date, end_date, venue, city, registrations, status, description } = body;

    await pool.execute(
      "UPDATE events SET title=?,start_date=?,end_date=?,venue=?,city=?,registrations=?,status=?,description=? WHERE id=?",
      [title, start_date, end_date || null, venue, city, registrations || 0, status, description || "", id]
    );

    await logActivity("edit", `Event updated: ${title}`, auth.name);

    const [rows] = await pool.execute("SELECT * FROM events WHERE id = ?", [id]);
    return NextResponse.json({ event: (rows as unknown[])[0] });
  } catch (error) {
    console.error("Event PUT error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const auth = await verifyAuth(req);
  if (!auth) return unauthorized();

  const { id } = await params;
  try {
    const [rows] = await pool.execute("SELECT title FROM events WHERE id = ?", [id]);
    const event = (rows as Record<string, unknown>[])[0];
    if (!event) return NextResponse.json({ error: "Not found" }, { status: 404 });

    await pool.execute("DELETE FROM events WHERE id = ?", [id]);
    await logActivity("delete", `Event deleted: ${event.title}`, auth.name);

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Event DELETE error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
