"use client";

import { useState, useEffect, useCallback } from "react";
import { Plus, Edit3, Trash2, Star, Image as ImageIcon, ExternalLink, Loader2, X, Save } from "lucide-react";
import { PageHeader, Card, Button, Badge, Input, Select, Field, Toggle } from "../components/ui";

type Partner = {
  id: number; name: string; website: string;
  category: string; featured: number; status: string;
};

const CATS = ["Title Sponsor","Official Partner","Supporting Partner","Media Partner"];
const BLANK = { name:"", website:"", category:"Official Partner", featured:0, status:"Active" };

export default function PartnersPage() {
  const [partners, setPartners] = useState<Partner[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [modal, setModal] = useState<"add"|"edit"|null>(null);
  const [form, setForm] = useState<typeof BLANK>(BLANK);
  const [editId, setEditId] = useState<number|null>(null);

  const load = useCallback(async () => {
    setLoading(true);
    const res = await fetch("/api/partners");
    const data = await res.json();
    setPartners(data.partners ?? []);
    setLoading(false);
  }, []);

  useEffect(() => { load(); }, [load]);

  const openAdd = () => { setForm(BLANK); setEditId(null); setModal("add"); };
  const openEdit = (p: Partner) => {
    setForm({ name:p.name, website:p.website, category:p.category, featured:p.featured, status:p.status });
    setEditId(p.id); setModal("edit");
  };

  const handleSave = async () => {
    setSaving(true);
    const url = modal==="edit" ? `/api/partners/${editId}` : "/api/partners";
    await fetch(url, { method:modal==="edit"?"PUT":"POST",
      headers:{"Content-Type":"application/json"}, body:JSON.stringify(form) });
    setSaving(false); setModal(null); load();
  };

  const handleDelete = async (p: Partner) => {
    if (!confirm(`Remove partner "${p.name}"?`)) return;
    await fetch(`/api/partners/${p.id}`, { method:"DELETE" });
    load();
  };

  const catCounts = CATS.map((c) => partners.filter((p) => p.category===c && p.status==="Active").length);

  return (
    <div className="space-y-6">
      <PageHeader
        title="Partners Management"
        subtitle="Manage sponsors, partners and the public directory."
        breadcrumbs={[{label:"Admin",href:"/admin"},{label:"Partners"}]}
        actions={<Button variant="secondary" onClick={openAdd}><Plus className="w-4 h-4"/> Add Partner</Button>}
      />

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {CATS.map((c,i) => (
          <Card key={c} className="p-4">
            <div className="text-[11px] uppercase tracking-wider text-slate-500 font-semibold mb-1">{c}</div>
            <div className="text-2xl font-bold text-navy">{loading?"…":catCounts[i]}</div>
            <div className="text-[11px] text-slate-400 mt-1">active</div>
          </Card>
        ))}
      </div>

      <Card>
        {loading ? (
          <div className="flex items-center justify-center py-16"><Loader2 className="w-6 h-6 animate-spin text-slate-400"/></div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-slate-50 text-slate-500 text-[11px] uppercase tracking-wider">
                <tr>
                  <th className="text-left font-semibold px-6 py-3">Partner</th>
                  <th className="text-left font-semibold px-6 py-3">Category</th>
                  <th className="text-left font-semibold px-6 py-3">Website</th>
                  <th className="text-left font-semibold px-6 py-3">Featured</th>
                  <th className="text-left font-semibold px-6 py-3">Status</th>
                  <th className="text-left font-semibold px-6 py-3 w-20"></th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {partners.map((p) => (
                  <tr key={p.id} className="hover:bg-slate-50">
                    <td className="px-6 py-3">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-lg bg-slate-100 text-slate-400 flex items-center justify-center"><ImageIcon className="w-4 h-4"/></div>
                        <div className="font-semibold text-slate-800">{p.name}</div>
                      </div>
                    </td>
                    <td className="px-6 py-3"><Badge color="orange">{p.category}</Badge></td>
                    <td className="px-6 py-3 text-slate-600">
                      {p.website ? (
                        <a href={p.website} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1 hover:text-saffron truncate max-w-[180px]">
                          {p.website.replace(/^https?:\/\//,"")} <ExternalLink className="w-3 h-3 shrink-0"/>
                        </a>
                      ) : "—"}
                    </td>
                    <td className="px-6 py-3">{!!p.featured && <Star className="w-4 h-4 text-saffron fill-saffron"/>}</td>
                    <td className="px-6 py-3">
                      <Badge color={p.status==="Active"?"green":p.status==="Pending"?"yellow":"slate"}>{p.status}</Badge>
                    </td>
                    <td className="px-6 py-3">
                      <div className="flex items-center gap-1">
                        <button onClick={() => openEdit(p)} className="p-1.5 text-slate-400 hover:text-saffron rounded hover:bg-slate-100"><Edit3 className="w-3.5 h-3.5"/></button>
                        <button onClick={() => handleDelete(p)} className="p-1.5 text-slate-400 hover:text-red-600 rounded hover:bg-slate-100"><Trash2 className="w-3.5 h-3.5"/></button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            {partners.length === 0 && <p className="text-center py-12 text-sm text-slate-400">No partners yet.</p>}
          </div>
        )}
      </Card>

      {modal && (
        <div className="fixed inset-0 z-50 flex">
          <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={() => setModal(null)}/>
          <div className="relative ml-auto w-full max-w-md bg-white h-full overflow-y-auto shadow-2xl flex flex-col">
            <div className="flex items-center justify-between px-6 py-4 border-b border-slate-200">
              <h2 className="text-lg font-bold text-navy">{modal==="add"?"Add Partner":"Edit Partner"}</h2>
              <button onClick={() => setModal(null)} className="p-2 text-slate-400 hover:text-slate-700 rounded-lg hover:bg-slate-100"><X className="w-5 h-5"/></button>
            </div>
            <div className="flex-1 p-6 space-y-4">
              <Field label="Partner / Sponsor Name" required>
                <Input value={form.name} onChange={(e) => setForm({...form,name:e.target.value})} placeholder="TATA Motors"/>
              </Field>
              <Field label="Website URL">
                <Input value={form.website} onChange={(e) => setForm({...form,website:e.target.value})} placeholder="https://example.com"/>
              </Field>
              <Field label="Category">
                <Select value={form.category} onChange={(e) => setForm({...form,category:e.target.value})}>
                  {CATS.map(c=><option key={c}>{c}</option>)}
                </Select>
              </Field>
              <Field label="Status">
                <Select value={form.status} onChange={(e) => setForm({...form,status:e.target.value})}>
                  <option>Active</option><option>Inactive</option><option>Pending</option>
                </Select>
              </Field>
              <Toggle checked={!!form.featured} onChange={(v) => setForm({...form,featured:v?1:0})} label="Featured on website"/>
            </div>
            <div className="px-6 py-4 border-t border-slate-200 flex justify-end gap-3">
              <Button variant="outline" onClick={() => setModal(null)}>Cancel</Button>
              <Button variant="secondary" onClick={handleSave} disabled={saving||!form.name}>
                {saving?<Loader2 className="w-4 h-4 animate-spin"/>:<Save className="w-4 h-4"/>}
                {modal==="add"?"Add Partner":"Save Changes"}
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
