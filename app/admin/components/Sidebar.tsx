"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { ChevronDown, X } from "lucide-react";
import { NAV, NavItem } from "../lib/nav";

interface Props {
  open: boolean;
  onClose: () => void;
  collapsed: boolean;
}

export default function Sidebar({ open, onClose, collapsed }: Props) {
  const pathname = usePathname();
  const [openGroups, setOpenGroups] = useState<Record<string, boolean>>(() => {
    const init: Record<string, boolean> = {};
    NAV.forEach((n) => {
      if (n.children?.some((c) => c.href && pathname?.startsWith(c.href))) {
        init[n.label] = true;
      }
    });
    return init;
  });

  const isActive = (href?: string) => {
    if (!href) return false;
    if (href === "/admin") return pathname === "/admin";
    return pathname?.startsWith(href);
  };

  return (
    <>
      {/* Mobile backdrop */}
      <div
        className={`lg:hidden fixed inset-0 bg-slate-900/60 z-40 transition-opacity ${
          open ? "opacity-100 visible" : "opacity-0 invisible"
        }`}
        onClick={onClose}
      />

      <aside
        className={`fixed lg:sticky top-0 left-0 h-screen z-50 lg:z-30 bg-[#0B3D91] text-white flex flex-col transition-all duration-300 ${
          collapsed ? "lg:w-20" : "lg:w-72"
        } w-72 ${open ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}`}
      >
        {/* Brand */}
        <div className="h-16 flex items-center justify-between px-4 border-b border-white/10 shrink-0">
          <Link href="/admin" className="flex items-center gap-3 min-w-0">
            <img src="/images/logo1.png" alt="WRFI" className="w-9 h-9 object-contain shrink-0" />
            {!collapsed && (
              <div className="min-w-0">
                <div className="font-bold text-sm tracking-tight truncate">WRFI Admin</div>
                <div className="text-[10px] text-white/60 uppercase tracking-widest">Console</div>
              </div>
            )}
          </Link>
          <button onClick={onClose} className="lg:hidden text-white/70 hover:text-white" aria-label="Close">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Nav */}
        <nav className="flex-1 overflow-y-auto py-4 px-3 scrollbar-hide">
          {!collapsed && (
            <div className="px-3 pb-2 text-[10px] font-bold uppercase tracking-widest text-white/40">
              Main Menu
            </div>
          )}
          <ul className="space-y-0.5">
            {NAV.map((item) => (
              <NavRow
                key={item.label}
                item={item}
                isActive={isActive}
                openGroups={openGroups}
                setOpenGroups={setOpenGroups}
                collapsed={collapsed}
              />
            ))}
          </ul>
        </nav>

        {/* Footer card */}
        {!collapsed && (
          <div className="p-3 border-t border-white/10 shrink-0">
            <div className="bg-gradient-to-br from-saffron to-saffron-dark rounded-xl p-4">
              <div className="text-xs font-bold uppercase tracking-wider mb-1">Need help?</div>
              <div className="text-[11px] text-white/90 mb-3 leading-relaxed">
                Check our admin docs for tips & tutorials.
              </div>
              <button className="w-full bg-white/20 hover:bg-white/30 text-white text-xs font-semibold py-2 rounded-lg transition">
                View Documentation
              </button>
            </div>
          </div>
        )}
      </aside>
    </>
  );
}

function NavRow({
  item,
  isActive,
  openGroups,
  setOpenGroups,
  collapsed,
}: {
  item: NavItem;
  isActive: (href?: string) => boolean;
  openGroups: Record<string, boolean>;
  setOpenGroups: React.Dispatch<React.SetStateAction<Record<string, boolean>>>;
  collapsed: boolean;
}) {
  const Icon = item.icon;
  const opened = openGroups[item.label];
  const hasChildren = !!item.children?.length;
  const groupActive = item.children?.some((c) => isActive(c.href));

  if (hasChildren) {
    return (
      <li>
        <button
          onClick={() => setOpenGroups((g) => ({ ...g, [item.label]: !g[item.label] }))}
          className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition group ${
            groupActive ? "bg-white/10 text-white" : "text-white/75 hover:bg-white/10 hover:text-white"
          } ${collapsed ? "justify-center" : ""}`}
          title={collapsed ? item.label : undefined}
        >
          {Icon && <Icon className="w-4 h-4 shrink-0" />}
          {!collapsed && (
            <>
              <span className="flex-1 text-left truncate">{item.label}</span>
              <ChevronDown
                className={`w-3.5 h-3.5 transition-transform ${opened ? "rotate-180" : ""}`}
              />
            </>
          )}
        </button>
        {!collapsed && opened && (
          <ul className="mt-1 ml-3 pl-3 border-l border-white/10 space-y-0.5">
            {item.children!.map((c) => (
              <li key={c.label}>
                <Link
                  href={c.href || "#"}
                  className={`flex items-center gap-3 px-3 py-2 rounded-lg text-[13px] transition ${
                    isActive(c.href)
                      ? "bg-saffron text-white font-semibold shadow-lg shadow-saffron/20"
                      : "text-white/65 hover:bg-white/10 hover:text-white"
                  }`}
                >
                  {c.icon && <c.icon className="w-3.5 h-3.5 shrink-0" />}
                  <span className="truncate">{c.label}</span>
                </Link>
              </li>
            ))}
          </ul>
        )}
      </li>
    );
  }

  return (
    <li>
      <Link
        href={item.href || "#"}
        className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition ${
          isActive(item.href)
            ? "bg-saffron text-white shadow-lg shadow-saffron/20"
            : "text-white/75 hover:bg-white/10 hover:text-white"
        } ${collapsed ? "justify-center" : ""}`}
        title={collapsed ? item.label : undefined}
      >
        {Icon && <Icon className="w-4 h-4 shrink-0" />}
        {!collapsed && (
          <>
            <span className="flex-1 truncate">{item.label}</span>
            {item.badge && (
              <span className="bg-saffron text-white text-[10px] font-bold px-2 py-0.5 rounded-full">
                {item.badge}
              </span>
            )}
          </>
        )}
      </Link>
    </li>
  );
}
