"use client";

import { useState, useEffect, useCallback, type Dispatch, type SetStateAction } from "react";
import {
  Image as ImageIcon, Tag, Star, Newspaper, Mail,
  Save, Eye, Plus, Trash2, GripVertical, Upload,
  Edit3, ChevronUp, ChevronDown, Calendar, Loader2, CheckCircle2, X,
} from "lucide-react";
import { PageHeader, Card, Button, Field, Input, Textarea, Toggle, Badge } from "../../components/ui";

/* ─── Types ─── */
type Article = {
  id: number; title: string; excerpt: string; content: string;
  image_url: string; category: string; article_url: string;
  published_date: string; is_featured: number; status: string; sort_order: number;
};
type FormState = Omit<Article, "id">;
type Category = { name: string; color: string; isDefault: boolean };

const TABS = [
  { id: "hero",       label: "Page Hero",         icon: ImageIcon },
  { id: "categories", label: "Categories",         icon: Tag       },
  { id: "featured",   label: "Featured Stories",   icon: Star      },
  { id: "all",        label: "All News Articles",  icon: Newspaper },
  { id: "newsletter", label: "Newsletter CTA",     icon: Mail      },
];

const DEFAULT_CATEGORIES: Category[] = [
  { name: "All News",         color: "saffron",  isDefault: true  },
  { name: "Championship",     color: "saffron",  isDefault: false },
  { name: "International",    color: "blue",     isDefault: false },
  { name: "Development",      color: "green",    isDefault: false },
  { name: "Partnership",      color: "gold",     isDefault: false },
  { name: "Athlete Spotlight",color: "purple",   isDefault: false },
  { name: "Women In Sport",   color: "pink",     isDefault: false },
  { name: "Event",            color: "cyan",     isDefault: false },
  { name: "Achievement",      color: "emerald",  isDefault: false },
];

const ALL_CATEGORY_OPTIONS = ["Championship","International","Development","Partnership","Athlete Spotlight","Women In Sport","Event","Achievement","Training","Community","General"];

const EMPTY_FORM: FormState = { title: "", excerpt: "", content: "", image_url: "", category: "General", article_url: "", published_date: "", is_featured: 0, status: "Draft", sort_order: 0 };

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
      {saved ? <span className="text-green-600 text-sm font-medium flex items-center gap-1.5"><CheckCircle2 className="w-4 h-4" /> Saved</span>
        : <span className="text-xs text-slate-400">Changes will reflect on the live website</span>}
      <Button variant="primary" onClick={onSave} disabled={saving}>
        {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
        {saving ? "Saving…" : "Save Changes"}
      </Button>
    </div>
  );
}
function SectionLoader() {
  return <Card><div className="flex items-center justify-center py-20 gap-3 text-slate-400"><Loader2 className="w-5 h-5 animate-spin" /><span className="text-sm">Loading…</span></div></Card>;
}

function ImageUploaderInline({ value, onChange, label }: { value: string; onChange: (url: string) => void; label: string }) {
  const [uploading, setUploading] = useState(false);
  const id = `upl-${Math.random().toString(36).slice(2)}`;
  return (
    <div>
      <label className="block text-xs font-semibold text-slate-700 mb-1.5">{label}</label>
      <div className="aspect-video bg-slate-50 border-2 border-dashed border-slate-200 rounded-xl overflow-hidden relative flex items-center justify-center cursor-pointer hover:border-saffron transition"
        onClick={() => document.getElementById(id)?.click()}>
        {value ? <img src={value} alt="" className="absolute inset-0 w-full h-full object-cover" /> : null}
        {uploading ? <div className="absolute inset-0 bg-black/50 flex items-center justify-center"><Loader2 className="w-7 h-7 text-white animate-spin" /></div>
          : !value ? <div className="flex flex-col items-center gap-2 text-slate-400"><Upload className="w-7 h-7" /><span className="text-xs font-semibold">Click to upload</span></div>
          : <div className="absolute inset-0 bg-black/40 opacity-0 hover:opacity-100 transition flex items-center justify-center"><span className="text-white text-sm font-semibold flex items-center gap-2"><Upload className="w-4 h-4" /> Change</span></div>}
      </div>
      <input id={id} type="file" accept="image/*" className="hidden" onChange={async (e) => {
        const file = e.target.files?.[0]; if (!file) return;
        setUploading(true);
        const fd = new FormData(); fd.append("file", file);
        try { const r = await fetch("/api/upload", { method: "POST", body: fd }); const d = await r.json(); if (d.url) onChange(d.url); } catch { /**/ }
        setUploading(false); e.target.value = "";
      }} />
    </div>
  );
}

