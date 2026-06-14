"use client";

import { useState, useEffect } from "react";
import {
  Image as ImageIcon,
  CalendarPlus,
  Trophy,
  Globe,
  Hash,
  Save,
  Eye,
  Plus,
  Trash2,
  ChevronUp,
  ChevronDown,
  Star,
} from "lucide-react";
import { PageHeader, Card, Button, Field, Input, Textarea, Toggle, Badge } from "../../components/ui";

const TABS = [
  { id: "hero", label: "Page Hero", icon: ImageIcon },
  { id: "upcoming", label: "Upcoming Tournaments", icon: CalendarPlus },
  { id: "national", label: "National Events", icon: Trophy },
  { id: "stats", label: "National Stats Strip", icon: Hash },
  { id: "international", label: "International Events", icon: Globe },
];

/* ────────────────  TYPES & DEFAULTS  ──────────────── */

interface HeroData { eyebrow: string; title: string; description: string; enabled: boolean; }
interface UpcomingEvent {
  title: string; date: string; location: string; description: string; status: string;
  status_color: string; featured: boolean; image_url: string; countdown_date: string; register_url: string;
}
interface UpcomingData { eyebrow: string; title: string; events: UpcomingEvent[]; enabled: boolean; }
interface NationalRow { title: string; year: string; location: string; teams: string; winner: string; }
interface NationalData { eyebrow: string; title: string; description: string; rows: NationalRow[]; enabled: boolean; }
interface StatItem { icon: string; value: string; label: string; }
interface StatsData { stats: StatItem[]; enabled: boolean; }
interface InternationalEvent { title: string; year: string; location: string; result: string; type: string; }
interface InternationalData { eyebrow: string; title: string; description: string; events: InternationalEvent[]; enabled: boolean; }

const DEFAULT_HERO: HeroData = {
  eyebrow: "Competitions",
  title: "Events & Tournaments",
  description: "From national championships to international stages — the complete WRFI event calendar.",
  enabled: true,
};
const DEFAULT_UPCOMING: UpcomingData = {
  eyebrow: "What's Next",
  title: "Upcoming Tournaments",
  enabled: true,
  events: [
    {
      title: "WRFI National Championship 2026",
      date: "August 15 – 20, 2026",
      location: "Thyagaraj Sports Complex, New Delhi",
      description: "The premier national wheelchair rugby tournament featuring teams from 22+ states across India.",
      status: "Registrations Open",
      status_color: "green",
      featured: true,
      image_url: "/images/upcome.png",
      countdown_date: "2026-08-15T09:00:00+05:30",
      register_url: "/contact",
    },
    {
      title: "Southern Regional Qualifiers",
      date: "June 10 – 12, 2026",
      location: "Kanteerava Indoor Stadium, Bengaluru",
      description: "Regional qualifier for southern states — Karnataka, Tamil Nadu, Kerala, Telangana, and Andhra Pradesh.",
      status: "Coming Soon",
      status_color: "amber",
      featured: false,
      image_url: "",
      countdown_date: "",
      register_url: "",
    },
    {
      title: "Wheelchair Rugby Awareness Week",
      date: "July 1 – 7, 2026",
      location: "Pan-India (Multiple Cities)",
      description: "A week-long campaign featuring open tryouts, school demonstrations, and community engagement in 10 cities.",
      status: "Planning Phase",
      status_color: "blue",
      featured: false,
      image_url: "",
      countdown_date: "",
      register_url: "",
    },
  ],
};
const DEFAULT_NATIONAL: NationalData = {
  eyebrow: "Across India",
  title: "National Events",
  description: "WRFI's national championship history — growing stronger every year.",
  enabled: true,
  rows: [
    { title: "1st National Championship", year: "2019", location: "New Delhi", teams: "8 State Teams", winner: "Maharashtra" },
    { title: "2nd National Championship", year: "2020", location: "Bengaluru", teams: "12 State Teams", winner: "Delhi" },
    { title: "3rd National Championship", year: "2022", location: "Chennai", teams: "16 State Teams", winner: "Punjab" },
    { title: "4th National Championship", year: "2023", location: "Hyderabad", teams: "18 State Teams", winner: "Maharashtra" },
    { title: "5th National Championship", year: "2024", location: "Kolkata", teams: "20 State Teams", winner: "Delhi" },
    { title: "6th National Championship", year: "2025", location: "Mumbai", teams: "22 State Teams", winner: "Upcoming" },
  ],
};
const DEFAULT_STATS: StatsData = {
  enabled: true,
  stats: [
    { icon: "Calendar", value: "6", label: "Championships Held" },
    { icon: "Users", value: "22+", label: "State Teams" },
    { icon: "Trophy", value: "3", label: "Unique Winners" },
  ],
};
const DEFAULT_INTERNATIONAL: InternationalData = {
  eyebrow: "Global Representation",
  title: "International Events",
  description: "India's participation and results on the international wheelchair rugby stage.",
  enabled: true,
  events: [
    { title: "Asia-Oceania Championship", year: "2024", location: "Bangkok, Thailand", result: "Participation & Experience", type: "Continental" },
    { title: "IWRF Development Tournament", year: "2024", location: "Dubai, UAE", result: "4th Place", type: "Development" },
    { title: "Asia-Oceania Qualifiers", year: "2025", location: "Tokyo, Japan", result: "Bronze Medal", type: "Qualifiers" },
    { title: "IWRF World Championship Qualifiers", year: "2026", location: "Sydney, Australia", result: "Qualified (Upcoming)", type: "World" },
  ],
};

