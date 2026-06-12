"use client";

import Link from "next/link";
import { ChevronRight, type LucideIcon } from "lucide-react";

export function PageHeader({
  title,
  subtitle,
  breadcrumbs,
  actions,
}: {
  title: string;
  subtitle?: string;
  breadcrumbs?: { label: string; href?: string }[];
  actions?: React.ReactNode;
}) {
  return (
    <div className="mb-6 flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
      <div>
        {breadcrumbs && breadcrumbs.length > 0 && (
          <nav className="flex items-center text-xs text-slate-500 mb-2 flex-wrap gap-y-1">
            {breadcrumbs.map((b, i) => (
              <span key={i} className="inline-flex items-center">
                {b.href ? (
                  <Link href={b.href} className="hover:text-saffron font-medium">
                    {b.label}
                  </Link>
                ) : (
                  <span className="text-slate-700 font-medium">{b.label}</span>
                )}
                {i < breadcrumbs.length - 1 && <ChevronRight className="w-3 h-3 mx-1.5 text-slate-300" />}
              </span>
            ))}
          </nav>
        )}
        <h1 className="text-2xl sm:text-3xl font-bold text-navy tracking-tight">{title}</h1>
        {subtitle && <p className="text-slate-500 text-sm mt-1.5">{subtitle}</p>}
      </div>
      {actions && <div className="flex items-center gap-2 flex-wrap">{actions}</div>}
    </div>
  );
}

export function Card({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={`bg-white border border-slate-200 rounded-2xl shadow-sm ${className}`}
    >
      {children}
    </div>
  );
}

export function CardHeader({
  title,
  description,
  action,
}: {
  title: string;
  description?: string;
  action?: React.ReactNode;
}) {
  return (
    <div className="px-5 sm:px-6 py-4 border-b border-slate-100 flex items-center justify-between gap-3">
      <div className="min-w-0">
        <h3 className="text-base font-semibold text-navy truncate">{title}</h3>
        {description && <p className="text-xs text-slate-500 mt-0.5">{description}</p>}
      </div>
      {action}
    </div>
  );
}

export function StatCard({
  icon: Icon,
  label,
  value,
  delta,
  color = "blue",
}: {
  icon: LucideIcon;
  label: string;
  value: string | number;
  delta?: { value: string; up?: boolean };
  color?: "blue" | "orange" | "green" | "purple" | "pink" | "yellow";
}) {
  const colorMap: Record<string, string> = {
    blue: "bg-blue-50 text-[#0B3D91]",
    orange: "bg-orange-50 text-saffron",
    green: "bg-green-50 text-green-600",
    purple: "bg-purple-50 text-purple-600",
    pink: "bg-pink-50 text-pink-600",
    yellow: "bg-yellow-50 text-yellow-600",
  };
  return (
    <Card className="p-5">
      <div className="flex items-start justify-between mb-4">
        <div className={`w-11 h-11 rounded-xl flex items-center justify-center ${colorMap[color]}`}>
          <Icon className="w-5 h-5" />
        </div>
        {delta && (
          <span
            className={`text-[11px] font-bold px-2 py-1 rounded-full ${
              delta.up ? "bg-green-50 text-green-600" : "bg-red-50 text-red-600"
            }`}
          >
            {delta.up ? "▲" : "▼"} {delta.value}
          </span>
        )}
      </div>
      <div className="text-[11px] uppercase tracking-wider text-slate-500 font-semibold mb-1">
        {label}
      </div>
      <div className="text-2xl font-bold text-navy">{value}</div>
    </Card>
  );
}

export function Button({
  children,
  variant = "primary",
  size = "md",
  className = "",
  ...props
}: React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "primary" | "secondary" | "ghost" | "danger" | "outline";
  size?: "sm" | "md" | "lg";
}) {
  const sizes = {
    sm: "px-3 py-1.5 text-xs",
    md: "px-4 py-2 text-sm",
    lg: "px-5 py-2.5 text-sm",
  };
  const variants = {
    primary: "bg-[#0B3D91] hover:bg-navy text-white shadow-md shadow-[#0B3D91]/20",
    secondary: "bg-saffron hover:bg-saffron-dark text-white shadow-md shadow-saffron/20",
    outline: "border border-slate-200 bg-white hover:bg-slate-50 text-slate-700",
    ghost: "text-slate-600 hover:bg-slate-100",
    danger: "bg-red-600 hover:bg-red-700 text-white",
  };
  return (
    <button
      {...props}
      className={`inline-flex items-center justify-center gap-2 font-semibold rounded-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed ${sizes[size]} ${variants[variant]} ${className}`}
    >
      {children}
    </button>
  );
}

