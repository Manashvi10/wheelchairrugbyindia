"use client";

import { useEffect, useState, useCallback } from "react";
import { Loader2, Save, RefreshCw, Eye, EyeOff, Sparkles, ExternalLink } from "lucide-react";
import { PageHeader, Card, CardHeader, Field, Input, Textarea, Toggle, Button } from "../../components/ui";
import { DEFAULT_POPUP, type PopupData } from "@/app/components/AnnouncementPopup";

const KEY = "home_popup";

async function loadSection(): Promise<{ data: PopupData | null; is_enabled: boolean }> {
  const res = await fetch(`/api/about-sections/${KEY}`, { cache: "no-store" });
  if (!res.ok) return { data: null, is_enabled: true };
  const json = await res.json();
  return { data: json.data ?? null, is_enabled: !!json.is_enabled };
}

async function saveSection(data: PopupData, enabled: boolean): Promise<void> {
  await fetch(`/api/about-sections/${KEY}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ data, is_enabled: enabled }),
  });
}

function HighlightText({ text, highlight }: { text: string; highlight: string }) {
  if (!highlight || !text.includes(highlight)) return <>{text}</>;
  const parts = text.split(highlight);
  return (
    <>
      {parts.map((part, i) => (
        <span key={i}>
          {part}
          {i < parts.length - 1 && (
            <span className="text-[#FF6B2B] font-semibold">{highlight}</span>
          )}
        </span>
      ))}
    </>
  );
}

export default function PopupAdminPage() {
  const [form, setForm] = useState<PopupData>(DEFAULT_POPUP);
  const [enabled, setEnabled] = useState(true);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [testing, setTesting] = useState(false);
  const [showPreview, setShowPreview] = useState(true);

  const load = useCallback(async () => {
    setLoading(true);
    const { data, is_enabled } = await loadSection();
    if (data) setForm({ ...DEFAULT_POPUP, ...data });
    setEnabled(is_enabled);
    setLoading(false);
  }, []);

  useEffect(() => { load(); }, [load]);

  const set = (k: keyof PopupData, v: string) =>
    setForm((p) => ({ ...p, [k]: v }));

  const handleSave = async (): Promise<PopupData> => {
    setSaving(true);
    await saveSection(form, enabled);
    setSaving(false);
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
    return form;
  };

  const handleTestOnWebsite = async () => {
    setTesting(true);
    const saved = await handleSave();
    try {
      Object.keys(sessionStorage)
        .filter((k) => k.startsWith("wrfi_popup_seen_v"))
        .forEach((k) => sessionStorage.removeItem(k));
      sessionStorage.removeItem(`wrfi_popup_seen_v${saved.version}`);
    } catch {}
    setTesting(false);
    window.open("/", "_blank");
  };

  const bumpVersion = () => {
    const next = String(Number(form.version || "1") + 1);
    setForm((p) => ({ ...p, version: next }));
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[40vh]">
        <Loader2 className="w-8 h-8 animate-spin text-slate-400" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <PageHeader
        title="Announcement Popup"
        subtitle="Manage the welcome popup shown to visitors on page load"
        breadcrumbs={[
          { label: "Website Management" },
          { label: "Announcement Popup" },
        ]}
        actions={
          <>
            <Toggle
              checked={enabled}
              onChange={setEnabled}
              label={enabled ? "Enabled" : "Disabled"}
            />
            <Button variant="secondary" size="md" onClick={handleTestOnWebsite} disabled={saving || testing}>
              {testing ? <Loader2 className="w-4 h-4 animate-spin" /> : <ExternalLink className="w-4 h-4" />}
              Test on Website
            </Button>
            <Button variant="primary" size="md" onClick={handleSave} disabled={saving}>
              {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
              {saved ? "Saved!" : "Save Changes"}
            </Button>
          </>
        }
      />

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
        {/* Edit form */}
        <div className="space-y-5">
          {/* Hero section */}
          <Card>
            <CardHeader title="Hero Section" description="Top dark band content" />
            <div className="p-5 space-y-4">
              <Field label="Badge Label" hint='Small label shown above heading, e.g. "Historic Moment"'>
                <Input value={form.badge} onChange={(e) => set("badge", e.target.value)} placeholder="Historic Moment" />
              </Field>
              <Field label="Heading" hint="Big title shown in orange, e.g. Congratulations!">
                <Input value={form.heading} onChange={(e) => set("heading", e.target.value)} placeholder="Congratulations!" />
              </Field>
              <Field label="Sub Heading" hint="White line below heading, e.g. Team India">
                <Input value={form.subheading} onChange={(e) => set("subheading", e.target.value)} placeholder="Team India" />
              </Field>
              <Field label="Main Announcement Text" hint="Main message text (can include emoji)">
                <Textarea
                  rows={2}
                  value={form.main_text}
                  onChange={(e) => set("main_text", e.target.value)}
                  placeholder="We have qualified for the Asian Wheelchair Rugby Championship 🇮🇳"
                />
              </Field>
              <Field label="Highlighted Phrase in Main Text" hint="Exact phrase from above that should appear in orange">
                <Input
                  value={form.highlight_in_main}
                  onChange={(e) => set("highlight_in_main", e.target.value)}
                  placeholder="Asian Wheelchair Rugby Championship"
                />
              </Field>
            </div>
          </Card>

          {/* Body section */}
          <Card>
            <CardHeader title="Body Section" description="White bottom section content" />
            <div className="p-5 space-y-4">
              <Field label="Body Note" hint="Italic grey text">
                <Textarea
                  rows={2}
                  value={form.body_note}
                  onChange={(e) => set("body_note", e.target.value)}
                  placeholder="Gratitude to all our partners, supporters and athletes..."
                />
              </Field>
              <Field label="Footer Text" hint="Bold navy text at the bottom">
                <Textarea
                  rows={2}
                  value={form.footer_text}
                  onChange={(e) => set("footer_text", e.target.value)}
                  placeholder="Our athletes proved that disability is never a limitation."
                />
              </Field>
              <Field label="Highlighted Phrase in Footer" hint="Exact phrase from above that should appear in orange">
                <Input
                  value={form.highlight_in_footer}
                  onChange={(e) => set("highlight_in_footer", e.target.value)}
                  placeholder="disability is never a limitation."
                />
              </Field>
            </div>
          </Card>

          {/* Buttons */}
          <Card>
            <CardHeader title="Action Buttons" />
            <div className="p-5 grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Field label="Button 1 Label">
                <Input value={form.btn1_label} onChange={(e) => set("btn1_label", e.target.value)} placeholder="Get Involved" />
              </Field>
              <Field label="Button 1 URL">
                <Input value={form.btn1_url} onChange={(e) => set("btn1_url", e.target.value)} placeholder="/contact" />
              </Field>
              <Field label="Button 2 Label">
                <Input value={form.btn2_label} onChange={(e) => set("btn2_label", e.target.value)} placeholder="Read More" />
              </Field>
              <Field label="Button 2 URL">
                <Input value={form.btn2_url} onChange={(e) => set("btn2_url", e.target.value)} placeholder="/news" />
              </Field>
            </div>
          </Card>

          {/* Version control */}
          <Card>
            <CardHeader
              title="Visitor Re-show Control"
              description="Bump the version to force all visitors to see the popup again (even those who dismissed it)"
            />
            <div className="p-5 flex items-center gap-4">
              <div className="flex-1">
                <Field label="Current Version" hint="Changing this clears visitor session cache">
                  <Input
                    value={form.version}
                    onChange={(e) => set("version", e.target.value)}
                    placeholder="1"
                  />
                </Field>
              </div>
              <div className="pt-6">
                <Button variant="secondary" size="md" onClick={bumpVersion}>
                  <RefreshCw className="w-4 h-4" /> Bump Version
                </Button>
              </div>
            </div>
            <p className="px-5 pb-4 text-xs text-slate-500">
              After saving with a new version, the popup will appear again for all visitors on next page load.
            </p>
          </Card>
        </div>

        {/* Live preview */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-semibold text-slate-700">Live Preview</h3>
            <button
              onClick={() => setShowPreview((p) => !p)}
              className="text-xs text-slate-500 hover:text-navy inline-flex items-center gap-1"
            >
              {showPreview ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
              {showPreview ? "Hide" : "Show"} Preview
            </button>
          </div>

          {showPreview && (
            <div className="sticky top-6">
              {!enabled && (
                <div className="mb-3 px-4 py-2 rounded-lg bg-yellow-50 border border-yellow-200 text-yellow-700 text-xs font-semibold">
                  ⚠️ Popup is currently DISABLED — visitors won&apos;t see it until you enable it above.
                </div>
              )}

              {/* Preview card */}
              <div className="w-full max-w-sm mx-auto bg-white rounded-2xl shadow-2xl overflow-hidden border border-slate-200">
                <div className="h-1.5 bg-gradient-to-r from-[#FF6B2B] via-[#E5A000] to-[#C25A1A]" />

                <div className="relative bg-gradient-to-br from-[#0B3D91] via-[#0B3D91] to-[#0a1942] text-white px-6 pt-8 pb-6 text-center overflow-hidden">
                  <Sparkles className="absolute top-4 left-4 w-4 h-4 text-[#FF6B2B]/60" />
                  <Sparkles className="absolute bottom-4 right-6 w-3 h-3 text-[#E5A000]/60" />

                  <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-white/10 ring-2 ring-[#FF6B2B]/40 mb-4 p-2">
                    <img src="/images/logo1.png" alt="WRFI" className="w-full h-full object-contain" />
                  </div>

                  {form.badge && (
                    <div className="inline-block px-3 py-1 mb-3 rounded-full bg-[#FF6B2B]/20 text-[#FF6B2B] text-[10px] font-bold uppercase tracking-widest">
                      {form.badge}
                    </div>
                  )}

                  <h2 className="text-2xl font-extrabold leading-tight tracking-tight">
                    <span className="block text-[#FF6B2B]">{form.heading || "Heading"}</span>
                    {form.subheading && (
                      <span className="block mt-1 text-lg">{form.subheading}</span>
                    )}
                  </h2>

                  {form.main_text && (
                    <p className="mt-3 text-white text-sm font-semibold leading-snug">
                      <HighlightText text={form.main_text} highlight={form.highlight_in_main} />
                    </p>
                  )}
                </div>

                <div className="px-5 py-4 text-center">
                  {form.body_note && (
                    <p className="text-slate-600 text-xs leading-relaxed italic">{form.body_note}</p>
                  )}
                  {form.footer_text && (
                    <p className="mt-2 text-[#0B3D91] text-xs font-bold leading-snug">
                      <HighlightText text={form.footer_text} highlight={form.highlight_in_footer} />
                    </p>
                  )}

                  <div className="mt-4 flex gap-2">
                    <button className="flex-1 px-3 py-2 bg-[#FF6B2B] text-white text-xs font-bold rounded-full">
                      {form.btn1_label || "Button 1"}
                    </button>
                    <button className="flex-1 px-3 py-2 border-2 border-[#0B3D91] text-[#0B3D91] text-xs font-bold rounded-full">
                      {form.btn2_label || "Button 2"}
                    </button>
                  </div>
                  <p className="mt-2 text-[10px] text-slate-400">Maybe later</p>
                </div>
              </div>

              <p className="mt-3 text-center text-xs text-slate-400">
                This is how the popup will appear to visitors on the website.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
