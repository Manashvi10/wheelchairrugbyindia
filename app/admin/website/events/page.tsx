"use client";

import { useState } from "react";
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
  GripVertical,
  Upload,
  Edit3,
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

export default function EventsPageCMS() {
  const [active, setActive] = useState("hero");

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
          {active === "upcoming" && <UpcomingSection />}
          {active === "national" && <NationalSection />}
          {active === "stats" && <StatsSection />}
          {active === "international" && <InternationalSection />}
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
        description="Top banner of the Events page."
        enabled={enabled}
        onToggle={setEnabled}
      />
      <div className="p-5 sm:p-6 grid grid-cols-1 md:grid-cols-2 gap-5">
        <Field label="Eyebrow Label">
          <Input defaultValue="Competitions" />
        </Field>
        <Field label="Hero Title" required>
          <Input defaultValue="Events & Tournaments" />
        </Field>
        <div className="md:col-span-2">
          <Field label="Description">
            <Textarea
              rows={3}
              defaultValue="From national championships to international stages — the complete WRFI event calendar."
            />
          </Field>
        </div>
      </div>
    </Card>
  );
}

function UpcomingSection() {
  const [enabled, setEnabled] = useState(true);
  const events = [
    {
      title: "WRFI National Championship 2026",
      date: "August 15 – 20, 2026",
      location: "Thyagaraj Sports Complex, New Delhi",
      description: "The premier national wheelchair rugby tournament featuring teams from 22+ states across India.",
      status: "Registrations Open",
      featured: true,
    },
    {
      title: "Southern Regional Qualifiers",
      date: "June 10 – 12, 2026",
      location: "Kanteerava Indoor Stadium, Bengaluru",
      description: "Regional qualifier for southern states — Karnataka, Tamil Nadu, Kerala, Telangana, and Andhra Pradesh.",
      status: "Coming Soon",
      featured: false,
    },
    {
      title: "Wheelchair Rugby Awareness Week",
      date: "July 1 – 7, 2026",
      location: "Pan-India (Multiple Cities)",
      description: "A week-long campaign featuring open tryouts, school demonstrations, and community engagement in 10 cities.",
      status: "Planning Phase",
      featured: false,
    },
  ];
  return (
    <Card>
      <SectionToggleHeader
        title="Upcoming Tournaments"
        description="Featured event with countdown plus other upcoming events."
        enabled={enabled}
        onToggle={setEnabled}
      />
      <div className="p-5 sm:p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-4">
          <Field label="Section Eyebrow">
            <Input defaultValue="What's Next" />
          </Field>
          <Field label="Section Title">
            <Input defaultValue="Upcoming Tournaments" />
          </Field>
        </div>
        <div className="flex items-center justify-between mb-4">
          <p className="text-sm text-slate-500">{events.length} events · 1 featured (with countdown)</p>
          <Button variant="secondary" size="sm">
            <Plus className="w-3.5 h-3.5" /> Add Event
          </Button>
        </div>
        <div className="space-y-3">
          {events.map((e, i) => (
            <div key={i} className="border border-slate-200 rounded-xl p-4 space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  {e.featured && (
                    <Badge color="orange">
                      <Star className="w-3 h-3 inline mr-0.5" /> Featured + Countdown
                    </Badge>
                  )}
                  <Badge color={e.featured ? "green" : "blue"}>{e.status}</Badge>
                </div>
                <div className="flex items-center gap-1">
                  <button className="p-1.5 text-slate-400 hover:text-slate-700"><ChevronUp className="w-3.5 h-3.5" /></button>
                  <button className="p-1.5 text-slate-400 hover:text-slate-700"><ChevronDown className="w-3.5 h-3.5" /></button>
                  <button className="p-1.5 text-slate-400 hover:text-red-600"><Trash2 className="w-3.5 h-3.5" /></button>
                </div>
              </div>
              {e.featured && <ImageUploader label="Featured Event Cover Image" />}
              <Field label="Event Title" required>
                <Input defaultValue={e.title} />
              </Field>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <Field label="Date Range">
                  <Input defaultValue={e.date} />
                </Field>
                <Field label="Location">
                  <Input defaultValue={e.location} />
                </Field>
              </div>
              <Field label="Description">
                <Textarea rows={2} defaultValue={e.description} />
              </Field>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                <Field label="Status Label">
                  <Input defaultValue={e.status} />
                </Field>
                {e.featured && (
                  <>
                    <Field label="Countdown Date (ISO)">
                      <Input defaultValue="2026-08-15T09:00:00+05:30" />
                    </Field>
                    <Field label="Register URL">
                      <Input defaultValue="/contact" />
                    </Field>
                  </>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </Card>
  );
}

function NationalSection() {
  const [enabled, setEnabled] = useState(true);
  const rows = [
    { title: "1st National Championship", year: "2019", location: "New Delhi", teams: "8 State Teams", winner: "Maharashtra" },
    { title: "2nd National Championship", year: "2020", location: "Bengaluru", teams: "12 State Teams", winner: "Delhi" },
    { title: "3rd National Championship", year: "2022", location: "Chennai", teams: "16 State Teams", winner: "Punjab" },
    { title: "4th National Championship", year: "2023", location: "Hyderabad", teams: "18 State Teams", winner: "Maharashtra" },
    { title: "5th National Championship", year: "2024", location: "Kolkata", teams: "20 State Teams", winner: "Delhi" },
    { title: "6th National Championship", year: "2025", location: "Mumbai", teams: "22 State Teams", winner: "Upcoming" },
  ];
  return (
    <Card>
      <SectionToggleHeader
        title="National Events Table"
        description="Table of WRFI national championship history."
        enabled={enabled}
        onToggle={setEnabled}
      />
      <div className="p-5 sm:p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-4">
          <Field label="Section Eyebrow">
            <Input defaultValue="Across India" />
          </Field>
          <Field label="Section Title">
            <Input defaultValue="National Events" />
          </Field>
          <div className="md:col-span-2">
            <Field label="Section Description">
              <Textarea rows={2} defaultValue="WRFI's national championship history — growing stronger every year." />
            </Field>
          </div>
        </div>
        <div className="flex items-center justify-between mb-4">
          <p className="text-sm text-slate-500">{rows.length} championships in table</p>
          <Button variant="secondary" size="sm">
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
              {rows.map((r, i) => (
                <tr key={i} className="border-t border-slate-100">
                  <td className="px-3 py-2"><Input defaultValue={r.title} /></td>
                  <td className="px-3 py-2 w-24"><Input defaultValue={r.year} /></td>
                  <td className="px-3 py-2"><Input defaultValue={r.location} /></td>
                  <td className="px-3 py-2"><Input defaultValue={r.teams} /></td>
                  <td className="px-3 py-2"><Input defaultValue={r.winner} /></td>
                  <td className="px-3 py-2 w-10">
                    <button className="p-2 text-slate-400 hover:text-red-600"><Trash2 className="w-3.5 h-3.5" /></button>
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

function StatsSection() {
  const [enabled, setEnabled] = useState(true);
  const [stats, setStats] = useState([
    { icon: "Calendar", value: "6", label: "Championships Held" },
    { icon: "Users", value: "22+", label: "State Teams" },
    { icon: "Trophy", value: "3", label: "Unique Winners" },
  ]);
  return (
    <Card>
      <SectionToggleHeader
        title="National Stats Strip"
        description="Three quick-stat tiles shown below the National Events table."
        enabled={enabled}
        onToggle={setEnabled}
      />
      <div className="p-5 sm:p-6">
        <div className="flex items-center justify-between mb-4">
          <p className="text-sm text-slate-500">{stats.length} stat tiles</p>
          <Button
            variant="secondary"
            size="sm"
            onClick={() => setStats([...stats, { icon: "Star", value: "0", label: "New" }])}
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
              <Field label="Icon">
                <Input defaultValue={s.icon} />
              </Field>
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
    </Card>
  );
}

function InternationalSection() {
  const [enabled, setEnabled] = useState(true);
  const items = [
    { title: "Asia-Oceania Championship", year: "2024", location: "Bangkok, Thailand", result: "Participation & Experience", type: "Continental" },
    { title: "IWRF Development Tournament", year: "2024", location: "Dubai, UAE", result: "4th Place", type: "Development" },
    { title: "Asia-Oceania Qualifiers", year: "2025", location: "Tokyo, Japan", result: "Bronze Medal", type: "Qualifiers" },
    { title: "IWRF World Championship Qualifiers", year: "2026", location: "Sydney, Australia", result: "Qualified (Upcoming)", type: "World" },
  ];
  return (
    <Card>
      <SectionToggleHeader
        title="International Events"
        description="Cards showing Team India's international participation."
        enabled={enabled}
        onToggle={setEnabled}
      />
      <div className="p-5 sm:p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-4">
          <Field label="Section Eyebrow">
            <Input defaultValue="Global Representation" />
          </Field>
          <Field label="Section Title">
            <Input defaultValue="International Events" />
          </Field>
          <div className="md:col-span-2">
            <Field label="Section Description">
              <Textarea rows={2} defaultValue="India's participation and results on the international wheelchair rugby stage." />
            </Field>
          </div>
        </div>
        <div className="flex items-center justify-between mb-4">
          <p className="text-sm text-slate-500">{items.length} international events</p>
          <Button variant="secondary" size="sm">
            <Plus className="w-3.5 h-3.5" /> Add Event
          </Button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {items.map((it, i) => (
            <div key={i} className="border border-slate-200 rounded-xl p-4 space-y-3">
              <div className="flex items-center justify-between">
                <Badge color="blue">{it.year} · {it.type}</Badge>
                <div className="flex items-center gap-1">
                  <button className="p-1.5 text-slate-400 hover:text-saffron"><Edit3 className="w-3.5 h-3.5" /></button>
                  <button className="p-1.5 text-slate-400 hover:text-red-600"><Trash2 className="w-3.5 h-3.5" /></button>
                </div>
              </div>
              <Field label="Event Title" required>
                <Input defaultValue={it.title} />
              </Field>
              <div className="grid grid-cols-2 gap-3">
                <Field label="Year">
                  <Input defaultValue={it.year} />
                </Field>
                <Field label="Type">
                  <Input defaultValue={it.type} />
                </Field>
              </div>
              <Field label="Location">
                <Input defaultValue={it.location} />
              </Field>
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
