"use client";

import { useState, useEffect, useCallback } from "react";
import { Plus, Calendar, MapPin, Users, Edit3, Trash2, Loader2, X, Save } from "lucide-react";
import { PageHeader, Card, Button, Badge, Input, Select, Field, Textarea } from "../../components/ui";
import { formatDateIST as fmt } from "@/app/lib/datetime";

type Event = {
  id: number; title: string; start_date: string; end_date: string;
  venue: string; city: string; registrations: number; status: string; description: string;
};

const STATUS_COLOR: Record<string, "green"|"blue"|"yellow"|"orange"|"slate"> = {
  Published:"green", Open:"blue", Draft:"yellow", Scheduled:"orange", Completed:"slate", Cancelled:"slate",
};

const BLANK = { title:"", start_date:"", end_date:"", venue:"", city:"", registrations:0, status:"Draft", description:"" };

export default function UpcomingEventsPage() {
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [modal, setModal] = useState<"add"|"edit"|null>(null);
  const [form, setForm] = useState(BLANK);
  const [editId, setEditId] = useState<number|null>(null);

  const load = useCallback(async () => {
    setLoading(true);
    const res = await fetch("/api/events?filter=upcoming");
    const data = await res.json();
    setEvents(data.events ?? []);
    setLoading(false);
  }, []);

  useEffect(() => { load(); }, [load]);

  const openAdd = () => { setForm(BLANK); setEditId(null); setModal("add"); };
  const openEdit = (e: Event) => {
    setForm({ title:e.title, start_date:e.start_date?.slice(0,10)??"",
      end_date:e.end_date?.slice(0,10)??"", venue:e.venue, city:e.city,
      registrations:e.registrations, status:e.status, description:e.description });
    setEditId(e.id); setModal("edit");
  };

  const handleSave = async () => {
    setSaving(true);
    const url = modal === "edit" ? `/api/events/${editId}` : "/api/events";
    await fetch(url, { method: modal==="edit"?"PUT":"POST",
      headers:{"Content-Type":"application/json"}, body:JSON.stringify(form) });
    setSaving(false); setModal(null); load();
  };

  const handleDelete = async (e: Event) => {
    if (!confirm(`Delete event "${e.title}"?`)) return;
    await fetch(`/api/events/${e.id}`, { method:"DELETE" });
    load();
  };

  const f = (k: keyof typeof form) => (ev: React.ChangeEvent<HTMLInputElement|HTMLTextAreaElement|HTMLSelectElement>) =>
    setForm({ ...form, [k]: ev.target.value });

  return (
    <div className="space-y-6">
      <PageHeader
        title="Upcoming Events"
        subtitle="Manage tournaments scheduled for the future."
        breadcrumbs={[{label:"Admin",href:"/admin"},{label:"Events"},{label:"Upcoming"}]}
        actions={<Button variant="secondary" onClick={openAdd}><Plus className="w-4 h-4"/> Create Event</Button>}
      />

      {loading ? (
        <div className="flex items-center justify-center py-20"><Loader2 className="w-6 h-6 animate-spin text-slate-400"/></div>
      ) : (
        <Card>
          <div className="divide-y divide-slate-100">
            {events.map((e) => (
              <div key={e.id} className="px-5 sm:px-6 py-4 flex flex-col md:flex-row md:items-center gap-4 hover:bg-slate-50">
                <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-[#0B3D91] to-saffron text-white flex flex-col items-center justify-center shrink-0">
                  <Calendar className="w-4 h-4 mb-0.5"/>
                  <span className="text-[10px] font-bold">{new Date(e.start_date).toLocaleString("en-IN",{month:"short", timeZone:"Asia/Kolkata"})}</span>
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex flex-wrap items-center gap-2 mb-1">
                    <h3 className="font-semibold text-slate-800">{e.title}</h3>
                    <Badge color={STATUS_COLOR[e.status]??"slate"}>{e.status}</Badge>
                  </div>
                  <div className="flex flex-wrap gap-x-4 gap-y-1 text-xs text-slate-500">
                    <span className="inline-flex items-center gap-1"><Calendar className="w-3 h-3"/> {fmt(e.start_date)}{e.end_date&&e.end_date!==e.start_date?` – ${fmt(e.end_date)}`:""}</span>
                    <span className="inline-flex items-center gap-1"><MapPin className="w-3 h-3"/> {e.venue}, {e.city}</span>
                    <span className="inline-flex items-center gap-1"><Users className="w-3 h-3"/> {e.registrations} registrations</span>
                  </div>
                </div>
                <div className="flex items-center gap-1">
                  <button onClick={() => openEdit(e)} className="p-2 text-slate-400 hover:text-saffron rounded hover:bg-slate-100"><Edit3 className="w-3.5 h-3.5"/></button>
                  <button onClick={() => handleDelete(e)} className="p-2 text-slate-400 hover:text-red-600 rounded hover:bg-slate-100"><Trash2 className="w-3.5 h-3.5"/></button>
                </div>
              </div>
            ))}
            {events.length === 0 && <p className="text-center py-12 text-sm text-slate-400">No upcoming events. Create one!</p>}
          </div>
        </Card>
      )}

      {modal && (
        <div className="fixed inset-0 z-50 flex">
          <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={() => setModal(null)}/>
          <div className="relative ml-auto w-full max-w-lg bg-white h-full overflow-y-auto shadow-2xl flex flex-col">
            <div className="flex items-center justify-between px-6 py-4 border-b border-slate-200">
              <h2 className="text-lg font-bold text-navy">{modal==="add"?"Create Event":"Edit Event"}</h2>
              <button onClick={() => setModal(null)} className="p-2 text-slate-400 hover:text-slate-700 rounded-lg hover:bg-slate-100"><X className="w-5 h-5"/></button>
            </div>
            <div className="flex-1 p-6 space-y-4">
              <Field label="Event Title" required>
                <Input value={form.title} onChange={f("title")} placeholder="National Championship 2026"/>
              </Field>
              <div className="grid grid-cols-2 gap-4">
                <Field label="Start Date" required>
                  <Input type="date" value={form.start_date} onChange={f("start_date")}/>
                </Field>
                <Field label="End Date">
                  <Input type="date" value={form.end_date} onChange={f("end_date")}/>
                </Field>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <Field label="Venue">
                  <Input value={form.venue} onChange={f("venue")} placeholder="Stadium name"/>
                </Field>
                <Field label="City">
                  <Input value={form.city} onChange={f("city")} placeholder="New Delhi"/>
                </Field>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <Field label="Status">
                  <Select value={form.status} onChange={f("status")}>
                    {["Draft","Open","Published","Scheduled","Completed","Cancelled"].map(s=><option key={s}>{s}</option>)}
                  </Select>
                </Field>
                <Field label="Registrations">
                  <Input type="number" min={0} value={form.registrations}
                    onChange={(e) => setForm({...form, registrations:Number(e.target.value)})}/>
                </Field>
              </div>
              <Field label="Description">
                <Textarea rows={3} value={form.description} onChange={f("description")} placeholder="Brief description…"/>
              </Field>
            </div>
            <div className="px-6 py-4 border-t border-slate-200 flex justify-end gap-3">
              <Button variant="outline" onClick={() => setModal(null)}>Cancel</Button>
              <Button variant="secondary" onClick={handleSave} disabled={saving||!form.title||!form.start_date}>
                {saving?<Loader2 className="w-4 h-4 animate-spin"/>:<Save className="w-4 h-4"/>}
                {modal==="add"?"Create Event":"Save Changes"}
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
