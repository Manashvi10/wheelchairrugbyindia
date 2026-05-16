"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu, X, Accessibility, ChevronDown } from "lucide-react";

const navLinks = [
  { label: "Home", href: "/" },
  { label: "About Us", href: "/about" },
  { label: "News", href: "/news" },
  { label: "Our History", href: "/history" },
  {
    label: "Events",
    href: "/events",
    dropdown: [
      { label: "Upcoming Tournaments", href: "/events#upcoming" },
      { label: "National", href: "/events#national" },
      { label: "International", href: "/events#international" },
    ],
  },
  { label: "Contact Us", href: "/contact" },
];

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [eventsOpen, setEventsOpen] = useState(false);
  const [mobileEventsOpen, setMobileEventsOpen] = useState(false);

  return (
    <>
      <a href="#main-content" className="skip-link">
        Skip to main content
      </a>
      <header
        className="fixed top-0 left-0 right-0 z-50 bg-navy/95 backdrop-blur-md border-b border-white/10"
        role="banner"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 sm:h-20">
            {/* Logo */}
            <Link
              href="/"
              className="flex items-center gap-3 group"
              aria-label="WRFI Home"
            >
              <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-gradient-to-br from-saffron to-gold flex items-center justify-center shadow-lg group-hover:scale-105 transition-transform">
                <Accessibility className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
              </div>
              <div className="flex flex-col">
                <span className="text-white font-bold text-lg sm:text-xl tracking-tight leading-tight">
                  WRFI
                </span>
                <span className="text-white/60 text-[10px] sm:text-xs font-medium tracking-wider uppercase leading-tight hidden sm:block">
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
                    onMouseEnter={() => setEventsOpen(true)}
                    onMouseLeave={() => setEventsOpen(false)}
                  >
                    <Link
                      href={link.href}
                      className="nav-link px-4 py-2 text-sm font-medium text-white/80 hover:text-saffron transition-colors rounded-lg inline-flex items-center gap-1"
                    >
                      {link.label}
                      <ChevronDown
                        className={`w-3.5 h-3.5 transition-transform ${
                          eventsOpen ? "rotate-180" : ""
                        }`}
                      />
                    </Link>
                    {/* Dropdown */}
                    <div
                      className={`absolute top-full left-0 mt-1 w-56 bg-navy border border-white/10 rounded-xl shadow-2xl overflow-hidden transition-all duration-200 ${
                        eventsOpen
                          ? "opacity-100 visible translate-y-0"
                          : "opacity-0 invisible -translate-y-2"
                      }`}
                    >
                      <div className="h-1 bg-gradient-to-r from-saffron via-gold to-saffron-dark" />
                      {link.dropdown.map((sub) => (
                        <Link
                          key={sub.href}
                          href={sub.href}
                          className="block px-5 py-3 text-sm text-white/70 hover:text-saffron hover:bg-white/5 transition-colors font-medium border-b border-white/5 last:border-0"
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
                    className="nav-link px-4 py-2 text-sm font-medium text-white/80 hover:text-saffron transition-colors rounded-lg"
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

        {/* Mobile nav */}
        <div
          id="mobile-menu"
          className={`lg:hidden overflow-hidden transition-all duration-300 ${
            mobileOpen ? "max-h-[500px] opacity-100" : "max-h-0 opacity-0"
          }`}
          role="navigation"
          aria-label="Mobile navigation"
        >
          <div className="px-4 pb-6 pt-2 space-y-1 bg-navy border-t border-white/10">
            {navLinks.map((link) =>
              link.dropdown ? (
                <div key={link.href}>
                  <button
                    onClick={() => setMobileEventsOpen(!mobileEventsOpen)}
                    className="flex items-center justify-between w-full px-4 py-3 text-white/80 hover:text-saffron hover:bg-white/5 rounded-lg transition-colors font-medium"
                  >
                    {link.label}
                    <ChevronDown
                      className={`w-4 h-4 transition-transform ${
                        mobileEventsOpen ? "rotate-180" : ""
                      }`}
                    />
                  </button>
                  <div
                    className={`overflow-hidden transition-all duration-200 ${
                      mobileEventsOpen ? "max-h-48" : "max-h-0"
                    }`}
                  >
                    {link.dropdown.map((sub) => (
                      <Link
                        key={sub.href}
                        href={sub.href}
                        onClick={() => setMobileOpen(false)}
                        className="block pl-10 pr-4 py-2.5 text-white/60 hover:text-saffron text-sm font-medium transition-colors"
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
                  className="block px-4 py-3 text-white/80 hover:text-saffron hover:bg-white/5 rounded-lg transition-colors font-medium"
                >
                  {link.label}
                </Link>
              )
            )}
            <Link
              href="/contact"
              onClick={() => setMobileOpen(false)}
              className="block mt-3 mx-4 text-center px-5 py-3 bg-saffron hover:bg-saffron-dark text-white font-semibold rounded-full transition-colors"
            >
              Get Involved
            </Link>
          </div>
        </div>
      </header>
    </>
  );
}