async function loadSection(key: string) {
  const r = await fetch(`/api/about-sections/${key}`); return r.json();
}
async function saveSection(key: string, data: unknown, is_enabled: boolean) {
  await fetch(`/api/about-sections/${key}`, { method: "PUT", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ data, is_enabled }) });
}

/* ─── Shared article modal (reused by Featured + All News tabs) ─── */
function ArticleModal({ open, editing, form, setForm, saving, onSave, onClose }: {
  open: boolean; editing: Article | null; form: FormState;
  setForm: Dispatch<SetStateAction<FormState>>;
  saving: boolean; onSave: () => void; onClose: () => void;
}) {
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl w-full max-w-2xl shadow-2xl max-h-[92vh] overflow-y-auto">
        <div className="flex items-center justify-between px-5 py-3.5 border-b border-slate-100 sticky top-0 bg-white rounded-t-2xl z-10">
          <h3 className="font-semibold text-navy">{editing ? "Edit Article" : "New Article"}</h3>
          <button onClick={onClose} className="p-1.5 hover:bg-slate-100 rounded-lg"><X className="w-4 h-4" /></button>
        </div>
        <div className="p-5 space-y-4">
          <ImageUploaderInline label="Cover Image" value={form.image_url} onChange={url => setForm(f => ({ ...f, image_url: url }))} />
          <Field label="Title" required><Input value={form.title} onChange={e => setForm(f => ({ ...f, title: e.target.value }))} placeholder="Article headline…" /></Field>
          <Field label="Excerpt"><Textarea rows={3} value={form.excerpt} onChange={e => setForm(f => ({ ...f, excerpt: e.target.value }))} placeholder="Short summary…" /></Field>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Field label="Category">
              <select value={form.category} onChange={e => setForm(f => ({ ...f, category: e.target.value }))}
                className="w-full px-3.5 py-2.5 bg-white border border-slate-200 rounded-lg text-sm focus:border-saffron focus:ring-4 focus:ring-saffron/10 outline-none transition">
                {ALL_CATEGORY_OPTIONS.map(c => <option key={c}>{c}</option>)}
              </select>
            </Field>
            <Field label="Published Date"><Input value={form.published_date} onChange={e => setForm(f => ({ ...f, published_date: e.target.value }))} placeholder="e.g. June 5, 2026" /></Field>
          </div>
          <Field label="Article URL (optional)"><Input value={form.article_url} onChange={e => setForm(f => ({ ...f, article_url: e.target.value }))} placeholder="https://… or /news/slug" /></Field>
          <div className="grid grid-cols-2 gap-4">
            <Field label="Status">
              <select value={form.status} onChange={e => setForm(f => ({ ...f, status: e.target.value }))}
                className="w-full px-3.5 py-2.5 bg-white border border-slate-200 rounded-lg text-sm focus:border-saffron focus:ring-4 focus:ring-saffron/10 outline-none transition">
                <option>Draft</option><option>Published</option>
              </select>
            </Field>
            <Field label="Sort Order"><Input type="number" value={form.sort_order} onChange={e => setForm(f => ({ ...f, sort_order: Number(e.target.value) }))} /></Field>
          </div>
          <div className="p-3 bg-slate-50 rounded-xl">
            <Toggle checked={!!form.is_featured} onChange={v => setForm(f => ({ ...f, is_featured: v ? 1 : 0 }))} label="Featured Story (shown in the Featured section)" />
          </div>
        </div>
        <div className="flex gap-3 justify-end px-5 py-3.5 border-t border-slate-100 sticky bottom-0 bg-white rounded-b-2xl">
          <Button variant="outline" size="sm" onClick={onClose}>Cancel</Button>
          <Button variant="primary" size="sm" onClick={onSave} disabled={saving || !form.title.trim()}>
            {saving ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Save className="w-3.5 h-3.5" />}
            {saving ? "Saving…" : editing ? "Update Article" : "Create Article"}
          </Button>
        </div>
      </div>
    </div>
  );
}

