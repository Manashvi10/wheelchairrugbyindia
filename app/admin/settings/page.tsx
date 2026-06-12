"use client";

import { useState } from "react";
import { Save, Upload, Globe, Phone, Hash, Code, FileText, Building2 } from "lucide-react";
import { PageHeader, Card, CardHeader, Button, Field, Input, Textarea } from "../components/ui";

const TABS = [
  { id: "general", label: "General", icon: Building2 },
  { id: "contact", label: "Contact", icon: Phone },
  { id: "social", label: "Social Media", icon: Globe },
  { id: "analytics", label: "Analytics", icon: Hash },
  { id: "footer", label: "Footer", icon: FileText },
  { id: "code", label: "Custom Code", icon: Code },
];

export default function SettingsPage() {
  const [tab, setTab] = useState("general");
  return (
    <div className="space-y-6">
      <PageHeader
        title="Website Settings"
        subtitle="Global configuration for the WRFI website."
        breadcrumbs={[{ label: "Admin", href: "/admin" }, { label: "Settings" }]}
        actions={<Button variant="primary"><Save className="w-4 h-4" /> Save Settings</Button>}
      />

      <Card>
        <div className="border-b border-slate-100 px-2 overflow-x-auto">
          <div className="flex gap-1 min-w-max">
            {TABS.map((t) => {
              const Icon = t.icon;
              return (
                <button
                  key={t.id}
                  onClick={() => setTab(t.id)}
                  className={`px-4 py-3 text-sm font-semibold border-b-2 transition inline-flex items-center gap-2 ${
                    tab === t.id ? "border-saffron text-saffron" : "border-transparent text-slate-500 hover:text-navy"
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  {t.label}
                </button>
              );
            })}
          </div>
        </div>

        <div className="p-5 sm:p-6">
          {tab === "general" && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 max-w-3xl">
              <Field label="Website Name" required><Input defaultValue="Wheelchair Rugby Federation of India" /></Field>
              <Field label="Tagline"><Input defaultValue="Empowering Para Athletes" /></Field>
              <div className="md:col-span-2 grid grid-cols-2 gap-4">
                <Field label="Logo">
                  <div className="aspect-video bg-slate-50 border-2 border-dashed border-slate-200 rounded-xl flex flex-col items-center justify-center text-center p-4 hover:border-saffron transition cursor-pointer">
                    <Upload className="w-5 h-5 text-slate-400 mb-1" />
                    <div className="text-xs text-slate-500">Upload logo · PNG/SVG</div>
                  </div>
                </Field>
                <Field label="Favicon">
                  <div className="aspect-video bg-slate-50 border-2 border-dashed border-slate-200 rounded-xl flex flex-col items-center justify-center text-center p-4 hover:border-saffron transition cursor-pointer">
                    <Upload className="w-5 h-5 text-slate-400 mb-1" />
                    <div className="text-xs text-slate-500">Upload favicon · 32×32</div>
                  </div>
                </Field>
              </div>
            </div>
          )}

          {tab === "contact" && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 max-w-3xl">
              <Field label="Primary Email" required><Input defaultValue="info@wrfi.org" /></Field>
              <Field label="Primary Phone"><Input defaultValue="+91 98765 43210" /></Field>
              <div className="md:col-span-2"><Field label="Address"><Textarea rows={3} defaultValue="WRFI HQ, Sector 18, Noida, UP — 201301" /></Field></div>
            </div>
          )}

          {tab === "social" && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 max-w-3xl">
              {["Facebook", "Instagram", "Twitter / X", "LinkedIn", "YouTube"].map((s) => (
                <Field key={s} label={s}><Input placeholder="https://" /></Field>
              ))}
            </div>
          )}

          {tab === "analytics" && (
            <div className="space-y-5 max-w-3xl">
              <Field label="Google Analytics 4 Measurement ID"><Input placeholder="G-XXXXXXXXXX" /></Field>
              <Field label="Google Tag Manager Container ID"><Input placeholder="GTM-XXXXXXX" /></Field>
              <Field label="Facebook Pixel ID"><Input placeholder="123456789012345" /></Field>
            </div>
          )}

          {tab === "footer" && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 max-w-3xl">
              <div className="md:col-span-2">
                <Field label="Footer Description"><Textarea rows={3} defaultValue="Wheelchair Rugby Federation of India — the national governing body for wheelchair rugby." /></Field>
              </div>
              <Field label="Copyright Text"><Input defaultValue="© 2025 WRFI. All rights reserved." /></Field>
            </div>
          )}

          {tab === "code" && (
            <div className="space-y-5 max-w-3xl">
              <Field label="Custom <head> code" hint="Loaded on every page">
                <Textarea rows={5} className="font-mono text-xs" placeholder="<!-- Verification tags, fonts, etc. -->" />
              </Field>
              <Field label="Custom <body> code" hint="Loaded before </body>">
                <Textarea rows={5} className="font-mono text-xs" placeholder="<!-- Live chat widgets, tracking scripts -->" />
              </Field>
            </div>
          )}
        </div>
      </Card>
    </div>
  );
}