export function Badge({
  children,
  color = "slate",
}: {
  children: React.ReactNode;
  color?: "slate" | "green" | "orange" | "blue" | "red" | "yellow";
}) {
  const map: Record<string, string> = {
    slate: "bg-slate-100 text-slate-700",
    green: "bg-green-100 text-green-700",
    orange: "bg-orange-100 text-orange-700",
    blue: "bg-blue-100 text-blue-700",
    red: "bg-red-100 text-red-700",
    yellow: "bg-yellow-100 text-yellow-700",
  };
  return (
    <span className={`inline-flex items-center px-2 py-0.5 rounded-md text-[11px] font-semibold ${map[color]}`}>
      {children}
    </span>
  );
}

export function Field({
  label,
  hint,
  children,
  required,
}: {
  label: string;
  hint?: string;
  required?: boolean;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label className="block text-xs font-semibold text-slate-700 mb-1.5">
        {label}
        {required && <span className="text-red-500 ml-0.5">*</span>}
      </label>
      {children}
      {hint && <p className="text-[11px] text-slate-500 mt-1">{hint}</p>}
    </div>
  );
}

export function Input(props: React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <input
      {...props}
      className={`w-full px-3.5 py-2.5 bg-white border border-slate-200 rounded-lg text-sm text-slate-900 placeholder:text-slate-400 focus:border-saffron focus:ring-4 focus:ring-saffron/10 outline-none transition ${props.className || ""}`}
    />
  );
}

export function Textarea(props: React.TextareaHTMLAttributes<HTMLTextAreaElement>) {
  return (
    <textarea
      {...props}
      className={`w-full px-3.5 py-2.5 bg-white border border-slate-200 rounded-lg text-sm text-slate-900 placeholder:text-slate-400 focus:border-saffron focus:ring-4 focus:ring-saffron/10 outline-none transition ${props.className || ""}`}
    />
  );
}

export function Select(props: React.SelectHTMLAttributes<HTMLSelectElement>) {
  return (
    <select
      {...props}
      className={`w-full px-3.5 py-2.5 bg-white border border-slate-200 rounded-lg text-sm text-slate-900 focus:border-saffron focus:ring-4 focus:ring-saffron/10 outline-none transition ${props.className || ""}`}
    />
  );
}

export function Toggle({
  checked,
  onChange,
  label,
}: {
  checked: boolean;
  onChange: (v: boolean) => void;
  label?: string;
}) {
  return (
    <label className="inline-flex items-center gap-3 cursor-pointer">
      <button
        type="button"
        onClick={() => onChange(!checked)}
        className={`relative w-11 h-6 rounded-full transition ${
          checked ? "bg-saffron" : "bg-slate-300"
        }`}
        role="switch"
        aria-checked={checked}
      >
        <span
          className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full shadow transition-transform ${
            checked ? "translate-x-5" : ""
          }`}
        />
      </button>
      {label && <span className="text-sm font-medium text-slate-700">{label}</span>}
    </label>
  );
}

export function EmptyState({
  icon: Icon,
  title,
  description,
  action,
}: {
  icon: LucideIcon;
  title: string;
  description?: string;
  action?: React.ReactNode;
}) {
  return (
    <div className="text-center py-16 px-4">
      <div className="w-16 h-16 mx-auto rounded-2xl bg-slate-100 text-slate-400 flex items-center justify-center mb-4">
        <Icon className="w-7 h-7" />
      </div>
      <h3 className="text-base font-semibold text-navy mb-1">{title}</h3>
      {description && <p className="text-sm text-slate-500 max-w-sm mx-auto mb-4">{description}</p>}
      {action}
    </div>
  );
}