/* ─── Main Page ─── */
export default function NewsPageCMS() {
  const [active, setActive] = useState("hero");
  return (
    <div className="space-y-6">
      <PageHeader title="News Page CMS" subtitle="Manage every section of the public News page from one place."
        breadcrumbs={[{ label: "Admin", href: "/admin" }, { label: "Website Management" }, { label: "News Page" }]}
        actions={<Button variant="outline" onClick={() => window.open("/news", "_blank")}><Eye className="w-4 h-4" /> Preview</Button>} />
      <div className="grid grid-cols-1 lg:grid-cols-[260px_1fr] gap-6">
        <Card className="p-2 h-fit lg:sticky lg:top-20">
          <div className="px-3 py-2 text-[10px] font-bold uppercase tracking-widest text-slate-400">Page Sections</div>
          <ul className="space-y-0.5">
            {TABS.map((t, i) => {
              const Icon = t.icon; const isActive = active === t.id;
              return (
                <li key={t.id}>
                  <button onClick={() => setActive(t.id)} className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm transition ${isActive ? "bg-saffron text-white font-semibold shadow" : "text-slate-700 hover:bg-slate-100"}`}>
                    <span className={`w-5 h-5 rounded text-[10px] font-bold flex items-center justify-center ${isActive ? "bg-white/20" : "bg-slate-100 text-slate-500"}`}>{String(i + 1).padStart(2, "0")}</span>
                    <Icon className="w-3.5 h-3.5 shrink-0" /><span className="truncate text-left">{t.label}</span>
                  </button>
                </li>
              );
            })}
          </ul>
        </Card>
        <div className="space-y-6 min-w-0">
          {active === "hero"       && <HeroSection />}
          {active === "categories" && <CategoriesSection />}
          {active === "featured"   && <FeaturedSection />}
          {active === "all"        && <AllNewsSection />}
          {active === "newsletter" && <NewsletterSection />}
        </div>
      </div>
    </div>
  );
}

/* ══════════════════════  TAB 1: PAGE HERO  ══════════════════════ */
function HeroSection() {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false); const [saved, setSaved] = useState(false);
  const [enabled, setEnabled] = useState(true);
  const [data, setData] = useState({ badge: "Stay Informed", title: "Latest", title_gradient: "News", subtitle: "Updates, announcements, and inspiring stories from the world of wheelchair rugby in India." });
  useEffect(() => { loadSection("news_hero").then(r => { if (r.data) setData(p => ({ ...p, ...r.data })); setEnabled(!!r.is_enabled); setLoading(false); }).catch(() => setLoading(false)); }, []);
  const save = useCallback(async () => { setSaving(true); await saveSection("news_hero", data, enabled); setSaving(false); setSaved(true); setTimeout(() => setSaved(false), 3000); }, [data, enabled]);
  if (loading) return <SectionLoader />;
  return (
    <Card>
      <SectionToggleHeader title="Page Hero" description="Top banner of the News page. Eyebrow, title and intro paragraph." enabled={enabled} onToggle={setEnabled} />
      <div className="p-5 sm:p-6 grid grid-cols-1 md:grid-cols-2 gap-5">
        <Field label="Eyebrow Label"><Input value={data.badge} onChange={e => setData(d => ({ ...d, badge: e.target.value }))} /></Field>
        <Field label="Hero Title" required><Input value={data.title} onChange={e => setData(d => ({ ...d, title: e.target.value }))} /></Field>
        <Field label="Gradient Word"><Input value={data.title_gradient} onChange={e => setData(d => ({ ...d, title_gradient: e.target.value }))} /></Field>
        <div className="md:col-span-2"><Field label="Description"><Textarea rows={3} value={data.subtitle} onChange={e => setData(d => ({ ...d, subtitle: e.target.value }))} /></Field></div>
      </div>
      <SaveBar saving={saving} saved={saved} onSave={save} />
    </Card>
  );
}

/* ══════════════════════  TAB 2: CATEGORIES  ══════════════════════ */
function CategoriesSection() {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false); const [saved, setSaved] = useState(false);
  const [enabled, setEnabled] = useState(true);
  const [cats, setCats] = useState<Category[]>(DEFAULT_CATEGORIES);
  useEffect(() => { loadSection("news_categories").then(r => { if (Array.isArray(r.data)) setCats(r.data); setEnabled(!!r.is_enabled); setLoading(false); }).catch(() => setLoading(false)); }, []);
  const save = useCallback(async () => { setSaving(true); await saveSection("news_categories", cats, enabled); setSaving(false); setSaved(true); setTimeout(() => setSaved(false), 3000); }, [cats, enabled]);
  const update = (i: number, field: keyof Category, val: string | boolean) => setCats(prev => prev.map((c, idx) => idx === i ? { ...c, [field]: val } : c));
  const move = (i: number, dir: -1 | 1) => { const c = [...cats]; const j = i + dir; if (j < 0 || j >= c.length) return; [c[i], c[j]] = [c[j], c[i]]; setCats(c); };
  if (loading) return <SectionLoader />;
  return (
    <Card>
      <SectionToggleHeader title="Filter Categories" description="Category chips shown on the News page. Used to filter articles." enabled={enabled} onToggle={setEnabled} />
      <div className="p-5 sm:p-6">
        <div className="flex items-center justify-between mb-4">
          <p className="text-sm text-slate-500">{cats.length} categories configured</p>
          <Button variant="secondary" size="sm" onClick={() => setCats([...cats, { name: "New Category", color: "slate", isDefault: false }])}>
            <Plus className="w-3.5 h-3.5" /> Add Category
          </Button>
        </div>
        <div className="space-y-2">
          {cats.map((c, i) => (
            <div key={i} className="border border-slate-200 rounded-xl p-3 flex items-center gap-3 hover:border-saffron/40 transition">
              <GripVertical className="w-4 h-4 text-slate-300 shrink-0 cursor-grab" />
              <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 gap-3">
                <Field label="Name"><Input value={c.name} onChange={e => update(i, "name", e.target.value)} /></Field>
                <Field label="Color Tag"><Input value={c.color} onChange={e => update(i, "color", e.target.value)} placeholder="saffron, blue, green…" /></Field>
              </div>
              {c.isDefault && <Badge color="orange">Default</Badge>}
              <div className="flex items-center gap-1 shrink-0">
                <button onClick={() => move(i, -1)} className="p-1.5 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded-lg"><ChevronUp className="w-3.5 h-3.5" /></button>
                <button onClick={() => move(i, 1)}  className="p-1.5 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded-lg"><ChevronDown className="w-3.5 h-3.5" /></button>
                <button onClick={() => setCats(cats.filter((_, j) => j !== i))} className="p-1.5 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg"><Trash2 className="w-4 h-4" /></button>
              </div>
            </div>
          ))}
        </div>
      </div>
      <SaveBar saving={saving} saved={saved} onSave={save} />
    </Card>
  );
}

/* ══════════════════════  TAB 3: FEATURED STORIES  ══════════════════════ */
function FeaturedSection() {
  const [loading, setLoading] = useState(true);
  const [articles, setArticles] = useState<Article[]>([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing] = useState<Article | null>(null);
  const [form, setForm] = useState<FormState>(EMPTY_FORM);
  const [saving, setSaving] = useState(false);

  const fetch_ = useCallback(async () => {
    const r = await fetch("/api/news"); const d = await r.json();
    setArticles((d.articles ?? []).filter((a: Article) => a.is_featured)); setLoading(false);
  }, []);
  useEffect(() => { fetch_(); }, [fetch_]);

  const openAdd = () => { setForm({ ...EMPTY_FORM, is_featured: 1, sort_order: articles.length + 1 }); setEditing(null); setModalOpen(true); };
  const openEdit = (a: Article) => { setForm({ title: a.title, excerpt: a.excerpt ?? "", content: a.content ?? "", image_url: a.image_url ?? "", category: a.category, article_url: a.article_url ?? "", published_date: a.published_date ?? "", is_featured: 1, status: a.status, sort_order: a.sort_order }); setEditing(a); setModalOpen(true); };
  const handleSave = async () => {
    if (!form.title.trim()) return; setSaving(true);
    if (editing) await fetch(`/api/news/${editing.id}`, { method: "PUT", headers: { "Content-Type": "application/json" }, body: JSON.stringify(form) });
    else await fetch("/api/news", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(form) });
    setSaving(false); setModalOpen(false); fetch_();
  };
  const handleDelete = async (id: number) => { if (!confirm("Remove this featured story?")) return; await fetch(`/api/news/${id}`, { method: "DELETE" }); fetch_(); };
  const unfeature = async (a: Article) => { await fetch(`/api/news/${a.id}`, { method: "PUT", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ ...a, is_featured: 0 }) }); fetch_(); };

  if (loading) return <SectionLoader />;
  return (
    <div className="space-y-4">
      <Card>
        <SectionToggleHeader title="Featured Stories" description="Two large cards highlighted at the top of the news listing." enabled={true} onToggle={() => {}} />
        <div className="p-5 sm:p-6 space-y-4">
          <div className="flex items-center justify-between">
            <p className="text-sm text-slate-500">{articles.length} featured {articles.length !== 1 ? "stories" : "story"} · (max 2 recommended)</p>
            <Button variant="secondary" size="sm" onClick={openAdd}><Plus className="w-3.5 h-3.5" /> Add Featured Story</Button>
          </div>
          {articles.length === 0 && <p className="text-center text-slate-400 text-sm py-8">No featured stories yet. Mark an article as featured or add one here.</p>}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {articles.map((a, i) => (
              <div key={a.id} className="border border-slate-200 rounded-xl overflow-hidden hover:border-saffron/40 transition">
                <div className="relative h-44 bg-slate-100 overflow-hidden">
                  {a.image_url && <img src={a.image_url} alt="" className="w-full h-full object-cover" />}
                  <div className="absolute top-2 left-2"><Badge color="orange">Featured #{i + 1}</Badge></div>
                  <div className="absolute top-2 right-2 flex gap-1">
                    <button onClick={() => openEdit(a)} className="p-1.5 bg-white/90 hover:bg-white rounded-lg text-slate-600"><Edit3 className="w-3.5 h-3.5" /></button>
                    <button onClick={() => unfeature(a)} title="Remove from featured" className="p-1.5 bg-white/90 hover:bg-yellow-50 rounded-lg text-slate-600 hover:text-yellow-600"><Star className="w-3.5 h-3.5" /></button>
                    <button onClick={() => handleDelete(a.id)} className="p-1.5 bg-white/90 hover:bg-red-50 rounded-lg text-slate-600 hover:text-red-600"><Trash2 className="w-3.5 h-3.5" /></button>
                  </div>
                </div>
                <div className="p-4 space-y-1.5">
                  <div className="flex items-center gap-2"><Badge color="slate">{a.category}</Badge>{a.published_date && <span className="text-xs text-slate-400 flex items-center gap-1"><Calendar className="w-3 h-3" />{a.published_date}</span>}</div>
                  <p className="font-semibold text-sm text-navy line-clamp-2">{a.title}</p>
                  {a.excerpt && <p className="text-xs text-slate-500 line-clamp-2">{a.excerpt}</p>}
                </div>
              </div>
            ))}
          </div>
        </div>
      </Card>
      <ArticleModal open={modalOpen} editing={editing} form={form} setForm={setForm} saving={saving} onSave={handleSave} onClose={() => setModalOpen(false)} />
    </div>
  );
}

/* ══════════════════════  TAB 4: ALL NEWS ARTICLES  ══════════════════════ */
function AllNewsSection() {
  const [loading, setLoading] = useState(true);
  const [articles, setArticles] = useState<Article[]>([]);
  const [filter, setFilter] = useState("all");
  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing] = useState<Article | null>(null);
  const [form, setForm] = useState<FormState>(EMPTY_FORM);
  const [saving, setSaving] = useState(false);

  const fetch_ = useCallback(async () => {
    const r = await fetch("/api/news"); const d = await r.json(); setArticles(d.articles ?? []); setLoading(false);
  }, []);
  useEffect(() => { fetch_(); }, [fetch_]);

  const openAdd = () => { setForm({ ...EMPTY_FORM, sort_order: articles.length + 1 }); setEditing(null); setModalOpen(true); };
  const openEdit = (a: Article) => { setForm({ title: a.title, excerpt: a.excerpt ?? "", content: a.content ?? "", image_url: a.image_url ?? "", category: a.category, article_url: a.article_url ?? "", published_date: a.published_date ?? "", is_featured: a.is_featured, status: a.status, sort_order: a.sort_order }); setEditing(a); setModalOpen(true); };
  const handleSave = async () => {
    if (!form.title.trim()) return; setSaving(true);
    if (editing) await fetch(`/api/news/${editing.id}`, { method: "PUT", headers: { "Content-Type": "application/json" }, body: JSON.stringify(form) });
    else await fetch("/api/news", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(form) });
    setSaving(false); setModalOpen(false); fetch_();
  };
  const handleDelete = async (id: number) => { if (!confirm("Delete this article?")) return; await fetch(`/api/news/${id}`, { method: "DELETE" }); fetch_(); };
  const toggleFeatured = async (a: Article) => { await fetch(`/api/news/${a.id}`, { method: "PUT", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ ...a, is_featured: a.is_featured ? 0 : 1 }) }); fetch_(); };
  const toggleStatus = async (a: Article) => { const s = a.status === "Published" ? "Draft" : "Published"; await fetch(`/api/news/${a.id}`, { method: "PUT", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ ...a, status: s }) }); fetch_(); };

  const cats = ["all", ...Array.from(new Set(articles.map(a => a.category)))];
  const filtered = filter === "all" ? articles : articles.filter(a => a.category === filter);

  if (loading) return <SectionLoader />;
  return (
    <div className="space-y-4">
      <Card>
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 px-5 py-4 border-b border-slate-100">
          <div>
            <h3 className="text-base font-semibold text-navy">All News Articles</h3>
            <p className="text-xs text-slate-500 mt-0.5">{articles.length} articles · {articles.filter(a => a.status === "Published").length} published · {articles.filter(a => a.is_featured).length} featured</p>
          </div>
          <Button variant="secondary" size="sm" onClick={openAdd}><Plus className="w-3.5 h-3.5" /> New Article</Button>
        </div>
        <div className="px-5 py-3 border-b border-slate-100 flex flex-wrap gap-2">
          {cats.map(cat => (
            <button key={cat} onClick={() => setFilter(cat)} className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition capitalize ${filter === cat ? "bg-saffron text-white" : "bg-slate-100 text-slate-600 hover:bg-slate-200"}`}>
              {cat === "all" ? `All (${articles.length})` : `${cat} (${articles.filter(a => a.category === cat).length})`}
            </button>
          ))}
        </div>
        <div className="p-4 space-y-2">
          {filtered.length === 0 && <p className="text-center text-slate-400 text-sm py-10">No articles found.</p>}
          {filtered.map(a => (
            <div key={a.id} className="border border-slate-200 rounded-xl p-3 flex items-center gap-3 hover:border-saffron/40 transition">
              <GripVertical className="w-4 h-4 text-slate-300 shrink-0 cursor-grab" />
              <div className="w-14 h-10 rounded-lg bg-slate-100 shrink-0 overflow-hidden flex items-center justify-center">
                {a.image_url ? <img src={a.image_url} alt="" className="w-full h-full object-cover" /> : <ImageIcon className="w-4 h-4 text-slate-400" />}
              </div>
              <div className="flex-1 min-w-0">
                <div className="font-semibold text-sm text-slate-800 truncate">{a.title}{!!a.is_featured && <span className="ml-2 text-[10px] font-bold text-orange-500">★ FEATURED</span>}</div>
                <div className="text-xs text-slate-500 flex items-center gap-2 mt-0.5">
                  <Badge color="slate">{a.category}</Badge>
                  {a.published_date && <span className="flex items-center gap-1"><Calendar className="w-3 h-3" />{a.published_date}</span>}
                </div>
              </div>
              <Badge color={a.status === "Published" ? "green" : "yellow"}>{a.status}</Badge>
              <div className="flex items-center gap-1 shrink-0">
                <button onClick={() => toggleFeatured(a)} title={a.is_featured ? "Remove from featured" : "Add to featured"} className={`p-1.5 rounded-lg transition ${a.is_featured ? "bg-orange-100 text-orange-600" : "hover:bg-slate-100 text-slate-400"}`}><Star className="w-3.5 h-3.5" /></button>
                <button onClick={() => toggleStatus(a)} className={`p-1.5 rounded-lg text-xs font-semibold transition ${a.status === "Published" ? "bg-green-100 text-green-700 hover:bg-green-200" : "bg-yellow-100 text-yellow-700 hover:bg-yellow-200"}`}>{a.status === "Published" ? "Unpublish" : "Publish"}</button>
                <button onClick={() => openEdit(a)} className="p-1.5 hover:bg-slate-100 rounded-lg text-slate-400"><Edit3 className="w-3.5 h-3.5" /></button>
                <button onClick={() => handleDelete(a.id)} className="p-1.5 hover:bg-red-50 rounded-lg text-slate-400 hover:text-red-600"><Trash2 className="w-3.5 h-3.5" /></button>
              </div>
            </div>
          ))}
        </div>
      </Card>
      <ArticleModal open={modalOpen} editing={editing} form={form} setForm={setForm} saving={saving} onSave={handleSave} onClose={() => setModalOpen(false)} />
    </div>
  );
}

