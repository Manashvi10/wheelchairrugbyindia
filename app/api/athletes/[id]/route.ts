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
    const { name, state, city, category, position, status, featured, achievements, bio, joined_date } = body;

    await pool.execute(
      `UPDATE athletes SET name=?,state=?,city=?,category=?,position=?,status=?,
       featured=?,achievements=?,bio=?,joined_date=? WHERE id=?`,
      [name, state, city, category, position, status, featured ? 1 : 0, achievements, bio, joined_date || null, id]
    );

    await logActivity("edit", `Athlete profile updated: ${name}`, auth.name);

    const [rows] = await pool.execute("SELECT * FROM athletes WHERE id = ?", [id]);
    return NextResponse.json({ athlete: (rows as unknown[])[0] });
  } catch (error) {
    console.error("Athlete PUT error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const auth = await verifyAuth(req);
  if (!auth) return unauthorized();

  const { id } = await params;
  try {
    const [rows] = await pool.execute("SELECT name FROM athletes WHERE id = ?", [id]);
    const athlete = (rows as Record<string, unknown>[])[0];
    if (!athlete) return NextResponse.json({ error: "Not found" }, { status: 404 });

    await pool.execute("DELETE FROM athletes WHERE id = ?", [id]);
    await logActivity("delete", `Athlete profile deleted: ${athlete.name}`, auth.name);

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Athlete DELETE error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
