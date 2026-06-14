import { NextRequest, NextResponse } from "next/server";
import pool from "@/app/lib/db";
import { verifyAuth, unauthorized } from "@/app/lib/auth-server";
import { logActivity } from "@/app/lib/activity";

type Ctx = { params: Promise<{ key: string }> };

export async function GET(_req: NextRequest, ctx: Ctx) {
  const { key } = await ctx.params;
  try {
    const [rows] = await pool.execute(
      "SELECT data, is_enabled FROM about_sections WHERE section_key = ?",
      [key]
    );
    const row = (rows as { data: string; is_enabled: number }[])[0];
    if (!row) return NextResponse.json({ data: null, is_enabled: true });
    return NextResponse.json({ data: JSON.parse(row.data), is_enabled: !!row.is_enabled });
  } catch {
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

export async function PUT(req: NextRequest, ctx: Ctx) {
  const auth = await verifyAuth(req);
  if (!auth) return unauthorized();
  const { key } = await ctx.params;
  try {
    const { data, is_enabled } = await req.json();
    await pool.execute(
      `INSERT INTO about_sections (section_key, data, is_enabled) VALUES (?, ?, ?)
       ON DUPLICATE KEY UPDATE data = VALUES(data), is_enabled = VALUES(is_enabled)`,
      [key, JSON.stringify(data), is_enabled ? 1 : 0]
    );
    await logActivity("edit", `Website section updated: ${key}`, auth.name);
    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
