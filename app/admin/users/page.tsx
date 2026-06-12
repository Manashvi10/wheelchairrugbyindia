"use client";

import { Plus, Edit3, Trash2, Shield, MoreHorizontal } from "lucide-react";
import { PageHeader, Card, Button, Badge } from "../components/ui";

const USERS = [
  { name: "Rajiv Kumar", email: "admin@wrfi.org", role: "Super Admin", lastLogin: "Just now", status: "Active" },
  { name: "Priya Sharma", email: "priya@wrfi.org", role: "Content Manager", lastLogin: "2 hours ago", status: "Active" },
  { name: "Vikram Patel", email: "vikram@wrfi.org", role: "Event Manager", lastLogin: "Yesterday", status: "Active" },
  { name: "Anita Rao", email: "anita@wrfi.org", role: "Media Manager", lastLogin: "3 days ago", status: "Active" },
  { name: "Sumit Bose", email: "sumit@wrfi.org", role: "Content Manager", lastLogin: "2 weeks ago", status: "Inactive" },
];

const ROLES = [
  { name: "Super Admin", desc: "Full access to all modules and settings", count: 1, color: "red" as const },
  { name: "Content Manager", desc: "Manage website pages, athletes, events", count: 2, color: "blue" as const },
  { name: "Event Manager", desc: "Create & manage events and registrations", count: 1, color: "orange" as const },
  { name: "Media Manager", desc: "Upload & organize gallery and videos", count: 1, color: "green" as const },
];

export default function UsersPage() {
  return (
    <div className="space-y-6">
      <PageHeader
        title="Admin Users"
        subtitle="Manage team members, roles and permissions."
        breadcrumbs={[{ label: "Admin", href: "/admin" }, { label: "Admin Users" }]}
        actions={<Button variant="secondary"><Plus className="w-4 h-4" /> Invite User</Button>}
      />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {ROLES.map((r) => (
          <Card key={r.name} className="p-5">
            <Shield className="w-5 h-5 text-saffron mb-3" />
            <div className="font-semibold text-navy mb-1">{r.name}</div>
            <div className="text-xs text-slate-500 mb-3 leading-relaxed">{r.desc}</div>
            <div className="flex items-center justify-between">
              <Badge color={r.color}>{r.count} user{r.count > 1 ? "s" : ""}</Badge>
              <button className="text-xs font-semibold text-saffron hover:text-saffron-dark">Manage →</button>
            </div>
          </Card>
        ))}
      </div>

      <Card>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-slate-50 text-slate-500 text-[11px] uppercase tracking-wider">
              <tr>
                <th className="text-left font-semibold px-6 py-3">User</th>
                <th className="text-left font-semibold px-6 py-3">Role</th>
                <th className="text-left font-semibold px-6 py-3">Last Login</th>
                <th className="text-left font-semibold px-6 py-3">Status</th>
                <th className="text-left font-semibold px-6 py-3"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {USERS.map((u) => (
                <tr key={u.email} className="hover:bg-slate-50">
                  <td className="px-6 py-3">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-[#0B3D91] to-[#1b77a8] text-white font-bold flex items-center justify-center">
                        {u.name.split(" ").map((n) => n[0]).join("")}
                      </div>
                      <div>
                        <div className="font-semibold text-slate-800">{u.name}</div>
                        <div className="text-xs text-slate-500">{u.email}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-3"><Badge color="blue">{u.role}</Badge></td>
                  <td className="px-6 py-3 text-slate-600 text-xs">{u.lastLogin}</td>
                  <td className="px-6 py-3"><Badge color={u.status === "Active" ? "green" : "slate"}>{u.status}</Badge></td>
                  <td className="px-6 py-3">
                    <div className="flex items-center gap-1">
                      <button className="p-1.5 text-slate-400 hover:text-saffron rounded hover:bg-slate-100"><Edit3 className="w-3.5 h-3.5" /></button>
                      <button className="p-1.5 text-slate-400 hover:text-red-600 rounded hover:bg-slate-100"><Trash2 className="w-3.5 h-3.5" /></button>
                      <button className="p-1.5 text-slate-400 hover:text-slate-700 rounded hover:bg-slate-100"><MoreHorizontal className="w-3.5 h-3.5" /></button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
}
