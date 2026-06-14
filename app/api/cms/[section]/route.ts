import { NextRequest, NextResponse } from "next/server";
import pool from "@/app/lib/db";
import { verifyAuth, unauthorized } from "@/app/lib/auth-server";
import { logActivity } from "@/app/lib/activity";

type Ctx = { params: Promise<{ section: string }> };

function parseJSON(raw: unknown): unknown {
  if (typeof raw === "string") {
    try { return JSON.parse(raw); } catch { return {}; }
  }
  return raw;
}

// GET — public, no auth
export async function GET(_req: NextRequest, ctx: Ctx) {
  const { section } = await ctx.params;
  try {
    const [rows] = await pool.execute(
      "SELECT data, is_enabled FROM homepage_sections WHERE section_key = ?",
      [section]
    );
    const row = (rows as Record<string, unknown>[])[0];
    if (!row) return NextResponse.json({ data: null, is_enabled: true });
    return NextResponse.json({ data: parseJSON(row.data), is_enabled: !!row.is_enabled });
  } catch {
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

// PUT — JWT protected
export async function PUT(req: NextRequest, ctx: Ctx) {
  const auth = await verifyAuth(req);
  if (!auth) return unauthorized();

  const { section } = await ctx.params;
  try {
    const body = await req.json();
    const { data, is_enabled } = body;
    const jsonData = typeof data === "string" ? data : JSON.stringify(data);
    const enabled = is_enabled !== undefined ? (is_enabled ? 1 : 0) : 1;

    await pool.execute(
      `INSERT INTO homepage_sections (section_key, data, is_enabled) VALUES (?, ?, ?)
       ON DUPLICATE KEY UPDATE data = VALUES(data), is_enabled = VALUES(is_enabled)`,
      [section, jsonData, enabled]
    );
    await logActivity("edit", `Homepage section updated: ${section}`, auth.name);
    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
