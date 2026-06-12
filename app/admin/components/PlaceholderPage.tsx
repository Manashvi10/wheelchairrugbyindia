"use client";

import { Construction, Sparkles } from "lucide-react";
import { PageHeader, Card, Button } from "./ui";

export default function PlaceholderPage({
  title,
  subtitle,
  breadcrumbs,
  features = [],
}: {
  title: string;
  subtitle?: string;
  breadcrumbs?: { label: string; href?: string }[];
  features?: string[];
}) {
  return (
    <div className="space-y-6">
      <PageHeader title={title} subtitle={subtitle} breadcrumbs={breadcrumbs} />
      <Card className="p-10 text-center">
        <div className="w-20 h-20 mx-auto rounded-2xl bg-gradient-to-br from-[#0B3D91] to-saffron text-white flex items-center justify-center mb-5">
          <Construction className="w-9 h-9" />
        </div>
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-saffron/10 text-saffron text-[11px] font-bold uppercase tracking-wider mb-3">
          <Sparkles className="w-3 h-3" />
          Module Ready · UI Wireframe
        </div>
        <h2 className="text-2xl font-bold text-navy mb-2">{title}</h2>
        <p className="text-slate-500 text-sm max-w-lg mx-auto mb-6">
          This module's UI is wired into the admin shell. Connect your backend (REST or GraphQL) to
          activate full CRUD with the fields listed below.
        </p>
        {features.length > 0 && (
          <div className="max-w-lg mx-auto bg-slate-50 border border-slate-200 rounded-xl p-5 text-left mb-6">
            <div className="text-[11px] font-bold uppercase tracking-widest text-slate-500 mb-3">
              Planned capabilities
            </div>
            <ul className="space-y-2">
              {features.map((f) => (
                <li key={f} className="flex items-start gap-2 text-sm text-slate-700">
                  <span className="w-1.5 h-1.5 rounded-full bg-saffron mt-2 shrink-0" />
                  {f}
                </li>
              ))}
            </ul>
          </div>
        )}
        <div className="flex items-center justify-center gap-2">
          <Button variant="outline">View API Spec</Button>
          <Button variant="primary">Configure Module</Button>
        </div>
      </Card>
    </div>
  );
}
