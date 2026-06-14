import { NextRequest, NextResponse } from "next/server";
import pool from "@/app/lib/db";
import { verifyAuth, unauthorized } from "@/app/lib/auth-server";
import { logActivity } from "@/app/lib/activity";

export async function PATCH(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const auth = await verifyAuth(req);
  if (!auth) return unauthorized();

  const { id } = await params;
  try {
    const body = await req.json();
    const { is_read, is_important } = body;

    const updates: string[] = [];
    const vals: (number | string)[] = [];

    if (is_read !== undefined) { updates.push("is_read=?"); vals.push(is_read ? 1 : 0); }
    if (is_important !== undefined) { updates.push("is_important=?"); vals.push(is_important ? 1 : 0); }

    if (updates.length === 0) return NextResponse.json({ error: "Nothing to update" }, { status: 400 });

    vals.push(id);
    await pool.execute(`UPDATE contact_messages SET ${updates.join(",")} WHERE id=?`, vals);

    const [rows] = await pool.execute("SELECT * FROM contact_messages WHERE id = ?", [id]);
    const msg = (rows as Record<string, unknown>[])[0];
    if (is_read !== undefined) {
      await logActivity("edit", `Contact message marked as ${is_read ? "read" : "unread"} from ${msg?.name ?? "visitor"}`, auth.name);
    }
    if (is_important !== undefined) {
      await logActivity("edit", `Contact message ${is_important ? "starred" : "unstarred"} from ${msg?.name ?? "visitor"}`, auth.name);
    }
    return NextResponse.json({ message: msg });
  } catch (error) {
    console.error("Contact PATCH error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const auth = await verifyAuth(req);
  if (!auth) return unauthorized();

  const { id } = await params;
  try {
    await pool.execute("DELETE FROM contact_messages WHERE id = ?", [id]);
    await logActivity("delete", `Contact message deleted (id: ${id})`, auth.name);
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Contact DELETE error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
