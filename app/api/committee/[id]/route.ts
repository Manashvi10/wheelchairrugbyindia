import { NextRequest, NextResponse } from "next/server";
import pool from "@/app/lib/db";
import { verifyAuth, unauthorized } from "@/app/lib/auth-server";

type Ctx = { params: Promise<{ id: string }> };

export async function PUT(req: NextRequest, ctx: Ctx) {
  const auth = await verifyAuth(req);
  if (!auth) return unauthorized();
  const { id } = await ctx.params;
  try {
    const { name, designation, bio, image_url, sort_order, is_active } = await req.json();
    await pool.execute(
      "UPDATE committee_members SET name=?, designation=?, bio=?, image_url=?, sort_order=?, is_active=?, updated_at=NOW() WHERE id=?",
      [name, designation, bio ?? null, image_url ?? null, sort_order ?? 0, is_active ?? 1, id]
    );
    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest, ctx: Ctx) {
  const auth = await verifyAuth(req);
  if (!auth) return unauthorized();
  const { id } = await ctx.params;
  try {
    await pool.execute("DELETE FROM committee_members WHERE id=?", [id]);
    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
