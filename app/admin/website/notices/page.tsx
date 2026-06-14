"use client";

import { useState, useEffect, useCallback } from "react";
import { Save, Eye, Plus, Trash2, ChevronUp, ChevronDown, Megaphone } from "lucide-react";
import { PageHeader, Card, Button, Field, Input, Toggle, Badge } from "../../components/ui";

interface NoticeItem {
  text: string;
  link?: string;
}

interface NoticesData {
  enabled: boolean;
  badge_label: string;
  view_all_label: string;
  view_all_url: string;
  speed_seconds: number;
  items: NoticeItem[];
}

const DEFAULT_DATA: NoticesData = {
  enabled: true,
  badge_label: "Updates",
  view_all_label: "View All",
  view_all_url: "/news",
  speed_seconds: 35,
  items: [
    { text: "The Wheelchair Rugby Federation of India proudly celebrates our incredible athletes for qualifying to represent India at the Asian Wheelchair Rugby Championship", link: "" },
  ],
};

async function loadSection(key: string) {
  const r = await fetch(`/api/about-sections/${key}`);
  return r.json();
}
async function saveSection(key: string, data: unknown, is_enabled: boolean) {
  await fetch(`/api/about-sections/${key}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ data, is_enabled }),
  });
}

export default function NoticesAdminPage() {
  const [data, setData] = useState<NoticesData>(DEFAULT_DATA);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    loadSection("header_marquee")
      .then((r) => {
        if (r.data) setData((p) => ({ ...p, ...(r.data as NoticesData) }));
        if (r.is_enabled !== undefined) setData((p) => ({ ...p, enabled: !!r.is_enabled }));
      })
      .finally(() => setLoading(false));
  }, []);

  const save = useCallback(async () => {
    setSaving(true);
    await saveSection("header_marquee", data, data.enabled);
    setSaving(false);
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  }, [data]);

  const updateItem = (i: number, field: keyof NoticeItem, val: string) => {
    setData({ ...data, items: data.items.map((it, idx) => (idx === i ? { ...it, [field]: val } : it)) });
  };
  const move = (i: number, dir: -1 | 1) => {
    const arr = [...data.items];
    const j = i + dir;
    if (j < 0 || j >= arr.length) return;
    [arr[i], arr[j]] = [arr[j], arr[i]];
    setData({ ...data, items: arr });
  };
  const addItem = () => setData({ ...data, items: [...data.items, { text: "", link: "" }] });
  const removeItem = (i: number) =>
    setData({ ...data, items: data.items.filter((_, idx) => idx !== i) });

  if (loading) {
    return <div className="flex items-center justify-center py-20 text-slate-400">Loading…</div>;
  }

  return (
    <div className="space-y-6">
      <PageHeader
        title="Notices / Header Marquee"
        subtitle="Manage the scrolling announcements that appear in the website header marquee."
        breadcrumbs={[
          { label: "Admin", href: "/admin" },
          { label: "Website Management" },
          { label: "Notices / Marquee" },
        ]}
        actions={
          <>
            <Button variant="outline" onClick={() => window.open("/", "_blank")}>
              <Eye className="w-4 h-4" /> Preview
            </Button>
            <Button variant="primary" onClick={save} disabled={saving}>
              <Save className="w-4 h-4" /> {saving ? "Saving…" : saved ? "Saved!" : "Save Changes"}
            </Button>
          </>
        }
      />

      {/* Live preview */}
      <Card className="overflow-hidden">
        <div className="px-5 py-3 border-b border-slate-100 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Megaphone className="w-4 h-4 text-saffron" />
            <h3 className="text-sm font-semibold text-navy">Live Preview</h3>
          </div>
          <Badge color={data.enabled ? "green" : "slate"}>{data.enabled ? "Visible" : "Hidden"}</Badge>
        </div>
        <div className="relative h-12 overflow-hidden bg-white">
          <div className="absolute left-0 top-0 bottom-0 z-10 flex items-center justify-center px-6 bg-navy text-white text-sm font-bold uppercase tracking-widest">
            {data.badge_label}
          </div>
          <div className="absolute inset-0 overflow-hidden flex items-center pl-32 pr-32">
            <div
              className="inline-flex whitespace-nowrap"
              style={{ animation: `marquee-scroll ${Math.max(5, data.speed_seconds)}s linear infinite` }}
            >
              {[...Array(2)].map((_, i) => (
                <span key={i} className="inline-flex items-center text-slate-800 font-semibold text-sm">
                  {data.items.map((it, j) => (
                    <span key={j} className="inline-flex items-center">
                      <span className="px-10">{it.text || "(empty)"}</span>
                      <span className="text-saffron font-bold text-lg">◆</span>
                    </span>
                  ))}
                </span>
              ))}
            </div>
          </div>
          <a
            href={data.view_all_url}
            className="absolute right-0 top-0 bottom-0 z-10 flex items-center justify-center px-6 bg-saffron text-white text-sm font-bold uppercase tracking-widest"
          >
            {data.view_all_label}
          </a>
        </div>
      </Card>

      {/* Settings */}
      <Card>
        <div className="flex items-start justify-between gap-4 px-5 sm:px-6 py-4 border-b border-slate-100">
          <div>
            <h3 className="text-base font-semibold text-navy">Marquee Settings</h3>
            <p className="text-xs text-slate-500 mt-0.5">Control labels, link, speed, and visibility.</p>
          </div>
          <div className="flex items-center gap-3">
            <Badge color={data.enabled ? "green" : "slate"}>{data.enabled ? "Visible" : "Hidden"}</Badge>
            <Toggle checked={data.enabled} onChange={(v) => setData({ ...data, enabled: v })} />
          </div>
        </div>
        <div className="p-5 sm:p-6 grid grid-cols-1 md:grid-cols-2 gap-5">
          <Field label="Left Badge Label" hint="Shown on the left dark pill (e.g. Updates).">
            <Input value={data.badge_label} onChange={(e) => setData({ ...data, badge_label: e.target.value })} />
          </Field>
          <Field label="Right Button Label" hint="Shown on the orange button on the right.">
            <Input value={data.view_all_label} onChange={(e) => setData({ ...data, view_all_label: e.target.value })} />
          </Field>
          <Field label="Right Button URL">
            <Input value={data.view_all_url} onChange={(e) => setData({ ...data, view_all_url: e.target.value })} />
          </Field>
          <Field label="Scroll Speed (seconds)" hint="Lower = faster. Default 35s.">
            <Input
              type="number"
              min={5}
              max={120}
              value={data.speed_seconds}
              onChange={(e) => setData({ ...data, speed_seconds: Number(e.target.value) || 35 })}
            />
          </Field>
        </div>
      </Card>

      {/* Notice items */}
      <Card>
        <div className="px-5 sm:px-6 py-4 border-b border-slate-100 flex items-center justify-between">
          <div>
            <h3 className="text-base font-semibold text-navy">Notices ({data.items.length})</h3>
            <p className="text-xs text-slate-500 mt-0.5">These messages will scroll across the header marquee.</p>
          </div>
          <Button variant="secondary" size="sm" onClick={addItem}>
            <Plus className="w-3.5 h-3.5" /> Add Notice
          </Button>
        </div>
        <div className="p-5 sm:p-6 space-y-3">
          {data.items.length === 0 && (
            <p className="text-center text-sm text-slate-400 py-10">
              No notices yet. Click <strong>Add Notice</strong> to create one.
            </p>
          )}
          {data.items.map((it, i) => (
            <div key={i} className="border border-slate-200 rounded-xl p-4 space-y-3">
              <div className="flex items-center justify-between">
                <Badge color="slate">Notice #{i + 1}</Badge>
                <div className="flex items-center gap-1">
                  <button onClick={() => move(i, -1)} className="p-1.5 text-slate-400 hover:text-slate-700" title="Move up">
                    <ChevronUp className="w-3.5 h-3.5" />
                  </button>
                  <button onClick={() => move(i, 1)} className="p-1.5 text-slate-400 hover:text-slate-700" title="Move down">
                    <ChevronDown className="w-3.5 h-3.5" />
                  </button>
                  <button onClick={() => removeItem(i)} className="p-1.5 text-slate-400 hover:text-red-600" title="Delete">
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
              <Field label="Notice Text" required>
                <Input
                  value={it.text}
                  onChange={(e) => updateItem(i, "text", e.target.value)}
                  placeholder="Type your announcement here…"
                />
              </Field>
              <Field label="Link (optional)" hint="If set, the notice text becomes clickable.">
                <Input
                  value={it.link || ""}
                  onChange={(e) => updateItem(i, "link", e.target.value)}
                  placeholder="https://example.com or /news/post-slug"
                />
              </Field>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}
