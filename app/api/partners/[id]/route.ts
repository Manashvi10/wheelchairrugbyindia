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
    const { name, website, category, featured, status, logo_url, sort_order } = body;

    await pool.execute(
      "UPDATE partners SET name=?,website=?,category=?,featured=?,status=?,logo_url=?,sort_order=? WHERE id=?",
      [name, website || "", category, featured ? 1 : 0, status, logo_url ?? null, sort_order ?? 0, id]
    );

    await logActivity("edit", `Partner updated: ${name}`, auth.name);

    const [rows] = await pool.execute("SELECT * FROM partners WHERE id = ?", [id]);
    return NextResponse.json({ partner: (rows as unknown[])[0] });
  } catch (error) {
    console.error("Partner PUT error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const auth = await verifyAuth(req);
  if (!auth) return unauthorized();

  const { id } = await params;
  try {
    const [rows] = await pool.execute("SELECT name FROM partners WHERE id = ?", [id]);
    const partner = (rows as Record<string, unknown>[])[0];
    if (!partner) return NextResponse.json({ error: "Not found" }, { status: 404 });

    await pool.execute("DELETE FROM partners WHERE id = ?", [id]);
    await logActivity("delete", `Partner removed: ${partner.name}`, auth.name);

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Partner DELETE error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
