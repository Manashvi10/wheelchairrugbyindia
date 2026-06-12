"use client";

import { useState } from "react";
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
  { id: "nationals", label: "Para Nationals", icon: Trophy },
  { id: "internationals", label: "Para Internationals", icon: Globe },
  { id: "summary", label: "Summary Strip", icon: TrendingUp },
];

export default function HistoryPageCMS() {
  const [active, setActive] = useState("hero");

  return (
    <div className="space-y-6">
      <PageHeader
        title="History Page CMS"
        subtitle="Manage Our History & Achievements page sections."
        breadcrumbs={[
          { label: "Admin", href: "/admin" },
          { label: "Website Management" },
          { label: "History Page" },
        ]}
        actions={
          <>
            <Button variant="outline">
              <Eye className="w-4 h-4" /> Preview
            </Button>
            <Button variant="primary">
              <Save className="w-4 h-4" /> Save Changes
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
                      isActive
                        ? "bg-saffron text-white font-semibold shadow"
                        : "text-slate-700 hover:bg-slate-100"
                    }`}
                  >
                    <span
                      className={`w-5 h-5 rounded text-[10px] font-bold flex items-center justify-center ${
                        isActive ? "bg-white/20" : "bg-slate-100 text-slate-500"
                      }`}
                    >
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
          {active === "timeline" && <TimelineSection />}
          {active === "nationals" && <NationalsSection />}
          {active === "internationals" && <InternationalsSection />}
          {active === "summary" && <SummarySection />}
        </div>
      </div>
    </div>
  );
}

function SectionToggleHeader({
  title,
  description,
  enabled,
  onToggle,
}: {
  title: string;
  description: string;
  enabled: boolean;
  onToggle: (v: boolean) => void;
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

function ImageUploader({ label }: { label: string }) {
  return (
    <div>
      <label className="block text-xs font-semibold text-slate-700 mb-1.5">{label}</label>
      <div className="aspect-video bg-slate-50 border-2 border-dashed border-slate-200 rounded-xl flex flex-col items-center justify-center text-center p-6 hover:border-saffron hover:bg-orange-50/30 transition cursor-pointer">
        <Upload className="w-8 h-8 text-slate-400 mb-2" />
        <div className="text-sm font-semibold text-slate-700">Drop image here or click to upload</div>
        <div className="text-xs text-slate-400 mt-1">PNG, JPG, WEBP up to 5 MB</div>
      </div>
    </div>
  );
}

/* ────────────────────────────────  SECTIONS  ──────────────────────────────── */

function HeroSection() {
  const [enabled, setEnabled] = useState(true);
  return (
    <Card>
      <SectionToggleHeader
        title="Page Hero"
        description="Top banner of the History page."
        enabled={enabled}
        onToggle={setEnabled}
      />
      <div className="p-5 sm:p-6 grid grid-cols-1 md:grid-cols-2 gap-5">
        <Field label="Eyebrow Label">
          <Input defaultValue="Our Legacy" />
        </Field>
        <Field label="Hero Title" required>
          <Input defaultValue="Our History & Achievements" />
        </Field>
        <div className="md:col-span-2">
          <Field label="Description">
            <Textarea
              rows={3}
              defaultValue="From 1977 to today — the story of wheelchair rugby and India's remarkable journey in the sport."
            />
          </Field>
        </div>
      </div>
    </Card>
  );
}

function TimelineSection() {
  const [enabled, setEnabled] = useState(true);
  const entries = [
    { year: "1977", title: "Sport Invented", icon: "Flag", color: "saffron", description: "Wheelchair rugby was invented in Winnipeg, Canada by quadriplegic athletes seeking an inclusive competitive sport." },
    { year: "1993", title: "IWRF Established", icon: "Globe", color: "blue", description: "The International Wheelchair Rugby Federation was formed to govern the sport globally." },
    { year: "1996", title: "Paralympic Debut", icon: "Trophy", color: "green", description: "Wheelchair rugby featured as a demonstration sport at the Atlanta Paralympics." },
    { year: "2000", title: "Full Medal Sport", icon: "Medal", color: "gold", description: "Became an official medal sport at the Sydney 2000 Paralympic Games." },
    { year: "2009", title: "Introduced in India", icon: "Flag", color: "saffron", description: "Wheelchair rugby was introduced in India, igniting a new chapter in Indian para-sports history." },
    { year: "2019", title: "WRFI Established", icon: "Star", color: "blue", description: "Wheelchair Rugby Federation of India was officially formed as the national governing body." },
    { year: "2024", title: "International Debut", icon: "Globe", color: "green", description: "Team India competed in its first international wheelchair rugby tournament on the global stage." },
  ];
  return (
    <Card>
      <SectionToggleHeader
        title="Journey Timeline — The Journey of Wheelchair Rugby"
        description="Vertical timeline of milestones from 1977 to today."
        enabled={enabled}
        onToggle={setEnabled}
      />
      <div className="p-5 sm:p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-4">
          <Field label="Section Eyebrow">
            <Input defaultValue="Milestones" />
          </Field>
          <Field label="Section Title">
            <Input defaultValue="The Journey of Wheelchair Rugby" />
          </Field>
        </div>
        <div className="flex items-center justify-between mb-4">
          <p className="text-sm text-slate-500">{entries.length} milestones</p>
          <Button variant="secondary" size="sm">
            <Plus className="w-3.5 h-3.5" /> Add Milestone
          </Button>
        </div>
        <ul className="space-y-2">
          {entries.map((e) => (
            <li key={e.year} className="flex items-center gap-3 border border-slate-200 rounded-xl p-3 hover:border-saffron transition">
              <GripVertical className="w-4 h-4 text-slate-300 cursor-grab" />
              <div className="w-14 h-14 rounded-lg bg-gradient-to-br from-saffron to-orange-600 text-white flex items-center justify-center font-bold shrink-0">
                {e.year}
              </div>
              <div className="flex-1 min-w-0">
                <div className="font-semibold text-sm text-slate-800">{e.title}</div>
                <div className="text-xs text-slate-500 truncate">{e.description}</div>
                <div className="text-[10px] text-slate-400 mt-0.5">Icon: {e.icon} · Color: {e.color}</div>
              </div>
              <div className="flex items-center gap-1">
                <button className="p-2 text-slate-400 hover:text-slate-700"><ChevronUp className="w-3.5 h-3.5" /></button>
                <button className="p-2 text-slate-400 hover:text-slate-700"><ChevronDown className="w-3.5 h-3.5" /></button>
                <button className="p-2 text-slate-400 hover:text-saffron"><Edit3 className="w-3.5 h-3.5" /></button>
                <button className="p-2 text-slate-400 hover:text-red-600"><Trash2 className="w-3.5 h-3.5" /></button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </Card>
  );
}

function NationalsSection() {
  const [enabled, setEnabled] = useState(true);
  const items = [
    { event: "1st National Wheelchair Rugby Championship", year: "2019", location: "New Delhi", result: "8 State Teams — Maharashtra Gold" },
    { event: "2nd National Wheelchair Rugby Championship", year: "2020", location: "Bengaluru", result: "12 State Teams — Delhi Gold" },
    { event: "3rd National Wheelchair Rugby Championship", year: "2022", location: "Chennai", result: "16 State Teams — Punjab Gold" },
    { event: "4th National Wheelchair Rugby Championship", year: "2023", location: "Hyderabad", result: "18 State Teams — Maharashtra Gold" },
    { event: "5th National Wheelchair Rugby Championship", year: "2024", location: "Kolkata", result: "20 State Teams — Delhi Gold" },
    { event: "6th National Wheelchair Rugby Championship", year: "2025", location: "Mumbai", result: "22 State Teams — Results Pending" },
  ];
  return (
    <Card>
      <SectionToggleHeader
        title="Our Achievements — Para Nationals"
        description="Cards of National Wheelchair Rugby Championship editions."
        enabled={enabled}
        onToggle={setEnabled}
      />
      <div className="p-5 sm:p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-4">
          <Field label="Section Eyebrow">
            <Input defaultValue="National Glory" />
          </Field>
          <Field label="Section Title">
            <Input defaultValue="Our Achievements — Para Nationals" />
          </Field>
          <div className="md:col-span-2">
            <Field label="Section Description">
              <Textarea rows={2} defaultValue="A record of excellence at the National Wheelchair Rugby Championships organized by WRFI across India." />
            </Field>
          </div>
        </div>
        <div className="flex items-center justify-between mb-4">
          <p className="text-sm text-slate-500">{items.length} championships</p>
          <Button variant="secondary" size="sm">
            <Plus className="w-3.5 h-3.5" /> Add Championship
          </Button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {items.map((it, i) => (
            <div key={i} className="border border-slate-200 rounded-xl p-4 space-y-3">
              <div className="flex items-center justify-between">
                <Badge color="orange">{it.year}</Badge>
                <div className="flex items-center gap-1">
                  <button className="p-1.5 text-slate-400 hover:text-saffron"><Edit3 className="w-3.5 h-3.5" /></button>
                  <button className="p-1.5 text-slate-400 hover:text-red-600"><Trash2 className="w-3.5 h-3.5" /></button>
                </div>
              </div>
              <Field label="Event Name" required>
                <Input defaultValue={it.event} />
              </Field>
              <div className="grid grid-cols-2 gap-3">
                <Field label="Year">
                  <Input defaultValue={it.year} />
                </Field>
                <Field label="Location">
                  <Input defaultValue={it.location} />
                </Field>
              </div>
              <Field label="Result">
                <Input defaultValue={it.result} />
              </Field>
            </div>
          ))}
        </div>
      </div>
    </Card>
  );
}

function InternationalsSection() {
  const [enabled, setEnabled] = useState(true);
  const items = [
    { event: "Asia-Oceania Wheelchair Rugby Championship", year: "2024", location: "Bangkok, Thailand", result: "Team India — Participation & Experience" },
    { event: "IWRF Development Tournament", year: "2024", location: "Dubai, UAE", result: "Team India — 4th Place" },
    { event: "Asia-Oceania Qualifiers", year: "2025", location: "Tokyo, Japan", result: "Team India — Bronze Medal" },
    { event: "IWRF World Championship Qualifiers", year: "2026", location: "Sydney, Australia", result: "Team India — Qualified (Upcoming)" },
  ];
  return (
    <Card>
      <SectionToggleHeader
        title="Our Achievements — Para Internationals"
        description="International tournaments where Team India has competed."
        enabled={enabled}
        onToggle={setEnabled}
      />
      <div className="p-5 sm:p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-4">
          <Field label="Section Eyebrow">
            <Input defaultValue="Global Stage" />
          </Field>
          <Field label="Section Title">
            <Input defaultValue="Our Achievements — Para Internationals" />
          </Field>
          <div className="md:col-span-2">
            <Field label="Section Description">
              <Textarea rows={2} defaultValue="India's growing presence on the international wheelchair rugby stage — competing, learning, and earning respect worldwide." />
            </Field>
          </div>
        </div>
        <div className="flex items-center justify-between mb-4">
          <p className="text-sm text-slate-500">{items.length} international events</p>
          <Button variant="secondary" size="sm">
            <Plus className="w-3.5 h-3.5" /> Add International Event
          </Button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {items.map((it, i) => (
            <div key={i} className="border border-slate-200 rounded-xl p-4 space-y-3">
              <div className="flex items-center justify-between">
                <Badge color="blue">{it.year}</Badge>
                <div className="flex items-center gap-1">
                  <button className="p-1.5 text-slate-400 hover:text-saffron"><Edit3 className="w-3.5 h-3.5" /></button>
                  <button className="p-1.5 text-slate-400 hover:text-red-600"><Trash2 className="w-3.5 h-3.5" /></button>
                </div>
              </div>
              <Field label="Event Name" required>
                <Input defaultValue={it.event} />
              </Field>
              <div className="grid grid-cols-2 gap-3">
                <Field label="Year">
                  <Input defaultValue={it.year} />
                </Field>
                <Field label="Location">
                  <Input defaultValue={it.location} />
                </Field>
              </div>
              <Field label="Result">
                <Input defaultValue={it.result} />
              </Field>
            </div>
          ))}
        </div>
      </div>
    </Card>
  );
}

function SummarySection() {
  const [enabled, setEnabled] = useState(true);
  const [stats, setStats] = useState([
    { value: "4+", label: "International Events" },
    { value: "1", label: "Bronze Medal" },
    { value: "2026", label: "World Qualifiers" },
  ]);
  return (
    <Card>
      <SectionToggleHeader
        title='"India is on the Rise" — Summary Strip'
        description="Closing CTA strip with three quick stats at the bottom of the History page."
        enabled={enabled}
        onToggle={setEnabled}
      />
      <div className="p-5 sm:p-6 grid grid-cols-1 md:grid-cols-2 gap-5">
        <Field label="Strip Title" required>
          <Input defaultValue="India is on the Rise" />
        </Field>
        <Field label="Background Style">
          <Input defaultValue="navy-gradient" />
        </Field>
        <div className="md:col-span-2">
          <Field label="Description">
            <Textarea
              rows={3}
              defaultValue="From our first international appearance to earning medals — the journey has just begun. Support Team India as we aim for the Paralympic Games."
            />
          </Field>
        </div>
        <div className="md:col-span-2">
          <div className="flex items-center justify-between mb-3">
            <p className="text-sm font-semibold text-slate-700">Quick Stats</p>
            <Button
              variant="secondary"
              size="sm"
              onClick={() => setStats([...stats, { value: "0", label: "New Stat" }])}
            >
              <Plus className="w-3.5 h-3.5" /> Add Stat
            </Button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            {stats.map((s, i) => (
              <div key={i} className="border border-slate-200 rounded-xl p-3 space-y-2 relative">
                <button
                  onClick={() => setStats(stats.filter((_, j) => j !== i))}
                  className="absolute top-2 right-2 p-1 text-slate-400 hover:text-red-600"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
                <Field label="Value">
                  <Input defaultValue={s.value} />
                </Field>
                <Field label="Label">
                  <Input defaultValue={s.label} />
                </Field>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Card>
  );
}
