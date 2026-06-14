"use client";

import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { Menu, X, Accessibility, ChevronDown, ChevronRight, Bell } from "lucide-react";

interface MarqueeItem { text: string; link?: string }
interface MarqueeData {
  enabled: boolean;
  badge_label: string;
  view_all_label: string;
  view_all_url: string;
  speed_seconds: number;
  items: MarqueeItem[];
}
const DEFAULT_MARQUEE: MarqueeData = {
  enabled: true,
  badge_label: "Updates",
  view_all_label: "View All",
  view_all_url: "/news",
  speed_seconds: 35,
  items: [
    { text: "The Wheelchair Rugby Federation of India proudly celebrates our incredible athletes for qualifying to represent India at the Asian Wheelchair Rugby Championship" },
  ],
};

const navLinks = [
  { label: "Home", href: "/" },
  {
    label: "About Us",
    href: "/about",
    dropdown: [
      { label: "About WRFI", href: "/about" },
      { label: "Committee Members", href: "/leadership" },
      { label: "Selection Policy", href: "/selection-policy" },
      { label: "Our Partners", href: "/partners" },
    ],
  },
  { label: "News", href: "/news" },
  { label: "Our History", href: "/history" },
  {
    label: "Events",
    href: "/events",
    dropdown: [
      { label: "Upcoming Tournaments", href: "/events#upcoming" },
      { label: "National", href: "/events#national" },
      { label: "International", href: "/events#international" },
      { label: "Gallery", href: "/gallery" },
    ],
  },
  { label: "Contact Us", href: "/contact" },
];

