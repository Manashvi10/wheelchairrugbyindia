"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowLeft, Save, Upload, Plus } from "lucide-react";
import { PageHeader, Card, CardHeader, Button, Field, Input, Textarea, Select } from "../../components/ui";

export default function NewAthletePage() {
  const router = useRouter();
  return (
    <div className="space-y-6">
      <PageHeader
        title="Add New Athlete"
        subtitle="Create a complete athlete profile with classification, achievements and documents."
        breadcrumbs={[
          { label: "Admin", href: "/admin" },
          { label: "Athletes", href: "/admin/athletes" },
          { label: "New" },
        ]}
        actions={
          <>
            <Link href="/admin/athletes">
              <Button variant="outline">
                <ArrowLeft className="w-4 h-4" /> Cancel
              </Button>
            </Link>
            <Button variant="outline">Save as Draft</Button>
            <Button variant="primary">
              <Save className="w-4 h-4" /> Publish Athlete
            </Button>
          </>
        }
      />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <CardHeader title="Personal Information" description="Basic details required for the public profile." />
            <div className="p-5 sm:p-6 grid grid-cols-1 sm:grid-cols-2 gap-5">
              <Field label="Full Name" required><Input placeholder="e.g. Arjun Singh" /></Field>
              <Field label="Date of Birth" required><Input type="date" /></Field>
              <Field label="Gender" required>
                <Select defaultValue=""><option value="" disabled>Select…</option><option>Male</option><option>Female</option><option>Other</option></Select>
              </Field>
              <Field label="State" required><Input placeholder="e.g. Punjab" /></Field>
              <Field label="City"><Input placeholder="e.g. Amritsar" /></Field>
              <Field label="Email"><Input type="email" placeholder="athlete@example.com" /></Field>
              <Field label="Phone"><Input placeholder="+91 ..." /></Field>
              <Field label="Status">
                <Select defaultValue="Active"><option>Active</option><option>Inactive</option><option>Retired</option></Select>
              </Field>
            </div>
          </Card>

          <Card>
            <CardHeader title="Sports Classification" />
            <div className="p-5 sm:p-6 grid grid-cols-1 sm:grid-cols-2 gap-5">
              <Field label="Classification" required hint="Wheelchair rugby class 0.5 – 3.5">
                <Select defaultValue=""><option value="" disabled>Select…</option>
                  {["0.5","1.0","1.5","2.0","2.5","3.0","3.5"].map((c) => <option key={c}>{c}</option>)}
                </Select>
              </Field>
              <Field label="Position">
                <Select defaultValue=""><option value="" disabled>Select…</option><option>Low Pointer</option><option>Mid Pointer</option><option>High Pointer</option></Select>
              </Field>
            </div>
          </Card>

          <Card>
            <CardHeader title="Biography & Achievements" />
            <div className="p-5 sm:p-6 space-y-5">
              <Field label="Biography" hint="Rich text editor will be wired here."><Textarea rows={5} placeholder="Tell the athlete's story..." /></Field>
              <div>
                <div className="flex items-center justify-between mb-2">
                  <label className="text-xs font-semibold text-slate-700">Achievements</label>
                  <Button size="sm" variant="outline"><Plus className="w-3 h-3" /> Add</Button>
                </div>
                <div className="space-y-2">
                  {[1, 2].map((i) => (
                    <div key={i} className="grid grid-cols-[100px_1fr] gap-2">
                      <Input placeholder="Year" />
                      <Input placeholder="Achievement title" />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </Card>

          <Card>
            <CardHeader title="Documents" description="Upload medical & classification certificates." />
            <div className="p-5 sm:p-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
              {["Medical Certificate", "Classification Certificate"].map((d) => (
                <div key={d} className="border-2 border-dashed border-slate-200 rounded-xl p-5 text-center hover:border-saffron transition cursor-pointer">
                  <Upload className="w-6 h-6 mx-auto text-slate-400 mb-2" />
                  <div className="text-xs font-semibold text-slate-700">{d}</div>
                  <div className="text-[10px] text-slate-400 mt-1">PDF up to 10 MB</div>
                </div>
              ))}
            </div>
          </Card>
        </div>

        <div className="space-y-6">
          <Card>
            <CardHeader title="Profile Photo" />
            <div className="p-5">
              <div className="aspect-square bg-slate-50 border-2 border-dashed border-slate-200 rounded-xl flex flex-col items-center justify-center text-center p-6 hover:border-saffron transition cursor-pointer">
                <Upload className="w-7 h-7 text-slate-400 mb-2" />
                <div className="text-sm font-semibold text-slate-700">Upload Photo</div>
                <div className="text-[11px] text-slate-400 mt-1">Square, 800×800 recommended</div>
              </div>
            </div>
          </Card>

          <Card>
            <CardHeader title="Social Links" />
            <div className="p-5 space-y-3">
              {["Instagram", "Twitter / X", "Facebook", "LinkedIn", "YouTube"].map((s) => (
                <Field key={s} label={s}><Input placeholder={`https://`} /></Field>
              ))}
            </div>
          </Card>

          <Card>
            <CardHeader title="Settings" />
            <div className="p-5 space-y-3 text-sm">
              <label className="flex items-center justify-between"><span className="text-slate-700">Featured on homepage</span>
                <input type="checkbox" className="w-4 h-4 accent-saffron" /></label>
              <label className="flex items-center justify-between"><span className="text-slate-700">Show on team page</span>
                <input type="checkbox" className="w-4 h-4 accent-saffron" defaultChecked /></label>
              <label className="flex items-center justify-between"><span className="text-slate-700">Allow public contact</span>
                <input type="checkbox" className="w-4 h-4 accent-saffron" /></label>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
