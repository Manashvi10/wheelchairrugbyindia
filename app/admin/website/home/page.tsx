"use client";

import { useState, useEffect, useCallback } from "react";
import {
  Image as ImageIcon,
  Info,
  Megaphone,
  Hash,
  Target,
  Clock,
  Phone,
  Quote,
  Images,
  Eye,
  Plus,
  Trash2,
  Upload,
  ChevronUp,
  ChevronDown,
  Save,
  Loader2,
  CheckCircle2,
} from "lucide-react";
import { PageHeader, Card, Button, Field, Input, Textarea, Toggle, Badge } from "../../components/ui";

const TABS = [
  { id: "hero", label: "Hero Section", icon: ImageIcon },
  { id: "about", label: "About Preview", icon: Info },
  { id: "announcement", label: "Announcement Banner", icon: Megaphone },
  { id: "stats", label: "Numbers That Inspire", icon: Hash },
  { id: "vmv", label: "Vision / Motto / Values", icon: Target },
  { id: "timeline", label: "Journey Timeline", icon: Clock },
  { id: "gallery", label: "Photo Gallery", icon: Images },
  { id: "contact", label: "Contact Section", icon: Phone },
  { id: "testimonials", label: "Testimonials", icon: Quote },
];

export default function HomePageCMS() {
  const [active, setActive] = useState("hero");

  return (
    <div className="space-y-6">
      <PageHeader
        title="Home Page CMS"
        subtitle="Manage every section of your homepage from one place."
        breadcrumbs={[
          { label: "Admin", href: "/admin" },
          { label: "Website Management" },
          { label: "Home Page" },
        ]}
        actions={
          <Button variant="outline" onClick={() => window.open("/", "_blank")}>
            <Eye className="w-4 h-4" /> Preview Site
          </Button>
        }
      />

      <div className="grid grid-cols-1 lg:grid-cols-[260px_1fr] gap-6">
        <Card className="p-2 h-fit lg:sticky lg:top-20">
          <div className="px-3 py-2 text-[10px] font-bold uppercase tracking-widest text-slate-400">
            Page Sections
          </div>
          <ul className="space-y-0.5">
            {TABS.map((t, i) => {
              const Icon = t.icon;
              const isActive = active === t.id;
              return (
                <li key={t.id}>
                  <button
                    onClick={() => setActive(t.id)}
                    className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm transition ${
                      isActive ? "bg-saffron text-white font-semibold shadow" : "text-slate-700 hover:bg-slate-100"
                    }`}
                  >
                    <span className={`w-5 h-5 rounded text-[10px] font-bold flex items-center justify-center ${isActive ? "bg-white/20" : "bg-slate-100 text-slate-500"}`}>
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <Icon className="w-3.5 h-3.5 shrink-0" />
                    <span className="truncate text-left">{t.label}</span>
                  </button>
                </li>
              );
            })}
          </ul>
        </Card>

        <div className="space-y-6 min-w-0">
          {active === "hero" && <HeroSection />}
          {active === "about" && <AboutPreviewSection />}
          {active === "announcement" && <AnnouncementSection />}
          {active === "stats" && <StatsSection />}
          {active === "vmv" && <VMVSection />}
          {active === "timeline" && <TimelineSection />}
          {active === "gallery" && <GallerySection />}
          {active === "contact" && <ContactSection />}
          {active === "testimonials" && <TestimonialsSection />}
        </div>
      </div>
    </div>
  );
}

/* ─── Shared helpers ─── */

function SectionToggleHeader({ title, description, enabled, onToggle }: {
  title: string; description: string; enabled: boolean; onToggle: (v: boolean) => void;
}) {
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
        : <span className="text-xs text-slate-400">Changes will be published to the live website</span>
      }
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
        <span className="text-sm">Loading section data…</span>
      </div>
    </Card>
  );
}

function ImageUploader({ value, onChange, label, aspect = "video" }: {
  value?: string; onChange: (url: string) => void; label: string; aspect?: "video" | "square";
}) {
  const [uploading, setUploading] = useState(false);
  const id = `upload-${label.replace(/\W+/g, "-")}`;

  const handleFile = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    const fd = new FormData();
    fd.append("file", file);
    try {
      const res = await fetch("/api/upload", { method: "POST", body: fd });
      const data = await res.json();
      if (data.url) onChange(data.url);
    } catch { /* ignore */ }
    setUploading(false);
    e.target.value = "";
  };

  const aspectClass = aspect === "square" ? "aspect-square" : "aspect-video";

  return (
    <div>
      <label className="block text-xs font-semibold text-slate-700 mb-1.5">{label}</label>
      <div
        className={`${aspectClass} bg-slate-50 border-2 border-dashed border-slate-200 rounded-xl flex flex-col items-center justify-center text-center p-6 hover:border-saffron hover:bg-orange-50/30 transition cursor-pointer relative overflow-hidden`}
        onClick={() => document.getElementById(id)?.click()}
      >
        {value ? (
          <>
            <img src={value} alt="" className="absolute inset-0 w-full h-full object-cover rounded-xl" />
            <div className="absolute inset-0 bg-black/40 opacity-0 hover:opacity-100 transition flex items-center justify-center rounded-xl">
              <span className="text-white text-sm font-semibold flex items-center gap-2"><Upload className="w-4 h-4" /> Change image</span>
            </div>
          </>
        ) : uploading ? (
          <Loader2 className="w-8 h-8 text-saffron animate-spin" />
        ) : (
          <>
            <Upload className="w-8 h-8 text-slate-400 mb-2" />
            <div className="text-sm font-semibold text-slate-700">Click to upload</div>
            <div className="text-xs text-slate-400 mt-1">PNG, JPG, WEBP up to 5 MB</div>
          </>
        )}
        {uploading && value && (
          <div className="absolute inset-0 bg-black/50 flex items-center justify-center rounded-xl">
            <Loader2 className="w-8 h-8 text-white animate-spin" />
          </div>
        )}
      </div>
      <input id={id} type="file" accept="image/*" className="hidden" onChange={handleFile} />
    </div>
  );
}

async function loadSection(key: string) {
  const res = await fetch(`/api/cms/${key}`);
  const json = await res.json();
  return json;
}

async function saveSection(key: string, data: unknown, is_enabled: boolean) {
  await fetch(`/api/cms/${key}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ data, is_enabled }),
  });
}

/* ────────────────────────────────  SECTIONS  ──────────────────────────────── */

function HeroSection() {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [enabled, setEnabled] = useState(true);
  const [data, setData] = useState({
    title: "Wheelchair Rugby Federation of India",
    tagline: '"Sports With Different Ability"',
    btn_primary_text: "Explore Events", btn_primary_url: "#events",
    btn_secondary_text: "Join Us", btn_secondary_url: "#contact",
    slides: [
      { image: "/images/home.jpg", alt: "WRFI Team Photo" },
      { image: "/images/slider2.png", alt: "Players in action" },
      { image: "/images/slider3.png", alt: "Match day" },
    ],
    athletes: [
      { name: "Abhinav Bindra", image: "/images/s1.png" },
      { name: "Yogeshwar Dutt", image: "/images/s2.png" },
      { name: "Manu Bhaker", image: "/images/s3.png" },
    ],
  });

  useEffect(() => {
    loadSection("hero").then((r) => {
      if (r.data) setData(r.data);
      if (r.is_enabled !== undefined) setEnabled(!!r.is_enabled);
      setLoading(false);
    }).catch(() => setLoading(false));
  }, []);

  const handleSave = useCallback(async () => {
    setSaving(true);
    await saveSection("hero", data, enabled);
    setSaving(false); setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  }, [data, enabled]);

  if (loading) return <SectionLoader />;

  return (
    <Card>
      <SectionToggleHeader title="Hero Section" description="Homepage hero — title, tagline, CTA buttons and background slides." enabled={enabled} onToggle={setEnabled} />
      <div className="p-5 sm:p-6 space-y-5">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          {(data.slides ?? []).map((slide, i) => (
            <ImageUploader key={i} label={`Slide ${i + 1}`} value={slide.image}
              onChange={(url) => { const s = [...data.slides]; s[i] = { ...s[i], image: url }; setData({ ...data, slides: s }); }} />
          ))}
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Field label="Hero Title" required>
            <Input value={data.title} onChange={(e) => setData({ ...data, title: e.target.value })} />
          </Field>
          <Field label="Tagline / Motto">
            <Input value={data.tagline} onChange={(e) => setData({ ...data, tagline: e.target.value })} />
          </Field>
          <Field label="Primary Button Text">
            <Input value={data.btn_primary_text} onChange={(e) => setData({ ...data, btn_primary_text: e.target.value })} />
          </Field>
          <Field label="Primary Button URL">
            <Input value={data.btn_primary_url} onChange={(e) => setData({ ...data, btn_primary_url: e.target.value })} />
          </Field>
          <Field label="Secondary Button Text">
            <Input value={data.btn_secondary_text} onChange={(e) => setData({ ...data, btn_secondary_text: e.target.value })} />
          </Field>
          <Field label="Secondary Button URL">
            <Input value={data.btn_secondary_url} onChange={(e) => setData({ ...data, btn_secondary_url: e.target.value })} />
          </Field>
        </div>
        <div>
          <p className="text-xs font-semibold text-slate-600 mb-3">Featured Athletes (Homepage Cards)</p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {(data.athletes ?? []).map((a, i) => (
              <div key={i} className="border border-slate-200 rounded-xl p-3 space-y-2">
                <ImageUploader label={`Athlete ${i + 1} Photo`} aspect="square" value={a.image}
                  onChange={(url) => { const arr = [...data.athletes]; arr[i] = { ...arr[i], image: url }; setData({ ...data, athletes: arr }); }} />
                <Input placeholder="Athlete name" value={a.name}
                  onChange={(e) => { const arr = [...data.athletes]; arr[i] = { ...arr[i], name: e.target.value }; setData({ ...data, athletes: arr }); }} />
              </div>
            ))}
          </div>
        </div>
      </div>
      <SaveBar saving={saving} saved={saved} onSave={handleSave} />
    </Card>
  );
}

function AboutPreviewSection() {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [enabled, setEnabled] = useState(true);
  const [data, setData] = useState({
    section_badge: "About WRFI", title: "Empowering Athletes,", title_gradient: "Transforming Lives",
    since_year: "2009", video_url: "https://www.youtube.com/embed/vZL79Cq20eo?autoplay=1&mute=1&loop=1&playlist=vZL79Cq20eo",
    body1: "", body2: "", btn1_text: "Our Journey", btn1_url: "#history", btn2_text: "Our Mission", btn2_url: "#vision",
  });

  useEffect(() => {
    loadSection("about").then((r) => {
      if (r.data) setData((prev) => ({ ...prev, ...(r.data as object) }));
      if (r.is_enabled !== undefined) setEnabled(!!r.is_enabled);
      setLoading(false);
    }).catch(() => setLoading(false));
  }, []);

  const handleSave = useCallback(async () => {
    setSaving(true); await saveSection("about", data, enabled);
    setSaving(false); setSaved(true); setTimeout(() => setSaved(false), 3000);
  }, [data, enabled]);

  if (loading) return <SectionLoader />;

  return (
    <Card>
      <SectionToggleHeader title="About Preview" description="WRFI intro section with video embed, title, body text, and CTA buttons." enabled={enabled} onToggle={setEnabled} />
      <div className="p-5 sm:p-6 grid grid-cols-1 md:grid-cols-2 gap-5">
        <Field label="Section Badge"><Input value={data.section_badge} onChange={(e) => setData({ ...data, section_badge: e.target.value })} /></Field>
        <Field label="Since Year"><Input value={data.since_year} onChange={(e) => setData({ ...data, since_year: e.target.value })} /></Field>
        <Field label="Title"><Input value={data.title} onChange={(e) => setData({ ...data, title: e.target.value })} /></Field>
        <Field label="Title Gradient Word"><Input value={data.title_gradient} onChange={(e) => setData({ ...data, title_gradient: e.target.value })} /></Field>
        <div className="md:col-span-2"><Field label="YouTube Embed URL"><Input value={data.video_url} onChange={(e) => setData({ ...data, video_url: e.target.value })} /></Field></div>
        <div className="md:col-span-2"><Field label="Body Paragraph 1"><Textarea rows={3} value={data.body1} onChange={(e) => setData({ ...data, body1: e.target.value })} /></Field></div>
        <div className="md:col-span-2"><Field label="Body Paragraph 2"><Textarea rows={3} value={data.body2} onChange={(e) => setData({ ...data, body2: e.target.value })} /></Field></div>
        <Field label="Button 1 Text"><Input value={data.btn1_text} onChange={(e) => setData({ ...data, btn1_text: e.target.value })} /></Field>
        <Field label="Button 1 URL"><Input value={data.btn1_url} onChange={(e) => setData({ ...data, btn1_url: e.target.value })} /></Field>
        <Field label="Button 2 Text"><Input value={data.btn2_text} onChange={(e) => setData({ ...data, btn2_text: e.target.value })} /></Field>
        <Field label="Button 2 URL"><Input value={data.btn2_url} onChange={(e) => setData({ ...data, btn2_url: e.target.value })} /></Field>
      </div>
      <SaveBar saving={saving} saved={saved} onSave={handleSave} />
    </Card>
  );
}

function AnnouncementSection() {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [enabled, setEnabled] = useState(true);
  const [data, setData] = useState({
    badge: "Historic Achievement", title: "", highlight: "Para Asian Games! 🇮🇳",
    description: "", btn_text: "View Events", btn_url: "/events",
    start_date: "2025-01-01", end_date: "2026-12-31",
  });

  useEffect(() => {
    loadSection("announcement").then((r) => {
      if (r.data) setData((prev) => ({ ...prev, ...(r.data as object) }));
      if (r.is_enabled !== undefined) setEnabled(!!r.is_enabled);
      setLoading(false);
    }).catch(() => setLoading(false));
  }, []);

  const handleSave = useCallback(async () => {
    setSaving(true); await saveSection("announcement", data, enabled);
    setSaving(false); setSaved(true); setTimeout(() => setSaved(false), 3000);
  }, [data, enabled]);

  if (loading) return <SectionLoader />;

  return (
    <Card>
      <SectionToggleHeader title="Announcement Banner" description="Full-width banner for major announcements. Shown between About and Stats." enabled={enabled} onToggle={setEnabled} />
      <div className="p-5 sm:p-6 grid grid-cols-1 md:grid-cols-2 gap-5">
        <Field label="Badge Label"><Input value={data.badge} onChange={(e) => setData({ ...data, badge: e.target.value })} /></Field>
        <Field label="Highlight Text (large)"><Input value={data.highlight} onChange={(e) => setData({ ...data, highlight: e.target.value })} /></Field>
        <div className="md:col-span-2"><Field label="Title"><Input value={data.title} onChange={(e) => setData({ ...data, title: e.target.value })} /></Field></div>
        <div className="md:col-span-2"><Field label="Description"><Textarea rows={3} value={data.description} onChange={(e) => setData({ ...data, description: e.target.value })} /></Field></div>
        <Field label="CTA Button Text"><Input value={data.btn_text} onChange={(e) => setData({ ...data, btn_text: e.target.value })} /></Field>
        <Field label="CTA Button URL"><Input value={data.btn_url} onChange={(e) => setData({ ...data, btn_url: e.target.value })} /></Field>
        <Field label="Show From (date)"><Input type="date" value={data.start_date} onChange={(e) => setData({ ...data, start_date: e.target.value })} /></Field>
        <Field label="Show Until (date)"><Input type="date" value={data.end_date} onChange={(e) => setData({ ...data, end_date: e.target.value })} /></Field>
      </div>
      <SaveBar saving={saving} saved={saved} onSave={handleSave} />
    </Card>
  );
}

type StatItem = { icon: string; value: number; suffix: string; label: string };

function StatsSection() {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [enabled, setEnabled] = useState(true);
  const [counters, setCounters] = useState<StatItem[]>([
    { icon: "Users", value: 220, suffix: "+", label: "Players" },
    { icon: "Calendar", value: 15, suffix: "+", label: "Events" },
    { icon: "MapPin", value: 10, suffix: "+", label: "States" },
    { icon: "UserCheck", value: 40, suffix: "+", label: "Women Athletes" },
  ]);

  useEffect(() => {
    loadSection("stats").then((r) => {
      if (Array.isArray(r.data) && r.data.length) setCounters(r.data as StatItem[]);
      if (r.is_enabled !== undefined) setEnabled(!!r.is_enabled);
      setLoading(false);
    }).catch(() => setLoading(false));
  }, []);

  const handleSave = useCallback(async () => {
    setSaving(true); await saveSection("stats", counters, enabled);
    setSaving(false); setSaved(true); setTimeout(() => setSaved(false), 3000);
  }, [counters, enabled]);

  const updateCounter = (i: number, field: keyof StatItem, val: string | number) => {
    setCounters(counters.map((c, idx) => idx === i ? { ...c, [field]: val } : c));
  };

  if (loading) return <SectionLoader />;

  return (
    <Card>
      <SectionToggleHeader title="Numbers That Inspire" description="Animated counters showcasing WRFI reach and impact." enabled={enabled} onToggle={setEnabled} />
      <div className="p-5 sm:p-6">
        <div className="flex items-center justify-between mb-4">
          <p className="text-sm text-slate-500">{counters.length} counters</p>
          <Button variant="secondary" size="sm" onClick={() => setCounters([...counters, { icon: "Star", value: 0, suffix: "+", label: "New Stat" }])}>
            <Plus className="w-3.5 h-3.5" /> Add Counter
          </Button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {counters.map((c, i) => (
            <div key={i} className="border border-slate-200 rounded-xl p-4 space-y-2">
              <div className="grid grid-cols-[1fr_90px_64px] gap-2">
                <Field label="Icon Name"><Input value={c.icon} onChange={(e) => updateCounter(i, "icon", e.target.value)} placeholder="Users" /></Field>
                <Field label="Value"><Input type="number" value={c.value} onChange={(e) => updateCounter(i, "value", Number(e.target.value))} /></Field>
                <Field label="Suffix"><Input value={c.suffix} onChange={(e) => updateCounter(i, "suffix", e.target.value)} /></Field>
              </div>
              <div className="flex gap-2 items-end">
                <div className="flex-1">
                  <Field label="Label"><Input value={c.label} onChange={(e) => updateCounter(i, "label", e.target.value)} /></Field>
                </div>
                <button onClick={() => setCounters(counters.filter((_, j) => j !== i))}
                  className="h-[42px] w-10 flex items-center justify-center text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg">
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
      <SaveBar saving={saving} saved={saved} onSave={handleSave} />
    </Card>
  );
}

type VMVItem = { type: string; title: string; description: string };

function VMVSection() {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [enabled, setEnabled] = useState(true);
  const [items, setItems] = useState<VMVItem[]>([
    { type: "Vision", title: "Our Vision", description: "" },
    { type: "Motto", title: "Our Motto", description: "" },
    { type: "Values", title: "Our Values", description: "" },
  ]);

  useEffect(() => {
    loadSection("vmv").then((r) => {
      if (Array.isArray(r.data) && r.data.length) setItems(r.data as VMVItem[]);
      if (r.is_enabled !== undefined) setEnabled(!!r.is_enabled);
      setLoading(false);
    }).catch(() => setLoading(false));
  }, []);

  const handleSave = useCallback(async () => {
    setSaving(true); await saveSection("vmv", items, enabled);
    setSaving(false); setSaved(true); setTimeout(() => setSaved(false), 3000);
  }, [items, enabled]);

  const update = (i: number, field: keyof VMVItem, val: string) =>
    setItems(items.map((it, idx) => idx === i ? { ...it, [field]: val } : it));

  if (loading) return <SectionLoader />;

  return (
    <Card>
      <SectionToggleHeader title="Vision / Motto / Values" description='Three pillars shown under "What Drives Us".' enabled={enabled} onToggle={setEnabled} />
      <div className="p-5 sm:p-6">
        <div className="flex justify-end mb-3">
          <Button variant="secondary" size="sm" onClick={() => setItems([...items, { type: "New", title: "New Card", description: "" }])}>
            <Plus className="w-3.5 h-3.5" /> Add Card
          </Button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {items.map((it, i) => (
            <div key={i} className="border border-slate-200 rounded-xl p-4 space-y-3">
              <div className="flex items-center justify-between">
                <Badge color="orange">{it.type}</Badge>
                <button onClick={() => setItems(items.filter((_, j) => j !== i))} className="p-1.5 text-slate-400 hover:text-red-600">
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
              <Field label="Type"><Input value={it.type} onChange={(e) => update(i, "type", e.target.value)} /></Field>
              <Field label="Title"><Input value={it.title} onChange={(e) => update(i, "title", e.target.value)} /></Field>
              <Field label="Description"><Textarea rows={4} value={it.description} onChange={(e) => update(i, "description", e.target.value)} /></Field>
            </div>
          ))}
        </div>
      </div>
      <SaveBar saving={saving} saved={saved} onSave={handleSave} />
    </Card>
  );
}

type MilestoneItem = { year: string; title: string; description: string; color: string; icon?: string };

const HOME_DEFAULT_MILESTONES: MilestoneItem[] = [
  { year: "1977", title: "Sport Invented", description: "Wheelchair rugby was invented in Winnipeg, Canada by quadriplegic athletes seeking an inclusive competitive sport.", icon: "Flag", color: "saffron" },
  { year: "1993", title: "IWRF Established", description: "The International Wheelchair Rugby Federation was formed to govern the sport globally.", icon: "Globe", color: "blue" },
  { year: "1996", title: "Paralympic Debut", description: "Wheelchair rugby featured as a demonstration sport at the Atlanta Paralympics.", icon: "Trophy", color: "green" },
  { year: "2000", title: "Full Medal Sport", description: "Became an official medal sport at the Sydney 2000 Paralympic Games.", icon: "Medal", color: "gold" },
  { year: "2009", title: "Introduced in India", description: "Wheelchair rugby was introduced in India, igniting a new chapter in Indian para-sports history.", icon: "Flag", color: "saffron" },
  { year: "2019", title: "WRFI Established", description: "Wheelchair Rugby Federation of India was officially formed as the national governing body.", icon: "Star", color: "blue" },
  { year: "2024", title: "International Debut", description: "Team India competed in its first international wheelchair rugby tournament on the global stage.", icon: "Globe", color: "green" },
];

function TimelineSection() {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [enabled, setEnabled] = useState(true);
  const [eyebrow, setEyebrow] = useState("Milestones");
  const [title, setTitle] = useState("The Journey of Wheelchair Rugby");
  const [entries, setEntries] = useState<MilestoneItem[]>(HOME_DEFAULT_MILESTONES);

  useEffect(() => {
    loadSection("timeline").then((r) => {
      // Support both old array format and new object format (shared with history admin)
      if (Array.isArray(r.data) && r.data.length) {
        setEntries(r.data as MilestoneItem[]);
      } else if (r.data && typeof r.data === "object") {
        const d = r.data as { eyebrow?: string; title?: string; entries?: MilestoneItem[] };
        if (d.eyebrow) setEyebrow(d.eyebrow);
        if (d.title) setTitle(d.title);
        if (d.entries && d.entries.length) setEntries(d.entries);
      }
      if (r.is_enabled !== undefined) setEnabled(!!r.is_enabled);
      setLoading(false);
    }).catch(() => setLoading(false));
  }, []);

  const handleSave = useCallback(async () => {
    setSaving(true);
    await saveSection("timeline", { eyebrow, title, entries, enabled }, enabled);
    setSaving(false); setSaved(true); setTimeout(() => setSaved(false), 3000);
  }, [eyebrow, title, entries, enabled]);

  const update = (i: number, field: keyof MilestoneItem, val: string) =>
    setEntries(entries.map((e, idx) => idx === i ? { ...e, [field]: val } : e));

  const move = (i: number, dir: -1 | 1) => {
    const arr = [...entries];
    const j = i + dir;
    if (j < 0 || j >= arr.length) return;
    [arr[i], arr[j]] = [arr[j], arr[i]];
    setEntries(arr);
  };

  if (loading) return <SectionLoader />;

  return (
    <Card>
      <SectionToggleHeader title="Journey Timeline" description="Shared with History page. Milestones display on home & /history." enabled={enabled} onToggle={setEnabled} />
      <div className="p-5 sm:p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-4">
          <Field label="Section Eyebrow"><Input value={eyebrow} onChange={(ev) => setEyebrow(ev.target.value)} /></Field>
          <Field label="Section Title"><Input value={title} onChange={(ev) => setTitle(ev.target.value)} /></Field>
        </div>
        <div className="flex items-center justify-between mb-4">
          <p className="text-sm text-slate-500">{entries.length} milestones</p>
          <Button variant="secondary" size="sm" onClick={() => setEntries([...entries, { year: "2025", title: "New Milestone", description: "", icon: "Flag", color: "saffron" }])}>
            <Plus className="w-3.5 h-3.5" /> Add Milestone
          </Button>
        </div>
        <div className="space-y-3">
          {entries.map((e, i) => (
            <div key={i} className="border border-slate-200 rounded-xl p-4 space-y-3">
              <div className="grid grid-cols-1 md:grid-cols-[100px_1fr_1fr_1fr_auto] gap-3 items-start">
                <Field label="Year"><Input value={e.year} onChange={(ev) => update(i, "year", ev.target.value)} /></Field>
                <Field label="Title"><Input value={e.title} onChange={(ev) => update(i, "title", ev.target.value)} /></Field>
                <Field label="Icon"><Input value={e.icon || "Flag"} onChange={(ev) => update(i, "icon", ev.target.value)} placeholder="Flag, Globe, Trophy, Medal, Star" /></Field>
                <Field label="Color"><Input value={e.color} onChange={(ev) => update(i, "color", ev.target.value)} placeholder="saffron, blue, green, gold" /></Field>
                <div className="flex items-end gap-1 h-full pb-0.5">
                  <button onClick={() => move(i, -1)} className="p-2 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded-lg"><ChevronUp className="w-3.5 h-3.5" /></button>
                  <button onClick={() => move(i, 1)} className="p-2 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded-lg"><ChevronDown className="w-3.5 h-3.5" /></button>
                  <button onClick={() => setEntries(entries.filter((_, j) => j !== i))} className="p-2 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg"><Trash2 className="w-3.5 h-3.5" /></button>
                </div>
              </div>
              <Field label="Description"><Input value={e.description} onChange={(ev) => update(i, "description", ev.target.value)} /></Field>
            </div>
          ))}
        </div>
      </div>
      <SaveBar saving={saving} saved={saved} onSave={handleSave} />
    </Card>
  );
}

function ContactSection() {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [enabled, setEnabled] = useState(true);
  const [data, setData] = useState({
    email: "info@wrfi.org", phone: "+91 98765 43210",
    address: "WRFI Headquarters, Sector 18, Noida, Uttar Pradesh — 201301, India",
    maps_url: "", facebook: "https://facebook.com/wrfi",
    instagram: "https://instagram.com/wrfi", twitter: "https://x.com/wrfi", youtube: "https://youtube.com/@wrfi",
  });

  useEffect(() => {
    loadSection("contact").then((r) => {
      if (r.data) setData((prev) => ({ ...prev, ...(r.data as object) }));
      if (r.is_enabled !== undefined) setEnabled(!!r.is_enabled);
      setLoading(false);
    }).catch(() => setLoading(false));
  }, []);

  const handleSave = useCallback(async () => {
    setSaving(true); await saveSection("contact", data, enabled);
    setSaving(false); setSaved(true); setTimeout(() => setSaved(false), 3000);
  }, [data, enabled]);

  if (loading) return <SectionLoader />;

  return (
    <Card>
      <SectionToggleHeader title="Contact Section" description="Contact info shown on homepage. Changes appear immediately on the live site." enabled={enabled} onToggle={setEnabled} />
      <div className="p-5 sm:p-6 grid grid-cols-1 md:grid-cols-2 gap-5">
        <Field label="Email" required><Input value={data.email} onChange={(e) => setData({ ...data, email: e.target.value })} /></Field>
        <Field label="Phone"><Input value={data.phone} onChange={(e) => setData({ ...data, phone: e.target.value })} /></Field>
        <div className="md:col-span-2"><Field label="Address"><Textarea rows={2} value={data.address} onChange={(e) => setData({ ...data, address: e.target.value })} /></Field></div>
        <div className="md:col-span-2"><Field label="Google Maps Embed URL"><Input value={data.maps_url} onChange={(e) => setData({ ...data, maps_url: e.target.value })} /></Field></div>
        <Field label="Facebook URL"><Input value={data.facebook} onChange={(e) => setData({ ...data, facebook: e.target.value })} /></Field>
        <Field label="Instagram URL"><Input value={data.instagram} onChange={(e) => setData({ ...data, instagram: e.target.value })} /></Field>
        <Field label="Twitter / X URL"><Input value={data.twitter} onChange={(e) => setData({ ...data, twitter: e.target.value })} /></Field>
        <Field label="YouTube URL"><Input value={data.youtube} onChange={(e) => setData({ ...data, youtube: e.target.value })} /></Field>
      </div>
      <SaveBar saving={saving} saved={saved} onSave={handleSave} />
    </Card>
  );
}

type TestimonialRow = { id: number; name: string; role: string; quote_text: string; avatar_url: string | null; rating: number; status: string };

function TestimonialsSection() {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [items, setItems] = useState<TestimonialRow[]>([]);
  const [adding, setAdding] = useState(false);
  const [newItem, setNewItem] = useState({ name: "", role: "", quote_text: "", rating: 5 });

  const fetchItems = useCallback(async () => {
    try {
      const res = await fetch("/api/testimonials");
      const data = await res.json();
      if (data.testimonials) setItems(data.testimonials);
    } catch { /* ignore */ }
    setLoading(false);
  }, []);

  useEffect(() => { fetchItems(); }, [fetchItems]);

  const updateStatus = async (id: number, status: string) => {
    await fetch(`/api/testimonials/${id}`, { method: "PATCH", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ status }) });
    setItems(items.map((t) => t.id === id ? { ...t, status } : t));
  };

  const deleteItem = async (id: number) => {
    await fetch(`/api/testimonials/${id}`, { method: "DELETE" });
    setItems(items.filter((t) => t.id !== id));
  };

  const addItem = async () => {
    if (!newItem.name || !newItem.quote_text) return;
    setSaving(true);
    await fetch("/api/testimonials", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(newItem) });
    setSaving(false); setAdding(false); setNewItem({ name: "", role: "", quote_text: "", rating: 5 });
    fetchItems();
  };

  if (loading) return <SectionLoader />;

  return (
    <Card>
      <SectionToggleHeader title="Testimonials" description="Approve and manage testimonials shown on the homepage." enabled={true} onToggle={() => {}} />
      <div className="p-5 sm:p-6">
        <div className="flex items-center justify-between mb-4">
          <p className="text-sm text-slate-500">{items.length} testimonial{items.length !== 1 ? "s" : ""}</p>
          <Button variant="secondary" size="sm" onClick={() => setAdding(true)}><Plus className="w-3.5 h-3.5" /> Add Testimonial</Button>
        </div>

        {adding && (
          <div className="border border-saffron/40 bg-orange-50/30 rounded-xl p-4 mb-4 space-y-3">
            <p className="text-sm font-semibold text-navy">New Testimonial</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <Field label="Name" required><Input value={newItem.name} onChange={(e) => setNewItem({ ...newItem, name: e.target.value })} /></Field>
              <Field label="Role / Title"><Input value={newItem.role} onChange={(e) => setNewItem({ ...newItem, role: e.target.value })} /></Field>
              <div className="md:col-span-2"><Field label="Quote" required><Textarea rows={3} value={newItem.quote_text} onChange={(e) => setNewItem({ ...newItem, quote_text: e.target.value })} /></Field></div>
            </div>
            <div className="flex gap-2 justify-end">
              <Button variant="outline" size="sm" onClick={() => setAdding(false)}>Cancel</Button>
              <Button variant="primary" size="sm" onClick={addItem} disabled={saving}>{saving ? <Loader2 className="w-4 h-4 animate-spin" /> : "Add"}</Button>
            </div>
          </div>
        )}

        <div className="space-y-3">
          {items.length === 0 && <p className="text-center text-slate-400 text-sm py-8">No testimonials yet. Add one above.</p>}
          {items.map((t) => (
            <div key={t.id} className="border border-slate-200 rounded-xl p-4 flex items-start gap-3">
              <div className="w-11 h-11 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 text-white flex items-center justify-center font-bold text-base shrink-0">
                {t.name[0]}
              </div>
              <div className="flex-1 min-w-0">
                <div className="font-semibold text-sm text-slate-800 flex items-center gap-2">
                  {t.name}
                  <span className="text-saffron text-xs">{"★".repeat(t.rating ?? 5)}</span>
                </div>
                <div className="text-xs text-slate-500 mb-1">{t.role}</div>
                <p className="text-xs text-slate-600 line-clamp-2 italic">&ldquo;{t.quote_text}&rdquo;</p>
              </div>
              <div className="flex items-center gap-2 shrink-0">
                <Badge color={t.status === "approved" ? "green" : t.status === "rejected" ? "red" : "yellow"}>{t.status}</Badge>
                {t.status !== "approved" && <Button size="sm" variant="outline" onClick={() => updateStatus(t.id, "approved")}>Approve</Button>}
                {t.status !== "rejected" && <Button size="sm" variant="danger" onClick={() => updateStatus(t.id, "rejected")}>Reject</Button>}
                <button onClick={() => deleteItem(t.id)} className="p-1.5 text-slate-400 hover:text-red-600"><Trash2 className="w-3.5 h-3.5" /></button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Card>
  );
}

type GalleryItem = { src: string; alt: string; span?: string };

const DEFAULT_GALLERY_ITEMS: GalleryItem[] = [
  { src: "/images/g1.jpg", alt: "Wheelchair rugby match in action", span: "col-span-2 row-span-2" },
  { src: "/images/g2.jpg", alt: "Athletes training on the court", span: "" },
  { src: "/images/g3.jpg", alt: "Team huddle before a game", span: "" },
  { src: "/images/g4.jpg", alt: "Championship celebration", span: "" },
  { src: "/images/g5.jpg", alt: "Coaching session with athletes", span: "" },
  { src: "/images/g6.jpg", alt: "National championship opening ceremony", span: "col-span-2" },
];

function GallerySection() {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [enabled, setEnabled] = useState(true);
  const [items, setItems] = useState<GalleryItem[]>(DEFAULT_GALLERY_ITEMS);

  useEffect(() => {
    loadSection("gallery").then((r) => {
      if (Array.isArray(r.data) && r.data.length) setItems(r.data as GalleryItem[]);
      if (r.is_enabled !== undefined) setEnabled(!!r.is_enabled);
      setLoading(false);
    }).catch(() => setLoading(false));
  }, []);

  const handleSave = useCallback(async () => {
    setSaving(true);
    await saveSection("gallery", items, enabled);
    setSaving(false); setSaved(true); setTimeout(() => setSaved(false), 3000);
  }, [items, enabled]);

  const update = (i: number, field: keyof GalleryItem, val: string) =>
    setItems(items.map((it, idx) => idx === i ? { ...it, [field]: val } : it));

  if (loading) return <SectionLoader />;

  return (
    <Card>
      <SectionToggleHeader title="Photo Gallery" description="Images shown in the homepage Photo Gallery grid." enabled={enabled} onToggle={setEnabled} />
      <div className="p-5 sm:p-6">
        <div className="flex items-center justify-between mb-4">
          <p className="text-sm text-slate-500">{items.length} image{items.length !== 1 ? "s" : ""}</p>
          <Button variant="secondary" size="sm" onClick={() => setItems([...items, { src: "", alt: "", span: "" }])}>
            <Plus className="w-3.5 h-3.5" /> Add Image
          </Button>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {items.map((it, i) => (
            <div key={i} className="border border-slate-200 rounded-xl p-3 space-y-2">
              <ImageUploader label={`Image ${i + 1}`} value={it.src} onChange={(url) => update(i, "src", url)} />
              <Field label="Caption / Alt Text">
                <Input value={it.alt} onChange={(e) => update(i, "alt", e.target.value)} />
              </Field>
              <div className="flex items-center justify-between gap-2">
                <label className="flex items-center gap-2 text-xs text-slate-600 cursor-pointer">
                  <input type="checkbox" className="accent-saffron" checked={(it.span ?? "").includes("col-span-2")}
                    onChange={(e) => update(i, "span", e.target.checked ? "col-span-2" : "")} />
                  Wide (2 columns)
                </label>
                <button onClick={() => setItems(items.filter((_, j) => j !== i))} className="p-1.5 text-slate-400 hover:text-red-600">
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
      <SaveBar saving={saving} saved={saved} onSave={handleSave} />
    </Card>
  );
}
