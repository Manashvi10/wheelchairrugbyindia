import { NextRequest, NextResponse } from "next/server";
import pool from "@/app/lib/db";
import { verifyAuth, unauthorized } from "@/app/lib/auth-server";

type Ctx = { params: Promise<{ id: string }> };

// PATCH — update status or sort_order
export async function PATCH(req: NextRequest, ctx: Ctx) {
  const auth = await verifyAuth(req);
  if (!auth) return unauthorized();

  const { id } = await ctx.params;
  try {
    const body = await req.json();
    const updates: string[] = [];
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const values: any[] = [];

    if (body.status !== undefined) { updates.push("status = ?"); values.push(body.status); }
    if (body.sort_order !== undefined) { updates.push("sort_order = ?"); values.push(body.sort_order); }
    if (body.name !== undefined) { updates.push("name = ?"); values.push(body.name); }
    if (body.role !== undefined) { updates.push("role = ?"); values.push(body.role); }
    if (body.quote_text !== undefined) { updates.push("quote_text = ?"); values.push(body.quote_text); }
    if (body.avatar_url !== undefined) { updates.push("avatar_url = ?"); values.push(body.avatar_url); }
    if (body.rating !== undefined) { updates.push("rating = ?"); values.push(body.rating); }

    if (!updates.length) return NextResponse.json({ error: "Nothing to update" }, { status: 400 });

    values.push(id);
    await pool.execute(`UPDATE testimonials SET ${updates.join(", ")} WHERE id = ?`, values);
    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

// DELETE
export async function DELETE(req: NextRequest, ctx: Ctx) {
  const auth = await verifyAuth(req);
  if (!auth) return unauthorized();

  const { id } = await ctx.params;
  try {
    await pool.execute("DELETE FROM testimonials WHERE id = ?", [id]);
    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
