"use client";

import { useState, useEffect } from "react";
import {
  Image as ImageIcon,
  Clock,
  Trophy,
  Globe,
  TrendingUp,
  Save,
  Eye,
  Plus,
  Trash2,
  GripVertical,
  Upload,
  Edit3,
  ChevronUp,
  ChevronDown,
} from "lucide-react";
import { PageHeader, Card, Button, Field, Input, Textarea, Toggle, Badge } from "../../components/ui";

const TABS = [
  { id: "hero", label: "Page Hero", icon: ImageIcon },
  { id: "timeline", label: "Journey Timeline", icon: Clock },
];

interface TimelineEntry {
  year: string;
  title: string;
  description: string;
  icon: string;
  color: string;
}

interface HeroData {
  eyebrow: string;
  title: string;
  description: string;
  enabled: boolean;
}

interface TimelineData {
  eyebrow: string;
  title: string;
  entries: TimelineEntry[];
  enabled: boolean;
}

interface NationalEvent {
  year: string;
  title: string;
  location: string;
  teams: string;
  winner: string;
}

interface NationalsData {
  eyebrow: string;
  title: string;
  description: string;
  events: NationalEvent[];
  enabled: boolean;
}

interface InternationalEvent {
  year: string;
  title: string;
  location: string;
  result: string;
  type: string;
}

interface InternationalsData {
  eyebrow: string;
  title: string;
  description: string;
  events: InternationalEvent[];
  enabled: boolean;
}

interface SummaryStatItem {
  icon: string;
  value: string;
  label: string;
}

interface SummaryData {
  stats: SummaryStatItem[];
  enabled: boolean;
}

const DEFAULT_HERO: HeroData = {
  eyebrow: "Our Story",
  title: "History of WRFI",
  description: "From humble beginnings to national recognition — the journey of wheelchair rugby in India.",
  enabled: true,
};

const DEFAULT_TIMELINE: TimelineData = {
  eyebrow: "The Journey",
  title: "Our Milestones",
  enabled: true,
  entries: [
    { year: "2017", title: "Foundation", description: "WRFI was established to promote wheelchair rugby in India.", icon: "Rocket", color: "saffron" },
    { year: "2019", title: "First National Championship", description: "Hosted the inaugural national championship with 8 state teams.", icon: "Trophy", color: "india-green" },
    { year: "2021", title: "International Recognition", description: "Gained official recognition from IWRF (International Wheelchair Rugby Federation).", icon: "Globe", color: "blue-accent" },
    { year: "2023", title: "Growth & Expansion", description: "Expanded to 18+ states with dedicated training programs.", icon: "TrendingUp", color: "gold" },
    { year: "2025", title: "Future Vision", description: "Aiming for Paralympic qualification and nationwide grassroots development.", icon: "Target", color: "saffron" },
  ],
};

const DEFAULT_NATIONALS: NationalsData = {
  eyebrow: "Across India",
  title: "National Championships",
  description: "A history of our national tournaments and champions.",
  enabled: true,
  events: [
    { year: "2019", title: "1st National Championship", location: "New Delhi", teams: "8 State Teams", winner: "Maharashtra" },
    { year: "2020", title: "2nd National Championship", location: "Bengaluru", teams: "12 State Teams", winner: "Delhi" },
    { year: "2022", title: "3rd National Championship", location: "Chennai", teams: "16 State Teams", winner: "Punjab" },
    { year: "2023", title: "4th National Championship", location: "Hyderabad", teams: "18 State Teams", winner: "Maharashtra" },
    { year: "2024", title: "5th National Championship", location: "Kolkata", teams: "20 State Teams", winner: "Delhi" },
  ],
};

const DEFAULT_INTERNATIONALS: InternationalsData = {
  eyebrow: "Global Stage",
  title: "International Participation",
  description: "Team India's journey on the world stage.",
  enabled: true,
  events: [
    { year: "2024", title: "Asia-Oceania Championship", location: "Bangkok, Thailand", result: "Participation & Experience", type: "Continental" },
    { year: "2024", title: "IWRF Development Tournament", location: "Dubai, UAE", result: "4th Place", type: "Development" },
    { year: "2025", title: "Asia-Oceania Qualifiers", location: "Tokyo, Japan", result: "Bronze Medal", type: "Qualifiers" },
  ],
};

