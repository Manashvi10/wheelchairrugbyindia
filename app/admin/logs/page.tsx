"use client";

import { Filter, Download, Search, Edit3, Plus, Trash2, LogIn, LogOut, CheckCircle2 } from "lucide-react";
import { PageHeader, Card, Button, Badge, Input } from "../components/ui";

const LOGS = [
  { user: "Rajiv Kumar", action: "Updated", target: "Home Page · Hero Section", type: "edit", time: "2 min ago", ip: "103.21.x.x" },
  { user: "Priya Sharma", action: "Created", target: "Athlete: Arjun Singh", type: "create", time: "1 hr ago", ip: "157.32.x.x" },
  { user: "Vikram Patel", action: "Published", target: "Event: National Championship 2025", type: "publish", time: "3 hr ago", ip: "182.71.x.x" },
  { user: "Anita Rao", action: "Uploaded", target: "12 images to Gallery / Events", type: "upload", time: "5 hr ago", ip: "49.36.x.x" },
  { user: "Rajiv Kumar", action: "Logged in", target: "—", type: "login", time: "Yesterday 09:14", ip: "103.21.x.x" },
  { user: "Sumit Bose", action: "Deleted", target: "Testimonial #42", type: "delete", time: "2 days ago", ip: "117.55.x.x" },
  { user: "Priya Sharma", action: "Logged out", target: "—", type: "logout", time: "2 days ago", ip: "157.32.x.x" },
];

const ICON: Record<string, { icon: typeof Edit3; color: string }> = {
  edit: { icon: Edit3, color: "bg-blue-100 text-blue-600" },
  create: { icon: Plus, color: "bg-green-100 text-green-600" },
  publish: { icon: CheckCircle2, color: "bg-orange-100 text-orange-600" },
  upload: { icon: Plus, color: "bg-purple-100 text-purple-600" },
  delete: { icon: Trash2, color: "bg-red-100 text-red-600" },
  login: { icon: LogIn, color: "bg-slate-100 text-slate-600" },
  logout: { icon: LogOut, color: "bg-slate-100 text-slate-600" },
};

export default function LogsPage() {
  return (
    <div className="space-y-6">
      <PageHeader
        title="Activity Logs"
        subtitle="Audit trail of every action taken in the admin panel."
        breadcrumbs={[{ label: "Admin", href: "/admin" }, { label: "Activity Logs" }]}
        actions={
          <>
            <Button variant="outline"><Filter className="w-4 h-4" /> Filter</Button>
            <Button variant="primary"><Download className="w-4 h-4" /> Export Logs</Button>
          </>
        }
      />

      <Card>
        <div className="px-5 sm:px-6 py-4 border-b border-slate-100">
          <div className="relative max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <Input placeholder="Search by user, action or target..." className="pl-10" />
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-slate-50 text-slate-500 text-[11px] uppercase tracking-wider">
              <tr>
                <th className="text-left font-semibold px-6 py-3">Action</th>
                <th className="text-left font-semibold px-6 py-3">User</th>
                <th className="text-left font-semibold px-6 py-3">Target</th>
                <th className="text-left font-semibold px-6 py-3">IP</th>
                <th className="text-left font-semibold px-6 py-3">Time</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {LOGS.map((l, i) => {
                const meta = ICON[l.type];
                const Icon = meta.icon;
                return (
                  <tr key={i} className="hover:bg-slate-50">
                    <td className="px-6 py-3">
                      <div className="flex items-center gap-3">
                        <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${meta.color}`}>
                          <Icon className="w-3.5 h-3.5" />
                        </div>
                        <Badge color="slate">{l.action}</Badge>
                      </div>
                    </td>
                    <td className="px-6 py-3 font-semibold text-slate-700">{l.user}</td>
                    <td className="px-6 py-3 text-slate-600">{l.target}</td>
                    <td className="px-6 py-3 text-slate-500 font-mono text-xs">{l.ip}</td>
                    <td className="px-6 py-3 text-slate-500 text-xs">{l.time}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
}
