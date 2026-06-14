import { NextRequest, NextResponse } from "next/server";
import pool from "@/app/lib/db";
import { verifyAuth, unauthorized } from "@/app/lib/auth-server";
import { logActivity } from "@/app/lib/activity";

export async function GET() {
  try {
    const [rows] = await pool.execute(
      "SELECT * FROM news_articles ORDER BY sort_order ASC, id DESC"
    );
    return NextResponse.json({ articles: rows });
  } catch (e: unknown) {
    return NextResponse.json({ error: String(e) }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  const auth = await verifyAuth(req);
  if (!auth) return unauthorized();
  try {
    const body = await req.json();
    const { title, excerpt, content, image_url, category, article_url, published_date, is_featured, status, sort_order } = body;
    const [result] = await pool.execute(
      "INSERT INTO news_articles (title, excerpt, content, image_url, category, article_url, published_date, is_featured, status, sort_order) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)",
      [title, excerpt ?? "", content ?? "", image_url ?? "", category ?? "General", article_url ?? "", published_date ?? "", is_featured ?? 0, status ?? "Draft", sort_order ?? 0]
    );
    const action = (status ?? "Draft") === "Published" ? "publish" : "create";
    await logActivity(action, `News article ${action === "publish" ? "published" : "created"}: ${title}`, auth.name);
    return NextResponse.json({ success: true, id: (result as { insertId: number }).insertId });
  } catch (e: unknown) {
    return NextResponse.json({ error: String(e) }, { status: 500 });
  }
}