/* ══════════════════════  TAB 5: NEWSLETTER CTA  ══════════════════════ */
function NewsletterSection() {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false); const [saved, setSaved] = useState(false);
  const [enabled, setEnabled] = useState(true);
  const [data, setData] = useState({ title: "Never Miss an Update", subtitle: "Subscribe to our newsletter for the latest news, events, and stories delivered to your inbox.", btn_text: "Subscribe", input_placeholder: "Your email address" });
  useEffect(() => { loadSection("news_newsletter").then(r => { if (r.data) setData(p => ({ ...p, ...r.data })); setEnabled(!!r.is_enabled); setLoading(false); }).catch(() => setLoading(false)); }, []);
  const save = useCallback(async () => { setSaving(true); await saveSection("news_newsletter", data, enabled); setSaving(false); setSaved(true); setTimeout(() => setSaved(false), 3000); }, [data, enabled]);
  if (loading) return <SectionLoader />;
  return (
    <Card>
      <SectionToggleHeader title="Newsletter CTA" description="Bottom call-to-action banner with email signup form." enabled={enabled} onToggle={setEnabled} />
      <div className="p-5 sm:p-6 grid grid-cols-1 md:grid-cols-2 gap-5">
        <Field label="Title" required><Input value={data.title} onChange={e => setData(d => ({ ...d, title: e.target.value }))} /></Field>
        <Field label="Button Text"><Input value={data.btn_text} onChange={e => setData(d => ({ ...d, btn_text: e.target.value }))} /></Field>
        <div className="md:col-span-2"><Field label="Description"><Textarea rows={2} value={data.subtitle} onChange={e => setData(d => ({ ...d, subtitle: e.target.value }))} /></Field></div>
        <Field label="Input Placeholder"><Input value={data.input_placeholder} onChange={e => setData(d => ({ ...d, input_placeholder: e.target.value }))} /></Field>
      </div>
      <SaveBar saving={saving} saved={saved} onSave={save} />
    </Card>
  );
}