export default function EventsPageCMS() {
  const [active, setActive] = useState("hero");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [hero, setHero] = useState<HeroData>(DEFAULT_HERO);
  const [upcoming, setUpcoming] = useState<UpcomingData>(DEFAULT_UPCOMING);
  const [national, setNational] = useState<NationalData>(DEFAULT_NATIONAL);
  const [stats, setStats] = useState<StatsData>(DEFAULT_STATS);
  const [international, setInternational] = useState<InternationalData>(DEFAULT_INTERNATIONAL);

  useEffect(() => {
    (async () => {
      try {
        const res = await fetch("/api/events-sections");
        const { sections } = await res.json();
        if (sections) {
          if (sections.hero?.data) setHero(sections.hero.data as HeroData);
          if (sections.upcoming?.data) setUpcoming(sections.upcoming.data as UpcomingData);
          if (sections.national?.data) setNational(sections.national.data as NationalData);
          if (sections.stats?.data) setStats(sections.stats.data as StatsData);
          if (sections.international?.data) setInternational(sections.international.data as InternationalData);
        }
      } catch (e) {
        console.error("Failed to load events sections:", e);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  const saveAll = async () => {
    setSaving(true);
    try {
      const payloads = [
        { section_key: "hero", data: hero, is_enabled: hero.enabled },
        { section_key: "upcoming", data: upcoming, is_enabled: upcoming.enabled },
        { section_key: "national", data: national, is_enabled: national.enabled },
        { section_key: "stats", data: stats, is_enabled: stats.enabled },
        { section_key: "international", data: international, is_enabled: international.enabled },
      ];
      for (const p of payloads) {
        await fetch("/api/events-sections", {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(p),
        });
      }
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
        title="Events Page CMS"
        subtitle="Manage Events & Tournaments page sections."
        breadcrumbs={[
          { label: "Admin", href: "/admin" },
          { label: "Website Management" },
          { label: "Events Page" },
        ]}
        actions={
          <>
            <Button variant="outline" onClick={() => window.open("/events", "_blank")}>
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
          {active === "upcoming" && <UpcomingSection data={upcoming} setData={setUpcoming} />}
          {active === "national" && <NationalSection data={national} setData={setNational} />}
          {active === "stats" && <StatsSection data={stats} setData={setStats} />}
          {active === "international" && <InternationalSection data={international} setData={setInternational} />}
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
      <SectionToggleHeader title="Page Hero" description="Top banner of the Events page." enabled={data.enabled} onToggle={(v) => setData({ ...data, enabled: v })} />
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

function UpcomingSection({ data, setData }: { data: UpcomingData; setData: (d: UpcomingData) => void }) {
  const update = (i: number, field: keyof UpcomingEvent, val: string | boolean) => {
    const events = data.events.map((s, idx) => idx === i ? { ...s, [field]: val } : s);
    setData({ ...data, events });
  };
  const move = (i: number, dir: -1 | 1) => {
    const arr = [...data.events];
    const j = i + dir;
    if (j < 0 || j >= arr.length) return;
    [arr[i], arr[j]] = [arr[j], arr[i]];
    setData({ ...data, events: arr });
  };
  const addEvent = () => {
    setData({
      ...data,
      events: [...data.events, {
        title: "New Event", date: "", location: "", description: "", status: "Coming Soon",
        status_color: "blue", featured: false, image_url: "", countdown_date: "", register_url: "",
      }],
    });
  };
  const featuredCount = data.events.filter(e => e.featured).length;
  return (
    <Card>
      <SectionToggleHeader title="Upcoming Tournaments" description="Featured event with countdown plus other upcoming events." enabled={data.enabled} onToggle={(v) => setData({ ...data, enabled: v })} />
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
          <p className="text-sm text-slate-500">{data.events.length} events · {featuredCount} featured (with countdown)</p>
          <Button variant="secondary" size="sm" onClick={addEvent}>
            <Plus className="w-3.5 h-3.5" /> Add Event
          </Button>
        </div>
        <div className="space-y-3">
          {data.events.map((e, i) => (
            <div key={i} className="border border-slate-200 rounded-xl p-4 space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <label className="flex items-center gap-2 text-xs font-semibold text-slate-700 cursor-pointer">
                    <input type="checkbox" checked={e.featured} onChange={(ev) => update(i, "featured", ev.target.checked)} />
                    {e.featured && <Star className="w-3 h-3 text-orange-500" />} Featured (with countdown)
                  </label>
                </div>
                <div className="flex items-center gap-1">
                  <button onClick={() => move(i, -1)} className="p-1.5 text-slate-400 hover:text-slate-700"><ChevronUp className="w-3.5 h-3.5" /></button>
                  <button onClick={() => move(i, 1)} className="p-1.5 text-slate-400 hover:text-slate-700"><ChevronDown className="w-3.5 h-3.5" /></button>
                  <button onClick={() => setData({ ...data, events: data.events.filter((_, j) => j !== i) })} className="p-1.5 text-slate-400 hover:text-red-600"><Trash2 className="w-3.5 h-3.5" /></button>
                </div>
              </div>
              <Field label="Event Title" required>
                <Input value={e.title} onChange={(ev) => update(i, "title", ev.target.value)} />
              </Field>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <Field label="Date Range (display text)">
                  <Input value={e.date} onChange={(ev) => update(i, "date", ev.target.value)} placeholder="August 15 – 20, 2026" />
                </Field>
                <Field label="Location">
                  <Input value={e.location} onChange={(ev) => update(i, "location", ev.target.value)} />
                </Field>
              </div>
              <Field label="Description">
                <Textarea rows={2} value={e.description} onChange={(ev) => update(i, "description", ev.target.value)} />
              </Field>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <Field label="Status Label">
                  <Input value={e.status} onChange={(ev) => update(i, "status", ev.target.value)} />
                </Field>
                <Field label="Status Color">
                  <select
                    value={e.status_color}
                    onChange={(ev) => update(i, "status_color", ev.target.value)}
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 bg-white text-sm"
                  >
                    <option value="green">Green</option>
                    <option value="amber">Amber</option>
                    <option value="blue">Blue</option>
                    <option value="red">Red</option>
                    <option value="slate">Slate</option>
                  </select>
                </Field>
              </div>
              {e.featured && (
                <div className="bg-orange-50/50 border border-orange-200 rounded-lg p-3 space-y-3">
                  <p className="text-xs font-bold text-orange-700 uppercase tracking-wider">Featured Event Settings</p>
                  <Field label="Cover Image URL">
                    <Input value={e.image_url} onChange={(ev) => update(i, "image_url", ev.target.value)} placeholder="/images/upcome.png" />
                  </Field>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    <Field label="Countdown Date" hint="Date & time the event starts (used for live countdown)">
                      <Input
                        type="datetime-local"
                        value={e.countdown_date ? e.countdown_date.slice(0, 16) : ""}
                        onChange={(ev) => update(i, "countdown_date", ev.target.value ? ev.target.value + ":00" : "")}
                      />
                    </Field>
                    <Field label="Register URL">
                      <Input value={e.register_url} onChange={(ev) => update(i, "register_url", ev.target.value)} />
                    </Field>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </Card>
  );
}

function NationalSection({ data, setData }: { data: NationalData; setData: (d: NationalData) => void }) {
  const update = (i: number, field: keyof NationalRow, val: string) => {
    const rows = data.rows.map((s, idx) => idx === i ? { ...s, [field]: val } : s);
    setData({ ...data, rows });
  };
  return (
    <Card>
      <SectionToggleHeader title="National Events Table" description="Table of WRFI national championship history." enabled={data.enabled} onToggle={(v) => setData({ ...data, enabled: v })} />
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
          <p className="text-sm text-slate-500">{data.rows.length} championships in table</p>
          <Button variant="secondary" size="sm" onClick={() => setData({ ...data, rows: [...data.rows, { title: "", year: "", location: "", teams: "", winner: "" }] })}>
            <Plus className="w-3.5 h-3.5" /> Add Row
          </Button>
        </div>
        <div className="overflow-x-auto rounded-xl border border-slate-200">
          <table className="w-full text-left text-sm">
            <thead className="bg-slate-50 text-slate-600">
              <tr>
                <th className="px-3 py-2 font-semibold">Event</th>
                <th className="px-3 py-2 font-semibold">Year</th>
                <th className="px-3 py-2 font-semibold">Location</th>
                <th className="px-3 py-2 font-semibold">Teams</th>
                <th className="px-3 py-2 font-semibold">Winner</th>
                <th className="px-3 py-2"></th>
              </tr>
            </thead>
            <tbody>
              {data.rows.map((r, i) => (
                <tr key={i} className="border-t border-slate-100">
                  <td className="px-3 py-2"><Input value={r.title} onChange={(e) => update(i, "title", e.target.value)} /></td>
                  <td className="px-3 py-2 w-24"><Input value={r.year} onChange={(e) => update(i, "year", e.target.value)} /></td>
                  <td className="px-3 py-2"><Input value={r.location} onChange={(e) => update(i, "location", e.target.value)} /></td>
                  <td className="px-3 py-2"><Input value={r.teams} onChange={(e) => update(i, "teams", e.target.value)} /></td>
                  <td className="px-3 py-2"><Input value={r.winner} onChange={(e) => update(i, "winner", e.target.value)} /></td>
                  <td className="px-3 py-2 w-10">
                    <button onClick={() => setData({ ...data, rows: data.rows.filter((_, j) => j !== i) })} className="p-2 text-slate-400 hover:text-red-600"><Trash2 className="w-3.5 h-3.5" /></button>
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

function StatsSection({ data, setData }: { data: StatsData; setData: (d: StatsData) => void }) {
  const update = (i: number, field: keyof StatItem, val: string) => {
    const stats = data.stats.map((s, idx) => idx === i ? { ...s, [field]: val } : s);
    setData({ ...data, stats });
  };
  return (
    <Card>
      <SectionToggleHeader title="National Stats Strip" description="Three quick-stat tiles shown below the National Events table." enabled={data.enabled} onToggle={(v) => setData({ ...data, enabled: v })} />
      <div className="p-5 sm:p-6">
        <div className="flex items-center justify-between mb-4">
          <p className="text-sm text-slate-500">{data.stats.length} stat tiles</p>
          <Button variant="secondary" size="sm" onClick={() => setData({ ...data, stats: [...data.stats, { icon: "Star", value: "0", label: "New" }] })}>
            <Plus className="w-3.5 h-3.5" /> Add Stat
          </Button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          {data.stats.map((s, i) => (
            <div key={i} className="border border-slate-200 rounded-xl p-3 space-y-2 relative">
              <button onClick={() => setData({ ...data, stats: data.stats.filter((_, j) => j !== i) })} className="absolute top-2 right-2 p-1 text-slate-400 hover:text-red-600">
                <Trash2 className="w-3.5 h-3.5" />
              </button>
              <Field label="Icon" hint="Calendar, Users, Trophy, Star, Globe">
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

function InternationalSection({ data, setData }: { data: InternationalData; setData: (d: InternationalData) => void }) {
  const update = (i: number, field: keyof InternationalEvent, val: string) => {
    const events = data.events.map((s, idx) => idx === i ? { ...s, [field]: val } : s);
    setData({ ...data, events });
  };
  return (
    <Card>
      <SectionToggleHeader title="International Events" description="Cards showing Team India's international participation." enabled={data.enabled} onToggle={(v) => setData({ ...data, enabled: v })} />
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
          <Button variant="secondary" size="sm" onClick={() => setData({ ...data, events: [...data.events, { title: "", year: "", location: "", result: "", type: "" }] })}>
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
