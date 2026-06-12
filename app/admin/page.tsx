"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {
  Users,
  Trophy,
  Handshake,
  Mail,
  Plus,
  CalendarPlus,
  Upload,
  TrendingUp,
  Eye,
  ArrowUpRight,
  Calendar,
  MapPin,
  Edit3,
  CheckCircle2,
  Clock,
  Loader2,
} from "lucide-react";
import { PageHeader, Card, CardHeader, StatCard, Button, Badge } from "./components/ui";
import { getSession, type AdminUser } from "./lib/auth";

type ActivityLog = { id: number; type: string; description: string; actor_name: string; created_at: string };
type EventRow = { id: number; title: string; start_date: string; end_date: string; venue: string; city: string; registrations: number; status: string };
type PendingItem = { id: number; name: string; type: string; created_at: string };
type DashboardData = {
  stats: { athletes: number; events: number; partners: number; unread_messages: number };
  recentActivity: ActivityLog[];
  upcomingEvents: EventRow[];
  pendingApprovals: PendingItem[];
  overview: { latestAthlete: string; latestEvent: string; upcomingEvent: string; upcomingEventDate: string };
};

const STATUS_COLOR: Record<string, "green" | "blue" | "yellow" | "orange" | "slate"> = {
  Published: "green", Open: "blue", Draft: "yellow", Scheduled: "orange", Completed: "slate", Cancelled: "slate",
};

const LOG_STYLE: Record<string, { color: string; Icon: typeof Edit3 }> = {
  edit:    { color: "bg-blue-100 text-blue-600",   Icon: Edit3 },
  create:  { color: "bg-green-100 text-green-600", Icon: Plus },
  publish: { color: "bg-orange-100 text-orange-600", Icon: CheckCircle2 },
  upload:  { color: "bg-purple-100 text-purple-600", Icon: Upload },
  delete:  { color: "bg-red-100 text-red-600",    Icon: Edit3 },
};

function timeAgo(ts: string) {
  const diff = (Date.now() - new Date(ts).getTime()) / 1000;
  if (diff < 60) return "just now";
  if (diff < 3600) return `${Math.floor(diff / 60)}m ago`;
  if (diff < 86400) return `${Math.floor(diff / 3600)}h ago`;
  return `${Math.floor(diff / 86400)}d ago`;
}

function fmtDate(d: string) {
  return new Date(d).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" });
}

