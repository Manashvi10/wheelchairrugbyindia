import { NextRequest, NextResponse } from "next/server";
import pool from "@/app/lib/db";
import { verifyAuth, unauthorized } from "@/app/lib/auth-server";
import { logActivity } from "@/app/lib/activity";

async function ensureTable() {
  await pool.execute(`
    CREATE TABLE IF NOT EXISTS history_sections (
      section_key VARCHAR(100) NOT NULL PRIMARY KEY,
      data LONGTEXT NOT NULL,
      is_enabled TINYINT(1) DEFAULT 1,
      updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
    )
  `);
}

export async function GET() {
  try {
    await ensureTable();
    const [rows] = await pool.execute("SELECT * FROM history_sections");
    const sections: Record<string, { data: unknown; is_enabled: boolean }> = {};
    
    (rows as { section_key: string; data: string; is_enabled: number }[]).forEach((row) => {
      sections[row.section_key] = {
        data: JSON.parse(row.data),
        is_enabled: row.is_enabled === 1,
      };
    });
    
    return NextResponse.json({ sections });
  } catch (error) {
    console.error("History sections GET error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

export async function PUT(req: NextRequest) {
  const auth = await verifyAuth(req);
  if (!auth) return unauthorized();

  try {
    await ensureTable();
    const body = await req.json();
    const { section_key, data, is_enabled } = body;

    if (!section_key || !data) {
      return NextResponse.json({ error: "section_key and data are required" }, { status: 400 });
    }

    await pool.execute(
      `INSERT INTO history_sections (section_key, data, is_enabled) 
       VALUES (?, ?, ?) 
       ON DUPLICATE KEY UPDATE data = VALUES(data), is_enabled = VALUES(is_enabled)`,
      [section_key, JSON.stringify(data), is_enabled ? 1 : 0]
    );

    await logActivity("edit", `Updated history section: ${section_key}`, auth.name);

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("History sections PUT error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
