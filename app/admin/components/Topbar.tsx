"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import {
  Menu,
  Search,
  Bell,
  Sun,
  Moon,
  Clock,
  ExternalLink,
  ChevronDown,
  LogOut,
  User,
  Settings as SettingsIcon,
  PanelLeftClose,
  PanelLeftOpen,
} from "lucide-react";
import { AdminUser, logout } from "../lib/auth";
import { useAdminTheme } from "../lib/theme";

interface Props {
  user: AdminUser;
  onMobileMenu: () => void;
  collapsed: boolean;
  onToggleCollapse: () => void;
}

function useISTClock() {
  const [now, setNow] = useState<string>("");
  useEffect(() => {
    const tick = () => {
      setNow(
        new Intl.DateTimeFormat("en-IN", {
          hour: "numeric",
          minute: "2-digit",
          second: "2-digit",
          hour12: true,
          timeZone: "Asia/Kolkata",
        }).format(new Date())
      );
    };
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);
  return now;
}

export default function Topbar({ user, onMobileMenu, collapsed, onToggleCollapse }: Props) {
  const router = useRouter();
  const { theme, toggle: toggleTheme } = useAdminTheme();
  const istNow = useISTClock();
  const [open, setOpen] = useState(false);
  const [notifOpen, setNotifOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
        setNotifOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const handleLogout = async () => {
    await logout();
    router.push("/admin/login");
  };

  return (
    <header className="sticky top-0 z-30 bg-white border-b border-slate-200">
      <div className="h-16 px-4 sm:px-6 flex items-center gap-3">
        <button
          onClick={onMobileMenu}
          className="lg:hidden p-2 -ml-2 text-slate-600 hover:text-navy"
          aria-label="Open menu"
        >
          <Menu className="w-5 h-5" />
        </button>
        <button
          onClick={onToggleCollapse}
          className="hidden lg:inline-flex p-2 -ml-2 text-slate-500 hover:text-navy hover:bg-slate-100 rounded-lg"
          aria-label="Toggle sidebar"
        >
          {collapsed ? <PanelLeftOpen className="w-5 h-5" /> : <PanelLeftClose className="w-5 h-5" />}
        </button>

        {/* Search */}
        <div className="flex-1 max-w-md hidden sm:block">
          <div className="relative">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              type="text"
              placeholder="Search athletes, events, pages..."
              className="w-full pl-10 pr-4 py-2.5 bg-slate-100 border border-transparent rounded-xl text-sm placeholder:text-slate-400 focus:bg-white focus:border-saffron focus:ring-4 focus:ring-saffron/10 outline-none transition"
            />
            <kbd className="hidden md:inline-flex absolute right-2 top-1/2 -translate-y-1/2 items-center px-2 py-1 rounded text-[10px] font-mono bg-white border border-slate-200 text-slate-500">
              ⌘K
            </kbd>
          </div>
        </div>

        <div className="flex-1 sm:hidden" />

        <div className="flex items-center gap-1 sm:gap-2" ref={ref}>
          {/* Live IST clock */}
          <div
            className="hidden md:inline-flex items-center gap-1.5 px-3 py-2 text-xs font-semibold text-slate-600 bg-slate-100 rounded-lg"
            title="Indian Standard Time"
          >
            <Clock className="w-3.5 h-3.5 text-saffron" />
            <span className="tabular-nums">{istNow}</span>
            <span className="text-[10px] text-slate-400 font-bold">IST</span>
          </div>

          <Link
            href="/"
            target="_blank"
            className="hidden sm:inline-flex items-center gap-2 px-3 py-2 text-xs font-semibold text-slate-600 hover:text-navy bg-slate-100 hover:bg-slate-200 rounded-lg transition"
          >
            <ExternalLink className="w-3.5 h-3.5" />
            View Site
          </Link>
          <button
            onClick={toggleTheme}
            className="p-2.5 text-slate-500 hover:text-navy hover:bg-slate-100 rounded-lg transition"
            aria-label={theme === "dark" ? "Switch to light mode" : "Switch to dark mode"}
            title={theme === "dark" ? "Switch to light mode" : "Switch to dark mode"}
          >
            {theme === "dark" ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
          </button>

          {/* Notifications */}
          <div className="relative">
            <button
              onClick={() => {
                setNotifOpen((v) => !v);
                setOpen(false);
              }}
              className="relative p-2.5 text-slate-500 hover:text-navy hover:bg-slate-100 rounded-lg"
              aria-label="Notifications"
            >
              <Bell className="w-4 h-4" />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-saffron rounded-full ring-2 ring-white" />
            </button>
            {notifOpen && (
              <div className="absolute right-0 mt-2 w-80 bg-white border border-slate-200 rounded-xl shadow-2xl overflow-hidden">
                <div className="px-4 py-3 border-b border-slate-200 flex items-center justify-between">
                  <div className="font-semibold text-sm text-navy">Notifications</div>
                  <button className="text-[11px] text-saffron font-semibold">Mark all read</button>
                </div>
                <div className="max-h-80 overflow-y-auto">
                  {[
                    { t: "New contact message", d: "From Priya Sharma — 2 min ago", c: "bg-blue-100 text-blue-600" },
                    { t: "Event registration", d: "12 new sign-ups for Nationals — 1h ago", c: "bg-green-100 text-green-600" },
                    { t: "Athlete profile updated", d: "Arjun Singh updated bio — 3h ago", c: "bg-orange-100 text-orange-600" },
                  ].map((n, i) => (
                    <div key={i} className="px-4 py-3 hover:bg-slate-50 border-b border-slate-100 last:border-0 cursor-pointer">
                      <div className="flex items-start gap-3">
                        <div className={`w-8 h-8 rounded-lg flex items-center justify-center text-xs font-bold ${n.c}`}>
                          {n.t[0]}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="text-sm font-semibold text-slate-800 truncate">{n.t}</div>
                          <div className="text-xs text-slate-500 truncate">{n.d}</div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="px-4 py-2 border-t border-slate-200 text-center">
                  <a href="#" className="text-xs font-semibold text-saffron hover:text-saffron-dark">
                    View all notifications →
                  </a>
                </div>
              </div>
            )}
          </div>

          {/* Profile */}
          <div className="relative pl-2">
            <button
              onClick={() => {
                setOpen((v) => !v);
                setNotifOpen(false);
              }}
              className="flex items-center gap-2 p-1 pr-2 hover:bg-slate-100 rounded-xl transition"
            >
              <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-[#0B3D91] to-[#1b77a8] text-white flex items-center justify-center font-bold text-sm">
                {user.name
                  .split(" ")
                  .map((n) => n[0])
                  .join("")}
              </div>
              <div className="hidden md:block text-left">
                <div className="text-xs font-semibold text-slate-800 leading-tight">{user.name}</div>
                <div className="text-[10px] text-slate-500 leading-tight">{user.role}</div>
              </div>
              <ChevronDown className="hidden md:block w-3.5 h-3.5 text-slate-400" />
            </button>
            {open && (
              <div className="absolute right-0 mt-2 w-56 bg-white border border-slate-200 rounded-xl shadow-2xl overflow-hidden">
                <div className="px-4 py-3 border-b border-slate-200">
                  <div className="text-sm font-semibold text-navy">{user.name}</div>
                  <div className="text-xs text-slate-500 truncate">{user.email}</div>
                </div>
                <div className="py-1">
                  <DropdownLink icon={User} label="My Profile" href="/admin/profile" />
                  <DropdownLink icon={SettingsIcon} label="Settings" href="/admin/settings" />
                </div>
                <div className="border-t border-slate-200 py-1">
                  <button
                    onClick={handleLogout}
                    className="w-full flex items-center gap-3 px-4 py-2 text-sm text-red-600 hover:bg-red-50"
                  >
                    <LogOut className="w-4 h-4" />
                    Sign out
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}

function DropdownLink({ icon: Icon, label, href }: { icon: typeof User; label: string; href: string }) {
  return (
    <Link
      href={href}
      className="flex items-center gap-3 px-4 py-2 text-sm text-slate-700 hover:bg-slate-100"
    >
      <Icon className="w-4 h-4 text-slate-500" />
      {label}
    </Link>
  );
}
