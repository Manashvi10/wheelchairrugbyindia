"use client";

import { useState } from "react";
import { Save, Eye, FileText, Globe } from "lucide-react";
import { PageHeader, Card, CardHeader, Button, Field, Input, Textarea } from "../components/ui";

const PAGES = [
  { id: "home", label: "Home", path: "/" },
  { id: "about", label: "About", path: "/about" },
  { id: "leadership", label: "Leadership", path: "/leadership" },
  { id: "selection", label: "Selection Policy", path: "/selection-policy" },
  { id: "partners", label: "Partners", path: "/partners" },
  { id: "events", label: "Events", path: "/events" },
  { id: "gallery", label: "Gallery", path: "/gallery" },
  { id: "contact", label: "Contact", path: "/contact" },
];

export default function SEOPage() {
  const [page, setPage] = useState("home");
  const current = PAGES.find((p) => p.id === page)!;

  return (
    <div className="space-y-6">
      <PageHeader
        title="SEO Management"
        subtitle="Configure meta tags, Open Graph, schema markup and canonical URLs per page."
        breadcrumbs={[{ label: "Admin", href: "/admin" }, { label: "SEO Management" }]}
        actions={
          <>
            <Button variant="outline"><Eye className="w-4 h-4" /> Preview SERP</Button>
            <Button variant="primary"><Save className="w-4 h-4" /> Save SEO</Button>
          </>
        }
      />

      <div className="grid grid-cols-1 lg:grid-cols-[260px_1fr] gap-6">
        <Card className="p-2 h-fit lg:sticky lg:top-20">
          <div className="px-3 py-2 text-[10px] font-bold uppercase tracking-widest text-slate-400">Pages</div>
          <ul className="space-y-0.5">
            {PAGES.map((p) => (
              <li key={p.id}>
                <button
                  onClick={() => setPage(p.id)}
                  className={`w-full flex items-center gap-2 px-3 py-2 rounded-lg text-sm transition ${
                    page === p.id ? "bg-saffron text-white font-semibold" : "text-slate-700 hover:bg-slate-100"
                  }`}
                >
                  <FileText className="w-3.5 h-3.5" />
                  <span className="flex-1 text-left truncate">{p.label}</span>
                  <span className={`text-[10px] ${page === p.id ? "text-white/70" : "text-slate-400"}`}>{p.path}</span>
                </button>
              </li>
            ))}
          </ul>
        </Card>

        <div className="space-y-6 min-w-0">
          <Card>
            <CardHeader title={`${current.label} — Meta Tags`} description="Standard SEO meta information." />
            <div className="p-5 sm:p-6 space-y-5">
              <Field label="Meta Title" required hint="50–60 characters recommended">
                <Input defaultValue={`${current.label} | Wheelchair Rugby Federation of India`} />
              </Field>
              <Field label="Meta Description" required hint="150–160 characters recommended">
                <Textarea rows={3} defaultValue="Wheelchair Rugby Federation of India empowers para-athletes, builds inclusive sport, and represents India on the world stage." />
              </Field>
              <Field label="Keywords" hint="Comma-separated">
                <Input defaultValue="wheelchair rugby, para sports, india, wrfi, inclusive sports" />
              </Field>
              <Field label="Canonical URL">
                <Input defaultValue={`https://wrfi.org${current.path}`} />
              </Field>
            </div>
          </Card>

          <Card>
            <CardHeader title="Open Graph & Twitter" description="Used when this page is shared on social media." />
            <div className="p-5 sm:p-6 grid grid-cols-1 md:grid-cols-2 gap-5">
              <Field label="OG Title"><Input defaultValue={`${current.label} | WRFI`} /></Field>
              <Field label="Twitter Card Type"><Input defaultValue="summary_large_image" /></Field>
              <div className="md:col-span-2">
                <Field label="OG Description"><Textarea rows={2} /></Field>
              </div>
              <div className="md:col-span-2">
                <Field label="OG Image URL" hint="1200×630 recommended">
                  <Input defaultValue="https://wrfi.org/og-image.jpg" />
                </Field>
              </div>
            </div>
          </Card>

          <Card>
            <CardHeader title="Schema Markup" description="JSON-LD structured data for rich snippets." />
            <div className="p-5 sm:p-6">
              <Field label="JSON-LD">
                <Textarea
                  rows={8}
                  className="font-mono text-xs"
                  defaultValue={`{
  "@context": "https://schema.org",
  "@type": "SportsOrganization",
  "name": "Wheelchair Rugby Federation of India",
  "url": "https://wrfi.org",
  "sport": "Wheelchair Rugby"
}`}
                />
              </Field>
            </div>
          </Card>

          <Card>
            <CardHeader title="Search Preview" />
            <div className="p-5 sm:p-6">
              <div className="bg-slate-50 border border-slate-200 rounded-xl p-5 max-w-2xl">
                <div className="flex items-center gap-2 text-xs text-slate-500 mb-1">
                  <Globe className="w-3 h-3" /> wrfi.org{current.path}
                </div>
                <div className="text-lg text-blue-700 font-medium hover:underline cursor-pointer mb-1">
                  {current.label} | Wheelchair Rugby Federation of India
                </div>
                <div className="text-sm text-slate-600">
                  Wheelchair Rugby Federation of India empowers para-athletes, builds inclusive sport, and represents India on the world stage.
                </div>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