const DEFAULT_SUMMARY: SummaryData = {
  enabled: true,
  stats: [
    { icon: "Calendar", value: "8+", label: "Years of Growth" },
    { icon: "Users", value: "22+", label: "State Teams" },
    { icon: "Trophy", value: "5", label: "National Championships" },
    { icon: "Globe", value: "3", label: "International Events" },
  ],
};

export default function HistoryPageCMS() {
  const [active, setActive] = useState("hero");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [hero, setHero] = useState<HeroData>(DEFAULT_HERO);
  const [timeline, setTimeline] = useState<TimelineData>(DEFAULT_TIMELINE);

  useEffect(() => {
    (async () => {
      try {
        const [hRes, tRes] = await Promise.all([
          fetch("/api/history-sections"),
          fetch("/api/cms/timeline"),
        ]);
        const { sections } = await hRes.json();
        if (sections?.hero?.data) setHero(sections.hero.data as HeroData);
        const tJson = await tRes.json();
        if (tJson?.data && typeof tJson.data === "object" && !Array.isArray(tJson.data)) {
          const d = tJson.data as Partial<TimelineData> & { entries?: TimelineEntry[] };
          setTimeline({
            eyebrow: d.eyebrow ?? DEFAULT_TIMELINE.eyebrow,
            title: d.title ?? DEFAULT_TIMELINE.title,
            entries: d.entries && d.entries.length ? d.entries : DEFAULT_TIMELINE.entries,
            enabled: tJson.is_enabled !== false,
          });
        } else if (Array.isArray(tJson?.data) && tJson.data.length) {
          setTimeline((prev) => ({ ...prev, entries: tJson.data as TimelineEntry[], enabled: tJson.is_enabled !== false }));
        }
      } catch (e) {
        console.error("Failed to load history sections:", e);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  const saveAll = async () => {
    setSaving(true);
    try {
      // Hero stays in history_sections (used by /history page hero)
      await fetch("/api/history-sections", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ section_key: "hero", data: hero, is_enabled: hero.enabled }),
      });
      // Timeline is shared via homepage_sections.timeline (home + /history read this)
      await fetch("/api/cms/timeline", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ data: timeline, is_enabled: timeline.enabled }),
      });
      alert("Changes saved successfully!");
    } catch (e) {
      console.error(e);
      alert("Failed to save changes");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return <div className="flex items-center justify-center min-h-screen">Loading...</div>;
  }

  return (
    <div className="space-y-6">
      <PageHeader
        title="History Page CMS"
        subtitle="Manage the History & Journey page sections."
        breadcrumbs={[
          { label: "Admin", href: "/admin" },
          { label: "Website Management" },
          { label: "History Page" },
        ]}
        actions={
          <>
            <Button variant="outline" onClick={() => window.open("/history", "_blank")}>
              <Eye className="w-4 h-4" /> Preview
            </Button>
            <Button variant="primary" onClick={saveAll} disabled={saving}>
              <Save className="w-4 h-4" /> {saving ? "Saving..." : "Save Changes"}
            </Button>
          </>
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
                    <span className={`w-5 h-5 rounded text-[10px] font-bold flex items-center justify-center ${
                      isActive ? "bg-white/20" : "bg-slate-100 text-slate-500"
                    }`}>
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
          {active === "hero" && <HeroSection data={hero} setData={setHero} />}
          {active === "timeline" && <TimelineSection data={timeline} setData={setTimeline} />}
        </div>
      </div>
    </div>
  );
}

function SectionToggleHeader({ title, description, enabled, onToggle }: { title: string; description: string; enabled: boolean; onToggle: (v: boolean) => void; }) {
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

/* ────────────────  SECTIONS  ──────────────── */

function HeroSection({ data, setData }: { data: HeroData; setData: (d: HeroData) => void }) {
  return (
    <Card>
      <SectionToggleHeader title="Page Hero" description="Top banner of the History page." enabled={data.enabled} onToggle={(v) => setData({ ...data, enabled: v })} />
      <div className="p-5 sm:p-6 grid grid-cols-1 md:grid-cols-2 gap-5">
        <Field label="Eyebrow Label">
          <Input value={data.eyebrow} onChange={(e) => setData({ ...data, eyebrow: e.target.value })} />
        </Field>
        <Field label="Hero Title" required>
          <Input value={data.title} onChange={(e) => setData({ ...data, title: e.target.value })} />
        </Field>
        <div className="md:col-span-2">
          <Field label="Description">
            <Textarea rows={3} value={data.description} onChange={(e) => setData({ ...data, description: e.target.value })} />
          </Field>
        </div>
      </div>
    </Card>
  );
}

function TimelineSection({ data, setData }: { data: TimelineData; setData: (d: TimelineData) => void }) {
  const update = (i: number, field: keyof TimelineEntry, val: string) => {
    const entries = data.entries.map((s, idx) => idx === i ? { ...s, [field]: val } : s);
    setData({ ...data, entries });
  };
  const move = (i: number, dir: -1 | 1) => {
    const arr = [...data.entries];
    const j = i + dir;
    if (j < 0 || j >= arr.length) return;
    [arr[i], arr[j]] = [arr[j], arr[i]];
    setData({ ...data, entries: arr });
  };
  return (
    <Card>
      <SectionToggleHeader title="Journey Timeline" description="Milestones in WRFI's journey." enabled={data.enabled} onToggle={(v) => setData({ ...data, enabled: v })} />
      <div className="p-5 sm:p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-4">
          <Field label="Section Eyebrow">
            <Input value={data.eyebrow} onChange={(e) => setData({ ...data, eyebrow: e.target.value })} />
          </Field>
          <Field label="Section Title">
            <Input value={data.title} onChange={(e) => setData({ ...data, title: e.target.value })} />
          </Field>
        </div>
        <div className="flex items-center justify-between mb-4">
          <p className="text-sm text-slate-500">{data.entries.length} milestones</p>
          <Button variant="secondary" size="sm" onClick={() => setData({ ...data, entries: [...data.entries, { year: "", title: "", description: "", icon: "Star", color: "saffron" }] })}>
            <Plus className="w-3.5 h-3.5" /> Add Milestone
          </Button>
        </div>
        <div className="space-y-3">
          {data.entries.map((e, i) => (
            <div key={i} className="border border-slate-200 rounded-xl p-4 space-y-3">
              <div className="flex items-center justify-between">
                <Badge color="slate">Milestone #{i + 1}</Badge>
                <div className="flex items-center gap-1">
                  <button onClick={() => move(i, -1)} className="p-1.5 text-slate-400 hover:text-slate-700"><ChevronUp className="w-3.5 h-3.5" /></button>
                  <button onClick={() => move(i, 1)} className="p-1.5 text-slate-400 hover:text-slate-700"><ChevronDown className="w-3.5 h-3.5" /></button>
                  <button onClick={() => setData({ ...data, entries: data.entries.filter((_, j) => j !== i) })} className="p-1.5 text-slate-400 hover:text-red-600"><Trash2 className="w-3.5 h-3.5" /></button>
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                <Field label="Year" required>
                  <Input value={e.year} onChange={(ev) => update(i, "year", ev.target.value)} />
                </Field>
                <Field label="Icon" hint="Rocket, Trophy, Globe, etc.">
                  <Input value={e.icon} onChange={(ev) => update(i, "icon", ev.target.value)} />
                </Field>
                <Field label="Color" hint="saffron, india-green, blue-accent, gold">
                  <Input value={e.color} onChange={(ev) => update(i, "color", ev.target.value)} />
                </Field>
              </div>
              <Field label="Title" required>
                <Input value={e.title} onChange={(ev) => update(i, "title", ev.target.value)} />
              </Field>
              <Field label="Description">
                <Textarea rows={2} value={e.description} onChange={(ev) => update(i, "description", ev.target.value)} />
              </Field>
            </div>
          ))}
        </div>
      </div>
    </Card>
  );
}

function NationalsSection({ data, setData }: { data: NationalsData; setData: (d: NationalsData) => void }) {
  const update = (i: number, field: keyof NationalEvent, val: string) => {
    const events = data.events.map((s, idx) => idx === i ? { ...s, [field]: val } : s);
    setData({ ...data, events });
  };
  return (
    <Card>
      <SectionToggleHeader title="Para Nationals" description="National championship history table." enabled={data.enabled} onToggle={(v) => setData({ ...data, enabled: v })} />
      <div className="p-5 sm:p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-4">
          <Field label="Section Eyebrow">
            <Input value={data.eyebrow} onChange={(e) => setData({ ...data, eyebrow: e.target.value })} />
          </Field>
          <Field label="Section Title">
            <Input value={data.title} onChange={(e) => setData({ ...data, title: e.target.value })} />
          </Field>
          <div className="md:col-span-2">
            <Field label="Section Description">
              <Textarea rows={2} value={data.description} onChange={(e) => setData({ ...data, description: e.target.value })} />
            </Field>
          </div>
        </div>
        <div className="flex items-center justify-between mb-4">
          <p className="text-sm text-slate-500">{data.events.length} championships</p>
          <Button variant="secondary" size="sm" onClick={() => setData({ ...data, events: [...data.events, { year: "", title: "", location: "", teams: "", winner: "" }] })}>
            <Plus className="w-3.5 h-3.5" /> Add Row
          </Button>
        </div>
        <div className="overflow-x-auto rounded-xl border border-slate-200">
          <table className="w-full text-left text-sm">
            <thead className="bg-slate-50 text-slate-600">
              <tr>
                <th className="px-3 py-2 font-semibold">Year</th>
                <th className="px-3 py-2 font-semibold">Event</th>
                <th className="px-3 py-2 font-semibold">Location</th>
                <th className="px-3 py-2 font-semibold">Teams</th>
                <th className="px-3 py-2 font-semibold">Winner</th>
                <th className="px-3 py-2"></th>
              </tr>
            </thead>
            <tbody>
              {data.events.map((r, i) => (
                <tr key={i} className="border-t border-slate-100">
                  <td className="px-3 py-2 w-24"><Input value={r.year} onChange={(e) => update(i, "year", e.target.value)} /></td>
                  <td className="px-3 py-2"><Input value={r.title} onChange={(e) => update(i, "title", e.target.value)} /></td>
                  <td className="px-3 py-2"><Input value={r.location} onChange={(e) => update(i, "location", e.target.value)} /></td>
                  <td className="px-3 py-2"><Input value={r.teams} onChange={(e) => update(i, "teams", e.target.value)} /></td>
                  <td className="px-3 py-2"><Input value={r.winner} onChange={(e) => update(i, "winner", e.target.value)} /></td>
                  <td className="px-3 py-2 w-10">
                    <button onClick={() => setData({ ...data, events: data.events.filter((_, j) => j !== i) })} className="p-2 text-slate-400 hover:text-red-600"><Trash2 className="w-3.5 h-3.5" /></button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </Card>
  );
}

function InternationalsSection({ data, setData }: { data: InternationalsData; setData: (d: InternationalsData) => void }) {
  const update = (i: number, field: keyof InternationalEvent, val: string) => {
    const events = data.events.map((s, idx) => idx === i ? { ...s, [field]: val } : s);
    setData({ ...data, events });
  };
  return (
    <Card>
      <SectionToggleHeader title="Para Internationals" description="Team India's international participation." enabled={data.enabled} onToggle={(v) => setData({ ...data, enabled: v })} />
      <div className="p-5 sm:p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-4">
          <Field label="Section Eyebrow">
            <Input value={data.eyebrow} onChange={(e) => setData({ ...data, eyebrow: e.target.value })} />
          </Field>
          <Field label="Section Title">
            <Input value={data.title} onChange={(e) => setData({ ...data, title: e.target.value })} />
          </Field>
          <div className="md:col-span-2">
            <Field label="Section Description">
              <Textarea rows={2} value={data.description} onChange={(e) => setData({ ...data, description: e.target.value })} />
            </Field>
          </div>
        </div>
        <div className="flex items-center justify-between mb-4">
          <p className="text-sm text-slate-500">{data.events.length} international events</p>
          <Button variant="secondary" size="sm" onClick={() => setData({ ...data, events: [...data.events, { year: "", title: "", location: "", result: "", type: "" }] })}>
            <Plus className="w-3.5 h-3.5" /> Add Event
          </Button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {data.events.map((it, i) => (
            <div key={i} className="border border-slate-200 rounded-xl p-4 space-y-3">
              <div className="flex items-center justify-between">
                <Badge color="blue">{it.year || "—"} · {it.type || "—"}</Badge>
                <button onClick={() => setData({ ...data, events: data.events.filter((_, j) => j !== i) })} className="p-1.5 text-slate-400 hover:text-red-600"><Trash2 className="w-3.5 h-3.5" /></button>
              </div>
              <Field label="Event Title" required>
                <Input value={it.title} onChange={(e) => update(i, "title", e.target.value)} />
              </Field>
              <div className="grid grid-cols-2 gap-3">
                <Field label="Year">
                  <Input value={it.year} onChange={(e) => update(i, "year", e.target.value)} />
                </Field>
                <Field label="Type">
                  <Input value={it.type} onChange={(e) => update(i, "type", e.target.value)} />
                </Field>
              </div>
              <Field label="Location">
                <Input value={it.location} onChange={(e) => update(i, "location", e.target.value)} />
              </Field>
              <Field label="Result">
                <Input value={it.result} onChange={(e) => update(i, "result", e.target.value)} />
              </Field>
            </div>
          ))}
        </div>
      </div>
    </Card>
  );
}

function SummarySection({ data, setData }: { data: SummaryData; setData: (d: SummaryData) => void }) {
  const update = (i: number, field: keyof SummaryStatItem, val: string) => {
    const stats = data.stats.map((s, idx) => idx === i ? { ...s, [field]: val } : s);
    setData({ ...data, stats });
  };
  return (
    <Card>
      <SectionToggleHeader title="Summary Strip" description="Quick stats shown at the bottom of the page." enabled={data.enabled} onToggle={(v) => setData({ ...data, enabled: v })} />
      <div className="p-5 sm:p-6">
        <div className="flex items-center justify-between mb-4">
          <p className="text-sm text-slate-500">{data.stats.length} stat tiles</p>
          <Button variant="secondary" size="sm" onClick={() => setData({ ...data, stats: [...data.stats, { icon: "Star", value: "0", label: "New" }] })}>
            <Plus className="w-3.5 h-3.5" /> Add Stat
          </Button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
          {data.stats.map((s, i) => (
            <div key={i} className="border border-slate-200 rounded-xl p-3 space-y-2 relative">
              <button onClick={() => setData({ ...data, stats: data.stats.filter((_, j) => j !== i) })} className="absolute top-2 right-2 p-1 text-slate-400 hover:text-red-600">
                <Trash2 className="w-3.5 h-3.5" />
              </button>
              <Field label="Icon" hint="Calendar, Users, Trophy, Globe">
                <Input value={s.icon} onChange={(e) => update(i, "icon", e.target.value)} />
              </Field>
              <Field label="Value">
                <Input value={s.value} onChange={(e) => update(i, "value", e.target.value)} />
              </Field>
              <Field label="Label">
                <Input value={s.label} onChange={(e) => update(i, "label", e.target.value)} />
              </Field>
            </div>
          ))}
        </div>
      </div>
    </Card>
  );
}
