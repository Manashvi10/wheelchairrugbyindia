"use client";

import { useState } from "react";
import { Upload, FolderPlus, Search, Filter, Trash2, Tag } from "lucide-react";
import { PageHeader, Card, Button, Input } from "../../components/ui";

export default function GalleryPage() {
  const [view, setView] = useState<"grid" | "list">("grid");
  return (
    <div className="space-y-6">
      <PageHeader
        title="Media Gallery"
        subtitle="Centralized image library with folders, tags and bulk tools."
        breadcrumbs={[{ label: "Admin", href: "/admin" }, { label: "Media Center" }, { label: "Gallery" }]}
        actions={
          <>
            <Button variant="outline"><FolderPlus className="w-4 h-4" /> New Folder</Button>
            <Button variant="secondary"><Upload className="w-4 h-4" /> Upload</Button>
          </>
        }
      />

      <div className="grid grid-cols-1 lg:grid-cols-[240px_1fr] gap-6">
        <Card className="p-3 h-fit lg:sticky lg:top-20">
          <div className="px-2 py-2 text-[10px] font-bold uppercase tracking-widest text-slate-400">Folders</div>
          <ul className="space-y-0.5 text-sm">
            {[
              { l: "All Media", c: 326, active: true },
              { l: "Events", c: 142 },
              { l: "Athletes", c: 88 },
              { l: "Press / News", c: 41 },
              { l: "Sponsors", c: 29 },
              { l: "Branding", c: 26 },
            ].map((f) => (
              <li key={f.l}>
                <button className={`w-full flex items-center justify-between px-3 py-2 rounded-lg ${f.active ? "bg-saffron/10 text-saffron font-semibold" : "hover:bg-slate-100 text-slate-700"}`}>
                  <span>{f.l}</span>
                  <span className="text-[11px] text-slate-400">{f.c}</span>
                </button>
              </li>
            ))}
          </ul>
        </Card>

        <Card>
          <div className="px-5 sm:px-6 py-4 border-b border-slate-100 flex flex-col sm:flex-row gap-3 sm:items-center sm:justify-between">
            <div className="flex gap-2 flex-1 max-w-md">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                <Input placeholder="Search images, tags, captions..." className="pl-10" />
              </div>
              <Button variant="outline" size="md"><Filter className="w-4 h-4" /> Filter</Button>
            </div>
            <div className="inline-flex p-1 bg-slate-100 rounded-lg text-xs font-semibold">
              {(["grid", "list"] as const).map((v) => (
                <button key={v} onClick={() => setView(v)} className={`px-3 py-1.5 rounded-md capitalize ${view === v ? "bg-white shadow-sm text-navy" : "text-slate-500"}`}>
                  {v}
                </button>
              ))}
            </div>
          </div>

          <div className="p-5 sm:p-6">
            <div className="border-2 border-dashed border-slate-200 rounded-xl p-8 text-center mb-5 hover:border-saffron transition cursor-pointer">
              <Upload className="w-7 h-7 mx-auto text-slate-400 mb-2" />
              <div className="text-sm font-semibold text-slate-700">Drop files here or click to upload</div>
              <div className="text-xs text-slate-400 mt-1">Bulk upload · auto-compress · drag-and-drop reorder</div>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
              {[...Array(12)].map((_, i) => (
                <div key={i} className="group relative">
                  <div className="aspect-square bg-gradient-to-br from-slate-200 to-slate-300 rounded-xl" />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 rounded-xl transition flex items-center justify-center opacity-0 group-hover:opacity-100">
                    <div className="flex gap-1.5">
                      <button className="p-2 bg-white rounded-lg text-slate-700 hover:text-saffron"><Tag className="w-3.5 h-3.5" /></button>
                      <button className="p-2 bg-white rounded-lg text-slate-700 hover:text-red-600"><Trash2 className="w-3.5 h-3.5" /></button>
                    </div>
                  </div>
                  <div className="text-xs text-slate-600 mt-2 truncate">image_{i + 1}.jpg</div>
                </div>
              ))}
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}
