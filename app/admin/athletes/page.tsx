"use client";

import { useState, useEffect, useCallback } from "react";
import {
  Plus, Search, Edit3, Trash2, Star, Users, Loader2, X, Save,
} from "lucide-react";
import { PageHeader, Card, Button, Badge, Input, Select, Field, Textarea, Toggle } from "../components/ui";

type Athlete = {
  id: number;
  athlete_id: string;
  name: string;
  state: string;
  city: string;
  category: string;
  position: string;
  status: "Active" | "Inactive" | "Retired";
  featured: number;
  achievements: number;
  bio: string;
  joined_date: string;
};

const BLANK: Omit<Athlete, "id" | "athlete_id"> = {
  name: "", state: "", city: "", category: "1.0", position: "Low Pointer",
  status: "Active", featured: 0, achievements: 0, bio: "", joined_date: "",
};

export default function AthletesPage() {
  const [athletes, setAthletes] = useState<Athlete[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [query, setQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [modal, setModal] = useState<"add" | "edit" | null>(null);
  const [form, setForm] = useState<Omit<Athlete, "id" | "athlete_id">>(BLANK);
  const [editId, setEditId] = useState<number | null>(null);

  const load = useCallback(async () => {
    setLoading(true);
    const params = new URLSearchParams();
    if (query) params.set("q", query);
    if (statusFilter) params.set("status", statusFilter);
    const res = await fetch(`/api/athletes?${params}`);
    const data = await res.json();
    setAthletes(data.athletes ?? []);
    setLoading(false);
  }, [query, statusFilter]);

  useEffect(() => { load(); }, [load]);

  const openAdd = () => { setForm(BLANK); setEditId(null); setModal("add"); };
  const openEdit = (a: Athlete) => {
    setForm({ name: a.name, state: a.state, city: a.city, category: a.category,
      position: a.position, status: a.status, featured: a.featured,
      achievements: a.achievements, bio: a.bio, joined_date: a.joined_date?.slice(0, 10) ?? "" });
    setEditId(a.id);
    setModal("edit");
  };

  const handleSave = async () => {
    setSaving(true);
    const url = modal === "edit" ? `/api/athletes/${editId}` : "/api/athletes";
    const method = modal === "edit" ? "PUT" : "POST";
    await fetch(url, { method, headers: { "Content-Type": "application/json" }, body: JSON.stringify(form) });
    setSaving(false);
    setModal(null);
    load();
  };

  const handleDelete = async (a: Athlete) => {
    if (!confirm(`Delete athlete "${a.name}"? This cannot be undone.`)) return;
    await fetch(`/api/athletes/${a.id}`, { method: "DELETE" });
    load();
  };

  const counts = {
    total: athletes.length,
    active: athletes.filter((a) => a.status === "Active").length,
    featured: athletes.filter((a) => a.featured).length,
    retired: athletes.filter((a) => a.status === "Retired").length,
  };

  return (
    <div className="space-y-6">
      <PageHeader
        title="Athletes"
        subtitle="Manage athlete profiles, classifications and achievements."
        breadcrumbs={[{ label: "Admin", href: "/admin" }, { label: "Athletes" }]}
        actions={
          <Button variant="secondary" onClick={openAdd}>
            <Plus className="w-4 h-4" /> Add Athlete
          </Button>
        }
      />

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { l: "Total", v: counts.total, c: "text-[#0B3D91]" },
          { l: "Active", v: counts.active, c: "text-green-600" },
          { l: "Featured", v: counts.featured, c: "text-saffron" },
          { l: "Retired", v: counts.retired, c: "text-slate-500" },
        ].map((s) => (
          <Card key={s.l} className="p-4">
            <div className="text-[11px] uppercase tracking-wider text-slate-500 font-semibold mb-1">{s.l}</div>
            <div className={`text-2xl font-bold ${s.c}`}>{loading ? "…" : s.v}</div>
          </Card>
        ))}
      </div>

      <Card>
        <div className="px-5 sm:px-6 py-4 border-b border-slate-100 flex flex-col sm:flex-row gap-3 sm:items-center sm:justify-between">
          <div className="flex flex-col sm:flex-row gap-2 flex-1 max-w-2xl">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <Input value={query} onChange={(e) => setQuery(e.target.value)}
                placeholder="Search by name, state, ID…" className="pl-10" />
            </div>
            <Select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)} className="sm:w-44">
              <option value="">All Statuses</option>
              <option value="Active">Active</option>
              <option value="Inactive">Inactive</option>
              <option value="Retired">Retired</option>
            </Select>
          </div>
        </div>

        {loading ? (
          <div className="flex items-center justify-center py-16">
            <Loader2 className="w-6 h-6 animate-spin text-slate-400" />
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-slate-50 text-slate-500 text-[11px] uppercase tracking-wider">
                <tr>
                  <th className="text-left font-semibold px-6 py-3">Athlete</th>
                  <th className="text-left font-semibold px-6 py-3">Location</th>
                  <th className="text-left font-semibold px-6 py-3">Class</th>
                  <th className="text-left font-semibold px-6 py-3">Position</th>
                  <th className="text-left font-semibold px-6 py-3">Achievements</th>
                  <th className="text-left font-semibold px-6 py-3">Status</th>
                  <th className="text-left font-semibold px-6 py-3 w-24"></th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {athletes.map((a) => (
                  <tr key={a.id} className="hover:bg-slate-50">
                    <td className="px-6 py-3">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-blue-500 to-indigo-600 text-white font-bold flex items-center justify-center shrink-0 text-sm">
                          {a.name.split(" ").map((n) => n[0]).join("")}
                        </div>
                        <div className="min-w-0">
                          <div className="font-semibold text-slate-800 inline-flex items-center gap-1.5">
                            {a.name}
                            {!!a.featured && <Star className="w-3 h-3 text-saffron fill-saffron" />}
                          </div>
                          <div className="text-xs text-slate-500">{a.athlete_id}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-3 text-slate-600">
                      <div>{a.city}</div>
                      <div className="text-xs text-slate-400">{a.state}</div>
                    </td>
                    <td className="px-6 py-3"><Badge color="blue">{a.category}</Badge></td>
                    <td className="px-6 py-3 text-slate-600">{a.position}</td>
                    <td className="px-6 py-3 text-slate-600">{a.achievements}</td>
                    <td className="px-6 py-3">
                      <Badge color={a.status === "Active" ? "green" : a.status === "Inactive" ? "yellow" : "slate"}>
                        {a.status}
                      </Badge>
                    </td>
                    <td className="px-6 py-3">
                      <div className="flex items-center gap-1">
                        <button onClick={() => openEdit(a)} className="p-1.5 text-slate-400 hover:text-saffron rounded hover:bg-slate-100">
                          <Edit3 className="w-3.5 h-3.5" />
                        </button>
                        <button onClick={() => handleDelete(a)} className="p-1.5 text-slate-400 hover:text-red-600 rounded hover:bg-slate-100">
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            {athletes.length === 0 && (
              <div className="text-center py-12 text-slate-500">
                <Users className="w-10 h-10 mx-auto mb-2 text-slate-300" />
                <div className="text-sm">No athletes found</div>
              </div>
            )}
          </div>
        )}

        <div className="px-6 py-3 border-t border-slate-100 text-xs text-slate-500">
          {athletes.length} athletes shown
        </div>
      </Card>

      {/* Add / Edit Modal */}
      {modal && (
        <div className="fixed inset-0 z-50 flex">
          <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={() => setModal(null)} />
          <div className="relative ml-auto w-full max-w-lg bg-white h-full overflow-y-auto shadow-2xl flex flex-col">
            <div className="flex items-center justify-between px-6 py-4 border-b border-slate-200">
              <h2 className="text-lg font-bold text-navy">{modal === "add" ? "Add Athlete" : "Edit Athlete"}</h2>
              <button onClick={() => setModal(null)} className="p-2 text-slate-400 hover:text-slate-700 rounded-lg hover:bg-slate-100">
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="flex-1 p-6 space-y-4">
              <Field label="Full Name" required>
                <Input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} placeholder="e.g. Arjun Singh" />
              </Field>
              <div className="grid grid-cols-2 gap-4">
                <Field label="State">
                  <Input value={form.state} onChange={(e) => setForm({ ...form, state: e.target.value })} placeholder="Punjab" />
                </Field>
                <Field label="City">
                  <Input value={form.city} onChange={(e) => setForm({ ...form, city: e.target.value })} placeholder="Amritsar" />
                </Field>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <Field label="Classification">
                  <Select value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })}>
                    {["0.5","1.0","1.5","2.0","2.5","3.0","3.5"].map((c) => <option key={c}>{c}</option>)}
                  </Select>
                </Field>
                <Field label="Position">
                  <Select value={form.position} onChange={(e) => setForm({ ...form, position: e.target.value })}>
                    <option>Low Pointer</option>
                    <option>Mid Pointer</option>
                    <option>High Pointer</option>
                  </Select>
                </Field>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <Field label="Status">
                  <Select value={form.status} onChange={(e) => setForm({ ...form, status: e.target.value as Athlete["status"] })}>
                    <option>Active</option>
                    <option>Inactive</option>
                    <option>Retired</option>
                  </Select>
                </Field>
                <Field label="Achievements">
                  <Input type="number" min={0} value={form.achievements} onChange={(e) => setForm({ ...form, achievements: Number(e.target.value) })} />
                </Field>
              </div>
              <Field label="Joined Date">
                <Input type="date" value={form.joined_date} onChange={(e) => setForm({ ...form, joined_date: e.target.value })} />
              </Field>
              <Field label="Bio">
                <Textarea rows={3} value={form.bio} onChange={(e) => setForm({ ...form, bio: e.target.value })} placeholder="Short bio…" />
              </Field>
              <Toggle checked={!!form.featured} onChange={(v) => setForm({ ...form, featured: v ? 1 : 0 })} label="Featured athlete" />
            </div>
            <div className="px-6 py-4 border-t border-slate-200 flex justify-end gap-3">
              <Button variant="outline" onClick={() => setModal(null)}>Cancel</Button>
              <Button variant="secondary" onClick={handleSave} disabled={saving || !form.name}>
                {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
                {modal === "add" ? "Add Athlete" : "Save Changes"}
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
