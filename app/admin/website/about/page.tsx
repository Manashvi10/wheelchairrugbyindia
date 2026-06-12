"use client";

import { useState, useEffect, useCallback } from "react";
import {
  Info, Users, FileText, Handshake,
  Eye, Plus, Trash2, ChevronUp, ChevronDown,
  Save, Loader2, CheckCircle2, Upload, Edit3, X,
} from "lucide-react";
import { PageHeader, Card, Button, Field, Input, Textarea, Toggle, Badge } from "../../components/ui";

/* ─── Tab config ─── */
const TABS = [
  { id: "about_wrfi", label: "About WRFI", icon: Info },
  { id: "committee", label: "Committee Members", icon: Users },
  { id: "selection", label: "Selection Policy", icon: FileText },
  { id: "partners", label: "Our Partners", icon: Handshake },
];

/* ─── Types ─── */
type CommitteeMember = { id: number; name: string; designation: string; bio: string; image_url: string | null; sort_order: number; is_active: number };
type Partner = { id: number; name: string; logo_url: string | null; website: string; category: string; featured: number; status: string; sort_order: number };

/* ─── Shared helpers ─── */
function SectionToggleHeader({ title, description, enabled, onToggle }: { title: string; description: string; enabled: boolean; onToggle: (v: boolean) => void }) {
  return (
    <div className="flex items-start justify-between gap-4 px-5 sm:px-6 py-4 border-b border-slate-100">
      <div>
        <h3 className="text-base font-semibold text-navy">{title}</h3>
        <p className="text-xs text-slate-500 mt-0.5">{description}</p>
      </div>
      <div className="flex items-center gap-3">
        <Badge color={enabled ? "green" : "slate"}>{enabled ? "Visible" : "Hidden"}</Badge>
        <Toggle checked={enabled} onChange={onToggle} />
      </div>
    </div>
  );
}

function SaveBar({ saving, saved, onSave }: { saving: boolean; saved: boolean; onSave: () => void }) {
  return (
    <div className="px-5 sm:px-6 py-3 border-t border-slate-100 flex items-center justify-between gap-3 bg-slate-50/60 rounded-b-xl">
      {saved
        ? <span className="text-green-600 text-sm font-medium flex items-center gap-1.5"><CheckCircle2 className="w-4 h-4" /> Saved successfully</span>
        : <span className="text-xs text-slate-400">Changes will be published to the live website</span>}
      <Button variant="primary" onClick={onSave} disabled={saving}>
        {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
        {saving ? "Saving…" : "Save Changes"}
      </Button>
    </div>
  );
}

function SectionLoader() {
  return (
    <Card>
      <div className="flex items-center justify-center py-20 gap-3 text-slate-400">
        <Loader2 className="w-5 h-5 animate-spin" />
        <span className="text-sm">Loading…</span>
      </div>
    </Card>
  );
}

function ImageUploader({ value, onChange, label, aspect = "video" }: { value?: string; onChange: (url: string) => void; label: string; aspect?: "video" | "square" }) {
  const [uploading, setUploading] = useState(false);
  const id = `upload-${label.replace(/\W+/g, "-")}`;
  const handleFile = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]; if (!file) return;
    setUploading(true);
    const fd = new FormData(); fd.append("file", file);
    try { const res = await fetch("/api/upload", { method: "POST", body: fd }); const d = await res.json(); if (d.url) onChange(d.url); } catch { /* ignore */ }
    setUploading(false); e.target.value = "";
  };
  return (
    <div>
      <label className="block text-xs font-semibold text-slate-700 mb-1.5">{label}</label>
      <div className={`${aspect === "square" ? "aspect-square" : "aspect-video"} bg-slate-50 border-2 border-dashed border-slate-200 rounded-xl flex flex-col items-center justify-center text-center p-4 hover:border-saffron hover:bg-orange-50/30 transition cursor-pointer relative overflow-hidden`}
        onClick={() => document.getElementById(id)?.click()}>
        {value ? (
          <><img src={value} alt="" className="absolute inset-0 w-full h-full object-cover rounded-xl" />
            <div className="absolute inset-0 bg-black/40 opacity-0 hover:opacity-100 transition flex items-center justify-center rounded-xl">
              <span className="text-white text-sm font-semibold flex items-center gap-2"><Upload className="w-4 h-4" /> Change</span>
            </div></>
        ) : uploading ? <Loader2 className="w-8 h-8 text-saffron animate-spin" /> : (
          <><Upload className="w-6 h-6 text-slate-400 mb-2" /><div className="text-xs font-semibold text-slate-600">Click to upload</div><div className="text-[11px] text-slate-400 mt-0.5">PNG, JPG up to 5MB</div></>
        )}
        {uploading && value && <div className="absolute inset-0 bg-black/50 flex items-center justify-center rounded-xl"><Loader2 className="w-8 h-8 text-white animate-spin" /></div>}
      </div>
      <input id={id} type="file" accept="image/*" className="hidden" onChange={handleFile} />
    </div>
  );
}

async function loadSection(key: string) {
  const res = await fetch(`/api/about-sections/${key}`);
  return res.json();
}
async function saveSection(key: string, data: unknown, is_enabled: boolean) {
  await fetch(`/api/about-sections/${key}`, { method: "PUT", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ data, is_enabled }) });
}

