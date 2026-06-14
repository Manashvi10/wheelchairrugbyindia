import { NextRequest, NextResponse } from "next/server";
import pool from "@/app/lib/db";
import { verifyAuth, unauthorized } from "@/app/lib/auth-server";

type Row = Record<string, unknown>;

async function safeCount(sql: string): Promise<number> {
  try {
    const [rows] = await pool.execute(sql);
    return Number((rows as Row[])[0]?.c ?? 0);
  } catch {
    return 0;
  }
}

async function safeQuery(sql: string): Promise<Row[]> {
  try {
    const [rows] = await pool.execute(sql);
    return (rows as Row[]);
  } catch {
    return [];
  }
}

export async function GET(req: NextRequest) {
  const auth = await verifyAuth(req);
  if (!auth) return unauthorized();

  const [
    athletes,
    activeAthletes,
    events,
    upcomingEventsCount,
    partners,
    unreadMessages,
    totalMessages,
    news,
    testimonials,
    pendingTestimonials,
  ] = await Promise.all([
    safeCount("SELECT COUNT(*) AS c FROM athletes"),
    safeCount("SELECT COUNT(*) AS c FROM athletes WHERE status = 'Active'"),
    safeCount("SELECT COUNT(*) AS c FROM events"),
    safeCount("SELECT COUNT(*) AS c FROM events WHERE start_date >= CURDATE()"),
    safeCount("SELECT COUNT(*) AS c FROM partners WHERE status = 'Active'"),
    safeCount("SELECT COUNT(*) AS c FROM contact_messages WHERE is_read = 0"),
    safeCount("SELECT COUNT(*) AS c FROM contact_messages"),
    safeCount("SELECT COUNT(*) AS c FROM news_articles WHERE status = 'Published'"),
    safeCount("SELECT COUNT(*) AS c FROM testimonials WHERE status = 'approved'"),
    safeCount("SELECT COUNT(*) AS c FROM testimonials WHERE status = 'pending'"),
  ]);

  const [activity, upcoming, pendingList, latestAthlete, latestEvent, nextEvent] = await Promise.all([
    safeQuery("SELECT * FROM activity_logs ORDER BY created_at DESC LIMIT 8"),
    safeQuery("SELECT * FROM events WHERE start_date >= CURDATE() ORDER BY start_date ASC LIMIT 4"),
    safeQuery("SELECT id, name, 'Testimonial' AS type, created_at FROM testimonials WHERE status = 'pending' ORDER BY created_at DESC LIMIT 3"),
    safeQuery("SELECT name FROM athletes ORDER BY created_at DESC LIMIT 1"),
    safeQuery("SELECT title FROM events ORDER BY created_at DESC LIMIT 1"),
    safeQuery("SELECT title, start_date FROM events WHERE start_date >= CURDATE() ORDER BY start_date ASC LIMIT 1"),
  ]);

  return NextResponse.json({
    stats: {
      athletes,
      activeAthletes,
      events,
      upcomingEventsCount,
      partners,
      unreadMessages,
      totalMessages,
      news,
      testimonials,
      pendingTestimonials,
    },
    recentActivity: activity,
    upcomingEvents: upcoming,
    pendingApprovals: pendingList,
    overview: {
      latestAthlete: latestAthlete[0]?.name ?? "—",
      latestEvent: latestEvent[0]?.title ?? "—",
      upcomingEvent: nextEvent[0]?.title ?? "—",
      upcomingEventDate: nextEvent[0]?.start_date ?? null,
    },
  });
}
