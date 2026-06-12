import { NextRequest, NextResponse } from "next/server";
import pool from "@/app/lib/db";
import { verifyAuth, unauthorized } from "@/app/lib/auth-server";

export async function PUT(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const auth = await verifyAuth(req);
  if (!auth) return unauthorized();
  const { id } = await params;
  try {
    const body = await req.json();
    const { title, excerpt, content, image_url, category, article_url, published_date, is_featured, status, sort_order } = body;
    await pool.execute(
      `UPDATE news_articles SET title=?, excerpt=?, content=?, image_url=?, category=?, article_url=?, published_date=?, is_featured=?, status=?, sort_order=?, updated_at=NOW() WHERE id=?`,
      [title, excerpt ?? "", content ?? "", image_url ?? "", category ?? "General", article_url ?? "", published_date ?? "", is_featured ?? 0, status ?? "Draft", sort_order ?? 0, id]
    );
    return NextResponse.json({ success: true });
  } catch (e: unknown) {
    return NextResponse.json({ error: String(e) }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const auth = await verifyAuth(req);
  if (!auth) return unauthorized();
  const { id } = await params;
  try {
    await pool.execute("DELETE FROM news_articles WHERE id=?", [id]);
    return NextResponse.json({ success: true });
  } catch (e: unknown) {
    return NextResponse.json({ error: String(e) }, { status: 500 });
  }
}