/* ─── Main Page ─── */
export default function AboutCMS() {
  const [active, setActive] = useState("about_wrfi");
  return (
    <div className="space-y-6">
      <PageHeader title="About Us — CMS" subtitle="Manage all About section pages from one place."
        breadcrumbs={[{ label: "Admin", href: "/admin" }, { label: "Website Management" }, { label: "About Us" }]}
        actions={<Button variant="outline" onClick={() => window.open("/about", "_blank")}><Eye className="w-4 h-4" /> Preview</Button>} />
      <div className="grid grid-cols-1 lg:grid-cols-[240px_1fr] gap-6">
        <Card className="p-2 h-fit lg:sticky lg:top-20">
          <div className="px-3 py-2 text-[10px] font-bold uppercase tracking-widest text-slate-400">Sections</div>
          <ul className="space-y-0.5">
            {TABS.map((t, i) => {
              const Icon = t.icon; const isActive = active === t.id;
              return (
                <li key={t.id}>
                  <button onClick={() => setActive(t.id)} className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm transition ${isActive ? "bg-saffron text-white font-semibold shadow" : "text-slate-700 hover:bg-slate-100"}`}>
                    <span className={`w-5 h-5 rounded text-[10px] font-bold flex items-center justify-center ${isActive ? "bg-white/20" : "bg-slate-100 text-slate-500"}`}>{String(i + 1).padStart(2, "0")}</span>
                    <Icon className="w-3.5 h-3.5 shrink-0" />
                    <span className="truncate text-left">{t.label}</span>
                  </button>
                </li>
              );
            })}
          </ul>
        </Card>
        <div className="space-y-6 min-w-0">
          {active === "about_wrfi" && <AboutWRFITab />}
          {active === "committee" && <CommitteeTab />}
          {active === "selection" && <SelectionPolicyTab />}
          {active === "partners" && <PartnersTab />}
        </div>
      </div>
    </div>
  );
}

/* ══════════════════════  TAB 1: ABOUT WRFI  ══════════════════════ */
function AboutWRFITab() {
  return (
    <div className="space-y-6">
      <HeroSection />
      <IntroSection />
      <HistorySection />
      <JourneySection />
      <OurAimSection />
    </div>
  );
}

function HeroSection() {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false); const [saved, setSaved] = useState(false);
  const [enabled, setEnabled] = useState(true);
  const [data, setData] = useState({ badge: "Who We Are", title: "About", title_gradient: "WRFI", subtitle: "Championing wheelchair rugby and inclusive sports across India since 2009." });
  useEffect(() => { loadSection("about_hero").then(r => { if (r.data) setData(p => ({ ...p, ...r.data })); setEnabled(!!r.is_enabled); setLoading(false); }).catch(() => setLoading(false)); }, []);
  const save = useCallback(async () => { setSaving(true); await saveSection("about_hero", data, enabled); setSaving(false); setSaved(true); setTimeout(() => setSaved(false), 3000); }, [data, enabled]);
  if (loading) return <SectionLoader />;
  return (
    <Card>
      <SectionToggleHeader title="Page Hero Banner" description="Top banner of the About page with badge, title and subtitle." enabled={enabled} onToggle={setEnabled} />
      <div className="p-5 sm:p-6 grid grid-cols-1 md:grid-cols-2 gap-4">
        <Field label="Badge Text"><Input value={data.badge} onChange={e => setData({ ...data, badge: e.target.value })} /></Field>
        <Field label="Title"><Input value={data.title} onChange={e => setData({ ...data, title: e.target.value })} /></Field>
        <Field label="Gradient Word"><Input value={data.title_gradient} onChange={e => setData({ ...data, title_gradient: e.target.value })} /></Field>
        <div className="md:col-span-2"><Field label="Subtitle"><Textarea rows={2} value={data.subtitle} onChange={e => setData({ ...data, subtitle: e.target.value })} /></Field></div>
      </div>
      <SaveBar saving={saving} saved={saved} onSave={save} />
    </Card>
  );
}

function IntroSection() {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false); const [saved, setSaved] = useState(false);
  const [enabled, setEnabled] = useState(true);
  const [data, setData] = useState({ badge: "About Us", title: "Wheelchair Rugby Federation of India", image_url: "/images/abou.png", image_alt: "WRFI team", body1: "", body2: "" });
  useEffect(() => { loadSection("about_intro").then(r => { if (r.data) setData(p => ({ ...p, ...r.data })); setEnabled(!!r.is_enabled); setLoading(false); }).catch(() => setLoading(false)); }, []);
  const save = useCallback(async () => { setSaving(true); await saveSection("about_intro", data, enabled); setSaving(false); setSaved(true); setTimeout(() => setSaved(false), 3000); }, [data, enabled]);
  if (loading) return <SectionLoader />;
  return (
    <Card>
      <SectionToggleHeader title="About WRFI Intro" description="Left-right split: image on left, text on right." enabled={enabled} onToggle={setEnabled} />
      <div className="p-5 sm:p-6 grid grid-cols-1 md:grid-cols-2 gap-5">
        <div className="md:row-span-3"><ImageUploader label="Section Image" value={data.image_url} onChange={url => setData({ ...data, image_url: url })} /></div>
        <Field label="Badge Text"><Input value={data.badge} onChange={e => setData({ ...data, badge: e.target.value })} /></Field>
        <Field label="Section Title"><Input value={data.title} onChange={e => setData({ ...data, title: e.target.value })} /></Field>
        <Field label="Image Alt Text"><Input value={data.image_alt} onChange={e => setData({ ...data, image_alt: e.target.value })} /></Field>
        <div className="md:col-span-2"><Field label="Body Paragraph 1"><Textarea rows={4} value={data.body1} onChange={e => setData({ ...data, body1: e.target.value })} /></Field></div>
        <div className="md:col-span-2"><Field label="Body Paragraph 2"><Textarea rows={4} value={data.body2} onChange={e => setData({ ...data, body2: e.target.value })} /></Field></div>
      </div>
      <SaveBar saving={saving} saved={saved} onSave={save} />
    </Card>
  );
}

type TimelineItem = { year: string; text: string };

function HistorySection() {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false); const [saved, setSaved] = useState(false);
  const [enabled, setEnabled] = useState(true);
  const [data, setData] = useState({ badge: "The Sport", title: "History & Recognition of", title_gradient: "Wheelchair Rugby", body1: "", body2: "", body3: "", timeline: [] as TimelineItem[] });
  useEffect(() => { loadSection("history_recognition").then(r => { if (r.data) setData(p => ({ ...p, ...r.data })); setEnabled(!!r.is_enabled); setLoading(false); }).catch(() => setLoading(false)); }, []);
  const save = useCallback(async () => { setSaving(true); await saveSection("history_recognition", data, enabled); setSaving(false); setSaved(true); setTimeout(() => setSaved(false), 3000); }, [data, enabled]);
  const updateTimeline = (i: number, field: keyof TimelineItem, val: string) => setData(d => ({ ...d, timeline: d.timeline.map((t, idx) => idx === i ? { ...t, [field]: val } : t) }));
  const moveTimeline = (i: number, dir: -1 | 1) => { const arr = [...data.timeline]; const j = i + dir; if (j < 0 || j >= arr.length) return; [arr[i], arr[j]] = [arr[j], arr[i]]; setData(d => ({ ...d, timeline: arr })); };
  if (loading) return <SectionLoader />;
  return (
    <Card>
      <SectionToggleHeader title="History & Recognition" description="History of wheelchair rugby globally with timeline cards." enabled={enabled} onToggle={setEnabled} />
      <div className="p-5 sm:p-6 space-y-5">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Field label="Badge"><Input value={data.badge} onChange={e => setData({ ...data, badge: e.target.value })} /></Field>
          <Field label="Title"><Input value={data.title} onChange={e => setData({ ...data, title: e.target.value })} /></Field>
          <Field label="Gradient Word"><Input value={data.title_gradient} onChange={e => setData({ ...data, title_gradient: e.target.value })} /></Field>
        </div>
        <Field label="Body Paragraph 1"><Textarea rows={3} value={data.body1} onChange={e => setData({ ...data, body1: e.target.value })} /></Field>
        <Field label="Body Paragraph 2"><Textarea rows={3} value={data.body2} onChange={e => setData({ ...data, body2: e.target.value })} /></Field>
        <Field label="Body Paragraph 3"><Textarea rows={3} value={data.body3} onChange={e => setData({ ...data, body3: e.target.value })} /></Field>
        <div>
          <div className="flex items-center justify-between mb-3">
            <p className="text-xs font-semibold text-slate-600">Timeline Items ({data.timeline.length})</p>
            <Button variant="secondary" size="sm" onClick={() => setData(d => ({ ...d, timeline: [...d.timeline, { year: "", text: "" }] }))}><Plus className="w-3.5 h-3.5" /> Add</Button>
          </div>
          <div className="space-y-2">
            {data.timeline.map((item, i) => (
              <div key={i} className="border border-slate-200 rounded-xl p-3 grid grid-cols-[80px_1fr_auto] gap-2 items-start">
                <Field label="Year"><Input value={item.year} onChange={e => updateTimeline(i, "year", e.target.value)} /></Field>
                <Field label="Text"><Input value={item.text} onChange={e => updateTimeline(i, "text", e.target.value)} /></Field>
                <div className="flex items-end gap-1 pb-0.5">
                  <button onClick={() => moveTimeline(i, -1)} className="p-1.5 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded-lg"><ChevronUp className="w-3.5 h-3.5" /></button>
                  <button onClick={() => moveTimeline(i, 1)} className="p-1.5 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded-lg"><ChevronDown className="w-3.5 h-3.5" /></button>
                  <button onClick={() => setData(d => ({ ...d, timeline: d.timeline.filter((_, j) => j !== i) }))} className="p-1.5 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg"><Trash2 className="w-3.5 h-3.5" /></button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <SaveBar saving={saving} saved={saved} onSave={save} />
    </Card>
  );
}

function JourneySection() {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false); const [saved, setSaved] = useState(false);
  const [enabled, setEnabled] = useState(true);
  const [data, setData] = useState({ badge: "India's Story", title: "The Journey in", title_gradient: "India", body1: "", body2: "", body3: "", image_url: "/images/abb.jpg", image_alt: "", stat_number: "220+", stat_label: "Athletes across India" });
  useEffect(() => { loadSection("journey_india").then(r => { if (r.data) setData(p => ({ ...p, ...r.data })); setEnabled(!!r.is_enabled); setLoading(false); }).catch(() => setLoading(false)); }, []);
  const save = useCallback(async () => { setSaving(true); await saveSection("journey_india", data, enabled); setSaving(false); setSaved(true); setTimeout(() => setSaved(false), 3000); }, [data, enabled]);
  if (loading) return <SectionLoader />;
  return (
    <Card>
      <SectionToggleHeader title="The Journey in India" description="India's wheelchair rugby story with stat badge overlay." enabled={enabled} onToggle={setEnabled} />
      <div className="p-5 sm:p-6 grid grid-cols-1 md:grid-cols-2 gap-5">
        <Field label="Badge"><Input value={data.badge} onChange={e => setData({ ...data, badge: e.target.value })} /></Field>
        <Field label="Title"><Input value={data.title} onChange={e => setData({ ...data, title: e.target.value })} /></Field>
        <Field label="Gradient Word"><Input value={data.title_gradient} onChange={e => setData({ ...data, title_gradient: e.target.value })} /></Field>
        <Field label="Stat Number"><Input value={data.stat_number} onChange={e => setData({ ...data, stat_number: e.target.value })} /></Field>
        <Field label="Stat Label"><Input value={data.stat_label} onChange={e => setData({ ...data, stat_label: e.target.value })} /></Field>
        <div className="md:col-span-2"><Field label="Body Paragraph 1"><Textarea rows={3} value={data.body1} onChange={e => setData({ ...data, body1: e.target.value })} /></Field></div>
        <div className="md:col-span-2"><Field label="Body Paragraph 2"><Textarea rows={3} value={data.body2} onChange={e => setData({ ...data, body2: e.target.value })} /></Field></div>
        <div className="md:col-span-2"><Field label="Body Paragraph 3"><Textarea rows={3} value={data.body3} onChange={e => setData({ ...data, body3: e.target.value })} /></Field></div>
        <div className="md:col-span-2"><ImageUploader label="Section Image" value={data.image_url} onChange={url => setData({ ...data, image_url: url })} /></div>
      </div>
      <SaveBar saving={saving} saved={saved} onSave={save} />
    </Card>
  );
}

type AimCard = { icon: string; title: string; description: string; color: string };

function OurAimSection() {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false); const [saved, setSaved] = useState(false);
  const [enabled, setEnabled] = useState(true);
  const [data, setData] = useState({ badge: "Our Purpose", title: "Our", title_gradient: "Aim", subtitle: "", cta_text: "Join the Movement", cta_url: "/contact", cards: [] as AimCard[] });
  useEffect(() => { loadSection("our_aim").then(r => { if (r.data) setData(p => ({ ...p, ...r.data })); setEnabled(!!r.is_enabled); setLoading(false); }).catch(() => setLoading(false)); }, []);
  const save = useCallback(async () => { setSaving(true); await saveSection("our_aim", data, enabled); setSaving(false); setSaved(true); setTimeout(() => setSaved(false), 3000); }, [data, enabled]);
  const updateCard = (i: number, field: keyof AimCard, val: string) => setData(d => ({ ...d, cards: d.cards.map((c, idx) => idx === i ? { ...c, [field]: val } : c) }));
  if (loading) return <SectionLoader />;
  return (
    <Card>
      <SectionToggleHeader title="Our Aim" description="Four aim cards on dark navy background." enabled={enabled} onToggle={setEnabled} />
      <div className="p-5 sm:p-6 space-y-5">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Field label="Badge"><Input value={data.badge} onChange={e => setData({ ...data, badge: e.target.value })} /></Field>
          <Field label="Title"><Input value={data.title} onChange={e => setData({ ...data, title: e.target.value })} /></Field>
          <Field label="Gradient Word"><Input value={data.title_gradient} onChange={e => setData({ ...data, title_gradient: e.target.value })} /></Field>
          <div className="md:col-span-2"><Field label="Subtitle"><Textarea rows={2} value={data.subtitle} onChange={e => setData({ ...data, subtitle: e.target.value })} /></Field></div>
          <Field label="CTA Button Text"><Input value={data.cta_text} onChange={e => setData({ ...data, cta_text: e.target.value })} /></Field>
          <Field label="CTA Button URL"><Input value={data.cta_url} onChange={e => setData({ ...data, cta_url: e.target.value })} /></Field>
        </div>
        <div>
          <div className="flex items-center justify-between mb-3">
            <p className="text-xs font-semibold text-slate-600">Aim Cards ({data.cards.length})</p>
            <Button variant="secondary" size="sm" onClick={() => setData(d => ({ ...d, cards: [...d.cards, { icon: "Target", title: "New Card", description: "", color: "from-saffron to-orange-500" }] }))}><Plus className="w-3.5 h-3.5" /> Add Card</Button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {data.cards.map((c, i) => (
              <div key={i} className="border border-slate-200 rounded-xl p-4 space-y-3">
                <div className="flex justify-end"><button onClick={() => setData(d => ({ ...d, cards: d.cards.filter((_, j) => j !== i) }))} className="p-1.5 text-slate-400 hover:text-red-600"><Trash2 className="w-3.5 h-3.5" /></button></div>
                <Field label="Icon Name"><Input value={c.icon} onChange={e => updateCard(i, "icon", e.target.value)} placeholder="Target, Users, Globe, Flag…" /></Field>
                <Field label="Title"><Input value={c.title} onChange={e => updateCard(i, "title", e.target.value)} /></Field>
                <Field label="Description"><Textarea rows={2} value={c.description} onChange={e => updateCard(i, "description", e.target.value)} /></Field>
                <Field label="Gradient Color"><Input value={c.color} onChange={e => updateCard(i, "color", e.target.value)} placeholder="from-saffron to-orange-500" /></Field>
              </div>
            ))}
          </div>
        </div>
      </div>
      <SaveBar saving={saving} saved={saved} onSave={save} />
    </Card>
  );
}

/* ══════════════════════  TAB 2: COMMITTEE MEMBERS  ══════════════════════ */
function CommitteeTab() {
  const [loading, setLoading] = useState(true);
  const [members, setMembers] = useState<CommitteeMember[]>([]);
  const [editing, setEditing] = useState<CommitteeMember | null>(null);
  const [adding, setAdding] = useState(false);
  const [form, setForm] = useState({ name: "", designation: "", bio: "", image_url: "", sort_order: 0, is_active: 1 });
  const [saving, setSaving] = useState(false);

  const fetchMembers = useCallback(async () => {
    const res = await fetch("/api/committee"); const d = await res.json();
    setMembers(d.members ?? []); setLoading(false);
  }, []);

  useEffect(() => { fetchMembers(); }, [fetchMembers]);

  const openAdd = () => { setForm({ name: "", designation: "", bio: "", image_url: "", sort_order: members.length + 1, is_active: 1 }); setEditing(null); setAdding(true); };
  const openEdit = (m: CommitteeMember) => { setForm({ name: m.name, designation: m.designation, bio: m.bio ?? "", image_url: m.image_url ?? "", sort_order: m.sort_order, is_active: m.is_active }); setEditing(m); setAdding(true); };

  const handleSave = async () => {
    setSaving(true);
    if (editing) {
      await fetch(`/api/committee/${editing.id}`, { method: "PUT", headers: { "Content-Type": "application/json" }, body: JSON.stringify(form) });
    } else {
      await fetch("/api/committee", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(form) });
    }
    setSaving(false); setAdding(false); fetchMembers();
  };

  const handleDelete = async (id: number) => {
    if (!confirm("Delete this member?")) return;
    await fetch(`/api/committee/${id}`, { method: "DELETE" }); fetchMembers();
  };

  const move = async (i: number, dir: -1 | 1) => {
    const arr = [...members]; const j = i + dir; if (j < 0 || j >= arr.length) return;
    [arr[i], arr[j]] = [arr[j], arr[i]];
    await Promise.all([
      fetch(`/api/committee/${arr[i].id}`, { method: "PUT", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ ...arr[i], sort_order: i + 1 }) }),
      fetch(`/api/committee/${arr[j].id}`, { method: "PUT", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ ...arr[j], sort_order: j + 1 }) }),
    ]);
    fetchMembers();
  };

  if (loading) return <SectionLoader />;

  return (
    <div className="space-y-4">
      <Card>
        <div className="flex items-center justify-between px-5 py-4 border-b border-slate-100">
          <div>
            <h3 className="text-base font-semibold text-navy">Committee Members</h3>
            <p className="text-xs text-slate-500 mt-0.5">{members.length} members · Shown on the Leadership page</p>
          </div>
          <Button variant="secondary" size="sm" onClick={openAdd}><Plus className="w-3.5 h-3.5" /> Add Member</Button>
        </div>
        <div className="p-5 sm:p-6 space-y-3">
          {members.length === 0 && <p className="text-center text-slate-400 text-sm py-8">No members yet.</p>}
          {members.map((m, i) => (
            <div key={m.id} className="border border-slate-200 rounded-xl p-4 flex items-center gap-4">
              <div className="w-14 h-14 rounded-xl overflow-hidden bg-slate-100 shrink-0">
                {m.image_url ? <img src={m.image_url} alt={m.name} className="w-full h-full object-cover" /> : <div className="w-full h-full flex items-center justify-center text-slate-400 font-bold text-xl">{m.name[0]}</div>}
              </div>
              <div className="flex-1 min-w-0">
                <div className="font-semibold text-sm text-slate-800 truncate">{m.name}</div>
                <div className="text-xs text-saffron font-semibold uppercase tracking-wide mt-0.5">{m.designation}</div>
                {m.bio && <p className="text-xs text-slate-500 mt-1 line-clamp-1">{m.bio}</p>}
              </div>
              <Badge color={m.is_active ? "green" : "slate"}>{m.is_active ? "Active" : "Hidden"}</Badge>
              <div className="flex items-center gap-1 shrink-0">
                <button onClick={() => move(i, -1)} className="p-1.5 hover:bg-slate-100 rounded-lg text-slate-400"><ChevronUp className="w-3.5 h-3.5" /></button>
                <button onClick={() => move(i, 1)} className="p-1.5 hover:bg-slate-100 rounded-lg text-slate-400"><ChevronDown className="w-3.5 h-3.5" /></button>
                <button onClick={() => openEdit(m)} className="p-1.5 hover:bg-slate-100 rounded-lg text-slate-400"><Edit3 className="w-3.5 h-3.5" /></button>
                <button onClick={() => handleDelete(m.id)} className="p-1.5 hover:bg-red-50 rounded-lg text-slate-400 hover:text-red-600"><Trash2 className="w-3.5 h-3.5" /></button>
              </div>
            </div>
          ))}
        </div>
      </Card>

      {/* Add/Edit Modal */}
      {adding && (
        <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl w-full max-w-md shadow-2xl max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between px-5 py-3.5 border-b border-slate-100 sticky top-0 bg-white rounded-t-2xl z-10">
              <h3 className="font-semibold text-navy text-sm">{editing ? "Edit Member" : "Add Member"}</h3>
              <button onClick={() => setAdding(false)} className="p-1.5 hover:bg-slate-100 rounded-lg"><X className="w-4 h-4" /></button>
            </div>
            <div className="p-5 space-y-4">
              {/* Compact photo uploader */}
              <div className="flex items-center gap-3 p-3 bg-slate-50 rounded-xl border border-slate-200">
                <div className="w-14 h-14 rounded-xl overflow-hidden bg-slate-200 shrink-0 flex items-center justify-center">
                  {form.image_url
                    ? <img src={form.image_url} alt="" className="w-full h-full object-cover" />
                    : <span className="text-slate-400 font-bold text-lg">{form.name?.[0] || "?"}</span>}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-xs font-semibold text-slate-700 mb-1.5">Profile Photo</p>
                  <label className="cursor-pointer inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold border border-slate-200 rounded-lg bg-white hover:bg-slate-50 transition">
                    <Upload className="w-3.5 h-3.5" />
                    Upload Photo
                    <input type="file" className="hidden" accept="image/*" onChange={async (e) => {
                      const file = e.target.files?.[0]; if (!file) return;
                      const fd = new FormData(); fd.append("file", file);
                      try { const res = await fetch("/api/upload", { method: "POST", body: fd }); const d = await res.json(); if (d.url) setForm(f => ({ ...f, image_url: d.url })); } catch { /**/ }
                      e.target.value = "";
                    }} />
                  </label>
                  {form.image_url && <p className="text-[11px] text-slate-400 mt-1 truncate">{form.image_url.split("/").pop()}</p>}
                </div>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <Field label="Full Name" required><Input value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} /></Field>
                <Field label="Designation" required><Input value={form.designation} onChange={e => setForm({ ...form, designation: e.target.value })} placeholder="President, Mentor…" /></Field>
              </div>
              <Field label="Bio / Short Description"><Textarea rows={3} value={form.bio} onChange={e => setForm({ ...form, bio: e.target.value })} /></Field>
              <div className="grid grid-cols-2 gap-3">
                <Field label="Sort Order"><Input type="number" value={form.sort_order} onChange={e => setForm({ ...form, sort_order: Number(e.target.value) })} /></Field>
                <Field label="Status"><Toggle checked={!!form.is_active} onChange={v => setForm({ ...form, is_active: v ? 1 : 0 })} label={form.is_active ? "Active" : "Hidden"} /></Field>
              </div>
            </div>
            <div className="flex gap-3 justify-end px-5 py-3.5 border-t border-slate-100 sticky bottom-0 bg-white rounded-b-2xl">
              <Button variant="outline" size="sm" onClick={() => setAdding(false)}>Cancel</Button>
              <Button variant="primary" size="sm" onClick={handleSave} disabled={saving || !form.name || !form.designation}>
                {saving ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Save className="w-3.5 h-3.5" />}
                {saving ? "Saving…" : "Save"}
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

/* ══════════════════════  TAB 3: SELECTION POLICY  ══════════════════════ */
function SelectionPolicyTab() {
  return (
    <div className="space-y-6">
      <SelectionHeroSection />
      <SelectionCriteriaSection />
      <SelectionProcessSection />
      <EligibilitySection />
      <SelectionCTASection />
    </div>
  );
}

function SelectionHeroSection() {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false); const [saved, setSaved] = useState(false);
  const [enabled, setEnabled] = useState(true);
  const [data, setData] = useState({ badge: "Transparent & Merit-Based", title: "Selection", title_gradient: "Policy", subtitle: "" });
  useEffect(() => { loadSection("selection_hero").then(r => { if (r.data) setData(p => ({ ...p, ...r.data })); setEnabled(!!r.is_enabled); setLoading(false); }).catch(() => setLoading(false)); }, []);
  const save = useCallback(async () => { setSaving(true); await saveSection("selection_hero", data, enabled); setSaving(false); setSaved(true); setTimeout(() => setSaved(false), 3000); }, [data, enabled]);
  if (loading) return <SectionLoader />;
  return (
    <Card>
      <SectionToggleHeader title="Page Hero" description="Top banner of the Selection Policy page." enabled={enabled} onToggle={setEnabled} />
      <div className="p-5 sm:p-6 grid grid-cols-1 md:grid-cols-2 gap-4">
        <Field label="Badge"><Input value={data.badge} onChange={e => setData({ ...data, badge: e.target.value })} /></Field>
        <Field label="Title"><Input value={data.title} onChange={e => setData({ ...data, title: e.target.value })} /></Field>
        <Field label="Gradient Word"><Input value={data.title_gradient} onChange={e => setData({ ...data, title_gradient: e.target.value })} /></Field>
        <div className="md:col-span-2"><Field label="Subtitle"><Textarea rows={2} value={data.subtitle} onChange={e => setData({ ...data, subtitle: e.target.value })} /></Field></div>
      </div>
      <SaveBar saving={saving} saved={saved} onSave={save} />
    </Card>
  );
}

type CriteriaItem = { icon: string; title: string; description: string };

function SelectionCriteriaSection() {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false); const [saved, setSaved] = useState(false);
  const [enabled, setEnabled] = useState(true);
  const [data, setData] = useState({ badge: "Core Principles", title: "Selection", title_gradient: "Criteria", items: [] as CriteriaItem[] });
  useEffect(() => { loadSection("selection_criteria").then(r => { if (r.data) setData(p => ({ ...p, ...r.data })); setEnabled(!!r.is_enabled); setLoading(false); }).catch(() => setLoading(false)); }, []);
  const save = useCallback(async () => { setSaving(true); await saveSection("selection_criteria", data, enabled); setSaving(false); setSaved(true); setTimeout(() => setSaved(false), 3000); }, [data, enabled]);
  const update = (i: number, field: keyof CriteriaItem, val: string) => setData(d => ({ ...d, items: d.items.map((c, idx) => idx === i ? { ...c, [field]: val } : c) }));
  if (loading) return <SectionLoader />;
  return (
    <Card>
      <SectionToggleHeader title="Selection Criteria" description="Four core principle cards." enabled={enabled} onToggle={setEnabled} />
      <div className="p-5 sm:p-6 space-y-5">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Field label="Badge"><Input value={data.badge} onChange={e => setData({ ...data, badge: e.target.value })} /></Field>
          <Field label="Title"><Input value={data.title} onChange={e => setData({ ...data, title: e.target.value })} /></Field>
          <Field label="Gradient Word"><Input value={data.title_gradient} onChange={e => setData({ ...data, title_gradient: e.target.value })} /></Field>
        </div>
        <div>
          <div className="flex items-center justify-between mb-3">
            <p className="text-xs font-semibold text-slate-600">Criteria Cards ({data.items.length})</p>
            <Button variant="secondary" size="sm" onClick={() => setData(d => ({ ...d, items: [...d.items, { icon: "Trophy", title: "", description: "" }] }))}><Plus className="w-3.5 h-3.5" /> Add</Button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {data.items.map((c, i) => (
              <div key={i} className="border border-slate-200 rounded-xl p-4 space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-xs font-semibold text-slate-500">Card {i + 1}</span>
                  <button onClick={() => setData(d => ({ ...d, items: d.items.filter((_, j) => j !== i) }))} className="p-1 text-slate-400 hover:text-red-600"><Trash2 className="w-3.5 h-3.5" /></button>
                </div>
                <Field label="Icon Name"><Input value={c.icon} onChange={e => update(i, "icon", e.target.value)} placeholder="Trophy, Users, Target, Award…" /></Field>
                <Field label="Title"><Input value={c.title} onChange={e => update(i, "title", e.target.value)} /></Field>
                <Field label="Description"><Textarea rows={3} value={c.description} onChange={e => update(i, "description", e.target.value)} /></Field>
              </div>
            ))}
          </div>
        </div>
      </div>
      <SaveBar saving={saving} saved={saved} onSave={save} />
    </Card>
  );
}

type ProcessStep = { step: string; title: string; description: string };

function SelectionProcessSection() {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false); const [saved, setSaved] = useState(false);
  const [enabled, setEnabled] = useState(true);
  const [data, setData] = useState({ badge: "Step by Step", title: "Selection", title_gradient: "Process", steps: [] as ProcessStep[] });
  useEffect(() => { loadSection("selection_process").then(r => { if (r.data) setData(p => ({ ...p, ...r.data })); setEnabled(!!r.is_enabled); setLoading(false); }).catch(() => setLoading(false)); }, []);
  const save = useCallback(async () => { setSaving(true); await saveSection("selection_process", data, enabled); setSaving(false); setSaved(true); setTimeout(() => setSaved(false), 3000); }, [data, enabled]);
  const update = (i: number, field: keyof ProcessStep, val: string) => setData(d => ({ ...d, steps: d.steps.map((s, idx) => idx === i ? { ...s, [field]: val } : s) }));
  const move = (i: number, dir: -1 | 1) => { const arr = [...data.steps]; const j = i + dir; if (j < 0 || j >= arr.length) return; [arr[i], arr[j]] = [arr[j], arr[i]]; setData(d => ({ ...d, steps: arr })); };
  if (loading) return <SectionLoader />;
  return (
    <Card>
      <SectionToggleHeader title="Selection Process" description="Step-by-step numbered process cards." enabled={enabled} onToggle={setEnabled} />
      <div className="p-5 sm:p-6 space-y-5">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Field label="Badge"><Input value={data.badge} onChange={e => setData({ ...data, badge: e.target.value })} /></Field>
          <Field label="Title"><Input value={data.title} onChange={e => setData({ ...data, title: e.target.value })} /></Field>
          <Field label="Gradient Word"><Input value={data.title_gradient} onChange={e => setData({ ...data, title_gradient: e.target.value })} /></Field>
        </div>
        <div>
          <div className="flex items-center justify-between mb-3">
            <p className="text-xs font-semibold text-slate-600">Steps ({data.steps.length})</p>
            <Button variant="secondary" size="sm" onClick={() => setData(d => ({ ...d, steps: [...d.steps, { step: String(d.steps.length + 1), title: "", description: "" }] }))}><Plus className="w-3.5 h-3.5" /> Add Step</Button>
          </div>
          <div className="space-y-2">
            {data.steps.map((s, i) => (
              <div key={i} className="border border-slate-200 rounded-xl p-4 grid grid-cols-1 md:grid-cols-[60px_1fr_1fr_auto] gap-3 items-start">
                <Field label="Step #"><Input value={s.step} onChange={e => update(i, "step", e.target.value)} /></Field>
                <Field label="Title"><Input value={s.title} onChange={e => update(i, "title", e.target.value)} /></Field>
                <Field label="Description"><Textarea rows={2} value={s.description} onChange={e => update(i, "description", e.target.value)} /></Field>
                <div className="flex items-end gap-1 pb-0.5">
                  <button onClick={() => move(i, -1)} className="p-1.5 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded-lg"><ChevronUp className="w-3.5 h-3.5" /></button>
                  <button onClick={() => move(i, 1)} className="p-1.5 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded-lg"><ChevronDown className="w-3.5 h-3.5" /></button>
                  <button onClick={() => setData(d => ({ ...d, steps: d.steps.filter((_, j) => j !== i) }))} className="p-1.5 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg"><Trash2 className="w-3.5 h-3.5" /></button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <SaveBar saving={saving} saved={saved} onSave={save} />
    </Card>
  );
}

function EligibilitySection() {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false); const [saved, setSaved] = useState(false);
  const [enabled, setEnabled] = useState(true);
  const [data, setData] = useState({ badge: "Essential Requirements", title: "Eligibility", title_gradient: "Criteria", requirements: [] as string[], important_note: "" });
  useEffect(() => { loadSection("eligibility").then(r => { if (r.data) setData(p => ({ ...p, ...r.data })); setEnabled(!!r.is_enabled); setLoading(false); }).catch(() => setLoading(false)); }, []);
  const save = useCallback(async () => { setSaving(true); await saveSection("eligibility", data, enabled); setSaving(false); setSaved(true); setTimeout(() => setSaved(false), 3000); }, [data, enabled]);
  if (loading) return <SectionLoader />;
  return (
    <Card>
      <SectionToggleHeader title="Eligibility Criteria" description="Checklist of eligibility requirements and important note." enabled={enabled} onToggle={setEnabled} />
      <div className="p-5 sm:p-6 space-y-5">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Field label="Badge"><Input value={data.badge} onChange={e => setData({ ...data, badge: e.target.value })} /></Field>
          <Field label="Title"><Input value={data.title} onChange={e => setData({ ...data, title: e.target.value })} /></Field>
          <Field label="Gradient Word"><Input value={data.title_gradient} onChange={e => setData({ ...data, title_gradient: e.target.value })} /></Field>
        </div>
        <div>
          <div className="flex items-center justify-between mb-3">
            <p className="text-xs font-semibold text-slate-600">Requirements ({data.requirements.length})</p>
            <Button variant="secondary" size="sm" onClick={() => setData(d => ({ ...d, requirements: [...d.requirements, ""] }))}><Plus className="w-3.5 h-3.5" /> Add</Button>
          </div>
          <div className="space-y-2">
            {data.requirements.map((req, i) => (
              <div key={i} className="flex gap-2 items-start">
                <div className="flex-1"><Input value={req} onChange={e => setData(d => ({ ...d, requirements: d.requirements.map((r, idx) => idx === i ? e.target.value : r) }))} /></div>
                <button onClick={() => setData(d => ({ ...d, requirements: d.requirements.filter((_, j) => j !== i) }))} className="mt-1 p-2 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg"><Trash2 className="w-3.5 h-3.5" /></button>
              </div>
            ))}
          </div>
        </div>
        <Field label="Important Note"><Textarea rows={3} value={data.important_note} onChange={e => setData({ ...data, important_note: e.target.value })} /></Field>
      </div>
      <SaveBar saving={saving} saved={saved} onSave={save} />
    </Card>
  );
}

function SelectionCTASection() {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false); const [saved, setSaved] = useState(false);
  const [enabled, setEnabled] = useState(true);
  const [data, setData] = useState({ title: "Ready to Represent India?", subtitle: "", btn1_text: "Contact Us", btn1_url: "/contact", btn2_text: "View Events", btn2_url: "/events" });
  useEffect(() => { loadSection("selection_cta").then(r => { if (r.data) setData(p => ({ ...p, ...r.data })); setEnabled(!!r.is_enabled); setLoading(false); }).catch(() => setLoading(false)); }, []);
  const save = useCallback(async () => { setSaving(true); await saveSection("selection_cta", data, enabled); setSaving(false); setSaved(true); setTimeout(() => setSaved(false), 3000); }, [data, enabled]);
  if (loading) return <SectionLoader />;
  return (
    <Card>
      <SectionToggleHeader title="CTA Section" description="Bottom call-to-action on the selection policy page." enabled={enabled} onToggle={setEnabled} />
      <div className="p-5 sm:p-6 grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="md:col-span-2"><Field label="Title"><Input value={data.title} onChange={e => setData({ ...data, title: e.target.value })} /></Field></div>
        <div className="md:col-span-2"><Field label="Subtitle"><Textarea rows={2} value={data.subtitle} onChange={e => setData({ ...data, subtitle: e.target.value })} /></Field></div>
        <Field label="Button 1 Text"><Input value={data.btn1_text} onChange={e => setData({ ...data, btn1_text: e.target.value })} /></Field>
        <Field label="Button 1 URL"><Input value={data.btn1_url} onChange={e => setData({ ...data, btn1_url: e.target.value })} /></Field>
        <Field label="Button 2 Text"><Input value={data.btn2_text} onChange={e => setData({ ...data, btn2_text: e.target.value })} /></Field>
        <Field label="Button 2 URL"><Input value={data.btn2_url} onChange={e => setData({ ...data, btn2_url: e.target.value })} /></Field>
      </div>
      <SaveBar saving={saving} saved={saved} onSave={save} />
    </Card>
  );
}

/* ══════════════════════  TAB 4: PARTNERS  ══════════════════════ */
const PARTNER_CATEGORIES = ["Title Sponsor", "Official Partner", "Supporting Partner", "Media Partner"];

function PartnerVisibilityCard() {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [pageData, setPageData] = useState<Record<string, unknown>>({});
  const [pageEnabled, setPageEnabled] = useState(true);
  const [hidden, setHidden] = useState<string[]>([]);

  useEffect(() => {
    loadSection("partners_page").then(r => {
      if (r.data) { setPageData(r.data as Record<string, unknown>); setHidden((r.data as Record<string, unknown>).hidden_categories as string[] ?? []); }
      setPageEnabled(!!r.is_enabled); setLoading(false);
    }).catch(() => setLoading(false));
  }, []);

  const toggleCategory = (cat: string) =>
    setHidden(prev => prev.includes(cat) ? prev.filter(c => c !== cat) : [...prev, cat]);

  const save = useCallback(async () => {
    setSaving(true);
    await saveSection("partners_page", { ...pageData, hidden_categories: hidden }, pageEnabled);
    setSaving(false); setSaved(true); setTimeout(() => setSaved(false), 3000);
  }, [pageData, pageEnabled, hidden]);

  if (loading) return <SectionLoader />;

  return (
    <Card>
      <SectionToggleHeader title="Partners Page Visibility" description="Show or hide entire category tiers on the live Partners page." enabled={pageEnabled} onToggle={setPageEnabled} />
      <div className="p-5 sm:p-6">
        <p className="text-xs font-semibold text-slate-600 mb-3">Category Tiers — toggle to show/hide on website</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {PARTNER_CATEGORIES.map(cat => {
            const isVisible = !hidden.includes(cat);
            return (
              <div key={cat} className={`flex items-center justify-between gap-3 p-3.5 rounded-xl border transition ${isVisible ? "border-green-200 bg-green-50/50" : "border-slate-200 bg-slate-50"}`}>
                <div>
                  <p className="text-sm font-semibold text-navy">{cat}s</p>
                  <p className="text-[11px] text-slate-500 mt-0.5">{isVisible ? "Visible on website" : "Hidden from website"}</p>
                </div>
                <div className="flex items-center gap-2">
                  <Badge color={isVisible ? "green" : "slate"}>{isVisible ? "Visible" : "Hidden"}</Badge>
                  <Toggle checked={isVisible} onChange={() => toggleCategory(cat)} />
                </div>
              </div>
            );
          })}
        </div>
      </div>
      <SaveBar saving={saving} saved={saved} onSave={save} />
    </Card>
  );
}

function PartnersTab() {
  const [loading, setLoading] = useState(true);
  const [partners, setPartners] = useState<Partner[]>([]);
  const [filter, setFilter] = useState("all");
  const [adding, setAdding] = useState(false);
  const [editing, setEditing] = useState<Partner | null>(null);
  const [form, setForm] = useState({ name: "", logo_url: "", website: "", category: "Official Partner", featured: 0, status: "Active", sort_order: 0 });
  const [saving, setSaving] = useState(false);

  const fetchPartners = useCallback(async () => {
    const res = await fetch("/api/partners"); const d = await res.json();
    setPartners(d.partners ?? []); setLoading(false);
  }, []);

  useEffect(() => { fetchPartners(); }, [fetchPartners]);

  const openAdd = () => { setForm({ name: "", logo_url: "", website: "", category: "Official Partner", featured: 0, status: "Active", sort_order: partners.length + 1 }); setEditing(null); setAdding(true); };
  const openEdit = (p: Partner) => { setForm({ name: p.name, logo_url: p.logo_url ?? "", website: p.website ?? "", category: p.category, featured: p.featured, status: p.status, sort_order: p.sort_order }); setEditing(p); setAdding(true); };

  const handleSave = async () => {
    setSaving(true);
    if (editing) {
      await fetch(`/api/partners/${editing.id}`, { method: "PUT", headers: { "Content-Type": "application/json" }, body: JSON.stringify(form) });
    } else {
      await fetch("/api/partners", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(form) });
    }
    setSaving(false); setAdding(false); fetchPartners();
  };

  const handleDelete = async (id: number) => {
    if (!confirm("Delete this partner?")) return;
    await fetch(`/api/partners/${id}`, { method: "DELETE" }); fetchPartners();
  };

  const filtered = filter === "all" ? partners : partners.filter(p => p.category === filter);

  if (loading) return <SectionLoader />;

  return (
    <div className="space-y-4">
      <PartnerVisibilityCard />
      <Card>
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 px-5 py-4 border-b border-slate-100">
          <div>
            <h3 className="text-base font-semibold text-navy">Partners & Sponsors</h3>
            <p className="text-xs text-slate-500 mt-0.5">{partners.length} total partners across all categories</p>
          </div>
          <Button variant="secondary" size="sm" onClick={openAdd}><Plus className="w-3.5 h-3.5" /> Add Partner</Button>
        </div>

        {/* Category filter */}
        <div className="px-5 py-3 border-b border-slate-100 flex flex-wrap gap-2">
          {["all", ...PARTNER_CATEGORIES].map(cat => (
            <button key={cat} onClick={() => setFilter(cat)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition ${filter === cat ? "bg-saffron text-white" : "bg-slate-100 text-slate-600 hover:bg-slate-200"}`}>
              {cat === "all" ? "All" : cat} {cat === "all" ? `(${partners.length})` : `(${partners.filter(p => p.category === cat).length})`}
            </button>
          ))}
        </div>

        <div className="p-5 sm:p-6 space-y-3">
          {filtered.length === 0 && <p className="text-center text-slate-400 text-sm py-8">No partners in this category.</p>}
          {filtered.map(p => (
            <div key={p.id} className="border border-slate-200 rounded-xl p-4 flex items-center gap-4">
              <div className="w-16 h-12 rounded-lg bg-slate-50 border border-slate-200 flex items-center justify-center shrink-0 overflow-hidden">
                {p.logo_url ? <img src={p.logo_url} alt={p.name} className="w-full h-full object-contain p-1" /> : <span className="text-slate-400 font-bold text-xs">{p.name.slice(0, 2).toUpperCase()}</span>}
              </div>
              <div className="flex-1 min-w-0">
                <div className="font-semibold text-sm text-slate-800 truncate flex items-center gap-2">
                  {p.name}
                  {p.featured === 1 && <Badge color="orange">Featured</Badge>}
                </div>
                <div className="text-xs text-slate-500 mt-0.5">{p.category} · {p.website || "No website"}</div>
              </div>
              <Badge color={p.status === "Active" ? "green" : p.status === "Pending" ? "yellow" : "slate"}>{p.status}</Badge>
              <div className="flex items-center gap-1 shrink-0">
                <button onClick={() => openEdit(p)} className="p-1.5 hover:bg-slate-100 rounded-lg text-slate-400"><Edit3 className="w-3.5 h-3.5" /></button>
                <button onClick={() => handleDelete(p.id)} className="p-1.5 hover:bg-red-50 rounded-lg text-slate-400 hover:text-red-600"><Trash2 className="w-3.5 h-3.5" /></button>
              </div>
            </div>
          ))}
        </div>
      </Card>

      {/* Add/Edit Modal */}
      {adding && (
        <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl w-full max-w-lg shadow-2xl max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100 sticky top-0 bg-white rounded-t-2xl">
              <h3 className="font-semibold text-navy">{editing ? "Edit Partner" : "Add Partner"}</h3>
              <button onClick={() => setAdding(false)} className="p-1.5 hover:bg-slate-100 rounded-lg"><X className="w-4 h-4" /></button>
            </div>
            <div className="p-6 space-y-4">
              <ImageUploader label="Partner Logo" aspect="video" value={form.logo_url} onChange={url => setForm({ ...form, logo_url: url })} />
              <Field label="Partner Name" required><Input value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} /></Field>
              <Field label="Website URL"><Input value={form.website} onChange={e => setForm({ ...form, website: e.target.value })} placeholder="https://example.com" /></Field>
              <Field label="Category">
                <select value={form.category} onChange={e => setForm({ ...form, category: e.target.value })}
                  className="w-full px-3.5 py-2.5 bg-white border border-slate-200 rounded-lg text-sm text-slate-900 focus:border-saffron focus:ring-4 focus:ring-saffron/10 outline-none transition">
                  {PARTNER_CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
                </select>
              </Field>
              <div className="grid grid-cols-2 gap-4">
                <Field label="Status">
                  <select value={form.status} onChange={e => setForm({ ...form, status: e.target.value })}
                    className="w-full px-3.5 py-2.5 bg-white border border-slate-200 rounded-lg text-sm focus:border-saffron focus:ring-4 focus:ring-saffron/10 outline-none transition">
                    <option>Active</option><option>Pending</option><option>Inactive</option>
                  </select>
                </Field>
                <Field label="Sort Order"><Input type="number" value={form.sort_order} onChange={e => setForm({ ...form, sort_order: Number(e.target.value) })} /></Field>
              </div>
              <div className="flex items-center gap-3"><Toggle checked={!!form.featured} onChange={v => setForm({ ...form, featured: v ? 1 : 0 })} label="Featured / Highlighted" /></div>
            </div>
            <div className="flex gap-3 justify-end px-6 py-4 border-t border-slate-100 sticky bottom-0 bg-white rounded-b-2xl">
              <Button variant="outline" onClick={() => setAdding(false)}>Cancel</Button>
              <Button variant="primary" onClick={handleSave} disabled={saving || !form.name}>
                {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
                {saving ? "Saving…" : "Save"}
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
