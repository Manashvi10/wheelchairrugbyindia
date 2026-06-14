import { NextRequest, NextResponse } from "next/server";
import pool from "@/app/lib/db";
import { verifyAuth, unauthorized } from "@/app/lib/auth-server";

async function ensureTable() {
  await pool.execute(`
    CREATE TABLE IF NOT EXISTS contact_messages (
      id INT AUTO_INCREMENT PRIMARY KEY,
      name VARCHAR(255) NOT NULL,
      email VARCHAR(255) NOT NULL,
      phone VARCHAR(50),
      subject VARCHAR(255),
      message TEXT NOT NULL,
      source VARCHAR(50) DEFAULT 'contact',
      is_read TINYINT(1) DEFAULT 0,
      is_important TINYINT(1) DEFAULT 0,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )
  `);
  // Add 'source' column if older schema exists
  try {
    await pool.execute(
      "ALTER TABLE contact_messages ADD COLUMN source VARCHAR(50) DEFAULT 'contact'"
    );
  } catch {
    /* column already exists */
  }
}

export async function GET(req: NextRequest) {
  const auth = await verifyAuth(req);
  if (!auth) return unauthorized();

  try {
    await ensureTable();
    const [rows] = await pool.execute(
      "SELECT * FROM contact_messages ORDER BY is_read ASC, created_at DESC"
    );
    return NextResponse.json({ messages: rows });
  } catch (error) {
    console.error("Contact GET error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    await ensureTable();
    const body = await req.json();
    const name = String(body.name ?? "").trim();
    const email = String(body.email ?? "").trim();
    const phone = body.phone ? String(body.phone).trim() : null;
    const subject = body.subject ? String(body.subject).trim() : null;
    const message = String(body.message ?? "").trim();
    const source = body.source ? String(body.source).trim() : "contact";

    if (!name || !email || !message) {
      return NextResponse.json(
        { error: "Name, email and message are required." },
        { status: 400 }
      );
    }

    const emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRe.test(email)) {
      return NextResponse.json({ error: "Invalid email address." }, { status: 400 });
    }

    await pool.execute(
      "INSERT INTO contact_messages (name,email,phone,subject,message,source) VALUES (?,?,?,?,?,?)",
      [name, email, phone, subject, message, source]
    );

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Contact POST error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
