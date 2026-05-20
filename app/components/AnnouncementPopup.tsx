"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { X, Sparkles } from "lucide-react";

const STORAGE_KEY = "wrfi_asian_qualification_popup_seen";

export default function AnnouncementPopup() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    try {
      if (sessionStorage.getItem(STORAGE_KEY)) return;
    } catch {}

    const timer = setTimeout(() => setOpen(true), 1200);
    return () => clearTimeout(timer);
  }, []);

  const close = () => {
    setOpen(false);
    try {
      sessionStorage.setItem(STORAGE_KEY, "1");
    } catch {}
  };

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
    };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open]);

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-[100] flex items-end sm:items-center justify-center p-4 sm:p-6"
      role="dialog"
      aria-modal="true"
      aria-labelledby="announcement-title"
    >
      {/* Backdrop */}
      <button
        type="button"
        aria-label="Close announcement"
        onClick={close}
        className="absolute inset-0 bg-black/60 backdrop-blur-sm animate-fade-in"
      />

      {/* Card */}
      <div className="relative w-full max-w-md bg-white rounded-2xl shadow-2xl overflow-hidden animate-pop-in">
        {/* Top accent bar */}
        <div className="h-1.5 bg-gradient-to-r from-saffron via-gold to-saffron-dark" />

        {/* Close */}
        <button
          onClick={close}
          aria-label="Close"
          className="absolute top-3 right-3 z-10 p-1.5 text-slate-500 hover:text-navy hover:bg-slate-100 rounded-full transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Hero band */}
        <div className="relative bg-gradient-to-br from-navy via-navy to-[#0a1942] text-white px-6 pt-8 pb-6 text-center overflow-hidden">
          {/* Decorative sparkles */}
          <Sparkles className="absolute top-4 left-4 w-4 h-4 text-saffron/60" />
          <Sparkles className="absolute bottom-4 right-6 w-3 h-3 text-gold/60" />

          <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-white/10 ring-2 ring-saffron/40 mb-4 p-2">
            <img
              src="/images/logo1.png"
              alt="WRFI Logo"
              className="w-full h-full object-contain"
            />
          </div>

          <div className="inline-block px-3 py-1 mb-3 rounded-full bg-saffron/20 text-saffron text-[10px] font-bold uppercase tracking-widest">
            Historic Moment
          </div>

          <h2
            id="announcement-title"
            className="text-3xl sm:text-4xl font-extrabold leading-[1.05] tracking-tight"
          >
            <span className="block text-saffron">Congratulations!</span>
            <span className="block mt-2 text-xl sm:text-2xl">Team India</span>
          </h2>

          <p className="mt-4 text-white text-base sm:text-lg font-semibold leading-snug">
            We have qualified for the{" "}
            <span className="text-saffron">Asian Wheelchair Rugby Championship</span>{" "}
            <span aria-hidden="true">🇮🇳</span>
          </p>
        </div>

        {/* Body */}
        <div className="px-6 py-5 text-center">
          <p className="text-slate-700 text-sm sm:text-base leading-relaxed italic">
            Gratitude to all our partners, supporters and athletes for making
            this possible.
          </p>
          <p className="mt-2 text-navy text-sm sm:text-base font-bold leading-snug">
            Our athletes proved that{" "}
            <span className="text-saffron">disability is never a limitation.</span>
          </p>

          <div className="mt-5 flex flex-col sm:flex-row gap-2.5">
            <Link
              href="/contact"
              onClick={close}
              className="flex-1 px-5 py-3 bg-saffron hover:bg-saffron-dark text-white text-sm font-bold rounded-full transition-colors shadow-lg shadow-saffron/25"
            >
              Get Involved
            </Link>
            <Link
              href="/news"
              onClick={close}
              className="flex-1 px-5 py-3 border-2 border-navy text-navy hover:bg-navy hover:text-white text-sm font-bold rounded-full transition-colors"
            >
              Read More
            </Link>
          </div>

          <button
            onClick={close}
            className="mt-3 text-xs text-slate-500 hover:text-navy transition-colors"
          >
            Maybe later
          </button>
        </div>
      </div>

      <style jsx>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes popIn {
          0% { opacity: 0; transform: translateY(20px) scale(0.96); }
          100% { opacity: 1; transform: translateY(0) scale(1); }
        }
        .animate-fade-in { animation: fadeIn 0.25s ease-out forwards; }
        .animate-pop-in { animation: popIn 0.35s cubic-bezier(0.2, 0.9, 0.3, 1.2) forwards; }
      `}</style>
    </div>
  );
}
