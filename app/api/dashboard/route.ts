import { NextRequest, NextResponse } from "next/server";
import pool from "@/app/lib/db";
import { verifyAuth, unauthorized } from "@/app/lib/auth-server";

export async function GET(req: NextRequest) {
  const auth = await verifyAuth(req);
  if (!auth) return unauthorized();

  try {
    const [[athleteCount], [eventCount], [partnerCount], [msgCount]] =
      await Promise.all([
        pool.execute("SELECT COUNT(*) as c FROM athletes"),
        pool.execute("SELECT COUNT(*) as c FROM events"),
        pool.execute("SELECT COUNT(*) as c FROM partners WHERE status = 'Active'"),
        pool.execute("SELECT COUNT(*) as c FROM contact_messages WHERE is_read = 0"),
      ]);

    const [activity] = await pool.execute(
      "SELECT * FROM activity_logs ORDER BY created_at DESC LIMIT 6"
    );

    const [upcoming] = await pool.execute(
      "SELECT * FROM events WHERE start_date >= CURDATE() ORDER BY start_date ASC LIMIT 4"
    );

    const [pendingTestimonials] = await pool.execute(
      "SELECT id, name, 'Testimonial' as type, created_at FROM testimonials WHERE status = 'pending' ORDER BY created_at DESC LIMIT 3"
    );

    const [latestAthlete] = await pool.execute(
      "SELECT name, created_at FROM athletes ORDER BY created_at DESC LIMIT 1"
    );

    const [latestEvent] = await pool.execute(
      "SELECT title, created_at FROM events ORDER BY created_at DESC LIMIT 1"
    );

    const [upcomingEvent] = await pool.execute(
      "SELECT title, start_date FROM events WHERE start_date >= CURDATE() ORDER BY start_date ASC LIMIT 1"
    );

    const rows = (arr: unknown) => arr as Record<string, unknown>[];

    return NextResponse.json({
      stats: {
        athletes: (rows(athleteCount)[0]?.c as number) ?? 0,
        events: (rows(eventCount)[0]?.c as number) ?? 0,
        partners: (rows(partnerCount)[0]?.c as number) ?? 0,
        unread_messages: (rows(msgCount)[0]?.c as number) ?? 0,
      },
      recentActivity: rows(activity),
      upcomingEvents: rows(upcoming),
      pendingApprovals: rows(pendingTestimonials),
      overview: {
        latestAthlete: rows(latestAthlete)[0]?.name ?? "—",
        latestEvent: rows(latestEvent)[0]?.title ?? "—",
        upcomingEvent: rows(upcomingEvent)[0]?.title ?? "—",
        upcomingEventDate: rows(upcomingEvent)[0]?.start_date ?? null,
      },
    });
  } catch (error) {
    console.error("Dashboard error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