export default function Header() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [mobileOpenDropdown, setMobileOpenDropdown] = useState<string | null>(null);
  const [marquee, setMarquee] = useState<MarqueeData>(DEFAULT_MARQUEE);

  const isHomePage = pathname === "/";

  useEffect(() => {
    if (!isHomePage) return;
    (async () => {
      try {
        const res = await fetch("/api/about-sections/header_marquee", { cache: "no-store" });
        if (!res.ok) return;
        const json = await res.json();
        if (json.data) {
          setMarquee({ ...DEFAULT_MARQUEE, ...(json.data as MarqueeData), enabled: !!json.is_enabled });
        } else {
          setMarquee((p) => ({ ...p, enabled: !!json.is_enabled }));
        }
      } catch {}
    })();
  }, [isHomePage]);

  return (
    <>
      <header
        className="fixed top-0 left-0 right-0 z-50 bg-navy/95 backdrop-blur-md border-b border-white/10"
        role="banner"
      >
        <div className="w-full pl-1 pr-4 sm:pl-2 sm:pr-6 lg:pl-3 lg:pr-8">
          <div className="flex items-center justify-between h-16 sm:h-20">
            {/* Logo */}
            <Link
              href="/"
              className="flex items-center gap-2 sm:gap-3 group shrink-0"
              aria-label="WRFI Home"
            >
              <img
                src="/images/logo1.png"
                alt="WRFI Logo"
                className="w-11 h-11 sm:w-14 sm:h-14 object-contain group-hover:scale-105 transition-transform"
              />
              <div className="flex flex-col">
                <span className="text-white font-bold text-lg sm:text-xl tracking-tight leading-tight">
                  WRFI
                </span>
                <span className="text-white text-[10px] sm:text-xs font-medium tracking-wider uppercase leading-tight hidden sm:block">
                  Wheelchair Rugby Federation of India
                </span>
              </div>
            </Link>

            {/* Desktop nav */}
            <nav
              className="hidden lg:flex items-center gap-1"
              role="navigation"
              aria-label="Primary navigation"
            >
              {navLinks.map((link) =>
                link.dropdown ? (
                  <div
                    key={link.href}
                    className="relative"
                    onMouseEnter={() => setOpenDropdown(link.label)}
                    onMouseLeave={() => setOpenDropdown(null)}
                  >
                    <Link
                      href={link.href}
                      className="nav-link px-4 py-2 text-sm font-medium text-white hover:text-saffron transition-colors rounded-lg inline-flex items-center gap-1"
                    >
                      {link.label}
                      <ChevronDown
                        className={`w-3.5 h-3.5 transition-transform ${
                          openDropdown === link.label ? "rotate-180" : ""
                        }`}
                      />
                    </Link>
                    {/* Dropdown */}
                    <div
                      className={`absolute top-full left-0 mt-1 w-56 bg-navy border border-white/10 rounded-xl shadow-2xl overflow-hidden transition-all duration-200 ${
                        openDropdown === link.label
                          ? "opacity-100 visible translate-y-0"
                          : "opacity-0 invisible -translate-y-2"
                      }`}
                    >
                      <div className="h-1 bg-gradient-to-r from-saffron via-gold to-saffron-dark" />
                      {link.dropdown.map((sub) => (
                        <Link
                          key={sub.href}
                          href={sub.href}
                          className="block px-5 py-3 text-sm text-white hover:text-saffron hover:bg-white/5 transition-colors font-medium border-b border-white/5 last:border-0"
                        >
                          {sub.label}
                        </Link>
                      ))}
                    </div>
                  </div>
                ) : (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="nav-link px-4 py-2 text-sm font-medium text-white hover:text-saffron transition-colors rounded-lg"
                  >
                    {link.label}
                  </Link>
                )
              )}
              <Link
                href="/contact"
                className="ml-4 px-5 py-2.5 bg-saffron hover:bg-saffron-dark text-white text-sm font-semibold rounded-full transition-all hover:shadow-lg hover:shadow-saffron/25"
              >
                Get Involved
              </Link>
            </nav>

            {/* Mobile menu toggle */}
            <button
              className="lg:hidden p-2 text-white/80 hover:text-white transition-colors"
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-expanded={mobileOpen}
              aria-controls="mobile-menu"
              aria-label={mobileOpen ? "Close menu" : "Open menu"}
            >
              {mobileOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile nav - full screen overlay */}
      <div
        id="mobile-menu"
        className={`lg:hidden fixed inset-0 z-[60] bg-white transition-all duration-300 ${
          mobileOpen ? "opacity-100 visible" : "opacity-0 invisible"
        }`}
        role="navigation"
        aria-label="Mobile navigation"
      >
        <div className="flex flex-col h-full overflow-y-auto">
          {/* Top bar */}
          <div className="flex items-center justify-between h-16 px-4 border-b border-slate-200">
            <button
              onClick={() => setMobileOpen(false)}
              className="p-2 -ml-2 text-navy hover:text-saffron transition-colors"
              aria-label="Close menu"
            >
              <X className="w-6 h-6" />
            </button>
            <Link
              href="/"
              onClick={() => setMobileOpen(false)}
              className="flex items-center gap-2"
              aria-label="WRFI Home"
            >
              <img
                src="/images/logo1.png"
                alt="WRFI Logo"
                className="w-9 h-9 object-contain"
              />
              <span className="text-navy font-bold text-lg tracking-tight">WRFI</span>
            </Link>
            <div className="w-10" aria-hidden="true" />
          </div>

          {/* Nav list */}
          <nav className="flex-1">
            {navLinks.map((link) =>
              link.dropdown ? (
                <div key={link.href} className="border-b border-slate-200">
                  <button
                    onClick={() =>
                      setMobileOpenDropdown(
                        mobileOpenDropdown === link.label ? null : link.label
                      )
                    }
                    className="flex items-center justify-between w-full px-5 py-5 text-navy hover:bg-slate-50 transition-colors"
                  >
                    <span className="font-bold text-base uppercase tracking-wide">
                      {link.label}
                    </span>
                    <ChevronRight
                      className={`w-5 h-5 text-navy transition-transform ${
                        mobileOpenDropdown === link.label ? "rotate-90" : ""
                      }`}
                    />
                  </button>
                  <div
                    className={`overflow-hidden transition-all duration-200 bg-slate-50 ${
                      mobileOpenDropdown === link.label ? "max-h-96" : "max-h-0"
                    }`}
                  >
                    {link.dropdown.map((sub) => (
                      <Link
                        key={sub.href}
                        href={sub.href}
                        onClick={() => setMobileOpen(false)}
                        className="block pl-8 pr-5 py-3 text-slate-700 hover:text-saffron text-sm font-medium border-t border-slate-200 first:border-t-0"
                      >
                        {sub.label}
                      </Link>
                    ))}
                  </div>
                </div>
              ) : (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className="flex items-center justify-between px-5 py-5 text-navy hover:bg-slate-50 transition-colors border-b border-slate-200"
                >
                  <span className="font-bold text-base uppercase tracking-wide">
                    {link.label}
                  </span>
                  <ChevronRight className="w-5 h-5 text-navy" />
                </Link>
              )
            )}
          </nav>

          {/* Tagline band */}
          <div className="bg-navy text-white text-center py-3 px-4 text-xs font-bold uppercase tracking-widest">
            Wheelchair Rugby
Federation of India
          </div>

          {/* CTA */}
          <div className="px-5 py-5 bg-white">
            <Link
              href="/contact"
              onClick={() => setMobileOpen(false)}
              className="block text-center px-5 py-3.5 bg-saffron hover:bg-saffron-dark text-white font-semibold rounded-full transition-colors shadow-lg shadow-saffron/25"
            >
              Get Involved
            </Link>
          </div>
        </div>
      </div>

      {/* News ticker - fixed below header (only on home page) */}
      {isHomePage && marquee.enabled && marquee.items.length > 0 && (
        <div
          className="fixed left-0 right-0 z-40 bg-white border-b border-slate-200 shadow-sm top-16 sm:top-20"
          role="region"
          aria-label="Latest announcement"
        >
        <div className="relative h-11 sm:h-12 overflow-hidden">
          {/* Scrolling viewport (full width — text passes behind buttons) */}
          <div className="marquee-viewport absolute inset-0">
            <div
              className="marquee-track h-full"
              style={{ animationDuration: `${Math.max(5, marquee.speed_seconds)}s` }}
            >
              {[...Array(2)].map((_, dup) => (
                <span key={dup} className="inline-flex items-center text-slate-800 font-semibold text-sm sm:text-base">
                  {marquee.items.map((it, idx) => (
                    <span key={`${dup}-${idx}`} className="inline-flex items-center">
                      {it.link ? (
                        <a href={it.link} className="px-10 hover:text-saffron transition-colors">
                          {it.text}
                        </a>
                      ) : (
                        <span className="px-10">{it.text}</span>
                      )}
                      <span className="text-saffron font-bold text-lg" aria-hidden="true">◆</span>
                    </span>
                  ))}
                </span>
              ))}
            </div>
          </div>

          {/* Left badge — overlay on top of marquee */}
          <div className="absolute left-0 top-0 bottom-0 z-10 flex items-center justify-center w-[46px] sm:w-auto sm:px-6 bg-navy text-white text-[8px] sm:text-sm font-bold uppercase tracking-widest shadow-[4px_0_10px_rgba(0,0,0,0.15)]">
            <span className="hidden sm:inline">{marquee.badge_label}</span>
            <Bell className="w-4 h-4 sm:hidden" />
          </div>

          {/* Right button — overlay on top of marquee */}
          <a
            href={marquee.view_all_url}
            className="absolute right-0 top-0 bottom-0 z-10 flex items-center justify-center w-[46px] sm:w-auto sm:px-6 bg-saffron hover:bg-saffron-dark text-white text-[8px] sm:text-sm font-bold uppercase tracking-widest transition-colors shadow-[-4px_0_10px_rgba(0,0,0,0.15)]"
          >
            <span className="hidden sm:inline">{marquee.view_all_label}</span>
            <span className="sm:hidden">ALL</span>
          </a>
        </div>
        </div>
      )}
    </>
  );
}