export default function AdminDashboardPage() {
  const [data, setData] = useState<DashboardData | null>(null);
  const [user, setUser] = useState<AdminUser | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getSession().then(setUser);
    fetch("/api/dashboard")
      .then((r) => r.json())
      .then((d) => {
        if (d && !d.error && d.stats && d.overview) {
          setData(d);
        } else {
          console.error("Dashboard API error:", d);
        }
      })
      .catch((err) => console.error("Dashboard fetch failed:", err))
      .finally(() => setLoading(false));
  }, []);

  const stats = data?.stats;

  return (
    <div className="space-y-6">
      <PageHeader
        title="Dashboard"
        subtitle={`Welcome back, ${user?.name ?? "Admin"}. Here's what's happening with your federation today.`}
        breadcrumbs={[{ label: "Admin", href: "/admin" }, { label: "Dashboard" }]}
        actions={
          <>
            <Button variant="outline" size="md">
              <TrendingUp className="w-4 h-4" /> Export Report
            </Button>
            <Button variant="secondary" size="md">
              <Plus className="w-4 h-4" /> Quick Add
            </Button>
          </>
        }
      />

      {/* Stat cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <StatCard icon={Users}    label="Total Athletes"   value={loading ? "…" : (stats?.athletes ?? 0)}         color="blue"   delta={{ value: "from DB", up: true }} />
        <StatCard icon={Trophy}   label="Total Events"     value={loading ? "…" : (stats?.events ?? 0)}           color="orange" delta={{ value: "from DB", up: true }} />
        <StatCard icon={Handshake} label="Active Sponsors" value={loading ? "…" : (stats?.partners ?? 0)}         color="purple" delta={{ value: "from DB", up: true }} />
        <StatCard icon={Mail}     label="Unread Messages"  value={loading ? "…" : (stats?.unread_messages ?? 0)}  color="yellow" delta={{ value: "from DB", up: true }} />
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        {/* Recent activity */}
        <Card className="xl:col-span-2">
          <CardHeader
            title="Recent Activity"
            description="Latest updates and changes across the website"
            action={
              <Link href="/admin/logs" className="text-xs font-semibold text-saffron hover:text-saffron-dark inline-flex items-center gap-1">
                View all <ArrowUpRight className="w-3.5 h-3.5" />
              </Link>
            }
          />
          {loading ? (
            <div className="flex items-center justify-center py-12">
              <Loader2 className="w-6 h-6 animate-spin text-slate-400" />
            </div>
          ) : (
            <div className="divide-y divide-slate-100">
              {(data?.recentActivity ?? []).map((a) => {
                const style = LOG_STYLE[a.type] ?? LOG_STYLE.edit;
                const Icon = style.Icon;
                return (
                  <div key={a.id} className="px-5 sm:px-6 py-3.5 hover:bg-slate-50 flex items-start gap-4">
                    <div className={`w-9 h-9 rounded-lg flex items-center justify-center shrink-0 ${style.color}`}>
                      <Icon className="w-4 h-4" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="text-sm font-medium text-slate-800">{a.description}</div>
                      <div className="text-xs text-slate-500 mt-0.5">
                        by <span className="font-semibold">{a.actor_name}</span> · {timeAgo(a.created_at)}
                      </div>
                    </div>
                  </div>
                );
              })}
              {!loading && (data?.recentActivity ?? []).length === 0 && (
                <p className="text-center text-sm text-slate-400 py-8">No activity yet.</p>
              )}
            </div>
          )}
        </Card>

        {/* Quick actions + overview */}
        <div className="space-y-6">
          <Card>
            <CardHeader title="Quick Actions" description="Jump to common tasks" />
            <div className="p-4 grid grid-cols-2 gap-3">
              <QuickAction href="/admin/athletes" icon={Users}      label="Athletes"      color="bg-blue-500" />
              <QuickAction href="/admin/events/upcoming" icon={CalendarPlus} label="Events"   color="bg-orange-500" />
              <QuickAction href="/admin/media/gallery"  icon={Upload}     label="Gallery"      color="bg-purple-500" />
              <QuickAction href="/admin/partners"       icon={Handshake}  label="Sponsors"     color="bg-green-500" />
            </div>
          </Card>

          <Card>
            <CardHeader title="Website Overview" />
            <div className="p-5 space-y-4">
              <OverviewRow icon={Eye}      label="Most Viewed Page" value="Home"
                sub="3,248 visits / 30d" />
              <OverviewRow icon={Trophy}   label="Latest Event"
                value={loading ? "…" : (data?.overview?.latestEvent ?? "—")}
                sub="from database" />
              <OverviewRow icon={Calendar} label="Upcoming Event"
                value={loading ? "…" : (data?.overview?.upcomingEvent ?? "—")}
                sub={data?.overview?.upcomingEventDate ? fmtDate(data.overview.upcomingEventDate) : ""} />
              <OverviewRow icon={Users}    label="Latest Athlete"
                value={loading ? "…" : (data?.overview?.latestAthlete ?? "—")}
                sub="from database" />
            </div>
          </Card>
        </div>
      </div>

      {/* Upcoming events table */}
      <Card>
        <CardHeader
          title="Upcoming Tournaments"
          description="Events scheduled in the coming months"
          action={
            <Link href="/admin/events/upcoming" className="text-xs font-semibold text-saffron hover:text-saffron-dark inline-flex items-center gap-1">
              Manage events <ArrowUpRight className="w-3.5 h-3.5" />
            </Link>
          }
        />
        {loading ? (
          <div className="flex items-center justify-center py-12">
            <Loader2 className="w-6 h-6 animate-spin text-slate-400" />
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-slate-50 text-slate-500 text-[11px] uppercase tracking-wider">
                <tr>
                  <th className="text-left font-semibold px-6 py-3">Event</th>
                  <th className="text-left font-semibold px-6 py-3">Date</th>
                  <th className="text-left font-semibold px-6 py-3">Venue</th>
                  <th className="text-left font-semibold px-6 py-3">Registrations</th>
                  <th className="text-left font-semibold px-6 py-3">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {(data?.upcomingEvents ?? []).map((e) => (
                  <tr key={e.id} className="hover:bg-slate-50">
                    <td className="px-6 py-4 font-semibold text-slate-800">{e.title}</td>
                    <td className="px-6 py-4 text-slate-600">
                      <span className="inline-flex items-center gap-1.5">
                        <Calendar className="w-3.5 h-3.5 text-slate-400" />
                        {fmtDate(e.start_date)}{e.end_date && e.end_date !== e.start_date ? ` – ${fmtDate(e.end_date)}` : ""}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-slate-600">
                      <span className="inline-flex items-center gap-1.5">
                        <MapPin className="w-3.5 h-3.5 text-slate-400" />
                        {e.city}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-slate-600">{e.registrations}</td>
                    <td className="px-6 py-4">
                      <Badge color={STATUS_COLOR[e.status] ?? "slate"}>{e.status}</Badge>
                    </td>
                  </tr>
                ))}
                {(data?.upcomingEvents ?? []).length === 0 && (
                  <tr>
                    <td colSpan={5} className="text-center py-10 text-sm text-slate-400">No upcoming events.</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        )}
      </Card>

      {/* Pending approvals */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader title="Pending Approvals" description="Items awaiting your review" />
          {loading ? (
            <div className="flex items-center justify-center py-8">
              <Loader2 className="w-5 h-5 animate-spin text-slate-400" />
            </div>
          ) : (
            <div className="divide-y divide-slate-100">
              {(data?.pendingApprovals ?? []).map((p) => (
                <div key={p.id} className="px-5 sm:px-6 py-3.5 flex items-center justify-between hover:bg-slate-50">
                  <div className="min-w-0">
                    <div className="text-sm font-medium text-slate-800 truncate">{p.type}: {p.name}</div>
                    <div className="text-xs text-slate-500 inline-flex items-center gap-1 mt-0.5">
                      <Clock className="w-3 h-3" /> {timeAgo(p.created_at)}
                    </div>
                  </div>
                  <div className="flex gap-2 shrink-0">
                    <Button size="sm" variant="outline">Review</Button>
                    <Button size="sm" variant="primary">Approve</Button>
                  </div>
                </div>
              ))}
              {(data?.pendingApprovals ?? []).length === 0 && (
                <p className="text-center text-sm text-slate-400 py-8">No pending approvals.</p>
              )}
            </div>
          )}
        </Card>

        <Card>
          <CardHeader title="System Health" />
          <div className="p-5 space-y-3.5">
            {[
              { l: "Athletes in DB",    v: `${stats?.athletes ?? "…"} records`,    p: Math.min(((stats?.athletes ?? 0) / 100) * 100, 100) },
              { l: "Events in DB",      v: `${stats?.events ?? "…"} records`,      p: Math.min(((stats?.events ?? 0) / 20) * 100, 100) },
              { l: "Active Sponsors",   v: `${stats?.partners ?? "…"} partners`,   p: Math.min(((stats?.partners ?? 0) / 20) * 100, 100) },
              { l: "Unread Messages",   v: `${stats?.unread_messages ?? "…"} new`, p: Math.min(((stats?.unread_messages ?? 0) / 50) * 100, 100) },
            ].map((h) => (
              <div key={h.l}>
                <div className="flex justify-between text-xs mb-1.5">
                  <span className="font-semibold text-slate-700">{h.l}</span>
                  <span className="text-slate-500">{h.v}</span>
                </div>
                <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                  <div className="h-full bg-gradient-to-r from-[#0B3D91] to-saffron rounded-full transition-all" style={{ width: `${h.p}%` }} />
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
}

function QuickAction({
  href,
  icon: Icon,
  label,
  color,
}: {
  href: string;
  icon: typeof Users;
  label: string;
  color: string;
}) {
  return (
    <Link
      href={href}
      className="group p-3 rounded-xl border border-slate-200 hover:border-saffron hover:shadow-md transition-all"
    >
      <div className={`w-9 h-9 rounded-lg flex items-center justify-center text-white mb-2 ${color}`}>
        <Icon className="w-4 h-4" />
      </div>
      <div className="text-xs font-semibold text-slate-700 group-hover:text-navy">{label}</div>
    </Link>
  );
}

function OverviewRow({
  icon: Icon,
  label,
  value,
  sub,
}: {
  icon: typeof Users;
  label: string;
  value: string;
  sub: string;
}) {
  return (
    <div className="flex items-center gap-3">
      <div className="w-9 h-9 rounded-lg bg-slate-100 text-slate-500 flex items-center justify-center shrink-0">
        <Icon className="w-4 h-4" />
      </div>
      <div className="flex-1 min-w-0">
        <div className="text-[11px] uppercase tracking-wider text-slate-500 font-semibold">{label}</div>
        <div className="text-sm font-bold text-navy truncate">{value}</div>
      </div>
      <div className="text-[11px] text-slate-400 text-right">{sub}</div>
    </div>
  );
}
