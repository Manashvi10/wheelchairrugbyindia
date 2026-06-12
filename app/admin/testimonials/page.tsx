"use client";

import { Plus, Star, Check, X, Search } from "lucide-react";
import { PageHeader, Card, Button, Badge, Input } from "../components/ui";

const TESTIMONIALS = [
  { name: "Neha Verma", role: "Athlete, Maharashtra", rating: 5, status: "Approved" as const, msg: "WRFI changed my life — the support and platform they provide is unmatched." },
  { name: "Mohan Das", role: "Coach, Karnataka", rating: 5, status: "Pending" as const, msg: "An incredibly well-run federation. Proud to be associated with their training programs." },
  { name: "Rakesh Iyer", role: "Volunteer", rating: 4, status: "Approved" as const, msg: "Volunteering at WRFI events has been the most rewarding experience." },
  { name: "Sunita Pillai", role: "Parent", rating: 5, status: "Pending" as const, msg: "My son discovered his passion through WRFI's school outreach program." },
  { name: "Aman Khanna", role: "Sponsor", rating: 5, status: "Featured" as const, msg: "The transparency and impact reporting from WRFI is exemplary." },
];

export default function TestimonialsPage() {
  return (
    <div className="space-y-6">
      <PageHeader
        title="Testimonials"
        subtitle="Approve, feature or reject testimonials submitted across the website."
        breadcrumbs={[{ label: "Admin", href: "/admin" }, { label: "Testimonials" }]}
        actions={<Button variant="secondary"><Plus className="w-4 h-4" /> Add Testimonial</Button>}
      />

      <Card>
        <div className="px-5 sm:px-6 py-4 border-b border-slate-100 flex items-center gap-3">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <Input placeholder="Search testimonials..." className="pl-10" />
          </div>
          <div className="ml-auto flex gap-1 text-xs">
            {["All", "Pending", "Approved", "Featured", "Rejected"].map((t, i) => (
              <button key={t} className={`px-3 py-1.5 rounded-lg font-semibold ${i === 0 ? "bg-[#0B3D91] text-white" : "text-slate-600 hover:bg-slate-100"}`}>{t}</button>
            ))}
          </div>
        </div>

        <div className="divide-y divide-slate-100">
          {TESTIMONIALS.map((t) => (
            <div key={t.name} className="px-5 sm:px-6 py-4 flex items-start gap-4">
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 text-white flex items-center justify-center font-bold shrink-0">
                {t.name[0]}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex flex-wrap items-center gap-2 mb-1">
                  <h3 className="font-semibold text-slate-800">{t.name}</h3>
                  <span className="text-xs text-slate-500">· {t.role}</span>
                  <span className="text-saffron text-xs ml-1">{[...Array(t.rating)].map((_, i) => <Star key={i} className="w-3 h-3 inline fill-saffron" />)}</span>
                  <Badge color={t.status === "Approved" ? "green" : t.status === "Featured" ? "orange" : "yellow"}>{t.status}</Badge>
                </div>
                <p className="text-sm text-slate-600 leading-relaxed">"{t.msg}"</p>
              </div>
              <div className="flex items-center gap-1 shrink-0">
                <button className="p-2 text-slate-400 hover:text-green-600 hover:bg-green-50 rounded-lg" title="Approve"><Check className="w-4 h-4" /></button>
                <button className="p-2 text-slate-400 hover:text-saffron hover:bg-orange-50 rounded-lg" title="Feature"><Star className="w-4 h-4" /></button>
                <button className="p-2 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg" title="Reject"><X className="w-4 h-4" /></button>
              </div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}
